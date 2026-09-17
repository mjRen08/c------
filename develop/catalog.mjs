// Canonical course + lesson map shared by the OJ engine and verification.
// Keep in sync with lesson-page.js (pagePrefix / chapterTopics) and list.html (COURSES).
export const COURSE_ORDER = [
  'basics', 'control-flow', 'functions', 'pointers', 'strings',
  'structs', 'algorithms', 'file-io', 'project'
];

export const COURSES = {
  basics: { title: 'C语言基础编程', icon: '📘', accent: '#00d4ff', topic: 0 },
  'control-flow': { title: '循环与分支结构', icon: '🔄', accent: '#ff8a00', topic: 1 },
  functions: { title: '函数与模块化', icon: '📦', accent: '#a855f7', topic: 2 },
  pointers: { title: '指针与内存管理', icon: '🔧', accent: '#ff4757', topic: 3 },
  strings: { title: '数组与字符串', icon: '📋', accent: '#22d3ee', topic: 4 },
  structs: { title: '结构体与共同体', icon: '🧱', accent: '#00ff88', topic: 5 },
  algorithms: { title: '数据结构与算法', icon: '🌲', accent: '#7b2cbf', topic: 6 },
  'file-io': { title: '文件操作与IO', icon: '📁', accent: '#f472b6', topic: 7 },
  project: { title: '项目实战：学生管理系统', icon: '💻', accent: '#fbbf24', topic: null }
};

export const LESSONS = [
  '核心概念与基本模型',
  '常见写法与执行过程',
  '数据变化与边界情况',
  '调试方法与代码质量',
  '综合练习与迁移应用'
];
