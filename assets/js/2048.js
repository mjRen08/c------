/* ============================================================
   2048.js v1.0
   C 2048 · 类型合并（无限模式）
   char(1) → short(2) → int(4) → long(8) → long long(16) → __int128(32) → ...
   ============================================================ */
(function () {
    'use strict';

    const root = document.getElementById('g2048Root');
    if (!root) return;

    root.innerHTML = `
        <div class="g2048-shell">
            <header class="g2048-header">
                <h2>C 2048 <small>TYPE MERGE</small></h2>
                <div class="g2048-stats">
                    <div class="g2048-stat best"><small>BEST</small><strong id="g2048Best">0</strong></div>
                    <div class="g2048-stat score"><small>SCORE</small><strong id="g2048Score">0</strong></div>
                </div>
            </header>

            <div class="g2048-type-bar" id="g2048TypeBar"></div>

            <div class="g2048-board-wrap">
                <div class="g2048-board" id="g2048Board"></div>
            </div>

            <div class="g2048-footer">
                <span class="tip">
                    <kbd>↑↓←→</kbd>/<kbd>WASD</kbd> 滑动 · <kbd>R</kbd> 重开
                </span>
                <button class="g2048-action-btn" id="g2048Restart">重开</button>
            </div>

            <div class="g2048-overlay" id="g2048Overlay" hidden>
                <div class="g2048-card">
                    <h3 id="g2048CardTitle"></h3>
                    <div class="sub" id="g2048CardSub"></div>
                    <p id="g2048CardText"></p>
                    <button id="g2048CardBtn">重 新 挑 战</button>
                </div>
            </div>
        </div>
    `;

    const $ = id => document.getElementById(id);

    /* ---------- 类型系统 ---------- */
    const STD_TYPES = {
        1:  { name: 'char',      size: 1 },
        2:  { name: 'short',     size: 2 },
        4:  { name: 'int',       size: 4 },
        8:  { name: 'long',      size: 8 },
        16: { name: 'long long', size: 16 },
        32: { name: '__int128',  size: 32 }
    };
    const MILESTONES = { 32: '__int128', 256: '__int1024', 2048: '__int8192' };
    const TYPE_ORDER = [1, 2, 4, 8, 16, 32];
    const COLORS = { 1:'#4a5f75', 2:'#2a6a80', 4:'#2a806a', 8:'#806a2a', 16:'#9a5a2a', 32:'#aa2a5a' };

    function getTypeInfo(val) {
        if (STD_TYPES[val]) return STD_TYPES[val];
        const bits = val * 4;
        if (bits >= 1024 && bits % 1024 === 0) {
            return { name: '__int' + (bits / 1024) + 'K', size: val };
        }
        return { name: '__int' + bits, size: val };
    }

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + 'B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(bytes % 1024 === 0 ? 0 : 1) + 'K';
        if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'M';
        return (bytes / 1024 / 1024 / 1024).toFixed(1) + 'G';
    }

    function getTileStyle(val) {
        const l2 = Math.log2(val);
        const hue = (l2 * 38) % 360;
        return {
            background: 'linear-gradient(180deg, hsl(' + hue + ', 48%, 38%), hsl(' + hue + ', 55%, 22%))',
            color: 'hsl(' + hue + ', 90%, 82%)',
            borderColor: 'hsl(' + hue + ', 60%, 55%)',
            boxShadow: '0 0 ' + Math.min(10 + l2 * 2.5, 30) + 'px hsla(' + hue + ', 70%, 55%, ' + Math.min(0.25 + l2 * 0.03, 0.55) + ')'
        };
    }

    function isMilestone(val) {
        return !!MILESTONES[val];
    }

    function hexToRgb(hex) {
        const n = parseInt(hex.slice(1), 16);
        return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
    }

    /* ---------- localStorage 安全读写 ---------- */
    function safeGetBest() {
        try {
            const v = localStorage.getItem('cm_game_best_2048');
            const n = parseInt(v || '0', 10);
            return isNaN(n) ? 0 : n;
        } catch (e) { return 0; }
    }
    function safeSetBest(v) {
        try { localStorage.setItem('cm_game_best_2048', String(v)); } catch (e) {}
    }

    /* ---------- 常量 ---------- */
    const GAP = 8;
    const MOVE_MS = 150;

    /* ---------- 状态 ---------- */
    const G = {
        grid: [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]],
        score: 0,
        best: safeGetBest(),
        over: false,
        locked: false,
        cellSize: 71,
        boardPx: 308,
        maxValEverReached: 0
    };

    const boardEl = $('g2048Board');
    const overlayEl = $('g2048Overlay');
    const typeBarEl = $('g2048TypeBar');

    let bgEls = [];

    /* ============================================================
       尺寸计算
       ============================================================ */
    function computeSize() {
        const wrap = boardEl.parentElement;
        const ws = window.getComputedStyle(wrap);
        const padL = parseFloat(ws.paddingLeft) || 0;
        const padR = parseFloat(ws.paddingRight) || 0;
        const wrapWidth = wrap.clientWidth || wrap.getBoundingClientRect().width;

        let avail = wrapWidth - padL - padR;
        if (!avail || avail < 120 || !isFinite(avail)) {
            avail = Math.min(window.innerWidth - 80, 400);
        }

        let cs = Math.floor((avail - GAP * 3) / 4);
        cs = Math.max(40, Math.min(96, cs));
        G.cellSize = cs;
        G.boardPx = cs * 4 + GAP * 3;

        boardEl.style.width = G.boardPx + 'px';
        boardEl.style.height = G.boardPx + 'px';

        for (let i = 0; i < bgEls.length; i++) {
            const bg = bgEls[i];
            const r = Math.floor(i / 4), c = i % 4;
            bg.style.width = cs + 'px';
            bg.style.height = cs + 'px';
            bg.style.transform = 'translate(' + (c * (cs + GAP)) + 'px,' + (r * (cs + GAP)) + 'px)';
        }

        forEachTile(function (tile) {
            tile.wrap.style.width = cs + 'px';
            tile.wrap.style.height = cs + 'px';
            updateTileFont(tile);
            setTilePos(tile, tile.r, tile.c, true);
        });
    }

    function forEachTile(fn) {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (G.grid[r][c]) fn(G.grid[r][c]);
            }
        }
    }

    function updateTileFont(tile) {
        const cs = G.cellSize;
        const info = getTypeInfo(tile.val);
        const nameLen = info.name.length;
        const nameEl = tile.el.querySelector('.tname');
        const sizeEl = tile.el.querySelector('.tsize');
        if (!nameEl || !sizeEl) return;

        const baseFs = cs * 0.22;
        let nameFs = baseFs;
        if (nameLen > 8) nameFs = baseFs * 8 / nameLen;
        if (nameLen > 12) nameFs = baseFs * 12 / nameLen;
        nameFs = Math.max(7, Math.min(14, nameFs));

        const sizeFs = Math.max(6, Math.min(10, cs * 0.13));

        nameEl.style.fontSize = nameFs.toFixed(1) + 'px';
        sizeEl.style.fontSize = sizeFs.toFixed(1) + 'px';
    }

    /* ============================================================
       tile 位置 / 样式
       ============================================================ */
    function setTilePos(tile, r, c, instant) {
        const x = c * (G.cellSize + GAP);
        const y = r * (G.cellSize + GAP);
        if (instant) {
            tile.wrap.style.transition = 'none';
            tile.wrap.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            void tile.wrap.offsetWidth;
            tile.wrap.style.transition = '';
        } else {
            tile.wrap.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        }
    }

    function createTile(val, r, c) {
        const wrap = document.createElement('div');
        wrap.className = 'g2048-tile-wrap';
        wrap.style.width = G.cellSize + 'px';
        wrap.style.height = G.cellSize + 'px';
        wrap.style.transform = 'translate(' + (c * (G.cellSize + GAP)) + 'px,' + (r * (G.cellSize + GAP)) + 'px)';

        const el = document.createElement('div');
        el.className = 'g2048-tile';

        const nameEl = document.createElement('div');
        nameEl.className = 'tname';
        const sizeEl = document.createElement('div');
        sizeEl.className = 'tsize';

        el.appendChild(nameEl);
        el.appendChild(sizeEl);
        wrap.appendChild(el);
        boardEl.appendChild(wrap);

        const tile = { el: el, wrap: wrap, val: val, r: r, c: c };
        setTileContent(tile, val);
        return tile;
    }

    function setTileContent(tile, val) {
        tile.val = val;
        const info = getTypeInfo(val);
        const nameEl = tile.el.querySelector('.tname');
        const sizeEl = tile.el.querySelector('.tsize');
        if (nameEl) nameEl.textContent = info.name;
        if (sizeEl) sizeEl.textContent = formatSize(info.size);
        applyTileStyle(tile.el, val);
        updateTileFont(tile);
    }

    function applyTileStyle(el, val) {
        const s = getTileStyle(val);
        el.style.background = s.background;
        el.style.color = s.color;
        el.style.border = '1px solid ' + s.borderColor;
        el.style.boxShadow = s.boxShadow;
    }

    /* ============================================================
       初始化
       ============================================================ */
    function reset() {
        boardEl.innerHTML = '';
        bgEls = [];

        G.grid = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
        G.score = 0;
        G.over = false;
        G.locked = false;
        G.maxValEverReached = 0;

        computeSize();

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const bg = document.createElement('div');
                bg.className = 'g2048-cell-bg';
                bg.style.width = G.cellSize + 'px';
                bg.style.height = G.cellSize + 'px';
                bg.style.transform = 'translate(' + (c * (G.cellSize + GAP)) + 'px,' + (r * (G.cellSize + GAP)) + 'px)';
                boardEl.appendChild(bg);
                bgEls.push(bg);
            }
        }

        overlayEl.hidden = true;

        spawnTile(true);
        spawnTile(true);
        updateHUD();
        renderTypeBar();
    }

    function spawnTile(silent) {
        const empty = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (!G.grid[r][c]) empty.push({ r: r, c: c });
            }
        }
        if (empty.length === 0) return;

        const p = empty[Math.floor(Math.random() * empty.length)];
        const val = Math.random() < 0.9 ? 1 : 2;
        const tile = createTile(val, p.r, p.c);
        G.grid[p.r][p.c] = tile;

        if (!silent) {
            tile.el.classList.add('appear');
            setTimeout(function () { tile.el.classList.remove('appear'); }, 320);
        }
    }

    /* ============================================================
       移动
       ============================================================ */
    function move(dir) {
        if (G.over || G.locked) return;
        G.locked = true;

        const moves = [];
        let i;

        if (dir === 'left' || dir === 'right') {
            for (let r = 0; r < 4; r++) {
                const row = [];
                for (let c = 0; c < 4; c++) row.push(G.grid[r][c]);
                const line = [];
                for (let k = 0; k < row.length; k++) if (row[k]) line.push(row[k]);
                if (dir === 'right') line.reverse();

                processLine(line, function (slot) {
                    return { r: r, c: dir === 'right' ? 3 - slot : slot };
                }, moves);
            }
        } else {
            for (let c2 = 0; c2 < 4; c2++) {
                const col = [];
                for (let r2 = 0; r2 < 4; r2++) col.push(G.grid[r2][c2]);
                const line2 = [];
                for (let k2 = 0; k2 < col.length; k2++) if (col[k2]) line2.push(col[k2]);
                if (dir === 'down') line2.reverse();

                processLine(line2, function (slot) {
                    return { r: dir === 'down' ? 3 - slot : slot, c: c2 };
                }, moves);
            }
        }

        let anyMoved = false;
        for (i = 0; i < moves.length; i++) {
            const m = moves[i];
            if (m.tile.r !== m.r || m.tile.c !== m.c || m.isRemoved) anyMoved = true;
        }

        if (!anyMoved) {
            G.locked = false;
            return;
        }

        const newGrid = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
        for (i = 0; i < moves.length; i++) {
            const mm = moves[i];
            if (!mm.isRemoved) {
                newGrid[mm.r][mm.c] = mm.tile;
                mm.tile.r = mm.r;
                mm.tile.c = mm.c;
            }
        }
        G.grid = newGrid;

        for (i = 0; i < moves.length; i++) {
            const mv = moves[i];
            mv.tile.wrap.style.transform = 'translate(' + (mv.c * (G.cellSize + GAP)) + 'px,' + (mv.r * (G.cellSize + GAP)) + 'px)';
            if (mv.isRemoved) {
                mv.tile.wrap.classList.add('fade-out');
            }
        }

        setTimeout(function () {
            for (let k3 = 0; k3 < moves.length; k3++) {
                const mv2 = moves[k3];
                if (mv2.isRemoved) {
                    if (mv2.tile.wrap.parentNode) mv2.tile.wrap.parentNode.removeChild(mv2.tile.wrap);
                } else if (mv2.newVal !== null) {
                    setTileContent(mv2.tile, mv2.newVal);
                    mv2.tile.el.classList.remove('merged');
                    void mv2.tile.el.offsetWidth;
                    mv2.tile.el.classList.add('merged');

                    const pop = document.createElement('span');
                    pop.className = 'g2048-merge-pop';
                    pop.textContent = '+' + (mv2.newVal * 10);
                    mv2.tile.wrap.appendChild(pop);
                    (function (p) {
                        setTimeout(function () {
                            if (p.parentNode) p.parentNode.removeChild(p);
                        }, 700);
                    })(pop);

                    G.score += mv2.newVal * 10;

                    if (isMilestone(mv2.newVal) && mv2.newVal > G.maxValEverReached) {
                        showMilestoneToast(mv2.newVal);
                    }
                    if (mv2.newVal > G.maxValEverReached) G.maxValEverReached = mv2.newVal;
                }
            }

            spawnTile(false);
            updateHUD();
            renderTypeBar();

            if (!hasAnyMove()) {
                G.over = true;
                setTimeout(function () { showOverlay(); }, 300);
            }

            G.locked = false;
        }, MOVE_MS);
    }

    function processLine(line, slotToRC, movesOut) {
        let slot = 0;
        let i = 0;
        while (i < line.length) {
            const cur = line[i];
            if (i + 1 < line.length && cur.val === line[i + 1].val) {
                const newVal = cur.val * 2;
                const rc = slotToRC(slot);

                movesOut.push({
                    tile: cur,
                    r: rc.r, c: rc.c,
                    isRemoved: false,
                    newVal: newVal
                });
                movesOut.push({
                    tile: line[i + 1],
                    r: rc.r, c: rc.c,
                    isRemoved: true,
                    newVal: null
                });
                slot++;
                i += 2;
            } else {
                const rc2 = slotToRC(slot);
                movesOut.push({
                    tile: cur,
                    r: rc2.r, c: rc2.c,
                    isRemoved: false,
                    newVal: null
                });
                slot++;
                i += 1;
            }
        }
    }

    /* ============================================================
       里程碑提示
       ============================================================ */
    function showMilestoneToast(val) {
        const info = getTypeInfo(val);
        const toast = document.createElement('div');
        toast.className = 'g2048-milestone-toast';
        toast.textContent = '★ ' + info.name + ' 达成 ★';
        boardEl.appendChild(toast);
        setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 1700);
    }

    /* ============================================================
       类型阶梯条
       ============================================================ */
    function getTierWindow(currentMax) {
        const all = [1];
        let v = 1;
        for (let i = 0; i < 32; i++) {
            v *= 2;
            all.push(v);
            if (v > currentMax * 32) break;
        }
        let idx = all.indexOf(currentMax);
        if (idx < 0) idx = all.length - 1;
        const startIdx = Math.max(0, idx - 3);
        return all.slice(startIdx, startIdx + 6);
    }

    function renderTypeBar() {
        let maxVal = getMaxOnBoard();
        if (maxVal === 0) maxVal = 1;
        const tiers = getTierWindow(maxVal);

        typeBarEl.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const v = tiers[i];
            if (v === undefined) {
                const ph = document.createElement('div');
                ph.className = 'g2048-type-chip';
                ph.style.opacity = '0.2';
                typeBarEl.appendChild(ph);
                continue;
            }
            const chip = document.createElement('div');
            chip.className = 'g2048-type-chip';
            const isUnlocked = v <= maxVal;

            if (isUnlocked) {
                chip.classList.add('unlocked');
                const s = getTileStyle(v);
                chip.style.color = s.color;
                chip.style.background = s.background;
                chip.style.borderColor = s.borderColor;
            }

            const info = getTypeInfo(v);
            chip.innerHTML = '<span class="nm">' + info.name + '</span>' +
                             '<span class="sz">' + formatSize(info.size) + '</span>';
            typeBarEl.appendChild(chip);
        }
    }

    function getMaxOnBoard() {
        let m = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (G.grid[r][c] && G.grid[r][c].val > m) m = G.grid[r][c].val;
            }
        }
        return m;
    }

    function updateHUD() {
        $('g2048Score').textContent = G.score;
        if (G.score > G.best) {
            G.best = G.score;
            safeSetBest(G.best);
        }
        $('g2048Best').textContent = G.best;
    }

    function hasAnyMove() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (!G.grid[r][c]) return true;
                if (c < 3 && G.grid[r][c] && G.grid[r][c + 1] && G.grid[r][c].val === G.grid[r][c + 1].val) return true;
                if (r < 3 && G.grid[r][c] && G.grid[r + 1][c] && G.grid[r][c].val === G.grid[r + 1][c].val) return true;
            }
        }
        return false;
    }

    /* ============================================================
       结束弹窗
       ============================================================ */
    function showOverlay() {
        const maxVal = getMaxOnBoard();
        const info = getTypeInfo(maxVal);

        $('g2048CardTitle').textContent = '栈溢出 · 无路可走';
        $('g2048CardSub').textContent = 'SEGMENTATION FAULT';
        $('g2048CardText').innerHTML =
            '棋盘满了，没有可合并的相邻同类型。<br><br>' +
            '本局得分：<span class="a" style="font-size:16px;font-weight:800">' + G.score + '</span><br>' +
            '最高记录：<span class="p">' + G.best + '</span><br>' +
            '最大类型：<b class="c">' + info.name + '</b>（' + formatSize(info.size) + '）<br><br>' +
            '<span style="color:#5d7186;font-size:10px">' +
            'C 标准类型只是起点。<br>' +
            '32 字节之后是编译器的扩展世界 —— 只要内存够，理论上没有上限。<br><br>' +
            '<b class="a">你滑到了 ' + info.name + '。</b>' +
            '</span>';
        $('g2048CardBtn').textContent = '重 新 挑 战';

        overlayEl.classList.remove('win');
        overlayEl.hidden = false;
    }

    /* ============================================================
       键盘
       ============================================================ */
    document.addEventListener('keydown', function (e) {
        if (!root.classList.contains('active')) return;

        if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            reset();
            return;
        }
        if (G.over) return;

        let dir = null;
        if      (e.key === 'ArrowUp'    || e.key === 'w' || e.key === 'W') dir = 'up';
        else if (e.key === 'ArrowDown'  || e.key === 's' || e.key === 'S') dir = 'down';
        else if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') dir = 'left';
        else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dir = 'right';

        if (dir) {
            e.preventDefault();
            move(dir);
        }
    });

    /* ============================================================
       触摸滑动
       ============================================================ */
    let touchStart = null;
    boardEl.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, { passive: true });

    boardEl.addEventListener('touchend', function (e) {
        if (!touchStart || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].clientX - touchStart.x;
        const dy = e.changedTouches[0].clientY - touchStart.y;
        touchStart = null;

        const absX = Math.abs(dx), absY = Math.abs(dy);
        if (Math.max(absX, absY) < 24) return;
        if (absX > absY) move(dx > 0 ? 'right' : 'left');
        else             move(dy > 0 ? 'down' : 'up');
    }, { passive: true });

    /* ============================================================
       Resize / 重开
       ============================================================ */
    window.addEventListener('resize', function () {
        if (!root.classList.contains('active')) return;
        computeSize();
        renderTypeBar();
    });

    $('g2048Restart').addEventListener('click', reset);
    $('g2048CardBtn').addEventListener('click', function () {
        overlayEl.hidden = true;
        reset();
    });

    /* ============================================================
       对外接口
       ============================================================ */
    window.Game2048 = {
        start: function () {
            root.classList.add('active');
            /* 等一帧让 CSS 生效后再计算尺寸 */
            requestAnimationFrame(function () {
                reset();
            });
        },
        stop: function () {
            root.classList.remove('active');
        }
    };
})();