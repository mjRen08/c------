/* ============================================================
   adventure.js v7.0
   新增：枪械系统 | 存档点 | 平台重构 | Boss 技能扩充
   ============================================================ */

(function () {
    'use strict';

    const SAVE_KEY = 'cm_adventure_save_v7';
    const TUTORIAL_KEY = 'cm_adventure_tutorials_seen_v7';
    const ACHIEVEMENT_KEY = 'cm_adventure_achievements_v7';

    /* ---------- 精灵图 ---------- */
    const SPRITE = {
        frameWidth: 64, frameHeight: 64,
        src: 'assets/images/characters/hero-sheet.png',
        animations: {
            idle:   { row: 0, frames: 4, fps: 6 },
            run:    { row: 1, frames: 6, fps: 12 },
            jump:   { row: 2, frames: 3, fps: 8 },
            attack: { row: 3, frames: 4, fps: 14 }
        }
    };

    /* ---------- 教程 ---------- */
    const TUTORIALS = {
        'variable-platform': { title: '悬崖变量平台', concept: '变量在悬崖上累积，每次"跳上去"counter++。', goal: '用【二段跳】和【冲刺】连续踩 3 次，把平台踩实！', code: `int counter = 0;\ncounter++;\nif (counter >= 3) platform.stable = true;`, tip: '平台在悬崖上！先跳起来→按住 Shift 二段跳→按 J 冲刺接近平台。' },
        'loop-spikes': { title: '循环地刺', concept: 'for 循环有节奏地重复。', goal: '找准空隙通过。', code: `for (int i = 0; i < n; i++) spike.y = sin(i) * A;`, tip: '数着节拍跳过去。' },
        'pointer-teleport': { title: '指针传送门', concept: '指针保存地址。', goal: '走进传送门瞬移。', code: `int *p = &target;\n*p = 0x2200;`, tip: '踩上去即可瞬移。' },
        'array-platforms': { title: '数组平台', concept: '数组必须按索引顺序访问。', goal: '只能踩 order 匹配的平台，其余虚化。', code: `int arr[5] = {10,20,30,40,50};\n// arr[0] → arr[1] → ...`, tip: '踩错全部重置，必须严格按顺序。' },
        'memory-pool': { title: '内存池', concept: 'malloc 需要 free。', goal: '站上回血，但扣金币。', code: `int *p = malloc(sizeof(int) * n);`, tip: '回血要花钱。' },
        'conditional-gate': { title: '条件门', concept: 'if 只在条件成立时执行。', goal: '收集足够钥匙。', code: `if (keys >= 3) gate.open();`, tip: '去商店买钥匙。' },
        'switch-platform': { title: 'switch 平台', concept: 'switch 分支执行。', goal: '按 E 切换升降。', code: `switch (state) { case UP: y -= 10; break; }`, tip: '靠近按 E。' },
        'recursive-trap': { title: '递归陷阱', concept: '递归必须有终止条件。', goal: '在平台消失前快速跳跃。', code: `void f(int n) { if (n<=0) return; f(n-1); }`, tip: '连贯地跳。' },
        'pointer-missile': { title: '追踪导弹', concept: '悬空指针追踪到崩溃。', goal: '用冲刺甩开，3 秒后消失。', code: `while (1) m.x += (t.x - m.x) * 0.1;`, tip: '按 J 冲刺甩开。' },
        'memory-leak': { title: '内存泄漏', concept: '忘记 free 会耗尽资源。', goal: '快速通过紫色毒雾。', code: `while (1) { int *p = malloc(1024); }`, tip: '用冲刺快速通过。' },
        'quiz-stone': { title: '答题石碑', concept: '石碑上刻着谜题。', goal: '按 E 答题，答对 +5 金币。', code: `if (answer == correct) coins += 5;`, tip: '答错不扣血。' },
        'laser-sweep': { title: '扫描激光', concept: '激光周期性扫描。', goal: '红色警告时让开。', code: `for (int i = 0; i < range; i++) laser.scan();`, tip: '警告线出现时闪避。' },
        'boss-barrage': { title: '弹幕阶段', concept: 'Boss 连续发射多波子弹。', goal: '用冲刺、跳跃、护盾躲避。', code: `for (int i = 0; i < 12; i++) fireBullet(i * 30);`, tip: '弹幕有节奏，找到间隙。' },
        'gun': { title: '代码枪', concept: '你自带武器枪，枪口追踪鼠标。', goal: '鼠标左键或 J 键发射子弹，命中 Boss 弱点造成伤害。', code: `bullet.dir = mouse.pos - gun.pos;\nfire(bullet);`, tip: '弱点必须用枪打，不能再点击。' },
        'checkpoint': { title: '存档点', concept: '存档点会记住你到达的位置。', goal: 'Boss 战失败后回到存档点，可以重新尝试。', code: `if (player.touch(checkpoint))\n    save(scene, x, y);`, tip: '走到存档点自动激活。' }
    };

    const ACHIEVEMENTS_DEF = [
        { id: 'first_step',  name: '初来乍到',  icon: '🚀', desc: '进入冒险模式',          check: () => true },
        { id: 'first_coin',  name: '第一桶金',  icon: '🪙', desc: '收集第一枚金币',        check: (s) => s.totalCoins >= 1 },
        { id: 'coin_50',     name: '小富',      icon: '💰', desc: '累计 50 枚金币',        check: (s) => s.totalCoins >= 50 },
        { id: 'coin_200',    name: '大富',      icon: '💎', desc: '累计 200 枚金币',       check: (s) => s.totalCoins >= 200 },
        { id: 'slime_kill',  name: '新手毕业',  icon: '🟢', desc: '击败 Bug 史莱姆王',     check: (s) => s.bosses.includes('slime_king') },
        { id: 'worm_kill',   name: '除虫大师',  icon: '🐛', desc: '击败森林蠕虫',          check: (s) => s.bosses.includes('worm') },
        { id: 'mage_kill',   name: '破法者',    icon: '🧙', desc: '击败递归法师',          check: (s) => s.bosses.includes('mage') },
        { id: 'tyrant_kill', name: '屠龙者',    icon: '👾', desc: '击败代码暴君',          check: (s) => s.bosses.includes('tyrant') },
        { id: 'all_bosses',  name: '代码守护者',icon: '👑', desc: '击败全部 4 位 Boss',    check: (s) => s.bosses.length >= 4 },
        { id: 'skill_all',   name: '技能大师',  icon: '⚡', desc: '解锁全部 5 个技能',      check: (s) => s.skills.length >= 5 },
        { id: 'upgrade_3',   name: '强化大师',  icon: '🔧', desc: '购买 3 个强化',          check: (s) => (s.upgrades || []).length >= 3 },
        { id: 'secret_1',    name: '探索者',    icon: '🔍', desc: '发现第一个隐藏房',      check: (s) => s.secretsFound >= 1 },
        { id: 'no_damage',   name: '完美主义',  icon: '✨', desc: '不受伤击败任意 Boss',   check: (s) => (s.defeatedNoDamage || []).length >= 1 },
        { id: 'good_end',    name: '光明结局',  icon: '🌅', desc: '达成"净化"结局',       check: (s) => s.ending === 'purify' },
        { id: 'dark_end',    name: '黑暗结局',  icon: '🌑', desc: '达成"夺取"结局',       check: (s) => s.ending === 'seize' },
        { id: 'true_end',    name: '真结局',    icon: '⭐', desc: '达成"和解"真结局',     check: (s) => s.ending === 'peace' },
        { id: 'gun_master',  name: '神枪手',    icon: '🎯', desc: '用枪击杀 20 个敌人',     check: (s) => (s.gunKills || 0) >= 20 },
        { id: 'sharp_shooter',name:'狙击手',    icon: '🎯', desc: '单局子弹命中率 > 70%',   check: (s) => (s.bestAccuracy || 0) >= 0.7 }
    ];

    const Save = {
        data: {
            coins: 0, keys: 0, skills: [], upgrades: [], currentScene: 'village',
            bossesDefeated: [], totalCoins: 0, secretsFound: 0, ending: null,
            totalPlayTime: 0, lastPlayed: Date.now(), version: 7,
            defeatedNoDamage: [], quizCorrect: 0, maxCoinsOneRun: 0, laserHits: 0,
            gunKills: 0, bestAccuracy: 0,
            upgradeStats: { maxHpBonus: 0, dashCdMul: 1, invinMul: 1, magnetMul: 1, shieldBonus: 0, reviveCount: 0, slowmoBonus: 0 }
        },
        load() {
            try {
                const raw = localStorage.getItem(SAVE_KEY);
                if (raw) {
                    const d = JSON.parse(raw);
                    this.data = Object.assign(this.data, d);
                    if (!this.data.upgradeStats) this.data.upgradeStats = { maxHpBonus: 0, dashCdMul: 1, invinMul: 1, magnetMul: 1, shieldBonus: 0, reviveCount: 0, slowmoBonus: 0 };
                }
            } catch (e) {}
            return this.data;
        },
        save(patch) {
            Object.assign(this.data, patch, { lastPlayed: Date.now() });
            try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.data)); } catch (e) {}
        },
        reset() {
            try { localStorage.removeItem(SAVE_KEY); localStorage.removeItem(TUTORIAL_KEY); localStorage.removeItem(ACHIEVEMENT_KEY); } catch (e) {}
            this.data = {
                coins: 0, keys: 0, skills: [], upgrades: [], currentScene: 'village',
                bossesDefeated: [], totalCoins: 0, secretsFound: 0, ending: null,
                totalPlayTime: 0, lastPlayed: Date.now(), version: 7,
                defeatedNoDamage: [], quizCorrect: 0, maxCoinsOneRun: 0, laserHits: 0,
                gunKills: 0, bestAccuracy: 0,
                upgradeStats: { maxHpBonus: 0, dashCdMul: 1, invinMul: 1, magnetMul: 1, shieldBonus: 0, reviveCount: 0, slowmoBonus: 0 }
            };
        },
        hasSkill(id) { return this.data.skills.includes(id); },
        addSkill(id) { if (!this.hasSkill(id)) { this.data.skills.push(id); this.save({}); return true; } return false; },
        hasUpgrade(id) { return this.data.upgrades.includes(id); },
        addUpgrade(id) { if (!this.hasUpgrade(id)) { this.data.upgrades.push(id); this.save({}); return true; } return false; },
        addCoins(n) {
            this.data.coins = Math.max(0, this.data.coins + n);
            if (n > 0) this.data.totalCoins += n;
            this.save({});
        },
        defeatBoss(id) { if (!this.data.bossesDefeated.includes(id)) { this.data.bossesDefeated.push(id); this.save({}); } }
    };
    Save.load();

    let seenTutorials = [];
    try { seenTutorials = JSON.parse(localStorage.getItem(TUTORIAL_KEY) || '[]'); } catch (e) {}
    function markTutorialSeen(type) { if (!seenTutorials.includes(type)) { seenTutorials.push(type); try { localStorage.setItem(TUTORIAL_KEY, JSON.stringify(seenTutorials)); } catch (e) {} } }
    function hasSeenTutorial(type) { return seenTutorials.includes(type); }

    let unlockedAchievements = [];
    try { unlockedAchievements = JSON.parse(localStorage.getItem(ACHIEVEMENT_KEY) || '[]'); } catch (e) {}
    function unlockAchievement(id) {
        if (unlockedAchievements.includes(id)) return false;
        unlockedAchievements.push(id);
        try { localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(unlockedAchievements)); } catch (e) {}
        const a = ACHIEVEMENTS_DEF.find(x => x.id === id);
        if (a) showAchievement(`${a.icon} ${a.name}`, a.desc);
        return true;
    }

    /* ---------- 技能 / 物品 / 强化 ---------- */
    const SKILLS = {
        doubleJump: { id: 'doubleJump', name: '二段跳',  icon: '🦅', cost: 8,  desc: '空中再次跳跃（悬崖必备）', hotkey: 'Shift' },
        magnet:     { id: 'magnet',     name: '金币磁铁', icon: '🧲', cost: 10, desc: '自动吸取金币', hotkey: '' },
        dash:       { id: 'dash',       name: '冲刺',    icon: '💨', cost: 12, desc: '向前瞬移（悬崖必备）', hotkey: 'J' },
        shield:     { id: 'shield',     name: '护盾',    icon: '🛡️', cost: 15, desc: '抵挡一次伤害', hotkey: 'K' },
        slowmo:     { id: 'slowmo',     name: '时间减速', icon: '⏳', cost: 20, desc: '手动慢动作', hotkey: 'L' }
    };

    const ITEMS = {
        potion:    { id: 'potion',    name: '生命药水', icon: '🧪', cost: 10, desc: '立即恢复 50 点生命值' },
        bigPotion: { id: 'bigPotion', name: '大型药水', icon: '💊', cost: 25, desc: '立即恢复全部生命值' },
        key:       { id: 'key',       name: '城堡钥匙', icon: '🔑', cost: 15, desc: '打开条件门所需' },
        revive:    { id: 'revive',    name: '复活石',   icon: '💎', cost: 60, desc: '阵亡后自动满血复活一次（可叠加）' }
    };

    const UPGRADES = {
        maxHp:      { id: 'maxHp',      name: '生命强化',   icon: '❤️', cost: 30, desc: '生命上限 +20',      effect: (s) => { s.maxHpBonus += 20; } },
        dashCd:     { id: 'dashCd',     name: '冲刺加速',   icon: '💨', cost: 25, desc: '冲刺冷却 -20%',     effect: (s) => { s.dashCdMul *= 0.8; } },
        invinTime:  { id: 'invinTime',  name: '无敌延长',   icon: '✨', cost: 35, desc: '受击无敌帧 +50%',   effect: (s) => { s.invinMul *= 1.5; } },
        magnetRange:{ id: 'magnetRange',name: '磁铁强化',   icon: '🧲', cost: 20, desc: '磁铁范围 +50%',     effect: (s) => { s.magnetMul *= 1.5; } },
        shieldTime: { id: 'shieldTime', name: '护盾强化',   icon: '🛡️', cost: 40, desc: '护盾时长 +1 秒',    effect: (s) => { s.shieldBonus += 60; } },
        slowmoExt:  { id: 'slowmoExt',  name: '时间延长',   icon: '⏳', cost: 45, desc: '减速时长 +2 秒',    effect: (s) => { s.slowmoBonus = (s.slowmoBonus || 0) + 2; } },
        bulletSpd:  { id: 'bulletSpd',  name: '子弹加速',   icon: '🚀', cost: 30, desc: '子弹速度 +30%',     effect: (s) => { s.bulletSpdMul = (s.bulletSpdMul || 1) * 1.3; } }
    };

    /* ============================================================
       场景
       ============================================================ */
    const SCENES = {
        village: {
            name: '晨曦村庄 · 新手村', icon: '🏘️',
            bgImage: 'assets/images/scenes/village.png',
            bgColor1: '#1a1033', bgColor2: '#0a0618',
            width: 4200, groundColor: '#2d4a3e',
            shopMode: 'skill',
            platforms: [
                { x: 0, y: 460, w: 600, h: 80 }, { x: 700, y: 460, w: 500, h: 80 },
                { x: 1300, y: 460, w: 600, h: 80 }, { x: 2000, y: 460, w: 600, h: 80 },
                { x: 2700, y: 460, w: 1500, h: 80 },
                { x: 200, y: 360, w: 100, h: 20 }, { x: 350, y: 300, w: 100, h: 20 }, { x: 500, y: 240, w: 100, h: 20 },
                { x: 780, y: 360, w: 120, h: 20 }, { x: 950, y: 300, w: 100, h: 20 }, { x: 1100, y: 240, w: 100, h: 20 },
                { x: 1380, y: 380, w: 100, h: 20 }, { x: 1530, y: 320, w: 100, h: 20 }, { x: 1680, y: 260, w: 100, h: 20 }, { x: 1830, y: 320, w: 100, h: 20 },
                { x: 2100, y: 360, w: 80, h: 20 }, { x: 2250, y: 300, w: 80, h: 20 }, { x: 2400, y: 240, w: 80, h: 20 },
                { x: 2900, y: 340, w: 140, h: 20 }, { x: 3150, y: 280, w: 140, h: 20 }, { x: 3400, y: 340, w: 140, h: 20 }, { x: 3650, y: 280, w: 140, h: 20 }
            ],
            coins: [
                { x: 220, y: 320 }, { x: 260, y: 320 }, { x: 370, y: 260 }, { x: 410, y: 260 }, { x: 520, y: 200 }, { x: 560, y: 200 },
                { x: 800, y: 320 }, { x: 840, y: 320 }, { x: 970, y: 260 }, { x: 1010, y: 260 }, { x: 1120, y: 200 }, { x: 1160, y: 200 },
                { x: 1400, y: 340 }, { x: 1440, y: 340 }, { x: 1550, y: 280 }, { x: 1590, y: 280 }, { x: 1850, y: 280 }, { x: 1890, y: 280 },
                { x: 2120, y: 320 }, { x: 2160, y: 320 }, { x: 2270, y: 260 }, { x: 2310, y: 260 }, { x: 2420, y: 200 }, { x: 2460, y: 200 },
                { x: 2920, y: 300 }, { x: 2960, y: 300 }, { x: 3170, y: 240 }, { x: 3670, y: 240 }
            ],
            npcs: [
                { x: 150, y: 420, name: '老村长', icon: '👴', dialogs: ['欢迎来到新手村！', '你有一把枪，鼠标瞄准，左键射击。', '途中的挑战都试炼你的操作。', 'Boss 弱点只能用子弹打中！'] },
                { x: 550, y: 420, name: '商店', icon: '🏪', isShop: true, dialogs: ['欢迎光临！'] }
            ],
            gadgets: [
                /* ★ 变量平台：悬崖上，只有踩实才能过 */
                { type: 'variable-platform', x: 2450, y: 320, w: 90, h: 20, id: 'vp1', counter: 0, target: 3, stable: false, reward: 8, rewarded: false,
                  onCliff: true, checkpoint: false },
                { type: 'quiz-stone', x: 1000, y: 380, w: 50, h: 60, used: false, quizIndex: 0 },
                /* ★ 数组平台：必须按顺序 */
                { type: 'array-platforms', items: [
                    { x: 3150, y: 380, w: 80, h: 16, idx: 0, order: 0 },
                    { x: 3300, y: 320, w: 80, h: 16, idx: 1, order: 1 },
                    { x: 3450, y: 380, w: 80, h: 16, idx: 2, order: 2 },
                    { x: 3600, y: 320, w: 80, h: 16, idx: 3, order: 3 }
                ], currentProgress: 0, completed: false, reward: 12, rewarded: false, mustSequence: true },
                { type: 'loop-spikes', x: 1600, y: 420, w: 200, h: 40, period: 2.5, amplitude: 50, phase: 0, dmg: 10 }
            ],
            secrets: [{ x: 1550, y: 240, discovered: false, reward: 15, label: '🌿 灌木丛' }],
            doors: [{ x: 4100, y: 380, w: 60, h: 80, to: 'village_boss', label: '⚔️ Boss房' }],
            elevators: [], enemies: [],
            checkpoint: { x: 3900, y: 420, active: false },
            boss: null
        },

        village_boss: {
            name: 'BOSS 房 · 史莱姆巢穴', icon: '⚔️',
            bgImage: 'assets/images/scenes/village-boss.png',
            bgColor1: '#2a0a1a', bgColor2: '#0a0618',
            width: 1600, groundColor: '#3a1020', shopMode: 'upgrade',
            platforms: [{ x: 0, y: 460, w: 1600, h: 80 }],
            coins: [], npcs: [], gadgets: [], secrets: [],
            doors: [{ x: 60, y: 380, w: 60, h: 80, to: 'village', label: '← 退出' }],
            elevators: [], enemies: [],
            checkpoint: { x: 150, y: 420, active: false },
            boss: {
                id: 'slime_king', name: 'Bug 史莱姆王', icon: '🟢',
                maxHp: 40, arenaX: 200, arenaWidth: 1200,
                triggerX: 700,
                waveVariants: ['basic'], isTutorial: true,
                barrageTypes: ['ring'],
                nextDoor: { to: 'forest', label: '→ 迷雾森林' }
            }
        },

        forest: {
            name: '迷雾森林', icon: '🌲',
            bgImage: 'assets/images/scenes/forest.png',
            bgColor1: '#0a1a1a', bgColor2: '#0a0618',
            width: 6000, groundColor: '#1e3a2f',
            shopMode: 'upgrade',
            platforms: [
                { x: 0, y: 460, w: 800, h: 80 }, { x: 900, y: 460, w: 500, h: 80 },
                { x: 1500, y: 460, w: 400, h: 80 }, { x: 2000, y: 460, w: 500, h: 80 },
                { x: 2600, y: 460, w: 400, h: 80 }, { x: 3100, y: 460, w: 500, h: 80 },
                { x: 3700, y: 460, w: 500, h: 80 }, { x: 4300, y: 460, w: 500, h: 80 },
                { x: 4900, y: 460, w: 1100, h: 80 },
                { x: 300, y: 360, w: 120, h: 20 }, { x: 550, y: 300, w: 100, h: 20 }, { x: 750, y: 240, w: 100, h: 20 },
                { x: 1050, y: 320, w: 120, h: 20 }, { x: 1250, y: 260, w: 100, h: 20 },
                { x: 1600, y: 340, w: 120, h: 20 }, { x: 1850, y: 280, w: 100, h: 20 },
                { x: 2100, y: 340, w: 140, h: 20 }, { x: 2350, y: 260, w: 120, h: 20 },
                { x: 2700, y: 340, w: 120, h: 20 }, { x: 2900, y: 240, w: 100, h: 20 },
                { x: 3200, y: 320, w: 140, h: 20 }, { x: 3450, y: 260, w: 120, h: 20 },
                { x: 3800, y: 340, w: 140, h: 20 }, { x: 4000, y: 260, w: 120, h: 20 },
                { x: 4400, y: 340, w: 140, h: 20 }, { x: 4600, y: 280, w: 100, h: 20 },
                { x: 5000, y: 320, w: 140, h: 20 }, { x: 5250, y: 240, w: 120, h: 20 }
            ],
            coins: [
                { x: 320, y: 320 }, { x: 570, y: 260 }, { x: 770, y: 200 }, { x: 1070, y: 280 }, { x: 1270, y: 220 },
                { x: 1620, y: 300 }, { x: 1870, y: 240 }, { x: 2120, y: 300 }, { x: 2370, y: 220 },
                { x: 2720, y: 300 }, { x: 2920, y: 200 }, { x: 3220, y: 280 }, { x: 3470, y: 220 },
                { x: 3820, y: 300 }, { x: 4020, y: 220 }, { x: 4420, y: 300 }, { x: 4620, y: 240 },
                { x: 5020, y: 280 }, { x: 5270, y: 200 }
            ],
            npcs: [
                { x: 100, y: 420, name: '森林守卫', icon: '🧝', dialogs: ['迷雾森林漫长而危险。', '机关会弹窗讲解。', '深林深处有蠕虫。'] },
                { x: 4200, y: 420, name: '商店', icon: '🏪', isShop: true, dialogs: ['新商品，看看吧~'] }
            ],
            gadgets: [
                /* ★ 悬崖变量平台 */
                { type: 'variable-platform', x: 2800, y: 320, w: 90, h: 20, id: 'vp2', counter: 0, target: 3, stable: false, reward: 8, rewarded: false, onCliff: true },
                { type: 'loop-spikes', x: 1400, y: 420, w: 200, h: 40, period: 2.0, amplitude: 60, phase: 0, dmg: 20 },
                { type: 'loop-spikes', x: 2400, y: 420, w: 250, h: 40, period: 2.4, amplitude: 80, phase: 0.5, dmg: 20 },
                { type: 'pointer-teleport', x: 500, y: 380, toX: 2900, toY: 380, label: '*p → 0x2900', cooldown: 0 },
                /* ★ 数组平台 */
                { type: 'array-platforms', items: [
                    { x: 3450, y: 380, w: 70, h: 16, idx: 0, order: 0 },
                    { x: 3600, y: 320, w: 70, h: 16, idx: 1, order: 1 },
                    { x: 3750, y: 380, w: 70, h: 16, idx: 2, order: 2 },
                    { x: 3900, y: 340, w: 70, h: 16, idx: 3, order: 3 },
                    { x: 4050, y: 300, w: 70, h: 16, idx: 4, order: 4 }
                ], currentProgress: 0, completed: false, reward: 10, rewarded: false, mustSequence: true },
                { type: 'memory-pool', x: 1650, y: 420, w: 200, h: 40, rate: 0.5, cost: 0.03 },
                { type: 'quiz-stone', x: 2500, y: 380, w: 50, h: 60, used: false, quizIndex: 1 },
                { type: 'recursive-trap', x: 4500, y: 420, w: 400, h: 40, triggered: false, currentIdx: 0, platforms: [
                    { x: 4500, y: 420, w: 120, h: 40 }, { x: 4660, y: 420, w: 100, h: 40 },
                    { x: 4800, y: 420, w: 80, h: 40 }, { x: 4920, y: 420, w: 60, h: 40 },
                    { x: 5010, y: 420, w: 45, h: 40 }
                ]},
                { type: 'pointer-missile', x: 3000, y: 200, w: 40, h: 40, active: false, missiles: [], cooldown: 0 },
                { type: 'laser-sweep', x: 2200, y: 200, w: 20, h: 300, range: 300, period: 4, phase: 0,
                  dmg: 15, state: 'warning', stateTimer: 0, currentY: 200,
                  warningTime: 1.2, firingTime: 0.4, cooldownTime: 2.4 }
            ],
            secrets: [
                { x: 460, y: 420, discovered: false, reward: 20, label: '🌿 灌木丛' },
                { x: 3550, y: 260, discovered: false, reward: 25, label: '🌳 树洞' }
            ],
            doors: [
                { x: 200, y: 380, w: 60, h: 80, to: 'village_boss', label: '← 史莱姆巢穴' },
                { x: 5900, y: 380, w: 60, h: 80, to: 'forest_boss', label: '⚔️ Boss房' }
            ],
            elevators: [], enemies: [],
            checkpoint: { x: 5700, y: 420, active: false },
            boss: null
        },

        forest_boss: {
            name: 'BOSS 房 · 蠕虫巢穴', icon: '⚔️',
            bgImage: 'assets/images/scenes/forest-boss.png',
            bgColor1: '#2a0a1a', bgColor2: '#0a0618',
            width: 1600, groundColor: '#3a1020', shopMode: 'upgrade',
            platforms: [{ x: 0, y: 460, w: 1600, h: 80 }],
            coins: [], npcs: [], gadgets: [], secrets: [],
            doors: [{ x: 60, y: 380, w: 60, h: 80, to: 'forest', label: '← 退出' }],
            elevators: [], enemies: [],
            checkpoint: { x: 150, y: 420, active: false },
            boss: {
                id: 'worm', name: '森林蠕虫 · Segmentation Fault', icon: '🐛',
                maxHp: 120, arenaX: 200, arenaWidth: 1200,
                triggerX: 700,
                waveVariants: ['basic', 'multi'],
                barrageTypes: ['ring', 'sector', 'tracking'],
                nextDoor: { to: 'castle', label: '→ 代码城堡' }
            }
        },

        castle: {
            name: '代码城堡', icon: '🏰',
            bgImage: 'assets/images/scenes/castle.png',
            bgColor1: '#1a0e2e', bgColor2: '#0a0618',
            width: 7200, groundColor: '#3a2847', shopMode: 'upgrade',
            platforms: [
                { x: 0, y: 460, w: 700, h: 80 }, { x: 850, y: 460, w: 500, h: 80 },
                { x: 1500, y: 460, w: 500, h: 80 }, { x: 2150, y: 460, w: 500, h: 80 },
                { x: 2800, y: 460, w: 500, h: 80 }, { x: 3450, y: 460, w: 500, h: 80 },
                { x: 4100, y: 460, w: 500, h: 80 }, { x: 4750, y: 460, w: 500, h: 80 },
                { x: 5400, y: 460, w: 500, h: 80 }, { x: 6000, y: 460, w: 1200, h: 80 },
                // 高空平台
                { x: 250, y: 360, w: 120, h: 20 }, { x: 500, y: 300, w: 100, h: 20 }, { x: 750, y: 240, w: 100, h: 20 },
                { x: 1050, y: 340, w: 120, h: 20 }, { x: 1250, y: 280, w: 100, h: 20 },
                { x: 1600, y: 340, w: 120, h: 20 }, { x: 1800, y: 260, w: 120, h: 20 },
                { x: 2200, y: 360, w: 140, h: 20 }, { x: 2400, y: 280, w: 120, h: 20 },
                { x: 2850, y: 340, w: 140, h: 20 }, { x: 3050, y: 260, w: 120, h: 20 },
                { x: 3500, y: 340, w: 140, h: 20 }, { x: 3700, y: 260, w: 120, h: 20 },
                { x: 4150, y: 340, w: 140, h: 20 }, { x: 4350, y: 260, w: 120, h: 20 },
                { x: 4800, y: 340, w: 140, h: 20 }, { x: 5000, y: 260, w: 120, h: 20 },
                { x: 5450, y: 340, w: 140, h: 20 }, { x: 5650, y: 240, w: 120, h: 20 },
                { x: 6050, y: 320, w: 140, h: 20 }, { x: 6300, y: 240, w: 140, h: 20 },
                { x: 6550, y: 300, w: 140, h: 20 }
            ],
            coins: [
                { x: 270, y: 320 }, { x: 520, y: 260 }, { x: 770, y: 200 },
                { x: 1070, y: 300 }, { x: 1270, y: 240 },
                { x: 1620, y: 300 }, { x: 1820, y: 220 },
                { x: 2220, y: 320 }, { x: 2420, y: 240 },
                { x: 2870, y: 300 }, { x: 3070, y: 220 },
                { x: 3520, y: 300 }, { x: 3720, y: 220 },
                { x: 4170, y: 300 }, { x: 4370, y: 220 },
                { x: 4820, y: 300 }, { x: 5020, y: 220 },
                { x: 5470, y: 300 }, { x: 5670, y: 200 },
                { x: 6070, y: 280 }, { x: 6320, y: 200 }, { x: 6570, y: 260 }
            ],
            npcs: [
                { x: 400, y: 420, name: '长老·格林', icon: '🧙', dialogs: [
                    '这里是代码城堡，第三关试炼场。',
                    '条件门、激光、switch 平台、递归陷阱……应有尽有。',
                    '走到最深处，递归法师在那里等你。',
                    '它的弱点只能用枪打中，别忘了！'
                ]},
                { x: 2800, y: 420, name: '商店', icon: '🏪', isShop: true, dialogs: ['高端商品，勇者~'] }
            ],
            gadgets: [
                // 条件门
                { type: 'conditional-gate', x: 1900, y: 300, w: 60, h: 200, requiresKeys: 3, opened: false, label: 'if (keys >= 3)' },
                // 激光（两道）
                { type: 'laser-sweep', x: 2400, y: 200, w: 20, h: 300, range: 400, period: 3.5, phase: 0, dmg: 15, state: 'warning', stateTimer: 0, currentY: 200, warningTime: 1.0, firingTime: 0.4, cooldownTime: 2.2 },
                { type: 'laser-sweep', x: 4800, y: 180, w: 20, h: 300, range: 500, period: 4.5, phase: 1.5, dmg: 15, state: 'warning', stateTimer: 0, currentY: 180, warningTime: 1.2, firingTime: 0.4, cooldownTime: 2.6 },
                // switch 平台
                { type: 'switch-platform', x: 2600, y: 240, w: 100, h: 16, active: false, targetY: 400, closedY: 240, current: 240 },
                { type: 'switch-platform', x: 4600, y: 240, w: 100, h: 16, active: false, targetY: 400, closedY: 240, current: 240 },
                // 悬崖变量平台
                { type: 'variable-platform', x: 3800, y: 300, w: 90, h: 20, id: 'vp3', counter: 0, target: 3, stable: false, reward: 8, rewarded: false, onCliff: true },
                // 数组平台（5 块严格顺序）
                { type: 'array-platforms', items: [
                    { x: 3950, y: 380, w: 70, h: 16, idx: 0, order: 0 },
                    { x: 4100, y: 320, w: 70, h: 16, idx: 1, order: 1 },
                    { x: 4250, y: 380, w: 70, h: 16, idx: 2, order: 2 },
                    { x: 4400, y: 320, w: 70, h: 16, idx: 3, order: 3 },
                    { x: 4550, y: 260, w: 70, h: 16, idx: 4, order: 4 }
                ], currentProgress: 0, completed: false, reward: 10, rewarded: false, mustSequence: true },
                // 传送门
                { type: 'pointer-teleport', x: 700, y: 380, toX: 2300, toY: 380, label: 'memset → 0x2300', cooldown: 0 },
                { type: 'pointer-teleport', x: 5200, y: 380, toX: 6300, toY: 380, label: 'malloc → 0x6300', cooldown: 0 },
                // 地刺
                { type: 'loop-spikes', x: 1250, y: 420, w: 200, h: 40, period: 2.2, amplitude: 70, phase: 0.3, dmg: 20 },
                { type: 'loop-spikes', x: 3300, y: 420, w: 200, h: 40, period: 2.0, amplitude: 80, phase: 0.6, dmg: 20 },
                { type: 'loop-spikes', x: 5700, y: 420, w: 200, h: 40, period: 1.8, amplitude: 90, phase: 0.4, dmg: 20 },
                // 答题石碑
                { type: 'quiz-stone', x: 5000, y: 380, w: 50, h: 60, used: false, quizIndex: 2 },
                // 内存泄漏
                { type: 'memory-leak', x: 500, y: 200, w: 500, h: 260, dps: 8 },
                // 追踪导弹
                { type: 'pointer-missile', x: 3600, y: 200, w: 40, h: 40, active: false, missiles: [], cooldown: 0 },
                // 递归陷阱
                { type: 'recursive-trap', x: 6500, y: 400, w: 400, h: 40, triggered: false, currentIdx: 0, platforms: [
                    { x: 6500, y: 400, w: 140, h: 40 }, { x: 6660, y: 400, w: 120, h: 40 },
                    { x: 6800, y: 400, w: 100, h: 40 }, { x: 6920, y: 400, w: 60, h: 40 }
                ]}
            ],
            secrets: [
                { x: 1300, y: 380, discovered: false, reward: 30, label: '🕯️ 烛台' },
                { x: 6300, y: 340, discovered: false, reward: 40, label: '📜 书架' }
            ],
            doors: [
                { x: 100, y: 380, w: 60, h: 80, to: 'forest_boss', label: '← 蠕虫巢穴' },
                { x: 7100, y: 380, w: 60, h: 80, to: 'castle_boss', label: '⚔️ Boss房' }
            ],
            elevators: [], enemies: [],
            checkpoint: { x: 6900, y: 420, active: false },
            boss: null
        },

        castle_boss: {
            name: 'BOSS 房 · 递归圣殿', icon: '⚔️',
            bgImage: 'assets/images/scenes/castle-boss.png',
            bgColor1: '#150a2e', bgColor2: '#0a0618',
            width: 1700, groundColor: '#3a2050', shopMode: 'upgrade',
            platforms: [{ x: 0, y: 460, w: 1700, h: 80 }],
            coins: [], npcs: [], gadgets: [], secrets: [],
            doors: [{ x: 60, y: 380, w: 60, h: 80, to: 'castle', label: '← 退出' }],
            elevators: [], enemies: [],
            checkpoint: { x: 150, y: 420, active: false },
            boss: {
                id: 'mage', name: '递归法师 · Stack Overflow', icon: '🧙‍♂️',
                maxHp: 180, arenaX: 300, arenaWidth: 1000,
                triggerX: 800,
                waveVariants: ['basic', 'multi', 'tracking'],
                barrageTypes: ['ring', 'sector', 'tracking', 'spiral'],
                nextDoor: { to: 'bosstower', label: '→ 代码塔顶' }
            }
        },

        bosstower: {
            name: '代码塔顶', icon: '🗼',
            bgImage: 'assets/images/scenes/tower.png',
            bgColor1: '#2a0510', bgColor2: '#0a0618',
            width: 7000, groundColor: '#4a1020', shopMode: 'upgrade',
            platforms: [
                { x: 0, y: 460, w: 700, h: 80 }, { x: 800, y: 460, w: 400, h: 80 },
                { x: 1300, y: 460, w: 400, h: 80 }, { x: 1800, y: 460, w: 400, h: 80 },
                { x: 2300, y: 460, w: 400, h: 80 }, { x: 2800, y: 460, w: 400, h: 80 },
                { x: 3300, y: 460, w: 400, h: 80 }, { x: 3800, y: 460, w: 400, h: 80 },
                { x: 4300, y: 460, w: 400, h: 80 }, { x: 4800, y: 460, w: 400, h: 80 },
                { x: 5300, y: 460, w: 1700, h: 80 },
                { x: 250, y: 360, w: 120, h: 20 }, { x: 500, y: 300, w: 100, h: 20 },
                { x: 900, y: 340, w: 120, h: 20 }, { x: 1100, y: 280, w: 100, h: 20 },
                { x: 1400, y: 340, w: 120, h: 20 }, { x: 1600, y: 260, w: 100, h: 20 },
                { x: 1900, y: 340, w: 140, h: 20 }, { x: 2100, y: 280, w: 120, h: 20 },
                { x: 2400, y: 340, w: 140, h: 20 }, { x: 2600, y: 260, w: 120, h: 20 },
                { x: 2900, y: 340, w: 140, h: 20 }, { x: 3100, y: 280, w: 120, h: 20 },
                { x: 3400, y: 340, w: 140, h: 20 }, { x: 3600, y: 260, w: 120, h: 20 },
                { x: 3900, y: 340, w: 140, h: 20 }, { x: 4100, y: 280, w: 120, h: 20 },
                { x: 4400, y: 340, w: 140, h: 20 }, { x: 4600, y: 260, w: 120, h: 20 },
                { x: 4900, y: 340, w: 140, h: 20 }, { x: 5100, y: 260, w: 120, h: 20 },
                { x: 5400, y: 340, w: 140, h: 20 }, { x: 5650, y: 240, w: 140, h: 20 },
                { x: 5900, y: 300, w: 140, h: 20 }, { x: 6200, y: 240, w: 140, h: 20 },
                { x: 6450, y: 300, w: 140, h: 20 }
            ],
            coins: [
                { x: 270, y: 320 }, { x: 520, y: 260 }, { x: 920, y: 300 }, { x: 1120, y: 240 },
                { x: 1420, y: 300 }, { x: 1620, y: 220 }, { x: 1920, y: 300 }, { x: 2120, y: 240 },
                { x: 2420, y: 300 }, { x: 2620, y: 220 }, { x: 2920, y: 300 }, { x: 3120, y: 240 },
                { x: 3420, y: 300 }, { x: 3620, y: 220 }, { x: 3920, y: 300 }, { x: 4120, y: 240 },
                { x: 4420, y: 300 }, { x: 4620, y: 220 }, { x: 4920, y: 300 }, { x: 5120, y: 220 },
                { x: 5420, y: 300 }, { x: 5670, y: 200 }, { x: 5920, y: 260 }, { x: 6220, y: 200 }, { x: 6470, y: 260 }
            ],
            npcs: [{ x: 3500, y: 420, name: '商店', icon: '🏪', isShop: true, dialogs: ['最后的机会，勇者。'] }],
            gadgets: [
                { type: 'recursive-trap', x: 800, y: 400, w: 400, h: 40, triggered: false, currentIdx: 0, platforms: [
                    { x: 800, y: 400, w: 140, h: 40 }, { x: 980, y: 400, w: 120, h: 40 },
                    { x: 1140, y: 400, w: 100, h: 40 }, { x: 1280, y: 400, w: 80, h: 40 },
                    { x: 1400, y: 400, w: 60, h: 40 }, { x: 1500, y: 400, w: 45, h: 40 }
                ]},
                { type: 'memory-pool', x: 1900, y: 420, w: 150, h: 40, rate: 0.6, cost: 0.02 },
                { type: 'loop-spikes', x: 2400, y: 420, w: 200, h: 40, period: 1.8, amplitude: 80, phase: 0.2, dmg: 20 },
                { type: 'loop-spikes', x: 2900, y: 420, w: 250, h: 40, period: 2.4, amplitude: 100, phase: 0.8, dmg: 20 },
                { type: 'loop-spikes', x: 4400, y: 420, w: 200, h: 40, period: 2.0, amplitude: 90, phase: 0.4, dmg: 20 },
                { type: 'pointer-teleport', x: 1000, y: 380, toX: 2000, toY: 380, label: '*(p+i) → 0x2000', cooldown: 0 },
                { type: 'pointer-teleport', x: 4200, y: 380, toX: 5500, toY: 380, label: 'malloc → 0x5500', cooldown: 0 },
                /* ★ 悬崖变量平台 */
                { type: 'variable-platform', x: 5100, y: 300, w: 90, h: 20, id: 'vp4', counter: 0, target: 3, stable: false, reward: 8, rewarded: false, onCliff: true },
                { type: 'array-platforms', items: [
                    { x: 3600, y: 380, w: 70, h: 16, idx: 0, order: 0 },
                    { x: 3720, y: 320, w: 70, h: 16, idx: 1, order: 1 },
                    { x: 3840, y: 380, w: 70, h: 16, idx: 2, order: 2 },
                    { x: 3960, y: 320, w: 70, h: 16, idx: 3, order: 3 },
                    { x: 4080, y: 260, w: 70, h: 16, idx: 4, order: 4 }
                ], currentProgress: 0, completed: false, reward: 12, rewarded: false, mustSequence: true },
                { type: 'conditional-gate', x: 2500, y: 260, w: 60, h: 240, requiresKeys: 2, opened: false, label: 'while (keys < 2)' },
                { type: 'pointer-missile', x: 3000, y: 200, w: 40, h: 40, active: false, missiles: [], cooldown: 0 },
                { type: 'memory-leak', x: 5500, y: 200, w: 500, h: 260, dps: 10 },
                { type: 'quiz-stone', x: 4600, y: 380, w: 50, h: 60, used: false, quizIndex: 3 },
                { type: 'laser-sweep', x: 3500, y: 180, w: 20, h: 300, range: 400, period: 4, phase: 0, dmg: 18, state: 'warning', stateTimer: 0, currentY: 180, warningTime: 1.0, firingTime: 0.5, cooldownTime: 2.0 },
                { type: 'laser-sweep', x: 4800, y: 200, w: 20, h: 300, range: 500, period: 5, phase: 2, dmg: 18, state: 'warning', stateTimer: 0, currentY: 200, warningTime: 1.2, firingTime: 0.5, cooldownTime: 2.4 }
            ],
            secrets: [{ x: 1400, y: 380, discovered: false, reward: 35, label: '🔮 水晶球' }],
            doors: [
                { x: 60, y: 380, w: 60, h: 80, to: 'castle', label: '← 城堡' },
                { x: 6900, y: 380, w: 60, h: 80, to: 'tower_boss', label: '⚔️ 最终决战' }
            ],
            elevators: [], enemies: [],
            checkpoint: { x: 6700, y: 420, active: false },
            boss: null
        },

        tower_boss: {
            name: 'BOSS 房 · 代码王座', icon: '👑',
            bgImage: 'assets/images/scenes/tower-boss.png',
            bgColor1: '#3a0010', bgColor2: '#0a0618',
            width: 1800, groundColor: '#5a1020', shopMode: 'upgrade',
            platforms: [{ x: 0, y: 460, w: 1800, h: 80 }],
            coins: [], npcs: [], gadgets: [], secrets: [],
            doors: [{ x: 60, y: 380, w: 60, h: 80, to: 'bosstower', label: '← 退出' }],
            elevators: [], enemies: [],
            checkpoint: { x: 150, y: 420, active: false },
            boss: {
                id: 'tyrant', name: '代码暴君 · NullPointer', icon: '👾',
                maxHp: 300, arenaX: 300, arenaWidth: 1200,
                triggerX: 900,
                waveVariants: ['basic', 'multi', 'tracking', 'laser'],
                barrageTypes: ['ring', 'sector', 'tracking', 'spiral', 'random'],
                isFinal: true,
                // ★ 额外技能
                extraSkills: ['teleport', 'summon', 'clone', 'blackhole', 'rewind']
            }
        },

        hidden_room: {
            name: '隐藏房', icon: '🗝️',
            bgImage: 'assets/images/scenes/hidden-room.png',
            bgColor1: '#2a1a4a', bgColor2: '#0a0618',
            width: 900, groundColor: '#4a3a6a', shopMode: 'upgrade',
            platforms: [{ x: 0, y: 460, w: 900, h: 80 }, { x: 300, y: 320, w: 100, h: 20 }, { x: 500, y: 320, w: 100, h: 20 }],
            coins: [
                { x: 150, y: 300 }, { x: 200, y: 300 }, { x: 250, y: 300 }, { x: 350, y: 280 }, { x: 400, y: 280 },
                { x: 500, y: 300 }, { x: 550, y: 300 }, { x: 600, y: 300 }, { x: 700, y: 300 }, { x: 750, y: 300 }
            ],
            npcs: [{ x: 450, y: 420, name: '神秘宝箱', icon: '📦', dialogs: ['你发现了一处隐藏宝地！', '获得大量金币。'] }],
            doors: [], gadgets: [], secrets: [], elevators: [], enemies: [], boss: null,
            isHidden: true, returnTo: 'forest'
        }
    };

    const QUIZ_BANK = [
        { q: 'sizeof(int) 在 32 位系统返回多少？', opts: [2, 4, 8], answer: 4 },
        { q: '以下哪个是合法变量名？', opts: ['123abc', 'my_var', 'int'], answer: 'my_var' },
        { q: 'for 循环三个表达式用什么分隔？', opts: [',', ';', ':'], answer: ';' },
        { q: '跳出循环用哪个关键字？', opts: ['continue', 'break', 'return'], answer: 'break' },
        { q: '数组下标从几开始？', opts: [0, 1, -1], answer: 0 },
        { q: 'int a = 5; a++; a 的值是？', opts: [5, 6, 4], answer: 6 },
        { q: 'printf 输出整数用什么占位符？', opts: ['%d', '%s', '%f'], answer: '%d' },
        { q: '字符串以什么字符结尾？', opts: ['\\n', '\\0', '\\t'], answer: '\\0' }
    ];

    /* ============================================================
       全局状态
       ============================================================ */
    const AD = {
        active: false, canvas: null, ctx: null,
        scene: 'village', sceneData: null,
        player: {
            x: 100, y: 380, w: 32, h: 48,
            vx: 0, vy: 0, speed: 4.5, jumpPower: -13,
            onGround: false, facing: 1, hp: 100, maxHp: 100,
            invincible: 0, animTimer: 0, animFrame: 0,
            jumpCount: 0, maxJumps: 1,
            dashing: 0, dashCooldown: 0,
            shieldTime: 0, shieldCooldown: 0, shieldActive: false,
            teleportCooldown: 0,
            gunAngle: 0,
            gunCooldown: 0,
            shootAnimTimer: 0,
            stunned: 0,              // ★ 修复跳跃 Bug
            ammo: 8,                 // ★ 弹药系统
            maxAmmo: 8,              // ★ 弹药上限
            ammoRegenTimer: 0        // ★ 弹药恢复计时
        },
        coins: Save.data.coins, keys: Save.data.keys, runCoins: 0,
        doors: [], elevators: [], npcs: [], enemies: [],
        gadgets: [], bullets: [], particles: [], damageTexts: [],
        missiles: [], bossBullets: [], playerBullets: [], clones: [],
        blackholes: [],
        camera: { x: 0 },
        dialog: null, dialogIndex: 0,
        timeScale: 1, slowmoTimer: 0,
        lastTime: 0,
        keysPressed: {}, mouse: { x: 0, y: 0, leftDown: false, clicked: false },
        boss: null, bossState: 'idle', bossTimer: 0, bossNoDamage: true,
        bossTriggered: false,
        barrageTimer: 0,
        bossExtraSkillTimer: 0, bossExtraSkill: null,
        shieldOptions: [], shieldQuestion: null, shieldTimeLeft: 0,
        weaknesses: [], activeWeaknessId: 0, bossVictoryCalled: false,
        sessionStart: Date.now(),
        tutorialActive: false, tutorialData: null,
        choiceActive: false, choiceData: null,
        quizActive: false, quizData: null, quizStone: null,
        checkpoint: null, // { scene, x, y, activated }
        runStats: { shots: 0, hits: 0 },
        _bgImageLoaded: null, _sprite: null
    };

    const $ = s => document.querySelector(s);
    const rand = (a, b) => Math.random() * (b - a) + a;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    /* ============================================================
       提示
       ============================================================ */
    function showBanner(text, color) {
        const b = $('#advBanner'); if (!b) return;
        b.textContent = text;
        if (color) b.style.borderColor = color;
        b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
    }
    function showAchievement(title, desc) {
        const t = document.createElement('div');
        t.className = 'adv-ach-toast';
        t.innerHTML = `<span class="ico">🏆</span><div><div style="font-size:15px;font-weight:800">${title}</div><div style="font-size:11px;opacity:.85;margin-top:2px">${desc}</div></div>`;
        document.body.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 600); }, 3200);
    }
    function showTutorial(type) {
        if (hasSeenTutorial(type)) return;
        const t = TUTORIALS[type]; if (!t) return;
        markTutorialSeen(type);
        AD.tutorialActive = true; AD.tutorialData = t;
        const modal = $('#advTutorialModal');
        modal.innerHTML = `
            <div class="adv-tutorial-panel">
                <div class="adv-tutorial-head">
                    <div class="adv-tutorial-icon">📚</div>
                    <div><div class="adv-tutorial-badge">首次遇见 · 教学</div><h3>${t.title}</h3></div>
                </div>
                <div class="adv-tutorial-body">
                    <div class="adv-tut-block"><div class="adv-tut-label">📖 知识点</div><p>${t.concept}</p></div>
                    <div class="adv-tut-block"><div class="adv-tut-label">🎯 通关方式</div><p>${t.goal}</p></div>
                    <div class="adv-tut-block"><div class="adv-tut-label">💻 对应代码</div><pre class="adv-tut-code">${escapeHtml(t.code)}</pre></div>
                    <div class="adv-tut-tip">💡 ${t.tip}</div>
                </div>
                <button class="adv-tutorial-close" id="advTutorialClose">我知道了 (按 E 继续)</button>
            </div>`;
        modal.classList.add('active');
        $('#advTutorialClose').addEventListener('click', closeTutorial);
    }
    function closeTutorial() { AD.tutorialActive = false; AD.tutorialData = null; $('#advTutorialModal').classList.remove('active'); }

    /* ============================================================
       初始化 DOM
       ============================================================ */
    function initDOM() {
        const wrapper = document.createElement('div');
        wrapper.className = 'adv-wrapper';
        wrapper.id = 'advWrapper';
        wrapper.innerHTML = `
            <div class="adv-hud">
                <div class="adv-hud-left">
                    <button class="adv-back-btn" id="advBackBtn">← 返回大厅</button>
                    <div class="adv-hp-bar">
                        <span class="adv-heart">❤️</span>
                        <div class="adv-hp-track"><div class="adv-hp-fill" id="advHpFill"></div></div>
                        <span class="adv-hp-text" id="advHpText">100 / 100</span>
                    </div>
                </div>
                <div class="adv-hud-center">
                    <div class="adv-scene-badge">
                        <span class="adv-scene-ico" id="advSceneIco">🏘️</span>
                        <span id="advSceneName">晨曦村庄</span>
                    </div>
                </div>
                <div class="adv-hud-right">
                    <div class="adv-resource"><span class="adv-res-ico">🪙</span><span id="advCoins">0</span></div>
                    <div class="adv-resource keys"><span class="adv-res-ico">🔑</span><span id="advKeys">0</span></div>
                    <button class="adv-save-btn" id="advAchBtn">🏆 成就</button>
                    <button class="adv-save-btn" id="advShopBtn">🏪 商店</button>
                    <button class="adv-save-btn" id="advSaveBtn">💾 保存</button>
                </div>
            </div>
            <div class="adv-canvas-wrap" id="advCanvasWrap">
                <canvas id="advCanvas" width="1400" height="540"></canvas>
                <div class="adv-boss-hud" id="advBossHud">
                    <div class="adv-boss-head">
                        <div class="adv-boss-name" id="advBossName">代码暴君</div>
                        <div class="adv-boss-phase" id="advBossPhase">阶段 1 / 3</div>
                    </div>
                    <div class="adv-boss-hp-track"><div class="adv-boss-hp-fill" id="advBossHpFill"></div></div>
                </div>
                <div class="adv-dialog" id="advDialog">
                    <div class="adv-dialog-speaker" id="advDialogSpeaker"></div>
                    <div class="adv-dialog-text" id="advDialogText"></div>
                    <div class="adv-dialog-hint">按 E / 空格 继续</div>
                </div>
                <div class="adv-shield-ui" id="advShieldUI">
                    <div class="adv-shield-title">防御代码光波 — 选择正确的盾牌！</div>
                    <div class="adv-shield-code" id="advShieldCode"></div>
                    <div class="adv-shield-options" id="advShieldOptions"></div>
                    <div class="adv-shield-timer"><div class="adv-shield-timer-fill" id="advShieldTimerFill"></div></div>
                </div>
                <div class="adv-quiz-ui" id="advQuizUI">
                    <div class="adv-quiz-title">📜 答题石碑</div>
                    <div class="adv-quiz-question" id="advQuizQuestion"></div>
                    <div class="adv-quiz-options" id="advQuizOptions"></div>
                </div>
                <div class="adv-slowmo" id="advSlowmo"><div class="slowmo-text">SLOW MOTION</div></div>
                <div class="adv-banner" id="advBanner"></div>
                <div class="adv-skill-bar" id="advSkillBar"></div>
                <div class="adv-tutorial-modal" id="advTutorialModal"></div>
                <div class="adv-choice-modal" id="advChoiceModal"></div>
            </div>
            <div class="adv-controls">
                <div class="adv-ctrl"><kbd>A</kbd><kbd>D</kbd> 移动</div>
                <div class="adv-ctrl"><kbd>空格</kbd> 跳跃</div>
                <div class="adv-ctrl"><kbd>E</kbd> 交互</div>
                <div class="adv-ctrl"><kbd>Shift</kbd> 二段跳</div>
                <div class="adv-ctrl"><kbd>J</kbd> / 鼠标左键 射击</div>
                <div class="adv-ctrl"><kbd>K</kbd> 护盾</div>
                <div class="adv-ctrl"><kbd>L</kbd> 减速</div>
                <div class="adv-ctrl"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> 盾牌/选项</div>
            </div>`;
        document.body.appendChild(wrapper);
        AD.canvas = document.getElementById('advCanvas');
        AD.ctx = AD.canvas.getContext('2d');

        document.getElementById('advBackBtn').addEventListener('click', exitAdventure);
        document.getElementById('advShopBtn').addEventListener('click', openShop);
        document.getElementById('advAchBtn').addEventListener('click', openAchievements);
        document.getElementById('advSaveBtn').addEventListener('click', () => { persistProgress(); showBanner('💾 已保存'); });
        AD.canvas.addEventListener('mousemove', e => {
            const r = AD.canvas.getBoundingClientRect();
            AD.mouse.x = (e.clientX - r.left) * (AD.canvas.width / r.width);
            AD.mouse.y = (e.clientY - r.top) * (AD.canvas.height / r.height);
        });
        AD.canvas.addEventListener('mousedown', e => {
            if (e.button === 0) { AD.mouse.leftDown = true; AD.mouse.clicked = true; }
        });
        AD.canvas.addEventListener('mouseup', e => {
            if (e.button === 0) AD.mouse.leftDown = false;
        });
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        updateSkillBar();
        checkAchievements();
    }

    function onKeyDown(e) {
        if (!AD.active) return;
        if (AD.tutorialActive) { if (e.code === 'KeyE' || e.code === 'Space') { e.preventDefault(); closeTutorial(); } return; }
        if (AD.choiceActive) {
            if (e.code === 'Digit1') { e.preventDefault(); chooseEnding('purify'); }
            if (e.code === 'Digit2') { e.preventDefault(); chooseEnding('seize'); }
            if (e.code === 'Digit3') { e.preventDefault(); chooseEnding('peace'); }
            return;
        }
        if (AD.quizActive) {
            if (e.code === 'Digit1') { e.preventDefault(); answerQuiz(0); }
            if (e.code === 'Digit2') { e.preventDefault(); answerQuiz(1); }
            if (e.code === 'Digit3') { e.preventDefault(); answerQuiz(2); }
            if (e.code === 'Escape') { e.preventDefault(); closeQuiz(); }
            return;
        }
        AD.keysPressed[e.code] = true;
        if (e.code === 'Escape') { exitAdventure(); return; }
        if (AD.dialog) { if (e.code === 'KeyE' || e.code === 'Space') { e.preventDefault(); advanceDialog(); } return; }
        if (e.code === 'KeyE') tryInteract();
        if (e.code === 'KeyJ') shoot();
        if (Save.hasSkill('shield') && e.code === 'KeyK') useShield();
        if (Save.hasSkill('slowmo') && e.code === 'KeyL') useSlowmo();
        if (AD.shieldQuestion && (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3')) {
            e.preventDefault();
            pickShield(Number(e.code.replace('Digit', '')) - 1);
        }
    }
    function onKeyUp(e) { AD.keysPressed[e.code] = false; }

    /* ============================================================
       枪械系统
       ============================================================ */
    function updateGunAim() {
        const p = AD.player;
        const gunX = p.x + p.w / 2;
        const gunY = p.y + p.h / 2;
        const worldMouseX = AD.mouse.x + AD.camera.x;
        const worldMouseY = AD.mouse.y;
        p.gunAngle = Math.atan2(worldMouseY - gunY, worldMouseX - gunX);
        // 面向鼠标方向（用于精灵镜像）
        p.facing = Math.cos(p.gunAngle) >= 0 ? 1 : -1;
    }

    function shoot() {
        const p = AD.player;
        if (p.gunCooldown > 0) return;

        // ★ 弹药检查（不弹提示，靠左下角弹药条显示）
        if (p.ammo <= 0) return;

        p.ammo--;
        p.gunCooldown = 20;      // ★ 射速改慢（从 8 帧 → 20 帧，约 0.33 秒/发）
        p.shootAnimTimer = 8;

        const gunX = p.x + p.w / 2 + Math.cos(p.gunAngle) * 20;
        const gunY = p.y + p.h / 2 + Math.sin(p.gunAngle) * 20;
        const speedMul = Save.data.upgradeStats.bulletSpdMul || 1;
        const bulletSpeed = 22 * speedMul;

        AD.playerBullets.push({
            x: gunX, y: gunY,
            vx: Math.cos(p.gunAngle) * bulletSpeed,
            vy: Math.sin(p.gunAngle) * bulletSpeed,
            life: 1.2, maxLife: 1.2,
            r: 5,
            color: '#00f0ff',
            trail: []
        });

        AD.runStats.shots++;
        spawnParticles(gunX, gunY, '#00f0ff', 4);
    }

    function updatePlayerBullets(dt) {
        const p = AD.player;
        for (let i = AD.playerBullets.length - 1; i >= 0; i--) {
            const b = AD.playerBullets[i];
            // 记录拖尾
            b.trail.push({ x: b.x, y: b.y, life: 0.15 });
            if (b.trail.length > 6) b.trail.shift();
            b.trail.forEach(t => t.life -= dt);
            b.trail = b.trail.filter(t => t.life > 0);

            b.x += b.vx * 60 * dt;
            b.y += b.vy * 60 * dt;
            b.life -= dt;

            // 命中 Boss
            if (AD.boss && AD.bossState === 'expose-weakness') {
                for (let j = AD.weaknesses.length - 1; j >= 0; j--) {
                    const w = AD.weaknesses[j];
                    if (Math.hypot(b.x - w.x, b.y - w.y) < w.r) {
                        w.hp--; w.hit = true;
                        spawnParticles(w.x, w.y, '#ffcc00', 12);
                        spawnDamageText(w.x, w.y - 20, '-1', '#ffcc00');
                        shakeScreen(3);
                        AD.runStats.hits++;
                        if (w.hp <= 0) {
                            AD.boss.hp -= 12; updateBossHpBar();
                            spawnDamageText(AD.boss.x, AD.boss.y - 60, '-12', '#ff2e88');
                            spawnParticles(AD.boss.x, AD.boss.y, '#ff2e88', 25);
                            showBanner('💥 弱点击破！', '#ff2e88');
                            shakeScreen(8);
                            Save.addCoins(5); AD.coins += 5;
                            document.getElementById('advCoins').textContent = AD.coins;
                            AD.weaknesses.splice(j, 1);
                            checkBossDeath();
                        } else {
                            setTimeout(() => w.hit = false, 400);
                        }
                        AD.playerBullets.splice(i, 1);
                        break;
                    }
                }
            }
            // 命中 Boss 本体（普通伤害）
            else if (AD.boss && Math.hypot(b.x - AD.boss.x, b.y - AD.boss.y) < 60) {
                // 普通命中减少 1 血
                AD.boss.hp -= 1; updateBossHpBar();
                spawnParticles(b.x, b.y, '#ffcc00', 4);
                AD.playerBullets.splice(i, 1);
                continue;
            }
            // 命中弹幕（消除）
            for (let j = AD.bossBullets.length - 1; j >= 0; j--) {
                const bb = AD.bossBullets[j];
                if (Math.hypot(b.x - bb.x, b.y - bb.y) < bb.r + b.r) {
                    spawnParticles(bb.x, bb.y, bb.color, 8);
                    AD.bossBullets.splice(j, 1);
                    AD.playerBullets.splice(i, 1);
                    AD.runStats.hits++;
                    break;
                }
            }
            if (b.life <= 0) AD.playerBullets.splice(i, 1);
        }
    }

    function checkBossDeath() {
        if (!AD.boss) return;
        if (AD.boss.hp <= 0) {
            setTimeout(triggerBossVictory, 300);
        }
    }

    /* ============================================================
       技能
       ============================================================ */
    function updateSkillBar() {
        const bar = $('#advSkillBar'); if (!bar) return;
        const activeSkills = Object.values(SKILLS).filter(s => Save.hasSkill(s.id) && s.hotkey);
        if (activeSkills.length === 0) { bar.innerHTML = ''; bar.style.display = 'none'; return; }
        bar.style.display = 'flex';
        bar.innerHTML = activeSkills.map(s => `
            <div class="adv-skill ready" data-skill="${s.id}">
                <span class="adv-skill-key">${s.hotkey}</span>
                <span class="adv-skill-ico">${s.icon}</span>
                <span class="adv-skill-name">${s.name}</span>
            </div>`).join('');
        bar.querySelectorAll('.adv-skill').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.skill;
                if (id === 'dash') useDash();
                if (id === 'shield') useShield();
                if (id === 'slowmo') useSlowmo();
            });
        });
    }
    function setSkillCooldown(id, ms) {
        const el = document.querySelector(`.adv-skill[data-skill="${id}"]`); if (!el) return;
        el.classList.add('cooldown'); el.classList.remove('ready');
        setTimeout(() => { el.classList.remove('cooldown'); el.classList.add('ready'); }, ms);
    }
    function useDash() {
        const p = AD.player;
        if (p.dashCooldown > 0) return;
        p.dashing = 14;
        const cd = Math.round(60 * (Save.data.upgradeStats.dashCdMul || 1));
        p.dashCooldown = cd;
        p.invincible = Math.max(p.invincible, 18);
        setSkillCooldown('dash', 900);
        spawnParticles(p.x + p.w / 2, p.y + p.h / 2, '#00f0ff', 14);
    }
    function useShield() {
        const p = AD.player;
        if (p.shieldCooldown > 0) return;
        const bonus = Save.data.upgradeStats.shieldBonus || 0;
        p.shieldActive = true; p.shieldTime = 120 + bonus; p.shieldCooldown = 240;
        setSkillCooldown('shield', 2000);
        showBanner('🛡️ 护盾开启');
    }
    function useSlowmo() {
        if (AD.slowmoTimer > 0.5) return;
        const bonus = Save.data.upgradeStats.slowmoBonus || 0;
        triggerSlowmo(6 + bonus, true);
        setSkillCooldown('slowmo', 8000);
        showBanner('⏳ 时间减速');
    }

    /* ============================================================
       成就
       ============================================================ */
    function checkAchievements() {
        const s = {
            totalCoins: Save.data.totalCoins || 0,
            bosses: Save.data.bossesDefeated || [],
            skills: Save.data.skills || [],
            upgrades: Save.data.upgrades || [],
            secretsFound: Save.data.secretsFound || 0,
            ending: Save.data.ending,
            defeatedNoDamage: Save.data.defeatedNoDamage || [],
            quizCorrect: Save.data.quizCorrect || 0,
            maxCoinsOneRun: Save.data.maxCoinsOneRun || 0,
            laserHits: Save.data.laserHits || 0,
            gunKills: Save.data.gunKills || 0,
            bestAccuracy: Save.data.bestAccuracy || 0
        };
        ACHIEVEMENTS_DEF.forEach(a => {
            if (unlockedAchievements.includes(a.id)) return;
            try { if (a.check(s)) unlockAchievement(a.id); } catch (e) {}
        });
    }

    function openAchievements() {
        let panel = document.getElementById('advAchModal');
        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'adv-shop'; panel.id = 'advAchModal';
            document.getElementById('advWrapper').appendChild(panel);
        }
        panel.innerHTML = `
            <div class="adv-shop-panel">
                <div class="adv-shop-header">
                    <div class="adv-shop-title">🏆 成就墙</div>
                    <div class="adv-shop-coins">已解锁 ${unlockedAchievements.length} / ${ACHIEVEMENTS_DEF.length}</div>
                </div>
                <div class="adv-ach-grid">
                    ${ACHIEVEMENTS_DEF.map(a => {
                        const unlocked = unlockedAchievements.includes(a.id);
                        return `<div class="adv-ach-cell ${unlocked ? 'unlocked' : 'locked'}" title="${a.desc}">
                            <div class="adv-ach-ico">${a.icon}</div>
                            <div class="adv-ach-name">${a.name}</div>
                            <div class="adv-ach-desc">${a.desc}</div>
                        </div>`;
                    }).join('')}
                </div>
                <button class="adv-shop-close" id="advAchClose">关闭</button>
            </div>`;
        panel.classList.add('active');
        panel.querySelector('#advAchClose').addEventListener('click', () => panel.classList.remove('active'));
    }

    /* ============================================================
       进入 / 退出
       ============================================================ */
    function enterAdventure() {
        if (AD.active) return;
        AD.active = true;
        AD.sessionStart = Date.now();
        AD.runCoins = 0;
        AD.runStats = { shots: 0, hits: 0 };
        document.getElementById('advWrapper').classList.add('active');
        loadScene(Save.data.currentScene || 'village');
        AD.lastTime = performance.now();
        requestAnimationFrame(loop);
        showBanner('冒险开始', '#00f0ff');
        checkAchievements();
        setTimeout(() => {
            const firstNpc = AD.npcs[0];
            if (firstNpc && !firstNpc.isShop) startDialog(firstNpc);
            // 首次进入冒险时教学枪
            if (!hasSeenTutorial('gun')) showTutorial('gun');
        }, 800);
    }
    function exitAdventure() {
        persistProgress();
        if (AD.runCoins > (Save.data.maxCoinsOneRun || 0)) {
            Save.save({ maxCoinsOneRun: AD.runCoins });
        }
        // 计算命中率
        if (AD.runStats.shots > 5) {
            const acc = AD.runStats.hits / AD.runStats.shots;
            if (acc > (Save.data.bestAccuracy || 0)) Save.save({ bestAccuracy: acc });
        }
        Save.data.gunKills = (Save.data.gunKills || 0) + AD.runStats.hits;
        Save.save({});
        checkAchievements();
        AD.active = false;
        document.getElementById('advWrapper').classList.remove('active');
        AD.dialog = null;
    }
    function persistProgress() {
        Save.save({
            coins: AD.coins, keys: AD.keys, currentScene: AD.scene,
            totalPlayTime: Save.data.totalPlayTime + Math.floor((Date.now() - AD.sessionStart) / 1000)
        });
    }

    /* ============================================================
       场景加载
       ============================================================ */
    function loadScene(sceneId, spawnX) {
        const data = SCENES[sceneId]; if (!data) return;
        AD.scene = sceneId; AD.sceneData = data;

        AD.doors = (data.doors || []).map(d => ({ ...d }));
        AD.elevators = (data.elevators || []).map(e => ({ ...e }));
        AD.npcs = (data.npcs || []).map(n => ({ ...n, dialogIndex: 0 }));
        AD.gadgets = JSON.parse(JSON.stringify(data.gadgets || []));
        data.coins = (data.coins || []).map(c => ({ ...c, collected: false }));

        AD.player.x = spawnX != null ? spawnX : 100;
        AD.player.y = 380;
        AD.player.vx = 0; AD.player.vy = 0; AD.player.jumpCount = 0;
        AD.player.maxHp = 100 + (Save.data.upgradeStats.maxHpBonus || 0);
        AD.player.hp = AD.player.maxHp;
        updateHpBar();

        AD.bullets = []; AD.particles = []; AD.damageTexts = []; AD.weaknesses = [];
        AD.missiles = []; AD.bossBullets = []; AD.playerBullets = [];
        AD.clones = []; AD.blackholes = [];
        AD.timeScale = 1; AD.slowmoTimer = 0;
        document.getElementById('advSlowmo').classList.remove('active');

        AD.boss = null; AD.bossState = 'idle'; AD.bossTriggered = false; AD.barrageTimer = 0;
        AD.bossExtraSkillTimer = 0; AD.bossExtraSkill = null;

        // 重置存档点状态
        if (data.checkpoint) {
            data.checkpoint.active = false;
        }

        document.getElementById('advSceneName').textContent = data.name;
        document.getElementById('advSceneIco').textContent = data.icon;
        document.getElementById('advCoins').textContent = AD.coins;
        document.getElementById('advKeys').textContent = AD.keys;

        hideBossHud();
        Save.save({ currentScene: sceneId });
        preloadSceneImages();
    }

    function updateAmmoHud() {
        const el = document.getElementById('advAmmoText');
        if (el) {
            el.textContent = AD.player.ammo + ' / ' + AD.player.maxAmmo;
            // 空仓时变红
            el.style.color = AD.player.ammo <= 0 ? '#ff2e88' : (AD.player.ammo <= 2 ? '#ffcc00' : '#64d2ff');
        }
    }

    function updateHpBar() {
        const p = AD.player;
        const pct = Math.max(0, (p.hp / p.maxHp) * 100);
        document.getElementById('advHpFill').style.width = pct + '%';
        document.getElementById('advHpText').textContent = Math.max(0, Math.round(p.hp)) + ' / ' + p.maxHp;
    }

    function startDialog(npc) {
        if (npc.isShop) { openShop(); return; }
        AD.dialog = npc; AD.dialogIndex = 0;
        document.getElementById('advDialogSpeaker').textContent = npc.name;
        document.getElementById('advDialogText').textContent = npc.dialogs[0];
        document.getElementById('advDialog').classList.add('active');
    }
    function advanceDialog() {
        if (!AD.dialog) return;
        AD.dialogIndex++;
        if (AD.dialogIndex >= AD.dialog.dialogs.length) {
            document.getElementById('advDialog').classList.remove('active');
            AD.dialog = null;
        } else {
            document.getElementById('advDialogText').textContent = AD.dialog.dialogs[AD.dialogIndex];
        }
    }

    function openQuizStone(stone) {
        AD.quizStone = stone;
        AD.quizData = QUIZ_BANK[stone.quizIndex % QUIZ_BANK.length];
        AD.quizActive = true;
        const ui = document.getElementById('advQuizUI');
        document.getElementById('advQuizQuestion').textContent = AD.quizData.q;
        const optsBox = document.getElementById('advQuizOptions');
        optsBox.innerHTML = AD.quizData.opts.map((o, i) => `
            <button class="adv-quiz-opt" data-idx="${i}">
                <span class="adv-quiz-key">[${i + 1}]</span>
                <span class="adv-quiz-val">${escapeHtml(String(o))}</span>
            </button>`).join('');
        optsBox.querySelectorAll('.adv-quiz-opt').forEach(b => {
            b.addEventListener('click', () => answerQuiz(Number(b.dataset.idx)));
        });
        ui.classList.add('active');
    }
    function answerQuiz(idx) {
        if (!AD.quizActive || !AD.quizData) return;
        const q = AD.quizData;
        const opts = q.opts;
        const correct = opts[idx] === q.answer;
        const ui = document.getElementById('advQuizUI');
        ui.querySelectorAll('.adv-quiz-opt').forEach(b => b.style.pointerEvents = 'none');
        ui.querySelectorAll('.adv-quiz-opt').forEach(b => {
            const i = Number(b.dataset.idx);
            if (opts[i] === q.answer) b.classList.add('correct');
            else if (i === idx) b.classList.add('wrong');
        });
        if (correct) {
            AD.coins += 5; Save.addCoins(5);
            Save.data.quizCorrect = (Save.data.quizCorrect || 0) + 1;
            Save.save({});
            document.getElementById('advCoins').textContent = AD.coins;
            showBanner('✓ 答对 +5 金币', '#00ff88');
            spawnParticles(AD.player.x + AD.player.w / 2, AD.player.y, '#00ff88', 20);
            checkAchievements();
        } else {
            showBanner('✗ 答错了', '#ff2e88');
        }
        if (AD.quizStone) { AD.quizStone.used = true; AD.quizStone.quizIndex++; }
        setTimeout(closeQuiz, 1400);
    }
    function closeQuiz() { AD.quizActive = false; AD.quizData = null; AD.quizStone = null; document.getElementById('advQuizUI').classList.remove('active'); }

    function tryInteract() {
        if (AD.dialog || AD.tutorialActive || AD.quizActive || AD.choiceActive) return;
        const p = AD.player;
        for (const npc of AD.npcs) if (Math.abs(p.x - npc.x) < 70) { startDialog(npc); return; }
        for (const g of AD.gadgets) {
            if (g.type === 'switch-platform' && Math.abs(p.x + p.w / 2 - (g.x + g.w / 2)) < 80) {
                g.active = !g.active;
                showBanner(g.active ? '🔛 switch: 平台上升' : '🔒 switch: 平台下降');
                return;
            }
            if (g.type === 'quiz-stone' && !g.used && Math.abs(p.x + p.w / 2 - (g.x + g.w / 2)) < 70) {
                openQuizStone(g); return;
            }
        }
        const secret = checkSecretNear();
        if (secret) {
            secret.discovered = true;
            Save.data.secretsFound = (Save.data.secretsFound || 0) + 1;
            Save.save({});
            AD.coins += secret.reward; Save.addCoins(secret.reward);
            document.getElementById('advCoins').textContent = AD.coins;
            showBanner(`🗝️ 发现隐藏房！+${secret.reward} 金币`, '#c4b5fd');
            spawnParticles(p.x + p.w / 2, p.y + p.h / 2, '#c4b5fd', 20);
            checkAchievements();
            setTimeout(() => {
                const prevScene = AD.scene;
                loadScene('hidden_room', 100);
                SCENES.hidden_room.returnTo = prevScene;
                AD.doors = [{ x: 800, y: 380, w: 60, h: 80, to: prevScene, label: '← 返回' }];
            }, 500);
            return;
        }
        for (const door of AD.doors) {
            if (p.x + p.w > door.x - 20 && p.x < door.x + door.w + 20) {
                showBanner(door.label);
                setTimeout(() => loadScene(door.to, 120), 350);
                return;
            }
        }
        for (const ev of AD.elevators) {
            if (Math.abs(p.x + p.w / 2 - (ev.x + ev.w / 2)) < ev.w / 2 + 30) {
                showBanner(ev.label + ' ' + ev.floor);
                setTimeout(() => loadScene(ev.targetScene, 120), 400);
                return;
            }
        }
    }
    function checkSecretNear() {
        const secrets = AD.sceneData.secrets || [];
        for (const s of secrets) {
            if (s.discovered) continue;
            if (Math.abs(AD.player.x + AD.player.w / 2 - s.x) < 60) return s;
        }
        return null;
    }

    /* ============================================================
       Boss 战
       ============================================================ */
    function startBossFight() {
        const bData = AD.sceneData.boss;
        AD.boss = { ...bData, hp: bData.maxHp, phase: 1, x: bData.arenaX + bData.arenaWidth / 2, y: 260 };
        AD.bossState = 'intro'; AD.bossTimer = 0; AD.bossVictoryCalled = false;
        AD.bossNoDamage = true; AD.bossTriggered = true; AD.barrageTimer = 0;
        AD.bossExtraSkillTimer = 0; AD.bossExtraSkill = null;
        showBossHud();
        showBanner('⚔️ BOSS 战 ⚔️', '#ff2e88');
        if (!hasSeenTutorial('boss-barrage')) showTutorial('boss-barrage');
    }
    function showBossHud() {
        document.getElementById('advBossHud').classList.add('active');
        document.getElementById('advBossName').textContent = AD.boss.name;
        updateBossHpBar();
    }
    function hideBossHud() {
        document.getElementById('advBossHud').classList.remove('active');
        document.getElementById('advShieldUI').classList.remove('active');
        AD.weaknesses = [];
    }
    function updateBossHpBar() {
        const b = AD.boss; if (!b) return;
        const pct = Math.max(0, (b.hp / b.maxHp) * 100);
        document.getElementById('advBossHpFill').style.width = pct + '%';
        const phase = b.hp > b.maxHp * 0.66 ? 1 : b.hp > b.maxHp * 0.33 ? 2 : 3;
        document.getElementById('advBossPhase').textContent = `阶段 ${phase} / 3`;
        b.phase = phase;
    }

    function updateBoss(dt) {
        if (!AD.boss) return;
        AD.bossTimer += dt;

        // ★ 额外技能触发（每 6 秒一次）
        if (AD.boss.extraSkills && AD.boss.extraSkills.length > 0) {
            AD.bossExtraSkillTimer += dt;
            if (AD.bossExtraSkillTimer > 6 && AD.bossState !== 'shield-pick') {
                AD.bossExtraSkillTimer = 0;
                const skill = AD.boss.extraSkills[Math.floor(Math.random() * AD.boss.extraSkills.length)];
                triggerBossExtraSkill(skill);
            }
        }

        if (AD.bossState === 'intro') {
            if (AD.bossTimer > 2) { AD.bossTimer = 0; AD.bossState = 'code-wave'; spawnCodeWave(); }
        }
        else if (AD.bossState === 'code-wave') {
            if (AD.bossTimer > 1.2) { AD.bossTimer = 0; AD.bossState = 'shield-pick'; openShieldPicker(); }
        }
        else if (AD.bossState === 'shield-pick') {
            AD.shieldTimeLeft -= dt;
            const fill = document.getElementById('advShieldTimerFill');
            if (fill) fill.style.width = Math.max(0, (AD.shieldTimeLeft / 5) * 100) + '%';
            if (AD.shieldTimeLeft <= 0 && AD.shieldQuestion) pickShield(-1);
        }
        else if (AD.bossState === 'expose-weakness') {
            if (AD.bossTimer > 4) {
                AD.bossTimer = 0;
                AD.weaknesses = [];
                AD.bossState = 'barrage'; AD.barrageTimer = 0;
                showBanner('🌊 弹幕来袭！', '#ff2e88');
            }
        }
        else if (AD.bossState === 'barrage') {
            AD.barrageTimer = (AD.barrageTimer || 0) + dt;
            if (AD.barrageTimer > 1.8) { AD.barrageTimer = 0; fireBarrage(); }
            if (AD.bossTimer > 5) { AD.bossTimer = 0; AD.bossState = 'code-wave'; spawnCodeWave(); }
        }
    }

    /* ---------- Boss 额外技能 ---------- */
    function triggerBossExtraSkill(skill) {
        const b = AD.boss;
        const p = AD.player;
        if (!b) return;
        if (skill === 'teleport') {
            // 瞬移到玩家附近
            b.x = p.x + rand(-200, 200);
            b.x = clamp(b.x, b.arenaX + 100, b.arenaX + b.arenaWidth - 100);
            spawnParticles(b.x, b.y, '#a855f7', 30);
            showBanner('⚡ Boss 瞬移！', '#a855f7');
        }
        else if (skill === 'summon') {
            // 召唤 3 个小怪（当作弹幕）
            for (let i = 0; i < 3; i++) {
                AD.bossBullets.push({
                    x: b.x + rand(-80, 80), y: b.y + rand(-40, 40),
                    vx: 0, vy: 0, r: 14, life: 8, color: '#a855f7', symbol: '☠',
                    tracking: true, speed: 2.2, trackingAccel: 0.08, isMinion: true
                });
            }
            showBanner('☠ Boss 召唤小怪！', '#a855f7');
        }
        else if (skill === 'clone') {
            // 生成 2 个分身（会发射弹幕）
            for (let i = 0; i < 2; i++) {
                AD.clones.push({
                    x: b.x + rand(-150, 150), y: b.y + rand(-50, 50),
                    hp: 3, maxHp: 3, life: 6, maxLife: 6,
                    fireTimer: 1
                });
            }
            showBanner('👥 Boss 分身出现！', '#ff8a00');
        }
        else if (skill === 'blackhole') {
            // 生成黑洞，吸引玩家
            AD.blackholes.push({
                x: b.x + rand(-100, 100), y: b.y + rand(-40, 40),
                r: 80, life: 5, maxLife: 5, pullForce: 0.08
            });
            showBanner('🕳️ 黑洞出现！', '#00f0ff');
        }
        else if (skill === 'rewind') {
            // 时间倒流 - 玩家屏幕变红，短暂无法移动
            AD.player.stunned = 1.2;
            showBanner('⏪ 时间倒流！', '#ff2e88');
            triggerSlowmo(2, true);
        }
    }

    function updateBossExtraSkills(dt) {
        const p = AD.player;
        // 分身
        for (let i = AD.clones.length - 1; i >= 0; i--) {
            const c = AD.clones[i];
            c.life -= dt;
            c.fireTimer -= dt;
            if (c.fireTimer <= 0) {
                c.fireTimer = 1.4;
                // 分身发射朝玩家的子弹
                const angle = Math.atan2(p.y + p.h / 2 - c.y, p.x + p.w / 2 - c.x);
                AD.bossBullets.push({
                    x: c.x, y: c.y,
                    vx: Math.cos(angle) * 3.5,
                    vy: Math.sin(angle) * 3.5,
                    r: 8, life: 4, color: '#ff8a00', symbol: '◆'
                });
            }
            // 玩家子弹命中
            for (let j = AD.playerBullets.length - 1; j >= 0; j--) {
                const b = AD.playerBullets[j];
                if (Math.hypot(b.x - c.x, b.y - c.y) < 25) {
                    c.hp--;
                    spawnParticles(c.x, c.y, '#ff8a00', 10);
                    AD.playerBullets.splice(j, 1);
                    if (c.hp <= 0) {
                        spawnParticles(c.x, c.y, '#ff8a00', 30);
                        AD.clones.splice(i, 1);
                        break;
                    }
                }
            }
            if (c.life <= 0) AD.clones.splice(i, 1);
        }
        // 黑洞
        for (let i = AD.blackholes.length - 1; i >= 0; i--) {
            const bh = AD.blackholes[i];
            bh.life -= dt;
            const dx = bh.x - (p.x + p.w / 2);
            const dy = bh.y - (p.y + p.h / 2);
            const dist = Math.hypot(dx, dy);
            if (dist < 300) {
                p.vx += (dx / dist) * bh.pullForce;
                p.vy += (dy / dist) * bh.pullForce;
            }
            if (bh.life <= 0) AD.blackholes.splice(i, 1);
        }
    }

    /* ---------- 弹幕 ---------- */
    function fireBarrage() {
        const b = AD.boss;
        const p = AD.player;
        const types = b.barrageTypes || ['ring'];
        const type = types[Math.floor(Math.random() * types.length)];
        const cx = b.x, cy = b.y;
        if (type === 'ring') {
            const n = 12;
            for (let i = 0; i < n; i++) {
                const angle = (i / n) * Math.PI * 2;
                AD.bossBullets.push({ x: cx, y: cy, vx: Math.cos(angle) * 3.5, vy: Math.sin(angle) * 3.5, r: 8, life: 4, color: '#ff2e88', symbol: '●' });
            }
            shakeScreen(6); triggerSlowmo(1.2, false);
        }
        else if (type === 'sector') {
            const baseAngle = Math.atan2(p.y + p.h / 2 - cy, p.x + p.w / 2 - cx);
            for (let i = -2; i <= 2; i++) {
                const angle = baseAngle + i * 0.25;
                AD.bossBullets.push({ x: cx, y: cy, vx: Math.cos(angle) * 4.2, vy: Math.sin(angle) * 4.2, r: 9, life: 4, color: '#ff8a00', symbol: '◆' });
            }
        }
        else if (type === 'tracking') {
            for (let i = 0; i < 3; i++) {
                AD.bossBullets.push({ x: cx + rand(-30, 30), y: cy + rand(-30, 30), vx: 0, vy: 0, r: 10, life: 5, color: '#a855f7', symbol: '★', tracking: true, speed: 3.2, trackingAccel: 0.18 });
            }
        }
        else if (type === 'spiral') {
            const baseAngle = performance.now() / 300;
            for (let i = 0; i < 8; i++) {
                const angle = baseAngle + (i / 8) * Math.PI * 2;
                AD.bossBullets.push({ x: cx, y: cy, vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3, r: 7, life: 4, color: '#00f0ff', symbol: '○' });
            }
        }
        else if (type === 'random') {
            for (let i = 0; i < 10; i++) {
                const angle = rand(0, Math.PI * 2);
                const speed = rand(2.5, 4.5);
                AD.bossBullets.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: rand(6, 10), life: 4, color: '#ffcc00', symbol: '✦' });
            }
        }
        spawnParticles(cx, cy, b.phase >= 3 ? '#ff2e88' : '#ff8a00', 12);
    }

    function updateBossBullets(dt) {
        const p = AD.player;
        for (let i = AD.bossBullets.length - 1; i >= 0; i--) {
            const b = AD.bossBullets[i];
            if (b.tracking) {
                const dx = p.x + p.w / 2 - b.x;
                const dy = p.y + p.h / 2 - b.y;
                const dist = Math.hypot(dx, dy) || 1;
                b.vx += (dx / dist) * b.trackingAccel;
                b.vy += (dy / dist) * b.trackingAccel;
                const sp = Math.hypot(b.vx, b.vy);
                if (sp > b.speed) { b.vx = b.vx / sp * b.speed; b.vy = b.vy / sp * b.speed; }
            }
            b.x += b.vx * 60 * dt;
            b.y += b.vy * 60 * dt;
            b.life -= dt;
            if (p.invincible <= 0 && Math.hypot(p.x + p.w / 2 - b.x, p.y + p.h / 2 - b.y) < b.r + p.w / 2) {
                if (p.shieldActive) { p.shieldActive = false; p.shieldTime = 0; spawnParticles(p.x + p.w / 2, p.y + p.h / 2, '#00f0ff', 15); }
                else {
                    p.hp -= 10; updateHpBar();
                    spawnDamageText(p.x, p.y, '-10', '#ff2e88');
                    shakeScreen(10);
                    triggerSlowmo(0.8, true);
                    if (p.hp <= 0) { onPlayerDeath(); return; }
                }
                p.invincible = 60;
                spawnParticles(b.x, b.y, b.color, 12);
                AD.bossBullets.splice(i, 1);
                continue;
            }
            if (b.life <= 0) AD.bossBullets.splice(i, 1);
        }
    }

    function spawnCodeWave() {
        const b = AD.boss;
        const variants = [
            { code: `int a = 5;\nint b = 3;\nint c = a + b;`, answer: 8, opts: [8, 7, 9, 15], type: 'basic' },
            { code: `int x = 12;\nint y = 4;\nint z = x / y;`, answer: 3, opts: [3, 4, 8, 48], type: 'basic' },
            { code: `int n = 5;\nint r = 1;\nfor (i=1; i<=n; i++) r *= i;`, answer: 120, opts: [120, 24, 100, 625], type: 'multi' },
            { code: `int a = 10;\nint b = a++ + 2;`, answer: 12, opts: [12, 13, 11, 10], type: 'tracking' },
            { code: `int arr[3] = {7,3,9};\nint s = arr[0] + arr[2];`, answer: 16, opts: [16, 12, 10, 22], type: 'laser' },
            { code: `int s = 0;\nfor(int i=1;i<=4;i++) s+=i;`, answer: 10, opts: [10, 8, 12, 15], type: 'basic' }
        ];
        const allowed = variants.filter(v => b.waveVariants.includes(v.type));
        const pool = allowed.length ? allowed : variants;
        const q = pool[Math.floor(Math.random() * pool.length)];
        AD.shieldQuestion = q;
        const p = AD.player;
        const count = q.type === 'multi' ? 3 : q.type === 'laser' ? 2 : 1;
        for (let i = 0; i < count; i++) {
            const bx = b.x + rand(-40, 40), by = b.y + rand(-30, 30);
            AD.bullets.push({
                x: bx, y: by,
                vx: (p.x + p.w / 2 - bx) * 0.0018,
                vy: (p.y + p.h / 2 - by) * 0.0018,
                r: 16, life: 90, text: '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase(), color: '#ff2e88'
            });
        }
        triggerSlowmo(2.5, true);
        shakeScreen(6);
    }

    function openShieldPicker() {
        const q = AD.shieldQuestion; if (!q) return;
        const opts = [...q.opts].sort(() => Math.random() - 0.5).slice(0, 3);
        if (!opts.includes(q.answer)) opts[0] = q.answer;
        opts.sort(() => Math.random() - 0.5);
        AD.shieldOptions = opts; AD.shieldTimeLeft = 5;
        const ui = document.getElementById('advShieldUI');
        document.getElementById('advShieldCode').innerHTML = escapeHtml(q.code) + `\n<span class="blank">= ?</span>`;
        const optBox = document.getElementById('advShieldOptions');
        optBox.innerHTML = opts.map((o, i) => `
            <button class="adv-shield-opt" data-idx="${i}" data-key="[${i + 1}]">
                <span class="opt-value">${o}</span>
                <span class="opt-label">盾牌 ${String.fromCharCode(65 + i)}</span>
            </button>`).join('');
        optBox.querySelectorAll('.adv-shield-opt').forEach(btn => {
            btn.addEventListener('click', () => pickShield(Number(btn.dataset.idx)));
        });
        ui.classList.add('active');
    }

    function pickShield(idx) {
        if (!AD.shieldQuestion) return;
        const q = AD.shieldQuestion;
        const ui = document.getElementById('advShieldUI');
        const opts = AD.shieldOptions;
        ui.querySelectorAll('.adv-shield-opt').forEach(b => b.style.pointerEvents = 'none');
        let correct = false;
        if (idx >= 0 && opts[idx] === q.answer) {
            correct = true;
            ui.querySelector(`.adv-shield-opt[data-idx="${idx}"]`).classList.add('correct');
        } else {
            opts.forEach((v, i) => {
                const el = ui.querySelector(`.adv-shield-opt[data-idx="${i}"]`);
                if (v === q.answer) el.classList.add('correct');
                else if (i === idx) el.classList.add('wrong');
            });
        }
        if (correct) {
            AD.boss.hp -= 8; updateBossHpBar();
            spawnDamageText(AD.boss.x, AD.boss.y - 40, '-8', '#00ff88');
            spawnParticles(AD.boss.x, AD.boss.y, '#00ff88', 20);
            showBanner('✓ 完美防御！', '#00ff88');
            shakeScreen(4);
            Save.addCoins(3); AD.coins += 3;
            document.getElementById('advCoins').textContent = AD.coins;
            if (AD.boss.hp <= 0) { setTimeout(triggerBossVictory, 400); return; }
        } else {
            AD.bossNoDamage = false;
            const p = AD.player;
            if (p.shieldActive) { p.shieldActive = false; p.shieldTime = 0; showBanner('🛡️ 护盾抵挡', '#00f0ff'); }
            else {
                p.hp -= 12; updateHpBar();
                spawnDamageText(p.x, p.y, '-12', '#ff2e88');
                showBanner('✗ 光波命中！', '#ff2e88');
                shakeScreen(10);
                if (p.hp <= 0) { setTimeout(onPlayerDeath, 500); return; }
            }
        }
        setTimeout(() => {
            ui.classList.remove('active');
            AD.shieldQuestion = null; AD.shieldOptions = [];
            AD.bossState = 'expose-weakness'; AD.bossTimer = 0;
            spawnWeakness();
            showBanner('🎯 用枪射击弱点！', '#ffcc00');
            triggerSlowmo(4, true);
        }, 900);
    }

    function spawnWeakness() {
        const b = AD.boss;
        AD.weaknesses = [{
            id: ++AD.activeWeaknessId,
            x: b.x + rand(-60, 60), y: b.y + rand(-50, 20),
            r: 32, hp: 3, maxHp: 3, hit: false
        }];
    }

    function triggerBossVictory() {
        if (!AD.boss) return;
        AD.bossState = 'victory'; AD.bossTimer = 0;
        const bossId = AD.boss.id, bossName = AD.boss.name;
        const wasNoDamage = AD.bossNoDamage;
        const isFinal = AD.boss.isFinal, isTutorial = AD.boss.isTutorial;
        AD.bossBullets = []; AD.clones = []; AD.blackholes = [];
        hideBossHud();
        // ★ Boss 击败后，在房间右侧生成通往下一关的门
        if (AD.boss.nextDoor) {
            const doorX = AD.sceneData.width - 220;
            const doorY = 380;
            // 避免重复添加
            if (!AD.doors.some(d => d.isRewardDoor)) {
                AD.doors.push({
                    x: doorX, y: doorY, w: 60, h: 80,
                    to: AD.boss.nextDoor.to,
                    label: AD.boss.nextDoor.label,
                    isRewardDoor: true
                });
            }
            setTimeout(() => {
                showBanner('✨ 通往下一关的门已开启！', '#00ff88');
                spawnParticles(doorX + 30, doorY + 40, '#00ff88', 30);
            }, 1500);
        }
        triggerSlowmo(5, true);
        spawnParticles(AD.boss.x, AD.boss.y, '#ffcc00', 60);
        showAchievement(`⚔️ 击败 ${bossName}`, 'BOSS 已倒下');
        Save.defeatBoss(bossId);
        if (wasNoDamage) {
            if (!Save.data.defeatedNoDamage.includes(bossId)) {
                Save.data.defeatedNoDamage.push(bossId);
                Save.save({});
            }
        }
        const reward = isTutorial ? 30 : 50;
        Save.addCoins(reward); AD.coins += reward;
        AD.runCoins += reward;
        document.getElementById('advCoins').textContent = AD.coins;
        showBanner(`🏆 BOSS 已倒下！+${reward} 金币`, '#ffcc00');
        checkAchievements();
        if (isFinal) setTimeout(showEndingChoice, 2000);
        else if (isTutorial) setTimeout(() => showBanner('🎉 新手村毕业！去森林冒险吧', '#00f0ff'), 2000);
    }

    function onPlayerDeath() {
        // ★ 清除慢动作
        AD.slowmoTimer = 0;
        AD.timeScale = 1;
        document.getElementById('advSlowmo').classList.remove('active');
        document.getElementById('advSlowmo').classList.remove('strong');

        if ((Save.data.upgradeStats.reviveCount || 0) > 0) {
            Save.data.upgradeStats.reviveCount--;
            Save.save({});
            AD.player.hp = AD.player.maxHp;
            updateHpBar();
            showBanner('💎 复活石生效！', '#00f0ff');
            spawnParticles(AD.player.x + AD.player.w / 2, AD.player.y + AD.player.h / 2, '#00f0ff', 30);
            AD.player.invincible = 120;
            return;
        }
        showBanner('💀 你被击倒了，返回存档点…', '#ff2e88');

        // ★ 检查存档点
        const cp = AD.checkpoint;
        if (cp && cp.scene === AD.scene) {
            setTimeout(() => {
                // 重置 Boss 状态
                const data = SCENES[AD.scene];
                AD.boss = null; AD.bossState = 'idle'; AD.bossTriggered = false;
                AD.bossBullets = []; AD.clones = []; AD.blackholes = []; AD.weaknesses = [];
                AD.player.hp = AD.player.maxHp;
                AD.player.x = cp.x;
                AD.player.y = cp.y;
                AD.player.vx = 0; AD.player.vy = 0;
                updateHpBar();
                if (data) {
                    data.gadgets = JSON.parse(JSON.stringify(data.gadgets || []));
                    AD.gadgets = data.gadgets;
                    data.coins = (data.coins || []).map(c => ({ ...c, collected: false }));
                }
                hideBossHud();
            }, 900);
        } else {
            // 无存档点，回到村庄
            setTimeout(() => loadScene('village'), 1200);
        }
    }

    function showEndingChoice() {
        AD.choiceActive = true;
        const modal = $('#advChoiceModal');
        modal.innerHTML = `
            <div class="adv-choice-panel">
                <div class="adv-choice-title">⚔️ 最后的选择</div>
                <div class="adv-choice-desc">代码暴君已经倒下。你能感受到它体内残留的<b>纯净代码之力</b>。<br>现在，你要如何处置这份力量？</div>
                <div class="adv-choice-options">
                    <button class="adv-choice-opt purify" data-choice="purify">
                        <div class="adv-choice-ico">🌅</div>
                        <div class="adv-choice-name">净化</div>
                        <div class="adv-choice-desc">用代码之力驱散所有 Bug。</div>
                        <div class="adv-choice-key">按 1 选择</div>
                    </button>
                    <button class="adv-choice-opt seize" data-choice="seize">
                        <div class="adv-choice-ico">🌑</div>
                        <div class="adv-choice-name">夺取</div>
                        <div class="adv-choice-desc">吸收暴君之力，成为新统治者。</div>
                        <div class="adv-choice-key">按 2 选择</div>
                    </button>
                    <button class="adv-choice-opt peace" data-choice="peace">
                        <div class="adv-choice-ico">⭐</div>
                        <div class="adv-choice-name">和解</div>
                        <div class="adv-choice-desc">理解暴君的苦衷，建立新秩序。</div>
                        <div class="adv-choice-key">按 3 选择</div>
                    </button>
                </div>
            </div>`;
        modal.classList.add('active');
        modal.querySelectorAll('.adv-choice-opt').forEach(btn => {
            btn.addEventListener('click', () => chooseEnding(btn.dataset.choice));
        });
    }
    function chooseEnding(choice) {
        if (!AD.choiceActive) return;
        AD.choiceActive = false;
        $('#advChoiceModal').classList.remove('active');
        Save.save({ ending: choice });
        checkAchievements();
        const endings = {
            purify: { icon: '🌅', title: '光明结局', desc: '你净化了代码王国。Bug 病毒消散，万物复苏。\n你成为传说中的代码守护者。', color: '#00ff88' },
            seize:  { icon: '🌑', title: '黑暗结局', desc: '你夺取了暴君之力。代码王国迎来新的君主。\n历史将记住你的名字，但不是以"勇者"的方式。', color: '#ff2e88' },
            peace:  { icon: '⭐', title: '真结局 · 和解', desc: '你与暴君的残魂达成和解。原来它也曾是勇者。\n你们共同建立了新的代码秩序。', color: '#ffcc00' }
        };
        const e = endings[choice];
        showBanner(`${e.icon} ${e.title}`, e.color);
        const modal = $('#advChoiceModal');
        modal.innerHTML = `
            <div class="adv-choice-panel">
                <div class="adv-choice-ico-big">${e.icon}</div>
                <div class="adv-choice-title">${e.title}</div>
                <div class="adv-choice-desc" style="white-space:pre-line">${e.desc}</div>
                <button class="adv-tutorial-close" onclick="Adventure.exit()">返回大厅</button>
            </div>`;
        modal.classList.add('active');
    }

    function triggerSlowmo(duration, strong) {
        AD.slowmoTimer = duration;
        AD.timeScale = 0.25;
        const el = document.getElementById('advSlowmo');
        el.classList.add('active');
        if (strong) el.classList.add('strong');
    }
    function shakeScreen(intensity) { AD._shake = intensity; }
    function spawnParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            AD.particles.push({ x, y, vx: rand(-3, 3), vy: rand(-5, -1), color, life: 40, maxLife: 40, size: rand(2, 5) });
        }
    }
    function spawnDamageText(x, y, text, color) { AD.damageTexts.push({ x, y, text, color, life: 60, vy: -1 }); }

    /* ============================================================
       商店
       ============================================================ */
    function openShop() {
        let panel = document.getElementById('advShopModal');
        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'adv-shop'; panel.id = 'advShopModal';
            document.getElementById('advWrapper').appendChild(panel);
        }
        const mode = AD.sceneData.shopMode || 'upgrade';
        renderShop(panel, mode === 'skill' ? 'skills' : 'upgrades');
        panel.classList.add('active');
    }
    function renderShop(panel, tab) {
        const sceneShopMode = AD.sceneData.shopMode || 'upgrade';
        const isSkillShop = sceneShopMode === 'skill';
        const coins = Save.data.coins;
        const tabs = isSkillShop
            ? [{ id: 'skills', label: '⚡ 技能' }, { id: 'items', label: '🧪 道具' }]
            : [{ id: 'upgrades', label: '🔧 强化' }, { id: 'items', label: '🧪 道具' }];
        if (!tabs.find(t => t.id === tab)) tab = tabs[0].id;

        let contentHtml = '';
        if (tab === 'skills') {
            contentHtml = Object.values(SKILLS).map(s => {
                const has = Save.hasSkill(s.id);
                const canAfford = coins >= s.cost;
                return `<div class="adv-shop-item ${has ? 'owned' : ''}">
                    <div class="adv-shop-ico">${s.icon}</div>
                    <div class="adv-shop-info"><h4>${s.name} ${has ? '<span class="badge">已拥有</span>' : ''}</h4><p>${s.desc}</p></div>
                    <button class="adv-shop-buy ${has ? 'owned' : ''}" data-buy="skill:${s.id}" data-cost="${s.cost}" ${has ? 'disabled' : (canAfford ? '' : 'disabled')}>${has ? '✓ 已拥有' : `🪙 ${s.cost}`}</button>
                </div>`;
            }).join('');
        } else if (tab === 'upgrades') {
            contentHtml = Object.values(UPGRADES).map(u => {
                const has = Save.hasUpgrade(u.id);
                const canAfford = coins >= u.cost;
                return `<div class="adv-shop-item ${has ? 'owned' : ''}">
                    <div class="adv-shop-ico">${u.icon}</div>
                    <div class="adv-shop-info"><h4>${u.name} ${has ? '<span class="badge">已拥有</span>' : ''}</h4><p>${u.desc}</p></div>
                    <button class="adv-shop-buy ${has ? 'owned' : ''}" data-buy="upgrade:${u.id}" data-cost="${u.cost}" ${has ? 'disabled' : (canAfford ? '' : 'disabled')}>${has ? '✓ 已拥有' : `🪙 ${u.cost}`}</button>
                </div>`;
            }).join('');
        } else if (tab === 'items') {
            contentHtml = Object.values(ITEMS).map(it => {
                const canAfford = coins >= it.cost;
                return `<div class="adv-shop-item">
                    <div class="adv-shop-ico">${it.icon}</div>
                    <div class="adv-shop-info"><h4>${it.name}</h4><p>${it.desc}</p></div>
                    <button class="adv-shop-buy" data-buy="item:${it.id}" data-cost="${it.cost}" ${canAfford ? '' : 'disabled'}>🪙 ${it.cost}</button>
                </div>`;
            }).join('');
        }

        panel.innerHTML = `
            <div class="adv-shop-panel">
                <div class="adv-shop-header">
                    <div class="adv-shop-title">神秘商店</div>
                    <div class="adv-shop-coins">🪙 ${coins}</div>
                </div>
                <div class="adv-shop-tabs">
                    ${tabs.map(t => `<button class="adv-shop-tab ${tab === t.id ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
                </div>
                <div class="adv-shop-list">${contentHtml}</div>
                <button class="adv-shop-close" id="advShopClose">关闭商店</button>
            </div>`;
        panel.querySelectorAll('.adv-shop-tab').forEach(t => {
            t.addEventListener('click', () => renderShop(panel, t.dataset.tab));
        });
        panel.querySelectorAll('.adv-shop-buy').forEach(b => {
            b.addEventListener('click', () => {
                const [kind, id] = b.dataset.buy.split(':');
                buyItem(kind, id, Number(b.dataset.cost));
                renderShop(panel, tab);
            });
        });
        panel.querySelector('#advShopClose').addEventListener('click', () => panel.classList.remove('active'));
    }
    function buyItem(kind, id, cost) {
        if (Save.data.coins < cost) { showBanner('🪙 金币不足', '#ff2e88'); return; }
        if (kind === 'skill') {
            if (Save.hasSkill(id)) return;
            Save.addCoins(-cost); Save.addSkill(id);
            AD.coins = Save.data.coins;
            document.getElementById('advCoins').textContent = AD.coins;
            updateSkillBar();
            if (id === 'doubleJump') AD.player.maxJumps = 2;
            showAchievement('⚡ 解锁技能', SKILLS[id].name);
            checkAchievements();
        } else if (kind === 'upgrade') {
            if (Save.hasUpgrade(id)) return;
            const u = UPGRADES[id];
            Save.addCoins(-cost); Save.addUpgrade(id);
            AD.coins = Save.data.coins;
            document.getElementById('advCoins').textContent = AD.coins;
            u.effect(Save.data.upgradeStats);
            Save.save({});
            if (id === 'maxHp') {
                AD.player.maxHp = 100 + Save.data.upgradeStats.maxHpBonus;
                AD.player.hp = Math.min(AD.player.hp + 20, AD.player.maxHp);
                updateHpBar();
            }
            showAchievement('🔧 强化道具', u.name);
            checkAchievements();
        } else if (kind === 'item') {
            if (id === 'potion') {
                Save.addCoins(-cost); AD.coins = Save.data.coins;
                document.getElementById('advCoins').textContent = AD.coins;
                AD.player.hp = Math.min(AD.player.maxHp, AD.player.hp + 50);
                updateHpBar(); showBanner('🧪 已恢复 50 HP', '#00ff88');
            } else if (id === 'bigPotion') {
                Save.addCoins(-cost); AD.coins = Save.data.coins;
                document.getElementById('advCoins').textContent = AD.coins;
                AD.player.hp = AD.player.maxHp;
                updateHpBar(); showBanner('💊 已满血恢复', '#00ff88');
            } else if (id === 'key') {
                Save.addCoins(-cost); AD.keys++;
                Save.save({ keys: AD.keys });
                document.getElementById('advKeys').textContent = AD.keys;
                showBanner('🔑 获得钥匙 +1', '#ffcc00');
            } else if (id === 'revive') {
                Save.addCoins(-cost);
                Save.data.upgradeStats.reviveCount = (Save.data.upgradeStats.reviveCount || 0) + 1;
                Save.save({});
                AD.coins = Save.data.coins;
                document.getElementById('advCoins').textContent = AD.coins;
                showBanner('💎 复活石 +1', '#00f0ff');
            }
        }
    }

    /* ============================================================
       主循环
       ============================================================ */
    function loop(now) {
        if (!AD.active) return;
        const dtRaw = Math.min((now - AD.lastTime) / 1000, 0.05);
        AD.lastTime = now;
        if (AD.slowmoTimer > 0) {
            AD.slowmoTimer -= dtRaw;
            if (AD.slowmoTimer <= 0) {
                AD.timeScale = 1;
                const el = document.getElementById('advSlowmo');
                el.classList.remove('active'); el.classList.remove('strong');
            }
        }
        const dt = dtRaw * AD.timeScale;
        if (AD.tutorialActive || AD.choiceActive || AD.quizActive) {
            render();
            requestAnimationFrame(loop);
            return;
        }
        update(dt, dtRaw);
        render();
        requestAnimationFrame(loop);
    }

    /* ============================================================
       更新
       ============================================================ */
    function update(dt, rawDt) {
        if (AD.dialog) return;
        const p = AD.player;
        const data = AD.sceneData;
        const keys = AD.keysPressed;

        // 枪口追踪
        updateGunAim();
        if (p.gunCooldown > 0) p.gunCooldown--;
        if (p.shootAnimTimer > 0) p.shootAnimTimer--;

        // ★ 弹药自动恢复（每 0.9 秒 +1）
        if (p.ammo < p.maxAmmo) {
            p.ammoRegenTimer = (p.ammoRegenTimer || 0) + dt;
            if (p.ammoRegenTimer >= 0.9) {
                p.ammoRegenTimer -= 0.9;
                p.ammo++;
            }
        } else {
            p.ammoRegenTimer = 0;
        }
        // 鼠标按住左键连射
        if (AD.mouse.leftDown) shoot();
        if (p.stunned > 0) {
            p.stunned -= dt;
            p.vx *= 0.5;
            p.vy += 0.7 * 60 * dt;
        } else {
            // 移动
            if (keys['KeyA'] || keys['ArrowLeft']) { p.vx = -p.speed; }
            else if (keys['KeyD'] || keys['ArrowRight']) { p.vx = p.speed; }
            else p.vx *= 0.78;
        }

        // 冲刺
        if (p.dashCooldown > 0) p.dashCooldown--;
        if (p.dashing > 0) { p.vx = (p.facing) * 16; p.dashing--; }

        // 跳跃
        const jumpPressed = keys['Space'] || keys['KeyW'] || keys['ArrowUp'];
        const doubleJumpPressed = keys['ShiftLeft'] || keys['ShiftRight'];
        if (jumpPressed && p.onGround && p.stunned <= 0) { p.vy = p.jumpPower; p.onGround = false; p.jumpCount = 1; }
        else if (doubleJumpPressed && !p.onGround && p.jumpCount < p.maxJumps && Save.hasSkill('doubleJump')) {
            p.vy = p.jumpPower * 0.9; p.jumpCount++;
            spawnParticles(p.x + p.w / 2, p.y + p.h, '#00f0ff', 8);
        }

        p.vy += 0.7 * 60 * dt;
        if (p.vy > 20) p.vy = 20;
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.x = clamp(p.x, 0, data.width - p.w);
        if (p.teleportCooldown > 0) p.teleportCooldown--;

        // 平台碰撞
        p.onGround = false;
        for (const plat of data.platforms) {
            if (p.x < plat.x + plat.w && p.x + p.w > plat.x &&
                p.y < plat.y + plat.h && p.y + p.h > plat.y) {
                if (p.vy > 0 && p.y + p.h - p.vy * 60 * dt <= plat.y + 8) {
                    p.y = plat.y - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0;
                } else if (p.vy < 0 && p.y - p.vy * 60 * dt >= plat.y + plat.h - 8) {
                    p.y = plat.y + plat.h; p.vy = 0;
                }
            }
        }

        if (p.y > 700) { onPlayerDeath(); return; }

        // ★ 检查存档点
        if (data.checkpoint && !data.checkpoint.active) {
            if (Math.abs(p.x + p.w / 2 - data.checkpoint.x) < 80 &&
                Math.abs(p.y + p.h - data.checkpoint.y) < 100) {
                data.checkpoint.active = true;
                AD.checkpoint = { scene: AD.scene, x: data.checkpoint.x, y: data.checkpoint.y - 40 };
                showBanner('💾 存档点已激活', '#00ff88');
                spawnParticles(data.checkpoint.x, data.checkpoint.y, '#00ff88', 20);
                if (!hasSeenTutorial('checkpoint')) showTutorial('checkpoint');
            }
        }

        // ★ 检查 Boss 触发线
        if (data.boss && !AD.bossTriggered && data.boss.triggerX != null) {
            if (p.x >= data.boss.triggerX) {
                startBossFight();
            }
        }

        updateGadgets(dt);
        updateMemoryLeak(dt);
        updateMissiles(dt);
        updateBossBullets(dt);
        updatePlayerBullets(dt);
        updateBossExtraSkills(dt);

        if (p.invincible > 0) p.invincible--;
        if (p.shieldCooldown > 0) p.shieldCooldown--;
        if (p.shieldTime > 0) { p.shieldTime--; if (p.shieldTime <= 0) p.shieldActive = false; }

        p.animTimer += 60 * dt;
        if (p.animTimer > 8) { p.animTimer = 0; p.animFrame = (p.animFrame + 1) % 4; }

        AD.camera.x = clamp(p.x + p.w / 2 - AD.canvas.width / 2, 0, data.width - AD.canvas.width);

        // 金币
        if (data.coins) {
            const magnetRange = (Save.hasSkill('magnet') ? 200 : 100) * (Save.data.upgradeStats.magnetMul || 1);
            for (const coin of data.coins) {
                if (coin.collected) continue;
                const dx = p.x + p.w / 2 - coin.x, dy = p.y + p.h / 2 - coin.y;
                const dist = Math.hypot(dx, dy);
                if (dist < magnetRange) { coin.x += dx * 0.15; coin.y += dy * 0.15; }
                if (dist < 24) {
                    coin.collected = true;
                    AD.coins++; AD.runCoins++;
                    Save.addCoins(1);
                    document.getElementById('advCoins').textContent = AD.coins;
                    spawnParticles(coin.x, coin.y, '#ffcc00', 8);
                    checkAchievements();
                }
            }
        }

        // 粒子
        for (let i = AD.particles.length - 1; i >= 0; i--) {
            const pt = AD.particles[i];
            pt.x += pt.vx * 60 * dt; pt.y += pt.vy * 60 * dt;
            pt.vy += 0.3 * 60 * dt;
            pt.life -= 60 * dt;
            if (pt.life <= 0) AD.particles.splice(i, 1);
        }
        for (let i = AD.damageTexts.length - 1; i >= 0; i--) {
            const t = AD.damageTexts[i];
            t.y += t.vy * 60 * dt; t.life -= 60 * dt;
            if (t.life <= 0) AD.damageTexts.splice(i, 1);
        }
        for (let i = AD.bullets.length - 1; i >= 0; i--) {
            const b = AD.bullets[i];
            b.x += b.vx * 60 * dt; b.y += b.vy * 60 * dt;
            b.life -= 60 * dt;
            if (b.life <= 0) AD.bullets.splice(i, 1);
        }

        if (AD.boss && !AD.dialog) updateBoss(rawDt);
    }

    /* ============================================================
       机关逻辑
       ============================================================ */
    function updateGadgets(dt) {
        const p = AD.player;
        const t = performance.now() / 1000;

        for (const g of AD.gadgets) {
            checkTutorial(g);

            /* ★ 变量平台（悬崖版） */
            if (g.type === 'variable-platform') {
                // 只有稳定后才有碰撞
                if (g.stable) {
                    if (p.x < g.x + g.w && p.x + p.w > g.x &&
                        p.y < g.y + 10 && p.y + p.h > g.y) {
                        if (p.vy > 0 && p.y + p.h - p.vy * 60 * dt <= g.y + 6) {
                            p.y = g.y - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0;
                        }
                    }
                } else {
                    // 检测玩家是否踩到（用整个身体碰撞，脚下必须在其上方 8 像素）
                    const onIt = p.x + p.w > g.x && p.x < g.x + g.w &&
                                 p.y + p.h > g.y - 6 && p.y + p.h < g.y + 12 && p.vy >= 0;
                    if (onIt && !g._wasOn) {
                        g.counter++;
                        spawnParticles(g.x + g.w / 2, g.y - 10, '#ffcc00', 8);
                        // 临时弹起，让玩家能再次落下
                        p.vy = -8;
                        if (g.counter >= g.target) {
                            g.stable = true;
                            if (!g.rewarded) {
                                g.rewarded = true;
                                const r = g.reward || 8;
                                AD.coins += r; Save.addCoins(r);
                                document.getElementById('advCoins').textContent = AD.coins;
                                showBanner(`✓ 变量解锁！+${r} 金币`, '#00ff88');
                                spawnParticles(g.x + g.w / 2, g.y, '#00ff88', 20);
                            }
                        } else {
                            showBanner(`counter = ${g.counter} / ${g.target}（跳下再上）`, '#ffcc00');
                        }
                    }
                    g._wasOn = onIt;
                }
            }
            /* 地刺 */
            else if (g.type === 'loop-spikes') {
                const phase = (t / g.period + g.phase) % 1;
                g.currentY = g.y + Math.sin(phase * Math.PI * 2) * g.amplitude;
                if (p.x + p.w > g.x && p.x < g.x + g.w &&
                    p.y + p.h > g.currentY - 20 && p.y < g.currentY + g.h) {
                    if (p.invincible <= 0) {
                        if (p.shieldActive) { p.shieldActive = false; p.shieldTime = 0; }
                        else {
                            p.hp -= g.dmg; updateHpBar();
                            spawnDamageText(p.x, p.y, '-' + g.dmg, '#ff2e88');
                            shakeScreen(8);
                        }
                        p.invincible = Math.round(60 * (Save.data.upgradeStats.invinMul || 1));
                        if (p.hp <= 0) { onPlayerDeath(); return; }
                    }
                }
            }
            /* 传送门 */
            else if (g.type === 'pointer-teleport') {
                if (g.cooldown > 0) { g.cooldown--; continue; }
                if (p.x + p.w > g.x - 20 && p.x < g.x + 40 &&
                    p.y + p.h > g.y - 60 && p.y < g.y + 60) {
                    p.x = g.toX; p.y = g.toY;
                    g.cooldown = 120; p.teleportCooldown = 60;
                    spawnParticles(g.toX, g.toY, '#a855f7', 20);
                    showBanner('🌀 ' + g.label, '#a855f7');
                    shakeScreen(6);
                }
            }
            /* ★ 数组平台（必须按顺序，未激活的虚化不能踩） */
            else if (g.type === 'array-platforms') {
                if (g.completed) {
                    // 完成后全部实体
                    g.items.forEach(it => {
                        if (p.x < it.x + it.w && p.x + p.w > it.x &&
                            p.y < it.y + 10 && p.y + p.h > it.y) {
                            if (p.vy > 0 && p.y + p.h - p.vy * 60 * dt <= it.y + 6) {
                                p.y = it.y - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0;
                            }
                        }
                    });
                    continue;
                }
                const curIdx = g.currentProgress;
                g.items.forEach((it) => {
                    const isNext = it.order === curIdx;
                    const isDone = it.order < curIdx;
                    // 只有已完成的平台才有碰撞
                    if (isDone) {
                        if (p.x < it.x + it.w && p.x + p.w > it.x &&
                            p.y < it.y + 10 && p.y + p.h > it.y) {
                            if (p.vy > 0 && p.y + p.h - p.vy * 60 * dt <= it.y + 6) {
                                p.y = it.y - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0;
                            }
                        }
                    }
                    // 检测踩到
                    const onIt = p.x + p.w > it.x && p.x < it.x + it.w &&
                                 p.y + p.h > it.y - 6 && p.y + p.h < it.y + 12 && p.vy >= 0;
                    if (onIt && !it._stood) {
                        it._stood = true;
                        if (it.order === curIdx) {
                            // 正确顺序
                            g.currentProgress++;
                            spawnParticles(it.x + it.w / 2, it.y, '#00ff88', 12);
                            if (g.currentProgress >= g.items.length) {
                                g.completed = true;
                                if (!g.rewarded) {
                                    g.rewarded = true;
                                    const r = g.reward || 10;
                                    AD.coins += r; Save.addCoins(r);
                                    document.getElementById('advCoins').textContent = AD.coins;
                                    showBanner(`✓ 数组遍历完成！+${r} 金币`, '#00ff88');
                                }
                            }
                        } else if (it.order > curIdx) {
                            // 踩错，全部重置
                            g.currentProgress = 0;
                            g.items.forEach(o => o._stood = false);
                            showBanner('✗ 数组越界，全部重置！', '#ff2e88');
                            shakeScreen(10);
                            // 玩家弹回起点（可选：临时击退）
                            p.vy = -5;
                        }
                    }
                    if (!onIt) it._stood = false;
                });
            }
            /* 内存池 */
            else if (g.type === 'memory-pool') {
                const onIt = p.x + p.w > g.x && p.x < g.x + g.w &&
                             p.y + p.h > g.y - 4 && p.y + p.h < g.y + 12 && p.vy >= 0;
                if (onIt) {
                    if (p.vy > 0) { p.y = g.y - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0; }
                    g._healAcc = (g._healAcc || 0) + dt;
                    g._costAcc = (g._costAcc || 0) + dt;
                    if (g._healAcc > 1) {
                        g._healAcc = 0;
                        if (p.hp < p.maxHp) {
                            p.hp = Math.min(p.maxHp, p.hp + Math.round(g.rate * 2));
                            updateHpBar();
                            spawnDamageText(p.x, p.y - 10, '+' + Math.round(g.rate * 2), '#00ff88');
                        }
                    }
                    if (g._costAcc > 2 && AD.coins > 0) {
                        g._costAcc = 0;
                        AD.coins--; Save.addCoins(-1);
                        document.getElementById('advCoins').textContent = AD.coins;
                    }
                } else { g._healAcc = 0; g._costAcc = 0; }
            }
            /* 条件门 */
            else if (g.type === 'conditional-gate') {
                if (!g.opened && AD.keys >= g.requiresKeys) {
                    g.opened = true;
                    showBanner('✓ ' + g.label + ' 通过', '#00ff88');
                    spawnParticles(g.x + g.w / 2, g.y + g.h / 2, '#00ff88', 20);
                }
                if (!g.opened) {
                    if (p.x + p.w > g.x && p.x < g.x + g.w &&
                        p.y + p.h > g.y && p.y < g.y + g.h) {
                        if (p.x + p.w / 2 < g.x + g.w / 2) p.x = g.x - p.w;
                        else p.x = g.x + g.w;
                    }
                }
            }
            /* switch 平台 */
            else if (g.type === 'switch-platform') {
                const target = g.active ? g.targetY : g.closedY;
                g.current += (target - g.current) * 0.12;
                if (p.x < g.x + g.w && p.x + p.w > g.x &&
                    p.y < g.current + 10 && p.y + p.h > g.current) {
                    if (p.vy > 0 && p.y + p.h - p.vy * 60 * dt <= g.current + 6) {
                        p.y = g.current - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0;
                    }
                }
            }
            /* 递归陷阱 */
            else if (g.type === 'recursive-trap') {
                const first = g.platforms[0];
                const onFirst = p.x + p.w > first.x && p.x < first.x + first.w &&
                                p.y + p.h >= first.y - 4 && p.y + p.h <= first.y + 20 && p.vy >= 0;
                if (onFirst && !g.triggered) { g.triggered = true; g.currentIdx = 0; }
                if (g.triggered) {
                    const cur = g.platforms[g.currentIdx];
                    if (cur) {
                        cur._disappearAcc = (cur._disappearAcc || 0) + dt;
                        if (cur._disappearAcc > 0.6) cur._gone = true;
                    }
                    for (let i = g.currentIdx; i < g.platforms.length; i++) {
                        const pl = g.platforms[i];
                        if (pl._gone) continue;
                        if (p.x + p.w > pl.x && p.x < pl.x + pl.w &&
                            p.y + p.h >= pl.y - 4 && p.y + p.h <= pl.y + 20 && p.vy >= 0) {
                            if (i > g.currentIdx) g.currentIdx = i;
                            if (p.vy > 0) { p.y = pl.y - p.h; p.vy = 0; p.onGround = true; p.jumpCount = 0; }
                        }
                    }
                    if (g.currentIdx >= g.platforms.length - 1 && !g._done) {
                        g._done = true;
                        showBanner('✓ 递归终止条件达成', '#00ff88');
                        Save.addCoins(10); AD.coins += 10;
                        document.getElementById('advCoins').textContent = AD.coins;
                    }
                }
            }
            /* 追踪导弹 */
            else if (g.type === 'pointer-missile') {
                if (!g.active && Math.abs(p.x - g.x) < 300) g.active = true;
                if (g.active) {
                    g.cooldown = (g.cooldown || 0) - dt;
                    if (g.cooldown <= 0 && AD.missiles.length < 4) {
                        AD.missiles.push({ x: g.x, y: g.y, vx: 0, vy: 0, speed: 2.6, life: 3.0, maxLife: 3.0, dmg: 8 });
                        g.cooldown = 1.6;
                    }
                }
            }
            /* 激光 */
            else if (g.type === 'laser-sweep') {
                g.stateTimer = (g.stateTimer || 0) + dt;
                if (g.state === 'warning') {
                    if (g.stateTimer > g.warningTime) {
                        g.state = 'firing'; g.stateTimer = 0;
                        const phase = Math.random();
                        g.targetY = g.y + phase * g.range - g.range / 2 + 150;
                        shakeScreen(4);
                    }
                } else if (g.state === 'firing') {
                    g.currentY = g.targetY;
                    if (p.x + p.w > g.x - 8 && p.x < g.x + g.w + 8 &&
                        p.y + p.h > g.currentY - 30 && p.y < g.currentY + 30) {
                        if (p.invincible <= 0) {
                            if (p.shieldActive) { p.shieldActive = false; p.shieldTime = 0; }
                            else {
                                p.hp -= g.dmg; updateHpBar();
                                spawnDamageText(p.x, p.y, '-' + g.dmg, '#ff2e88');
                                shakeScreen(10);
                                Save.data.laserHits = (Save.data.laserHits || 0) + 1;
                                Save.save({});
                                if (p.hp <= 0) { onPlayerDeath(); return; }
                            }
                            p.invincible = Math.round(60 * (Save.data.upgradeStats.invinMul || 1));
                        }
                    }
                    if (g.stateTimer > g.firingTime) { g.state = 'cooldown'; g.stateTimer = 0; }
                } else if (g.state === 'cooldown') {
                    if (g.stateTimer > g.cooldownTime) { g.state = 'warning'; g.stateTimer = 0; }
                }
            }
        }
    }

    function checkTutorial(g) {
        if (AD.tutorialActive || AD.quizActive) return;
        const p = AD.player;
        const dx = Math.abs(p.x + p.w / 2 - (g.x + (g.w || 60) / 2));
        const triggerDist = Math.max(200, (g.w || 100) + 100);
        if (dx < triggerDist) {
            if (!hasSeenTutorial(g.type)) showTutorial(g.type);
        }
    }

    function updateMemoryLeak(dt) {
        const p = AD.player;
        for (const g of AD.gadgets) {
            if (g.type !== 'memory-leak') continue;
            if (p.x + p.w > g.x && p.x < g.x + g.w &&
                p.y + p.h > g.y && p.y < g.y + g.h) {
                g._dmgAcc = (g._dmgAcc || 0) + dt * g.dps;
                if (g._dmgAcc >= 1) {
                    const dmg = Math.floor(g._dmgAcc);
                    g._dmgAcc -= dmg;
                    if (p.invincible <= 0) {
                        p.hp -= dmg; updateHpBar();
                        spawnDamageText(p.x, p.y - 10, '-' + dmg, '#a855f7');
                        if (p.hp <= 0) { onPlayerDeath(); return; }
                    }
                }
            }
        }
    }

    function updateMissiles(dt) {
        const p = AD.player;
        for (let i = AD.missiles.length - 1; i >= 0; i--) {
            const m = AD.missiles[i];
            const dx = p.x + p.w / 2 - m.x, dy = p.y + p.h / 2 - m.y;
            const dist = Math.hypot(dx, dy) || 1;
            const accel = 0.35 * dt * 60;
            m.vx += (dx / dist) * accel; m.vy += (dy / dist) * accel;
            const speed = Math.hypot(m.vx, m.vy);
            if (speed > m.speed) { m.vx = m.vx / speed * m.speed; m.vy = m.vy / speed * m.speed; }
            m.x += m.vx * 60 * dt; m.y += m.vy * 60 * dt;
            m.life -= dt;
            if (Math.hypot(p.x + p.w / 2 - m.x, p.y + p.h / 2 - m.y) < p.w) {
                if (p.invincible <= 0) {
                    if (p.shieldActive) { p.shieldActive = false; p.shieldTime = 0; }
                    else {
                        p.hp -= m.dmg; updateHpBar();
                        spawnDamageText(p.x, p.y, '-' + m.dmg, '#ff2e88');
                        shakeScreen(6);
                        if (p.hp <= 0) { onPlayerDeath(); return; }
                    }
                    p.invincible = Math.round(60 * (Save.data.upgradeStats.invinMul || 1));
                }
                spawnParticles(m.x, m.y, '#ff2e88', 15);
                AD.missiles.splice(i, 1);
                continue;
            }
            if (m.life <= 0) { spawnParticles(m.x, m.y, '#a855f7', 12); AD.missiles.splice(i, 1); }
        }
    }

    /* ============================================================
       渲染
       ============================================================ */
    function render() {
        const ctx = AD.ctx;
        const canvas = AD.canvas;
        const data = AD.sceneData;
        const p = AD.player;
        const t = performance.now() / 1000;

        let shakeX = 0, shakeY = 0;
        if (AD._shake > 0) {
            shakeX = (Math.random() - 0.5) * AD._shake;
            shakeY = (Math.random() - 0.5) * AD._shake;
            AD._shake *= 0.85;
            if (AD._shake < 0.5) AD._shake = 0;
        }

        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, data.bgColor1);
        bgGrad.addColorStop(1, data.bgColor2);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (AD._bgImageLoaded) {
            ctx.globalAlpha = 0.45;
            ctx.drawImage(AD._bgImageLoaded, -AD.camera.x * 0.4, 0, data.width, canvas.height);
            ctx.globalAlpha = 1;
        }

        ctx.save();
        ctx.translate(-AD.camera.x + shakeX, shakeY);

        // 平台
        for (const plat of data.platforms) {
            ctx.fillStyle = data.groundColor;
            ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
            ctx.fillStyle = 'rgba(0,240,255,0.15)';
            ctx.fillRect(plat.x, plat.y, plat.w, 3);
        }

        // 机关
        for (const g of AD.gadgets) renderGadget(ctx, g, t);

        // 存档点
        if (data.checkpoint) {
            const cp = data.checkpoint;
            const pulse = Math.sin(t * 4) * 0.5 + 0.5;
            const active = cp.active;
            ctx.fillStyle = active ? `rgba(0,255,136,${0.3 + pulse * 0.3})` : `rgba(100,210,255,${0.3 + pulse * 0.3})`;
            ctx.fillRect(cp.x - 15, cp.y - 80, 30, 80);
            ctx.strokeStyle = active ? '#00ff88' : '#64d2ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(cp.x - 15, cp.y - 80, 30, 80);
            ctx.fillStyle = active ? '#00ff88' : '#64d2ff';
            ctx.font = 'bold 12px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(active ? '💾 已激活' : '💾 存档点', cp.x, cp.y - 90);
            // 顶部光柱
            ctx.fillStyle = active ? `rgba(0,255,136,${0.1 + pulse * 0.15})` : `rgba(100,210,255,${0.1 + pulse * 0.15})`;
            ctx.fillRect(cp.x - 15, 0, 30, cp.y - 80);
        }

        // Boss 触发线
        if (data.boss && !AD.bossTriggered) {
            const tx = data.boss.triggerX;
            if (Math.abs(p.x - tx) < 600) {
                const pulse = Math.sin(t * 4) * 0.5 + 0.5;
                ctx.strokeStyle = `rgba(255,46,136,${0.3 + pulse * 0.4})`;
                ctx.lineWidth = 3;
                ctx.setLineDash([12, 8]);
                ctx.beginPath();
                ctx.moveTo(tx, 0); ctx.lineTo(tx, canvas.height);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = `rgba(255,46,136,${0.6 + pulse * 0.4})`;
                ctx.font = 'bold 16px JetBrains Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillText('⚠ BOSS 房入口', tx, 60);
            }
        }

        // 门
        for (const door of AD.doors) {
            const grad = ctx.createLinearGradient(door.x, door.y, door.x + door.w, door.y + door.h);
            grad.addColorStop(0, '#00f0ff'); grad.addColorStop(1, '#7b2cbf');
            ctx.fillStyle = grad;
            ctx.fillRect(door.x, door.y, door.w, door.h);
            ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2;
            ctx.strokeRect(door.x, door.y, door.w, door.h);
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.fillRect(door.x - 30, door.y - 30, door.w + 60, 24);
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 12px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(door.label, door.x + door.w / 2, door.y - 12);
        }

        // 隐藏房
        for (const s of (data.secrets || [])) {
            if (s.discovered) continue;
            if (Math.abs(p.x + p.w / 2 - s.x) < 80) {
                ctx.fillStyle = 'rgba(196,181,253,0.9)';
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillText('按 E 探索', s.x, 300);
                const pulse = Math.sin(t * 4) * 0.5 + 0.5;
                ctx.fillStyle = `rgba(196,181,253,${0.4 + pulse * 0.6})`;
                ctx.beginPath(); ctx.arc(s.x, 340, 6, 0, Math.PI * 2); ctx.fill();
            }
        }

        // 金币
        if (data.coins) for (const coin of data.coins) {
            if (coin.collected) continue;
            ctx.shadowColor = '#ffcc00'; ctx.shadowBlur = 14;
            ctx.fillStyle = '#ffcc00';
            ctx.beginPath(); ctx.arc(coin.x, coin.y, 9, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff7c2';
            ctx.beginPath(); ctx.arc(coin.x - 2, coin.y - 2, 3.5, 0, Math.PI * 2); ctx.fill();
        }

        // NPC
        for (const npc of AD.npcs) {
            ctx.font = '36px Arial'; ctx.textAlign = 'center';
            ctx.fillText(npc.icon, npc.x, npc.y);
            if (Math.abs(p.x - npc.x) < 70) {
                ctx.fillStyle = 'rgba(0,240,255,0.9)';
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.fillText('按 E 交互', npc.x, npc.y - 52);
            }
        }

        // Boss
        if (AD.boss) {
            const b = AD.boss;
            if (AD.bossState === 'barrage') {
                const pulse = Math.sin(t * 8) * 0.5 + 0.5;
                ctx.shadowColor = '#ff2e88'; ctx.shadowBlur = 40 + pulse * 30;
            }
            ctx.font = '90px Arial'; ctx.textAlign = 'center';
            ctx.fillText(b.icon, b.x, b.y);
            ctx.shadowBlur = 0;
        }

        // Boss 分身
        for (const c of AD.clones) {
            ctx.globalAlpha = 0.75;
            ctx.font = '70px Arial'; ctx.textAlign = 'center';
            ctx.fillText('👥', c.x, c.y);
            ctx.globalAlpha = 1;
            // 血条
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(c.x - 25, c.y - 60, 50, 4);
            ctx.fillStyle = '#ff8a00';
            ctx.fillRect(c.x - 25, c.y - 60, 50 * (c.hp / c.maxHp), 4);
        }

        // 黑洞
        for (const bh of AD.blackholes) {
            const grad = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.r);
            grad.addColorStop(0, 'rgba(0,0,0,0.9)');
            grad.addColorStop(0.5, 'rgba(100,210,255,0.4)');
            grad.addColorStop(1, 'rgba(100,210,255,0)');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(bh.x, bh.y, bh.r, 0, Math.PI * 2); ctx.fill();
            // 旋转粒子
            for (let i = 0; i < 6; i++) {
                const a = (performance.now() / 300 + i * Math.PI / 3) % (Math.PI * 2);
                const r = bh.r * 0.8;
                ctx.fillStyle = '#00f0ff';
                ctx.beginPath(); ctx.arc(bh.x + Math.cos(a) * r, bh.y + Math.sin(a) * r, 3, 0, Math.PI * 2); ctx.fill();
            }
        }

        // 弱点
        for (const w of AD.weaknesses) {
            const ringColor = w.hit ? '#ff2e88' : '#ffcc00';
            ctx.strokeStyle = ringColor; ctx.lineWidth = 4;
            ctx.shadowColor = ringColor; ctx.shadowBlur = 25;
            ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2); ctx.stroke();
            ctx.shadowBlur = 0;
            const grad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r * 0.7);
            grad.addColorStop(0, '#fff8c2'); grad.addColorStop(1, '#ffcc00');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(w.x, w.y, w.r * 0.7, 0, Math.PI * 2); ctx.fill();
            // 十字准心
            ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(w.x - w.r * 0.5, w.y); ctx.lineTo(w.x + w.r * 0.5, w.y);
            ctx.moveTo(w.x, w.y - w.r * 0.5); ctx.lineTo(w.x, w.y + w.r * 0.5);
            ctx.stroke();
            // HP
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(w.x - w.r, w.y + w.r + 6, w.r * 2, 4);
            ctx.fillStyle = '#ffcc00';
            ctx.fillRect(w.x - w.r, w.y + w.r + 6, w.r * 2 * (w.hp / w.maxHp), 4);
        }

        // 光波子弹（Boss）
        for (const b of AD.bullets) {
            ctx.shadowColor = b.color; ctx.shadowBlur = 25;
            ctx.fillStyle = b.color;
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(b.text || '0xFF', b.x, b.y + 3);
        }

        // Boss 弹幕
        for (const b of AD.bossBullets) {
            ctx.shadowColor = b.color; ctx.shadowBlur = 16;
            ctx.fillStyle = b.color;
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(b.symbol || '●', b.x, b.y + 4);
            if (b.tracking) {
                ctx.strokeStyle = b.color; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r + 3, 0, Math.PI * 2); ctx.stroke();
            }
        }

        // 玩家子弹（含拖尾）
        for (const b of AD.playerBullets) {
            // 拖尾
            for (let i = 0; i < b.trail.length; i++) {
                const tr = b.trail[i];
                ctx.globalAlpha = tr.life / 0.15 * 0.5;
                ctx.fillStyle = b.color;
                ctx.beginPath(); ctx.arc(tr.x, tr.y, b.r * (i / b.trail.length), 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;
            // 主体
            ctx.shadowColor = b.color; ctx.shadowBlur = 20;
            ctx.fillStyle = '#fff8c2';
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = b.color;
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r - 1, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
        }

        // 追踪导弹
        for (const m of AD.missiles) {
            const pulse = Math.sin(t * 12) * 0.5 + 0.5;
            ctx.shadowColor = '#ff2e88'; ctx.shadowBlur = 20 + pulse * 15;
            ctx.fillStyle = '#ff2e88';
            ctx.beginPath(); ctx.arc(m.x, m.y, 10, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(168,85,247,0.5)';
            ctx.beginPath(); ctx.arc(m.x - m.vx * 3, m.y - m.vy * 3, 6, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('*', m.x, m.y + 4);
        }

        // 玩家
        if (p.invincible === 0 || Math.floor(p.invincible / 4) % 2 === 0) {
            if (p.shieldActive) {
                ctx.strokeStyle = 'rgba(0,240,255,0.8)';
                ctx.lineWidth = 3; ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = 20;
                ctx.beginPath(); ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w, 0, Math.PI * 2); ctx.stroke();
                ctx.shadowBlur = 0;
            }
            drawPlayer(ctx);
        }

        // 粒子
        for (const pt of AD.particles) {
            ctx.globalAlpha = pt.life / pt.maxLife;
            ctx.fillStyle = pt.color;
            ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        }
        ctx.globalAlpha = 1;

        // 伤害数字
        for (const txt of AD.damageTexts) {
            ctx.globalAlpha = txt.life / 60;
            ctx.fillStyle = txt.color;
            ctx.font = 'bold 22px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.shadowColor = txt.color; ctx.shadowBlur = 12;
            ctx.fillText(txt.text, txt.x, txt.y);
            ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;

        ctx.restore();

        // ★ 枪口方向准星（在屏幕坐标系绘制）
        drawCrosshair(ctx);
        // ★ 左下角弹药条
        drawAmmoBar(ctx);
    }

    function drawCrosshair(ctx) {
        const p = AD.player;
        const gunX = p.x + p.w / 2 - AD.camera.x + Math.cos(p.gunAngle) * 30;
        const gunY = p.y + p.h / 2 + Math.sin(p.gunAngle) * 30;
        // 准星
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(gunX - 8, gunY); ctx.lineTo(gunX + 8, gunY);
        ctx.moveTo(gunX, gunY - 8); ctx.lineTo(gunX, gunY + 8);
        ctx.stroke();
        ctx.shadowBlur = 0;
        // 鼠标位置准星
        ctx.strokeStyle = 'rgba(255,46,136,0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(AD.mouse.x, AD.mouse.y, 6, 0, Math.PI * 2);
        ctx.stroke();
    }

    function drawAmmoBar(ctx) {
        const p = AD.player;
        const canvas = AD.canvas;
        const barX = 32;
        const barY = canvas.height - 70;
        const barW = 220;
        const barH = 18;

        // ---- 外框背景 ----
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(barX - 12, barY - 32, barW + 24, barH + 46, 10);
        ctx.fill();
        ctx.stroke();

        // ---- 标题 ----
        ctx.fillStyle = '#64d2ff';
        ctx.font = 'bold 12px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔫 弹 夹', barX, barY - 18);

        // ---- 数值 ----
        let numColor = '#64d2ff';
        if (p.ammo <= 2) numColor = '#ffcc00';
        if (p.ammo === 0) numColor = '#ff2e88';
        ctx.fillStyle = numColor;
        ctx.font = 'bold 13px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(p.ammo + ' / ' + p.maxAmmo, barX + barW, barY - 18);

        // ---- 进度条底 ----
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(barX, barY, barW, barH);

        // ---- 恢复进度（半透明填充） ----
        if (p.ammo < p.maxAmmo) {
            const regenPct = (p.ammoRegenTimer || 0) / 0.9;
            const regenW = (barW / p.maxAmmo) * regenPct;
            const startX = barX + (p.ammo / p.maxAmmo) * barW;
            ctx.fillStyle = 'rgba(100, 210, 255, 0.35)';
            ctx.fillRect(startX, barY, regenW, barH);
        }

        // ---- 已装弹（发光） ----
        const fillW = (p.ammo / p.maxAmmo) * barW;
        ctx.shadowColor = numColor;
        ctx.shadowBlur = 12;
        ctx.fillStyle = numColor;
        ctx.fillRect(barX, barY, fillW, barH);
        ctx.shadowBlur = 0;

        // ---- 分段线（每发一格） ----
        ctx.strokeStyle = 'rgba(10, 14, 26, 0.85)';
        ctx.lineWidth = 1.5;
        for (let i = 1; i < p.maxAmmo; i++) {
            const x = barX + (i / p.maxAmmo) * barW;
            ctx.beginPath();
            ctx.moveTo(x, barY);
            ctx.lineTo(x, barY + barH);
            ctx.stroke();
        }

        // ---- 空仓闪烁警示 ----
        if (p.ammo === 0) {
            const pulse = Math.sin(performance.now() / 150) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(255, 46, 136, ${0.5 + pulse * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(barX - 12, barY - 32, barW + 24, barH + 46, 10);
            ctx.stroke();
            ctx.fillStyle = `rgba(255, 46, 136, ${0.7 + pulse * 0.3})`;
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('RELOADING...', barX + barW / 2, barY + barH + 10);
        }

        ctx.restore();
    }

    function drawPlayer(ctx) {
        const p = AD.player;
        const sprite = AD._sprite;

        // 绘制枪
        const gunX = p.x + p.w / 2;
        const gunY = p.y + p.h / 2;
        const gunLen = 26;
        const gx = gunX + Math.cos(p.gunAngle) * gunLen * 0.5;
        const gy = gunY + Math.sin(p.gunAngle) * gunLen * 0.5;
        const gx2 = gunX + Math.cos(p.gunAngle) * gunLen;
        const gy2 = gunY + Math.sin(p.gunAngle) * gunLen;
        ctx.strokeStyle = '#c9d1d9';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx2, gy2);
        ctx.stroke();
        // 枪管发光（射击时）
        if (p.shootAnimTimer > 0) {
            ctx.strokeStyle = '#00f0ff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 20;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(gx, gy);
            ctx.lineTo(gx2, gy2);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        if (!sprite || !sprite.complete) {
            // fallback 绘制
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(p.x + 4, p.y + 14, p.w - 8, p.h - 20);
            ctx.fillStyle = '#ffdbac';
            ctx.fillRect(p.x + 6, p.y, p.w - 12, 16);
            ctx.fillStyle = '#333';
            const eyeOff = p.facing > 0 ? 4 : -4;
            ctx.fillRect(p.x + 10 + eyeOff, p.y + 6, 3, 3);
            ctx.fillStyle = '#7b2cbf';
            const legOff = p.onGround && Math.abs(p.vx) > 0.5 ? Math.sin(p.animFrame * 1.5) * 3 : 0;
            ctx.fillRect(p.x + 6, p.y + p.h - 10, 6, 10 + legOff);
            ctx.fillRect(p.x + p.w - 12, p.y + p.h - 10, 6, 10 - legOff);
            return;
        }
        let anim;
        if (p.shootAnimTimer > 0) anim = SPRITE.animations.attack;
        else if (p.dashing > 0) anim = SPRITE.animations.attack;
        else if (!p.onGround) anim = SPRITE.animations.jump;
        else if (Math.abs(p.vx) > 0.5) anim = SPRITE.animations.run;
        else anim = SPRITE.animations.idle;
        const frameIdx = Math.floor(performance.now() / (1000 / anim.fps)) % anim.frames;
        const sx = frameIdx * SPRITE.frameWidth;
        const sy = anim.row * SPRITE.frameHeight;
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        if (p.facing < 0) ctx.scale(-1, 1);
        ctx.drawImage(sprite, sx, sy, SPRITE.frameWidth, SPRITE.frameHeight, -p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    }

    function renderGadget(ctx, g, t) {
        const p = AD.player;

        /* 变量平台 */
        if (g.type === 'variable-platform') {
            const color = g.stable ? '#00ff88' : '#ffcc00';
            ctx.fillStyle = g.stable ? 'rgba(0,255,136,0.7)' : 'rgba(255,204,0,0.5)';
            ctx.fillRect(g.x, g.y, g.w, 12);
            ctx.strokeStyle = color; ctx.lineWidth = 2;
            ctx.setLineDash(g.stable ? [] : [6, 4]);
            ctx.strokeRect(g.x, g.y, g.w, 12);
            ctx.setLineDash([]);
            ctx.fillStyle = color;
            ctx.font = 'bold 11px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${g.id}: ${g.counter}/${g.target}`, g.x + g.w / 2, g.y - 8);
            if (g.onCliff && !g.stable) {
                ctx.fillStyle = 'rgba(255,46,136,0.7)';
                ctx.font = 'bold 10px JetBrains Mono, monospace';
                ctx.fillText('⚠ 悬崖', g.x + g.w / 2, g.y + 30);
            }
        }
        /* 地刺 */
        else if (g.type === 'loop-spikes') {
            const y = g.currentY != null ? g.currentY : g.y;
            ctx.fillStyle = 'rgba(255,46,136,0.85)';
            for (let i = 0; i < g.w; i += 16) {
                ctx.beginPath();
                ctx.moveTo(g.x + i, y + g.h);
                ctx.lineTo(g.x + i + 8, y);
                ctx.lineTo(g.x + i + 16, y + g.h);
                ctx.closePath(); ctx.fill();
            }
            ctx.fillStyle = 'rgba(255,46,136,0.2)';
            ctx.fillRect(g.x, y + g.h - 6, g.w, 6);
        }
        /* 传送门 */
        else if (g.type === 'pointer-teleport') {
            const pulse = Math.sin(t * 3) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(168,85,247,${0.5 + pulse * 0.5})`;
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(g.x + 20, g.y, 24, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = `rgba(168,85,247,${0.15 + pulse * 0.2})`; ctx.fill();
            ctx.fillStyle = '#c4b5fd';
            ctx.font = 'bold 11px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(g.label, g.x + 20, g.y - 34);
        }
        /* ★ 数组平台（虚化未激活） */
        else if (g.type === 'array-platforms') {
            const curIdx = g.currentProgress;
            g.items.forEach(it => {
                const isNext = it.order === curIdx;
                const isDone = it.order < curIdx || g.completed;
                // 未激活的虚化
                if (!isDone && !isNext) {
                    ctx.globalAlpha = 0.25;
                    ctx.fillStyle = 'rgba(100,210,255,0.4)';
                    ctx.fillRect(it.x, it.y, it.w, 8);
                    ctx.globalAlpha = 1;
                    ctx.strokeStyle = 'rgba(100,210,255,0.3)';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([3, 3]);
                    ctx.strokeRect(it.x, it.y, it.w, 8);
                    ctx.setLineDash([]);
                } else if (isNext) {
                    // 下一个目标：金色脉冲
                    const pulse = Math.sin(t * 6) * 0.5 + 0.5;
                    ctx.shadowColor = '#ffcc00'; ctx.shadowBlur = 20 + pulse * 15;
                    ctx.fillStyle = 'rgba(255,204,0,0.8)';
                    ctx.fillRect(it.x, it.y, it.w, 8);
                    ctx.shadowBlur = 0;
                } else {
                    // 已完成：绿色实心
                    ctx.fillStyle = 'rgba(0,255,136,0.7)';
                    ctx.fillRect(it.x, it.y, it.w, 8);
                }
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`[${it.order}]`, it.x + it.w / 2, it.y - 6);
            });
        }
        /* 内存池 */
        else if (g.type === 'memory-pool') {
            const pulse = Math.sin(t * 2) * 0.5 + 0.5;
            const grad = ctx.createLinearGradient(g.x, g.y, g.x + g.w, g.y);
            grad.addColorStop(0, `rgba(0,240,255,${0.3 + pulse * 0.3})`);
            grad.addColorStop(1, `rgba(0,255,157,${0.3 + pulse * 0.3})`);
            ctx.fillStyle = grad; ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 2;
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('malloc()', g.x + g.w / 2, g.y + g.h / 2 + 4);
        }
        /* 条件门 */
        else if (g.type === 'conditional-gate') {
            const opened = g.opened;
            ctx.fillStyle = opened ? 'rgba(0,255,136,0.15)' : 'rgba(255,46,136,0.35)';
            ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = opened ? '#00ff88' : '#ff2e88';
            ctx.lineWidth = 3;
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            ctx.save();
            ctx.translate(g.x + g.w / 2, g.y + g.h / 2);
            ctx.fillStyle = opened ? '#00ff88' : '#ff8fc0';
            ctx.font = 'bold 11px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(opened ? '✓ 通过' : `🔑 ${AD.keys}/${g.requiresKeys}`, 0, -8);
            ctx.fillText(opened ? '' : g.label, 0, 8);
            ctx.restore();
        }
        /* switch 平台 */
        else if (g.type === 'switch-platform') {
            ctx.fillStyle = g.active ? 'rgba(0,255,136,0.7)' : 'rgba(100,210,255,0.5)';
            ctx.fillRect(g.x, g.current, g.w, 8);
            ctx.strokeStyle = g.active ? '#00ff88' : '#64d2ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(g.x, g.current, g.w, 8);
            ctx.fillStyle = g.active ? '#00ff88' : '#64d2ff';
            ctx.font = 'bold 11px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('switch', g.x + g.w / 2, g.current - 6);
            if (Math.abs(p.x + p.w / 2 - (g.x + g.w / 2)) < 80) {
                ctx.fillStyle = 'rgba(0,240,255,0.9)';
                ctx.fillText('按 E 切换', g.x + g.w / 2, g.current - 22);
            }
        }
        /* 递归陷阱 */
        else if (g.type === 'recursive-trap') {
            g.platforms.forEach((pl, i) => {
                if (pl._gone) return;
                const isCur = i === g.currentIdx;
                const isNext = i === g.currentIdx + 1;
                let color = 'rgba(100,210,255,0.7)';
                if (isCur) color = 'rgba(255,204,0,0.85)';
                if (isNext) color = 'rgba(0,240,255,0.9)';
                if (isCur && pl._disappearAcc) {
                    const alpha = 1 - Math.min(1, pl._disappearAcc / 0.6);
                    color = `rgba(255,204,0,${0.3 + alpha * 0.55})`;
                }
                ctx.fillStyle = color;
                ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
                ctx.strokeStyle = isCur ? '#ffcc00' : '#64d2ff';
                ctx.lineWidth = 2;
                ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillText(`f(${g.platforms.length - 1 - i})`, pl.x + pl.w / 2, pl.y + pl.h / 2 + 4);
            });
        }
        /* 追踪导弹 */
        else if (g.type === 'pointer-missile') {
            const pulse = Math.sin(t * 4) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(255,46,136,${0.3 + pulse * 0.3})`;
            ctx.fillRect(g.x - 2, g.y - 2, 44, 44);
            ctx.strokeStyle = '#ff2e88'; ctx.lineWidth = 2;
            ctx.strokeRect(g.x - 2, g.y - 2, 44, 44);
            ctx.fillStyle = '#ff2e88';
            ctx.font = 'bold 11px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('&x', g.x + 20, g.y + 24);
        }
        /* 内存泄漏 */
        else if (g.type === 'memory-leak') {
            const pulse = Math.sin(t * 1.5) * 0.5 + 0.5;
            const grad = ctx.createRadialGradient(g.x + g.w / 2, g.y + g.h / 2, 0, g.x + g.w / 2, g.y + g.h / 2, g.w / 2);
            grad.addColorStop(0, `rgba(168,85,247,${0.4 + pulse * 0.2})`);
            grad.addColorStop(1, 'rgba(168,85,247,0)');
            ctx.fillStyle = grad; ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = 'rgba(168,85,247,0.6)'; ctx.lineWidth = 2;
            ctx.setLineDash([8, 6]);
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            ctx.setLineDash([]);
            ctx.fillStyle = 'rgba(196,181,253,0.9)';
            ctx.font = 'bold 13px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('malloc without free()', g.x + g.w / 2, g.y + g.h / 2);
            ctx.fillText('内存泄漏区', g.x + g.w / 2, g.y + g.h / 2 + 20);
        }
        /* 答题石碑 */
        else if (g.type === 'quiz-stone') {
            const pulse = Math.sin(t * 3) * 0.5 + 0.5;
            const used = g.used;
            ctx.fillStyle = used ? 'rgba(100,100,100,0.4)' : `rgba(255,204,0,${0.4 + pulse * 0.3})`;
            ctx.fillRect(g.x, g.y, g.w, g.h);
            ctx.strokeStyle = used ? '#666' : '#ffcc00';
            ctx.lineWidth = 2;
            ctx.strokeRect(g.x, g.y, g.w, g.h);
            ctx.fillStyle = used ? '#666' : '#fff';
            ctx.font = 'bold 32px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('?', g.x + g.w / 2, g.y + g.h / 2 + 10);
            if (!used && Math.abs(p.x + p.w / 2 - (g.x + g.w / 2)) < 70) {
                ctx.fillStyle = 'rgba(0,240,255,0.95)';
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.fillText('按 E 答题', g.x + g.w / 2, g.y - 10);
            }
        }
        /* 激光 */
        else if (g.type === 'laser-sweep') {
            const baseY = g.currentY || g.y;
            if (g.state === 'warning') {
                const pulse = Math.sin(t * 20) * 0.5 + 0.5;
                ctx.strokeStyle = `rgba(255,46,136,${0.4 + pulse * 0.5})`;
                ctx.lineWidth = 2;
                ctx.setLineDash([10, 8]);
                ctx.beginPath();
                ctx.moveTo(g.x + g.w / 2, g.y - 50);
                ctx.lineTo(g.x + g.w / 2, g.y + 350);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = `rgba(255,46,136,${0.7 + pulse * 0.3})`;
                ctx.font = 'bold 22px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('⚠', g.x + g.w / 2, g.y - 20);
                ctx.font = 'bold 11px JetBrains Mono, monospace';
                ctx.fillText('charging', g.x + g.w / 2, g.y - 50);
            } else if (g.state === 'firing') {
                ctx.save();
                ctx.shadowColor = '#ffcc00';
                ctx.shadowBlur = 40;
                ctx.fillStyle = '#fff8c2';
                ctx.fillRect(g.x - 10, baseY - 20, g.w + 20, 40);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(g.x - 4, baseY - 12, g.w + 8, 24);
                ctx.fillStyle = 'rgba(255,138,0,0.6)';
                ctx.fillRect(g.x - 16, baseY - 26, g.w + 32, 8);
                ctx.fillRect(g.x - 16, baseY + 18, g.w + 32, 8);
                const glowGrad = ctx.createRadialGradient(g.x + g.w / 2, baseY, 0, g.x + g.w / 2, baseY, 80);
                glowGrad.addColorStop(0, 'rgba(255,204,0,0.5)');
                glowGrad.addColorStop(1, 'rgba(255,204,0,0)');
                ctx.fillStyle = glowGrad;
                ctx.fillRect(g.x - 80, baseY - 80, 200, 160);
                ctx.restore();
            } else if (g.state === 'cooldown') {
                const progress = 1 - (g.stateTimer / g.cooldownTime);
                ctx.strokeStyle = `rgba(100,210,255,${0.15 + progress * 0.2})`;
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 6]);
                ctx.beginPath();
                ctx.moveTo(g.x + g.w / 2, g.y - 50);
                ctx.lineTo(g.x + g.w / 2, g.y + 350);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = 'rgba(100,210,255,0.3)';
                ctx.font = 'bold 10px JetBrains Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillText('cooldown', g.x + g.w / 2, g.y - 20);
            }
        }
    }

    function preloadSceneImages() {
        const data = SCENES[AD.scene];
        if (!data || !data.bgImage) { AD._bgImageLoaded = null; return; }
        const img = new Image();
        img.onload = () => { AD._bgImageLoaded = img; };
        img.onerror = () => { AD._bgImageLoaded = null; };
        img.src = data.bgImage;
    }
    function preloadSprite() {
        const img = new Image();
        img.onload = () => { AD._sprite = img; };
        img.onerror = () => { AD._sprite = null; };
        img.src = SPRITE.src;
    }

    window.Adventure = {
        start() {
            if (!AD.canvas) initDOM();
            if (Save.hasSkill('doubleJump')) AD.player.maxJumps = 2;
            AD.player.maxHp = 100 + (Save.data.upgradeStats.maxHpBonus || 0);
            preloadSprite();
            if (unlockedAchievements.length === 0) {
                setTimeout(() => unlockAchievement('first_step'), 800);
            }
            enterAdventure();
        },
        exit: exitAdventure,
        resetSave() { Save.reset(); },
        resetTutorials() { try { localStorage.removeItem(TUTORIAL_KEY); } catch (e) {} seenTutorials = []; },
        resetAchievements() { try { localStorage.removeItem(ACHIEVEMENT_KEY); } catch (e) {} unlockedAchievements = []; }
    };
})();