/* ============================================================
   题库验证用的临时静态服务器（端口 4321）
   ------------------------------------------------------------
   为什么需要它：
   browsercc 的 clang.js / lld.js 会用相对模块 URL 去找 clang.wasm / lld.wasm，
   而网站服务器把编译器文件存在 .cache/vendor/ 下、用 sha1 文件名提供，
   路径不固定。所以这里把 .cache/vendor 里缓存的编译器文件用稳定的
   /assets/<包内路径> 地址暴露出来，供 verify-all.mjs 使用。

   Emscripten 在 Node 里看到 .js 结尾会走 Node 分支（用 fs 读 wasm，会失败），
   所以额外提供 .mjs 别名，让它走浏览器分支（用 fetch）。

   用法：先跑过网站（至少有缓存），再执行
       node develop/oj-scratch-server.cjs
   ============================================================ */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CACHE = path.join(__dirname, '..', '.cache', 'vendor');

const MIME = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.tar': 'application/x-tar',
  '.wasm': 'application/wasm',
  '.json': 'application/json'
};

/* 与 server.js 的 vendorCacheFile() 保持一致 */
const cacheFile = rel => path.join(CACHE, crypto.createHash('sha1').update(rel).digest('hex') + path.extname(rel).toLowerCase());

const alias = {
  '/assets/clang.mjs': 'clang.js',
  '/assets/lld.mjs': 'lld.js'
};

const resolveTarget = url => {
  const clean = decodeURIComponent(url.split('?')[0]);
  if (alias[clean]) return alias[clean];
  return clean.replace(/^\//, '');
};

http.createServer((req, res) => {
  const rel = resolveTarget(req.url);
  const file = rel === 'assets/index.js' ? cacheFile('browsercc@0.1.1/dist/index.js') : cacheFile('browsercc@0.1.1/dist/' + rel.replace(/^assets\//, ''));
  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`未找到 ${rel}\n请先运行网站（start.bat 或 node server.js）并打开一次 OJ 页面，让编译器文件缓存到 .cache/vendor。`);
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).replace('.mjs', '.js')] || 'application/octet-stream',
      'Content-Length': data.length
    });
    res.end(data);
  });
}).listen(4321, () => {
  console.log('题库验证服务器已启动：http://localhost:4321  (编译器缓存目录 ' + CACHE + ')');
});
