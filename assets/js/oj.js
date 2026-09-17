(function () {
    /* Wasm 编译器依赖走「本站同源代理」/vendor/npm/...
       —— 由 server.js 首次从 CDN 取回后缓存到 .cache/vendor，之后本地直读。
       这样编译器与 AI、图片共用同一个端口/源，不再需要额外开一个 HTTP 服务。
       如果页面被放到别的静态服务器（没有 /vendor 代理），自动回退到 CDN。 */
    const COMPILER_SOURCES = [
        '/vendor/npm/browsercc@0.1.1/dist/index.js',
        'https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js'
    ];
    const WASI_SOURCES = [
        '/vendor/npm/@bjorn3/browser_wasi_shim@0.4.2/dist/index.js',
        'https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim@0.4.2/dist/index.js'
    ];
    /* 首次需要下载并缓存约 95 MB（clang.wasm 42MB + lld.wasm 23MB + sysroot.tar 29MB），
       同源缓存后再次打开基本是秒开，所以超时给得宽松一些。 */
    const COMPILE_TIMEOUT_MS = 300000;
    const SERVER_HINT = '请先运行 start.bat（或 node server.js），再用 http://localhost:3000/oj.html 打开本页。';
    const PASSED_KEY = 'cm_oj_passed';
    const LESSON_SIZE = 3;
    let compilerPromise;

    /* ============================================================
       题库：9 个课程专题 × 5 节课 × 每节 3 题（由 assets/js/oj-data.js 提供）
       ============================================================ */
    const COURSES = typeof OJ_COURSES !== 'undefined' ? OJ_COURSES : [];
    const CHAPTER_TITLES = typeof OJ_CHAPTER_TITLES !== 'undefined'
        ? OJ_CHAPTER_TITLES
        : ['核心概念与基本模型', '常见写法与执行过程', '数据变化与边界情况', '调试方法与代码质量', '综合练习与迁移应用'];
    const problems = (typeof OJ_PROBLEMS !== 'undefined' ? OJ_PROBLEMS : []).map(function (item, index) {
        return Object.assign({}, item, { order: index });
    });
    const courseById = {};
    COURSES.forEach(function (course) { courseById[course.id] = course; });

    /* 把题目按「课程 → 课节」折叠成组，每组固定 3 题 */
    const groups = [];
    const groupIndexById = {};
    problems.forEach(function (problem) {
        const key = problem.courseId + '#' + problem.chapter;
        let group = groupIndexById[key];
        if (!group) {
            const course = courseById[problem.courseId] || { id: problem.courseId, title: problem.courseId, icon: '📘', accent: '#00d4ff' };
            group = {
                key: key,
                courseId: problem.courseId,
                course: course,
                chapter: problem.chapter,
                lesson: problem.lesson || CHAPTER_TITLES[problem.chapter - 1] || '',
                problems: []
            };
            groupIndexById[key] = group;
            groups.push(group);
        }
        group.problems.push(problem);
    });
    const problemIndexById = {};
    problems.forEach(function (problem, index) { problemIndexById[problem.id] = index; });

    /* 首次加载时清掉旧版本（只有 6 题）留下的通过记录：数字对不上会误导统计 */
    const PASSED_VERSION_KEY = 'cm_oj_passed_v2';
    function loadPassed() {
        try {
            if (localStorage.getItem(PASSED_VERSION_KEY) !== '2') {
                localStorage.removeItem(PASSED_KEY);
                localStorage.setItem(PASSED_VERSION_KEY, '2');
                return [];
            }
            const stored = JSON.parse(localStorage.getItem(PASSED_KEY) || '[]');
            return Array.isArray(stored) ? stored.filter(function (id) { return problemIndexById[id] !== undefined; }) : [];
        } catch (error) {
            return [];
        }
    }
    function savePassed() {
        try { localStorage.setItem(PASSED_KEY, JSON.stringify(state.passed)); } catch (error) { /* 忽略隐私模式 */ }
    }

    /* URL 参数：oj.html?course=basics&chapter=3&id=7（课程中心「练」按钮会带上 course） */
    function readQuery() {
        const params = new URLSearchParams(location.search);
        const courseId = params.get('course');
        const chapter = Number(params.get('chapter'));
        const id = Number(params.get('id'));
        return {
            courseId: courseId && courseById[courseId] ? courseId : null,
            chapter: chapter >= 1 && chapter <= 5 ? chapter : null,
            id: problemIndexById[id] !== undefined ? id : null
        };
    }

    const initial = readQuery();
    const startProblemId = initial.id
        || (problems.find(function (p) { return initial.courseId && p.courseId === initial.courseId; }) || problems[0] || {}).id;

    const state = {
        current: startProblemId,
        filter: initial.courseId || 'all',
        passed: loadPassed(),
        expanded: {},
        solvedBefore: 0
    };
    if (initial.courseId) {
        const key = initial.courseId + '#' + (initial.chapter || (problems.find(function (p) { return p.id === startProblemId; }) || {}).chapter || 1);
        state.expanded[key] = true;
    }

    const $ = selector => document.querySelector(selector);

    /* ============================================================
       编译器加载
       ============================================================ */
    async function importFirst(urls) {
        let lastError;
        for (const url of urls) {
            try {
                return { mod: await import(url), url };
            } catch (error) {
                lastError = error;
            }
        }
        throw lastError || new Error('无法加载模块');
    }
    function setCompilerStatus(label, ready) {
        const status = $('#compilerStatus');
        if (!status) return;
        status.classList.toggle('is-ready', ready);
        status.classList.toggle('is-error', !ready);
        status.querySelector('span').style.background = ready ? '#00ff88' : '#ffc857';
        status.querySelector('span').style.boxShadow = ready ? '0 0 10px #00ff88' : '0 0 10px #ffc857';
        status.lastChild.textContent = ` ${label}`;
    }
    function loadCompiler() {
        if (!compilerPromise) {
            compilerPromise = Promise.all([
                importFirst(COMPILER_SOURCES),
                importFirst(WASI_SOURCES)
            ]).then(([compiler, wasi]) => ({
                compile: compiler.mod.compile,
                File: wasi.mod.File,
                OpenFile: wasi.mod.OpenFile,
                ConsoleStdout: wasi.mod.ConsoleStdout,
                WASI: wasi.mod.WASI,
                source: compiler.url.startsWith('/') ? '本站同源代理' : 'jsDelivr CDN'
            })).then(runtime => {
                setCompilerStatus(`Wasm 编译器已就绪（${runtime.source}）`, true);
                return runtime;
            }).catch(error => {
                setCompilerStatus('Wasm 加载失败，将使用结构检查', false);
                throw error;
            });
        }
        return compilerPromise;
    }

    /* ============================================================
       左侧题目列表：每三题一组，点击展开
       ============================================================ */
    function visibleGroups() {
        return state.filter === 'all'
            ? groups
            : groups.filter(function (group) { return group.courseId === state.filter; });
    }
    function groupSolvedCount(group) {
        return group.problems.filter(function (problem) { return state.passed.includes(problem.id); }).length;
    }
    /* 当前筛选范围内的课程 + 通过情况，显示在列表顶部 */
    function renderCourseSummary() {
        const node = $('#courseSummary');
        if (!node) return;
        if (state.filter === 'all') { node.innerHTML = ''; node.hidden = true; return; }
        const course = courseById[state.filter];
        const list = visibleGroups();
        const total = list.reduce(function (sum, group) { return sum + group.problems.length; }, 0);
        const solved = list.reduce(function (sum, group) { return sum + groupSolvedCount(group); }, 0);
        const percent = total ? Math.round(solved / total * 100) : 0;
        node.hidden = false;
        node.innerHTML = `<strong>${course.icon} ${course.title}</strong>
            <span class="bar"><i style="width:${percent}%"></i></span>
            <em>${solved}/${total}</em>`;
    }
    function currentCourseId() {
        const problem = problems[problemIndexById[state.current]];
        return problem ? problem.courseId : (COURSES[0] || {}).id;
    }

    function renderCourseTabs() {
        /* 始终显示全部 9 个课程，方便跨课程跳转；点击后只显示该课程的题目 */
        const tabs = ['<button class="filter-tab ' + (state.filter === 'all' ? 'active' : '') + '" data-filter="all">全部课程</button>'];
        COURSES.forEach(function (course) {
            const active = state.filter === course.id ? ' active' : '';
            tabs.push(`<button class="filter-tab${active}" data-filter="${course.id}"><span class="tab-icon">${course.icon}</span>${course.title}</button>`);
        });
        $('#courseFilter').innerHTML = tabs.join('');
        $('#courseFilter').querySelectorAll('.filter-tab').forEach(function (tab) {
            tab.addEventListener('click', function () { setFilter(tab.dataset.filter); });
        });
    }

    function renderList() {
        const list = visibleGroups();
        let html = '';
        list.forEach(function (group) {
            const solved = groupSolvedCount(group);
            const expanded = !!state.expanded[group.key];
            const activeInside = group.problems.some(function (problem) { return problem.id === state.current; });
            html += `<section class="lesson-group${expanded ? ' expanded' : ''}${activeInside ? ' has-active' : ''}${solved === group.problems.length ? ' is-clear' : ''}" data-key="${group.key}" style="--lesson-accent:${group.course.accent}">
                <button class="lesson-head" data-key="${group.key}" aria-expanded="${expanded}">
                    <span class="lesson-caret" aria-hidden="true">▸</span>
                    <span class="lesson-head-main">
                        <span class="lesson-head-title">第 ${group.chapter} 节 · ${group.lesson}</span>
                        <span class="lesson-head-sub">${group.course.icon} ${group.course.title}</span>
                    </span>
                    <span class="lesson-track" aria-hidden="true"><i style="width:${Math.round(solved / group.problems.length * 100)}%"></i></span>
                    <span class="lesson-badge${solved === group.problems.length ? ' done' : ''}">${solved}/${group.problems.length}</span>
                </button>
                <div class="lesson-body"><div class="lesson-items">`;
            group.problems.forEach(function (problem) {
                const passed = state.passed.includes(problem.id);
                const justChecked = state.justChecked === problem.id ? ' just-checked' : '';
                html += `<button class="problem-item${problem.id === state.current ? ' active' : ''}${passed ? ' solved' : ''}" data-id="${problem.id}">
                    <span class="problem-number">${String(group.problems.indexOf(problem) + 1).padStart(2, '0')}</span>
                    <span class="problem-name">${problem.title}</span>
                    <span class="problem-tag ${problem.level}">${problem.label}</span>
                    <span class="passed-mark${justChecked}">${passed ? '✓' : ''}</span>
                </button>`;
            });
            html += `</div></div></section>`;
        });
        const panel = $('#problemList');
        panel.innerHTML = html || '<div class="list-empty">该课程暂无题目</div>';
        renderCourseSummary();
        panel.querySelectorAll('.lesson-head').forEach(function (head) {
            head.addEventListener('click', function () { toggleLesson(head.dataset.key); });
        });
        panel.querySelectorAll('.problem-item').forEach(function (item) {
            item.addEventListener('click', function () { selectProblem(Number(item.dataset.id)); });
        });
        const meta = $('#panelCount');
        if (meta) {
            meta.textContent = `${problems.length} problems · ${groups.length} lessons`;
        }
    }

    function toggleLesson(key, force) {
        const next = typeof force === 'boolean' ? force : !state.expanded[key];
        state.expanded[key] = next;
        const node = document.querySelector(`.lesson-group[data-key="${key}"]`);
        if (node) {
            node.classList.toggle('expanded', next);
            const head = node.querySelector('.lesson-head');
            if (head) head.setAttribute('aria-expanded', String(next));
        }
    }
    function expandAll(expand) {
        visibleGroups().forEach(function (group) { state.expanded[group.key] = expand; });
        document.querySelectorAll('.lesson-group').forEach(function (node) {
            node.classList.toggle('expanded', expand);
            const head = node.querySelector('.lesson-head');
            if (head) head.setAttribute('aria-expanded', String(expand));
        });
        const button = $('#toggleAll');
        if (button) button.textContent = expand ? '▴ 收起全部' : '▾ 展开全部';
    }

    function setFilter(filter) {
        state.filter = filter;
        renderCourseTabs();
        const list = visibleGroups();
        if (!list.some(function (group) { return group.problems.some(function (problem) { return problem.id === state.current; }); })) {
            const first = list[0];
            if (first) {
                state.expanded[first.key] = true;
                state.current = first.problems[0].id;
            }
        }
        render();
    }

    function selectProblem(id) {
        const problem = problems[problemIndexById[id]];
        if (!problem) return;
        state.current = id;
        state.justChecked = null;
        try { localStorage.setItem('cm_oj_last', String(id)); } catch (error) { /* 忽略隐私模式 */ }
        let reveal = null;
        groups.forEach(function (group) {
            if (group.problems.some(function (item) { return item.id === id; })) {
                state.expanded[group.key] = true;
                reveal = group.key;
            }
        });
        render();
        if (reveal) {
            const node = document.querySelector(`.lesson-group[data-key="${reveal}"]`);
            if (node && node.scrollIntoView) node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    /* 同步地址栏，刷新或分享链接后仍能回到同一题 */
    function syncUrl(problem) {
        if (!history.replaceState) return;
        const query = `?course=${problem.courseId}&chapter=${problem.chapter}&id=${problem.id}`;
        history.replaceState(null, '', location.pathname + query);
    }

    /* ============================================================
       右侧题目详情
       ============================================================ */
    function renderDetail() {
        const problem = problems[problemIndexById[state.current]] || problems[0];
        if (!problem) return;
        const group = groupIndexById[problem.courseId + '#' + problem.chapter];
        const siblings = group ? group.problems : [problem];
        const publicCases = problem.publicCases || [{ input: problem.input, output: problem.output }];
        const casePreview = publicCases.map(function (item, index) {
            return `<span class="example"><b>公开 ${index + 1}</b> 输入：${escapeHtml(item.input)} · 输出：${escapeHtml(item.output)}</span>`;
        }).join('');
        const switcher = siblings.map(function (item) {
            const passed = state.passed.includes(item.id);
            return `<button class="lesson-chip${item.id === problem.id ? ' active' : ''}${passed ? ' solved' : ''}" data-id="${item.id}">
                <b>第 ${siblings.indexOf(item) + 1} 题</b><span>${item.label}</span><i>${passed ? '✓ 已通过' : item.title}</i>
            </button>`;
        }).join('');
        $('#problemDetail').innerHTML = `
            <div class="detail-meta"><b>#${String(problem.id).padStart(3, '0')}</b><span>${problem.label}</span><span>·</span><span>标准输入输出</span></div>
            <div class="lesson-strip">
                <span class="lesson-strip-label">${group ? group.course.icon + ' ' + group.course.title : ''} · 第 ${problem.chapter} 节 ${problem.lesson}</span>
                <div class="lesson-switch">${switcher}</div>
            </div>
            <h2>${problem.title}</h2>
            <p>${problem.description}</p>
            <div class="examples">${casePreview}<span class="example hidden-case">隐藏测试点：${(problem.hiddenCases || []).length} 个</span></div>
            <div class="io-spec">
                <div><b>输入格式</b><span>${escapeHtml(problem.input)}</span></div>
                <div><b>输出格式</b><span>${escapeHtml(problem.output)}</span></div>
            </div>`;
        $('#problemDetail').querySelectorAll('.lesson-chip').forEach(function (chip) {
            chip.addEventListener('click', function () { selectProblem(Number(chip.dataset.id)); });
        });
        $('#editorFileName').textContent = 'main.c';
        $('#codeEditor').value = problem.starter;
        $('#resultBox').innerHTML = '<div class="result-placeholder"><span>⌁</span><div><strong>准备好了吗？</strong><p>点击“提交并运行”，浏览器会加载 Wasm 编译器并运行全部测试点。</p></div></div>';
        syncUrl(problem);
    }

    function escapeHtml(text) {
        return String(text === undefined || text === null ? '' : text)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderProgress() {
        $('#solvedCount').textContent = state.passed.length;
        $('#solvedTotal').textContent = problems.length;
        const bar = $('#solvedBar');
        if (bar) {
            const percent = problems.length ? Math.round(state.passed.length / problems.length * 100) : 0;
            bar.style.width = percent + '%';
        }
    }
    function render() {
        renderList();
        renderDetail();
        renderProgress();
    }

    /* ============================================================
       判题
       ============================================================ */
    function normalizeOutput(output) {
        return output.replace(/\r\n/g, '\n').trim();
    }
    function stripComments(source) {
        return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    }
    function checkStructure(source) {
        const code = stripComments(source).trim();
        const pairs = { ')': '(', ']': '[', '}': '{' };
        const stack = [];
        let quote = '';
        let escaped = false;
        for (const character of code) {
            if (quote) {
                if (escaped) escaped = false;
                else if (character === '\\') escaped = true;
                else if (character === quote) quote = '';
                continue;
            }
            if (character === '"' || character === "'") quote = character;
            else if ('([{'.includes(character)) stack.push(character);
            else if (')]}'.includes(character) && stack.pop() !== pairs[character]) return '括号或大括号不匹配。';
        }
        if (quote) return '字符串或字符常量没有闭合。';
        if (stack.length) return '括号或大括号没有闭合。';
        if (!/\bint\s+main\s*\(/.test(code)) return '没有找到有效的 int main() 函数。';
        const lines = code.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        const missingSemicolon = lines.find(line => {
            if (/^(#|\{|\}|else\b|if\s*\(|for\s*\(|while\s*\(|switch\s*\(|case\b|default\s*:)/.test(line) || /}\s*$/.test(line)) return false;
            if (/[;,{:]$/.test(line)) return false;
            return /\b(return|break|continue|printf|scanf|int|char|float|double)\b|\w+\s*=/.test(line);
        });
        return missingSemicolon ? `第 ${lines.indexOf(missingSemicolon) + 1} 行可能缺少分号。` : '';
    }
    function judgeStructure(source, problem, reason) {
        const code = stripComments(source);
        const syntaxError = checkStructure(source);
        if (syntaxError) return { ok: false, status: 'Compile Error', mode: 'structure', message: syntaxError };
        const checks = Array.isArray(problem.checks) ? problem.checks : [];
        const failed = checks.find(function (item) {
            const pattern = String(item[0]).replace(/^\//, '').replace(/\/[gimsuy]*$/, '');
            let regex;
            try {
                regex = new RegExp(pattern);
            } catch (error) {
                return false;
            }
            return !regex.test(code);
        });
        if (failed) return { ok: false, status: 'Wrong Answer', mode: 'structure', message: `${failed[1]}\n结构检查未通过，未计入通过题目。` };
        return {
            ok: true,
            status: 'Structure Accepted',
            mode: 'structure',
            message: `已通过 ${problem.publicCases.length} 个公开规则和 ${problem.hiddenCases.length} 个隐藏规则。\n当前为 JS 严格结构检查模式，未执行 C 代码。\n${reason}`
        };
    }
    async function runModule(module, input, runtime) {
        let output = '';
        const stdin = new TextEncoder().encode(input === '无' ? '' : input + '\n');
        const stdout = new runtime.ConsoleStdout(data => { output += new TextDecoder().decode(data); });
        const stderr = new runtime.ConsoleStdout(data => { output += new TextDecoder().decode(data); });
        const wasi = new runtime.WASI([], [], [new runtime.OpenFile(new runtime.File(stdin)), stdout, stderr]);
        const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: wasi.wasiImport });
        try {
            wasi.start(instance);
        } catch (error) {
            if (error?.name !== 'WASIProcExit' || error?.code !== 0) throw error;
        }
        return output;
    }
    async function judgeWithCompiler(source, problem, setStatus) {
        if (location.protocol === 'file:') {
            throw new Error(`当前页面是用 file:// 直接打开的，浏览器不会加载 Wasm 模块。${SERVER_HINT}`);
        }
        setStatus('正在加载浏览器 C 编译器（首次约 95 MB，会缓存到本机）...');
        const runtime = await loadCompiler();
        setStatus('正在编译 C11 代码...');
        const compiled = await Promise.race([
            runtime.compile({ source, fileName: 'main.c', flags: [] }),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error('Wasm 编译器响应超时，已准备切换到 JS 严格结构检查。')), COMPILE_TIMEOUT_MS))
        ]);
        if (!compiled.module) {
            return { ok: false, status: 'Compile Error', message: compiled.compileOutput || '编译失败，请检查 C 代码。' };
        }
        const cases = [...problem.publicCases.map(item => ({ ...item, hidden: false })), ...problem.hiddenCases.map(item => ({ ...item, hidden: true }))];
        let publicPassed = 0;
        let hiddenPassed = 0;
        for (const testCase of cases) {
            setStatus(`正在运行${testCase.hidden ? '隐藏' : '公开'}测试点...`);
            const actual = normalizeOutput(await runModule(compiled.module, testCase.input, runtime));
            const expected = normalizeOutput(testCase.output);
            if (actual !== expected) {
                return { ok: false, status: 'Wrong Answer', message: `${testCase.hidden ? '隐藏' : '公开'}测试点 ${testCase.hidden ? hiddenPassed + 1 : publicPassed + 1} 未通过。\n输入：${testCase.input}\n期望输出：${expected || '（空）'}\n实际输出：${actual || '（空）'}\n公开测试点 ${publicPassed}/${problem.publicCases.length}，隐藏测试点 ${hiddenPassed}/${problem.hiddenCases.length}。` };
            }
            if (testCase.hidden) hiddenPassed += 1;
            else publicPassed += 1;
        }
        return { ok: true, status: 'Accepted', message: `公开测试点 ${publicPassed}/${problem.publicCases.length}，隐藏测试点 ${hiddenPassed}/${problem.hiddenCases.length}。\n代码已在浏览器内通过真实 C11 编译和运行。` };
    }
    function markPassed(problem) {
        if (state.passed.includes(problem.id)) return;
        state.passed.push(problem.id);
        savePassed();
        state.justChecked = problem.id;
        renderList();
        renderProgress();
        renderDetail();
    }

    /* ============================================================
       自由编程区
       ============================================================ */
    async function runFreeCode() {
        const source = $('#freeCodeEditor').value;
        const input = $('#freeCodeInput').value;
        const button = $('#runFreeCode');
        const output = $('#freeCodeOutput');
        button.disabled = true;
        button.textContent = '⏳ 运行中...';
        output.className = 'free-output-pending';
        output.textContent = '正在加载 Wasm 编译器并编译代码...';
        try {
            if (location.protocol === 'file:') throw new Error(`file:// 下无法加载 Wasm 模块。${SERVER_HINT}`);
            const runtime = await loadCompiler();
            const compiled = await Promise.race([
                runtime.compile({ source, fileName: 'playground.c', flags: [] }),
                new Promise((resolve, reject) => setTimeout(() => reject(new Error('编译超时，请检查代码或稍后重试。')), COMPILE_TIMEOUT_MS))
            ]);
            if (!compiled.module) throw new Error(compiled.compileOutput || '编译失败，请检查 C 代码。');
            output.textContent = await runModule(compiled.module, input, runtime) || '（程序没有输出）';
            output.className = 'free-output-success';
        } catch (error) {
            output.textContent = error.message || '运行失败。';
            output.className = 'free-output-error';
        } finally {
            button.disabled = false;
            button.textContent = '▶ 运行代码';
        }
    }

    async function submit() {
        const problem = problems[problemIndexById[state.current]];
        const source = $('#codeEditor').value;
        $('#submitCode').disabled = true;
        $('#submitCode').textContent = '⏳ 判题中...';
        $('#resultBox').innerHTML = '<div class="result-placeholder"><span>⌁</span><div><strong>正在检查代码</strong><p>判题器正在编译代码并运行公开与隐藏测试点。</p></div></div>';
        try {
            if (!problem) throw new Error('题目不存在');
            const result = await judgeWithCompiler(source, problem, status => {
                $('#resultBox').innerHTML = `<div class="result-placeholder"><span>⌁</span><div><strong>正在判题</strong><p>${status}</p></div></div>`;
            });
            $('#resultBox').innerHTML = result.ok
                ? `<div class="result-success result-title">✓ ${result.mode === 'structure' ? 'Structure Accepted · 结构检查通过' : 'Accepted · 通过测试'}</div><pre>${escapeHtml(result.message)}\n${result.mode === 'structure' ? 'Wasm 编译器不可用，已切换为 JS 严格结构检查。' : '本页面使用浏览器内 Wasm 编译器完成判题。'}</pre>`
                : `<div class="result-fail result-title">× ${result.status} · 未通过</div><pre>${escapeHtml(result.message)}</pre>`;
            if (result.ok) markPassed(problem);
        } catch (error) {
            const fallback = judgeStructure(source, problem, error.message || 'Wasm 编译器未能完成初始化。');
            $('#resultBox').innerHTML = fallback.ok
                ? `<div class="result-success result-title">✓ Structure Accepted · 结构检查通过</div><pre>${escapeHtml(fallback.message)}\nWasm 编译器不可用，已切换为 JS 严格结构检查。</pre>`
                : `<div class="result-fail result-title">× ${fallback.status} · 未通过</div><pre>${escapeHtml(fallback.message)}\nWasm 判题失败原因：${escapeHtml(error.message || '未知错误')}</pre>`;
            if (fallback.ok) markPassed(problem);
        } finally {
            $('#submitCode').disabled = false;
            $('#submitCode').textContent = '▶ 提交并运行';
        }
    }

    /* ============================================================
       初始化
       ============================================================ */
    function initStars() {
        const starField = document.querySelector('#starField');
        if (!starField) return;
        for (let index = 0; index < 60; index += 1) {
            const star = document.createElement('span');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            starField.appendChild(star);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        initStars();
        if (!problems.length) {
            setCompilerStatus('题库数据加载失败', false);
            return;
        }
        renderCourseTabs();
        $('#submitCode').addEventListener('click', submit);
        $('#resetCode').addEventListener('click', () => { $('#codeEditor').value = problems[problemIndexById[state.current]].starter; });
        $('#runFreeCode').addEventListener('click', runFreeCode);
        $('#clearFreeCode').addEventListener('click', () => { $('#freeCodeOutput').className = ''; $('#freeCodeOutput').textContent = '点击“运行代码”查看输出。'; });
        const toggleAll = $('#toggleAll');
        if (toggleAll) {
            toggleAll.addEventListener('click', () => {
                const allOpen = visibleGroups().every(group => state.expanded[group.key]);
                expandAll(!allOpen);
            });
        }
        render();
        /* 从课程中心「练」按钮进来时，把当前课节滚进视野 */
        const group = groupIndexById[problems[problemIndexById[state.current]].courseId + '#' + problems[problemIndexById[state.current]].chapter];
        if (group && initial.courseId) {
            const node = document.querySelector(`.lesson-group[data-key="${group.key}"]`);
            if (node && node.scrollIntoView) node.scrollIntoView({ block: 'center' });
        }
    });
})();
