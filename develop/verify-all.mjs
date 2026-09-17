// Full verification: compiles every reference solution AND starter with the same
// browsercc Wasm toolchain the OJ page uses, then runs each solution against its
// 2 public + 2 hidden cases and compares output exactly like the page judge does.
import fs from 'node:fs';
import { runC, normalizeOutput } from './oj-runner.mjs';

const load = async name => (await import('data:text/javascript;base64,' +
  Buffer.from(fs.readFileSync(new URL(name, import.meta.url), 'utf8'), 'utf8').toString('base64'))).default;

const problems = [...await load('./data/batch-a.js'), ...await load('./data/batch-b.js'), ...await load('./data/batch-c.js')];
// run.mjs imports this file, so process.argv[2] is the script path and user
// arguments start at argv[3].
const only = process.argv[3] ? process.argv[3].split(',').map(Number) : null;
const list = only ? problems.filter(p => only.includes(p.id)) : problems;

const report = { checked: 0, solutionCompileFail: [], starterCompileFail: [], mismatches: [], crashes: [] };
const started = Date.now();

for (const p of list) {
  const cases = [...p.publicCases.map(c => ({ ...c, hidden: false })), ...p.hiddenCases.map(c => ({ ...c, hidden: true }))];
  const run = await runC(p.solution, cases.map(c => c.input));
  if (!run.ok) {
    report.solutionCompileFail.push({ id: p.id, title: p.title, error: String(run.error).slice(0, 400) });
    continue;
  }
  run.results.forEach((result, index) => {
    const expected = normalizeOutput(cases[index].output);
    if (result.error) {
      report.crashes.push({ id: p.id, title: p.title, case: index, error: result.error.slice(0, 200) });
      return;
    }
    const actual = normalizeOutput(result.output);
    if (actual !== expected) {
      report.mismatches.push({
        id: p.id, title: p.title, case: index, hidden: cases[index].hidden,
        input: JSON.stringify(cases[index].input), expected: JSON.stringify(expected), actual: JSON.stringify(actual)
      });
    }
  });
  const starter = await runC(p.starter, [cases[0].input]);
  if (!starter.ok) report.starterCompileFail.push({ id: p.id, title: p.title, error: String(starter.error).slice(0, 400) });
  report.checked += 1;
  if (report.checked % 10 === 0) {
    console.log(`  ... ${report.checked}/${list.length}  (${((Date.now() - started) / 1000).toFixed(0)}s)`);
  }
}

console.log('\n===== 验证结果 =====');
console.log(`已检查题目: ${report.checked}/${list.length}  用时 ${((Date.now() - started) / 1000).toFixed(0)}s`);
console.log(`参考解编译失败: ${report.solutionCompileFail.length}`);
report.solutionCompileFail.forEach(item => console.log(`  ✖ #${item.id} ${item.title}: ${item.error.split('\n').slice(0, 3).join(' | ')}`));
console.log(`starter 编译失败: ${report.starterCompileFail.length}`);
report.starterCompileFail.forEach(item => console.log(`  ✖ #${item.id} ${item.title}: ${item.error.split('\n').slice(0, 3).join(' | ')}`));
console.log(`运行崩溃: ${report.crashes.length}`);
report.crashes.forEach(item => console.log(`  ✖ #${item.id} ${item.title} case${item.case}: ${item.error}`));
console.log(`输出不匹配: ${report.mismatches.length}`);
report.mismatches.forEach(item => console.log(`  ✖ #${item.id} ${item.title} case${item.case}${item.hidden ? '(隐藏)' : ''} in=${item.input} 期望=${item.expected} 实际=${item.actual}`));

const ok = !report.solutionCompileFail.length && !report.starterCompileFail.length && !report.crashes.length && !report.mismatches.length;
fs.writeFileSync(new URL('./verify-report.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(ok ? '\n✅ 全部通过' : '\n❌ 存在问题，详见 verify-report.json');
process.exit(ok ? 0 : 1);
