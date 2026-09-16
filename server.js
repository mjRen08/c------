/* ============================================================
   CodeMaster 本地一体化服务（单端口 / 单源）
   ------------------------------------------------------------
   同一个地址同时提供三件事，互不冲突：
     1. 静态站点     GET  /*             HTML / CSS / JS / 图片（支持中文文件名）
     2. AI 代理      POST /api/ai        DeepSeek 流式转发（同源 + 开放 CORS）
     3. 编译器依赖   GET  /vendor/npm/*  Wasm 编译器依赖的同源代理 + 本地缓存

   为什么需要第 3 项：
     OJ 判题用的浏览器版 C 编译器（browsercc）体积约 95 MB，
     原来由网页直接向 cdn.jsdelivr.net 逐个拉取，既要跨域、
     又在国内网络上极慢（实测 0.02~0.13 MB/s，拉完要十几分钟），
     于是超时降级成"结构检查"，看起来就是"Wasm 编译器用不了"。
     现在统一由本服务代理并缓存到 .cache/，网页只访问同源地址：
       · 整包 tgz 走国内 npm 镜像（实测约 2.5 MB/s，40 MB 约 16 秒）
       · 下载一次后永久本地命中，之后完全离线可用
     —— 这样"AI 端口"和"Wasm / 图片"就不需要再分家了。
   ============================================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const crypto = require('crypto');
const { Readable, Transform } = require('stream');
const { pipeline } = require('stream/promises');

/* ============ 读取 .env ============ */
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) return;
    let value = m[2];
    if (value.length > 1 &&
        ((value.startsWith('"') && value.endsWith('"')) ||
         (value.startsWith("'") && value.endsWith("'")))) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  });
}

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || undefined;          // 留空 = 监听所有网卡（IPv4/IPv6 均可）
const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE_URL = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const MAX_TOKENS = Number(process.env.DEEPSEEK_MAX_TOKENS) || 2048;

/* 没有 API Key 时不要直接退出。
   以前这里写的是 process.exit(1)，结果是：别人拿到项目、
   还没来得及填 .env，整个网站（包括静态页面和 Wasm 判题）都打不开。
   现在改成"降级"：网站照常提供，只有 AI 助手返回一条清楚的提示。 */
const AI_ENABLED = Boolean(API_KEY);
if (!AI_ENABLED) {
  console.warn('⚠  未检测到 DEEPSEEK_API_KEY：AI 助手将不可用，其它功能正常。');
  console.warn('   需要 AI 的话，把 .env.example 复制成 .env 并填入你的 Key 后重启。');
}

const ROOT = __dirname;
const CACHE_ROOT = path.join(ROOT, '.cache', 'vendor');
const TARBALL_ROOT = path.join(ROOT, '.cache', 'tarballs');

/* ============ AI 系统提示词 ============ */
const SYSTEM_PROMPT = `你是 CodeMaster 平台的 AI 代码助手，专注 C 语言与编程领域。

# 回答风格
- 直接、简洁、准确。先给答案或结论，再补充必要解释。
- 代码用 markdown 代码块（\`\`\`c ... \`\`\`），关键行加注释。
- 用户中文提问用中文回答，英文提问用英文回答。

# 专业范围
- C 语言语法、指针、内存管理、结构体、文件 IO
- 数据结构与算法
- 编译错误、段错误、内存泄漏的调试思路
- 代码生成、优化建议、面试题解析

# 约束
- 拒绝与编程无关的话题（闲聊、时政、违法内容），礼貌引导回编程话题。
- 不确定的地方明确说"不确定"，不要编造 API 或语法。
- 一次回答不要超过 500 字，代码块例外。`;

/* ============ 基础工具 ============ */
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function sendText(res, code, text) {
  res.writeHead(code, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(text),
  });
  res.end(text);
}

function errText(status) {
  const m = {
    400: '请求被 DeepSeek 拒绝（可能是模型名或参数不合法）',
    401: 'API Key 无效或已过期',
    402: 'DeepSeek 账户余额不足',
    404: 'DeepSeek 模型不存在，请检查 .env 中的 DEEPSEEK_MODEL',
    422: '请求参数不合法',
    429: '请求太频繁，请稍后重试',
    500: 'DeepSeek 服务器故障',
    503: 'DeepSeek 服务器繁忙',
  };
  return m[status] || `DeepSeek 返回错误 (${status})`;
}

