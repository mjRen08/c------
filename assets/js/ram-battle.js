(function () {
    'use strict';

    const W = 8;
    const H = 8;
    const N = 64;

    const TYPES = {
        q: { name: '野指针', color: '#fb7185', hp: 2, atk: 1, speed: 1 },
        r: { name: '悬垂指针', color: '#fbbf24', hp: 4, atk: 1, speed: 1 },
        s: { name: '空指针', color: '#a78bfa', hp: 2, atk: 1, speed: 2 },
        t: { name: '越界指针', color: '#f472b6', hp: 2, atk: 1, speed: 1, pierce: true },
        u: { name: '未初始化', color: '#38bdf8', hp: 2, atk: 1, speed: 1, chaos: true },
        v: { name: '双重释放', color: '#facc15', hp: 3, atk: 2, speed: 1 }
    };

    const ITEM_TYPES = {
        heal: { label: '+1 HP', icon: '♥', color: '#34d399' },
        power: { label: '力量 +1', icon: '⚔', color: '#fbbf24' },
        shield: { label: '护盾', icon: '🛡', color: '#22d3ee' }
    };

    const root = document.getElementById('ramBattleRoot');
    if (!root) return;

    root.innerHTML = `
        <div class="ram-shell">
            <header class="ram-header">
                <h2>内存大逃杀 <small>WAVE SURVIVAL</small></h2>
                <div class="ram-stats">
                    <div class="ram-stat hp"><small>HP</small><strong id="ramHp"></strong></div>
                    <div class="ram-stat wave"><small>WAVE</small><strong id="ramWave"></strong></div>
                    <div class="ram-stat"><small>TURN</small><strong id="ramTurn"></strong></div>
                    <div class="ram-stat score"><small>SCORE</small><strong id="ramScore"></strong></div>
                </div>
            </header>
            <div class="ram-memory"><div class="ram-grid" id="ramGrid"></div></div>
            <div class="ram-enemies" id="ramEnemies"></div>
            <div class="ram-log" id="ramLog"></div>
            <div class="ram-ops" id="ramOps"></div>
            <div class="ram-note">方向键：移动 p · D：解引用跳到 *p · R：读取并获得瞄准 · M：malloc 获得护盾 · F：free 消耗护盾并攻击 2 格范围 · A：攻击 2 格内最近敌人 · B：设置/返回书签</div>
            <div class="ram-overlay" id="ramOverlay" hidden>
                <div class="ram-card">
                    <h3>段错误</h3>
                    <p id="ramResult"></p>
                    <button id="ramRestart">重新挑战</button>
                </div>
            </div>
        </div>`;

    const $ = id => document.getElementById(id);
    const state = {
        phase: 'playing',
        turn: 0,
        wave: 1,
        score: 0,
        hp: 6,
        p: { r: 3, c: 3 },
        mem: [],
        enemies: [],
        items: [],
        shields: new Set(),
        aim: false,
        power: 0,
        bookmark: null,
        cd: 0,
        intermission: 0,
        logs: [],
        playerSlide: null,
        enemySlides: new Map()
    };

    const key = (r, c) => `${r},${c}`;
    const addr = (r, c) => r * W + c;
    const pos = a => [Math.floor(a / W), a % W];
    const dist = (a, b, c, d) => Math.abs(a - c) + Math.abs(b - d);
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    function log(text, cls = '') {
        state.logs.push({ text, cls });
        if (state.logs.length > 40) state.logs.shift();

        $('ramLog').innerHTML = state.logs
            .map(item => `<div class="${item.cls}">${item.text}</div>`)
            .join('');
        $('ramLog').scrollTop = 9999;
    }

    function reset() {
        Object.assign(state, {
            phase: 'playing',
            turn: 0,
            wave: 1,
            score: 0,
            hp: 6,
            p: { r: 3, c: 3 },
            enemies: [],
            items: [],
            shields: new Set(),
            aim: false,
            power: 0,
            bookmark: null,
            cd: 0,
            intermission: 0,
            logs: [],
            playerSlide: null,
            enemySlides: new Map()
        });

        state.mem = Array.from({ length: H }, (_, r) =>
            Array.from({ length: W }, (_, c) => {
                let value;
                do value = Math.floor(Math.random() * N);
                while (value === addr(r, c));
                return value;
            })
        );

        spawn();
        $('ramOverlay').hidden = true;
        log('══ 波次 1 开始 ══', 'purple');
        log('青色目标是 *p 会跳到的位置。', 'b');
        render();
    }

    function spawn() {
        const pool = Object.keys(TYPES).slice(0, Math.min(1 + state.wave, 6));
        const count = Math.min(3 + Math.floor((state.wave - 1) / 2), 6);
        const used = new Set([key(state.p.r, state.p.c)]);
        state.enemies = [];

        for (let i = 0; i < count; i++) {
            let r;
            let c;
            do {
                r = Math.floor(Math.random() * H);
                c = Math.floor(Math.random() * W);
            } while (used.has(key(r, c)) || dist(r, c, state.p.r, state.p.c) < 3);

            used.add(key(r, c));
            const type = pool[i % pool.length];
            const enemyType = TYPES[type];
            const hp = type === 's'
                ? 2
                : enemyType.hp + Math.floor((state.wave - 1) / 2);

            state.enemies.push({ type, r, c, hp, maxHp: hp, alive: true });
        }
    }

    /* ============================================================
       滑入动画（FLIP）
       ============================================================ */
    function applySlide(cell, dx, dy, teleport) {
        const duration = teleport ? 760 : 520;
        const ease = teleport
            ? 'cubic-bezier(.22, 1.4, .36, 1)'
            : 'cubic-bezier(.3, 1.6, .5, 1)';

        cell.style.transition = 'none';
        cell.style.transformOrigin = 'center center';

        if (teleport) {
            cell.style.transform = `translate(${dx}%, ${dy}%) scale(1.35)`;
            cell.style.opacity = '0.3';
            cell.style.filter = 'brightness(2.2) saturate(1.6)';
        } else {
            cell.style.transform = `translate(${dx}%, ${dy}%) scale(0.7)`;
            cell.style.opacity = '0.55';
        }
        cell.style.zIndex = teleport ? '12' : '6';

        void cell.offsetWidth;

        cell.style.transition = [
            `transform ${duration}ms ${ease}`,
            `opacity ${Math.floor(duration * 0.55)}ms ease-out`,
            `filter ${Math.floor(duration * 0.55)}ms ease-out`
        ].join(', ');

        cell.style.transform = 'translate(0, 0) scale(1)';
        cell.style.opacity = '1';
        cell.style.filter = '';

        setTimeout(() => {
            cell.style.transition = '';
            cell.style.transform = '';
            cell.style.transformOrigin = '';
            cell.style.opacity = '';
            cell.style.zIndex = '';
            cell.style.filter = '';
        }, duration + 60);
    }

    function render() {
        const grid = $('ramGrid');
        const target = pos(state.mem[state.p.r][state.p.c]);
        grid.innerHTML = '';

        for (let r = 0; r < H; r++) {
            for (let c = 0; c < W; c++) {
                const enemy = state.enemies.find(item =>
                    item.alive && item.r === r && item.c === c
                );
                const item = state.items.find(item => item.r === r && item.c === c);
                const cell = document.createElement('div');
                const value = state.mem[r][c];

                cell.className = 'ram-cell';
                cell.innerHTML = `
                    <span class="addr">${addr(r, c).toString(16).toUpperCase().padStart(2, '0')}</span>
                    <span class="value">${value}</span>`;

                if (
                    target[0] === r &&
                    target[1] === c &&
                    !(target[0] === state.p.r && target[1] === state.p.c)
                ) {
                    cell.classList.add('target');
                }

                /* ============ 玩家 ============ */
                if (state.p.r === r && state.p.c === c) {
                    cell.classList.add('player');
                    if (state.aim) cell.classList.add('aiming');

                    cell.innerHTML += `<span class="player-label">p</span>`;

                    if (state.playerSlide) {
                        applySlide(cell, state.playerSlide.dx, state.playerSlide.dy, state.playerSlide.teleport);
                    }
                }

                /* ============ 书签标记 ============ */
                if (state.bookmark && state.bookmark.r === r && state.bookmark.c === c) {
                    cell.classList.add('bookmark');
                    cell.innerHTML += `<span class="bookmark-badge">⚑</span>`;
                }

                /* ============ 护盾 ============ */
                if (state.shields.has(key(r, c))) cell.classList.add('shield');

                /* ============ 敌人 ============ */
                if (enemy) {
                    cell.classList.add(`enemy-${enemy.type}`);

                    cell.innerHTML += `
                        <span class="enemy-label">${enemy.type} ${TYPES[enemy.type].name}</span>
                        <span class="hp">♥${enemy.hp}</span>`;

                    const slide = state.enemySlides.get(enemy);
                    if (slide) {
                        applySlide(cell, slide.dx, slide.dy, false);
                    }
                }

                /* ============ 道具 ============ */
                if (item) {
                    const itemType = ITEM_TYPES[item.type];
                    cell.innerHTML += `<span class="item" style="color:${itemType.color}">${itemType.icon}</span>`;
                }

                grid.appendChild(cell);
            }
        }

        $('ramHp').textContent = '♥'.repeat(Math.max(0, state.hp)) +
            '·'.repeat(6 - Math.max(0, state.hp));
        $('ramWave').textContent = state.wave;
        $('ramTurn').textContent = state.turn;
        $('ramScore').textContent = state.score;
        renderEnemies();
        renderOps();

        state.playerSlide = null;
        state.enemySlides.clear();
    }

    function renderEnemies() {
        $('ramEnemies').innerHTML = state.enemies.map(enemy => `
            <div class="ram-enemy ${enemy.alive ? '' : 'dead'}">
                <i class="dot" style="background:${TYPES[enemy.type].color}"></i>
                <div class="info">
                    <div class="name">
                        <span style="color:${TYPES[enemy.type].color}">
                            ${enemy.type} ${TYPES[enemy.type].name}
                        </span>
                        <span class="pos">${enemy.alive ? `♥${enemy.hp}` : '已消灭'}</span>
                    </div>
                    <div class="bar">
                        <i style="width:${enemy.alive ? enemy.hp / enemy.maxHp * 100 : 0}%;background:${TYPES[enemy.type].color}"></i>
                    </div>
                </div>
            </div>`).join('');
    }

    function maybeSpawnItem() {
        if (state.items.length >= 3 || Math.random() > 0.18) return;

        const occupied = new Set([
            key(state.p.r, state.p.c),
            ...state.enemies.filter(enemy => enemy.alive).map(enemy => key(enemy.r, enemy.c)),
            ...state.items.map(item => key(item.r, item.c))
        ]);
        const free = [];

        for (let r = 0; r < H; r++) {
            for (let c = 0; c < W; c++) {
                if (!occupied.has(key(r, c))) free.push({ r, c });
            }
        }

        if (!free.length) return;
        const spot = free[Math.floor(Math.random() * free.length)];
        const types = Object.keys(ITEM_TYPES);
        const type = types[Math.floor(Math.random() * types.length)];
        state.items.push({ r: spot.r, c: spot.c, type });
        log(`✦ 道具「${ITEM_TYPES[type].label}」出现在 (${spot.r},${spot.c})`, 'amber');
    }

    function tryPickup() {
        const index = state.items.findIndex(item =>
            item.r === state.p.r && item.c === state.p.c
        );
        if (index < 0) return;

        const item = state.items[index];
        if (item.type === 'heal') {
            if (state.hp < 6) {
                state.hp++;
                log(`✦ 拾取回血：HP → ${state.hp}/6`, 'green');
            } else {
                state.score += 5;
                log('✦ HP 已满，转化为 +5 分', 'green');
            }
        } else if (item.type === 'power') {
            state.power += 3;
            log(`✦ 拾取力量：接下来 ${state.power} 次攻击各 +1 伤害`, 'amber');
        } else if (item.type === 'shield') {
            state.shields.add(key(state.p.r, state.p.c));
            log('✦ 拾取护盾：当前位置获得护盾', 'b');
        }

        state.score += 3;
        state.items.splice(index, 1);
    }

    function renderOps() {
        const ops = [
            ['up', '↑ r--', 'ArrowUp'],
            ['down', '↓ r++', 'ArrowDown'],
            ['left', '← c--', 'ArrowLeft'],
            ['right', 'c++ →', 'ArrowRight'],
            ['deref', '解引用', 'D'],
            ['read', '读取', 'R'],
            ['malloc', 'malloc', 'M'],
            ['free', 'free', 'F'],
            ['attack', '攻击', 'A'],
            ['bookmark', state.bookmark ? '返回 ⚑' : '标记 ⚑', 'B']
        ];

        $('ramOps').innerHTML = ops.map(([id, label, hotkey]) => `
            <button class="ram-op ${['attack', 'free'].includes(id) ? 'attack' : ''} ${['deref', 'read'].includes(id) ? 'special' : ''} ${id === 'malloc' ? 'defend' : ''} ${id === 'bookmark' && state.bookmark ? 'bookmark-set' : ''}" data-op="${id}">
                ${label}<small>${hotkey}</small>
            </button>`).join('');

        $('ramOps').querySelectorAll('button').forEach(button => {
            button.onclick = () => act(button.dataset.op);
        });
    }

    function move(enemy, dr, dc) {
        const r = clamp(enemy.r + dr, 0, H - 1);
        const c = clamp(enemy.c + dc, 0, W - 1);

        if (!state.enemies.some(item =>
            item.alive && item !== enemy && item.r === r && item.c === c
        )) {
            enemy.r = r;
            enemy.c = c;
        }
    }

    function enemyTurn() {
        state.enemies.forEach(enemy => {
            if (!enemy.alive) return;

            const beforeR = enemy.r;
            const beforeC = enemy.c;

            const type = TYPES[enemy.type];
            for (let i = 0; i < type.speed; i++) {
                if (enemy.type === 'u' && Math.random() < 0.5) {
                    move(enemy, Math.sign(state.p.r - enemy.r), Math.sign(state.p.c - enemy.c));
                } else if (Math.abs(state.p.r - enemy.r) >= Math.abs(state.p.c - enemy.c)) {
                    move(enemy, Math.sign(state.p.r - enemy.r), 0);
                } else {
                    move(enemy, 0, Math.sign(state.p.c - enemy.c));
                }
            }

            if (enemy.r !== beforeR || enemy.c !== beforeC) {
                state.enemySlides.set(enemy, {
                    dx: (beforeC - enemy.c) * 100,
                    dy: (beforeR - enemy.r) * 100
                });
            }

            if (enemy.r === state.p.r && enemy.c === state.p.c) {
                const playerKey = key(state.p.r, state.p.c);
                if (type.pierce) {
                    state.shields.delete(playerKey);
                    state.hp -= type.atk;
                } else if (state.shields.has(playerKey)) {
                    state.shields.delete(playerKey);
                } else {
                    state.hp -= type.atk;
                }
                log(`${enemy.type} 命中！剩余 HP ${Math.max(0, state.hp)}`, 'red');
            }
        });
    }

    function endTurn() {
        state.turn++;
        if (state.cd) state.cd--;
        tryPickup();
        maybeSpawnItem();

        if (state.enemies.every(enemy => !enemy.alive)) {
            state.score += 50 * state.wave;
            state.wave++;
            state.hp = Math.min(6, state.hp + 2);
            spawn();
            log(`══ 波次 ${state.wave} 开始 ══`, 'purple');
        } else {
            enemyTurn();
        }

        if (state.hp <= 0) {
            state.phase = 'lose';
            $('ramResult').innerHTML = `你在第 <b>${state.wave}</b> 波倒下了。<br>存活回合：<b>${state.turn}</b><br>最终得分：<b>${state.score}</b>`;
            $('ramOverlay').hidden = false;
        }

        render();
    }

    function act(id) {
        if (state.phase !== 'playing') return;

        let acted = true;
        const player = state.p;

        const beforeR = player.r;
        const beforeC = player.c;

        if (id === 'up' && player.r > 0) {
            player.r--;
        } else if (id === 'down' && player.r < H - 1) {
            player.r++;
        } else if (id === 'left' && player.c > 0) {
            player.c--;
        } else if (id === 'right' && player.c < W - 1) {
            player.c++;
        } else if (id === 'deref') {
            [player.r, player.c] = pos(state.mem[player.r][player.c]);
            log('p = *p  → 解引用跳转', 'b');
        } else if (id === 'read') {
            state.aim = true;
            state.score++;
            log('◎ 获得瞄准 buff', 'amber');
        } else if (id === 'malloc') {
            state.shields.add(key(player.r, player.c));
            log('malloc 成功：获得护盾', 'green');
        } else if (id === 'free') {
            if (!state.shields.delete(key(player.r, player.c))) {
                log('// 该地址没有护盾');
                return;
            }

            state.enemies.forEach(enemy => {
                if (enemy.alive && dist(enemy.r, enemy.c, player.r, player.c) <= 2) {
                    enemy.hp--;
                    if (enemy.hp <= 0) {
                        enemy.hp = 0;
                        enemy.alive = false;
                        state.score += 20;
                    }
                }
            });
            log('free 释放：范围冲击波', 'green');
        } else if (id === 'attack') {
            const targets = state.enemies
                .filter(enemy => enemy.alive && dist(enemy.r, enemy.c, player.r, player.c) <= 2)
                .sort((a, b) =>
                    dist(a.r, a.c, player.r, player.c) - dist(b.r, b.c, player.r, player.c)
                );

            if (!targets.length) {
                log('// 范围内无敌人');
                return;
            }

            const damage = 1 + (state.aim ? 1 : 0) + (state.power ? 1 : 0);
            const target = targets[0];
            target.hp -= damage;

            if (target.hp <= 0) {
                target.hp = 0;
                target.alive = false;
                state.score += 15;
            }

            state.aim = false;
            if (state.power) state.power--;
            log(`攻击 ${target.type}：-${damage} 伤害`, 'red');
        } else if (id === 'bookmark') {
            if (!state.bookmark) {
                state.bookmark = { ...player };
                log(`⚑ 书签已设置在 (${player.r}, ${player.c})`, 'green');
            } else if (!state.cd) {
                [player.r, player.c] = [state.bookmark.r, state.bookmark.c];
                state.bookmark = null;
                state.cd = 0;
                log('⚑ 瞬移回书签', 'green');
            } else {
                log(`// 书签冷却 ${state.cd} 回合`);
                return;
            }
        } else {
            acted = false;
        }

        if (player.r !== beforeR || player.c !== beforeC) {
            state.playerSlide = {
                dx: (beforeC - player.c) * 100,
                dy: (beforeR - player.r) * 100,
                teleport: (id === 'deref' || id === 'bookmark')
            };
        }

        if (acted) endTurn();
    }

    root.addEventListener('click', event => {
        if (event.target.id === 'ramRestart') reset();
    });

    document.addEventListener('keydown', event => {
        if (!root.classList.contains('active')) return;

        const map = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
            d: 'deref',
            D: 'deref',
            r: 'read',
            R: 'read',
            m: 'malloc',
            M: 'malloc',
            f: 'free',
            F: 'free',
            a: 'attack',
            A: 'attack',
            b: 'bookmark',
            B: 'bookmark'
        };

        if (map[event.key]) {
            event.preventDefault();
            act(map[event.key]);
        }
    });

    window.RamBattle = {
        start() {
            root.classList.add('active');
            reset();
        },
        stop() {
            root.classList.remove('active');
            state.phase = 'stopped';
        }
    };
})();