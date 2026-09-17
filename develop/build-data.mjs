/* ============================================================
   题库汇总脚本
   ------------------------------------------------------------
   把 develop/data/batch-*.js 三个源文件合并生成网站真正加载的
   assets/js/oj-data.js（用普通 <script> 标签加载，和别的资源一致）。

   用法（在 develop 目录下）：
       node build-data.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'assets', 'js', 'oj-data.js');
const BATCHES = ['batch-a.js', 'batch-b.js', 'batch-c.js'];

const bodies = BATCHES.map(name => {
  const file = path.join(HERE, 'data', name);
  const source = fs.readFileSync(file, 'utf8');
  const start = source.indexOf('[');
  const end = source.lastIndexOf(']');
  if (start < 0 || end < 0) throw new Error(`${name} 里找不到数组字面量`);
  return source.slice(start + 1, end).replace(/^\s*\n/, '').replace(/\s*$/, '');
});

const header = `/* ============================================================
   CodeMaster OJ 题库数据（由 develop/build-data.mjs 自动生成，请勿手改）
   ------------------------------------------------------------
   9 个课程专题 × 5 节课 = 45 节课，每节课固定 3 道题（入门 / 进阶 / 挑战），
   共 135 道题。每道题都带 2 个公开测试点与 2 个隐藏测试点。

   数据字段：
     id / courseId / chapter / lesson / level / label
     title / description / input / output
     publicCases / hiddenCases   —— { input, output } 形式
     starter                     —— 学生看到的初始代码骨架
     checks                      —— 编译器不可用时的 JS 严格结构检查规则
   课程顺序与名称与「课程中心」(list.html) 的 9 个专题保持一致。

   改题库请改 develop/data/batch-*.js，然后依次执行：
     node develop/check-structure.mjs
     node develop/run.mjs develop/verify-all.mjs
     node develop/build-data.mjs
   ============================================================ */
const OJ_COURSES = [
    { id: 'basics',       title: 'C语言基础编程',        icon: '📘', accent: '#00d4ff', topic: 0 },
    { id: 'control-flow', title: '循环与分支结构',        icon: '🔄', accent: '#ff8a00', topic: 1 },
    { id: 'functions',    title: '函数与模块化',          icon: '📦', accent: '#a855f7', topic: 2 },
    { id: 'pointers',     title: '指针与内存管理',        icon: '🔧', accent: '#ff4757', topic: 3 },
    { id: 'strings',      title: '数组与字符串',          icon: '📋', accent: '#22d3ee', topic: 4 },
    { id: 'structs',      title: '结构体与共同体',        icon: '🧱', accent: '#00ff88', topic: 5 },
    { id: 'algorithms',   title: '数据结构与算法',        icon: '🌲', accent: '#7b2cbf', topic: 6 },
    { id: 'file-io',      title: '文件操作与IO',          icon: '📁', accent: '#f472b6', topic: 7 },
    { id: 'project',      title: '项目实战：学生管理系统', icon: '💻', accent: '#fbbf24', topic: null }
];

/* 每节课的章名，与课程页 lesson-page.js 的 chapterTopics 一致 */
const OJ_CHAPTER_TITLES = [
    '核心概念与基本模型',
    '常见写法与执行过程',
    '数据变化与边界情况',
    '调试方法与代码质量',
    '综合练习与迁移应用'
];

const OJ_PROBLEMS = [
`;

const file = header + bodies.join(',\n') + '\n];\n';
fs.writeFileSync(OUT, file, 'utf8');
console.log(`已生成 ${OUT}（${file.length} 字节）`);