/* CORS：站点被放到别的端口/静态服务器时，AI 依然可用 */
function applyCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/* ============ MIME ============ */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm':  'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map':  'application/json; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
  '.md':   'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.csv':  'text/csv; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.bmp':  'image/bmp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.eot':  'application/vnd.ms-fontobject',
  '.wasm': 'application/wasm',          // 必须是这个，否则 instantiateStreaming 会失败
  '.tar':  'application/x-tar',
  '.pch':  'application/octet-stream',
  '.zip':  'application/zip',
  '.mp3':  'audio/mpeg',
  '.mp4':  'video/mp4',
};

function mimeOf(file) {
  return MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

/* ============ 静态文件（ETag / 304 / HEAD） ============ */
function weakEtag(size, mtimeMs) {
  return `W/"${size.toString(16)}-${Math.floor(mtimeMs).toString(16)}"`;
}

function sendFile(req, res, file, options = {}) {
  return new Promise(resolve => {
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {
        if (!res.headersSent) sendText(res, 404, '404 Not Found');
        return resolve();
      }

      const etag = weakEtag(stat.size, stat.mtimeMs);
      const cacheControl = options.cache || 'no-cache';

      if (req.headers['if-none-match'] === etag) {
        res.writeHead(304, { 'ETag': etag, 'Cache-Control': cacheControl });
        return res.end(resolve);
      }

      res.writeHead(200, {
        'Content-Type': options.type || mimeOf(file),
        'Content-Length': stat.size,
        'ETag': etag,
        'Last-Modified': stat.mtime.toUTCString(),
        'Cache-Control': cacheControl,
      });

      if (req.method === 'HEAD') {
        res.end();
        return resolve();
      }

      const stream = fs.createReadStream(file);
      stream.on('error', () => res.destroy());
      stream.on('close', resolve);
      stream.pipe(res);
    });
  });
}

async function handleStatic(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  /* 关键修复：URL 路径必须先解码。
     浏览器请求中文文件名时发出的是 %E5%BC%A0.jpg，
     不解码就会去找一个叫 "%E5%BC%A0.jpg" 的文件 —— 于是制作团队的头像全部 404。 */
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return sendText(res, 400, '400 Bad Request');
  }

  if (pathname === '/' || pathname.endsWith('/')) pathname += 'index.html';

  const segments = pathname.split('/').filter(Boolean);

  /* 禁止访问隐藏文件/目录：.env（内含 API Key）、.git、.cache、node_modules */
  if (segments.some(s => s.startsWith('.') || s === 'node_modules')) {
    return sendText(res, 403, '403 Forbidden');
  }

  const file = path.resolve(ROOT, segments.join('/'));
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
    return sendText(res, 403, '403 Forbidden');
  }

  await sendFile(req, res, file, { cache: cacheControlFor(file) });
}

/* 静态资源的缓存策略。
   注意：这里刻意不让 CSS/JS 走长时间强缓存。
   本机开发时文件随时在改，如果给 max-age=3600，
   改完样式后手机浏览器一小时内都不会来取新文件，
   看起来就像"改了没生效"。
   改成 no-cache（仍然带 ETag）后：
     · 内容没变 → 服务器回 304，几乎不耗流量
     · 内容变了 → 立刻拿到新文件
   图片/字体这类基本不变的东西才给一天缓存。 */
function cacheControlFor(file) {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp', '.ico', '.svg',
       '.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) {
    return 'public, max-age=86400';
  }
  return 'no-cache';
}

/* ============================================================
   编译器依赖代理：/vendor/npm/<包名>@<版本>/<路径>
   ============================================================ */
const VENDOR_PREFIX = '/vendor/npm/';

/* 逐文件 CDN，按实测速度排序（国内） */
const FILE_MIRRORS = [
  'https://cdn.jsdmirror.com/npm/',       // jsDelivr 国内镜像，实测约 0.5 MB/s
  'https://unpkg.com/',
  'https://gcore.jsdelivr.net/npm/',
  'https://cdn.jsdelivr.net/npm/',        // 官方源，国内实测最慢，放最后
];

/* 整包 tgz 镜像（一个包只下载一次，适合大体积的静态库文件） */
const TARBALL_MIRRORS = [
  'https://registry.npmmirror.com',       // 国内镜像，实测约 2.5 MB/s
  'https://registry.npmjs.org',
];

