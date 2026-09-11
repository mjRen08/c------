(function () {
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
        $('#resultBox').innerHTML = '<div class="result-placeholder"><span>⌁</span><div><strong>准备好了吗？</strong><p>点击“提交并运行”，查看你的代码能否通过测试样例。</p></div></div>';
    }
    function render() { renderList(); renderDetail(); $('#solvedCount').textContent = state.passed.length; }
    function removeComments(source) {
        return source
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .trim();
    }
        function checkSyntax(code) {
            const pairs = { ')': '(', ']': '[', '}': '{' };
            const stack = [];
            let quote = '';
            let escaped = false;
            for (let index = 0; index < code.length; index += 1) {
                const character = code[index];
                if (quote) {
                    if (escaped) {
                        escaped = false;
                    } else if (character === '\\') {
                        escaped = true;
                    } else if (character === quote) {
                        quote = '';
                    }
                    continue;
                }
                if (character === '"' || character === "'") {
                    quote = character;
                } else if ('([{'.includes(character)) {
                    stack.push(character);
                } else if (')]}'.includes(character)) {
                    if (stack.pop() !== pairs[character]) {
                        return '括号或大括号不匹配。';
                    }
                }
            }
            if (quote) return '字符串或字符常量没有闭合。';
            if (stack.length) return '括号或大括号没有闭合。';

            const lines = code.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
            const missingSemicolon = lines.find(line => {
                if (/^(#|\/\/|\/\*|\*|\}|else\b|if\s*\(|for\s*\(|while\s*\(|switch\s*\(|case\b|default\s*:)/.test(line)) return false;
                if (/[{;:,]$/.test(line)) return false;
                return /\b(return|break|continue|printf|scanf|int|char|float|double)\b|\w+\s*=/.test(line);
            });
            return missingSemicolon ? `第 ${lines.indexOf(missingSemicolon) + 1} 行可能缺少分号。` : '';
        }
    function judgeSource(problemId, source) {
        const code = removeComments(source);
        const checks = {
            1: [
                [/\bint\s+main\s*\(/, '缺少 main 函数'],
                [/printf\s*\(\s*"Hello,\s*CodeMaster!/, '没有输出指定字符串']
            ],
            2: [
                [/\bint\s+[A-Za-z_]\w*\s*,\s*[A-Za-z_]\w*\s*;/, '需要定义两个整数变量'],
                [/scanf\s*\(\s*"%d\s+%d"/, '需要读入两个整数'],
                [/printf\s*\(\s*"%d/, '需要输出整数'],
                [/[A-Za-z_]\w*\s*\+\s*[A-Za-z_]\w*/, '输出表达式必须使用加法']
            ],
            3: [
                [/scanf\s*\(\s*"%d"/, '需要读入成绩'],
                [/(if\s*\([^)]*>=\s*90|90\s*<=\s*[A-Za-z_]\w*)/, '缺少 90 分的判断'],
                [/(if|else\s+if)[^\n{]*>=\s*60/, '缺少 60 分的判断'],
                [/printf\s*\(\s*"A/, '缺少 A 等级输出'],
                [/printf\s*\(\s*"B/, '缺少 B 等级输出'],
                [/printf\s*\(\s*"C/, '缺少 C 等级输出']
            ],
            4: [
                [/scanf\s*\(\s*"%d"/, '需要读入数组长度'],
                [/(for|while)\s*\(/, '需要循环遍历数组'],
                [/[A-Za-z_]\w*\s*>\s*[A-Za-z_]\w*/, '需要比较并更新最大值'],
                [/printf\s*\(\s*"%d/, '需要输出最大值']
            ],
            5: [
                [/(strlen\s*\(|string\.h)/, '需要使用字符串长度或 string.h'],
                [/(for|while)\s*\(/, '需要遍历字符串'],
                [/(==|strcmp\s*\()/, '需要比较字符串内容'],
                [/printf\s*\(\s*"YES/, '缺少 YES 输出'],
                [/printf\s*\(\s*"NO/, '缺少 NO 输出']
            ],
            6: [
                [/scanf\s*\(\s*"%d"/, '需要读入 n'],
                [/(for|while)\s*\(/, '需要循环计算数列'],
                [/[A-Za-z_]\w*\s*=\s*[A-Za-z_]\w*\s*\+\s*[A-Za-z_]\w*/, '需要使用前两项相加'],
                [/printf\s*\(\s*"%d/, '需要输出数列结果']
            ]
        };
        if (!code || !/\bint\s+main\s*\(/.test(code)) {
            return { ok: false, status: 'Compile Error', message: '没有找到有效的 int main() 函数。' };
        }
            const syntaxError = checkSyntax(code);
            if (syntaxError) {
                return { ok: false, status: 'Compile Error', message: `语法检查失败：${syntaxError}` };
            }
        const failed = checks[problemId].find(check => !check[0].test(code));
        const publicCount = problems.find(item => item.id === problemId).publicCases.length;
        const hiddenCount = problems.find(item => item.id === problemId).hiddenCases.length;
        if (failed) {
            return { ok: false, status: 'Wrong Answer', message: `公开测试点 0/${publicCount}，隐藏测试点未通过。\n提示：${failed[1]}。` };
        }
        return { ok: true, status: 'Accepted', message: `公开测试点 ${publicCount}/${publicCount}，隐藏测试点 ${hiddenCount}/${hiddenCount}。\n已检查输入、核心处理逻辑和输出结构。\n提示：本页面使用静态规则模拟测试点，不会在浏览器中执行 C 代码。` };
    }
    function submit() {
        const p = problems.find(item => item.id === state.current);
        const source = $('#codeEditor').value;
        $('#submitCode').disabled = true;
        $('#submitCode').textContent = '⏳ 判题中...';
        $('#resultBox').innerHTML = '<div class="result-placeholder"><span>⌁</span><div><strong>正在检查代码</strong><p>判题器正在分析输入、处理逻辑和输出结构。</p></div></div>';
        try {
            if (!p) {
                throw new Error('题目不存在');
            }
            const result = judgeSource(p.id, source);
            const success = result.ok;
            $('#resultBox').innerHTML = success
                ? `<div class="result-success result-title">✓ Accepted · 通过测试</div><pre>${result.message}\n本页面使用轻量级浏览器判题器。</pre>`
                : `<div class="result-fail result-title">× ${result.status} · 未通过</div><pre>${result.message}</pre>`;
            if (success && !state.passed.includes(p.id)) { state.passed.push(p.id); localStorage.setItem('cm_oj_passed', JSON.stringify(state.passed)); renderList(); $('#solvedCount').textContent = state.passed.length; }
        } catch (error) {
            $('#resultBox').innerHTML = '<div class="result-fail result-title">× 判题器异常</div><pre>代码检查失败，请点击“重置代码”后重新提交。</pre>';
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
