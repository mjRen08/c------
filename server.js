const http = require('http');
const fs = require('fs');
const path = require('path');

/* ============ 读取 .env ============ */
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2];
  });
}

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE_URL = 'https://api.deepseek.com';
const MODEL = 'deepseek-flash';

if (!API_KEY) {
  console.error('❌ 缺少 DEEPSEEK_API_KEY，请检查 .env');
  process.exit(1);
}

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

/* ============ 工具 ============ */
function sendJson(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

function errText(status) {
  const m = {
    401: 'API Key 无效或已过期',
    402: 'DeepSeek 账户余额不足',
    429: '请求太频繁，请稍后重试',
    500: 'DeepSeek 服务器故障',
    503: 'DeepSeek 服务器繁忙',
  };
  return m[status] || `DeepSeek 返回错误 (${status})`;
}

/* ============ AI 代理 ============ */
async function handleAI(req, res) {
  let raw = '';
  for await (const chunk of req) raw += chunk;

  let payload;
  try { payload = JSON.parse(raw); }
  catch { return sendJson(res, 400, { error: '请求体不是合法 JSON' }); }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  if (!messages.length) return sendJson(res, 400, { error: 'messages 为空' });

  // 只保留最近 16 条，控制 token
  const trimmed = messages.slice(-16);

  let upstream;
  try {
    upstream = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.5,
        max_tokens: 1200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...trimmed,
        ],
      }),
    });
  } catch (e) {
    return sendJson(res, 502, { error: '无法连接 DeepSeek: ' + e.message });
  }

  if (!upstream.ok) {
    const t = await upstream.text();
    console.error(`[DeepSeek ${upstream.status}] ${t.slice(0, 200)}`);
    return sendJson(res, upstream.status, { error: errText(upstream.status) });
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
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
        } catch {}
      }
    }
  } catch (e) {
    console.error('流式转发中断:', e.message);
  }
  res.end();
}

/* ============ 静态文件服务 ============ */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/ai') {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method Not Allowed' });
    return handleAI(req, res);
  }

  let rel = url.pathname === '/' ? '/index.html' : url.pathname;
  const safe = path.normalize(rel).replace(/^(\.\.[/\\])+/, '');
  const file = path.join(__dirname, safe);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  ✅ CodeMaster 已启动`);
  console.log(`  🌐 http://localhost:${PORT}`);
  console.log(`  🤖 AI: DeepSeek (${MODEL})\n`);
});