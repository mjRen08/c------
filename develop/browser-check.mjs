// Drives the local site through Chrome DevTools Protocol so interactions that
// CSS-only screenshots cannot show (hover buttons, fold/unfold, submit) get
// verified for real.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

/* 浏览器路径可用环境变量 CHROME_PATH 覆盖；截图与临时用户目录都放在本目录下 */
const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_PATH || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const PROFILE = path.join(HERE, '.chrome-profile');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startChrome() {
  fs.rmSync(PROFILE, { recursive: true, force: true });
  const child = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROFILE,
    '--window-size=1500,1100', 'about:blank'
  ], { stdio: 'ignore', detached: false });

  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return child;
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('Chrome did not expose the debugging port');
}

class Session {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.events = []; }
  static async open(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    const session = new Session(ws);
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.id && session.pending.has(message.id)) {
        const { resolve, reject } = session.pending.get(message.id);
        session.pending.delete(message.id);
        message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
        return;
      }
      if (message.method === 'Runtime.consoleAPICalled') {
        const text = (message.params.args || []).map(a => a.value ?? a.description ?? '').join(' ');
        if (message.params.type === 'error' || message.params.type === 'warning') session.events.push(`[console.${message.params.type}] ${text}`);
      }
      if (message.method === 'Runtime.exceptionThrown') {
        session.events.push('[exception] ' + (message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text));
      }
      if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
        session.events.push('[log] ' + message.params.entry.text + ' ' + (message.params.entry.url || ''));
      }
    };
    return session;
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  async eval(expression) {
    const result = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ' :: ' + JSON.stringify(result.exceptionDetails.exception?.description || ''));
    return result.result.value;
  }
  async goto(url) {
    await this.send('Page.navigate', { url });
    await sleep(2500);
  }
  async shot(name) {
    const { data } = await this.send('Page.captureScreenshot', { format: 'png' });
    const dir = path.join(HERE, 'shots');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${name}.png`);
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    return file;
  }
}

const child = await startChrome();
try {
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  let page = targets.find(t => t.type === 'page');
  if (!page) {
    page = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`)).json();
  }
  const session = await Session.open(page.webSocketDebuggerUrl);
  await session.send('Page.enable');
  await session.send('Runtime.enable');
  await session.send('Log.enable');

  const log = [];
  const record = (label, value) => { log.push(`${label}: ${JSON.stringify(value)}`); console.log(`${label}:`, value); };

  /* ---------- 1. 课程中心：悬停卡片显示 学/测/练 ---------- */
  await session.goto('http://localhost:3000/list.html');
  const cardBox = await session.eval(`(() => {
    const card = document.querySelector('.bento-card');
    const rect = card.getBoundingClientRect();
    return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + 120) };
  })()`);
  await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: cardBox.x, y: cardBox.y });
  await sleep(800);
  record('card buttons', await session.eval(`Array.from(document.querySelectorAll('.bento-card .bento-actions')).slice(0,2).map(a => Array.from(a.querySelectorAll('button')).map(b => b.textContent.trim()))`));
  record('actions opacity', await session.eval(`getComputedStyle(document.querySelector('.bento-card .bento-actions')).opacity`));
  record('练 href target', await session.eval(`(() => { const b = Array.from(document.querySelectorAll('.bento-card .bento-actions button')).find(x => x.textContent.trim() === '练'); const card = b.closest('.bento-card'); const r = b.getBoundingClientRect(); const ring = card.querySelector('.bento-ring').getBoundingClientRect(); return { overlapRing: !(r.right < ring.left || r.left > ring.right || r.bottom < ring.top || r.top > ring.bottom), box: {left: Math.round(r.left), top: Math.round(r.top), w: Math.round(r.width)}, ring: {left: Math.round(ring.left), top: Math.round(ring.top)} }; })()`));
  console.log('screenshot:', await session.shot('cdp-list-hover'));

  /* ---------- 2. 点击「练」应跳到 oj.html?course=... ---------- */
  await session.eval(`(() => { const b = Array.from(document.querySelectorAll('.bento-card .bento-actions button')).find(x => x.textContent.trim() === '练'); b.click(); })()`);
  await sleep(2000);
  record('after 练 click -> url', await session.eval('location.href'));

  /* ---------- 3. OJ：分组折叠状态 ---------- */
  record('groups', await session.eval(`document.querySelectorAll('.lesson-group').length`));
  record('expanded at load', await session.eval(`document.querySelectorAll('.lesson-group.expanded').length`));
  record('first group head', await session.eval(`document.querySelector('.lesson-group .lesson-head-title').textContent.trim()`));
  record('badge', await session.eval(`document.querySelector('.lesson-group .lesson-badge').textContent.trim()`));
  record('visible problems', await session.eval(`document.querySelectorAll('.lesson-group.expanded .problem-item').length`));
  await session.eval(`document.querySelector('.lesson-group .lesson-head').click()`);
  await sleep(500);
  record('after collapse, visible problems', await session.eval(`document.querySelectorAll('.lesson-group.expanded .problem-item').length`));
  await session.eval(`document.querySelector('.lesson-group .lesson-head').click()`);
  record('toggleAll text', await session.eval(`document.querySelector('#toggleAll').textContent.trim()`));
  await session.eval(`document.querySelector('#toggleAll').click()`);
  await sleep(500);
  record('after expandAll, expanded groups', await session.eval(`document.querySelectorAll('.lesson-group.expanded').length`));
  record('after expandAll, button', await session.eval(`document.querySelector('#toggleAll').textContent.trim()`));
  record('after expandAll, visible problems', await session.eval(`document.querySelectorAll('.lesson-group.expanded .problem-item').length`));

  /* ---------- 4. 切换课程筛选 ---------- */
  await session.eval(`document.querySelector('#courseFilter .filter-tab[data-filter="algorithms"]').click()`);
  await sleep(500);
  record('algorithms filter: groups', await session.eval(`document.querySelectorAll('.lesson-group').length`));
  record('algorithms filter: first problem', await session.eval(`document.querySelector('#problemDetail h2').textContent`));
  record('algorithms filter: url', await session.eval('location.search'));

  /* ---------- 5. 同一课的 3 题切换 ---------- */
  await session.eval(`document.querySelector('#courseFilter .filter-tab[data-filter="all"]').click()`);
  await sleep(300);
  await session.eval(`document.querySelector('.lesson-group .lesson-head').click()`);
  await sleep(300);
  await session.eval(`document.querySelectorAll('.lesson-group .problem-item')[2].click()`);
  await sleep(500);
  record('3rd problem title', await session.eval(`document.querySelector('#problemDetail h2').textContent`));
  record('editor starter head', await session.eval(`document.querySelector('#codeEditor').value.split('\\n')[0]`));
  record('url after select', await session.eval('location.search'));
  console.log('screenshot:', await session.shot('cdp-oj-detail'));

  /* ---------- 6. 真提交一次（小题 #1 的正确解） ---------- */
  await session.eval(`(() => { const first = document.querySelectorAll('.lesson-group .problem-item')[0]; first.click(); })()`);
  await sleep(400);
  const firstTitle = await session.eval(`document.querySelector('#problemDetail h2').textContent`);
  console.log('---- submitting problem:', firstTitle);
  await session.eval(`document.querySelector('#codeEditor').value = '#include <stdio.h>\\nint main(void){char s[32];if(scanf("%31s",s)!=1)return 0;printf("Hello, %s!\\\\n",s);printf("欢迎加入 CodeMaster\\\\n");return 0;}'`);
  await session.eval(`document.querySelector('#submitCode').click()`);
  for (let attempt = 0; attempt < 90; attempt += 1) {
    await sleep(2000);
    const text = await session.eval(`document.querySelector('#resultBox').textContent`);
    if (!/正在/.test(text)) { record('judge result', text.replace(/\s+/g, ' ').slice(0, 200)); break; }
    if (attempt === 89) record('judge result', 'TIMEOUT: ' + text.slice(0, 120));
  }
  record('compiler status', await session.eval(`document.querySelector('#compilerStatus').textContent.trim()`));
  record('solved counter', await session.eval(`document.querySelector('#solvedCount').textContent + '/' + document.querySelector('#solvedTotal').textContent`));
  record('passed badges', await session.eval(`Array.from(document.querySelectorAll('.lesson-badge')).slice(0,2).map(b => b.textContent.trim())`));
  record('localStorage', await session.eval(`localStorage.getItem('cm_oj_passed')`));
  await session.eval(`window.scrollTo(0, 0)`);
  console.log('screenshot:', await session.shot('cdp-oj-judged'));

  /* ---------- 7. 逐节点开全部 45 组，检查每道题的渲染 ---------- */
  record('browser errors so far', session.events.length);
  session.events.slice(0, 10).forEach(e => console.log('   ' + e));
  const audit = await session.eval(`(() => {
    const out = { groups: 0, problems: 0, missingTitle: 0, emptyStarter: 0, badUrl: 0 };
    document.querySelectorAll('.lesson-group').forEach(group => {
      out.groups += 1;
      group.querySelectorAll('.problem-item').forEach(item => {
        item.click();
        out.problems += 1;
        const title = document.querySelector('#problemDetail h2').textContent.trim();
        const starter = document.querySelector('#codeEditor').value;
        const chips = document.querySelectorAll('#problemDetail .lesson-chip').length;
        if (!title) out.missingTitle += 1;
        if (!starter || starter.length < 20) out.emptyStarter += 1;
        if (chips !== 3) out.badUrl += 1;
      });
    });
    return out;
  })()`);
  record('audit (45 groups / 135 problems)', audit);
  record('browser errors after audit', session.events.length);
  session.events.slice(0, 15).forEach(e => console.log('   ' + e));

  fs.writeFileSync(path.join(HERE, 'browser-check-log.txt'), log.join('\n'), 'utf8');
  console.log('\nDONE');
} finally {
  child.kill();
}
