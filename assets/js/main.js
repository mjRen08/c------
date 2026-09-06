// ========== 全局状态管理 ==========
const AppState = {
    currentUser: null,
    currentQuestion: 0,
    score: 0,
    achievements: [],
    learningProgress: {}
};

// ========== 工具函数 ==========
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// 模拟本地存储
function saveToStorage(key, data) {
    const value = JSON.stringify(data);

    try {
        localStorage.setItem(key, value);
    } catch (error) {
    }

    document.cookie = encodeURIComponent('cm_' + key) + '=' + encodeURIComponent(value) + '; path=/; max-age=31536000';
}

function getFromStorage(key) {
    let data = null;
    try {
        data = localStorage.getItem(key);
    } catch (error) {
    }

    if (data) {
        return JSON.parse(data);
    }

    const cookieName = encodeURIComponent('cm_' + key) + '=';
    const cookie = document.cookie.split('; ').find(function (item) {
        return item.indexOf(cookieName) === 0;
    });
    return cookie ? JSON.parse(decodeURIComponent(cookie.slice(cookieName.length))) : null;
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        document.cookie = encodeURIComponent('cm_' + key) + '=; path=/; max-age=0';
    }
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function () {
    initAuth();
    initNavigation();
    initQuiz();
    checkLoginStatus();
    loadAchievements();

    // 如果是游戏页面，初始化游戏
    if (document.getElementById('gameCanvas')) {
        initGameEngine();
    }

    // 如果是个人主页，加载数据
    if (window.location.pathname.includes('profile.html')) {
        loadProfileData();
    }
});

// ========== 导航栏交互 ==========
function initNavigation() {
    // 高亮当前页面导航
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========== 认证系统 ==========
function initAuth() {
    // 登录表单
    const loginForm = $('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = $('#username').value;
            const password = $('#password').value;

            // 简单验证
            const users = getFromStorage('users') || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user || (username === 'admin' && password === 'admin')) {
                const currentUser = user || { username: 'admin', level: 5, exp: 1200 };
                saveToStorage('currentUser', currentUser);
                showToast('登录成功！', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showToast('用户名或密码错误', 'error');
            }
        });
    }

    // 注册表单
    const registerForm = $('#registerForm');
    if (registerForm) {
        const passwordInput = $('#regPassword');
        const passwordHint = $('#passwordHint');

        $$('.password-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                const target = document.getElementById(toggle.getAttribute('data-password-target'));
                const isPassword = target.type === 'password';
                target.type = isPassword ? 'text' : 'password';
                toggle.setAttribute('aria-label', isPassword ? '隐藏密码' : '显示密码');
                toggle.setAttribute('title', isPassword ? '隐藏密码' : '显示密码');
            });
        });

        function validatePassword() {
            const passwordLength = passwordInput.value.length;
            const isValid = passwordLength >= 6 && passwordLength <= 20;

            passwordHint.textContent = isValid || passwordLength === 0
                ? ''
                : '密码长度必须为6-20位';
            if (!isValid && passwordLength > 0) {
                passwordInput.classList.add('input-error');
            } else {
                passwordInput.classList.remove('input-error');
            }
            return isValid;
        }

        passwordInput.addEventListener('input', validatePassword);

        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = $('#regUsername').value;
            const email = $('#regEmail').value;
            const password = passwordInput.value;
            const confirmPassword = $('#confirmPassword').value;

            if (!username || !email || !password || !confirmPassword) {
                showToast('请填写完整注册信息', 'error');
                return;
            }

            if (!validatePassword()) {
                passwordHint.textContent = '密码长度必须为6-20位';
                passwordInput.focus();
                return;
            }

            if (password !== confirmPassword) {
                showToast('两次密码不一致', 'error');
                return;
            }

            const users = getFromStorage('users') || [];
            if (users.find(u => u.username === username)) {
                showToast('用户名已存在', 'error');
                return;
            }

            const newUser = {
                username,
                email,
                password,
                level: 1,
                exp: 0,
                achievements: [],
                registerTime: Date.now()
            };

            users.push(newUser);
            saveToStorage('users', users);
            showToast('注册成功！请登录', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // 退出登录
    const logoutBtn = $('#logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            removeFromStorage('currentUser');
            showToast('已退出登录', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 800);
        });
    }
}

function checkLoginStatus() {
    const user = getFromStorage('currentUser');
    if (user) {
        AppState.currentUser = user;
        updateUserUI(user);
    }
}

function updateUserUI(user) {
    const userAvatar = $('#userAvatar');
    if (userAvatar) {
        userAvatar.textContent = user.username.charAt(0).toUpperCase();
        userAvatar.style.display = 'flex';
    }

    const loginBtn = $('#loginBtn');
    const registerBtn = $('#registerBtn');
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
}