/* 大型二进制（编译器本体、sysroot）优先走整包 tgz：
   browsercc 整包 40 MB / 2.5 MB/s ≈ 16 秒，
   而逐文件拉 95 MB 在慢速 CDN 上要十几分钟。
   小的脚本 / 样式 / 字体则优先逐文件，避免为一个小文件拉整包。 */
const BIG_PAYLOAD = /\.(wasm|tar|pch|bin|zip|gz)$/i;

/* 解析 "browsercc@0.1.1/dist/index.js" / "@bjorn3/pkg@0.4.2/dist/x.js" */
function parseNpmPath(rel) {
  const m = rel.match(/^((?:@[^/]+\/)?[^/@]+)@([^/]+)\/(.+)$/);
  if (!m) return null;
  return { name: m[1], version: m[2], subpath: m[3] };
}

function vendorCacheFile(rel) {
  const ext = path.extname(rel).toLowerCase().replace(/[^a-z0-9.]/g, '').slice(0, 12);
  return path.join(CACHE_ROOT, crypto.createHash('sha1').update(rel).digest('hex') + ext);
}

function tarballCacheFile(name, version) {
  const safe = `${name}-${version}`.replace(/[^A-Za-z0-9._-]/g, '_');
  return path.join(TARBALL_ROOT, safe + '.tgz');
}

const mb = n => (n / 1048576).toFixed(1);

/* 带进度显示地下载到指定文件（先写 .part 再改名，避免半个文件被当成缓存） */
async function downloadToFile(url, dest, label) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const total = Number(res.headers.get('content-length')) || 0;
  const tmp = `${dest}.part-${process.pid}-${Date.now()}`;
  let received = 0;
  let mark = 0;

  const meter = new Transform({
    transform(chunk, _enc, callback) {
      received += chunk.length;
      if (received - mark >= 8 * 1024 * 1024) {
        mark = received;
        const pct = total ? ` ${Math.round(received / total * 100)}%` : '';
        process.stdout.write(`\r     ${label}  ${mb(received)} MB${total ? ` / ${mb(total)} MB` : ''}${pct}   `);
      }
      callback(null, chunk);
    },
  });

  try {
    await pipeline(Readable.fromWeb(res.body), meter, fs.createWriteStream(tmp));
    await fs.promises.rename(tmp, dest);
  } catch (e) {
    await fs.promises.rm(tmp, { force: true }).catch(() => {});
    throw e;
  }
  return received;
}

/* ---------- 极简 tar 读取器（只读不写，按需跳过） ---------- */
class ByteReader {
  constructor(stream) {
    this.iterator = stream[Symbol.asyncIterator]();
    this.chunks = [];
    this.size = 0;
    this.ended = false;
  }
  async _pull() {
    if (this.ended) return false;
    const { value, done } = await this.iterator.next();
    if (done) { this.ended = true; return false; }
    this.chunks.push(value);
    this.size += value.length;
    return true;
  }
  async _ensure(n) {
    while (this.size < n) {
      if (!await this._pull()) return false;
    }
    return true;
  }
  /* 读取最多 n 字节，EOF 时返回剩余部分 */
  async read(n) {
    if (!await this._ensure(n)) n = this.size;
    if (n <= 0) return Buffer.alloc(0);
    const head = this.chunks[0];
    if (head.length >= n) {
      this.chunks[0] = head.subarray(n);
      this.size -= n;
      return head.subarray(0, n);
    }
    const out = Buffer.allocUnsafe(n);
    let offset = 0;
    while (offset < n) {
      const chunk = this.chunks[0];
      const take = Math.min(chunk.length, n - offset);
      chunk.copy(out, offset, 0, take);
      offset += take;
      if (take === chunk.length) this.chunks.shift();
      else this.chunks[0] = chunk.subarray(take);
    }
    this.size -= n;
    return out;
  }
  async skip(n) {
    let left = n;
    while (left > 0) {
      const chunk = await this.read(Math.min(left, 1 << 20));
      if (!chunk.length) return;
      left -= chunk.length;
    }
  }
}

function tarString(header, offset, length) {
  const slice = header.subarray(offset, offset + length);
  const end = slice.indexOf(0);
  return slice.subarray(0, end === -1 ? slice.length : end).toString('utf8').trim();
}

