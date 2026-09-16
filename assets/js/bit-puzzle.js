/* ============================================================
   bit-puzzle.js v3.2
   位运算推箱子 Bit Puzzle

   v3.2 更新：
   - 新增"提示"功能：每关 3 次，高亮正确的下一步操作
   - 使用提示后星级上限降低（1 次 → 最高 2 星，2 次 → 最高 1 星）
   - 提示按钮位于底部提示栏右侧，显示剩余次数
   ============================================================ */
(function () {
    'use strict';

    const BITS = 8;
    const FULL = (1 << BITS) - 1;
    const MAX_HINTS = 3;

    /* ============================================================
       BFS 求解器 1：静态计算最优步数
       ============================================================ */
    function computeOptimalMoves(start, target, masks) {
        if (start === target) return 0;

        const ops = [
            v => (v << 1) & FULL,
            v => v >> 1,
            v => v ^ FULL,
            v => 0
        ];
        for (const m of masks) {
            ops.push(v => v & m);
            ops.push(v => v | m);
            ops.push(v => v ^ m);
        }

        const dist = new Int16Array(256).fill(-1);
        dist[start] = 0;
        const queue = [start];
        let head = 0;

        while (head < queue.length) {
            const v = queue[head++];
            const nd = dist[v] + 1;
            for (let i = 0; i < ops.length; i++) {
                const n = ops[i](v);
                if (dist[n] === -1) {
                    dist[n] = nd;
                    if (n === target) return nd;
                    queue.push(n);
                }
            }
        }
        return -1;
    }

    /* ============================================================
       BFS 求解器 2：从任意状态找下一步
       返回：{ op: 'shl'|..., maskIdx: 0|1|...|-1 }
       maskIdx = -1 表示非掩码操作
       ============================================================ */
    function findNextStep(startValue, target, masks) {
        if (startValue === target) return null;

        const visited = new Map();
        visited.set(startValue, null);
        const queue = [startValue];
        let head = 0;
        let found = false;

        while (head < queue.length && !found) {
            const v = queue[head++];

            /* 基本操作 */
            const moves = [
                { op: 'shl', next: (v << 1) & FULL, maskIdx: -1 },
                { op: 'shr', next: v >> 1, maskIdx: -1 },
                { op: 'not', next: v ^ FULL, maskIdx: -1 },
                { op: 'clr', next: 0, maskIdx: -1 }
            ];
            /* 掩码操作 */
            for (let mi = 0; mi < masks.length; mi++) {
                const m = masks[mi];
                moves.push({ op: 'and', next: v & m, maskIdx: mi });
                moves.push({ op: 'or',  next: v | m, maskIdx: mi });
                moves.push({ op: 'xor', next: v ^ m, maskIdx: mi });
            }

            for (const move of moves) {
                if (visited.has(move.next)) continue;
                visited.set(move.next, { from: v, op: move.op, maskIdx: move.maskIdx });

                if (move.next === target) {
                    found = true;
                    break;
                }
                queue.push(move.next);
            }
        }

        if (!found) return null;

        /* 回溯：从 target 一步步回到起点，取最后一步（即第一步） */
        let current = target;
        let info = visited.get(current);
        while (info && info.from !== startValue) {
            current = info.from;
            info = visited.get(current);
        }
        return info ? { op: info.op, maskIdx: info.maskIdx } : null;
    }

    /* ============================================================
       关卡数据
       ============================================================ */
    const LEVELS = [
        { start: 0x01, target: 0x3C, masks: [0x0F], tip: '先填低位再移位：x | 0x0F 得到 0x0F，再连按两次 x << 1 就是 0x3C。' },
        { start: 0x30, target: 0x33, masks: [0x0F], tip: '取反也是一步棋：~0x30 = 0xCF，再连按两次 x >> 1：0xCF → 0x67 → 0x33。' },
        { start: 0x03, target: 0x1C, masks: [0x0C], tip: '移位和置位交替用：<< 1 得 0x06，| 0x0C 点亮第 2、3 位得 0x0E，再 << 1 得 0x1C。' },
        { start: 0x0F, target: 0x33, masks: [0xF0], tip: '两步左移把 0x0F 扩成 0x3C，取反得 0xC3，再 ^ 0xF0 把高 4 位翻回来，落到 0x33。' },
        { start: 0x69, target: 0x1C, masks: [0x3C], tip: '移位 → 掩码取位 → 移位 → 异或：0x69 → 0xD2 → (x & 0x3C) 0x10 → 0x20 → (x ^ 0x3C) 0x1C。' },
        { start: 0xAA, target: 0x17, masks: [0x0F], tip: '左移再右移会丢掉最高位：0xAA → 0x54 → 0x2A；| 0x0F 点亮低位得 0x2F，最后 >> 1 得 0x17。' },
        { start: 0x96, target: 0x07, masks: [0x69], tip: '移位与异或交替，让高位的 1 分段落下：0x96 → >> 1 0x4B → ~ 0xB4 → ^ 0x69 0xDD → >> 1 0x6E → ^ 0x69 0x07。' },
        { start: 0xC0, target: 0x2E, masks: [0x3F], tip: '先用 ^ 0x3F 把低 6 位整体翻转，再 >> 1 两次收窄到 0x17，最后 << 1 得 0x2E。' },
        { start: 0x55, target: 0x29, masks: [0xAA], tip: 'x | 0xAA 先补成 0xFF，连按三次 << 1 让溢出位逐位丢光得 0xF8，^ 0xAA 得 0x52，再 >> 1 得 0x29。' },
        { start: 0x87, target: 0x25, masks: [0x78], tip: '移位和异或交替，把图案一步步搬过去：0x87 → 0x0E → 0x1C → ^ 0x78 0x64 → 0x32 → ^ 0x78 0x4A → >> 1 0x25。' },
        { start: 0x55, target: 0x32, masks: [0xAA], tip: '右移与取反交替：0x55 → 0x2A → ~ 0xD5 → 0x6A → 0x35 → ~ 0xCA → 0x65 → 0x32。' },
        { start: 0x96, target: 0xAB, masks: [0x69], tip: '7 步最优：<< 1 丢掉最高位 → | 0x69 置位 → ^ 0x69 翻转 → << 1 移位 → ^ 0x69 翻转 → << 1 移位 → ^ 0x69 翻转。' },
        { start: 0x96, target: 0x3E, masks: [0x3C, 0x69], tip: '两个掩码都能用：0x96 → >> 1 0x4B → ^ 0x3C 0x77 → 连续 >> 1 两次得 0x1D → << 1 0x3A → | 0x3C 0x3E。' },
        { start: 0x5A, target: 0x1F, masks: [0x96, 0x0F], tip: '两个掩码组合使用。先 | 0x96 放大再逐步收窄，找出 8 步解。' },
        { start: 0x21, target: 0x33, masks: [0xC3, 0x1E], tip: '0x21 偏小，先异或放大再收窄：0x21 → ^ 0xC3 0xE2 → 连续 >> 1 四次得 0x0E → | 0xC3 0xCF → 两次 >> 1 得 0x33。' },
        { start: 0xCC, target: 0x07, masks: [0xF0, 0x69], tip: '终局关：0xCC → >> 1 0x66 → >> 1 0x33 → | 0xF0 0xF3 → 连续 >> 1 四次得 0x0F → >> 1 得 0x07。' }
    ];

    /* 验证并计算 best / moves */
    (function validateAndCalculate() {
        LEVELS.forEach((level, index) => {
            const optimal = computeOptimalMoves(level.start, level.target, level.masks);
            if (optimal < 0) {
                console.error(`[BitPuzzle] 关卡 ${index + 1} 无解！`, level);
                level.best = 5;
                level.moves = 6;
                level.broken = true;
                return;
            }
            level.best = optimal;
            level.moves = index < 3 ? optimal + 2 : optimal + 1;
        });
    })();

    const OPS = [
        { id: 'shl', label: 'x << 1', short: '<<', desc: '左移一位（×2）', kind: 'shift' },
        { id: 'shr', label: 'x >> 1', short: '>>', desc: '右移一位（÷2）', kind: 'shift' },
        { id: 'and', label: 'x & 掩码', short: '&', desc: '按位与：只保留掩码为 1 的位', kind: 'mask' },
        { id: 'or', label: 'x | 掩码', short: '|', desc: '按位或：把掩码为 1 的位打开', kind: 'mask' },
        { id: 'xor', label: 'x ^ 掩码', short: '^', desc: '按位异或：掩码为 1 的位翻转', kind: 'mask' },
        { id: 'not', label: '~ x', short: '~', desc: '按位取反（等价 x ^ 0xFF）', kind: 'not' },
        { id: 'clr', label: 'x & 0', short: '0', desc: '清零：所有位归零', kind: 'clear' },
        { id: 'undo', label: '还原', short: 'U', desc: '回退到上一步（不消耗步数）', kind: 'undo' }
    ];

    const root = document.getElementById('bitPuzzleRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="bp-shell">
            <!-- ========== 关卡选择 ========== -->
            <div class="bp-level-select active" id="bpLevelSelect">
                <div class="bp-level-header">
                    <h3>位运算推箱子</h3>
                    <p>BIT PUZZLE · LEVEL SELECT</p>
                    <div class="bp-level-summary">
                        <span>通关 <b id="bpLevelCleared">0</b> / ${LEVELS.length}</span>
                        <span class="score-badge">⭐ <b id="bpLevelStars">0</b> / ${LEVELS.length * 3}</span>
                    </div>
                </div>
                <div class="bp-level-grid" id="bpLevelGrid"></div>
                <div class="bp-level-footer">
                    <span>💡 通关一关解锁下一关 · 步数越少星级越高</span>
                    <button id="bpResetProgress">重置进度</button>
                </div>
            </div>

            <!-- ========== 游戏区 ========== -->
            <div class="bp-play-area" id="bpPlayArea" style="display:none;">
                <header class="bp-header">
                    <button class="bp-back-btn" id="bpBackBtn" title="返回关卡列表">← 关卡</button>
                    <h2>位运算推箱子 <small>BIT PUZZLE</small></h2>
                    <div class="bp-stats">
                        <div class="bp-stat"><small>LEVEL</small><strong id="bpLevel"></strong></div>
                        <div class="bp-stat moves"><small>MOVES</small><strong id="bpMoves"></strong></div>
                        <div class="bp-stat stars"><small>STARS</small><strong id="bpStars"></strong></div>
                    </div>
                </header>

                <div class="bp-board">
                    <section class="bp-lane-wrap">
                        <div class="bp-lane-head"><span>🎯 目标 · target</span><span class="bp-lane-num" id="bpTargetNum"></span></div>
                        <div class="bp-lane" id="bpTargetRow"></div>
                    </section>

                    <section class="bp-lane-wrap current">
                        <div class="bp-lane-head"><span>🧱 当前 · x</span><span class="bp-lane-num" id="bpValueNum"></span></div>
                        <div class="bp-lane" id="bpValueRow"></div>
                    </section>

                    <section class="bp-lane-wrap mask">
                        <div class="bp-lane-head"><span>🎚 掩码 · mask（从预设中选，切换不耗步数）</span><span class="bp-lane-num" id="bpMaskNum"></span></div>
                        <div class="bp-lane" id="bpMaskRow"></div>
                        <div class="bp-mask-presets" id="bpMaskPresets"></div>
                    </section>
                </div>

                <div class="bp-ops" id="bpOps"></div>
                <div class="bp-readout" id="bpReadout"></div>
                <div class="bp-log" id="bpLog"></div>
                <div class="bp-note">
                    <span>← → 选操作 · Enter 执行 · U 还原上一步 · R 重开本关 · M 换掩码</span>
                    <button class="bp-hint-btn" id="bpHintBtn" title="高亮下一步正确操作（用提示会降低星级上限）">
                        💡 提示 <span class="count" id="bpHintCount">3</span>
                    </button>
                </div>

                <div class="bp-overlay" id="bpOverlay" hidden>
                    <div class="bp-card">
                        <h3 id="bpCardTitle"></h3>
                        <p id="bpCardText"></p>
                        <button id="bpCardBtn"></button>
                        <button id="bpCardBtnBack">返回关卡列表</button>
                    </div>
                </div>
            </div>
        </div>`;

    const $ = id => document.getElementById(id);
    const toBits = value => Array.from({ length: BITS }, (_, i) => (value >> (BITS - 1 - i)) & 1);
    const bin = value => '0b' + value.toString(2).padStart(BITS, '0');
    const hex = value => '0x' + value.toString(16).toUpperCase().padStart(2, '0');
    const num = value => `${bin(value)}（${hex(value)} · ${value}）`;

    /* ============================================================
       状态
       ============================================================ */
    const state = {
        screen: 'select',
        levelIndex: 0,
        value: 0,
        mask: 0,
        maskIndex: 0,
        history: [],
        moves: 0,
        hintsUsed: 0,
        hintActive: null,   /* { op, maskIdx } 当前正在提示的操作 */
        progress: { unlocked: 0, stars: {} },
        cursor: 0,
        phase: 'playing',
        diff: { fell: [], rose: [] },
        anim: '',
        logs: []
    };

    const currentLevel = () => LEVELS[state.levelIndex];

    /* ============================================================
       进度存档
       ============================================================ */
    function loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem('cm_game_bit_progress') || 'null');
            if (saved && typeof saved === 'object') {
                state.progress.unlocked = Math.max(0, Math.min(LEVELS.length - 1, saved.unlocked || 0));
                state.progress.stars = saved.stars || {};
            }
        } catch (e) {}
    }

    function saveProgress() {
        try {
            localStorage.setItem('cm_game_bit_progress', JSON.stringify(state.progress));
        } catch (e) {}
    }

    function resetProgress() {
        if (!confirm('确定要重置所有关卡进度吗？已通关的星级也会清空。')) return;
        state.progress = { unlocked: 0, stars: {} };
        saveProgress();
        renderLevelSelect();
    }

    /* ============================================================
       关卡选择界面
       ============================================================ */
    function renderLevelSelect() {
        const grid = $('bpLevelGrid');
        grid.innerHTML = LEVELS.map((level, index) => {
            const unlocked = index <= state.progress.unlocked;
            const stars = state.progress.stars[index] || 0;
            const cleared = stars > 0;

            const classes = ['bp-level-card'];
            if (!unlocked) classes.push('locked');
            if (cleared) classes.push('cleared');

            let starDisplay;
            if (!unlocked) {
                starDisplay = '🔒';
            } else if (cleared) {
                starDisplay = '★'.repeat(stars) + '☆'.repeat(3 - stars);
            } else {
                starDisplay = '☆☆☆';
            }

            return `
                <button class="${classes.join(' ')}" data-level="${index}" ${!unlocked ? 'disabled' : ''}>
                    <div class="lv-num">${index + 1}</div>
                    <div class="lv-stars">${starDisplay}</div>
                    <div class="lv-info">最优 <b>${level.best}</b> · 限 <b>${level.moves}</b></div>
                </button>
            `;
        }).join('');

        const clearedCount = Object.keys(state.progress.stars).filter(k => state.progress.stars[k] > 0).length;
        const totalStars = Object.values(state.progress.stars).reduce((a, b) => a + b, 0);
        $('bpLevelCleared').textContent = clearedCount;
        $('bpLevelStars').textContent = totalStars;

        grid.querySelectorAll('button[data-level]').forEach(btn => {
            if (btn.disabled) return;
            btn.onclick = () => enterLevel(Number(btn.dataset.level));
        });
    }

    function showSelectScreen() {
        state.screen = 'select';
        state.phase = 'stopped';
        state.hintActive = null;
        $('bpLevelSelect').classList.add('active');
        $('bpLevelSelect').style.display = 'block';
        $('bpPlayArea').style.display = 'none';
        document.querySelector('.bp-shell').style.width = 'min(100%, 560px)';
        renderLevelSelect();
    }

    function showPlayScreen() {
        state.screen = 'playing';
        $('bpLevelSelect').classList.remove('active');
        $('bpLevelSelect').style.display = 'none';
        $('bpPlayArea').style.display = 'block';
        document.querySelector('.bp-shell').style.width = '';
    }

    /* ============================================================
       进入关卡
       ============================================================ */
    function enterLevel(index) {
        state.levelIndex = index;
        state.value = currentLevel().start;
        state.maskIndex = 0;
        state.mask = currentLevel().masks[0];
        state.history = [];
        state.moves = 0;
        state.hintsUsed = 0;
        state.hintActive = null;
        state.phase = 'playing';
        state.diff = { fell: [], rose: [] };
        state.anim = '';
        state.cursor = 0;
        state.logs = [];
        $('bpOverlay').hidden = true;

        showPlayScreen();

        log(`══ 第 ${index + 1} 关 ══`, 'purple');
        log(`目标 ${hex(currentLevel().target)} · 步数上限 ${currentLevel().moves}（最优 ${currentLevel().best}）`, 'dim');
        log(`可用掩码 ${currentLevel().masks.map(hex).join(' / ')} · 按 M 或点击切换（不耗步数）`, 'dim');
        render();
    }

    /* ============================================================
       日志
       ============================================================ */
    function log(text, cls = '') {
        state.logs.push({ text, cls });
        if (state.logs.length > 30) state.logs.shift();
        const logEl = $('bpLog');
        if (!logEl) return;
        logEl.innerHTML = state.logs.map(item => `<div class="${item.cls}">${item.text}</div>`).join('');
        logEl.scrollTop = 9999;
    }

    /* ============================================================
       星级
       ============================================================ */
    function starsFor(moves) {
        const level = currentLevel();

        /* 使用提示会降低星级上限 */
        let maxStars = 3;
        if (state.hintsUsed >= 2) maxStars = 1;
        else if (state.hintsUsed >= 1) maxStars = 2;

        let stars;
        if (moves <= level.best) stars = 3;
        else if (moves <= level.best + 1) stars = 2;
        else stars = 1;

        return Math.min(stars, maxStars);
    }

    function diffOf(before, after) {
        const fell = [];
        const rose = [];
        for (let bit = 0; bit < BITS; bit++) {
            const probe = 1 << bit;
            if ((before & probe) && !(after & probe)) fell.push(bit);
            else if (!(before & probe) && (after & probe)) rose.push(bit);
        }
        return { fell, rose };
    }

    /* ============================================================
       渲染
       ============================================================ */
    function renderLane(id, value, extra) {
        const opts = extra || {};
        const el = $(id);
        if (!el) return;
        el.innerHTML = toBits(value).map((bit, index) => {
            const bitIndex = BITS - 1 - index;
            const classes = ['bp-cell'];
            if (bit) classes.push('on');
            if (opts.diff && opts.diff.fell.indexOf(bitIndex) >= 0) classes.push('fell');
            if (opts.diff && opts.diff.rose.indexOf(bitIndex) >= 0) classes.push('rose');
            return `<i class="${classes.join(' ')}"><b>${bit}</b><span>${bitIndex}</span></i>`;
        }).join('');
    }

    function renderMaskPresets() {
        const level = currentLevel();
        const hintMaskIdx = state.hintActive && state.hintActive.maskIdx >= 0
            ? state.hintActive.maskIdx : -1;

        $('bpMaskPresets').innerHTML = level.masks.map((mask, index) => {
            const classes = ['bp-mask-chip'];
            if (index === state.maskIndex) classes.push('active');
            if (index === hintMaskIdx) classes.push('hint');
            return `<button class="${classes.join(' ')}" data-mask-index="${index}"
                title="掩码 ${bin(mask)}">${hex(mask)}</button>`;
        }).join('');

        $('bpMaskPresets').querySelectorAll('button').forEach(button => {
            button.onclick = () => selectMask(Number(button.dataset.maskIndex));
        });
    }

    function selectMask(index) {
        if (state.phase !== 'playing') return;
        const masks = currentLevel().masks;
        state.maskIndex = ((index % masks.length) + masks.length) % masks.length;
        state.mask = masks[state.maskIndex];
        render();
    }

    function renderOps() {
        const hintOpId = state.hintActive ? state.hintActive.op : null;

        $('bpOps').innerHTML = OPS.map((op, index) => {
            const classes = ['bp-op', op.kind];
            if (index === state.cursor) classes.push('active');
            if (op.id === hintOpId) classes.push('hint');
            return `<button class="${classes.join(' ')}" data-op="${op.id}"
                title="${op.desc}">${op.label}<small>${index + 1}</small></button>`;
        }).join('');

        $('bpOps').querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                state.cursor = OPS.findIndex(op => op.id === button.dataset.op);
                act(button.dataset.op);
            };
        });
    }

    function renderHintButton() {
        const btn = $('bpHintBtn');
        const countEl = $('bpHintCount');
        const left = MAX_HINTS - state.hintsUsed;

        countEl.textContent = left;

        /* 剩余 0 次时禁用 */
        if (left <= 0) {
            btn.disabled = true;
            btn.classList.remove('warn');
            return;
        }

        /* 已通关 / 失败时禁用 */
        if (state.phase !== 'playing') {
            btn.disabled = true;
            btn.classList.remove('warn');
            return;
        }

        btn.disabled = false;
        btn.classList.toggle('warn', left === 1);
    }

    function playAnim() {
        const row = $('bpValueRow');
        if (state.anim === 'left' || state.anim === 'right') {
            row.classList.add(state.anim === 'left' ? 'shift-left' : 'shift-right');
            setTimeout(() => row.classList.remove('shift-left', 'shift-right'), 260);
        }
        state.anim = '';
    }

    function render() {
        const level = currentLevel();
        const solved = state.phase === 'cleared' || state.phase === 'complete';
        const stars = solved ? starsFor(state.moves) : 0;

        $('bpLevel').textContent = `${state.levelIndex + 1}/${LEVELS.length}`;
        $('bpMoves').textContent = `${state.moves}/${level.moves}`;
        $('bpStars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);

        $('bpTargetNum').textContent = num(level.target);
        $('bpValueNum').textContent = num(state.value);
        $('bpMaskNum').textContent = num(state.mask);

        renderLane('bpTargetRow', level.target);
        renderLane('bpValueRow', state.value, { diff: state.diff });
        renderLane('bpMaskRow', state.mask);
        renderMaskPresets();
        renderOps();
        renderHintButton();

        /* Readout：优先显示提示信息 */
        if (state.hintActive) {
            const op = OPS.find(o => o.id === state.hintActive.op);
            const maskPart = state.hintActive.maskIdx >= 0
                ? `（用掩码 <b>${hex(level.masks[state.hintActive.maskIdx])}</b>）`
                : '';
            $('bpReadout').innerHTML = `<span class="hint-text">💡 建议下一步：<b>${op.label}</b>${maskPart}</span>`;
        } else if (state.value === level.target) {
            $('bpReadout').innerHTML = `✅ x 已经等于目标 <b>${hex(level.target)}</b>`;
        } else {
            $('bpReadout').innerHTML = `把 <b>${hex(state.value)}</b> 推到 <b>${hex(level.target)}</b>，还剩 ${Math.max(0, level.moves - state.moves)} 步`;
        }

        playAnim();
    }

    /* ============================================================
       提示功能
       ============================================================ */
    function useHint() {
        if (state.phase !== 'playing') return;
        if (state.hintsUsed >= MAX_HINTS) return;

        const level = currentLevel();
        const step = findNextStep(state.value, level.target, level.masks);

        if (!step) {
            /* 理论上不会发生（关卡都验证过有解），但保险处理 */
            log('// 无可用提示', 'dim');
            return;
        }

        state.hintsUsed++;
        state.hintActive = step;

        /* 如果提示涉及掩码，且当前掩码不对 → 自动切到正确掩码，但不算操作 */
        if (step.maskIdx >= 0 && step.maskIdx !== state.maskIndex) {
            state.maskIndex = step.maskIdx;
            state.mask = level.masks[step.maskIdx];
            log(`💡 提示：切换到掩码 ${hex(state.mask)}`, 'hint');
        }

        const op = OPS.find(o => o.id === step.op);
        log(`💡 提示：尝试「${op.label}」`, 'hint');

        /* 更新星级提示 */
        const leftAfter = MAX_HINTS - state.hintsUsed;
        let starMsg = '';
        if (state.hintsUsed === 1) starMsg = '（本关星级上限降为 2 星）';
        else if (state.hintsUsed >= 2) starMsg = '（本关星级上限降为 1 星）';
        if (starMsg) log(starMsg, 'dim');

        render();
    }

    /* ============================================================
       通关 / 失败卡片
       ============================================================ */
    function showCleared(stars) {
        const level = currentLevel();
        const isLast = state.levelIndex >= LEVELS.length - 1;

        const clearedCount = Object.keys(state.progress.stars).filter(k => state.progress.stars[k] > 0).length;
        const allCleared = clearedCount >= LEVELS.length;

        let title, text, btnText;

        if (isLast && allCleared) {
            const totalStars = Object.values(state.progress.stars).reduce((a, b) => a + b, 0);
            title = '🏆 全部通关！';
            text = `你通关了全部 <b>${LEVELS.length}</b> 关，共获得 <b>⭐${totalStars}</b> / ${LEVELS.length * 3} 星<br><br>💡 ${level.tip}`;
            btnText = '返回关卡列表';
        } else {
            title = '✨ 通关！';
            const starsDisplay = '★'.repeat(stars) + '☆'.repeat(3 - stars);
            const hintMsg = state.hintsUsed > 0 ? `<br><span style="color:#8a7040;font-size:10px">（使用提示 ${state.hintsUsed} 次，星级上限降低）</span>` : '';
            text = `本关 <b style="color:var(--bp-amber);letter-spacing:2px">${starsDisplay}</b> · 用步数 <b>${state.moves}</b>（最优 ${level.best}）${hintMsg}<br><br>💡 ${level.tip}`;
            btnText = '下一关';
        }

        $('bpCardTitle').textContent = title;
        $('bpCardText').innerHTML = text;
        $('bpCardBtn').textContent = btnText;
        $('bpOverlay').classList.remove('failed');
        $('bpOverlay').hidden = false;

        $('bpCardBtnBack').style.display = 'block';
    }

    function showFailed() {
        $('bpCardTitle').textContent = '✖ 步数耗尽';
        $('bpCardText').innerHTML = `当前 x = <b>${num(state.value)}</b><br>目标 target = <b>${num(currentLevel().target)}</b><br><br>💡 想清楚"要保留哪些位、要点亮哪些位"，再决定用 & 还是 |。也可以按 U 还原。`;
        $('bpCardBtn').textContent = '重试本关';
        $('bpOverlay').classList.add('failed');
        $('bpOverlay').hidden = false;

        $('bpCardBtnBack').style.display = 'block';
    }

    /* ============================================================
       结算
       ============================================================ */
    function evaluate() {
        const level = currentLevel();

        if (state.value === level.target) {
            const stars = starsFor(state.moves);

            const prevStars = state.progress.stars[state.levelIndex] || 0;
            if (stars > prevStars) {
                state.progress.stars[state.levelIndex] = stars;
            }
            if (state.levelIndex + 1 < LEVELS.length && state.progress.unlocked < state.levelIndex + 1) {
                state.progress.unlocked = state.levelIndex + 1;
            }
            saveProgress();

            state.phase = 'cleared';
            state.hintActive = null;

            log(`★ 命中目标！获得 ${stars} 星`, 'green');
            render();
            showCleared(stars);
            return;
        }

        if (state.moves >= level.moves) {
            state.phase = 'failed';
            state.hintActive = null;
            render();
            showFailed();
            return;
        }

        render();
    }

    /* ============================================================
       操作
       ============================================================ */
    function act(id) {
        if (state.phase !== 'playing') return;

        const level = currentLevel();
        const before = state.value;
        let next = before;
        let label = '';

        /* 步数已满时禁止任何操作（还原除外） */
        if (state.moves >= level.moves && id !== 'undo') {
            log('// 步数已用尽，按 R 重开本关', 'red');
            return;
        }

        /* ============ 还原 ============ */
        if (id === 'undo') {
            if (!state.history.length) {
                log('// 没有可还原的操作', 'dim');
                return;
            }
            const snap = state.history.pop();
            state.value = snap.value;
            state.moves = snap.moves;
            state.diff = diffOf(before, snap.value);
            state.hintActive = null;   /* 还原时清除提示 */
            log(`还原 → ${hex(snap.value)}（步数退回 ${snap.moves}）`, 'dim');
            render();
            return;
        }

        if (id === 'shl') {
            next = (before << 1) & FULL;
            state.anim = 'left';
            label = `x << 1 → ${hex(next)}`;
        } else if (id === 'shr') {
            next = before >> 1;
            state.anim = 'right';
            label = `x >> 1 → ${hex(next)}`;
        } else if (id === 'and') {
            next = before & state.mask;
            label = `x & ${hex(state.mask)} → ${hex(next)}`;
        } else if (id === 'or') {
            next = before | state.mask;
            label = `x | ${hex(state.mask)} → ${hex(next)}`;
        } else if (id === 'xor') {
            next = before ^ state.mask;
            label = `x ^ ${hex(state.mask)} → ${hex(next)}`;
        } else if (id === 'not') {
            next = before ^ FULL;
            label = `~x → ${hex(next)}`;
        } else if (id === 'clr') {
            next = 0;
            label = `x & 0 → ${hex(next)}`;
        } else {
            return;
        }

        state.history.push({ value: before, moves: state.moves });
        state.value = next;
        state.moves++;
        state.diff = diffOf(before, next);
        state.hintActive = null;   /* 执行操作后清除提示 */
        log(label, next === level.target ? 'green' : '');
        evaluate();
    }

    /* ============================================================
       事件绑定
       ============================================================ */
    $('bpCardBtn').addEventListener('click', () => {
        $('bpOverlay').hidden = true;

        if (state.phase === 'cleared') {
            if (state.levelIndex + 1 < LEVELS.length) {
                enterLevel(state.levelIndex + 1);
            } else {
                showSelectScreen();
            }
            return;
        }
        enterLevel(state.levelIndex);
    });

    $('bpCardBtnBack').addEventListener('click', () => {
        $('bpOverlay').hidden = true;
        showSelectScreen();
    });

    $('bpBackBtn').addEventListener('click', () => {
        showSelectScreen();
    });

    $('bpResetProgress').addEventListener('click', resetProgress);
    $('bpHintBtn').addEventListener('click', useHint);

    /* ============================================================
       键盘
       ============================================================ */
    document.addEventListener('keydown', event => {
        if (!root.classList.contains('active')) return;
        if (state.screen !== 'playing') return;

        if (state.phase !== 'playing') {
            if (event.key === 'Enter' && !$('bpOverlay').hidden) {
                event.preventDefault();
                $('bpCardBtn').click();
            } else if (event.key === 'Escape' && !$('bpOverlay').hidden) {
                event.preventDefault();
                $('bpCardBtnBack').click();
            }
            return;
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            const step = event.key === 'ArrowRight' ? 1 : OPS.length - 1;
            state.cursor = (state.cursor + step) % OPS.length;
            render();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            act(OPS[state.cursor].id);
        } else if (event.key === 'u' || event.key === 'U') {
            act('undo');
        } else if (event.key === 'r' || event.key === 'R') {
            enterLevel(state.levelIndex);
        } else if (event.key === 'm' || event.key === 'M') {
            selectMask(state.maskIndex + 1);
        } else if (event.key === 'h' || event.key === 'H') {
            event.preventDefault();
            useHint();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            showSelectScreen();
        } else if (/^[1-8]$/.test(event.key)) {
            act(OPS[Number(event.key) - 1].id);
        }
    });

    /* ============================================================
       初始化 & 对外接口
       ============================================================ */
    loadProgress();

    window.BitPuzzle = {
        start() {
            root.classList.add('active');
            showSelectScreen();
        },
        stop() {
            root.classList.remove('active');
            state.phase = 'stopped';
        }
    };
})();