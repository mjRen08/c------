/* 多档视口下的排版体检：横向溢出 + 关键元素是否错位/被裁掉
   用法（develop 目录下，网站与 Chrome 就绪时）：
       node run.mjs layout-check.mjs
   截图输出到 develop/shots/layout-<宽度>.png */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_PATH || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const PROFILE = path.join(HERE, '.chrome-profile-layout');
const SITE = 'http://localhost:3000';
const VIEWPORTS = [
  { width: 1440, height: 950, label: 'desktop' },
  { width: 1100, height: 900, label: 'laptop' },
  { width: 900, height: 900, label: 'tablet' },
  { width: 390, height: 844, label: 'phone' }
];
const PAGES = [
  { name: 'oj', url: '/oj.html' },
  { name: 'oj-course', url: '/oj.html?course=pointers' },
  { name: 'list', url: '/list.html' }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function start() {
  fs.rmSync(PROFILE, { recursive: true, force: true });
  return spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROFILE, 'about:blank'], { stdio: 'ignore' });
}

async function connect() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const target = list.find(t => t.type === 'page');
      if (target) {
        const ws = new WebSocket(target.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
        let id = 0; const pending = new Map();
        ws.onmessage = event => {
          const message = JSON.parse(event.data);
          if (message.id && pending.has(message.id)) { pending.get(message.id)(message.result); pending.delete(message.id); }
        };
        const send = (method, params = {}) => { const i = ++id; ws.send(JSON.stringify({ id: i, method, params })); return new Promise(r => pending.set(i, r)); };
        return { send, evaluate: async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value };
      }
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('无法连接 Chrome 调试端口');
}

const child = start();
try {
  const { send, evaluate } = await connect();
  await send('Page.enable');
  fs.mkdirSync(path.join(HERE, 'shots'), { recursive: true });

  const probe = `(() => {
    const ignored = el => el.closest('.nav-drawer') || el.closest('.nav-links') || el.classList.contains('nav-drawer') || el.classList.contains('bento-glow') || el.closest('#starField') || el.closest('.ai-widget') || el.closest('.free-code-panel');
    const overflow = [];
    document.querySelectorAll('body *').forEach(el => {
      if (ignored(el)) return;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > window.innerWidth + 1) overflow.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\\s+/)[0] : ''));
    });
    const clipped = [];
    document.querySelectorAll('.filter-tab, .lesson-head-title, .lesson-head-sub, .problem-name, .lesson-strip-label, .lesson-chip span').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2) clipped.push((el.className || el.tagName) + ' :: ' + el.textContent.trim().slice(0, 22));
    });
    const toolbar = document.querySelector('.oj-toolbar');
    const tabs = document.querySelector('#courseFilter');
    return {
      vw: window.innerWidth,
      docOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      overflow: [...new Set(overflow)].slice(0, 6),
      clipped: clipped.slice(0, 6),
      tabRows: tabs ? Math.round(tabs.getBoundingClientRect().height / 38) + 1 : 0,
      toolbarH: toolbar ? Math.round(toolbar.getBoundingClientRect().height) : 0,
      groups: document.querySelectorAll('.lesson-group').length,
      visibleProblems: document.querySelectorAll('.lesson-group.expanded .problem-item').length,
      courseSummary: (() => { const s = document.querySelector('#courseSummary'); return s && !s.hidden ? s.textContent.replace(/\\s+/g, ' ').trim() : null; })()
    };
  })()`;

  for (const viewport of VIEWPORTS) {
    await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.width < 500 });
    for (const page of PAGES) {
      await send('Page.navigate', { url: SITE + page.url });
      await sleep(2600);
      const info = await evaluate(probe);
      const flag = (info.docOverflow || info.overflow.length || info.clipped.length) ? '⚠' : '✓';
      console.log(`${flag} [${viewport.label} ${viewport.width}px] ${page.name}: ${JSON.stringify(info)}`);
      if (page.name === 'oj') {
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(HERE, 'shots', `layout-${viewport.label}.png`), Buffer.from(shot.data, 'base64'));
      }
    }
  }
  console.log('\nDONE');
} finally {
  child.kill();
}