/* 从 tgz 中解出 package/<subpath> 这一个文件 */
async function extractFromTarball(tgzPath, subpath, outPath) {
  const want = `package/${subpath}`;
  const fileStream = fs.createReadStream(tgzPath);
  const gunzip = zlib.createGunzip();
  fileStream.pipe(gunzip);
  const reader = new ByteReader(gunzip);

  try {
    let pendingName = null;

    while (true) {
      const header = await reader.read(512);
      if (header.length < 512) return false;                       // 读完
      if (header.every(byte => byte === 0)) continue;              // 结尾填充块

      const name = tarString(header, 0, 100);
      if (!name) return false;
      const prefix = tarString(header, 345, 155);
      const size = parseInt(tarString(header, 124, 12) || '0', 8) || 0;
      const type = String.fromCharCode(header[156]);

      /* pax 扩展头（超长路径会用到）：读完内容，取出 path= 作为下一个条目的名字 */
      if (type === 'x' || type === 'g') {
        const data = await reader.read(size);
        await reader.skip((512 - (size % 512)) % 512);
        const m = data.toString('utf8').match(/\d+ path=([^\n]+)\n/);
        if (m) pendingName = m[1];
        continue;
      }

      const full = pendingName || (prefix ? `${prefix}/${name}` : name);
      pendingName = null;

      if (full === want) {
        const out = fs.createWriteStream(outPath);
        let left = size;
        try {
          while (left > 0) {
            const chunk = await reader.read(Math.min(left, 1 << 19));
            if (!chunk.length) break;
            if (!out.write(chunk)) await new Promise(r => out.once('drain', r));
            left -= chunk.length;
          }
          await new Promise((resolve, reject) => {
            out.on('error', reject);
            out.end(resolve);
          });
        } catch (e) {
          out.destroy();
          throw e;
        }
        if (left !== 0) throw new Error(`tgz 数据不完整（还差 ${left} 字节）`);
        return size;
      }

      await reader.skip(size);
      await reader.skip((512 - (size % 512)) % 512);               // 数据按 512 对齐
    }
  } finally {
    fileStream.destroy();
    gunzip.destroy();
  }
}

/* 确保整包 tgz 已在本地 */
async function ensureTarball(name, version) {
  const dest = tarballCacheFile(name, version);
  if (fs.existsSync(dest)) return dest;

  await fs.promises.mkdir(TARBALL_ROOT, { recursive: true });
  const file = name.split('/').pop();
  let lastError;

  for (const registry of TARBALL_MIRRORS) {
    const url = `${registry}/${name}/-/${file}-${version}.tgz`;
    try {
      console.log(`  ⬇  获取 npm 包 ${name}@${version}  (${new URL(registry).host})`);
      const got = await downloadToFile(url, dest, `${name}@${version}`);
      process.stdout.write(`\r     ✔ ${name}@${version}  ${mb(got)} MB 已缓存            \n`);
      return dest;
    } catch (e) {
      lastError = e;
      console.log(`\r     ✖ ${new URL(registry).host} 失败：${e.message}`);
    }
  }
  throw lastError || new Error('整包下载失败');
}

/* 把某个依赖实体化为本地缓存文件，成功返回缓存路径 */
async function materialize(norm) {
  const finalFile = vendorCacheFile(norm);
  const parsed = parseNpmPath(norm);
  const strategies = [];

  const tarball = parsed ? {
    kind: 'tarball',
    label: `${parsed.name}@${parsed.version} 整包`,
  } : null;

  if (tarball && BIG_PAYLOAD.test(norm)) strategies.push(tarball);
  FILE_MIRRORS.forEach(base => strategies.push({ kind: 'file', url: base + norm, label: new URL(base).host }));
  if (tarball) strategies.push(tarball);

  await fs.promises.mkdir(CACHE_ROOT, { recursive: true });

  let lastError;
  for (const strategy of strategies) {
    const tmp = `${finalFile}.part-${process.pid}-${Date.now()}`;
    try {
      if (strategy.kind === 'file') {
        console.log(`  ⬇  获取编译器依赖 ${norm}  (${strategy.label})`);
        const got = await downloadToFile(strategy.url, tmp, norm);
        process.stdout.write(`\r     ✔ ${norm}  ${mb(got)} MB 已缓存            \n`);
      } else {
        const tgz = await ensureTarball(parsed.name, parsed.version);
        const size = await extractFromTarball(tgz, parsed.subpath, tmp);
        if (size === false) throw new Error('tgz 中没有这个文件');
        process.stdout.write(`\r     ✔ ${norm}  ${mb(size)} MB（取自整包缓存）        \n`);
      }
      try {
        await fs.promises.rename(tmp, finalFile);
      } catch (e) {
        // 并发请求已经写好同一个文件时忽略
        await fs.promises.rm(tmp, { force: true }).catch(() => {});
        if (!fs.existsSync(finalFile)) throw e;
      }
      return finalFile;
    } catch (e) {
      lastError = e;
      await fs.promises.rm(tmp, { force: true }).catch(() => {});
      console.log(`     ✖ 该来源失败：${e.message}`);
    }
  }
  throw lastError || new Error('所有来源均不可用');
}