// ========== 小测系统 ==========
const quizData = [
    {
        question: '以下哪个是C语言的正确主函数入口？',
        code: null,
        options: [
            'void main()',
            'int main()',
            'main()',
            'function main()'
        ],
        answer: 1,
        explanation: 'C语言标准规定主函数返回类型为int，表示程序退出状态码。'
    },
    {
        question: '下面代码的输出结果是什么？',
        code: `#include <stdio.h>
int main() {
    int a = 5;
    printf("%d", a++);
    return 0;
}`,
        options: ['5', '6', '编译错误', '0'],
        answer: 0,
        explanation: 'a++是后置递增，先返回当前值5，然后a才变成6。'
    },
    {
        question: 'sizeof(int) 在32位系统中返回的值是？',
        code: null,
        options: ['2', '4', '8', '取决于编译器'],
        answer: 1,
        explanation: '在32位系统中，int类型通常占用4个字节（32位）。'
    },
    {
        question: '以下哪个关键字用于定义常量？',
        code: null,
        options: ['static', 'const', 'final', 'define'],
        answer: 1,
        explanation: 'const关键字用于定义只读变量，#define是预处理指令不是关键字。'
    },
    {
        question: '指针变量p指向int数组arr，p++后地址增加多少字节？',
        code: null,
        options: ['1', '2', '4', '不确定'],
        answer: 2,
        explanation: '指针加法会根据指向类型的大小偏移，int占4字节，所以增加4字节。'
    }
];

function initQuiz() {
    const quizContainer = $('#quizContainer');
    if (!quizContainer) return;

    AppState.currentQuestion = 0;
    AppState.score = 0;
    renderQuestion();

    $('#nextBtn').addEventListener('click', nextQuestion);
    $('#prevBtn').addEventListener('click', prevQuestion);
    $('#submitBtn').addEventListener('click', submitQuiz);
}

function renderQuestion() {
    const q = quizData[AppState.currentQuestion];
    if (!q) return;

    $('#questionNumber').textContent = `第 ${AppState.currentQuestion + 1} / ${quizData.length} 题`;
    $('#questionText').textContent = q.question;

    // 更新进度条
    const progress = ((AppState.currentQuestion + 1) / quizData.length) * 100;
    $('#quizProgress').style.width = progress + '%';

    // 代码块
    const codeBlock = $('#codeBlock');
    if (q.code) {
        codeBlock.innerHTML = formatCode(q.code);
        codeBlock.style.display = 'block';
    } else {
        codeBlock.style.display = 'none';
    }

    // 选项
    const optionsHtml = q.options.map((opt, idx) => `
        <div class="option-item" data-index="${idx}" onclick="selectOption(${idx})">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
        </div>
    `).join('');

    $('#optionsList').innerHTML = optionsHtml;

    // 按钮状态
    $('#prevBtn').style.visibility = AppState.currentQuestion === 0 ? 'hidden' : 'visible';

    if (AppState.currentQuestion === quizData.length - 1) {
        $('#nextBtn').style.display = 'none';
        $('#submitBtn').style.display = 'inline-flex';
    } else {
        $('#nextBtn').style.display = 'inline-flex';
        $('#submitBtn').style.display = 'none';
    }
}

function selectOption(index) {
    $$('.option-item').forEach(item => item.classList.remove('selected'));
    $$('.option-item')[index].classList.add('selected');

    // 保存答案
    quizData[AppState.currentQuestion].userAnswer = index;
}

function nextQuestion() {
    if (AppState.currentQuestion < quizData.length - 1) {
        AppState.currentQuestion++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (AppState.currentQuestion > 0) {
        AppState.currentQuestion--;
        renderQuestion();
    }
}

function submitQuiz() {
    let score = 0;
    quizData.forEach(q => {
        if (q.userAnswer === q.answer) score++;
    });

    AppState.score = score;

    // 显示结果
    const percentage = Math.round((score / quizData.length) * 100);
    let resultText = '';
    let resultClass = '';

    if (percentage >= 80) {
        resultText = '优秀！你已经掌握了这些知识点';
        resultClass = 'success';
        unlockAchievement('quiz_master');
    } else if (percentage >= 60) {
        resultText = '不错！继续加油';
        resultClass = 'warning';
    } else {
        resultText = '还需努力，建议回顾课程内容';
        resultClass = 'danger';
    }

    $('#quizContainer').innerHTML = `
        <div class="card" style="text-align: center; padding: 60px 40px;">
            <div style="font-size: 64px; margin-bottom: 20px;">
                ${percentage >= 60 ? '🎉' : '💪'}
            </div>
            <h2 style="font-size: 32px; margin-bottom: 8px; color: var(--text-primary);">
                得分: ${score} / ${quizData.length}
            </h2>
            <p style="font-size: 18px; color: var(--text-secondary); margin-bottom: 32px;">
                正确率 ${percentage}% - ${resultText}
            </p>
            <div style="display: flex; gap: 16px; justify-content: center;">
                <button class="btn btn-primary" onclick="location.reload()">重新测试</button>
                <a href="list.html" class="btn btn-outline">返回课程</a>
            </div>
        </div>
    `;

    // 更新经验值
    addExp(score * 10);
}

function formatCode(code) {
    return code
        .replace(/(int|void|char|float|double|return|if|else|for|while|include)/g, '<span class="keyword">$1</span>')
        .replace(/("[^"]*")/g, '<span class="string">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
        .replace(/(printf|scanf|main)/g, '<span class="function">$1</span>');
}

// ========== 成就系统 ==========
const achievementList = [
    { id: 'first_login', name: '初来乍到', desc: '首次登录平台', icon: '🚀' },
    { id: 'first_course', name: '学习入门', desc: '完成第一节课程', icon: '📚' },
    { id: 'quiz_master', name: '答题达人', desc: '小测获得80分以上', icon: '🏆' },
    { id: 'game_master', name: '编程高手', desc: '通关所有游戏关卡', icon: '🎮' },
    { id: 'level_5', name: '进阶学者', desc: '达到5级', icon: '⭐' },
    { id: 'level_10', name: '编程大师', desc: '达到10级', icon: '👑' },
    { id: 'streak_7', name: '坚持不懈', desc: '连续学习7天', icon: '🔥' },
    { id: 'all_basic', name: '基础精通', desc: '完成所有基础课程', icon: '💎' }
];

function loadAchievements() {
    const container = $('#achievementGrid');
    if (!container) return;

    const user = getFromStorage('currentUser');
    const unlockedIds = user ? (user.achievements || []) : [];

    container.innerHTML = achievementList.map(a => {
        const unlocked = unlockedIds.includes(a.id);
        return `
            <div class="achievement-item card ${unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${a.icon}</div>
                <h4>${a.name}</h4>
                <p>${a.desc}</p>
            </div>
        `;
    }).join('');
}

function unlockAchievement(id) {
    const user = getFromStorage('currentUser');
    if (!user) return;

    if (!user.achievements) user.achievements = [];
    if (user.achievements.includes(id)) return;

    user.achievements.push(id);
    saveToStorage('currentUser', user);

    // 更新用户列表中的数据
    const users = getFromStorage('users') || [];
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
        users[idx] = user;
        saveToStorage('users', users);
    }

    const achievement = achievementList.find(a => a.id === id);
    if (achievement) {
        showToast(`🏆 解锁成就：${achievement.name}`, 'success');
    }
}

// ========== 经验与等级系统 ==========
function addExp(amount) {
    const user = getFromStorage('currentUser');
    if (!user) return;

    user.exp = (user.exp || 0) + amount;

    // 计算等级
    const expNeeded = user.level * 200;
    if (user.exp >= expNeeded) {
        user.level++;
        user.exp -= expNeeded;
        showToast(`🎉 升级了！当前等级：${user.level}`, 'success');

        if (user.level >= 5) unlockAchievement('level_5');
        if (user.level >= 10) unlockAchievement('level_10');
    }

    saveToStorage('currentUser', user);

    // 更新用户列表
    const users = getFromStorage('users') || [];
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
        users[idx] = user;
        saveToStorage('users', users);
    }
}

