// Structural + content validation for the 135-problem bank (no compiling here).
import fs from 'node:fs';
import { COURSE_ORDER, COURSES, LESSONS } from './catalog.mjs';

const load = async name => (await import('data:text/javascript;base64,' +
  Buffer.from(fs.readFileSync(new URL(name, import.meta.url), 'utf8'), 'utf8').toString('base64'))).default;

const problems = [...await load('./data/batch-a.js'), ...await load('./data/batch-b.js'), ...await load('./data/batch-c.js')];

const errors = [];
const warn = [];
const fail = message => errors.push(message);

// ---- ids ----
problems.forEach((p, index) => {
  if (p.id !== index + 1) fail(`#${p.id}: id 不连续（期望 ${index + 1}）`);
});

// ---- grouping: 9 courses x 5 chapters x 3 ----
if (problems.length !== 135) fail(`题目总数 ${problems.length} != 135`);
COURSE_ORDER.forEach(courseId => {
  for (let chapter = 1; chapter <= 5; chapter++) {
    const trio = problems.filter(p => p.courseId === courseId && p.chapter === chapter);
    if (trio.length !== 3) { fail(`${courseId} 第${chapter}章 题目数 ${trio.length} != 3`); continue; }
    const levels = trio.map(p => p.level).join(',');
    if (levels !== 'easy,medium,hard') fail(`${courseId} 第${chapter}章 难度顺序 ${levels}`);
    trio.forEach((p, i) => {
      const wantLabel = ['入门', '进阶', '挑战'][i];
      if (p.label !== wantLabel) fail(`#${p.id}: label ${p.label} != ${wantLabel}`);
      if (p.lesson !== LESSONS[chapter - 1]) fail(`#${p.id}: lesson "${p.lesson}" != "${LESSONS[chapter - 1]}"`);
    });
  }
});

// ---- per problem ----
const titles = new Map();
const descriptions = new Map();
for (const p of problems) {
  const tag = `#${p.id}`;
  if (!COURSES[p.courseId]) fail(`${tag}: 未知 courseId ${p.courseId}`);
  if (!p.title || [...p.title].length > 8) fail(`${tag}: 标题过长或为空 "${p.title}"`);
  if (!p.description || p.description.length < 10) fail(`${tag}: 题干过短`);
  if (!p.input || !p.output) fail(`${tag}: 缺少 input/output 描述`);
  if (!p.publicCases || p.publicCases.length !== 2) fail(`${tag}: publicCases ${p.publicCases?.length} != 2`);
  if (!p.hiddenCases || p.hiddenCases.length !== 2) fail(`${tag}: hiddenCases ${p.hiddenCases?.length} != 2`);
  if (!p.starter || !/int\s+main\s*\(/.test(p.starter)) fail(`${tag}: starter 缺少 main`);
  if (!p.solution || !/int\s+main\s*\(/.test(p.solution)) fail(`${tag}: solution 缺少 main`);
  if (!Array.isArray(p.checks) || p.checks.length === 0) fail(`${tag}: checks 为空`);
  for (const item of [...(p.publicCases || []), ...(p.hiddenCases || [])]) {
    if (typeof item.input !== 'string' || typeof item.output !== 'string') { fail(`${tag}: 测试点不是字符串`); continue; }
    if (!item.output.endsWith('\n')) fail(`${tag}: 期望输出未以 \\n 结尾 -> ${JSON.stringify(item.output)}`);
    if (item.output !== item.output.replace(/\r/g, '')) fail(`${tag}: 期望输出含 \\r`);
    if (/\n\s*\n$/.test(item.output)) fail(`${tag}: 期望输出结尾有空行`);
  }
  const key = p.courseId + '|' + p.title;
  if (titles.has(key)) fail(`${tag}: 与 ${titles.get(key)} 同课程内标题重复 "${p.title}"`);
  titles.set(key, tag);
  const dkey = p.courseId + '|' + p.description.slice(0, 34);
  if (descriptions.has(dkey)) fail(`${tag}: 题干与 ${descriptions.get(dkey)} 高度重复`);
  descriptions.set(dkey, tag);
  // regex sanity: every check must compile and match its own reference solution
  const stripped = p.solution.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  for (const [pattern, hint] of p.checks) {
    let re;
    try { re = new RegExp(pattern.replace(/^\//, '').replace(/\/$/, '')); }
    catch (e) { fail(`${tag}: 正则无法编译 ${pattern} (${e.message})`); continue; }
    if (!re.test(stripped)) fail(`${tag}: 正则 ${pattern} 未命中自己的参考解（提示：${hint}）`);
    if (!hint) fail(`${tag}: check 缺少中文提示`);
  }
  if (/\b(fopen|fclose|freopen)\s*\(/.test(p.solution) && p.courseId !== 'file-io') {
    warn.push(`${tag}: 非 file-io 课程真的调用了文件 API`);
  }
}

// ---- report ----
console.log(`题目总数: ${problems.length}`);
console.log(`错误: ${errors.length}`);
errors.slice(0, 40).forEach(e => console.log('  ✖ ' + e));
if (errors.length > 40) console.log(`  ... 还有 ${errors.length - 40} 条`);
console.log(`提示: ${warn.length}`);
warn.slice(0, 20).forEach(w => console.log('  ! ' + w));
process.exit(errors.length ? 1 : 0);
