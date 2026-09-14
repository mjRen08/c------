/* ============================================================
   CodeMaster AI 助手 · 弹窗式独立窗口
   自动注入 CSS + DOM，无侵入式接入
   ============================================================ */
(function () {
    'use strict';
    if (document.getElementById('aiAssistantRoot')) return;

    /* ---------- 预设问题 ---------- */
    const PRESETS = [
        { icon: '💡', text: '指针和数组有什么区别？' },
        { icon: '💡', text: '解释一下什么是内存泄漏' },
        { icon: '📝', text: '写一个冒泡排序的 C 函数' },
        { icon: '📝', text: '用 C 实现一个单链表' },
        { icon: '🔍', text: '如何调试段错误？' },
        { icon: '⚡', text: 'malloc 和 calloc 的区别' },
    ];

    const WELCOME = '你好，我是 CodeMaster 的 AI 代码助手 👋\n\n我可以帮你解答 C 语言问题、分析报错、生成代码。试试下面的问题，或者直接输入你的疑问。';

    /* ============================================================
       CSS
       ============================================================ */
    const AI_CSS = `
  .ai-fab {
    position: fixed;
    right: 24px; bottom: 24px;
    width: 58px; height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d4ff, #7b2cbf);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    z-index: 9990;
    box-shadow: 0 8px 24px rgba(0,212,255,0.4), 0 0 30px rgba(123,44,191,0.35);
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
    animation: aiFabPulse 3s ease-in-out infinite;
  }
  .ai-fab:hover { transform: scale(1.08) translateY(-2px); box-shadow: 0 12px 32px rgba(0,212,255,.6); }
  .ai-fab:active { transform: scale(.96); }
  .ai-fab::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,.5), transparent 65%);
    z-index: -1;
    opacity: 0;
    animation: aiFabRipple 2s ease-out infinite;
  }
  @keyframes aiFabPulse {
    0%,100% { box-shadow: 0 8px 24px rgba(0,212,255,.4), 0 0 30px rgba(123,44,191,.35); }
    50%     { box-shadow: 0 8px 24px rgba(0,212,255,.6), 0 0 44px rgba(123,44,191,.55); }
  }
  @keyframes aiFabRipple {
    0%   { opacity: .8; transform: scale(.85); }
    100% { opacity: 0; transform: scale(1.4); }
  }
  .ai-fab-icon-open, .ai-fab-icon-close {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    transition: opacity .25s, transform .35s cubic-bezier(.34,1.56,.64,1);
  }
  .ai-fab-icon-close { opacity: 0; transform: rotate(-90deg) scale(.6); }
  .ai-fab.open .ai-fab-icon-open { opacity: 0; transform: rotate(90deg) scale(.6); }
  .ai-fab.open .ai-fab-icon-close { opacity: 1; transform: rotate(0) scale(1); }

  /* ---------- 窗口 ---------- */
  .ai-window {
    position: fixed;
    display: none;
    flex-direction: column;
    min-width: 320px;
    min-height: 380px;
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 24px);
    background: linear-gradient(180deg, rgba(13,20,40,.98), rgba(10,14,26,.98));
    border: 1px solid rgba(0,212,255,.35);
    border-radius: 16px;
    box-shadow: 0 24px 70px rgba(0,0,0,.65), 0 0 40px rgba(0,212,255,.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 9991;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px) scale(.96);
    transition: opacity .25s, transform .3s cubic-bezier(.34,1.56,.64,1);
  }
  .ai-window.open { display: flex; opacity: 1; transform: translateY(0) scale(1); }
  .ai-window::before {
    content: '';
    position: absolute;
    top: 0; left: 20%; right: 20%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, #7b2cbf, transparent);
    border-radius: 2px;
    opacity: .8;
  }

  /* ---------- 头部 ---------- */
  .ai-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: rgba(0,212,255,.04);
    border-bottom: 1px solid rgba(0,212,255,.15);
    cursor: grab;
    user-select: none;
    flex-shrink: 0;
  }
  .ai-header.dragging { cursor: grabbing; }
  .ai-header-avatar {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: linear-gradient(135deg, #00d4ff, #7b2cbf);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    color: #fff;
    box-shadow: 0 0 12px rgba(0,212,255,.5);
    flex-shrink: 0;
  }
  .ai-header-info { flex: 1; min-width: 0; }
  .ai-header-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #e8f0fb;
    letter-spacing: .3px;
  }
  .ai-header-sub {
    font-size: 10.5px;
    color: #64d2ff;
    margin-top: 1px;
    display: flex; align-items: center; gap: 5px;
  }
  .ai-header-sub::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #00ff88;
    box-shadow: 0 0 6px #00ff88;
    animation: aiDotPulse 2s ease-in-out infinite;
  }
  @keyframes aiDotPulse { 0%,100%{opacity:1;} 50%{opacity:.35;} }

  .ai-header-actions { display: flex; gap: 4px; flex-shrink: 0; }
  .ai-hbtn {
    width: 26px; height: 26px;
    border-radius: 7px;
    border: none;
    background: transparent;
    color: #7f8db5;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    line-height: 1;
    transition: all .2s;
  }
  .ai-hbtn:hover { background: rgba(0,212,255,.12); color: #64d2ff; }
  .ai-hbtn.close:hover { background: rgba(255,92,122,.15); color: #ff5c7a; }

  /* ---------- 消息区 ---------- */
  .ai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
    scroll-behavior: smooth;
  }
  .ai-messages::-webkit-scrollbar { width: 6px; }
  .ai-messages::-webkit-scrollbar-track { background: transparent; }
  .ai-messages::-webkit-scrollbar-thumb {
    background: rgba(0,212,255,.25);
    border-radius: 3px;
  }
  .ai-messages::-webkit-scrollbar-thumb:hover { background: rgba(0,212,255,.45); }

  .ai-msg {
    display: flex;
    gap: 9px;
    animation: aiMsgIn .32s cubic-bezier(.34,1.3,.64,1);
    max-width: 100%;
  }
  @keyframes aiMsgIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ai-msg.user { flex-direction: row-reverse; }
  .ai-msg-avatar {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .ai-msg.ai .ai-msg-avatar {
    background: linear-gradient(135deg, #00d4ff, #7b2cbf);
    color: #fff;
    box-shadow: 0 0 10px rgba(0,212,255,.4);
  }
  .ai-msg.user .ai-msg-avatar {
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(0,212,255,.25);
    color: #7f8db5;
  }
  .ai-bubble {
    padding: 10px 13px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.65;
    max-width: calc(100% - 44px);
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  .ai-msg.ai .ai-bubble {
    background: rgba(255,255,255,.045);
    border: 1px solid rgba(0,212,255,.15);
    border-top-left-radius: 4px;
    color: #d5e3f8;
  }
  .ai-msg.user .ai-bubble {
    background: linear-gradient(135deg, rgba(0,212,255,.2), rgba(123,44,191,.2));
    border: 1px solid rgba(0,212,255,.35);
    border-top-right-radius: 4px;
    color: #fff;
  }
  .ai-bubble strong { color: #64d2ff; font-weight: 700; }
  .ai-msg.user .ai-bubble strong { color: #fff; }
  .ai-bubble code.ai-inline {
    font-family: 'JetBrains Mono','Consolas',monospace;
    font-size: 11.5px;
    background: rgba(0,0,0,.5);
    padding: 1px 5px;
    border-radius: 4px;
    color: #9df5cb;
    border: 1px solid rgba(61,220,151,.2);
  }
  .ai-bubble pre.ai-code {
    display: block;
    margin: 8px 0 4px;
    padding: 10px 12px;
    background: rgba(0,0,0,.55);
    border: 1px solid rgba(0,212,255,.2);
    border-radius: 8px;
    font-family: 'JetBrains Mono','Consolas',monospace;
    font-size: 11.5px;
    line-height: 1.6;
    color: #9df5cb;
    overflow-x: auto;
    white-space: pre;
  }
  .ai-bubble pre.ai-code code { background: none; padding: 0; color: inherit; }

  /* 光标 */
  .ai-cursor {
    display: inline-block;
    width: 6px; height: 12px;
    background: #64d2ff;
    vertical-align: -1px;
    margin-left: 2px;
    animation: aiBlink .9s step-end infinite;
  }
  @keyframes aiBlink { 50% { opacity: 0; } }

  /* 打字指示 */
  .ai-typing { display: flex; gap: 4px; padding: 4px 0; }
  .ai-typing span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #64d2ff;
    animation: aiTypingBounce 1.3s ease-in-out infinite;
  }
  .ai-typing span:nth-child(2) { animation-delay: .18s; }
  .ai-typing span:nth-child(3) { animation-delay: .36s; }
  @keyframes aiTypingBounce {
    0%,60%,100% { transform: translateY(0); opacity: .4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  /* ---------- 预设问题 ---------- */
  .ai-presets {
    padding: 0 16px 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex-shrink: 0;
  }
  .ai-preset {
    padding: 6px 11px;
    border-radius: 16px;
    border: 1px solid rgba(0,212,255,.28);
    background: rgba(0,212,255,.06);
    color: #9fdcff;
    font-size: 11.5px;
    cursor: pointer;
    transition: all .22s;
    font-family: inherit;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .ai-preset:hover {
    background: rgba(0,212,255,.14);
    border-color: rgba(0,212,255,.6);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,212,255,.25);
  }
  .ai-preset .ico { font-size: 12px; }

  /* ---------- 输入区 ---------- */
  .ai-composer {
    padding: 10px 12px 12px;
    border-top: 1px solid rgba(0,212,255,.15);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    background: rgba(0,0,0,.25);
    flex-shrink: 0;
  }
  .ai-input {
    flex: 1;
    min-height: 38px;
    max-height: 110px;
    padding: 9px 12px;
    border-radius: 10px;
    border: 1px solid rgba(0,212,255,.22);
    background: rgba(255,255,255,.035);
    color: #e8f0fb;
    font-size: 13px;
    line-height: 1.5;
    font-family: inherit;
    resize: none;
    outline: none;
    transition: all .25s;
  }
  .ai-input:focus {
    border-color: #00d4ff;
    background: rgba(255,255,255,.06);
    box-shadow: 0 0 0 3px rgba(0,212,255,.12);
  }
  .ai-input::placeholder { color: #5a6b8f; }
  .ai-send {
    width: 38px; height: 38px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #00d4ff, #7b2cbf);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all .25s;
    box-shadow: 0 0 14px rgba(0,212,255,.35);
  }
  .ai-send:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,212,255,.55);
  }
  .ai-send:disabled {
    opacity: .35;
    cursor: not-allowed;
    box-shadow: none;
  }
  .ai-send svg { width: 16px; height: 16px; }

  /* ---------- 缩放把手 ---------- */
  .ai-resize {
    position: absolute;
    right: 0; bottom: 0;
    width: 20px; height: 20px;
    cursor: nwse-resize;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 3px;
    opacity: .5;
    transition: opacity .2s;
    z-index: 2;
  }
  .ai-resize:hover { opacity: 1; }
  .ai-resize::before,
  .ai-resize::after {
    content: '';
    position: absolute;
    border-right: 2px solid #64d2ff;
    border-bottom: 2px solid #64d2ff;
  }
  .ai-resize::before { width: 6px; height: 6px; right: 3px; bottom: 3px; }
  .ai-resize::after  { width: 10px; height: 10px; right: 3px; bottom: 3px; opacity: .4; }

  /* 错误 */
  .ai-err {
    color: #ff8b8b;
    font-size: 12.5px;
    display: inline-flex;
    gap: 6px;
    align-items: flex-start;
  }

  /* 移动端 */
  @media (max-width: 640px) {
    .ai-fab { right: 16px; bottom: 16px; width: 52px; height: 52px; font-size: 22px; }
    .ai-window {
      border-radius: 14px;
      left: 12px !important;
      top: auto !important;
      bottom: 12px !important;
      right: 12px !important;
      width: auto !important;
      height: min(75vh, 640px) !important;
    }
    .ai-resize { display: none; }
  }
  `;

    /* 注入 CSS */
    const styleEl = document.createElement('style');
    styleEl.id = 'aiAssistantStyles';
    styleEl.textContent = AI_CSS;
    document.head.appendChild(styleEl);

    /* ============================================================
       DOM
       ============================================================ */
    const root = document.createElement('div');
    root.id = 'aiAssistantRoot';
    root.innerHTML = `
    <button class="ai-fab" id="aiFab" aria-label="打开 AI 助手">
      <span class="ai-fab-icon-open">💬</span>
      <span class="ai-fab-icon-close">✕</span>
    </button>

    <div class="ai-window" id="aiWindow">
      <div class="ai-header" id="aiHeader">
        <div class="ai-header-avatar">AI</div>
        <div class="ai-header-info">
          <div class="ai-header-title">CodeMaster AI 助手</div>
          <div class="ai-header-sub">DeepSeek 驱动 · 在线</div>
        </div>
        <div class="ai-header-actions">
          <button class="ai-hbtn" id="aiClearBtn" title="清空对话">🗑</button>
          <button class="ai-hbtn close" id="aiCloseBtn" title="关闭">✕</button>
        </div>
      </div>

      <div class="ai-messages" id="aiMessages"></div>

      <div class="ai-presets" id="aiPresets"></div>

      <div class="ai-composer">
        <textarea class="ai-input" id="aiInput" rows="1" placeholder="问点什么…（Enter 发送，Shift+Enter 换行）"></textarea>
        <button class="ai-send" id="aiSendBtn" title="发送">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      <div class="ai-resize" id="aiResize" title="拖动调整大小"></div>
    </div>
  `;
    document.body.appendChild(root);

    /* ============================================================
       状态
       ============================================================ */
    const state = {
        history: [],
        streaming: false,
        open: false,
    };

    /* ============================================================
       DOM 引用
       ============================================================ */
    const $ = id => document.getElementById(id);
    const fab = $('aiFab');
    const win = $('aiWindow');
    const header = $('aiHeader');
    const messagesEl = $('aiMessages');
    const presetsEl = $('aiPresets');
    const inputEl = $('aiInput');
    const sendBtn = $('aiSendBtn');
    const closeBtn = $('aiCloseBtn');
    const clearBtn = $('aiClearBtn');
    const resizeEl = $('aiResize');

    /* ============================================================
       工具
       ============================================================ */
    const escapeHtml = s => String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    /* 轻量 Markdown 渲染：先切分代码块，再处理其他 */
    function renderMarkdown(text) {
        const parts = text.split(/(```\w*\n[\s\S]*?```|```[\s\S]*?```)/g);
        return parts.map(part => {
            if (!part) return '';
            if (part.startsWith('```')) {
                const m = part.match(/```(\w*)\n?([\s\S]*?)```/);
                const code = m ? m[2] : part.replace(/```/g, '');
                return `<pre class="ai-code"><code>${escapeHtml(code.replace(/\n$/, ''))}</code></pre>`;
            }
            let s = escapeHtml(part);
            s = s.replace(/`([^`\n]+)`/g, '<code class="ai-inline">$1</code>');
            s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            s = s.replace(/\n/g, '<br>');
            return s;
        }).join('');
    }

    function scrollBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addMessage(role, html) {
        const div = document.createElement('div');
        div.className = 'ai-msg ' + role;
        div.innerHTML = `
      <div class="ai-msg-avatar">${role === 'ai' ? 'AI' : '你'}</div>
      <div class="ai-bubble">${html}</div>`;
        messagesEl.appendChild(div);
        scrollBottom();
        return div.querySelector('.ai-bubble');
    }

    /* ============================================================
       预设
       ============================================================ */
    function renderPresets() {
        presetsEl.innerHTML = PRESETS.map(p =>
            `<button class="ai-preset" data-q="${escapeHtml(p.text)}">
         <span class="ico">${p.icon}</span>${escapeHtml(p.text)}
       </button>`
        ).join('');
        presetsEl.querySelectorAll('.ai-preset').forEach(btn => {
            btn.addEventListener('click', () => {
                inputEl.value = btn.dataset.q;
                send();
            });
        });
    }
    function hidePresets() { presetsEl.style.display = 'none'; }
    function showPresets() { presetsEl.style.display = 'flex'; }

    /* ============================================================
       发送 / 流式接收
       ============================================================ */
    async function send() {
        const text = inputEl.value.trim();
        if (!text || state.streaming) return;

        addMessage('user', renderMarkdown(text));
        state.history.push({ role: 'user', content: text });
        inputEl.value = '';
        autoResize();
        hidePresets();

        state.streaming = true;
        sendBtn.disabled = true;

        const bubble = addMessage('ai', '<div class="ai-typing"><span></span><span></span><span></span></div>');
        let acc = '';
        let firstChunk = true;

        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: state.history }),
            });

            if (!res.ok) {
                let msg = `请求失败 (${res.status})`;
                try { const j = await res.json(); if (j.error) msg = j.error; } catch { }
                bubble.innerHTML = `<span class="ai-err">⚠️ ${escapeHtml(msg)}</span>`;
                state.history.pop();
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buf = '';

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
                    if (data === '[DONE]') continue;
                    try {
                        const json = JSON.parse(data);
                        if (json.text) {
                            if (firstChunk) { bubble.innerHTML = ''; firstChunk = false; }
                            acc += json.text;
                            bubble.innerHTML = renderMarkdown(acc) + '<span class="ai-cursor"></span>';
                            scrollBottom();
                        }
                    } catch { }
                }
            }

            if (firstChunk) {
                bubble.innerHTML = '<span class="ai-err">⚠️ 未收到回复内容</span>';
            } else {
                bubble.innerHTML = renderMarkdown(acc);
                state.history.push({ role: 'assistant', content: acc });
            }
        } catch (e) {
            bubble.innerHTML = `<span class="ai-err">⚠️ 网络错误：${escapeHtml(e.message)}</span>`;
            state.history.pop();
        } finally {
            state.streaming = false;
            sendBtn.disabled = false;
            inputEl.focus();
        }
    }

    function autoResize() {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 110) + 'px';
    }

    /* ============================================================
       打开 / 关闭 / 清空
       ============================================================ */
    function openWindow() {
        state.open = true;
        fab.classList.add('open');
        win.classList.add('open');
        if (!state._positioned) initPosition();
        if (!state.history.length) {
            addMessage('ai', renderMarkdown(WELCOME));
            state.history.push({ role: 'assistant', content: WELCOME });
            showPresets();
        }
        setTimeout(() => inputEl.focus(), 220);
    }

    function closeWindow() {
        state.open = false;
        fab.classList.remove('open');
        win.classList.remove('open');
    }

    function toggleWindow() {
        state.open ? closeWindow() : openWindow();
    }

    function clearChat() {
        if (state.streaming) return;
        state.history = [];
        messagesEl.innerHTML = '';
        addMessage('ai', renderMarkdown(WELCOME));
        state.history.push({ role: 'assistant', content: WELCOME });
        showPresets();
    }

    /* ============================================================
       初始定位
       ============================================================ */
    function initPosition() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let W = Math.min(420, vw - 32);
        let H = Math.min(600, vh - 32);
        if (vw <= 640) return; // 移动端用 CSS 定位

        const LEFT = Math.max(12, vw - W - 24);
        const TOP = Math.max(12, vh - H - 24);
        win.style.left = LEFT + 'px';
        win.style.top = TOP + 'px';
        win.style.width = W + 'px';
        win.style.height = H + 'px';
        state._positioned = true;
    }

    /* ============================================================
       拖拽（拖动头部）
       ============================================================ */
    let dragState = null;

    header.addEventListener('pointerdown', e => {
        if (e.target.closest('.ai-hbtn')) return;
        if (window.innerWidth <= 640) return;

        const rect = win.getBoundingClientRect();
        dragState = {
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
        };
        header.classList.add('dragging');
        header.setPointerCapture(e.pointerId);
    });

    header.addEventListener('pointermove', e => {
        if (!dragState) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const w = win.offsetWidth;
        const h = win.offsetHeight;
        let x = e.clientX - dragState.offsetX;
        let y = e.clientY - dragState.offsetY;
        x = Math.max(-w + 80, Math.min(vw - 80, x));
        y = Math.max(0, Math.min(vh - 40, y));
        win.style.left = x + 'px';
        win.style.top = y + 'px';
        win.style.right = 'auto';
        win.style.bottom = 'auto';
    });

    header.addEventListener('pointerup', e => {
        dragState = null;
        header.classList.remove('dragging');
        try { header.releasePointerCapture(e.pointerId); } catch { }
    });

    /* ============================================================
       缩放（右下角把手）
       ============================================================ */
    let resizeState = null;

    resizeEl.addEventListener('pointerdown', e => {
        e.stopPropagation();
        const rect = win.getBoundingClientRect();
        resizeState = {
            startX: e.clientX,
            startY: e.clientY,
            startW: rect.width,
            startH: rect.height,
        };
        resizeEl.setPointerCapture(e.pointerId);
    });

    resizeEl.addEventListener('pointermove', e => {
        if (!resizeState) return;
        const dx = e.clientX - resizeState.startX;
        const dy = e.clientY - resizeState.startY;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const w = Math.max(320, Math.min(vw - 24, resizeState.startW + dx));
        const h = Math.max(380, Math.min(vh - 24, resizeState.startH + dy));
        win.style.width = w + 'px';
        win.style.height = h + 'px';
    });

    resizeEl.addEventListener('pointerup', e => {
        resizeState = null;
        try { resizeEl.releasePointerCapture(e.pointerId); } catch { }
    });

    /* ============================================================
       事件绑定
       ============================================================ */
    fab.addEventListener('click', toggleWindow);
    closeBtn.addEventListener('click', closeWindow);
    clearBtn.addEventListener('click', clearChat);
    sendBtn.addEventListener('click', send);
    inputEl.addEventListener('input', autoResize);
    inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });

    /* 窗口在视口外时自动拉回 */
    window.addEventListener('resize', () => {
        if (!state.open || window.innerWidth <= 640) return;
        const rect = win.getBoundingClientRect();
        if (rect.left > window.innerWidth - 100 || rect.top > window.innerHeight - 60) {
            win.style.left = '';
            win.style.top = '';
            initPosition();
        }
    });

    /* ============================================================
       初始化
       ============================================================ */
    renderPresets();
    autoResize();
})();