// ========== Toast提示 ==========
function showToast(message, type = 'info') {
    // 移除已有的toast
    const existing = $('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toast.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 14px 28px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: fadeInUp 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

    const colors = {
        success: '#00ff88',
        error: '#ff4757',
        warning: '#ffcc00',
        info: '#00d4ff'
    };

    toast.style.background = colors[type] || colors.info;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ========== 个人主页数据加载 ==========
function loadProfileData() {
    const user = getFromStorage('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    $('#profileUsername').textContent = user.username;
    $('#profileLevel').textContent = `Lv.${user.level}`;
    $('#profileExp').textContent = `经验: ${user.exp || 0} / ${user.level * 200}`;

    // 学习进度
    const courses = [
        { name: 'C语言基础入门', progress: 75, icon: '📘' },
        { name: '指针与内存管理', progress: 30, icon: '🔧' },
        { name: '数据结构与算法', progress: 10, icon: '🌲' }
    ];

    $('#learningList').innerHTML = courses.map(c => `
        <div class="learning-item">
            <div class="learning-icon">${c.icon}</div>
            <div class="learning-info">
                <h4>${c.name}</h4>
                <div class="progress-text">进度: ${c.progress}%</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${c.progress}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================================================
// ========== 横板跳跃闯关游戏引擎 ==========
// ==================================================

let canvas, ctx;
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    DIALOG: 'dialog',
    BATTLE: 'battle',
    SHOP: 'shop',
    COMPLETE: 'complete'
};

let gameState = GameState.MENU;
let currentLevelIndex = 0;
let camera = { x: 0, y: 0 };

const player = {
    x: 100,
    y: 300,
    width: 28,
    height: 40,
    vx: 0,
    vy: 0,
    speed: 4,
    jumpPower: -12,
    onGround: false,
    facing: 1,
    health: 100,
    maxHealth: 100,
    coins: 0,
    invincible: 0,
    animFrame: 0,
    animTimer: 0
};

const GRAVITY = 0.6;
const FRICTION = 0.85;
const keys = {};

// 关卡数据
const levels = [
    {
        name: '第一关：变量草原',
        theme: '变量与数据类型',
        bgColor1: '#0a1628',
        bgColor2: '#1a2744',
        groundColor: '#2d4a3e',
        width: 3200,
        platforms: [
            { x: 0, y: 480, w: 800, h: 60 },
            { x: 900, y: 480, w: 600, h: 60 },
            { x: 1600, y: 480, w: 500, h: 60 },
            { x: 2200, y: 480, w: 1000, h: 60 },
            { x: 300, y: 380, w: 120, h: 20 },
            { x: 500, y: 320, w: 100, h: 20 },
            { x: 700, y: 280, w: 80, h: 20 },
            { x: 1000, y: 360, w: 150, h: 20 },
            { x: 1250, y: 300, w: 100, h: 20 },
            { x: 1700, y: 380, w: 120, h: 20 },
            { x: 1900, y: 320, w: 100, h: 20 },
            { x: 2400, y: 380, w: 150, h: 20 },
            { x: 2650, y: 320, w: 120, h: 20 },
            { x: 2850, y: 260, w: 100, h: 20 },
        ],
        coins: [
            { x: 320, y: 340 }, { x: 360, y: 340 }, { x: 400, y: 340 },
            { x: 520, y: 280 }, { x: 560, y: 280 },
            { x: 720, y: 240 },
            { x: 1030, y: 320 }, { x: 1070, y: 320 }, { x: 1110, y: 320 },
            { x: 1270, y: 260 },
            { x: 1730, y: 340 }, { x: 1770, y: 340 },
            { x: 2430, y: 340 }, { x: 2470, y: 340 }, { x: 2510, y: 340 },
            { x: 2680, y: 280 }, { x: 2720, y: 280 },
            { x: 2880, y: 220 },
        ],
        enemies: [
            { x: 600, y: 440, type: 'bug_slime', topic: 'variable' },
            { x: 1100, y: 440, type: 'bug_slime', topic: 'variable' },
            { x: 1800, y: 440, type: 'bug_worm', topic: 'datatype' },
            { x: 2500, y: 440, type: 'bug_slime', topic: 'variable' },
        ],
        chests: [
            { x: 750, y: 240, opened: false, reward: 30, topic: 'variable' },
            { x: 2900, y: 220, opened: false, reward: 50, topic: 'datatype' },
        ],
        npcs: [
            {
                x: 150, y: 440,
                name: '老村长',
                icon: '👴',
                dialogs: [
                    '欢迎来到变量草原，年轻的勇者！',
                    'Bug病毒正在侵蚀代码王国，只有C语言的力量能净化它们。',
                    '用方向键移动，空格跳跃。遇到敌人时，答对C语言题目就能击败它们。',
                    '收集金币，找到神秘商人可以兑换道具。祝你好运，勇者！'
                ]
            },
            {
                x: 1500, y: 440,
                name: '神秘商人',
                icon: '🧙',
                isShop: true,
                dialogs: ['嘿嘿，想买点什么吗？']
            }
        ],
        goal: { x: 3100, y: 420 },
        startPos: { x: 100, y: 380 }
    },
    {
        name: '第二关：循环森林',
        theme: '循环与分支结构',
        bgColor1: '#0a1a1a',
        bgColor2: '#1a2e2a',
        groundColor: '#1e3a2f',
        width: 3600,
        platforms: [
            { x: 0, y: 480, w: 600, h: 60 },
            { x: 700, y: 480, w: 400, h: 60 },
            { x: 1200, y: 480, w: 500, h: 60 },
            { x: 1800, y: 480, w: 400, h: 60 },
            { x: 2300, y: 480, w: 500, h: 60 },
            { x: 2900, y: 480, w: 700, h: 60 },
            { x: 200, y: 380, w: 100, h: 20 },
            { x: 350, y: 320, w: 80, h: 20 },
            { x: 480, y: 260, w: 80, h: 20 },
            { x: 800, y: 360, w: 120, h: 20 },
            { x: 1000, y: 300, w: 100, h: 20 },
            { x: 1300, y: 380, w: 100, h: 20 },
            { x: 1450, y: 320, w: 120, h: 20 },
            { x: 1600, y: 260, w: 80, h: 20 },
            { x: 1900, y: 360, w: 100, h: 20 },
            { x: 2100, y: 300, w: 100, h: 20 },
            { x: 2400, y: 380, w: 120, h: 20 },
            { x: 2600, y: 320, w: 100, h: 20 },
            { x: 3000, y: 380, w: 100, h: 20 },
            { x: 3200, y: 300, w: 150, h: 20 },
        ],
        coins: [
            { x: 220, y: 340 }, { x: 260, y: 340 },
            { x: 370, y: 280 },
            { x: 500, y: 220 },
            { x: 830, y: 320 }, { x: 870, y: 320 },
            { x: 1020, y: 260 },
            { x: 1320, y: 340 }, { x: 1360, y: 340 },
            { x: 1480, y: 280 }, { x: 1520, y: 280 },
            { x: 1920, y: 320 }, { x: 1960, y: 320 },
            { x: 2430, y: 340 }, { x: 2470, y: 340 },
            { x: 2620, y: 280 },
            { x: 3030, y: 340 }, { x: 3070, y: 340 },
            { x: 3230, y: 260 }, { x: 3270, y: 260 }, { x: 3310, y: 260 },
        ],
        enemies: [
            { x: 400, y: 440, type: 'bug_slime', topic: 'loop' },
            { x: 900, y: 440, type: 'bug_fly', topic: 'if' },
            { x: 1400, y: 440, type: 'bug_worm', topic: 'loop' },
            { x: 2000, y: 440, type: 'bug_slime', topic: 'switch' },
            { x: 2500, y: 440, type: 'bug_fly', topic: 'loop' },
            { x: 3100, y: 440, type: 'bug_worm', topic: 'if' },
        ],
        chests: [
            { x: 520, y: 220, opened: false, reward: 40, topic: 'loop' },
            { x: 1620, y: 220, opened: false, reward: 40, topic: 'if' },
            { x: 3350, y: 260, opened: false, reward: 60, topic: 'loop' },
        ],
        npcs: [
            {
                x: 100, y: 440,
                name: '森林守护者',
                icon: '🧝',
                dialogs: [
                    '这里是循环森林，Bug变得更强了。',
                    '这一关的敌人都和循环、分支语句有关。',
                    '记住for、while、if-else的用法，就能轻松击败它们。',
                    '继续前进吧，勇者！代码王国在等着你拯救。'
                ]
            },
            {
                x: 2200, y: 440,
                name: '神秘商人',
                icon: '🧙',
                isShop: true,
                dialogs: ['又见面了，这次有新货哦~']
            }
        ],
        goal: { x: 3500, y: 420 },
        startPos: { x: 80, y: 380 }
    }
];

// 战斗题库
const questionBank = {
    variable: [
        { q: '以下哪个是合法的C语言变量名？', options: ['123abc', 'int', 'my_var', 'a-b'], answer: 2 },
        { q: '定义整型变量使用的关键字是？', options: ['float', 'int', 'char', 'double'], answer: 1 },
        { q: '变量命名不能以什么开头？', options: ['字母', '下划线', '数字', '都可以'], answer: 2 },
    ],
    datatype: [
        { q: 'char类型占用多少字节？', options: ['1', '2', '4', '8'], answer: 0 },
        { q: '用于存储小数的数据类型是？', options: ['int', 'char', 'float', 'string'], answer: 2 },
        { q: '32位系统中int占多少字节？', options: ['1', '2', '4', '8'], answer: 2 },
    ],
    loop: [
        { q: '哪个不是C语言的循环语句？', options: ['for', 'while', 'do-while', 'loop'], answer: 3 },
        { q: 'for循环中三个表达式用什么分隔？', options: [',', ';', ':', '.'], answer: 1 },
        { q: '跳出循环使用什么关键字？', options: ['exit', 'break', 'continue', 'return'], answer: 1 },
    ],
    if: [
        { q: 'if语句中表示否则的关键字是？', options: ['else', 'then', 'elif', 'otherwise'], answer: 0 },
        { q: '判断相等使用什么运算符？', options: ['=', '==', '===', '!='], answer: 1 },
        { q: 'else总是和哪个if配对？', options: ['第一个if', '最近的未配对if', '最外层if', '随机'], answer: 1 },
    ],
    switch: [
        { q: 'switch语句中每个分支用什么开头？', options: ['case', 'when', 'then', 'branch'], answer: 0 },
        { q: '跳出switch使用什么？', options: ['continue', 'break', 'return', 'exit'], answer: 1 },
    ]
};

// 商店物品
const shopItems = [
    { id: 'potion', name: '生命药水', desc: '恢复30点生命值', price: 20, icon: '🧪', effect: 'heal' },
    { id: 'shield', name: '护盾符文', desc: '下次答错不扣血', price: 35, icon: '🛡️', effect: 'shield' },
    { id: 'magnet', name: '金币磁铁', desc: '自动吸引附近金币', price: 50, icon: '🧲', effect: 'magnet' },
];

let currentLevel = null;
let particles = [];
let currentDialog = null;
let dialogIndex = 0;
let currentBattle = null;
let hasShield = false;
let hasMagnet = false;
let stats = { coins: 0, enemies: 0, chests: 0 };

// ========== 游戏初始化 ==========
function initGameEngine() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // 全局键盘监听
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true;

        if (e.code === 'Escape') {
            if (gameState === GameState.PLAYING) pauseGame();
            else if (gameState === GameState.PAUSED) resumeGame();
        }

        if ((e.code === 'Space' || e.code === 'KeyE') && gameState === GameState.DIALOG) {
            e.preventDefault();
            advanceDialog();
        }

        if (e.code === 'KeyE' && gameState === GameState.PLAYING) {
            checkInteraction();
        }
    });

    document.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });
}

// ========== 游戏流程控制 ==========
function showLevelSelect() {
    document.getElementById('levelSelect').style.display = 'grid';
}

function showStory() {
    showDialogBox('旁白', [
        '在遥远的代码王国，一切都由纯净的C语言代码构成。',
        '然而，邪恶的Bug病毒悄然入侵，腐蚀了这片土地的每一寸代码。',
        '变量错乱，循环失控，整个王国陷入了混乱...',
        '传说中，只有掌握C语言之力的勇者，才能净化Bug病毒，拯救代码王国。',
        '而你，就是那位被选中的勇者。你的冒险，即将开始！'
    ], () => { });
}

function showControls() {
    showDialogBox('操作指南', [
        '← → 方向键：控制角色左右移动',
        '空格键：跳跃',
        'E键：与NPC对话、开启宝箱、进入商店',
        'ESC键：暂停游戏',
        '接触敌人会触发答题战斗，答对击败敌人！'
    ], () => { });
}

function startLevel(index) {
    currentLevelIndex = index;
    currentLevel = JSON.parse(JSON.stringify(levels[index]));

    // 重置玩家
    player.x = currentLevel.startPos.x;
    player.y = currentLevel.startPos.y;
    player.vx = 0;
    player.vy = 0;
    player.health = player.maxHealth;
    player.coins = 0;
    player.invincible = 0;

    stats = { coins: 0, enemies: 0, chests: 0 };
    particles = [];
    hasShield = false;
    hasMagnet = false;

    document.getElementById('levelName').textContent = currentLevel.name;
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('levelComplete').style.display = 'none';

    gameState = GameState.PLAYING;

    // 开场对话
    if (currentLevel.npcs.length > 0) {
        setTimeout(() => {
            talkToNPC(currentLevel.npcs[0]);
        }, 500);
    }

    gameLoop();
}

function pauseGame() {
    gameState = GameState.PAUSED;
    document.getElementById('pauseMenu').style.display = 'flex';
}

function resumeGame() {
    gameState = GameState.PLAYING;
    document.getElementById('pauseMenu').style.display = 'none';
    gameLoop();
}

function restartLevel() {
    document.getElementById('pauseMenu').style.display = 'none';
    startLevel(currentLevelIndex);
}

function backToMenu() {
    gameState = GameState.MENU;
    document.getElementById('pauseMenu').style.display = 'none';
    document.getElementById('levelComplete').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('levelSelect').style.display = 'none';
}

function nextLevel() {
    if (currentLevelIndex < levels.length - 1) {
        startLevel(currentLevelIndex + 1);
    } else {
        backToMenu();
        unlockAchievement('game_master');
    }
}

function completeLevel() {
    gameState = GameState.COMPLETE;
    document.getElementById('statCoins').textContent = stats.coins;
    document.getElementById('statEnemies').textContent = stats.enemies;
    document.getElementById('statChests').textContent = stats.chests;
    document.getElementById('levelComplete').style.display = 'flex';

    // 加经验
    addExp(stats.coins + stats.enemies * 10);
}

// ========== 游戏主循环 ==========
function gameLoop() {
    if (gameState !== GameState.PLAYING) return;

    update();
    render();

    requestAnimationFrame(gameLoop);
}

function update() {
    // 玩家输入
    if (keys['ArrowLeft'] || keys['KeyA']) {
        player.vx = -player.speed;
        player.facing = -1;
    } else if (keys['ArrowRight'] || keys['KeyD']) {
        player.vx = player.speed;
        player.facing = 1;
    } else {
        player.vx *= FRICTION;
    }

    if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && player.onGround) {
        player.vy = player.jumpPower;
        player.onGround = false;
    }

    // 重力
    player.vy += GRAVITY;

    // 移动
    player.x += player.vx;
    player.y += player.vy;

    // 边界
    if (player.x < 0) player.x = 0;
    if (player.x > currentLevel.width - player.width) player.x = currentLevel.width - player.width;

    // 平台碰撞
    player.onGround = false;
    for (const plat of currentLevel.platforms) {
        if (checkCollision(player, plat)) {
            // 从上方落下
            if (player.vy > 0 && player.y + player.height - player.vy <= plat.y + 5) {
                player.y = plat.y - player.height;
                player.vy = 0;
                player.onGround = true;
            }
            // 从下方撞到
            else if (player.vy < 0 && player.y - player.vy >= plat.y + plat.h - 5) {
                player.y = plat.y + plat.h;
                player.vy = 0;
            }
            // 侧面
            else {
                if (player.vx > 0) player.x = plat.x - player.width;
                else if (player.vx < 0) player.x = plat.x + plat.w;
            }
        }
    }

    // 掉落死亡
    if (player.y > 600) {
        player.health -= 20;
        player.x = currentLevel.startPos.x;
        player.y = currentLevel.startPos.y;
        player.vy = 0;
        updateHealthBar();
        if (player.health <= 0) {
            player.health = player.maxHealth;
            restartLevel();
        }
    }

    // 无敌时间
    if (player.invincible > 0) player.invincible--;

    // 金币磁铁效果
    if (hasMagnet) {
        for (const coin of currentLevel.coins) {
            if (!coin.collected) {
                const dx = player.x + player.width / 2 - coin.x;
                const dy = player.y + player.height / 2 - coin.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    coin.x += dx * 0.1;
                    coin.y += dy * 0.1;
                }
            }
        }
    }

    // 收集金币
    for (let i = currentLevel.coins.length - 1; i >= 0; i--) {
        const coin = currentLevel.coins[i];
        if (!coin.collected && checkCollision(player, { x: coin.x - 10, y: coin.y - 10, w: 20, h: 20 })) {
            coin.collected = true;
            player.coins++;
            stats.coins++;
            document.getElementById('coinCount').textContent = player.coins;
            spawnParticles(coin.x, coin.y, '#ffd700', 5);
        }
    }

    // 敌人碰撞检测
    for (const enemy of currentLevel.enemies) {
        if (!enemy.defeated && player.invincible === 0) {
            const enemyBox = { x: enemy.x - 15, y: enemy.y - 30, w: 30, h: 30 };
            if (checkCollision(player, enemyBox)) {
                startBattle(enemy);
            }
        }
    }

    // 终点检测
    const goal = currentLevel.goal;
    if (checkCollision(player, { x: goal.x, y: goal.y, w: 40, h: 60 })) {
        completeLevel();
    }

    // 相机跟随
    camera.x = player.x - canvas.width / 2 + player.width / 2;
    camera.x = Math.max(0, Math.min(camera.x, currentLevel.width - canvas.width));

    // 粒子更新
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
    }

    // 动画帧
    player.animTimer++;
    if (player.animTimer > 8) {
        player.animTimer = 0;
        player.animFrame = (player.animFrame + 1) % 4;
    }
}

function render() {
    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, currentLevel.bgColor1);
    gradient.addColorStop(1, currentLevel.bgColor2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 背景星星装饰
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 50; i++) {
        const x = (i * 73 + camera.x * 0.1) % canvas.width;
        const y = (i * 47) % 200;
        ctx.fillRect(x, y, 2, 2);
    }

    ctx.save();
    ctx.translate(-camera.x, 0);

    // 平台
    ctx.fillStyle = currentLevel.groundColor;
    for (const plat of currentLevel.platforms) {
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        // 顶部高光
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(plat.x, plat.y, plat.w, 3);
        ctx.fillStyle = currentLevel.groundColor;
    }

    // 金币
    for (const coin of currentLevel.coins) {
        if (!coin.collected) {
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(coin.x, coin.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffed4a';
            ctx.beginPath();
            ctx.arc(coin.x - 2, coin.y - 2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 宝箱
    for (const chest of currentLevel.chests) {
        ctx.fillStyle = chest.opened ? '#555' : '#8b4513';
        ctx.fillRect(chest.x, chest.y, 36, 28);
        ctx.fillStyle = chest.opened ? '#333' : '#daa520';
        ctx.fillRect(chest.x, chest.y + 10, 36, 4);
        if (!chest.opened) {
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(chest.x + 15, chest.y + 8, 6, 8);
        }
    }

    // NPC
    for (const npc of currentLevel.npcs) {
        ctx.font = '28px Arial';
        ctx.fillText(npc.icon, npc.x - 14, npc.y);
        // 交互提示
        const dx = Math.abs(player.x - npc.x);
        if (dx < 50) {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            ctx.font = '12px Arial';
            ctx.fillText('按 E 对话', npc.x - 20, npc.y - 40);
        }
    }

    // 敌人
    for (const enemy of currentLevel.enemies) {
        if (!enemy.defeated) {
            const emoji = enemy.type === 'bug_slime' ? '🟢' :
                enemy.type === 'bug_worm' ? '🐛' : '🦟';
            ctx.font = '24px Arial';
            ctx.fillText(emoji, enemy.x - 12, enemy.y);
        }
    }

    // 终点旗帜
    const goal = currentLevel.goal;
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(goal.x + 18, goal.y, 4, 60);
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.moveTo(goal.x + 22, goal.y);
    ctx.lineTo(goal.x + 50, goal.y + 15);
    ctx.lineTo(goal.x + 22, goal.y + 30);
    ctx.fill();

    // 玩家绘制
    if (player.invincible === 0 || Math.floor(player.invincible / 4) % 2 === 0) {
        // 身体
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(player.x + 4, player.y + 12, 20, 20);

        // 头
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(player.x + 6, player.y, 16, 14);

        // 眼睛
        ctx.fillStyle = '#333';
        const eyeOffset = player.facing > 0 ? 4 : -4;
        ctx.fillRect(player.x + 10 + eyeOffset, player.y + 5, 3, 3);

        // 腿
        ctx.fillStyle = '#7b2cbf';
        const legOffset = player.onGround && Math.abs(player.vx) > 0.5 ?
            Math.sin(player.animFrame * 1.5) * 3 : 0;
        ctx.fillRect(player.x + 6, player.y + 32, 6, 8 + legOffset);
        ctx.fillRect(player.x + 16, player.y + 32, 6, 8 - legOffset);

        // 剑
        ctx.fillStyle = '#ccc';
        const swordX = player.facing > 0 ? player.x + 24 : player.x - 4;
        ctx.fillRect(swordX, player.y + 14, 4, 16);
    }

    // 粒子效果
    for (const p of particles) {
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;

    ctx.restore();
}

// ========== 碰撞检测 ==========
function checkCollision(a, b) {
    return a.x < b.x + b.w &&
        a.x + a.width > b.x &&
        a.y < b.y + b.h &&
        a.y + a.height > b.y;
}

// ========== 粒子效果 ==========
function spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 2,
            color,
            size: 3 + Math.random() * 3,
            life: 30,
            maxLife: 30
        });
    }
}

// ========== 对话系统 ==========
function talkToNPC(npc) {
    if (npc.isShop) {
        openShop();
        return;
    }

    currentDialog = npc;
    dialogIndex = 0;
    gameState = GameState.DIALOG;

    document.getElementById('dialogSpeaker').textContent = npc.name;
    document.getElementById('dialogText').textContent = npc.dialogs[0];
    document.getElementById('dialogBox').style.display = 'block';
}

function showDialogBox(speaker, texts, callback) {
    currentDialog = { name: speaker, dialogs: texts, callback };
    dialogIndex = 0;
    gameState = GameState.DIALOG;

    document.getElementById('dialogSpeaker').textContent = speaker;
    document.getElementById('dialogText').textContent = texts[0];
    document.getElementById('dialogBox').style.display = 'block';
}

function advanceDialog() {
    dialogIndex++;
    if (dialogIndex >= currentDialog.dialogs.length) {
        closeDialog();
        if (currentDialog.callback) currentDialog.callback();
    } else {
        document.getElementById('dialogText').textContent = currentDialog.dialogs[dialogIndex];
    }
}

function closeDialog() {
    document.getElementById('dialogBox').style.display = 'none';
    gameState = GameState.PLAYING;
    currentDialog = null;
    gameLoop();
}

// ========== 交互检测 ==========
function checkInteraction() {
    // NPC交互
    for (const npc of currentLevel.npcs) {
        const dx = Math.abs(player.x - npc.x);
        if (dx < 50) {
            talkToNPC(npc);
            return;
        }
    }

    // 宝箱交互
    for (const chest of currentLevel.chests) {
        if (!chest.opened) {
            const dx = Math.abs(player.x - chest.x);
            if (dx < 50) {
                openChest(chest);
                return;
            }
        }
    }
}

// ========== 战斗系统 ==========
function startBattle(enemy) {
    gameState = GameState.BATTLE;
    currentBattle = enemy;

    const questions = questionBank[enemy.topic];
    const q = questions[Math.floor(Math.random() * questions.length)];

    document.getElementById('battleEnemy').textContent =
        enemy.type === 'bug_slime' ? '🟢' :
            enemy.type === 'bug_worm' ? '🐛' : '🦟';

    // 重置战斗面板样式
    const battlePanel = document.querySelector('.battle-panel');
    battlePanel.style.borderColor = 'var(--danger)';
    document.querySelector('.battle-header h3').textContent = '⚔️ 遭遇战！';
    document.querySelector('.battle-header p').textContent = '答对C语言题目击败敌人';

    document.getElementById('battleQuestion').textContent = q.q;
    document.getElementById('battleCode').style.display = 'none';

    const optionsHtml = q.options.map((opt, idx) =>
        `<div class="battle-option" onclick="answerBattle(${idx}, ${q.answer})">
            ${String.fromCharCode(65 + idx)}. ${opt}
        </div>`
    ).join('');

    document.getElementById('battleOptions').innerHTML = optionsHtml;
    document.getElementById('battleOverlay').style.display = 'flex';
}

function answerBattle(selected, correct) {
    const options = document.querySelectorAll('.battle-option');

    if (selected === correct) {
        options[selected].classList.add('correct');
        // 击败敌人
        currentBattle.defeated = true;
        stats.enemies++;
        const reward = 10 + Math.floor(Math.random() * 10);
        player.coins += reward;
        stats.coins += reward;
        document.getElementById('coinCount').textContent = player.coins;

        setTimeout(() => {
            closeBattle();
            player.invincible = 60;
            spawnParticles(currentBattle.x, currentBattle.y, '#00ff88', 10);
        }, 800);
    } else {
        options[selected].classList.add('wrong');
        options[correct].classList.add('correct');

        if (hasShield) {
            hasShield = false;
            showToast('护盾抵挡了伤害！', 'info');
        } else {
            player.health -= 20;
            updateHealthBar();
        }

        setTimeout(() => {
            closeBattle();
            player.invincible = 90;
            // 击退效果
            player.x += player.facing > 0 ? -50 : 50;
        }, 1000);
    }
}

function closeBattle() {
    document.getElementById('battleOverlay').style.display = 'none';
    gameState = GameState.PLAYING;
    currentBattle = null;
    gameLoop();
}

// ========== 宝箱系统 ==========
function openChest(chest) {
    gameState = GameState.BATTLE;

    const questions = questionBank[chest.topic];
    const q = questions[Math.floor(Math.random() * questions.length)];

    document.getElementById('battleEnemy').textContent = '📦';
    document.querySelector('.battle-panel').style.borderColor = 'var(--warning)';
    document.querySelector('.battle-header h3').textContent = '🎁 神秘宝箱';
    document.querySelector('.battle-header p').textContent = '答对题目开启宝箱获得金币';
    document.getElementById('battleQuestion').textContent = q.q;
    document.getElementById('battleCode').style.display = 'none';

    const optionsHtml = q.options.map((opt, idx) =>
        `<div class="battle-option" onclick="answerChest(${idx}, ${q.answer}, ${currentLevel.chests.indexOf(chest)})">
            ${String.fromCharCode(65 + idx)}. ${opt}
        </div>`
    ).join('');

    document.getElementById('battleOptions').innerHTML = optionsHtml;
    document.getElementById('battleOverlay').style.display = 'flex';
}

function answerChest(selected, correct, chestIndex) {
    const options = document.querySelectorAll('.battle-option');
    const chest = currentLevel.chests[chestIndex];

    if (selected === correct) {
        options[selected].classList.add('correct');
        chest.opened = true;
        stats.chests++;
        player.coins += chest.reward;
        stats.coins += chest.reward;
        document.getElementById('coinCount').textContent = player.coins;

        setTimeout(() => {
            closeBattle();
            spawnParticles(chest.x + 18, chest.y, '#ffd700', 15);
        }, 1000);
    } else {
        options[selected].classList.add('wrong');
        options[correct].classList.add('correct');

        setTimeout(() => {
            closeBattle();
        }, 1500);
    }
}

// ========== 商店系统 ==========
function openShop() {
    gameState = GameState.SHOP;

    const itemsHtml = shopItems.map(item => `
        <div class="shop-item">
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-info">
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-desc">${item.desc}</div>
            </div>
            <span class="shop-item-price">🪙 ${item.price}</span>
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" 
                    onclick="buyItem('${item.id}', ${item.price})">购买</button>
        </div>
    `).join('');

    document.getElementById('shopItems').innerHTML = itemsHtml;
    document.getElementById('shopOverlay').style.display = 'flex';
}

function buyItem(id, price) {
    if (player.coins < price) {
        showToast('金币不足！', 'error');
        return;
    }

    player.coins -= price;
    document.getElementById('coinCount').textContent = player.coins;

    switch (id) {
        case 'potion':
            player.health = Math.min(player.maxHealth, player.health + 30);
            updateHealthBar();
            showToast('恢复了30点生命值！', 'success');
            break;
        case 'shield':
            hasShield = true;
            showToast('获得护盾保护！', 'success');
            break;
        case 'magnet':
            hasMagnet = true;
            showToast('金币磁铁已激活！', 'success');
            break;
    }
}

function closeShop() {
    document.getElementById('shopOverlay').style.display = 'none';
    gameState = GameState.PLAYING;
    gameLoop();
}

// ========== UI更新 ==========
function updateHealthBar() {
    const pct = (player.health / player.maxHealth) * 100;
    document.getElementById('healthBar').style.width = pct + '%';
}