async function handleVendor(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  let rel;
  try {
    rel = decodeURIComponent(url.pathname.slice(VENDOR_PREFIX.length));
  } catch {
    return sendJson(res, 400, { error: 'URL 编码不合法' });
  }

  const norm = path.posix.normalize(rel);
  if (!norm || norm === '.' || norm.startsWith('..') || norm.startsWith('/') || norm.includes('\0')) {
    return sendJson(res, 400, { error: 'vendor 路径不合法' });
  }

  const options = { type: mimeOf(norm), cache: 'public, max-age=31536000, immutable' };
  const cached = vendorCacheFile(norm);
  if (fs.existsSync(cached)) return sendFile(req, res, cached, options);

  let file;
  try {
    file = await materialize(norm);
  } catch (e) {
    console.error(`  ✖  依赖获取失败 ${norm}：${e.message}`);
    return sendJson(res, 502, {
      error: `无法获取编译器依赖 ${norm}：${e.message}。请检查网络后刷新页面重试。`,
    });
  }
  return sendFile(req, res, file, options);
}

/* ============ AI 代理 ============ */
async function handleAI(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  /* GET /api/ai 作为探活接口：前端据此判断"这台服务器是不是 CodeMaster 后端"。
     即使没配 Key 也返回 ok，前端才会把错误信息显示在对话气泡里。 */
  if (req.method === 'GET') {
    return sendJson(res, 200, { ok: true, service: 'codemaster-ai', model: MODEL, stream: true, aiEnabled: AI_ENABLED });
  }

  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method Not Allowed' });

  /* 没配置 Key 时给一条能照着做的提示，而不是让整个网站打不开 */
  if (!AI_ENABLED) {
    return sendJson(res, 503, {
      error: 'AI 功能还没配置：.env 里缺少 DEEPSEEK_API_KEY。'
           + '把项目里的 .env.example 复制成 .env，填入你自己的 DeepSeek Key 后重启服务即可。'
           + '（网站的课程、小测、可视化、OJ 判题都不受影响）',
    });
  }

  let raw = '';
  for await (const chunk of req) raw += chunk;

  let payload;
  try { payload = JSON.parse(raw); }
  catch { return sendJson(res, 400, { error: '请求体不是合法 JSON' }); }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  if (!messages.length) return sendJson(res, 400, { error: 'messages 为空' });

  // 只保留最近 16 条，控制 token
  const trimmed = messages.slice(-16);

  const controller = new AbortController();
  const connectTimer = setTimeout(() => controller.abort(new Error('连接 DeepSeek 超时')), 60000);

  let upstream;
  try {
    upstream = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.5,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...trimmed,
        ],
      }),
    });
  } catch (e) {
    return sendJson(res, 502, { error: '无法连接 DeepSeek: ' + e.message });
  } finally {
    clearTimeout(connectTimer);
  }

  if (!upstream.ok) {
    const t = await upstream.text();
    console.error(`[DeepSeek ${upstream.status}] ${t.slice(0, 200)}`);
    return sendJson(res, upstream.status, { error: errText(upstream.status), detail: t.slice(0, 300) });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let sawText = false;
  let sawReasoning = false;
  const write = obj => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();

      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith('data:')) continue;
        const data = t.slice(5).trim();
        if (data === '[DONE]') { res.write('data: [DONE]\n\n'); continue; }
        try {
          const json = JSON.parse(data);
          const delta = json.choices?.[0]?.delta;
          if (!delta) continue;
          /* 推理型模型（如 deepseek-flash）会先吐 reasoning_content 再吐 content，
             两者都转发：前端先把思考过程显示出来，再显示正式回答。 */
          if (delta.reasoning_content) {
            sawReasoning = true;
            write({ reasoning: delta.reasoning_content });
          }
          if (delta.content) {
            sawText = true;
            write({ text: delta.content });
          }
        } catch { }
      }
    }

    if (!sawText) {
      write({
        error: sawReasoning
          ? `模型只输出了思考过程，没有给出最终答案（当前 max_tokens=${MAX_TOKENS} 可能被思考过程占满）。可在 .env 中改用 DEEPSEEK_MODEL=deepseek-chat，或调大 DEEPSEEK_MAX_TOKENS。`
          : '模型没有返回任何内容，请稍后重试。',
      });
    }
  } catch (e) {
    console.error('流式转发中断:', e.message);
    write({ error: '回复中断：' + e.message });
  }
  res.end();
}

