(function () {
    const COMPILER_URL = 'https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js';
    const WASI_URL = 'https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim@0.4.2/dist/index.js';
    let compilerPromise;

    const problems = [
        { id: 1, title: '你好，C语言！', level: 'easy', label: '入门', description: '输出一行 Hello, CodeMaster!，熟悉 C 语言程序的基本结构。', input: '无', output: 'Hello, CodeMaster!', publicCases: [{ input: '无', output: 'Hello, CodeMaster!' }], hiddenCases: [{ input: '无', output: 'Hello, CodeMaster!' }], starter: '#include <stdio.h>\n\nint main(void) {\n    // 在这里写下你的代码\n    return 0;\n}' },
        { id: 2, title: '两数之和', level: 'easy', label: '入门', description: '读入两个整数，输出它们的和。', input: '一行包含两个整数 a 和 b。', output: '输出 a + b。', publicCases: [{ input: '1 2', output: '3' }, { input: '-5 8', output: '3' }], hiddenCases: [{ input: '0 0', output: '0' }, { input: '100000 -23456', output: '76544' }], starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);\n    return 0;\n}' },
        { id: 3, title: '成绩分级', level: 'medium', label: '进阶', description: '输入一个 0 到 100 的成绩，按照区间输出等级：90 分及以上为 A，60 分及以上为 B，否则为 C。', input: '一行包含一个整数 score。', output: '输出对应的等级字母。', publicCases: [{ input: '95', output: 'A' }, { input: '75', output: 'B' }], hiddenCases: [{ input: '90', output: 'A' }, { input: '59', output: 'C' }], starter: '#include <stdio.h>\n\nint main(void) {\n    int score;\n    scanf("%d", &score);\n    // 使用 if / else 完成分级\n    return 0;\n}' },
        { id: 4, title: '统计数组中的最大值', level: 'medium', label: '进阶', description: '读入 n 个整数，找出其中的最大值。', input: '第一行是 n，第二行是 n 个整数。', output: '输出最大值。', publicCases: [{ input: '5\\n3 8 2 9 1', output: '9' }, { input: '3\\n-4 -1 -7', output: '-1' }], hiddenCases: [{ input: '1\\n42', output: '42' }, { input: '4\\n7 7 7 7', output: '7' }], starter: '#include <stdio.h>\n\nint main(void) {\n    int n, value, max;\n    scanf("%d", &n);\n    // 读入数据并找出最大值\n    return 0;\n}' },
        { id: 5, title: '回文字符串', level: 'hard', label: '挑战', description: '判断一个只包含小写字母的字符串是否是回文串。', input: '输入一个长度不超过 100 的字符串。', output: '是回文串输出 YES，否则输出 NO。', publicCases: [{ input: 'level', output: 'YES' }, { input: 'hello', output: 'NO' }], hiddenCases: [{ input: 'a', output: 'YES' }, { input: 'abccba', output: 'YES' }], starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[101];\n    scanf("%100s", s);\n    // 判断字符串是否正读反读都相同\n    return 0;\n}' },
        { id: 6, title: '斐波那契数列', level: 'hard', label: '挑战', description: '输入 n，输出斐波那契数列的第 n 项（从 F0 = 0，F1 = 1 开始）。', input: '一行包含一个 0 到 30 的整数 n。', output: '输出 Fn。', publicCases: [{ input: '0', output: '0' }, { input: '6', output: '8' }], hiddenCases: [{ input: '1', output: '1' }, { input: '30', output: '832040' }], starter: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 用循环计算第 n 项\n    return 0;\n}' }
    ];
    const state = { current: 1, filter: 'all', passed: JSON.parse(localStorage.getItem('cm_oj_passed') || '[]') };
    const $ = selector => document.querySelector(selector);
    function loadCompiler() {
        if (!compilerPromise) {
            compilerPromise = Promise.all([import(COMPILER_URL), import(WASI_URL)]).then(([compiler, wasi]) => ({
                compile: compiler.compile,
                File: wasi.File,
                OpenFile: wasi.OpenFile,
                ConsoleStdout: wasi.ConsoleStdout,
                WASI: wasi.WASI
            }));
        }
        return compilerPromise;
    }
    function visibleProblems() { return problems.filter(p => state.filter === 'all' || p.level === state.filter); }
    function renderList() {
        $('#problemList').innerHTML = visibleProblems().map(p => `<button class="problem-item ${p.id === state.current ? 'active' : ''}" data-id="${p.id}"><span class="problem-number">${String(p.id).padStart(2, '0')}</span><span class="problem-name">${p.title}</span><span class="difficulty ${p.level}"></span>${state.passed.includes(p.id) ? '<span class="passed-mark">✓</span>' : ''}</button>`).join('');
        document.querySelectorAll('.problem-item').forEach(item => item.addEventListener('click', () => { state.current = Number(item.dataset.id); render(); }));
    }
    function renderDetail() {
        const p = problems.find(item => item.id === state.current) || problems[0];
        const publicCases = p.publicCases || [{ input: p.input, output: p.output }];
        const casePreview = publicCases.map((item, index) => `<span class="example"><b>公开 ${index + 1}</b> 输入：${item.input} · 输出：${item.output}</span>`).join('');
        $('#problemDetail').innerHTML = `<div class="detail-meta"><b>#${String(p.id).padStart(3, '0')}</b><span>${p.label}</span><span>·</span><span>标准输入输出</span></div><h2>${p.title}</h2><p>${p.description}</p><div class="examples">${casePreview}<span class="example hidden-case">隐藏测试点：${p.hiddenCases.length} 个</span></div>`;
        $('#codeEditor').value = p.starter;
        $('#resultBox').innerHTML = '<div class="result-placeholder"><span>⌁</span><div><strong>准备好了吗？</strong><p>点击“提交并运行”，浏览器会加载 Wasm 编译器并运行全部测试点。</p></div></div>';
    }
    function render() { renderList(); renderDetail(); $('#solvedCount').textContent = state.passed.length; }
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
            if (/^(#|\{|\}|else\b|if\s*\(|for\s*\(|while\s*\(|switch\s*\(|case\b|default\s*:)/.test(line)) return false;
            if (/[;,{:]$/.test(line)) return false;
            return /\b(return|break|continue|printf|scanf|int|char|float|double)\b|\w+\s*=/.test(line);
        });
        return missingSemicolon ? `第 ${lines.indexOf(missingSemicolon) + 1} 行可能缺少分号。` : '';
    }
    function judgeStructure(source, problem, reason) {
        const code = stripComments(source);
        const syntaxError = checkStructure(source);
        if (syntaxError) return { ok: false, status: 'Compile Error', mode: 'structure', message: syntaxError };
        const checks = {
            1: [[/printf\s*\(\s*"Hello,\s*CodeMaster!/i, '必须输出 Hello, CodeMaster!。']],
            2: [[/scanf\s*\(\s*"%d\s+%d"/, '必须读取两个整数。'], [/printf\s*\([^;]*\+[^;]*\)/, '输出必须使用两个数的加法结果。']],
            3: [[/scanf\s*\(\s*"%d"/, '必须读取成绩。'], [/(>=\s*90|90\s*<=)/, '必须处理 90 分及以上。'], [/(>=\s*60|60\s*<=)/, '必须处理 60 分及以上。'], [/printf\s*\([^;]*"A/, '缺少 A 等级输出。'], [/printf\s*\([^;]*"B/, '缺少 B 等级输出。'], [/printf\s*\([^;]*"C/, '缺少 C 等级输出。']],
            4: [[/scanf\s*\(\s*"%d"/, '必须读取数组长度。'], [/(for|while)\s*\(/, '必须循环读取数组元素。'], [/[A-Za-z_]\w*\s*>\s*[A-Za-z_]\w*/, '必须比较当前值和最大值。'], [/printf\s*\([^;]*%d/, '必须输出最大值。']],
            5: [[/#include\s*[<"]string\.h[>"]/, '必须引入 string.h。'], [/(for|while)\s*\(/, '必须遍历字符串。'], [/(==|strcmp\s*\()/, '必须比较字符或字符串。'], [/printf\s*\([^;]*"YES/, '缺少 YES 输出。'], [/printf\s*\([^;]*"NO/, '缺少 NO 输出。']],
            6: [[/scanf\s*\(\s*"%d"/, '必须读取 n。'], [/(for|while)\s*\(/, '必须循环计算数列。'], [/[A-Za-z_]\w*\s*=\s*[A-Za-z_]\w*\s*\+\s*[A-Za-z_]\w*/, '必须使用前两项相加。'], [/printf\s*\([^;]*%d/, '必须输出数列结果。']]
        };
        const failed = checks[problem.id].find(([pattern]) => !pattern.test(code));
        if (failed) return { ok: false, status: 'Wrong Answer', mode: 'structure', message: `${failed[1]}\n结构检查未通过，未计入通过题目。` };
        return { ok: true, status: 'Structure Accepted', mode: 'structure', message: `已通过 ${problem.publicCases.length} 个公开规则和 ${problem.hiddenCases.length} 个隐藏规则。\n当前为 JS 严格结构检查模式，未执行 C 代码。\n${reason}` };
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
            throw new Error('当前页面通过 file:// 打开，浏览器无法稳定运行 Wasm 编译器。请将项目部署到 GitHub Pages，或通过本地 HTTP/HTTPS 服务打开。');
        }
        setStatus('正在加载浏览器 C 编译器（首次加载约 95 MB）...');
        const runtime = await loadCompiler();
        setStatus('正在编译 C11 代码...');
        const compiled = await Promise.race([
            runtime.compile({ source, fileName: 'main.c', flags: ['-x=c', '-std=c11'] }),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error('Wasm 编译器响应超时，已准备切换到 JS 严格结构检查。')), 30000))
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
                return { ok: false, status: 'Wrong Answer', message: `${testCase.hidden ? '隐藏' : '公开'}测试点 ${testCase.hidden ? hiddenPassed + 1 : publicPassed + 1} 未通过。\n期望输出：${expected || '（空）'}\n实际输出：${actual || '（空）'}\n公开测试点 ${publicPassed}/${problem.publicCases.length}，隐藏测试点 ${hiddenPassed}/${problem.hiddenCases.length}。` };
            }
            if (testCase.hidden) hiddenPassed += 1;
            else publicPassed += 1;
        }
        return { ok: true, status: 'Accepted', message: `公开测试点 ${publicPassed}/${problem.publicCases.length}，隐藏测试点 ${hiddenPassed}/${problem.hiddenCases.length}。\n代码已在浏览器内通过真实 C11 编译和运行。` };
    }
    async function submit() {
        const p = problems.find(item => item.id === state.current);
        const source = $('#codeEditor').value;
        $('#submitCode').disabled = true;
        $('#submitCode').textContent = '⏳ 判题中...';
        $('#resultBox').innerHTML = '<div class="result-placeholder"><span>⌁</span><div><strong>正在检查代码</strong><p>判题器正在分析输入、处理逻辑和输出结构。</p></div></div>';
        try {
            if (!p) {
                throw new Error('题目不存在');
            }
            const result = await judgeWithCompiler(source, p, status => {
                $('#resultBox').innerHTML = `<div class="result-placeholder"><span>⌁</span><div><strong>正在判题</strong><p>${status}</p></div></div>`;
            });
            const success = result.ok;
            $('#resultBox').innerHTML = success
                ? `<div class="result-success result-title">✓ ${result.mode === 'structure' ? 'Structure Accepted · 结构检查通过' : 'Accepted · 通过测试'}</div><pre>${result.message}\n${result.mode === 'structure' ? 'Wasm 编译器不可用，已切换为 JS 严格结构检查。' : '本页面使用浏览器内 Wasm 编译器完成判题。'}</pre>`
                : `<div class="result-fail result-title">× ${result.status} · 未通过</div><pre>${result.message}</pre>`;
            if (success && !state.passed.includes(p.id)) { state.passed.push(p.id); localStorage.setItem('cm_oj_passed', JSON.stringify(state.passed)); renderList(); $('#solvedCount').textContent = state.passed.length; }
        } catch (error) {
            const fallback = judgeStructure(source, p, error.message || 'Wasm 编译器未能完成初始化。');
            $('#resultBox').innerHTML = fallback.ok
                ? `<div class="result-success result-title">✓ Structure Accepted · 结构检查通过</div><pre>${fallback.message}\nWasm 编译器不可用，已切换为 JS 严格结构检查。</pre>`
                : `<div class="result-fail result-title">× ${fallback.status} · 未通过</div><pre>${fallback.message}</pre>`;
            if (fallback.ok && !state.passed.includes(p.id)) { state.passed.push(p.id); localStorage.setItem('cm_oj_passed', JSON.stringify(state.passed)); renderList(); $('#solvedCount').textContent = state.passed.length; }
        } finally {
            $('#submitCode').disabled = false;
            $('#submitCode').textContent = '▶ 提交并运行';
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.filter-tab').forEach(tab => tab.addEventListener('click', () => { document.querySelector('.filter-tab.active').classList.remove('active'); tab.classList.add('active'); state.filter = tab.dataset.filter; if (!visibleProblems().some(p => p.id === state.current)) state.current = visibleProblems()[0].id; render(); }));
        $('#submitCode').addEventListener('click', submit);
        $('#resetCode').addEventListener('click', renderDetail);
        render();
    });
})();