/* ============ 路由 ============ */
async function route(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/ai' || url.pathname === '/api/ai/') return handleAI(req, res);
  if (url.pathname.startsWith(VENDOR_PREFIX)) return handleVendor(req, res, url);
  return handleStatic(req, res, url);
}

const server = http.createServer((req, res) => {
  // 客户端中途断开是常态（尤其是几十 MB 的 wasm），不要让它变成未捕获异常
  req.on('error', () => {});
  res.on('error', () => {});
  route(req, res).catch(err => {
    console.error('请求处理异常:', err);
    if (!res.headersSent) sendJson(res, 500, { error: '服务器内部错误' });
    else if (!res.writableEnded) res.end();
  });
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  ❌ 端口 ${PORT} 已被占用。`);
    console.error(`     请关掉占用该端口的程序，或在 .env 中把 PORT 改成别的值。\n`);
    process.exit(1);
  }
  throw err;
});

/* 找出本机在局域网里的 IPv4 地址，方便手机访问。
   虚拟网卡（VPN / 虚拟机 / WSL）的地址手机连不上，标出来并排到后面。 */
const VIRTUAL_ADAPTER = /radmin|virtual|vmware|vbox|hyper-?v|vethernet|loopback|tailscale|zerotier|docker|wsl|tap|tun|clash|wireguard/i;

function lanAddresses() {
  const list = [];
  const all = os.networkInterfaces();
  for (const [name, infos] of Object.entries(all)) {
    for (const info of infos || []) {
      // 跳过 IPv6、回环、以及 169.254 这类自动分配地址
      if (info.family !== 'IPv4' || info.internal) continue;
      if (info.address.startsWith('169.254.')) continue;
      list.push({ name, address: info.address, virtual: VIRTUAL_ADAPTER.test(name) });
    }
  }
  return list.sort((a, b) => Number(a.virtual) - Number(b.virtual));
}

server.listen(PORT, HOST, () => {
  console.log(`\n  ✅ CodeMaster 已启动（单端口一体化服务）`);
  console.log(`  🌐 本机打开：http://localhost:${PORT}`);

  const lan = lanAddresses();
  const real = lan.filter(item => !item.virtual);
  if (real.length) {
    console.log(`  📱 手机打开（需与电脑连同一个 Wi-Fi）：`);
    real.forEach(item => {
      console.log(`       http://${item.address}:${PORT}      [${item.name}]`);
    });
    if (real.length > 1) {
      console.log(`     （有多张网卡：手机连哪个网络，就用对应那条地址）`);
    }
  } else {
    console.log(`  📱 手机访问：没检测到可用的局域网地址，请先让电脑连上 Wi-Fi`);
  }
  const virtual = lan.filter(item => item.virtual);
  if (virtual.length) {
    console.log(`  （另有虚拟网卡 ${virtual.map(v => v.address).join('、')}，手机连不上，忽略即可）`);
  }

  console.log(`\n  🤖 AI       : ${AI_ENABLED ? `DeepSeek / ${MODEL}    →  POST /api/ai` : '未配置（缺少 DEEPSEEK_API_KEY，网站其它功能正常）'}`);
  console.log(`  🧩 Wasm 编译器: 依赖同源代理 + 本地缓存  →  /vendor/npm/...`);
  console.log(`  🖼  静态资源 : HTML / CSS / JS / 图片（文件名均为 ASCII，中文名也兼容）`);
  console.log(`  ⛔ 停止服务 : Ctrl + C\n`);
});
