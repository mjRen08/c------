/* ============================================================
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
  {
    id: 1,
    courseId: 'basics',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'easy',
    label: '入门',
    title: '问候语输出',
    description: '训练营要给新学员打印欢迎语。读入一个英文名字，先输出一句带名字的问候，再输出一句欢迎加入的话，熟悉 C 程序的基本结构和 printf 输出。',
    input: '一行，一个长度不超过 20 的英文名字（不含空格）。',
    output: '共两行：第一行为 Hello, 名字!；第二行为 欢迎加入 CodeMaster。',
    publicCases: [
      { input: 'Tom', output: 'Hello, Tom!\n欢迎加入 CodeMaster\n' },
      { input: 'Alice', output: 'Hello, Alice!\n欢迎加入 CodeMaster\n' }
    ],
    hiddenCases: [
      { input: 'C', output: 'Hello, C!\n欢迎加入 CodeMaster\n' },
      { input: 'ABCDEFGHIJKLMNOPQRST', output: 'Hello, ABCDEFGHIJKLMNOPQRST!\n欢迎加入 CodeMaster\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    char name[32];\n    scanf("%31s", name);\n    // 在这里用 printf 输出两行欢迎语\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    char name[32];\n    if (scanf("%31s", name) != 1) {\n        return 0;\n    }\n    printf("Hello, %s!\\n", name);\n    printf("欢迎加入 CodeMaster\\n");\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出两行欢迎语。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读入名字。']
    ]
  },
  {
    id: 2,
    courseId: 'basics',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'medium',
    label: '进阶',
    title: '交换两个数',
    description: '小明有两个变量分别装着数字 a 和 b，他想把两个变量的值互换，就像交换两个杯子里的饮料，需要借助第三个空杯子。请先输出交换前的值，交换后再输出一次。',
    input: '一行两个整数 a 和 b（-1000 ≤ a ≤ 1000，-1000 ≤ b ≤ 1000），用空格分隔。',
    output: '第一行输出交换前的两个数（先 a 后 b）；第二行输出交换后的两个数。每行两个整数之间用一个空格分隔。',
    publicCases: [
      { input: '3 5', output: '3 5\n5 3\n' },
      { input: '10 -7', output: '10 -7\n-7 10\n' }
    ],
    hiddenCases: [
      { input: '0 0', output: '0 0\n0 0\n' },
      { input: '-1000 1000', output: '-1000 1000\n1000 -1000\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b, temp;\n    scanf("%d %d", &a, &b);\n    printf("%d %d\\n", a, b);\n    // 借助 temp 交换 a 和 b，再输出交换后的结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b, temp;\n    scanf("%d %d", &a, &b);\n    printf("%d %d\\n", a, b);\n    temp = a;\n    a = b;\n    b = temp;\n    printf("%d %d\\n", a, b);\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出交换前后的结果。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读入两个整数。']
    ]
  },
  {
    id: 3,
    courseId: 'basics',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'hard',
    label: '挑战',
    title: '姓名标签牌',
    description: '社团要为新成员制作姓名牌：读入一个英文名字，打印一张带边框的标签牌，名字在牌内左对齐，右侧用空格补满 20 列，这样就用到 printf 的字段宽度控制。',
    input: '一行，一个长度不超过 20 的英文名字（不含空格）。',
    output: '共三行。第一行与第三行都是 1 个加号、20 个减号、1 个加号；第二行是竖线、左对齐占 20 列的名字、竖线，名字不足 20 列时右侧补空格。',
    publicCases: [
      { input: 'Tom', output: '+--------------------+\n|Tom                 |\n+--------------------+\n' },
      { input: 'CodeMaster', output: '+--------------------+\n|CodeMaster          |\n+--------------------+\n' }
    ],
    hiddenCases: [
      { input: 'A', output: '+--------------------+\n|A                   |\n+--------------------+\n' },
      { input: 'ABCDEFGHIJKLMNOPQRST', output: '+--------------------+\n|ABCDEFGHIJKLMNOPQRST|\n+--------------------+\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    char name[32];\n    scanf("%31s", name);\n    // 用 printf 的字段宽度让名字左对齐占 20 列，输出三行标签牌\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    char name[32];\n    if (scanf("%31s", name) != 1) {\n        return 0;\n    }\n    printf("+--------------------+\\n");\n    printf("|%-20s|\\n", name);\n    printf("+--------------------+\\n");\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出三行标签牌。'],
      ['/%-?\\d+s/', '名字要用带字段宽度的格式符（如 %-20s）输出。']
    ]
  },
  {
    id: 4,
    courseId: 'basics',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'easy',
    label: '入门',
    title: '水果称重',
    description: '小明在超市买了两种水果，重量分别是 a 千克和 b 千克。请用 double 变量保存重量，计算总重量并保留两位小数输出。',
    input: '一行两个实数 a 和 b（0 ≤ a ≤ 1000，0 ≤ b ≤ 1000），用空格分隔。',
    output: '输出总重量，保留两位小数。',
    publicCases: [
      { input: '1.5 2.25', output: '3.75\n' },
      { input: '0.1 0.2', output: '0.30\n' }
    ],
    hiddenCases: [
      { input: '0 0', output: '0.00\n' },
      { input: '999.999 0.001', output: '1000.00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    double a, b;\n    scanf("%lf %lf", &a, &b);\n    // 计算总重量，保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    double a, b;\n    scanf("%lf %lf", &a, &b);\n    printf("%.2f\\n", a + b);\n    return 0;\n}',
    checks: [
      ['/%\\.2f/', '输出必须保留两位小数，用 %.2f。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 5,
    courseId: 'basics',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'medium',
    label: '进阶',
    title: '圆形花坛',
    description: '学校有一个半径为 r 米的圆形花坛，要沿边缘围一圈栅栏，并在里面铺满草皮。请分别计算栅栏的长度和草皮的面积，圆周率取 3.14159。',
    input: '一行一个实数 r（0 ≤ r ≤ 100），表示花坛半径（单位：米）。',
    output: '第一行输出栅栏长度，第二行输出草皮面积，均保留两位小数。',
    publicCases: [
      { input: '1', output: '6.28\n3.14\n' },
      { input: '2.5', output: '15.71\n19.63\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0.00\n0.00\n' },
      { input: '10', output: '62.83\n314.16\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    double r;\n    scanf("%lf", &r);\n    // 用圆周率 3.14159 计算周长与面积，各保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    const double PI = 3.14159;\n    double r;\n    scanf("%lf", &r);\n    printf("%.2f\\n", 2 * PI * r);\n    printf("%.2f\\n", PI * r * r);\n    return 0;\n}',
    checks: [
      ['/%\\.2f/', '输出必须保留两位小数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出周长和面积。']
    ]
  },
  {
    id: 6,
    courseId: 'basics',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'hard',
    label: '挑战',
    title: '温度换算',
    description: '气象站记录了摄氏温度 c，需要同时换算成另外两种温标。换算公式为：华氏度 = 摄氏度 × 9 ÷ 5 + 32，开尔文 = 摄氏度 + 273.15，注意表达式里要写成浮点除法。',
    input: '一行一个实数 c（-273.15 ≤ c ≤ 1000），表示摄氏温度。',
    output: '第一行输出华氏温度，第二行输出开尔文温度，均保留两位小数。',
    publicCases: [
      { input: '0', output: '32.00\n273.15\n' },
      { input: '100', output: '212.00\n373.15\n' }
    ],
    hiddenCases: [
      { input: '-40', output: '-40.00\n233.15\n' },
      { input: '-273.15', output: '-459.67\n0.00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    double c, f, k;\n    scanf("%lf", &c);\n    // 按公式算出华氏温度和开尔文温度，各保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    double c, f, k;\n    scanf("%lf", &c);\n    f = c * 9.0 / 5.0 + 32.0;\n    k = c + 273.15;\n    printf("%.2f\\n", f);\n    printf("%.2f\\n", k);\n    return 0;\n}',
    checks: [
      ['/%\\.2f/', '输出必须保留两位小数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出两个换算结果。']
    ]
  },
  {
    id: 7,
    courseId: 'basics',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'easy',
    label: '入门',
    title: '分糖果',
    description: '老师有 a 颗糖果，要平均分给 b 个小朋友。请用整数除法算出每人能分到几颗，再用取余运算算出还剩几颗没有分完。',
    input: '一行两个整数 a 和 b（0 ≤ a ≤ 100000，1 ≤ b ≤ 1000），用空格分隔。',
    output: '第一行输出每人分到的颗数，第二行输出剩余的颗数。',
    publicCases: [
      { input: '17 5', output: '3\n2\n' },
      { input: '100 10', output: '10\n0\n' }
    ],
    hiddenCases: [
      { input: '0 7', output: '0\n0\n' },
      { input: '100000 999', output: '100\n100\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    // 用 / 求每人分到的颗数，用 % 求剩余的颗数，分别输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a / b);\n    printf("%d\\n", a % b);\n    return 0;\n}',
    checks: [
      ['/\\/\\s*b|\\/\\s*[a-z0-9]/', '需要用整数除法算出每人分到的颗数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出两个结果。']
    ]
  },
  {
    id: 8,
    courseId: 'basics',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'medium',
    label: '进阶',
    title: '小组平均分',
    description: '某学习小组共有 b 名同学，期末考试总分是 a 分。请计算小组的平均分并保留两位小数。注意两个整数相除会丢掉小数部分，需要先做类型转换。',
    input: '一行两个整数 a 和 b（0 ≤ a ≤ 1000000，1 ≤ b ≤ 1000），分别表示总分和人数。',
    output: '输出平均分，保留两位小数。',
    publicCases: [
      { input: '17 5', output: '3.40\n' },
      { input: '1 3', output: '0.33\n' }
    ],
    hiddenCases: [
      { input: '0 5', output: '0.00\n' },
      { input: '8 4', output: '2.00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    // 先把 a 转换成 double 再做除法，结果保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%.2f\\n", (double)a / b);\n    return 0;\n}',
    checks: [
      ['/\\(\\s*double\\s*\\)/', '需要把整数强制转换成 double 再相除，否则小数部分会丢失。'],
      ['/%\\.2f/', '输出必须保留两位小数。']
    ]
  },
  {
    id: 9,
    courseId: 'basics',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'hard',
    label: '挑战',
    title: '三位数拆分',
    description: '保险箱的密码藏在三位数里：请分离出它的百位、十位和个位，输出三个数字之和，再把这个三位数倒过来组成一个新数（前导零不输出）。',
    input: '一行一个三位正整数 n（100 ≤ n ≤ 999）。',
    output: '第一行输出三个数字之和，第二行输出倒序后的数。',
    publicCases: [
      { input: '123', output: '6\n321\n' },
      { input: '100', output: '1\n1\n' }
    ],
    hiddenCases: [
      { input: '999', output: '27\n999\n' },
      { input: '210', output: '3\n12\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 用 / 和 % 拆出百位、十位、个位，输出数字之和与倒序后的数\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, a, b, c;\n    scanf("%d", &n);\n    a = n / 100;\n    b = n / 10 % 10;\n    c = n % 10;\n    printf("%d\\n", a + b + c);\n    printf("%d\\n", c * 100 + b * 10 + a);\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出数字之和与倒序数。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读入三位数。']
    ]
  },
  {
    id: 10,
    courseId: 'basics',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'easy',
    label: '入门',
    title: '超市小票',
    description: '收银台要为一件商品打印小票：读入单价和数量，按统一的字段宽度输出三行信息，让小数点对齐，符合格式化输出的规范。',
    input: '一行两个数：单价 price（实数，0 < price ≤ 100）和数量 count（整数，1 ≤ count ≤ 100），用空格分隔。',
    output: '共三行，依次为 单价、数量、合计。每行先输出中文标签和冒号，再输出占 8 列右对齐的数值（金额保留两位小数，数量为整数），见样例。',
    publicCases: [
      { input: '12.5 3', output: '单价:   12.50\n数量:       3\n合计:   37.50\n' },
      { input: '2 10', output: '单价:    2.00\n数量:      10\n合计:   20.00\n' }
    ],
    hiddenCases: [
      { input: '0.5 1', output: '单价:    0.50\n数量:       1\n合计:    0.50\n' },
      { input: '100 100', output: '单价:  100.00\n数量:     100\n合计:10000.00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    double price;\n    int count;\n    scanf("%lf %d", &price, &count);\n    // 用 %8.2f 输出金额、用 %8d 输出数量，打印三行小票\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    double price;\n    int count;\n    scanf("%lf %d", &price, &count);\n    printf("单价:%8.2f\\n", price);\n    printf("数量:%8d\\n", count);\n    printf("合计:%8.2f\\n", price * count);\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出三行小票。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读入单价和数量。']
    ]
  },
  {
    id: 11,
    courseId: 'basics',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'medium',
    label: '进阶',
    title: '秒表读数',
    description: '运动会计时员记录了比赛从零点开始经过的秒数 t，需要把它换算成时、分、秒的读数显示在屏幕上，每个单位占两位，不足两位补零。',
    input: '一行一个整数 t（0 ≤ t ≤ 86399），表示从零点开始经过的秒数。',
    output: '输出一行，格式为 HH:MM:SS，时分秒各两位并用冒号分隔。',
    publicCases: [
      { input: '3661', output: '01:01:01\n' },
      { input: '86399', output: '23:59:59\n' }
    ],
    hiddenCases: [
      { input: '0', output: '00:00:00\n' },
      { input: '600', output: '00:10:00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int t, h, m, s;\n    scanf("%d", &t);\n    // 把总秒数拆成时、分、秒，用 %02d 补零后按 HH:MM:SS 输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int t, h, m, s;\n    scanf("%d", &t);\n    h = t / 3600;\n    m = t % 3600 / 60;\n    s = t % 60;\n    printf("%02d:%02d:%02d\\n", h, m, s);\n    return 0;\n}',
    checks: [
      ['/%02d/', '时分秒要用 %02d 补零到两位。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出时间。']
    ]
  },
  {
    id: 12,
    courseId: 'basics',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'hard',
    label: '挑战',
    title: '三角形面积',
    description: '工程队要在一块三角形空地上铺草坪，已知三边长 a、b、c 米。请用海伦公式计算面积：半周长 p = (a + b + c) ÷ 2，面积等于 p×(p-a)×(p-b)×(p-c) 开平方。',
    input: '一行三个整数 a、b、c（1 ≤ a, b, c ≤ 1000），表示三角形的三条边，保证能构成三角形。',
    output: '第一行输出三角形的周长，第二行输出三角形的面积，均保留两位小数。',
    publicCases: [
      { input: '3 4 5', output: '12.00\n6.00\n' },
      { input: '5 5 6', output: '16.00\n12.00\n' }
    ],
    hiddenCases: [
      { input: '1 1 1', output: '3.00\n0.43\n' },
      { input: '6 8 10', output: '24.00\n24.00\n' }
    ],
    starter: '#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    // 求半周长，再用 sqrt 按海伦公式算面积，各保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    int a, b, c;\n    double p, area;\n    scanf("%d %d %d", &a, &b, &c);\n    p = (a + b + c) / 2.0;\n    area = sqrt(p * (p - a) * (p - b) * (p - c));\n    printf("%.2f\\n", (double)(a + b + c));\n    printf("%.2f\\n", area);\n    return 0;\n}',
    checks: [
      ['/sqrt\\s*\\(/', '计算面积需要用到 sqrt 开平方。'],
      ['/%\\.2f/', '两个结果都必须保留两位小数。']
    ]
  },
  {
    id: 13,
    courseId: 'basics',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'easy',
    label: '入门',
    title: '自驾行程',
    description: '自驾游全程 s 公里，汽车保持 v 公里每小时的速度匀速行驶。请按顺序算出全程需要多少小时、多少分钟，分别保留两位小数。',
    input: '一行两个实数 s 和 v（0 ≤ s ≤ 1000，0 < v ≤ 200），分别表示路程（公里）和速度（公里每小时），用空格分隔。',
    output: '第一行输出所需小时数，第二行输出所需分钟数，均保留两位小数。',
    publicCases: [
      { input: '120 80', output: '1.50\n90.00\n' },
      { input: '200 60', output: '3.33\n200.00\n' }
    ],
    hiddenCases: [
      { input: '0 60', output: '0.00\n0.00\n' },
      { input: '1000 3', output: '333.33\n20000.00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    double s, v, hours;\n    scanf("%lf %lf", &s, &v);\n    // 先求小时数，再换算成分钟数，各保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    double s, v, hours;\n    scanf("%lf %lf", &s, &v);\n    hours = s / v;\n    printf("%.2f\\n", hours);\n    printf("%.2f\\n", hours * 60.0);\n    return 0;\n}',
    checks: [
      ['/%\\.2f/', '两个结果都必须保留两位小数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 14,
    courseId: 'basics',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'medium',
    label: '进阶',
    title: '取款零钱',
    description: '银行柜员要把 n 元现金换成一叠最少的纸币，面额有 50 元、20 元、10 元、5 元和 1 元。请按从大到小的顺序依次计算每种面额需要多少张。',
    input: '一行一个整数 n（0 ≤ n ≤ 10000），表示取款金额（单位：元）。',
    output: '共五行，依次输出 50 元、20 元、10 元、5 元、1 元纸币的张数。',
    publicCases: [
      { input: '38', output: '0\n1\n1\n1\n3\n' },
      { input: '99', output: '1\n2\n0\n1\n4\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0\n0\n0\n0\n0\n' },
      { input: '10000', output: '200\n0\n0\n0\n0\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 从 50 元开始，每次用 / 求张数、用 % 求剩余金额，最后输出五行\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", n / 50);\n    n %= 50;\n    printf("%d\\n", n / 20);\n    n %= 20;\n    printf("%d\\n", n / 10);\n    n %= 10;\n    printf("%d\\n", n / 5);\n    n %= 5;\n    printf("%d\\n", n);\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出五种面额的张数。'],
      ['/%/', '需要用到取余运算处理剩余金额。']
    ]
  },
  {
    id: 15,
    courseId: 'basics',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'hard',
    label: '挑战',
    title: '存款收益',
    description: '把 p 元存入银行，年利率为 r%，存 n 年。单利方式的本息合计是 p×(1 + r/100×n)；复利方式每年利滚利，本息合计是 p×(1 + r/100) 的 n 次方。请分别算出两种方式的到期金额。',
    input: '一行三个数：本金 p（实数，0 < p ≤ 1000000）、年利率 r（实数，0 ≤ r ≤ 100，单位是百分数）、年数 n（整数，1 ≤ n ≤ 30），用空格分隔。',
    output: '第一行输出单利本息合计，第二行输出复利本息合计，均保留两位小数。',
    publicCases: [
      { input: '10000 5 2', output: '11000.00\n11025.00\n' },
      { input: '1000 0 5', output: '1000.00\n1000.00\n' }
    ],
    hiddenCases: [
      { input: '1 100 1', output: '2.00\n2.00\n' },
      { input: '100 10 3', output: '130.00\n133.10\n' }
    ],
    starter: '#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    double p, r;\n    int n;\n    scanf("%lf %lf %d", &p, &r, &n);\n    // 分别按单利公式和复利公式计算，各保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    double p, r;\n    int n;\n    scanf("%lf %lf %d", &p, &r, &n);\n    printf("%.2f\\n", p * (1 + r / 100.0 * n));\n    printf("%.2f\\n", p * pow(1 + r / 100.0, n));\n    return 0;\n}',
    checks: [
      ['/pow\\s*\\(|for\\s*\\(|while\\s*\\(/', '复利要用 pow 求幂，或者用循环累乘。'],
      ['/%\\.2f/', '两个结果都必须保留两位小数。']
    ]
  },
  {
    id: 16,
    courseId: 'control-flow',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'easy',
    label: '入门',
    title: '抽签号码',
    description: '抽奖箱里抽出的号码保存在整数 n 中。号码是偶数的同学先上台，是奇数的同学后上台。请用 if / else 判断并输出号码的奇偶。',
    input: '一行一个整数 n（-1000000 ≤ n ≤ 1000000）。',
    output: 'n 是偶数输出 偶数，否则输出 奇数。',
    publicCases: [
      { input: '8', output: '偶数\n' },
      { input: '7', output: '奇数\n' }
    ],
    hiddenCases: [
      { input: '0', output: '偶数\n' },
      { input: '-3', output: '奇数\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 用 if / else 判断 n 除以 2 的余数，输出 偶数 或 奇数\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    if (n % 2 == 0) {\n        printf("偶数\\n");\n    } else {\n        printf("奇数\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/if\\s*\\(/', '本题要求用 if 判断奇偶。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 17,
    courseId: 'control-flow',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'medium',
    label: '进阶',
    title: '判断闰年',
    description: '日历上每四年左右会出现一个闰年。闰年的判断规则是：能被 4 整除但不能被 100 整除，或者能被 400 整除。请判断给定年份是不是闰年。',
    input: '一行一个整数 year（1 ≤ year ≤ 9999）。',
    output: '是闰年输出 YES，不是闰年输出 NO。',
    publicCases: [
      { input: '2024', output: 'YES\n' },
      { input: '2100', output: 'NO\n' }
    ],
    hiddenCases: [
      { input: '2000', output: 'YES\n' },
      { input: '1900', output: 'NO\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int year;\n    scanf("%d", &year);\n    // 用 if 写出闰年的两个条件（注意 && 与 || 的配合），输出 YES 或 NO\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int year;\n    scanf("%d", &year);\n    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {\n        printf("YES\\n");\n    } else {\n        printf("NO\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/if\\s*\\(/', '本题要求用 if 判断闰年条件。'],
      ['/&&|\\|\\|/', '闰年条件需要同时用到 && 和 ||。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 18,
    courseId: 'control-flow',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'hard',
    label: '挑战',
    title: '三角形判定',
    description: '木工师傅拿到三根木条，长度分别为 a、b、c。任意两边之和都大于第三边才能钉成三角形。请先判断能否钉成，再判断钉成的是等边、等腰还是普通三角形。',
    input: '一行三个正整数 a、b、c（1 ≤ a, b, c ≤ 1000），用空格分隔。',
    output: '不能构成三角形输出 不能构成三角形；三边都相等输出 等边三角形；只有两边相等输出 等腰三角形；三边都不相等输出 普通三角形。',
    publicCases: [
      { input: '3 4 5', output: '普通三角形\n' },
      { input: '1 2 3', output: '不能构成三角形\n' }
    ],
    hiddenCases: [
      { input: '5 5 5', output: '等边三角形\n' },
      { input: '6 6 10', output: '等腰三角形\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    // 先用 if 判断能否构成三角形，再用 else if 依次判断等边、等腰、普通\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    if (a + b <= c || a + c <= b || b + c <= a) {\n        printf("不能构成三角形\\n");\n    } else if (a == b && b == c) {\n        printf("等边三角形\\n");\n    } else if (a == b || b == c || a == c) {\n        printf("等腰三角形\\n");\n    } else {\n        printf("普通三角形\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/if\\s*\\(/', '本题要求用 if / else if 做多级判断。'],
      ['/else\\s+if/', '形状判断要用 else if 串起多个分支。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出判定结果。']
    ]
  },
  {
    id: 19,
    courseId: 'control-flow',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'easy',
    label: '入门',
    title: '等级评语',
    description: '老师在成绩单上写的是等级字母，需要把字母翻译成中文评语。请用 switch 语句完成字母到评语的转换。',
    input: '一行一个大写字母，取值为 A、B、C、D、F 之一。',
    output: 'A 输出 优秀，B 输出 良好，C 输出 及格，D 输出 不及格，F 输出 需重修。',
    publicCases: [
      { input: 'A', output: '优秀\n' },
      { input: 'C', output: '及格\n' }
    ],
    hiddenCases: [
      { input: 'F', output: '需重修\n' },
      { input: 'D', output: '不及格\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    char grade;\n    scanf(" %c", &grade);\n    // 用 switch 按等级字母分支，输出对应的中文评语\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    char grade;\n    scanf(" %c", &grade);\n    switch (grade) {\n        case \'A\':\n            printf("优秀\\n");\n            break;\n        case \'B\':\n            printf("良好\\n");\n            break;\n        case \'C\':\n            printf("及格\\n");\n            break;\n        case \'D\':\n            printf("不及格\\n");\n            break;\n        case \'F\':\n            printf("需重修\\n");\n            break;\n        default:\n            printf("未知等级\\n");\n            break;\n    }\n    return 0;\n}',
    checks: [
      ['/switch\\s*\\(/', '本题要求使用 switch 语句实现多分支。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出评语。']
    ]
  },
  {
    id: 20,
    courseId: 'control-flow',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'medium',
    label: '进阶',
    title: '简易计算器',
    description: '请实现一个支持加、减、乘、除四种运算的简易计算器，用 switch 根据运算符选择要做的运算，遇到不认识的运算符要有兜底处理。',
    input: '一行，格式为「整数 a 运算符 op 整数 b」，op 取 +、-、*、/ 之一，三段之间用空格分隔；当 op 是 / 时保证 b 不为 0。',
    output: '输出整数运算结果；如果 op 不是这四种运算符之一，输出 未知运算符。',
    publicCases: [
      { input: '7 + 3', output: '10\n' },
      { input: '9 / 2', output: '4\n' }
    ],
    hiddenCases: [
      { input: '-6 * 7', output: '-42\n' },
      { input: '5 ^ 2', output: '未知运算符\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    char op;\n    scanf("%d %c %d", &a, &op, &b);\n    // 用 switch(op) 分四种运算处理，default 分支输出 未知运算符\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    char op;\n    scanf("%d %c %d", &a, &op, &b);\n    switch (op) {\n        case \'+\':\n            printf("%d\\n", a + b);\n            break;\n        case \'-\':\n            printf("%d\\n", a - b);\n            break;\n        case \'*\':\n            printf("%d\\n", a * b);\n            break;\n        case \'/\':\n            printf("%d\\n", a / b);\n            break;\n        default:\n            printf("未知运算符\\n");\n            break;\n    }\n    return 0;\n}',
    checks: [
      ['/switch\\s*\\(/', '本题要求使用 switch 选择运算。'],
      ['/default\\s*:/', '需要写 default 分支处理不认识的运算符。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读入算式。']
    ]
  },
  {
    id: 21,
    courseId: 'control-flow',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'hard',
    label: '挑战',
    title: '月份天数',
    description: '日历上每个月的天数不一样，2 月还会随闰年变化。请用 switch 按月份分组处理，输出给定年份、月份对应的天数。',
    input: '一行两个整数 year 和 month（1 ≤ year ≤ 9999，1 ≤ month ≤ 12），用空格分隔。',
    output: '输出该月的天数。',
    publicCases: [
      { input: '2024 2', output: '29\n' },
      { input: '2023 4', output: '30\n' }
    ],
    hiddenCases: [
      { input: '1900 2', output: '28\n' },
      { input: '2000 12', output: '31\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int year, month, days;\n    scanf("%d %d", &year, &month);\n    // 用 switch 把 31 天和 30 天的月份合并处理，2 月再结合闰年判断\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int year, month, days;\n    scanf("%d %d", &year, &month);\n    switch (month) {\n        case 1:\n        case 3:\n        case 5:\n        case 7:\n        case 8:\n        case 10:\n        case 12:\n            days = 31;\n            break;\n        case 4:\n        case 6:\n        case 9:\n        case 11:\n            days = 30;\n            break;\n        default:\n            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {\n                days = 29;\n            } else {\n                days = 28;\n            }\n            break;\n    }\n    printf("%d\\n", days);\n    return 0;\n}',
    checks: [
      ['/switch\\s*\\(/', '本题要求使用 switch 按月份分支。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出天数。']
    ]
  },
  {
    id: 22,
    courseId: 'control-flow',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'easy',
    label: '入门',
    title: '存钱罐',
    description: '小华从第 1 天开始往存钱罐里存钱，第 1 天存 1 元，第 2 天存 2 元，以此类推，第 n 天存 n 元。请用 for 循环计算第 n 天结束时一共存了多少元。',
    input: '一行一个整数 n（1 ≤ n ≤ 10000）。',
    output: '输出 1 + 2 + ... + n 的和。',
    publicCases: [
      { input: '100', output: '5050\n' },
      { input: '10', output: '55\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1\n' },
      { input: '10000', output: '50005000\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, sum = 0;\n    scanf("%d", &n);\n    // 用 for 循环从 1 累加到 n，输出累加结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, i, sum = 0;\n    scanf("%d", &n);\n    for (i = 1; i <= n; i++) {\n        sum += i;\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(/', '本题要求使用 for 循环累加。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 23,
    courseId: 'control-flow',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'medium',
    label: '进阶',
    title: '班级成绩',
    description: '班主任拿到全班 n 名同学的数学成绩，想知道有多少人及格（60 分及以上），以及全班的平均分是多少。请边读入边统计。',
    input: '第一行一个整数 n（1 ≤ n ≤ 1000）；第二行 n 个整数，表示每名同学的成绩（0 ≤ 成绩 ≤ 100），用空格分隔。',
    output: '第一行输出及格人数，第二行输出全班平均分（保留两位小数）。',
    publicCases: [
      { input: '5\n80 59 60 90 30', output: '3\n63.80\n' },
      { input: '3\n0 0 0', output: '0\n0.00\n' }
    ],
    hiddenCases: [
      { input: '1\n60', output: '1\n60.00\n' },
      { input: '4\n100 100 100 100', output: '4\n100.00\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, score, pass = 0, sum = 0;\n    scanf("%d", &n);\n    // 用 for 循环读入 n 个成绩，累加总分并统计及格人数，最后输出两个结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, i, score, pass = 0, sum = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &score);\n        sum += score;\n        if (score >= 60) {\n            pass++;\n        }\n    }\n    printf("%d\\n", pass);\n    printf("%.2f\\n", (double)sum / n);\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(|while\\s*\\(/', '需要用循环读入并统计全部成绩。'],
      ['/%\\.2f/', '平均分必须保留两位小数。']
    ]
  },
  {
    id: 24,
    courseId: 'control-flow',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'hard',
    label: '挑战',
    title: '约数统计',
    description: '数学课上老师给出一个正整数 n，请统计它一共有多少个约数，并求出所有约数之和。注意 n = 1 时约数只有 1 个。',
    input: '一行一个正整数 n（1 ≤ n ≤ 1000000）。',
    output: '第一行输出约数的个数，第二行输出所有约数之和。',
    publicCases: [
      { input: '12', output: '6\n28\n' },
      { input: '7', output: '2\n8\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1\n1\n' },
      { input: '1000000', output: '49\n2480437\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, count = 0;\n    long long sum = 0;\n    scanf("%d", &n);\n    // 用 for 循环枚举 1 到 n，判断每个数能否整除 n，统计个数与总和\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, i, count = 0;\n    long long sum = 0;\n    scanf("%d", &n);\n    for (i = 1; i <= n; i++) {\n        if (n % i == 0) {\n            count++;\n            sum += i;\n        }\n    }\n    printf("%d\\n", count);\n    printf("%lld\\n", sum);\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(|while\\s*\\(/', '需要用循环枚举 1 到 n 的每个整数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出个数与总和。']
    ]
  },
  {
    id: 25,
    courseId: 'control-flow',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'easy',
    label: '入门',
    title: '编号位数',
    description: '仓库里的每件货物都有一个正整数编号。请用 while 循环反复除以 10，数一数这个编号一共有多少位数字。',
    input: '一行一个正整数 n（1 ≤ n ≤ 1000000000）。',
    output: '输出 n 的位数。',
    publicCases: [
      { input: '12345', output: '5\n' },
      { input: '7', output: '1\n' }
    ],
    hiddenCases: [
      { input: '10', output: '2\n' },
      { input: '1000000000', output: '10\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, count = 0;\n    scanf("%d", &n);\n    // 用 while 循环反复除以 10，每除一次位数加一，直到 n 变成 0\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, count = 0;\n    scanf("%d", &n);\n    while (n > 0) {\n        count++;\n        n /= 10;\n    }\n    printf("%d\\n", count);\n    return 0;\n}',
    checks: [
      ['/while\\s*\\(|do\\s*\\{/', '本题要求使用 while 或 do-while 循环。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出位数。']
    ]
  },
  {
    id: 26,
    courseId: 'control-flow',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'medium',
    label: '进阶',
    title: '最大公约数',
    description: '要把一张长 a 厘米、宽 b 厘米的长方形纸裁成同样大小的正方形且没有剩余，正方形的边长最大是多少？这其实就是求 a 和 b 的最大公约数，可以用辗转相除法。',
    input: '一行两个正整数 a 和 b（1 ≤ a, b ≤ 1000000），用空格分隔。',
    output: '输出 a 和 b 的最大公约数。',
    publicCases: [
      { input: '12 18', output: '6\n' },
      { input: '100 75', output: '25\n' }
    ],
    hiddenCases: [
      { input: '1 1', output: '1\n' },
      { input: '1000000 999999', output: '1\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b, t;\n    scanf("%d %d", &a, &b);\n    // 用 while 循环做辗转相除：b 不为 0 时不断把余数交给下一轮\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b, t;\n    scanf("%d %d", &a, &b);\n    while (b != 0) {\n        t = a % b;\n        a = b;\n        b = t;\n    }\n    printf("%d\\n", a);\n    return 0;\n}',
    checks: [
      ['/while\\s*\\(|do\\s*\\{/', '本题要求使用 while 循环实现辗转相除。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出最大公约数。']
    ]
  },
  {
    id: 27,
    courseId: 'control-flow',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'hard',
    label: '挑战',
    title: '序列统计',
    description: '传感器依次传来一串整数读数，读到一个 0 就表示采集结束，这个 0 本身不算数据。请统计一共有多少个有效读数，以及它们的总和、最大值和最小值。',
    input: '一行若干个整数，每个整数的绝对值不超过 1000，以 0 作为结束标志；保证至少有一个非零整数。',
    output: '共四行，依次输出有效读数的个数、总和、最大值、最小值。',
    publicCases: [
      { input: '4 9 2 -1 0', output: '4\n14\n9\n-1\n' },
      { input: '10 0', output: '1\n10\n10\n10\n' }
    ],
    hiddenCases: [
      { input: '-5 -9 0', output: '2\n-14\n-5\n-9\n' },
      { input: '1000 -1000 500 0', output: '3\n500\n1000\n-1000\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int x;\n    // 用 while 循环不断读入整数，读到 0 就结束，同时统计个数、总和、最大值、最小值\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <limits.h>\n\nint main(void) {\n    int x, count = 0, sum = 0;\n    int max = INT_MIN, min = INT_MAX;\n    while (scanf("%d", &x) == 1 && x != 0) {\n        count++;\n        sum += x;\n        if (x > max) {\n            max = x;\n        }\n        if (x < min) {\n            min = x;\n        }\n    }\n    printf("%d\\n", count);\n    printf("%d\\n", sum);\n    printf("%d\\n", max);\n    printf("%d\\n", min);\n    return 0;\n}',
    checks: [
      ['/while\\s*\\(/', '本题要求使用 while 循环配合结束条件读取数据。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出四项统计结果。']
    ]
  },
  {
    id: 28,
    courseId: 'control-flow',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'easy',
    label: '入门',
    title: '星号楼梯',
    description: '用星号打印一个楼梯图案：第 1 行 1 个星号，第 2 行 2 个星号，依次递增，第 n 行有 n 个星号。请用嵌套循环完成。',
    input: '一行一个整数 n（1 ≤ n ≤ 10）。',
    output: '输出 n 行，第 i 行由 i 个星号组成，行末没有多余空格。',
    publicCases: [
      { input: '3', output: '*\n**\n***\n' },
      { input: '1', output: '*\n' }
    ],
    hiddenCases: [
      { input: '2', output: '*\n**\n' },
      { input: '10', output: '*\n**\n***\n****\n*****\n******\n*******\n********\n*********\n**********\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, j;\n    scanf("%d", &n);\n    // 外层循环控制行数，内层循环控制每行输出的星号个数\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, i, j;\n    scanf("%d", &n);\n    for (i = 1; i <= n; i++) {\n        for (j = 1; j <= i; j++) {\n            printf("*");\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(/', '本题需要用嵌套 for 循环完成。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出图案。']
    ]
  },
  {
    id: 29,
    courseId: 'control-flow',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'medium',
    label: '进阶',
    title: '乘法表',
    description: '数学老师要打印一张下三角乘法表：第 i 行输出 j 从 1 到 i 的乘法算式，格式是 j*i=积，算式之间用一个空格分隔，行末不要多输出空格。',
    input: '一行一个整数 n（1 ≤ n ≤ 9），表示乘法表的行数。',
    output: '输出 n 行，第 i 行有 i 个算式 j*i=积（j 从 1 到 i），算式之间用一个空格分隔，行末没有多余空格。',
    publicCases: [
      { input: '2', output: '1*1=1\n1*2=2 2*2=4\n' },
      { input: '3', output: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1*1=1\n' },
      { input: '9', output: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n1*4=4 2*4=8 3*4=12 4*4=16\n1*5=5 2*5=10 3*5=15 4*5=20 5*5=25\n1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36\n1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49\n1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64\n1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, j;\n    scanf("%d", &n);\n    // 外层循环枚举行 i，内层循环枚举列 j（1 到 i），注意只在算式之间输出空格\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, i, j;\n    scanf("%d", &n);\n    for (i = 1; i <= n; i++) {\n        for (j = 1; j <= i; j++) {\n            if (j > 1) {\n                printf(" ");\n            }\n            printf("%d*%d=%d", j, i, j * i);\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(/', '本题需要用嵌套 for 循环逐行输出。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出算式。']
    ]
  },
  {
    id: 30,
    courseId: 'control-flow',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'hard',
    label: '挑战',
    title: '数字金字塔',
    description: '用数字打印一座金字塔：第 i 行先输出 n-i 个空格把数字顶到中间，接着输出从 1 递增到 i、再从 i-1 递减回 1 的数字，形成对称的塔身。',
    input: '一行一个整数 n（1 ≤ n ≤ 9）。',
    output: '输出 n 行，第 i 行由 n-i 个空格和一段先升后降的数字组成，行末没有多余空格。',
    publicCases: [
      { input: '2', output: ' 1\n121\n' },
      { input: '3', output: '  1\n 121\n12321\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1\n' },
      { input: '9', output: '        1\n       121\n      12321\n     1234321\n    123454321\n   12345654321\n  1234567654321\n 123456787654321\n12345678987654321\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, j;\n    scanf("%d", &n);\n    // 每行分三步：先输出 n-i 个空格，再输出 1 到 i，最后输出 i-1 到 1\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, i, j;\n    scanf("%d", &n);\n    for (i = 1; i <= n; i++) {\n        for (j = 0; j < n - i; j++) {\n            printf(" ");\n        }\n        for (j = 1; j <= i; j++) {\n            printf("%d", j);\n        }\n        for (j = i - 1; j >= 1; j--) {\n            printf("%d", j);\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(/', '本题需要用嵌套 for 循环分别输出空格、升序数字和降序数字。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出图案。']
    ]
  },
  {
    id: 31,
    courseId: 'functions',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'easy',
    label: '入门',
    title: '偏差幅度',
    description: '温度传感器记录了一个相对基准的偏差值 n，可能是负数。请自己定义一个求绝对值的函数，在主函数里调用它，输出这个偏差的幅度。',
    input: '一行一个整数 n（-1000000 ≤ n ≤ 1000000）。',
    output: '输出 n 的绝对值。',
    publicCases: [
      { input: '-7', output: '7\n' },
      { input: '25', output: '25\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0\n' },
      { input: '-1000000', output: '1000000\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义求绝对值的函数\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 调用自己定义的函数并输出结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint myAbs(int n) {\n    if (n < 0) {\n        return -n;\n    }\n    return n;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", myAbs(n));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须自己定义一个函数（例如 int myAbs(int n) { ... }）。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 32,
    courseId: 'functions',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'medium',
    label: '进阶',
    title: '幂运算函数',
    description: '请定义一个函数计算 base 的 exp 次方（exp 是非负整数），函数要用 return 把结果交回给调用者，主函数只负责读入数据并输出。规定任何数的 0 次方都等于 1。',
    input: '一行两个整数 base 和 exp（1 ≤ base ≤ 10，0 ≤ exp ≤ 9），用空格分隔。',
    output: '输出 base 的 exp 次方。',
    publicCases: [
      { input: '2 5', output: '32\n' },
      { input: '3 3', output: '27\n' }
    ],
    hiddenCases: [
      { input: '7 0', output: '1\n' },
      { input: '10 9', output: '1000000000\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义求幂的函数，用循环把 base 连乘 exp 次\n\nint main(void) {\n    int base, exp;\n    scanf("%d %d", &base, &exp);\n    // 调用自己定义的函数并输出结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint power(int base, int exp) {\n    int i, result = 1;\n    for (i = 0; i < exp; i++) {\n        result *= base;\n    }\n    return result;\n}\n\nint main(void) {\n    int base, exp;\n    scanf("%d %d", &base, &exp);\n    printf("%d\\n", power(base, exp));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须自己定义一个幂运算函数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 33,
    courseId: 'functions',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'hard',
    label: '挑战',
    title: '两点距离',
    description: '地图上有两个点，坐标分别是 (x1, y1) 和 (x2, y2)。请定义两个函数：一个求平方，另一个在内部调用它，用勾股定理算出两点之间的直线距离。距离保留两位小数。',
    input: '一行四个整数 x1、y1、x2、y2（-1000 ≤ 各坐标 ≤ 1000），用空格分隔。',
    output: '输出两点之间的直线距离，保留两位小数。',
    publicCases: [
      { input: '0 0 3 4', output: '5.00\n' },
      { input: '1 1 4 5', output: '5.00\n' }
    ],
    hiddenCases: [
      { input: '0 0 0 0', output: '0.00\n' },
      { input: '-1000 -1000 1000 1000', output: '2828.43\n' }
    ],
    starter: '#include <stdio.h>\n#include <math.h>\n\n// 在这里定义求平方的函数，再定义一个调用它求距离的函数\n\nint main(void) {\n    int x1, y1, x2, y2;\n    scanf("%d %d %d %d", &x1, &y1, &x2, &y2);\n    // 调用距离函数并保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <math.h>\n\ndouble square(double x) {\n    return x * x;\n}\n\ndouble distance(double x1, double y1, double x2, double y2) {\n    return sqrt(square(x2 - x1) + square(y2 - y1));\n}\n\nint main(void) {\n    int x1, y1, x2, y2;\n    scanf("%d %d %d %d", &x1, &y1, &x2, &y2);\n    printf("%.2f\\n", distance(x1, y1, x2, y2));\n    return 0;\n}',
    checks: [
      ['/sqrt\\s*\\(/', '计算距离需要用到 sqrt 开平方。'],
      ['/%\\.2f/', '输出必须保留两位小数。']
    ]
  },
  {
    id: 34,
    courseId: 'functions',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'easy',
    label: '入门',
    title: '三位评委',
    description: '才艺比赛上有三位评委分别打分，分数保存在 a、b、c 三个变量里。请定义一个带三个参数的函数求出最高分，在主函数中调用它。',
    input: '一行三个整数 a、b、c（-10000 ≤ 各分数 ≤ 10000），用空格分隔。',
    output: '输出三个分数中的最大值。',
    publicCases: [
      { input: '88 95 79', output: '95\n' },
      { input: '-1 -2 -3', output: '-1\n' }
    ],
    hiddenCases: [
      { input: '5 5 5', output: '5\n' },
      { input: '-10000 0 10000', output: '10000\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义一个带三个参数的函数，返回其中的最大值\n\nint main(void) {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    // 调用自己定义的函数并输出最高分\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint max3(int a, int b, int c) {\n    int m = a;\n    if (b > m) {\n        m = b;\n    }\n    if (c > m) {\n        m = c;\n    }\n    return m;\n}\n\nint main(void) {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    printf("%d\\n", max3(a, b, c));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*,[^;]*\\)\\s*\\{/', '必须定义一个带多个参数的函数（参数之间用逗号分隔）。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出最高分。']
    ]
  },
  {
    id: 35,
    courseId: 'functions',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'medium',
    label: '进阶',
    title: '组合数计算',
    description: '从 n 名同学中选出 k 名参加比赛，一共有多少种选法？组合数公式为 C(n, k) = n! ÷ (k! × (n-k)!)。请定义一个求阶乘的函数，再定义一个带两个参数的函数求组合数。',
    input: '一行两个整数 n 和 k（0 ≤ k ≤ n ≤ 12），用空格分隔。',
    output: '输出组合数 C(n, k) 的值。',
    publicCases: [
      { input: '5 2', output: '10\n' },
      { input: '6 3', output: '20\n' }
    ],
    hiddenCases: [
      { input: '0 0', output: '1\n' },
      { input: '12 6', output: '924\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义求阶乘的函数，再定义求组合数的函数（内部调用阶乘函数）\n\nint main(void) {\n    int n, k;\n    scanf("%d %d", &n, &k);\n    // 调用组合数函数并输出结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint factorial(int n) {\n    int i, result = 1;\n    for (i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\nint combine(int n, int k) {\n    return factorial(n) / (factorial(k) * factorial(n - k));\n}\n\nint main(void) {\n    int n, k;\n    scanf("%d %d", &n, &k);\n    printf("%d\\n", combine(n, k));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须自己定义函数完成阶乘与组合数的计算。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 36,
    courseId: 'functions',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'hard',
    label: '挑战',
    title: '一年第几天',
    description: '输入一个合法日期，算一算这一天是这一年的第几天。请把任务拆成两个函数：一个判断闰年，另一个累加前面各月的天数并调用闰年函数，主函数只负责读入和输出。',
    input: '一行三个整数 year、month、day，表示一个合法日期（1 ≤ year ≤ 9999）。',
    output: '输出这一天是这一年的第几天。',
    publicCases: [
      { input: '2024 3 1', output: '61\n' },
      { input: '2023 3 1', output: '60\n' }
    ],
    hiddenCases: [
      { input: '2024 1 1', output: '1\n' },
      { input: '2024 12 31', output: '366\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义判断闰年的函数，再定义计算第几天的函数\n\nint main(void) {\n    int year, month, day;\n    scanf("%d %d %d", &year, &month, &day);\n    // 调用计算函数并输出这一天是第几天\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint isLeap(int year) {\n    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;\n}\n\nint dayOfYear(int year, int month, int day) {\n    int days[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\n    int i, total = day;\n    if (isLeap(year)) {\n        days[2] = 29;\n    }\n    for (i = 1; i < month; i++) {\n        total += days[i];\n    }\n    return total;\n}\n\nint main(void) {\n    int year, month, day;\n    scanf("%d %d %d", &year, &month, &day);\n    printf("%d\\n", dayOfYear(year, month, day));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须把闰年判断和天数计算拆成自己的函数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 37,
    courseId: 'functions',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'easy',
    label: '入门',
    title: '平方和',
    description: '定义一个函数计算 1² + 2² + ... + n²。用来累加的变量必须是函数内部的局部变量，它每次被调用时都会重新创建并初始化为 0。',
    input: '一行一个整数 n（1 ≤ n ≤ 1000）。',
    output: '输出 1² + 2² + ... + n² 的和。',
    publicCases: [
      { input: '3', output: '14\n' },
      { input: '10', output: '385\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1\n' },
      { input: '1000', output: '333833500\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义函数：函数内部用局部变量 sum 累加 i*i\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 调用自己定义的函数并输出结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint squareSum(int n) {\n    int i, sum = 0;\n    for (i = 1; i <= n; i++) {\n        sum += i * i;\n    }\n    return sum;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", squareSum(n));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须定义自己的函数完成累加。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 38,
    courseId: 'functions',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'medium',
    label: '进阶',
    title: '累计求和',
    description: '请定义一个函数，每次调用时把传入的数累加到一个静态局部变量里，并返回当前的累计和。静态局部变量只在第一次调用时初始化，之后一直保留上一次的值。',
    input: '第一行一个整数 n（1 ≤ n ≤ 10）；第二行 n 个整数（每个数的绝对值不超过 1000），用空格分隔。',
    output: '输出 n 行，第 i 行是前 i 个数的累计和。',
    publicCases: [
      { input: '3\n1 2 3', output: '1\n3\n6\n' },
      { input: '2\n-5 -5', output: '-5\n-10\n' }
    ],
    hiddenCases: [
      { input: '1\n7', output: '7\n' },
      { input: '4\n1000 -1000 1000 -1000', output: '1000\n0\n1000\n0\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义函数：用 static int 保存累计值，每次调用都累加参数\n\nint main(void) {\n    int n, i, x;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &x);\n        // 调用累计函数并换行输出本次的累计和\n    }\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint accumulate(int x) {\n    static int total = 0;\n    total += x;\n    return total;\n}\n\nint main(void) {\n    int n, i, x;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &x);\n        printf("%d\\n", accumulate(x));\n    }\n    return 0;\n}',
    checks: [
      ['/static\\s+int/', '本题要求用静态局部变量（static int）保存累计结果。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出每次的累计和。']
    ]
  },
  {
    id: 39,
    courseId: 'functions',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'hard',
    label: '挑战',
    title: '数根',
    description: '数根的算法是：把一个数的各位数字相加，如果结果还大于等于 10，就继续把各位数字相加，直到得到一位数。请定义求各位数字之和的函数，并用它算出数根。',
    input: '一行一个正整数 n（1 ≤ n ≤ 999999999）。',
    output: '第一行输出 n 的各位数字之和，第二行输出 n 的数根。',
    publicCases: [
      { input: '12345', output: '15\n6\n' },
      { input: '999', output: '27\n9\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1\n1\n' },
      { input: '999999999', output: '81\n9\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义求各位数字之和的函数，再定义求数根的函数（反复调用前者）\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 分别调用两个函数并各输出一行\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint digitSum(int n) {\n    int sum = 0;\n    while (n > 0) {\n        sum += n % 10;\n        n /= 10;\n    }\n    return sum;\n}\n\nint digitalRoot(int n) {\n    while (n >= 10) {\n        n = digitSum(n);\n    }\n    return n;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", digitSum(n));\n    printf("%d\\n", digitalRoot(n));\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须定义自己的函数（如 digitSum、digitalRoot）。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出两个结果。']
    ]
  },
  {
    id: 40,
    courseId: 'functions',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'easy',
    label: '入门',
    title: '递归阶乘',
    description: '请用递归函数计算 n 的阶乘。递归的基线（终止条件）是 0! = 1、1! = 1，其余情况返回 n 乘以 (n-1) 的阶乘。',
    input: '一行一个整数 n（0 ≤ n ≤ 12）。',
    output: '输出 n! 的值。',
    publicCases: [
      { input: '5', output: '120\n' },
      { input: '3', output: '6\n' }
    ],
    hiddenCases: [
      { input: '0', output: '1\n' },
      { input: '12', output: '479001600\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义递归函数：先写 n <= 1 的基线，再 return n * 自身(n - 1)\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 调用递归函数并输出结果\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", factorial(n));\n    return 0;\n}',
    checks: [
      ['/return[^;]*\\w+\\s*\\(/', '必须在函数里用 return 调用自身实现递归。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 41,
    courseId: 'functions',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'medium',
    label: '进阶',
    title: '递归斐波那契',
    description: '斐波那契数列满足 F(0) = 0、F(1) = 1，当 n ≥ 2 时 F(n) = F(n-1) + F(n-2)。请用递归函数求数列的第 n 项。',
    input: '一行一个整数 n（0 ≤ n ≤ 30）。',
    output: '输出斐波那契数列的第 n 项。',
    publicCases: [
      { input: '6', output: '8\n' },
      { input: '10', output: '55\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0\n' },
      { input: '30', output: '832040\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义递归函数：n < 2 时直接返回 n，否则返回前两项之和\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 调用递归函数并输出第 n 项\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint fib(int n) {\n    if (n < 2) {\n        return n;\n    }\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", fib(n));\n    return 0;\n}',
    checks: [
      ['/return[^;]*\\w+\\s*\\(/', '必须在函数里用 return 调用自身实现递归。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出第 n 项。']
    ]
  },
  {
    id: 42,
    courseId: 'functions',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'hard',
    label: '挑战',
    title: '汉诺塔步数',
    description: '汉诺塔问题：n 个大小不同的圆盘套在 A 柱上，每次只能移动一个圆盘，而且大盘不能压在小盘上，要把它们全部移到 C 柱。请用递归函数求最少需要移动多少次，规模大时结果会超出 int 的范围。',
    input: '一行一个整数 n（1 ≤ n ≤ 62）。',
    output: '输出把 n 个圆盘全部移到 C 柱所需的最少移动次数。',
    publicCases: [
      { input: '3', output: '7\n' },
      { input: '10', output: '1023\n' }
    ],
    hiddenCases: [
      { input: '1', output: '1\n' },
      { input: '62', output: '4611686018427387903\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义递归函数：把上面 n-1 个盘子搬走两次，再加上移动最大盘的一次\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 调用递归函数并输出最少移动次数（注意结果可能超出 int 范围）\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nunsigned long long hanoi(int n) {\n    if (n <= 0) {\n        return 0ULL;\n    }\n    return 2ULL * hanoi(n - 1) + 1ULL;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%llu\\n", hanoi(n));\n    return 0;\n}',
    checks: [
      ['/return[^;]*\\w+\\s*\\(/', '必须在函数里用 return 调用自身实现递归。'],
      ['/%llu/', '结果超出 int 范围，需要用 unsigned long long 配合 %llu 输出。']
    ]
  },
  {
    id: 43,
    courseId: 'functions',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'easy',
    label: '入门',
    title: '质数判定',
    description: '质数是大于 1 且只能被 1 和它本身整除的整数。请把判断逻辑封装成一个函数，在主函数中读入一个整数，根据函数的返回值输出判断结果。',
    input: '一行一个整数 n（1 ≤ n ≤ 100000）。',
    output: 'n 是质数输出 YES，否则输出 NO。',
    publicCases: [
      { input: '97', output: 'YES\n' },
      { input: '100', output: 'NO\n' }
    ],
    hiddenCases: [
      { input: '1', output: 'NO\n' },
      { input: '2', output: 'YES\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义判断质数的函数，注意 1 不是质数\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // 调用函数，根据返回值输出 YES 或 NO\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint isPrime(int n) {\n    int i;\n    if (n < 2) {\n        return 0;\n    }\n    for (i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            return 0;\n        }\n    }\n    return 1;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    if (isPrime(n)) {\n        printf("YES\\n");\n    } else {\n        printf("NO\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须把质数判断封装成一个函数。'],
      ['/for\\s*\\(|while\\s*\\(/', '函数内部需要用循环试除。']
    ]
  },
  {
    id: 44,
    courseId: 'functions',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'medium',
    label: '进阶',
    title: '分段函数',
    description: '定义一个分段函数 f(x)：当 x < 0 时 f(x) = |x|；当 0 ≤ x < 10 时 f(x) = x²；当 x ≥ 10 时 f(x) = 3x - 5。主函数读入 x，调用这个函数并输出结果。',
    input: '一行一个实数 x（-1000 ≤ x ≤ 1000）。',
    output: '输出 f(x) 的值，保留两位小数。',
    publicCases: [
      { input: '-3', output: '3.00\n' },
      { input: '5', output: '25.00\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0.00\n' },
      { input: '10', output: '25.00\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义返回 double 的分段函数 f(x)，按 x 的三个区间分别返回\n\nint main(void) {\n    double x;\n    scanf("%lf", &x);\n    // 调用分段函数并保留两位小数输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ndouble f(double x) {\n    if (x < 0) {\n        return -x;\n    }\n    if (x < 10) {\n        return x * x;\n    }\n    return 3 * x - 5;\n}\n\nint main(void) {\n    double x;\n    scanf("%lf", &x);\n    printf("%.2f\\n", f(x));\n    return 0;\n}',
    checks: [
      ['/\\bdouble\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须定义一个返回 double 的函数来完成分段计算。'],
      ['/%\\.2f/', '输出必须保留两位小数。']
    ]
  },
  {
    id: 45,
    courseId: 'functions',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'hard',
    label: '挑战',
    title: '完全数',
    description: '完全数是指恰好等于它所有真因子（除自身以外的约数）之和的正整数，例如 6 = 1 + 2 + 3。请把判断完全数的逻辑封装成函数，输出 1 到 n 之间的所有完全数。',
    input: '一行一个整数 n（2 ≤ n ≤ 10000）。',
    output: '从小到大每行输出一个完全数；如果 1 到 n 之间没有完全数，输出 None。',
    publicCases: [
      { input: '30', output: '6\n28\n' },
      { input: '5', output: 'None\n' }
    ],
    hiddenCases: [
      { input: '6', output: '6\n' },
      { input: '10000', output: '6\n28\n496\n8128\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义判断完全数的函数：累加真因子，再和自身比较\n\nint main(void) {\n    int n, i;\n    scanf("%d", &n);\n    // 枚举 2 到 n，输出所有完全数；一个都没有时输出 None\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint isPerfect(int n) {\n    int d, sum = 1;\n    if (n < 2) {\n        return 0;\n    }\n    for (d = 2; d * d <= n; d++) {\n        if (n % d == 0) {\n            sum += d;\n            if (d != n / d) {\n                sum += n / d;\n            }\n        }\n    }\n    return sum == n;\n}\n\nint main(void) {\n    int n, i, found = 0;\n    scanf("%d", &n);\n    for (i = 2; i <= n; i++) {\n        if (isPerfect(i)) {\n            printf("%d\\n", i);\n            found = 1;\n        }\n    }\n    if (!found) {\n        printf("None\\n");\n    }\n    return 0;\n}',
    checks: [
      ['/\\bint\\s+[A-Za-z_]\\w*\\s*\\([^;]*\\)\\s*\\{/', '必须把完全数判断封装成一个函数。'],
      ['/for\\s*\\(|while\\s*\\(/', '需要用循环枚举 1 到 n 的整数。']
    ]
  },
  {
    id: 46,
    courseId: 'pointers',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'easy',
    label: '入门',
    title: '指针改值',
    description: '输入一个整数，定义指针 p 指向它，先用 *p 输出原值，再通过 *p 把这个整数变成它的相反数并输出。',
    input: '一行包含一个整数 n（-1000 ≤ n ≤ 1000）。',
    output: '一行输出两个整数，用空格分隔：先是原值，再是取相反数之后的值，行末换行。',
    publicCases: [
      { input: '7', output: '7 -7\n' },
      { input: '-12', output: '-12 12\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0 0\n' },
      { input: '1000', output: '1000 -1000\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    int *p = &n;\n    scanf("%d", &n);\n    // 先输出 *p 的值，再用 *p 把 n 改成它的相反数\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    int *p = &n;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    printf("%d ", *p);\n    *p = -*p;\n    printf("%d\\n", n);\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读取输入的整数。']
    ]
  },
  {
    id: 47,
    courseId: 'pointers',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'medium',
    label: '进阶',
    title: '指针扫描统计',
    description: '输入 n 个整数存进数组，然后用一个指针从首元素依次扫描到末尾，统计其中正数、负数和零的个数。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数，用空格分隔。',
    output: '一行输出三个整数，依次为正数个数、负数个数、零的个数，用空格分隔，行末换行。',
    publicCases: [
      { input: '5\n3 -2 0 7 -5', output: '2 2 1\n' },
      { input: '4\n1 2 3 4', output: '4 0 0\n' }
    ],
    hiddenCases: [
      { input: '1\n0', output: '0 0 1\n' },
      { input: '6\n-1 -2 -3 -4 -5 -6', output: '0 6 0\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, a[100];\n    int *p;\n    int positive = 0, negative = 0, zero = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    // 让指针 p 从 a 走到 a + n，用 *p 判断正数、负数、零\n    printf("%d %d %d\\n", positive, negative, zero);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, a[100];\n    int *p;\n    int positive = 0, negative = 0, zero = 0;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    for (p = a; p < a + n; p++) {\n        if (*p > 0) {\n            positive++;\n        } else if (*p < 0) {\n            negative++;\n        } else {\n            zero++;\n        }\n    }\n    printf("%d %d %d\\n", positive, negative, zero);\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(|while\\s*\\(/', '必须使用循环遍历数组。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 48,
    courseId: 'pointers',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'hard',
    label: '挑战',
    title: '指针三数排序',
    description: '输入三个整数，分别用三个指针指向它们，只通过解引用比较并交换，使三个数按从小到大排列后输出。',
    input: '一行包含三个整数 a、b、c（-1000 ≤ 每个整数 ≤ 1000），用空格分隔。',
    output: '一行输出排序后的三个整数，用空格分隔，行末换行。',
    publicCases: [
      { input: '3 1 2', output: '1 2 3\n' },
      { input: '5 5 1', output: '1 5 5\n' }
    ],
    hiddenCases: [
      { input: '-1 -2 -3', output: '-3 -2 -1\n' },
      { input: '7 7 7', output: '7 7 7\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    int *p = &a, *q = &b, *r = &c;\n    scanf("%d %d %d", &a, &b, &c);\n    // 通过指针解引用比较并交换，使 *p <= *q <= *r\n    printf("%d %d %d\\n", *p, *q, *r);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstatic void swap(int *x, int *y) {\n    int t = *x;\n    *x = *y;\n    *y = t;\n}\n\nint main(void) {\n    int a, b, c;\n    int *p = &a, *q = &b, *r = &c;\n    if (scanf("%d %d %d", &a, &b, &c) != 3) {\n        return 0;\n    }\n    if (*p > *q) {\n        swap(p, q);\n    }\n    if (*q > *r) {\n        swap(q, r);\n    }\n    if (*p > *q) {\n        swap(p, q);\n    }\n    printf("%d %d %d\\n", *p, *q, *r);\n    return 0;\n}',
    checks: [
      ['/printf\\s*\\(/', '必须使用 printf 输出排序结果。'],
      ['/scanf\\s*\\(/', '必须使用 scanf 读取三个整数。']
    ]
  },
  {
    id: 49,
    courseId: 'pointers',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'easy',
    label: '入门',
    title: '指针遍历求和',
    description: '输入 n 个整数存进数组，让指针 p 从 a 一直走到 a + n，用 *p 依次累加所有元素的值。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数，用空格分隔。',
    output: '一行输出这 n 个整数的总和，行末换行。',
    publicCases: [
      { input: '4\n1 2 3 4', output: '10\n' },
      { input: '3\n-5 10 -2', output: '3\n' }
    ],
    hiddenCases: [
      { input: '1\n-7', output: '-7\n' },
      { input: '5\n1000000 1000000 1000000 1000000 1000000', output: '5000000\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, a[100];\n    int sum = 0;\n    int *p;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    // 让指针 p 从 a 走到 a + n，把每个 *p 累加到 sum\n    printf("%d\\n", sum);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, a[100];\n    int sum = 0;\n    int *p;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    for (p = a; p < a + n; p++) {\n        sum += *p;\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(|while\\s*\\(/', '必须使用循环遍历数组。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出总和。']
    ]
  },
  {
    id: 50,
    courseId: 'pointers',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'medium',
    label: '进阶',
    title: '指针逆序数组',
    description: '输入 n 个整数存进数组，用 left 和 right 两个指针分别指向首元素和末元素，向中间靠拢并交换，把数组原地逆序后再输出。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数，用空格分隔。',
    output: '一行输出逆序后的 n 个整数，相邻两个数之间用一个空格分隔，行末换行（末尾不能有多余空格）。',
    publicCases: [
      { input: '5\n1 2 3 4 5', output: '5 4 3 2 1\n' },
      { input: '3\n-1 0 8', output: '8 0 -1\n' }
    ],
    hiddenCases: [
      { input: '1\n42', output: '42\n' },
      { input: '4\n7 7 7 7', output: '7 7 7 7\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, a[100];\n    int *left, *right;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    // 用 left / right 两个指针向中间靠拢，把数组原地逆序\n    for (i = 0; i < n; i++) {\n        printf(i == 0 ? "%d" : " %d", a[i]);\n    }\n    printf("\\n");\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, a[100];\n    int *left, *right;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    left = a;\n    right = a + n - 1;\n    while (left < right) {\n        int t = *left;\n        *left = *right;\n        *right = t;\n        left++;\n        right--;\n    }\n    for (int i = 0; i < n; i++) {\n        printf(i == 0 ? "%d" : " %d", a[i]);\n    }\n    printf("\\n");\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(|while\\s*\\(/', '必须使用循环处理数组元素。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 51,
    courseId: 'pointers',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'hard',
    label: '挑战',
    title: '指针最大差价',
    description: '输入 n 个整数表示连续 n 天的价格，用指针遍历求出「较晚一天的价格减去较早一天的价格」的最大值（必须先买后卖）；若所有差价都不大于 0 则输出 0。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数，表示每天的价格（-1000 ≤ 价格 ≤ 1000），用空格分隔。',
    output: '一行输出最大差价（一个不小于 0 的整数），行末换行。',
    publicCases: [
      { input: '6\n7 1 5 3 6 4', output: '5\n' },
      { input: '5\n9 8 7 6 5', output: '0\n' }
    ],
    hiddenCases: [
      { input: '1\n5', output: '0\n' },
      { input: '4\n-3 -1 -7 -2', output: '5\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n, i, a[100];\n    int lowest, best = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    lowest = a[0];\n    // 用指针从第二天开始遍历，边更新最低价边更新最大差价\n    printf("%d\\n", best);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n, a[100];\n    int *p;\n    int lowest, best = 0;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    lowest = a[0];\n    for (p = a + 1; p < a + n; p++) {\n        if (*p - lowest > best) {\n            best = *p - lowest;\n        }\n        if (*p < lowest) {\n            lowest = *p;\n        }\n    }\n    printf("%d\\n", best);\n    return 0;\n}',
    checks: [
      ['/for\\s*\\(|while\\s*\\(/', '必须使用循环遍历价格。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出最大差价。']
    ]
  },
  {
    id: 52,
    courseId: 'pointers',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'easy',
    label: '入门',
    title: '指针交换两数',
    description: '输入两个整数，写一个函数 void swap(int *a, int *b)，调用时把两个变量的地址传进去，通过指针交换它们的值，然后输出交换后的结果。',
    input: '一行包含两个整数 x 和 y（-1000 ≤ x, y ≤ 1000），用空格分隔。',
    output: '一行输出交换后的两个整数，用空格分隔，行末换行。',
    publicCases: [
      { input: '3 8', output: '8 3\n' },
      { input: '-5 12', output: '12 -5\n' }
    ],
    hiddenCases: [
      { input: '0 1000', output: '1000 0\n' },
      { input: '-1000 -1000', output: '-1000 -1000\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义 void swap(int *a, int *b)\n\nint main(void) {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    // 调用 swap，把两个变量的地址传进去，再输出交换后的结果\n    printf("%d %d\\n", x, y);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main(void) {\n    int x, y;\n    if (scanf("%d %d", &x, &y) != 2) {\n        return 0;\n    }\n    swap(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}',
    checks: [
      ['/void\\s+swap\\s*\\(/', '必须定义 void swap(int *a, int *b) 函数。'],
      ['/swap\\s*\\(\\s*&/', '调用 swap 时必须把变量的地址传进去。']
    ]
  },
  {
    id: 53,
    courseId: 'pointers',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'medium',
    label: '进阶',
    title: '指针回传统计',
    description: '输入 n 个整数，写一个函数 void stat(const int *a, int n, int *sum, int *max, int *min)，用指针参数把总和、最大值、最小值回传给主函数。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数（-1000000 ≤ 每个整数 ≤ 1000000），用空格分隔。',
    output: '分三行输出：第一行总和，第二行最大值，第三行最小值，每行末尾换行。',
    publicCases: [
      { input: '5\n3 1 4 1 5', output: '14\n5\n1\n' },
      { input: '3\n-2 -8 -1', output: '-11\n-1\n-8\n' }
    ],
    hiddenCases: [
      { input: '1\n0', output: '0\n0\n0\n' },
      { input: '4\n1000000 -1000000 0 5', output: '5\n1000000\n-1000000\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义 void stat(const int *a, int n, int *sum, int *max, int *min)\n\nint main(void) {\n    int n, i, a[100];\n    int sum = 0, max = 0, min = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    // 调用 stat，通过指针参数把总和、最大值、最小值带回主函数\n    printf("%d\\n%d\\n%d\\n", sum, max, min);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nvoid stat(const int *a, int n, int *sum, int *max, int *min) {\n    *sum = 0;\n    *max = a[0];\n    *min = a[0];\n    for (int i = 0; i < n; i++) {\n        *sum += a[i];\n        if (a[i] > *max) {\n            *max = a[i];\n        }\n        if (a[i] < *min) {\n            *min = a[i];\n        }\n    }\n}\n\nint main(void) {\n    int n, a[100];\n    int sum = 0, max = 0, min = 0;\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    stat(a, n, &sum, &max, &min);\n    printf("%d\\n%d\\n%d\\n", sum, max, min);\n    return 0;\n}',
    checks: [
      ['/void\\s+stat\\s*\\(/', '必须定义 stat 函数，用指针参数回传统计结果。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 54,
    courseId: 'pointers',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'hard',
    label: '挑战',
    title: '指针拆分数组',
    description: '输入 n 个整数，写一个函数 int split(int *a, int n, int *odd, int *even)，把奇数按原顺序放进 odd 数组、偶数按原顺序放进 even 数组，并返回奇数的个数。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数（-1000 ≤ 每个整数 ≤ 1000），用空格分隔。',
    output: '第一行先输出奇数个数 k，随后输出这 k 个奇数（每个数前面有一个空格）；第二行用同样的格式输出偶数个数与所有偶数。每行末尾换行。',
    publicCases: [
      { input: '6\n1 2 3 4 5 6', output: '3 1 3 5\n3 2 4 6\n' },
      { input: '4\n2 4 6 8', output: '0\n4 2 4 6 8\n' }
    ],
    hiddenCases: [
      { input: '5\n-3 -2 -1 0 7', output: '3 -3 -1 7\n2 -2 0\n' },
      { input: '1\n9', output: '1 9\n0\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义 int split(int *a, int n, int *odd, int *even)\n\nint main(void) {\n    int n, i, a[100], odd[100], even[100];\n    int oddCount = 0, evenCount = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    // 调用 split 拆分数组，再按题目要求的格式输出奇数与偶数\n    printf("%d\\n%d\\n", oddCount, evenCount);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint split(int *a, int n, int *odd, int *even) {\n    int oddCount = 0, evenCount = 0;\n    for (int i = 0; i < n; i++) {\n        if (a[i] % 2 != 0) {\n            odd[oddCount++] = a[i];\n        } else {\n            even[evenCount++] = a[i];\n        }\n    }\n    return oddCount;\n}\n\nint main(void) {\n    int n, a[100], odd[100], even[100];\n    int oddCount, evenCount;\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    oddCount = split(a, n, odd, even);\n    evenCount = n - oddCount;\n    printf("%d", oddCount);\n    for (int i = 0; i < oddCount; i++) {\n        printf(" %d", odd[i]);\n    }\n    printf("\\n");\n    printf("%d", evenCount);\n    for (int i = 0; i < evenCount; i++) {\n        printf(" %d", even[i]);\n    }\n    printf("\\n");\n    return 0;\n}',
    checks: [
      ['/int\\s+split\\s*\\(/', '必须定义 int split(int *a, int n, int *odd, int *even) 函数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 55,
    courseId: 'pointers',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'easy',
    label: '入门',
    title: '动态数组求和',
    description: '输入 n 和接下来的 n 个整数，用 malloc 申请 n 个 int 的空间保存这些数，求和后输出，结束前用 free 释放内存。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 1000）；第二行是 n 个整数，用空格分隔。',
    output: '一行输出这 n 个整数的总和，行末换行。',
    publicCases: [
      { input: '3\n10 20 30', output: '60\n' },
      { input: '5\n-1 -2 -3 -4 -5', output: '-15\n' }
    ],
    hiddenCases: [
      { input: '1\n0', output: '0\n' },
      { input: '4\n1000000 2000000 3 -4', output: '2999999\n' }
    ],
    starter: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n, i, sum = 0;\n    int *a = NULL;\n    scanf("%d", &n);\n    // 用 malloc 申请 n 个 int 的空间，读入 n 个整数并累加\n    // 输出总和后别忘了 free(a);\n    printf("%d\\n", sum);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n, sum = 0;\n    int *a;\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        return 0;\n    }\n    a = (int *)malloc(sizeof(int) * (size_t)n);\n    if (a == NULL) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            free(a);\n            return 0;\n        }\n        sum += a[i];\n    }\n    printf("%d\\n", sum);\n    free(a);\n    return 0;\n}',
    checks: [
      ['/malloc\\s*\\(/', '必须使用 malloc 动态申请内存。'],
      ['/free\\s*\\(/', 'malloc 申请的内存必须用 free 释放。']
    ]
  },
  {
    id: 56,
    courseId: 'pointers',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'medium',
    label: '进阶',
    title: '动态内存统计',
    description: '输入 n 个整数，用 malloc 申请内存保存它们，然后统计最小值、最大值，并输出平均值（保留两位小数），最后释放内存。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 1000）；第二行是 n 个整数（-10000 ≤ 每个整数 ≤ 10000），用空格分隔。',
    output: '分三行输出：第一行最小值，第二行最大值，第三行平均值（保留两位小数），每行末尾换行。',
    publicCases: [
      { input: '4\n2 4 6 8', output: '2\n8\n5.00\n' },
      { input: '3\n1 2 4', output: '1\n4\n2.33\n' }
    ],
    hiddenCases: [
      { input: '1\n-5', output: '-5\n-5\n-5.00\n' },
      { input: '5\n-1 0 1 -2 2', output: '-2\n2\n0.00\n' }
    ],
    starter: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n, i;\n    int min = 0, max = 0;\n    long long sum = 0;\n    int *a = NULL;\n    scanf("%d", &n);\n    // 用 malloc 申请 n 个 int 的空间并读入数据\n    // 统计最小值、最大值和平均值（保留两位小数），最后 free(a);\n    printf("%d\\n%d\\n", min, max);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n, i, min, max;\n    long long sum = 0;\n    int *a;\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        return 0;\n    }\n    a = (int *)malloc(sizeof(int) * (size_t)n);\n    if (a == NULL) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            free(a);\n            return 0;\n        }\n    }\n    min = a[0];\n    max = a[0];\n    for (i = 0; i < n; i++) {\n        sum += a[i];\n        if (a[i] < min) {\n            min = a[i];\n        }\n        if (a[i] > max) {\n            max = a[i];\n        }\n    }\n    printf("%d\\n%d\\n%.2f\\n", min, max, (double)sum / n);\n    free(a);\n    return 0;\n}',
    checks: [
      ['/malloc\\s*\\(/', '必须使用 malloc 动态申请内存。'],
      ['/free\\s*\\(/', 'malloc 申请的内存必须用 free 释放。']
    ]
  },
  {
    id: 57,
    courseId: 'pointers',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'hard',
    label: '挑战',
    title: '动态内存去重',
    description: '输入 n 个整数，用 malloc 申请数组保存数据，再把其中第一次出现的数依次存进另一块动态内存，最后输出不重复元素的个数和这些数。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 1000）；第二行是 n 个整数（-1000 ≤ 每个整数 ≤ 1000），用空格分隔。',
    output: '第一行输出不重复元素的个数 m；第二行按首次出现的顺序输出这 m 个数，相邻两个数用一个空格分隔，行末换行。',
    publicCases: [
      { input: '6\n1 2 2 3 1 4', output: '4\n1 2 3 4\n' },
      { input: '5\n5 5 5 5 5', output: '1\n5\n' }
    ],
    hiddenCases: [
      { input: '1\n-7', output: '1\n-7\n' },
      { input: '7\n0 -1 0 -1 2 2 3', output: '4\n0 -1 2 3\n' }
    ],
    starter: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n, i;\n    int *a = NULL;\n    int *uniq = NULL;\n    scanf("%d", &n);\n    // 用 malloc 申请两块内存：a 存原始数据，uniq 存第一次出现的数\n    // 输出不重复元素个数与这些数，最后把两块内存都 free\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n, i, j, m = 0, found;\n    int *a, *uniq;\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        return 0;\n    }\n    a = (int *)malloc(sizeof(int) * (size_t)n);\n    uniq = (int *)malloc(sizeof(int) * (size_t)n);\n    if (a == NULL || uniq == NULL) {\n        free(a);\n        free(uniq);\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            free(a);\n            free(uniq);\n            return 0;\n        }\n    }\n    for (i = 0; i < n; i++) {\n        found = 0;\n        for (j = 0; j < m; j++) {\n            if (uniq[j] == a[i]) {\n                found = 1;\n                break;\n            }\n        }\n        if (found == 0) {\n            uniq[m] = a[i];\n            m++;\n        }\n    }\n    printf("%d\\n", m);\n    for (i = 0; i < m; i++) {\n        printf(i == 0 ? "%d" : " %d", uniq[i]);\n    }\n    printf("\\n");\n    free(a);\n    free(uniq);\n    return 0;\n}',
    checks: [
      ['/malloc\\s*\\(/', '必须使用 malloc 动态申请内存。'],
      ['/free\\s*\\(/', 'malloc 申请的内存必须用 free 释放。']
    ]
  },
  {
    id: 58,
    courseId: 'pointers',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'easy',
    label: '入门',
    title: '函数返回指针',
    description: '输入 n 个整数，写一个函数 int *findMax(int *a, int n) 返回最大值所在元素的地址，主函数通过这个指针输出最大值和它第一次出现的位置（从 1 开始计数）。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；第二行是 n 个整数，用空格分隔。',
    output: '一行输出两个整数：最大值和它第一次出现的位置，用空格分隔，行末换行。',
    publicCases: [
      { input: '5\n3 9 2 9 1', output: '9 2\n' },
      { input: '3\n-5 -1 -7', output: '-1 2\n' }
    ],
    hiddenCases: [
      { input: '1\n42', output: '42 1\n' },
      { input: '4\n8 8 8 8', output: '8 1\n' }
    ],
    starter: '#include <stdio.h>\n\n// 在这里定义 int *findMax(int *a, int n)\n\nint main(void) {\n    int n, i, a[100];\n    int *p;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n    }\n    p = a;\n    // 调用 findMax 取得最大值所在元素的地址，再输出最大值和它的位置\n    printf("%d %d\\n", *p, 1);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint *findMax(int *a, int n) {\n    int *best = a;\n    for (int i = 1; i < n; i++) {\n        if (a[i] > *best) {\n            best = a + i;\n        }\n    }\n    return best;\n}\n\nint main(void) {\n    int n, a[100];\n    int *p;\n    if (scanf("%d", &n) != 1 || n <= 0) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        if (scanf("%d", &a[i]) != 1) {\n            return 0;\n        }\n    }\n    p = findMax(a, n);\n    printf("%d %d\\n", *p, (int)(p - a) + 1);\n    return 0;\n}',
    checks: [
      ['/int\\s*\\*\\s*findMax\\s*\\(/', '必须定义返回指针的 int *findMax(int *a, int n) 函数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 59,
    courseId: 'pointers',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'medium',
    label: '进阶',
    title: '指针复制文本',
    description: '用 fgets 读入一整行文本（可能含空格），去掉行末换行符后，用指针把它逐个字符复制到另一个字符数组（不使用 strcpy），再把副本原地逆序输出。',
    input: '一行文本（长度不超过 100，可能包含空格，也可能只有一个字符）。',
    output: '一行输出逆序后的文本，行末换行。',
    publicCases: [
      { input: 'abc de', output: 'ed cba\n' },
      { input: '12345', output: '54321\n' }
    ],
    hiddenCases: [
      { input: 'z', output: 'z\n' },
      { input: 'a b c d', output: 'd c b a\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[128] = "", t[128] = "";\n    if (fgets(s, sizeof(s), stdin) == NULL) {\n        return 0;\n    }\n    // 先去掉 s 末尾的换行符，再用指针把 s 逐个字符复制到 t\n    // 然后把 t 原地逆序并输出\n    printf("%s\\n", t);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[128] = "", t[128] = "";\n    char *p, *q;\n    size_t len;\n    if (fgets(s, sizeof(s), stdin) == NULL) {\n        return 0;\n    }\n    len = strlen(s);\n    if (len > 0 && s[len - 1] == \'\\n\') {\n        s[len - 1] = \'\\0\';\n    }\n    p = s;\n    q = t;\n    while ((*q = *p) != \'\\0\') {\n        p++;\n        q++;\n    }\n    len = strlen(t);\n    if (len > 0) {\n        p = t;\n        q = t + len - 1;\n        while (p < q) {\n            char c = *p;\n            *p = *q;\n            *q = c;\n            p++;\n            q--;\n        }\n    }\n    printf("%s\\n", t);\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 读取整行输入。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 60,
    courseId: 'pointers',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'hard',
    label: '挑战',
    title: '指针统计单词',
    description: '用 fgets 读入一整行英文句子（只含字母和空格），用指针扫描统计单词个数，并找出最长的单词（长度相同时输出最先出现的那个）。单词由连续的非空格字符组成。',
    input: '一行英文文本（只包含字母和空格，可能有连续多个空格，长度不超过 200，行末有换行）。',
    output: '第一行输出单词个数；第二行输出最长的单词。若整行没有任何单词，第一行输出 0，第二行输出 NONE。每行末尾换行。',
    publicCases: [
      { input: 'hello world c', output: '3\nhello\n' },
      { input: 'cat  dog   elephant', output: '3\nelephant\n' }
    ],
    hiddenCases: [
      { input: 'aa bb c', output: '3\naa\n' },
      { input: '   ', output: '0\nNONE\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[256] = "";\n    char longest[256] = "";\n    int count = 0;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    // 去掉行末换行符，然后用指针扫描统计单词个数并记录最长的单词\n    printf("%d\\n", count);\n    printf("%s\\n", longest);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[256] = "";\n    char longest[256] = "";\n    char *p;\n    size_t len, best = 0;\n    int count = 0;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    len = strlen(line);\n    if (len > 0 && line[len - 1] == \'\\n\') {\n        line[len - 1] = \'\\0\';\n    }\n    p = line;\n    while (*p != \'\\0\') {\n        while (*p == \' \') {\n            p++;\n        }\n        if (*p == \'\\0\') {\n            break;\n        }\n        char *start = p;\n        while (*p != \'\\0\' && *p != \' \') {\n            p++;\n        }\n        size_t wlen = (size_t)(p - start);\n        count++;\n        if (wlen > best) {\n            best = wlen;\n            memcpy(longest, start, wlen);\n            longest[wlen] = \'\\0\';\n        }\n    }\n    printf("%d\\n", count);\n    if (count == 0) {\n        printf("NONE\\n");\n    } else {\n        printf("%s\\n", longest);\n    }\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 读取整行输入。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 61,
    courseId: 'strings',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'easy',
    label: '入门',
    title: '字符与编码',
    description: '输入一个不含空格的字符串存进字符数组，用循环从 s[0] 开始逐个输出字符和它的 ASCII 编码，遇到结束符 \\0 就停止。',
    input: '一行一个不含空格的字符串（只包含可见字符，长度 1 ~ 20）。',
    output: '每行输出一个字符和它的 ASCII 编码，中间用一个空格分隔，按原顺序输出所有字符，最后一行末尾换行。',
    publicCases: [
      { input: 'Ab', output: 'A 65\nb 98\n' },
      { input: '1a', output: '1 49\na 97\n' }
    ],
    hiddenCases: [
      { input: 'Z', output: 'Z 90\n' },
      { input: '~~~', output: '~ 126\n~ 126\n~ 126\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    char s[32] = "";\n    int i = 0;\n    scanf("%31s", s);\n    // 从 s[0] 开始逐个输出字符与 ASCII 码，遇到结束符 \\0 停止\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    char s[32] = "";\n    int i = 0;\n    if (scanf("%31s", s) != 1) {\n        return 0;\n    }\n    while (s[i] != \'\\0\') {\n        printf("%c %d\\n", s[i], s[i]);\n        i++;\n    }\n    return 0;\n}',
    checks: [
      ['/scanf\\s*\\(/', '必须使用 scanf 读取字符串。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出字符与编码。']
    ]
  },
  {
    id: 62,
    courseId: 'strings',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'medium',
    label: '进阶',
    title: '字符类别统计',
    description: '输入一个不含空格的字符串，遍历每个字符，用 ctype.h 里的字符判断函数统计大写字母、小写字母、数字字符和其他字符的个数。',
    input: '一行一个不含空格的字符串（长度 1 ~ 100）。',
    output: '一行输出四个整数，依次为大写字母个数、小写字母个数、数字个数、其他字符个数，用空格分隔，行末换行。',
    publicCases: [
      { input: 'Ab3!xY', output: '2 2 1 1\n' },
      { input: 'abc', output: '0 3 0 0\n' }
    ],
    hiddenCases: [
      { input: '12345', output: '0 0 5 0\n' },
      { input: '!!!', output: '0 0 0 3\n' }
    ],
    starter: '#include <stdio.h>\n#include <ctype.h>\n\nint main(void) {\n    char s[128] = "";\n    int upper = 0, lower = 0, digit = 0, other = 0;\n    scanf("%127s", s);\n    // 遍历字符串，用 isupper / islower / isdigit 分类统计\n    printf("%d %d %d %d\\n", upper, lower, digit, other);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <ctype.h>\n\nint main(void) {\n    char s[128] = "";\n    int upper = 0, lower = 0, digit = 0, other = 0;\n    if (scanf("%127s", s) != 1) {\n        return 0;\n    }\n    for (int i = 0; s[i] != \'\\0\'; i++) {\n        unsigned char c = (unsigned char)s[i];\n        if (isupper(c)) {\n            upper++;\n        } else if (islower(c)) {\n            lower++;\n        } else if (isdigit(c)) {\n            digit++;\n        } else {\n            other++;\n        }\n    }\n    printf("%d %d %d %d\\n", upper, lower, digit, other);\n    return 0;\n}',
    checks: [
      ['/isupper\\s*\\(|islower\\s*\\(|isdigit\\s*\\(/', '必须使用 ctype.h 中的字符判断函数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出统计结果。']
    ]
  },
  {
    id: 63,
    courseId: 'strings',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'hard',
    label: '挑战',
    title: '出现最多的字符',
    description: '输入一个不含空格的字符串，统计每个字符出现的次数，找出出现次数最多的字符；如果有多个字符出现次数相同，输出 ASCII 编码最小的那个。',
    input: '一行一个不含空格的字符串（只包含可见字符，长度 1 ~ 100）。',
    output: '一行输出出现次数最多的字符和它的出现次数，中间用一个空格分隔，行末换行。',
    publicCases: [
      { input: 'aabbbc', output: 'b 3\n' },
      { input: 'abcabc', output: 'a 2\n' }
    ],
    hiddenCases: [
      { input: 'z', output: 'z 1\n' },
      { input: '!!!???', output: '! 3\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    char s[128] = "";\n    int count[128] = {0};\n    scanf("%127s", s);\n    // 用字符的 ASCII 码当下标统计次数，再找出次数最多且编码最小的字符\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    char s[128] = "";\n    int count[128] = {0};\n    int i, best = 0;\n    if (scanf("%127s", s) != 1) {\n        return 0;\n    }\n    for (i = 0; s[i] != \'\\0\'; i++) {\n        unsigned char c = (unsigned char)s[i];\n        if (c < 128) {\n            count[c]++;\n        }\n    }\n    for (i = 1; i < 128; i++) {\n        if (count[i] > count[best]) {\n            best = i;\n        }\n    }\n    printf("%c %d\\n", best, count[best]);\n    return 0;\n}',
    checks: [
      ['/scanf\\s*\\(/', '必须使用 scanf 读取字符串。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 64,
    courseId: 'strings',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'easy',
    label: '入门',
    title: '整行读取输出',
    description: '用 fgets 读入一整行文本（可能包含空格），去掉行末的换行符后先原样输出这一行，再输出这一行的字符个数。',
    input: '一行文本，可能包含空格，长度不超过 100（行末有换行）。',
    output: '第一行原样输出读到的文本（不含换行符），第二行输出字符个数，每行末尾换行。',
    publicCases: [
      { input: 'hello world', output: 'hello world\n11\n' },
      { input: 'C', output: 'C\n1\n' }
    ],
    hiddenCases: [
      { input: '  ', output: '  \n2\n' },
      { input: 'a b c', output: 'a b c\n5\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[128] = "";\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    // 去掉行末换行符，先输出这一行，再输出字符个数\n    printf("%s\\n", line);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[128] = "";\n    size_t len;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    len = strlen(line);\n    if (len > 0 && line[len - 1] == \'\\n\') {\n        line[len - 1] = \'\\0\';\n        len--;\n    }\n    printf("%s\\n%zu\\n", line, len);\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 读取整行。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 65,
    courseId: 'strings',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'medium',
    label: '进阶',
    title: '大小写互换',
    description: '用 fgets 读入一整行文本（可能含空格），去掉行末换行符后，把其中的小写字母变成大写、大写字母变成小写，其他字符保持不变，然后输出转换后的文本。',
    input: '一行文本（长度不超过 100，可能含空格）。',
    output: '一行输出转换后的文本，行末换行。',
    publicCases: [
      { input: 'Hello World', output: 'hELLO wORLD\n' },
      { input: 'abc123XYZ', output: 'ABC123xyz\n' }
    ],
    hiddenCases: [
      { input: 'MiXeD 42 !', output: 'mIxEd 42 !\n' },
      { input: 'a', output: 'A\n' }
    ],
    starter: '#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\nint main(void) {\n    char s[128] = "";\n    if (fgets(s, sizeof(s), stdin) == NULL) {\n        return 0;\n    }\n    // 去掉行末换行符，遍历每个字符做大小写互换\n    printf("%s\\n", s);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\nint main(void) {\n    char s[128] = "";\n    size_t len;\n    if (fgets(s, sizeof(s), stdin) == NULL) {\n        return 0;\n    }\n    len = strlen(s);\n    if (len > 0 && s[len - 1] == \'\\n\') {\n        s[len - 1] = \'\\0\';\n    }\n    for (int i = 0; s[i] != \'\\0\'; i++) {\n        unsigned char c = (unsigned char)s[i];\n        if (islower(c)) {\n            s[i] = (char)toupper(c);\n        } else if (isupper(c)) {\n            s[i] = (char)tolower(c);\n        }\n    }\n    printf("%s\\n", s);\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 读取整行。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 66,
    courseId: 'strings',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'hard',
    label: '挑战',
    title: '最长的一行',
    description: '先读入行数 n，再用 fgets 逐行读入 n 行文本（每行可能包含空格，也可能为空行），用 strlen 统计每行长度，找出字符数最多的一行；若有多行并列最长，输出最先出现的那一行。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 10）；接下来 n 行，每行是一段文本（可能为空行，单行长度不超过 100）。',
    output: '第一行输出最长行的字符个数，第二行原样输出这一行内容，每行末尾换行。',
    publicCases: [
      { input: '3\nhello\nhi\nworld!!', output: '7\nworld!!\n' },
      { input: '2\na b\nabcd', output: '4\nabcd\n' }
    ],
    hiddenCases: [
      { input: '3\nabc\nxyz\nxy', output: '3\nabc\n' },
      { input: '2\n\nlong line here', output: '14\nlong line here\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n = 0, i;\n    char line[128] = "";\n    char longest[128] = "";\n    scanf("%d", &n);\n    getchar();\n    for (i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        // 去掉行末换行符，比较长度并记录最长的一行\n    }\n    printf("%d\\n%s\\n", (int)strlen(longest), longest);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n = 0, i;\n    char line[128] = "";\n    char longest[128] = "";\n    size_t bestLen = 0;\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 10) {\n        return 0;\n    }\n    getchar();\n    for (i = 0; i < n; i++) {\n        size_t len;\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            line[0] = \'\\0\';\n        }\n        len = strlen(line);\n        if (len > 0 && line[len - 1] == \'\\n\') {\n            line[len - 1] = \'\\0\';\n            len--;\n        }\n        if (i == 0 || len > bestLen) {\n            bestLen = len;\n            strcpy(longest, line);\n        }\n    }\n    printf("%zu\\n%s\\n", bestLen, longest);\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 逐行读取。'],
      ['/strlen\\s*\\(/', '必须使用 strlen 统计每行长度。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 67,
    courseId: 'strings',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'easy',
    label: '入门',
    title: '单词长度比较',
    description: '读入两个不含空格的单词，用 strlen 比较它们的长度，输出较长的那个单词；如果两个单词长度相同，输出 SAME。',
    input: '两行，每行一个不含空格的单词（长度 1 ~ 50）。',
    output: '一行输出较长的单词，或者输出 SAME，行末换行。',
    publicCases: [
      { input: 'apple\ncat', output: 'apple\n' },
      { input: 'cat\ndog', output: 'SAME\n' }
    ],
    hiddenCases: [
      { input: 'a\nbb', output: 'bb\n' },
      { input: 'hello\nworld', output: 'SAME\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[64] = "", b[64] = "";\n    scanf("%63s %63s", a, b);\n    // 用 strlen 比较两个单词的长度，输出较长的那个或 SAME\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[64] = "", b[64] = "";\n    size_t la, lb;\n    if (scanf("%63s %63s", a, b) != 2) {\n        return 0;\n    }\n    la = strlen(a);\n    lb = strlen(b);\n    if (la == lb) {\n        printf("SAME\\n");\n    } else if (la > lb) {\n        printf("%s\\n", a);\n    } else {\n        printf("%s\\n", b);\n    }\n    return 0;\n}',
    checks: [
      ['/strlen\\s*\\(/', '必须使用 strlen 求字符串长度。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 68,
    courseId: 'strings',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'medium',
    label: '进阶',
    title: '连接两个单词',
    description: '读入两个不含空格的单词，用 strcpy 和 strcat 把它们用一个短横线 - 连接成一个新字符串（例如 apple 和 pie 得到 apple-pie），再输出这个新字符串和它的长度。',
    input: '两行，每行一个不含空格的单词（每个长度 1 ~ 40，连接后的总长度不超过 100）。',
    output: '第一行输出连接后的字符串，第二行输出连接后的长度，每行末尾换行。',
    publicCases: [
      { input: 'apple\npie', output: 'apple-pie\n9\n' },
      { input: 'a\nb', output: 'a-b\n3\n' }
    ],
    hiddenCases: [
      { input: 'hello\nworld', output: 'hello-world\n11\n' },
      { input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', output: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\n81\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[64] = "", b[64] = "";\n    char joined[160] = "";\n    scanf("%63s %63s", a, b);\n    // 用 strcpy / strcat 把 a、"-"、b 依次拼进 joined\n    printf("%s\\n", joined);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[64] = "", b[64] = "";\n    char joined[160] = "";\n    if (scanf("%63s %63s", a, b) != 2) {\n        return 0;\n    }\n    strcpy(joined, a);\n    strcat(joined, "-");\n    strcat(joined, b);\n    printf("%s\\n%zu\\n", joined, strlen(joined));\n    return 0;\n}',
    checks: [
      ['/strcpy\\s*\\(/', '必须使用 strcpy 复制字符串。'],
      ['/strcat\\s*\\(/', '必须使用 strcat 连接字符串。']
    ]
  },
  {
    id: 69,
    courseId: 'strings',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'hard',
    label: '挑战',
    title: '单词字典序排序',
    description: '读入三个不含空格的单词，用 strcmp 比较大小、用 strcpy 交换，把它们按字典序从小到大排好，然后每行输出一个单词。',
    input: '三行，每行一个不含空格的单词（只包含小写字母，长度 1 ~ 30）。',
    output: '分三行输出排序后的单词，每行一个，行末换行。',
    publicCases: [
      { input: 'banana\napple\ncherry', output: 'apple\nbanana\ncherry\n' },
      { input: 'b\na\nc', output: 'a\nb\nc\n' }
    ],
    hiddenCases: [
      { input: 'same\nsame\nsame', output: 'same\nsame\nsame\n' },
      { input: 'z\na\nm', output: 'a\nm\nz\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char w[3][40] = {""};\n    char tmp[40] = "";\n    int i;\n    for (i = 0; i < 3; i++) {\n        scanf("%39s", w[i]);\n    }\n    // 用 strcmp 比较、用 strcpy 交换，把三个单词按字典序排好\n    for (i = 0; i < 3; i++) {\n        printf("%s\\n", w[i]);\n    }\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char w[3][40] = {""};\n    char tmp[40] = "";\n    int i, j;\n    for (i = 0; i < 3; i++) {\n        if (scanf("%39s", w[i]) != 1) {\n            return 0;\n        }\n    }\n    for (i = 0; i < 2; i++) {\n        for (j = 0; j < 2 - i; j++) {\n            if (strcmp(w[j], w[j + 1]) > 0) {\n                strcpy(tmp, w[j]);\n                strcpy(w[j], w[j + 1]);\n                strcpy(w[j + 1], tmp);\n            }\n        }\n    }\n    for (i = 0; i < 3; i++) {\n        printf("%s\\n", w[i]);\n    }\n    return 0;\n}',
    checks: [
      ['/strcmp\\s*\\(/', '必须使用 strcmp 比较单词。'],
      ['/strcpy\\s*\\(/', '必须使用 strcpy 交换单词。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 70,
    courseId: 'strings',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'easy',
    label: '入门',
    title: '二维表编号打印',
    description: '读入 n 个不含空格的单词（每行一个），把它们存进二维字符数组，然后按输入顺序逐行输出，每行的格式为「序号: 单词」，序号从 1 开始。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 5）；接下来 n 行，每行一个不含空格的单词（长度 1 ~ 30）。',
    output: '共 n 行，每行输出 序号: 单词（冒号后面有一个空格），行末换行。',
    publicCases: [
      { input: '3\napple\nbanana\ncherry', output: '1: apple\n2: banana\n3: cherry\n' },
      { input: '1\ncat', output: '1: cat\n' }
    ],
    hiddenCases: [
      { input: '2\nx\nhello', output: '1: x\n2: hello\n' },
      { input: '4\na\nbb\nccc\ndddd', output: '1: a\n2: bb\n3: ccc\n4: dddd\n' }
    ],
    starter: '#include <stdio.h>\n\nint main(void) {\n    int n = 0, i;\n    char table[6][40] = {""};\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%39s", table[i]);\n    }\n    // 按输入顺序逐行输出「序号: 单词」\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main(void) {\n    int n = 0, i;\n    char table[6][40] = {""};\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 5) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%39s", table[i]) != 1) {\n            return 0;\n        }\n    }\n    for (i = 0; i < n; i++) {\n        printf("%d: %s\\n", i + 1, table[i]);\n    }\n    return 0;\n}',
    checks: [
      ['/scanf\\s*\\(/', '必须使用 scanf 读取输入。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 71,
    courseId: 'strings',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'medium',
    label: '进阶',
    title: '二维表查找单词',
    description: '先把 n 个不含空格的单词存进二维字符数组，再读入一个待查单词，用 strcmp 逐行比较，输出它第一次出现的行号（从 1 开始）；如果找不到，输出 0。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 20）；接下来 n 行，每行一个不含空格的单词；最后一行是要查找的单词。',
    output: '一行输出查找到的行号，找不到输出 0，行末换行。',
    publicCases: [
      { input: '3\napple\nbanana\ncherry\nbanana', output: '2\n' },
      { input: '2\ncat\ndog\nbird', output: '0\n' }
    ],
    hiddenCases: [
      { input: '3\nsame\nsame\nsame\nsame', output: '1\n' },
      { input: '1\nsolo\nsolo', output: '1\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n = 0, i, pos = 0;\n    char table[21][40] = {""};\n    char target[40] = "";\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%39s", table[i]);\n    }\n    scanf("%39s", target);\n    // 用 strcmp 逐行比较，找出 target 第一次出现的行号\n    printf("%d\\n", pos);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n = 0, i, pos = 0;\n    char table[21][40] = {""};\n    char target[40] = "";\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 20) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%39s", table[i]) != 1) {\n            return 0;\n        }\n    }\n    if (scanf("%39s", target) != 1) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (strcmp(table[i], target) == 0) {\n            pos = i + 1;\n            break;\n        }\n    }\n    printf("%d\\n", pos);\n    return 0;\n}',
    checks: [
      ['/strcmp\\s*\\(/', '必须使用 strcmp 逐个比较单词。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出行号。']
    ]
  },
  {
    id: 72,
    courseId: 'strings',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'hard',
    label: '挑战',
    title: '等长单词排序',
    description: '读入 n 个不含空格的单词和一个整数 k，用 strlen 挑出所有长度恰好等于 k 的单词，再用 strcmp 把它们按字典序从小到大逐行输出；如果没有这样的单词，输出 NONE。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 20）；接下来 n 行，每行一个不含空格的单词（只含小写字母，长度 1 ~ 30）；最后一行是整数 k（1 ≤ k ≤ 30）。',
    output: '把长度等于 k 的单词按字典序升序逐行输出；如果没有，输出一行 NONE。每行末尾换行。',
    publicCases: [
      { input: '5\ncat\ndog\nelephant\nfox\nant\n3', output: 'ant\ncat\ndog\nfox\n' },
      { input: '3\na\nbb\nccc\n5', output: 'NONE\n' }
    ],
    hiddenCases: [
      { input: '4\nab\nba\nab\ncd\n2', output: 'ab\nab\nba\ncd\n' },
      { input: '2\nhello\nhi\n2', output: 'hi\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n = 0, k = 0, i;\n    char words[21][40] = {""};\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%39s", words[i]);\n    }\n    scanf("%d", &k);\n    // 挑出长度等于 k 的单词，按字典序排序后逐行输出，没有则输出 NONE\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n = 0, k = 0, i, j, m = 0;\n    char words[21][40] = {""};\n    int index[21];\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 20) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%39s", words[i]) != 1) {\n            return 0;\n        }\n    }\n    if (scanf("%d", &k) != 1) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if ((int)strlen(words[i]) == k) {\n            index[m] = i;\n            m++;\n        }\n    }\n    if (m == 0) {\n        printf("NONE\\n");\n        return 0;\n    }\n    for (i = 0; i < m - 1; i++) {\n        for (j = 0; j < m - 1 - i; j++) {\n            if (strcmp(words[index[j]], words[index[j + 1]]) > 0) {\n                int t = index[j];\n                index[j] = index[j + 1];\n                index[j + 1] = t;\n            }\n        }\n    }\n    for (i = 0; i < m; i++) {\n        printf("%s\\n", words[index[i]]);\n    }\n    return 0;\n}',
    checks: [
      ['/strlen\\s*\\(/', '必须使用 strlen 判断单词长度。'],
      ['/strcmp\\s*\\(/', '必须使用 strcmp 排序。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 73,
    courseId: 'strings',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'easy',
    label: '入门',
    title: '统计元音字母',
    description: '用 fgets 读入一整行英文文本（可能包含空格），统计其中元音字母 a、e、i、o、u 出现的总次数，不区分大小写。',
    input: '一行文本（长度不超过 200，可能包含空格）。',
    output: '一行输出元音字母出现的总次数，行末换行。',
    publicCases: [
      { input: 'Hello World', output: '3\n' },
      { input: 'aeiou AEIOU', output: '10\n' }
    ],
    hiddenCases: [
      { input: 'xyz', output: '0\n' },
      { input: 'bAnAna', output: '3\n' }
    ],
    starter: '#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\nint main(void) {\n    char line[256] = "";\n    int count = 0;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    // 遍历每个字符，判断它是不是元音字母（不区分大小写）\n    printf("%d\\n", count);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\nint main(void) {\n    char line[256] = "";\n    int count = 0;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    for (int i = 0; line[i] != \'\\0\'; i++) {\n        char c = (char)tolower((unsigned char)line[i]);\n        if (c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\') {\n            count++;\n        }\n    }\n    printf("%d\\n", count);\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 读取整行文本。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出个数。']
    ]
  },
  {
    id: 74,
    courseId: 'strings',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'medium',
    label: '进阶',
    title: '压缩多余空格',
    description: '用 fgets 读入一整行文本，把连续出现的多个空格压缩成一个空格，并去掉行首和行尾的空格（文本清洗），输出清洗后的文本和它的长度。',
    input: '一行文本（长度不超过 200，可能包含连续空格，行首行尾也可能有空格）。',
    output: '第一行输出清洗后的文本，第二行输出清洗后文本的长度，每行末尾换行。',
    publicCases: [
      { input: 'hello   world', output: 'hello world\n11\n' },
      { input: '  a b  ', output: 'a b\n3\n' }
    ],
    hiddenCases: [
      { input: '   ', output: '\n0\n' },
      { input: 'a    b    c', output: 'a b c\n5\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[256] = "", out[256] = "";\n    if (fgets(s, sizeof(s), stdin) == NULL) {\n        return 0;\n    }\n    // 去掉行末换行符，压缩连续空格并去掉首尾空格，结果放进 out\n    printf("%s\\n", out);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[256] = "", out[256] = "";\n    size_t len, i, m = 0;\n    int pending = 0;\n    if (fgets(s, sizeof(s), stdin) == NULL) {\n        return 0;\n    }\n    len = strlen(s);\n    if (len > 0 && s[len - 1] == \'\\n\') {\n        s[len - 1] = \'\\0\';\n        len--;\n    }\n    for (i = 0; i < len; i++) {\n        if (s[i] == \' \') {\n            if (m > 0) {\n                pending = 1;\n            }\n        } else {\n            if (pending) {\n                out[m] = \' \';\n                m++;\n                pending = 0;\n            }\n            out[m] = s[i];\n            m++;\n        }\n    }\n    out[m] = \'\\0\';\n    printf("%s\\n%zu\\n", out, m);\n    return 0;\n}',
    checks: [
      ['/fgets\\s*\\(/', '必须使用 fgets 读取整行文本。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 75,
    courseId: 'strings',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'hard',
    label: '挑战',
    title: '切分整数求和',
    description: '用 fgets 读入一整行由空格分隔的整数（可能有多余空格，可能含负数），用 strtok 按空格把它切分成若干个整数，输出整数个数、总和与最大值。',
    input: '一行包含若干个整数（1 ≤ 个数 ≤ 50，每个整数 -1000 ~ 1000），用空格分隔，行首行尾可能有空格。',
    output: '分三行输出：第一行整数个数，第二行总和，第三行最大值，每行末尾换行。',
    publicCases: [
      { input: '1 2 3 4', output: '4\n10\n4\n' },
      { input: '-5 10  -2', output: '3\n3\n10\n' }
    ],
    hiddenCases: [
      { input: '7', output: '1\n7\n7\n' },
      { input: '-1 -2 -3', output: '3\n-6\n-1\n' }
    ],
    starter: '#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nint main(void) {\n    char line[512] = "";\n    int count = 0, sum = 0, max = 0;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    // 用 strtok 按空格切分，再用 strtol 转成整数，统计个数、总和与最大值\n    printf("%d\\n%d\\n%d\\n", count, sum, max);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nint main(void) {\n    char line[512] = "";\n    char *token;\n    int count = 0, sum = 0, max = 0;\n    if (fgets(line, sizeof(line), stdin) == NULL) {\n        return 0;\n    }\n    token = strtok(line, " \\t\\n");\n    while (token != NULL) {\n        int value = (int)strtol(token, NULL, 10);\n        if (count == 0 || value > max) {\n            max = value;\n        }\n        sum += value;\n        count++;\n        token = strtok(NULL, " \\t\\n");\n    }\n    printf("%d\\n%d\\n%d\\n", count, sum, max);\n    return 0;\n}',
    checks: [
      ['/strtok\\s*\\(/', '必须使用 strtok 切分这一行整数。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 76,
    courseId: 'structs',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'easy',
    label: '入门',
    title: '学生记录结构',
    description: '定义一个结构体类型保存一条学生记录（学号、姓名、成绩），读入一条记录后，用成员访问的方式输出这三个字段。',
    input: '一行包含三个内容：学号（整数）、姓名（不含空格）、成绩（整数），用空格分隔。',
    output: '一行输出 学号 姓名 成绩，用空格分隔，行末换行。',
    publicCases: [
      { input: '1001 Tom 92', output: '1001 Tom 92\n' },
      { input: '7 A 0', output: '7 A 0\n' }
    ],
    hiddenCases: [
      { input: '999999 X 100', output: '999999 X 100\n' },
      { input: '1 z 59', output: '1 z 59\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Student {\n    int id;\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    struct Student s;\n    scanf("%d %31s %d", &s.id, s.name, &s.score);\n    // 用成员访问输出学号、姓名和成绩\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Student {\n    int id;\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    struct Student s;\n    if (scanf("%d %31s %d", &s.id, s.name, &s.score) != 3) {\n        return 0;\n    }\n    printf("%d %s %d\\n", s.id, s.name, s.score);\n    return 0;\n}',
    checks: [
      ['/struct[\\s\\S]*\\{/', '必须自己定义结构体类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 77,
    courseId: 'structs',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'medium',
    label: '进阶',
    title: '两点之间距离',
    description: '定义一个点结构体（横坐标、纵坐标都是浮点数），读入两个点的坐标，用两点间距离公式计算并输出这两个点的距离。',
    input: '一行包含四个浮点数 x1 y1 x2 y2，用空格分隔（-1000 ≤ 每个数 ≤ 1000）。',
    output: '一行输出两点之间的距离，保留两位小数，行末换行。',
    publicCases: [
      { input: '0 0 3 4', output: '5.00\n' },
      { input: '1 1 1 1', output: '0.00\n' }
    ],
    hiddenCases: [
      { input: '0 0 0 0', output: '0.00\n' },
      { input: '-3 -4 0 0', output: '5.00\n' }
    ],
    starter: '#include <stdio.h>\n#include <math.h>\n\nstruct Point {\n    double x;\n    double y;\n};\n\nint main(void) {\n    struct Point a, b;\n    scanf("%lf %lf %lf %lf", &a.x, &a.y, &b.x, &b.y);\n    // 用两个点的坐标求距离，输出时保留两位小数\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <math.h>\n\nstruct Point {\n    double x;\n    double y;\n};\n\nint main(void) {\n    struct Point a, b;\n    double dx, dy;\n    if (scanf("%lf %lf %lf %lf", &a.x, &a.y, &b.x, &b.y) != 4) {\n        return 0;\n    }\n    dx = a.x - b.x;\n    dy = a.y - b.y;\n    printf("%.2f\\n", sqrt(dx * dx + dy * dy));\n    return 0;\n}',
    checks: [
      ['/struct[\\s\\S]*\\{/', '必须自己定义点的结构体类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出距离（保留两位小数）。']
    ]
  },
  {
    id: 78,
    courseId: 'structs',
    chapter: 1,
    lesson: '核心概念与基本模型',
    level: 'hard',
    label: '挑战',
    title: '日期比较天数',
    description: '定义一个日期结构体（年、月、日），读入两个合法日期，输出较早的那个日期，并输出两个日期相差的天数（两个日期相同则相差 0 天）。注意闰年的判断。',
    input: '两行，每行包含三个整数 y m d，表示一个合法日期（1900 ≤ y ≤ 2100），用空格分隔。',
    output: '第一行按 yyyy-mm-dd 的格式输出较早的日期（月和日不足两位时前面补 0）；第二行输出两个日期相差的天数。每行末尾换行。',
    publicCases: [
      { input: '2024 3 1\n2024 3 10', output: '2024-03-01\n9\n' },
      { input: '2023 12 31\n2024 1 1', output: '2023-12-31\n1\n' }
    ],
    hiddenCases: [
      { input: '2020 2 29\n2020 2 29', output: '2020-02-29\n0\n' },
      { input: '2000 1 1\n2100 1 1', output: '2000-01-01\n36525\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Date {\n    int year;\n    int month;\n    int day;\n};\n\nint main(void) {\n    struct Date a, b;\n    scanf("%d %d %d", &a.year, &a.month, &a.day);\n    scanf("%d %d %d", &b.year, &b.month, &b.day);\n    // 判断哪个日期更早，并计算两个日期相差的天数（注意闰年）\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Date {\n    int year;\n    int month;\n    int day;\n};\n\nstatic int isLeap(int y) {\n    return (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);\n}\n\nstatic int daysInMonth(int y, int m) {\n    static const int table[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\n    if (m == 2 && isLeap(y)) {\n        return 29;\n    }\n    return table[m - 1];\n}\n\nstatic long toDays(const struct Date *d) {\n    long total = 0;\n    for (int y = 1900; y < d->year; y++) {\n        total += isLeap(y) ? 366 : 365;\n    }\n    for (int m = 1; m < d->month; m++) {\n        total += daysInMonth(d->year, m);\n    }\n    total += d->day;\n    return total;\n}\n\nint main(void) {\n    struct Date a, b, early;\n    long da, db, diff;\n    if (scanf("%d %d %d", &a.year, &a.month, &a.day) != 3) {\n        return 0;\n    }\n    if (scanf("%d %d %d", &b.year, &b.month, &b.day) != 3) {\n        return 0;\n    }\n    da = toDays(&a);\n    db = toDays(&b);\n    early = (da <= db) ? a : b;\n    diff = (da > db) ? (da - db) : (db - da);\n    printf("%04d-%02d-%02d\\n%ld\\n", early.year, early.month, early.day, diff);\n    return 0;\n}',
    checks: [
      ['/struct[\\s\\S]*\\{/', '必须自己定义日期结构体类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出日期与相差天数。']
    ]
  },
  {
    id: 79,
    courseId: 'structs',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'easy',
    label: '入门',
    title: '指针访问商品',
    description: '定义一个商品结构体（名称、单价、数量），读入一件商品的三个字段，用结构体指针和箭头运算符访问成员，输出这件商品的总价（单价 × 数量）。',
    input: '一行包含三个内容：商品名称（不含空格）、单价（整数）、数量（整数），用空格分隔。',
    output: '一行输出总价，行末换行。',
    publicCases: [
      { input: 'pen 3 10', output: '30\n' },
      { input: 'book 25 0', output: '0\n' }
    ],
    hiddenCases: [
      { input: 'apple 7 1', output: '7\n' },
      { input: 'tv 9999 3', output: '29997\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Goods {\n    char name[32];\n    int price;\n    int count;\n};\n\nint main(void) {\n    struct Goods item;\n    struct Goods *p = &item;\n    scanf("%31s %d %d", p->name, &p->price, &p->count);\n    // 用箭头运算符访问成员，输出总价 = 单价 * 数量\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Goods {\n    char name[32];\n    int price;\n    int count;\n};\n\nint main(void) {\n    struct Goods item;\n    struct Goods *p = &item;\n    if (scanf("%31s %d %d", p->name, &p->price, &p->count) != 3) {\n        return 0;\n    }\n    printf("%d\\n", p->price * p->count);\n    return 0;\n}',
    checks: [
      ['/->/', '必须用箭头运算符访问结构体指针的成员。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出总价。']
    ]
  },
  {
    id: 80,
    courseId: 'structs',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'medium',
    label: '进阶',
    title: '指针移动坐标',
    description: '定义一个点结构体，写一个函数 void movePoint(struct Point *p, int dx, int dy)，在函数里用结构体指针和箭头运算符把点的横坐标加上 dx、纵坐标加上 dy，然后在主函数里输出移动后的坐标。',
    input: '一行包含四个整数 x y dx dy（-1000 ≤ 每个数 ≤ 1000），用空格分隔。',
    output: '一行输出移动后的横坐标和纵坐标，用空格分隔，行末换行。',
    publicCases: [
      { input: '1 2 3 4', output: '4 6\n' },
      { input: '0 0 -5 5', output: '-5 5\n' }
    ],
    hiddenCases: [
      { input: '-1000 -1000 1000 1000', output: '0 0\n' },
      { input: '7 -7 0 0', output: '7 -7\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    struct Point pt;\n    int dx, dy;\n    scanf("%d %d %d %d", &pt.x, &pt.y, &dx, &dy);\n    // 定义 movePoint 函数，通过结构体指针修改 pt 的坐标，再输出坐标\n    printf("%d %d\\n", pt.x, pt.y);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nvoid movePoint(struct Point *p, int dx, int dy) {\n    p->x += dx;\n    p->y += dy;\n}\n\nint main(void) {\n    struct Point pt;\n    int dx, dy;\n    if (scanf("%d %d %d %d", &pt.x, &pt.y, &dx, &dy) != 4) {\n        return 0;\n    }\n    movePoint(&pt, dx, dy);\n    printf("%d %d\\n", pt.x, pt.y);\n    return 0;\n}',
    checks: [
      ['/void\\s+movePoint\\s*\\(/', '必须定义 void movePoint(struct Point *p, int dx, int dy) 函数。'],
      ['/->/', '必须在函数中用箭头运算符修改成员。']
    ]
  },
  {
    id: 81,
    courseId: 'structs',
    chapter: 2,
    lesson: '常见写法与执行过程',
    level: 'hard',
    label: '挑战',
    title: '学生成绩排序',
    description: '读入 n 条学生记录（学号、姓名、成绩），用结构体指针作为函数参数实现交换（用箭头运算符访问成员），把学生按成绩从高到低排序（成绩相同时学号小的排前面），最后输出排序后的学生表。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；接下来 n 行，每行包含 学号（整数）姓名（不含空格）成绩（整数），用空格分隔。',
    output: '共 n 行，每行输出 学号 姓名 成绩，用空格分隔，行末换行。',
    publicCases: [
      { input: '3\n1002 Li 85\n1001 Wang 92\n1003 Zhao 85', output: '1001 Wang 92\n1002 Li 85\n1003 Zhao 85\n' },
      { input: '2\n1 A 60\n2 B 90', output: '2 B 90\n1 A 60\n' }
    ],
    hiddenCases: [
      { input: '1\n5 Solo 0', output: '5 Solo 0\n' },
      { input: '3\n3 C 60\n1 A 60\n2 B 60', output: '1 A 60\n2 B 60\n3 C 60\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Student {\n    int id;\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    struct Student list[100];\n    int n = 0, i;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d %31s %d", &list[i].id, list[i].name, &list[i].score);\n    }\n    // 用结构体指针与交换函数按成绩从高到低排序（成绩相同按学号升序），再输出学生表\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Student {\n    int id;\n    char name[32];\n    int score;\n};\n\nstatic void swapStu(struct Student *a, struct Student *b) {\n    struct Student t = *a;\n    *a = *b;\n    *b = t;\n}\n\nstatic int comesFirst(const struct Student *a, const struct Student *b) {\n    if (a->score != b->score) {\n        return a->score > b->score;\n    }\n    return a->id < b->id;\n}\n\nint main(void) {\n    struct Student list[100];\n    int n = 0, i, j;\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 100) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%d %31s %d", &list[i].id, list[i].name, &list[i].score) != 3) {\n            return 0;\n        }\n    }\n    for (i = 0; i < n - 1; i++) {\n        for (j = 0; j < n - 1 - i; j++) {\n            if (!comesFirst(&list[j], &list[j + 1])) {\n                swapStu(&list[j], &list[j + 1]);\n            }\n        }\n    }\n    for (i = 0; i < n; i++) {\n        printf("%d %s %d\\n", list[i].id, list[i].name, list[i].score);\n    }\n    return 0;\n}',
    checks: [
      ['/struct[\\s\\S]*\\{/', '必须自己定义学生结构体类型。'],
      ['/->/', '必须通过结构体指针访问成员。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出学生表。']
    ]
  },
  {
    id: 82,
    courseId: 'structs',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'easy',
    label: '入门',
    title: '图书清单统计',
    description: '用 typedef 定义图书结构体类型（书名、页数），读入 n 本图书存进结构体数组，按输入顺序每行输出一本图书，最后输出所有图书的总页数。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 10）；接下来 n 行，每行包含 书名（不含空格）和页数（整数），用空格分隔。',
    output: '前 n 行每行输出 书名 页数；最后一行输出总页数。每行末尾换行。',
    publicCases: [
      { input: '2\nC-Book 300\nNovel 120', output: 'C-Book 300\nNovel 120\n420\n' },
      { input: '1\nOnly 42', output: 'Only 42\n42\n' }
    ],
    hiddenCases: [
      { input: '3\nA 0\nB 0\nC 0', output: 'A 0\nB 0\nC 0\n0\n' },
      { input: '2\nX 999999\nY 1', output: 'X 999999\nY 1\n1000000\n' }
    ],
    starter: '#include <stdio.h>\n\ntypedef struct {\n    char title[32];\n    int pages;\n} Book;\n\nint main(void) {\n    Book list[10];\n    int n = 0, i, total = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%31s %d", list[i].title, &list[i].pages);\n    }\n    // 按输入顺序逐行输出每本书，最后输出所有书的总页数\n    printf("%d\\n", total);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    char title[32];\n    int pages;\n} Book;\n\nint main(void) {\n    Book list[10];\n    int n = 0, i, total = 0;\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 10) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%31s %d", list[i].title, &list[i].pages) != 2) {\n            return 0;\n        }\n    }\n    for (i = 0; i < n; i++) {\n        printf("%s %d\\n", list[i].title, list[i].pages);\n        total += list[i].pages;\n    }\n    printf("%d\\n", total);\n    return 0;\n}',
    checks: [
      ['/typedef\\s+struct/', '必须使用 typedef 定义结构体类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 83,
    courseId: 'structs',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'medium',
    label: '进阶',
    title: '商品价值统计',
    description: '读入 n 件商品的名称、单价和库存，用结构体数组保存，计算所有商品的库存总价值（每件商品的单价 × 库存 之和），并找出单价最高的商品名称（并列时取最先出现的）。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 50）；接下来 n 行，每行包含 名称（不含空格）单价（整数）库存（整数），用空格分隔。',
    output: '第一行输出库存总价值，第二行输出单价最高的商品名称，每行末尾换行。',
    publicCases: [
      { input: '3\npen 3 10\nbook 25 2\nbag 25 1', output: '105\nbook\n' },
      { input: '2\ncup 5 4\ndesk 100 0', output: '20\ndesk\n' }
    ],
    hiddenCases: [
      { input: '1\nonly 7 0', output: '0\nonly\n' },
      { input: '2\na 1 1000\nb 2 0', output: '1000\nb\n' }
    ],
    starter: '#include <stdio.h>\n\ntypedef struct {\n    char name[32];\n    int price;\n    int stock;\n} Goods;\n\nint main(void) {\n    Goods list[50];\n    int n = 0, i, total = 0;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%31s %d %d", list[i].name, &list[i].price, &list[i].stock);\n    }\n    // 累加每件商品的 单价 * 库存，并找出单价最高的商品名\n    printf("%d\\n", total);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    char name[32];\n    int price;\n    int stock;\n} Goods;\n\nint main(void) {\n    Goods list[50];\n    int n = 0, i, total = 0, best = 0;\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 50) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%31s %d %d", list[i].name, &list[i].price, &list[i].stock) != 3) {\n            return 0;\n        }\n        total += list[i].price * list[i].stock;\n        if (i == 0 || list[i].price > list[best].price) {\n            best = i;\n        }\n    }\n    printf("%d\\n%s\\n", total, list[best].name);\n    return 0;\n}',
    checks: [
      ['/typedef\\s+struct/', '必须使用 typedef 定义结构体类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 84,
    courseId: 'structs',
    chapter: 3,
    lesson: '数据变化与边界情况',
    level: 'hard',
    label: '挑战',
    title: '部门工资统计',
    description: '读入 n 名员工的部门编号、姓名和工资，用结构体数组保存记录，统计每个部门的人数与工资总额，并按部门编号从小到大输出（只输出有员工的部门）。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 100）；接下来 n 行，每行包含 部门编号（1 ~ 5 的整数）姓名（不含空格）工资（整数，0 ~ 100000），用空格分隔。',
    output: '第一行输出员工总人数和工资总额，用空格分隔；随后按部门编号从小到大，每行输出 部门编号 人数 工资总额。每行末尾换行。',
    publicCases: [
      { input: '4\n2 Li 5000\n1 Wang 6000\n2 Zhao 4000\n1 Sun 3000', output: '4 18000\n1 2 9000\n2 2 9000\n' },
      { input: '3\n4 A 100\n4 B 200\n5 C 300', output: '3 600\n4 2 300\n5 1 300\n' }
    ],
    hiddenCases: [
      { input: '1\n5 Solo 0', output: '1 0\n5 1 0\n' },
      { input: '5\n3 A 100\n3 B 200\n3 C 300\n3 D 400\n3 E 500', output: '5 1500\n3 5 1500\n' }
    ],
    starter: '#include <stdio.h>\n\ntypedef struct {\n    int dept;\n    char name[32];\n    int salary;\n} Emp;\n\nint main(void) {\n    Emp list[100];\n    int count[6] = {0};\n    int total[6] = {0};\n    int n = 0, i;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d %31s %d", &list[i].dept, list[i].name, &list[i].salary);\n    }\n    // 按部门累加人数与工资总额，再按部门编号从小到大输出\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    int dept;\n    char name[32];\n    int salary;\n} Emp;\n\nint main(void) {\n    Emp list[100];\n    int count[6] = {0};\n    int total[6] = {0};\n    int n = 0, i, allSum = 0;\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 100) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%d %31s %d", &list[i].dept, list[i].name, &list[i].salary) != 3) {\n            return 0;\n        }\n        if (list[i].dept >= 1 && list[i].dept <= 5) {\n            count[list[i].dept]++;\n            total[list[i].dept] += list[i].salary;\n        }\n        allSum += list[i].salary;\n    }\n    printf("%d %d\\n", n, allSum);\n    for (i = 1; i <= 5; i++) {\n        if (count[i] > 0) {\n            printf("%d %d %d\\n", i, count[i], total[i]);\n        }\n    }\n    return 0;\n}',
    checks: [
      ['/typedef\\s+struct/', '必须使用 typedef 定义员工结构体类型。'],
      ['/for\\s*\\(|while\\s*\\(/', '必须使用循环做批量统计。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出统计结果。']
    ]
  },
  {
    id: 85,
    courseId: 'structs',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'easy',
    label: '入门',
    title: '枚举输出星期',
    description: '用 enum 定义星期一至星期日的取值（1 到 7），输入一个整数，用 switch 输出它对应的中文星期名称；如果输入不在 1 ~ 7 范围内，输出 输入错误。',
    input: '一行包含一个整数 n（-5 ≤ n ≤ 12）。',
    output: '一行输出对应的中文星期名称（如 星期一），或者输出 输入错误，行末换行。',
    publicCases: [
      { input: '1', output: '星期一\n' },
      { input: '7', output: '星期日\n' }
    ],
    hiddenCases: [
      { input: '0', output: '输入错误\n' },
      { input: '8', output: '输入错误\n' }
    ],
    starter: '#include <stdio.h>\n\nenum Week {\n    MON = 1, TUE, WED, THU, FRI, SAT, SUN\n};\n\nint main(void) {\n    int n = 0;\n    enum Week day;\n    scanf("%d", &n);\n    day = (enum Week)n;\n    // 用 switch 根据 day 输出对应的中文星期名，越界输出 输入错误\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nenum Week {\n    MON = 1, TUE, WED, THU, FRI, SAT, SUN\n};\n\nint main(void) {\n    int n = 0;\n    enum Week day;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    day = (enum Week)n;\n    switch (day) {\n        case MON:\n            printf("星期一\\n");\n            break;\n        case TUE:\n            printf("星期二\\n");\n            break;\n        case WED:\n            printf("星期三\\n");\n            break;\n        case THU:\n            printf("星期四\\n");\n            break;\n        case FRI:\n            printf("星期五\\n");\n            break;\n        case SAT:\n            printf("星期六\\n");\n            break;\n        case SUN:\n            printf("星期日\\n");\n            break;\n        default:\n            printf("输入错误\\n");\n            break;\n    }\n    return 0;\n}',
    checks: [
      ['/enum[\\s\\S]*\\{/', '必须使用 enum 定义星期的取值集合。'],
      ['/switch\\s*\\(/', '必须使用 switch 分支输出星期名称。']
    ]
  },
  {
    id: 86,
    courseId: 'structs',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'medium',
    label: '进阶',
    title: '联合体字节和',
    description: '定义一个联合体 union Number { int num; unsigned char bytes[4]; }，读入一个非负整数存进 num 成员，再通过 bytes 成员访问它的 4 个字节，输出这 4 个字节的数值之和（与字节顺序无关）。',
    input: '一行包含一个整数 n（0 ≤ n ≤ 1000000）。',
    output: '一行输出 4 个字节的数值之和，行末换行。',
    publicCases: [
      { input: '1', output: '1\n' },
      { input: '255', output: '255\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0\n' },
      { input: '1000000', output: '145\n' }
    ],
    starter: '#include <stdio.h>\n\nunion Number {\n    int num;\n    unsigned char bytes[4];\n};\n\nint main(void) {\n    union Number value;\n    int sum = 0;\n    scanf("%d", &value.num);\n    // 通过 bytes 成员访问这 4 个字节，把它们的值累加到 sum\n    printf("%d\\n", sum);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nunion Number {\n    int num;\n    unsigned char bytes[4];\n};\n\nint main(void) {\n    union Number value;\n    int sum = 0;\n    if (scanf("%d", &value.num) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < 4; i++) {\n        sum += value.bytes[i];\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
    checks: [
      ['/union[\\s\\S]*\\{/', '必须使用 union 定义共享内存的类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 87,
    courseId: 'structs',
    chapter: 4,
    lesson: '调试方法与代码质量',
    level: 'hard',
    label: '挑战',
    title: '形状面积计算',
    description: '用 enum 定义形状编号（1 圆、2 矩形、3 三角形），并用 union 保存不同形状的参数；输入形状编号和对应参数后输出面积（保留两位小数），编号不是 1、2、3 时输出 输入错误。圆周率取 3.14159，三角形面积 = 底 × 高 ÷ 2。',
    input: '一行：先是一个整数 k（形状编号）；k = 1 时后面跟 1 个浮点数 r（半径）；k = 2 时后面跟 2 个浮点数 w h（宽和高）；k = 3 时后面跟 2 个浮点数 b h（底和高）。',
    output: '一行输出面积（保留两位小数），或者输出 输入错误，行末换行。',
    publicCases: [
      { input: '1 1', output: '3.14\n' },
      { input: '2 3 4', output: '12.00\n' }
    ],
    hiddenCases: [
      { input: '3 5 2', output: '5.00\n' },
      { input: '9', output: '输入错误\n' }
    ],
    starter: '#include <stdio.h>\n\nenum ShapeKind {\n    CIRCLE = 1, RECT = 2, TRIANGLE = 3\n};\n\nstruct Shape {\n    enum ShapeKind kind;\n    union {\n        double r;\n        double wh[2];\n        double bh[2];\n    } param;\n};\n\nint main(void) {\n    struct Shape shape;\n    int kind = 0;\n    scanf("%d", &kind);\n    shape.kind = (enum ShapeKind)kind;\n    // 用 switch 读入对应参数并计算面积（保留两位小数），编号非法输出 输入错误\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nenum ShapeKind {\n    CIRCLE = 1, RECT = 2, TRIANGLE = 3\n};\n\nstruct Shape {\n    enum ShapeKind kind;\n    union {\n        double r;\n        double wh[2];\n        double bh[2];\n    } param;\n};\n\nint main(void) {\n    struct Shape shape;\n    int kind = 0;\n    double area = 0.0;\n    if (scanf("%d", &kind) != 1) {\n        return 0;\n    }\n    shape.kind = (enum ShapeKind)kind;\n    switch (shape.kind) {\n        case CIRCLE:\n            if (scanf("%lf", &shape.param.r) != 1) {\n                return 0;\n            }\n            area = 3.14159 * shape.param.r * shape.param.r;\n            break;\n        case RECT:\n            if (scanf("%lf %lf", &shape.param.wh[0], &shape.param.wh[1]) != 2) {\n                return 0;\n            }\n            area = shape.param.wh[0] * shape.param.wh[1];\n            break;\n        case TRIANGLE:\n            if (scanf("%lf %lf", &shape.param.bh[0], &shape.param.bh[1]) != 2) {\n                return 0;\n            }\n            area = shape.param.bh[0] * shape.param.bh[1] / 2.0;\n            break;\n        default:\n            printf("输入错误\\n");\n            return 0;\n    }\n    printf("%.2f\\n", area);\n    return 0;\n}',
    checks: [
      ['/enum[\\s\\S]*\\{/', '必须使用 enum 定义形状编号。'],
      ['/union[\\s\\S]*\\{/', '必须使用 union 保存不同形状的参数。'],
      ['/switch\\s*\\(/', '必须使用 switch 处理不同形状。']
    ]
  },
  {
    id: 88,
    courseId: 'structs',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'easy',
    label: '入门',
    title: '位域开关编码',
    description: '用位域定义一个开关结构：a、b、c 各占 1 位，d 占 4 位。输入三个 0 或 1 和参数 d（0 ~ 15），把它们存进对应的位域成员，然后输出四个成员的值以及开关编码（a + 2 × b + 4 × c）。',
    input: '一行包含四个整数 a b c d，其中 a、b、c 只能是 0 或 1，d 是 0 ~ 15 的整数，用空格分隔。',
    output: '第一行输出四个位域成员的值，用空格分隔；第二行输出开关编码 a + 2b + 4c。每行末尾换行。',
    publicCases: [
      { input: '1 0 1 5', output: '1 0 1 5\n5\n' },
      { input: '0 0 0 0', output: '0 0 0 0\n0\n' }
    ],
    hiddenCases: [
      { input: '1 1 1 15', output: '1 1 1 15\n7\n' },
      { input: '0 1 0 15', output: '0 1 0 15\n2\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Switches {\n    unsigned int a : 1;\n    unsigned int b : 1;\n    unsigned int c : 1;\n    unsigned int d : 4;\n};\n\nint main(void) {\n    struct Switches sw;\n    int a = 0, b = 0, c = 0, d = 0;\n    scanf("%d %d %d %d", &a, &b, &c, &d);\n    // 把四个值存进位域成员，再输出成员值和编码 a + 2b + 4c\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Switches {\n    unsigned int a : 1;\n    unsigned int b : 1;\n    unsigned int c : 1;\n    unsigned int d : 4;\n};\n\nint main(void) {\n    struct Switches sw;\n    int a = 0, b = 0, c = 0, d = 0;\n    if (scanf("%d %d %d %d", &a, &b, &c, &d) != 4) {\n        return 0;\n    }\n    sw.a = (unsigned int)a;\n    sw.b = (unsigned int)b;\n    sw.c = (unsigned int)c;\n    sw.d = (unsigned int)d;\n    printf("%u %u %u %u\\n", sw.a, sw.b, sw.c, sw.d);\n    printf("%u\\n", sw.a + sw.b * 2 + sw.c * 4);\n    return 0;\n}',
    checks: [
      ['/:\\s*[0-9]+\\s*;/', '必须使用位域语法声明成员（如 unsigned int a : 1;）。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 89,
    courseId: 'structs',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'medium',
    label: '进阶',
    title: '位域拆分高低位',
    description: '用位域定义一个结构：low 占 4 位、high 占 4 位。输入一个 0 ~ 255 的整数，把它的低四位存进 low、高四位存进 high，再输出这两个成员的值。',
    input: '一行包含一个整数 n（0 ≤ n ≤ 255）。',
    output: '一行输出两个整数：low 成员的值和 high 成员的值，用空格分隔，行末换行。',
    publicCases: [
      { input: '5', output: '5 0\n' },
      { input: '255', output: '15 15\n' }
    ],
    hiddenCases: [
      { input: '0', output: '0 0\n' },
      { input: '171', output: '11 10\n' }
    ],
    starter: '#include <stdio.h>\n\nstruct Nibbles {\n    unsigned int low : 4;\n    unsigned int high : 4;\n};\n\nint main(void) {\n    struct Nibbles nb;\n    int n = 0;\n    scanf("%d", &n);\n    // 把 n 的低四位和高四位分别存进 low 和 high，再输出这两个成员\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct Nibbles {\n    unsigned int low : 4;\n    unsigned int high : 4;\n};\n\nint main(void) {\n    struct Nibbles nb;\n    int n = 0;\n    if (scanf("%d", &n) != 1) {\n        return 0;\n    }\n    nb.low = (unsigned int)(n & 0x0F);\n    nb.high = (unsigned int)((n >> 4) & 0x0F);\n    printf("%u %u\\n", nb.low, nb.high);\n    return 0;\n}',
    checks: [
      ['/:\\s*[0-9]+\\s*;/', '必须使用位域语法声明成员（如 unsigned int low : 4;）。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出结果。']
    ]
  },
  {
    id: 90,
    courseId: 'structs',
    chapter: 5,
    lesson: '综合练习与迁移应用',
    level: 'hard',
    label: '挑战',
    title: '成绩表综合统计',
    description: '读入 n 名学生（学号、姓名、三门课成绩），用 typedef 的结构体数组保存，为每名学生计算总分、平均分和等级（平均分 ≥ 90 为 优秀，≥ 80 为 良好，≥ 60 为 及格，否则 不及格），最后输出整张成绩表和班级平均分。',
    input: '第一行是一个整数 n（1 ≤ n ≤ 50）；接下来 n 行，每行包含 学号（整数）姓名（不含空格）三门课成绩（三个 0 ~ 100 的整数），用空格分隔。',
    output: '共 n 行，每行输出 学号 姓名 总分 平均分 等级（平均分保留两位小数）；最后一行输出班级平均分（全体学生平均分的平均值，保留两位小数）。每行末尾换行。',
    publicCases: [
      { input: '2\n1 Tom 90 90 90\n2 Amy 60 70 80', output: '1 Tom 270 90.00 优秀\n2 Amy 210 70.00 及格\n80.00\n' },
      { input: '2\n1 Bob 100 100 100\n2 Ken 0 0 0', output: '1 Bob 300 100.00 优秀\n2 Ken 0 0.00 不及格\n50.00\n' }
    ],
    hiddenCases: [
      { input: '1\n5 Solo 0 0 0', output: '5 Solo 0 0.00 不及格\n0.00\n' },
      { input: '3\n1 A 59 60 61\n2 B 100 100 100\n3 C 79 80 81', output: '1 A 180 60.00 及格\n2 B 300 100.00 优秀\n3 C 240 80.00 良好\n80.00\n' }
    ],
    starter: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[32];\n    int scores[3];\n    int total;\n} Student;\n\nint main(void) {\n    Student list[50];\n    int n = 0, i;\n    scanf("%d", &n);\n    for (i = 0; i < n; i++) {\n        scanf("%d %31s %d %d %d", &list[i].id, list[i].name, &list[i].scores[0], &list[i].scores[1], &list[i].scores[2]);\n    }\n    // 计算每名学生的总分、平均分（两位小数）与等级，最后输出班级平均分\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[32];\n    int scores[3];\n    int total;\n} Student;\n\nstatic const char *gradeOf(int total) {\n    if (total >= 270) {\n        return "优秀";\n    }\n    if (total >= 240) {\n        return "良好";\n    }\n    if (total >= 180) {\n        return "及格";\n    }\n    return "不及格";\n}\n\nint main(void) {\n    Student list[50];\n    int n = 0, i;\n    double sumAvg = 0.0;\n    if (scanf("%d", &n) != 1 || n <= 0 || n > 50) {\n        return 0;\n    }\n    for (i = 0; i < n; i++) {\n        if (scanf("%d %31s %d %d %d", &list[i].id, list[i].name, &list[i].scores[0], &list[i].scores[1], &list[i].scores[2]) != 5) {\n            return 0;\n        }\n        list[i].total = 0;\n        for (int j = 0; j < 3; j++) {\n            list[i].total += list[i].scores[j];\n        }\n    }\n    for (i = 0; i < n; i++) {\n        double avg = list[i].total / 3.0;\n        printf("%d %s %d %.2f %s\\n", list[i].id, list[i].name, list[i].total, avg, gradeOf(list[i].total));\n        sumAvg += avg;\n    }\n    printf("%.2f\\n", sumAvg / n);\n    return 0;\n}',
    checks: [
      ['/typedef\\s+struct/', '必须使用 typedef 定义学生结构体类型。'],
      ['/printf\\s*\\(/', '必须使用 printf 输出成绩表。']
    ]
  },
  {
    id: 91, courseId: "algorithms", chapter: 1, lesson: "核心概念与基本模型", level: "easy", label: "入门",
    title: "循环次数估算",
    description: "同一段代码在不同规模下的执行次数差别很大。下面这段嵌套循环：外层 i 从 1 到 n，内层 j 从 1 到 i，内层每次都会执行一次打印语句。读入规模 n，算出打印语句总共被执行多少次。",
    input: "一行包含一个整数 n，1 ≤ n ≤ 1000。",
    output: "输出打印语句的执行总次数，即 1 + 2 + … + n 的值，末尾换行。",
    publicCases: [
      { input: "3", output: "6\n" },
      { input: "5", output: "15\n" }
    ],
    hiddenCases: [
      { input: "1", output: "1\n" },
      { input: "1000", output: "500500\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    // 统计双重循环中最内层语句的执行总次数\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    long long total = (long long)n * (n + 1) / 2;  /* 1+2+...+n */\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出执行次数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须从标准输入读取规模 n。"]
    ]
  },
  {
    id: 92, courseId: "algorithms", chapter: 1, lesson: "核心概念与基本模型", level: "medium", label: "进阶",
    title: "增长率对比",
    description: "甲算法的操作次数是 T1(n) = 3n + 2，乙算法是 T2(n) = n 的平方。读入规模 n，先输出两个算法各自的精确操作次数，再判断在同样的规模下哪个更省。",
    input: "一行包含一个整数 n，1 ≤ n ≤ 1000。",
    output: "第一行输出 T1 的值，第二行输出 T2 的值，第三行输出更省时间的算法代号：甲更省输出 A，乙更省输出 B，相等输出 SAME。",
    publicCases: [
      { input: "2", output: "8\n4\nB\n" },
      { input: "5", output: "17\n25\nA\n" }
    ],
    hiddenCases: [
      { input: "1", output: "5\n1\nB\n" },
      { input: "3", output: "11\n9\nB\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    // 分别算出 3n+2 与 n*n，再比较大小输出 A / B / SAME\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int t1 = 3 * n + 2;\n    int t2 = n * n;\n    printf(\"%d\\n\", t1);\n    printf(\"%d\\n\", t2);\n    if (t1 < t2) {\n        printf(\"A\\n\");\n    } else if (t2 < t1) {\n        printf(\"B\\n\");\n    } else {\n        printf(\"SAME\\n\");\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 分别输出 T1、T2 和比较结论。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须从标准输入读取规模 n。"]
    ]
  },
  {
    id: 93, courseId: "algorithms", chapter: 1, lesson: "核心概念与基本模型", level: "hard", label: "挑战",
    title: "查找代价对比",
    description: "在长度为 n 的顺序表上，顺序查找最坏要看 n 个元素，二分查找最坏要看 ⌈log2(n+1)⌉ 个元素，而冒泡排序要比较 n(n-1)/2 次。读入表长 n，把三种开销算出来做一张对比表。",
    input: "一行包含一个整数 n，1 ≤ n ≤ 1000。",
    output: "输出三行：SQ=顺序查找的最坏比较次数；BIN=二分查找的最坏比较次数；BUB=冒泡排序的比较次数。数值均按十进制输出，末尾换行。",
    publicCases: [
      { input: "4", output: "SQ=4\nBIN=3\nBUB=6\n" },
      { input: "1000", output: "SQ=1000\nBIN=10\nBUB=499500\n" }
    ],
    hiddenCases: [
      { input: "1", output: "SQ=1\nBIN=1\nBUB=0\n" },
      { input: "7", output: "SQ=7\nBIN=3\nBUB=21\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    // 分别计算顺序查找、二分查找、冒泡排序的最坏比较次数\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int sq = n;\n    int bin = 0;\n    int cap = 1;\n    while (cap < n + 1) {  /* 求最小的 bin 使 2^bin >= n+1 */\n        cap *= 2;\n        bin++;\n    }\n    long long bub = (long long)n * (n - 1) / 2;\n    printf(\"SQ=%d\\n\", sq);\n    printf(\"BIN=%d\\n\", bin);\n    printf(\"BUB=%lld\\n\", bub);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出三种开销。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须从标准输入读取表长 n。"]
    ]
  },
  {
    id: 94, courseId: "algorithms", chapter: 2, lesson: "常见写法与执行过程", level: "easy", label: "入门",
    title: "括号是否配对",
    description: "用栈的思想判断括号序列是否合法：读入一个只由左括号和右括号组成的字符串，从左到右扫描，任何时候右括号都不能多于左括号，扫描结束时左右数量必须相等。",
    input: "一行，一个长度不超过 1000 的括号串，只包含字符 ( 和 )，不含空格。",
    output: "序列合法输出 YES，否则输出 NO，末尾换行。",
    publicCases: [
      { input: "(())", output: "YES\n" },
      { input: "())(", output: "NO\n" }
    ],
    hiddenCases: [
      { input: "(", output: "NO\n" },
      { input: "()()()", output: "YES\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[1001];\n    scanf(\"%1000s\", s);\n    // 用一个计数器模拟栈深度：遇到 ( 加一，遇到 ) 减一，中途为负或最后不为零都是不合法\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[1005];\n    if (scanf(\"%1000s\", s) != 1) {\n        return 0;\n    }\n    int depth = 0;   /* 栈中未配对的左括号个数 */\n    int ok = 1;\n    for (int i = 0; s[i] != '\\0'; i++) {\n        if (s[i] == '(') {\n            depth++;\n        } else {\n            depth--;\n            if (depth < 0) {  /* 右括号多于左括号，立刻失败 */\n                ok = 0;\n                break;\n            }\n        }\n    }\n    if (depth != 0) {\n        ok = 0;\n    }\n    printf(ok ? \"YES\\n\" : \"NO\\n\");\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出 YES 或 NO。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取这一行括号串。"]
    ]
  },
  {
    id: 95, courseId: "algorithms", chapter: 2, lesson: "常见写法与执行过程", level: "medium", label: "进阶",
    title: "数组模拟栈",
    description: "用一个数组和栈顶指针模拟栈的操作。依次执行 m 条指令：push x 表示把 x 压栈，pop 表示弹出一个元素并输出，top 表示查看栈顶元素并输出（不弹出）。栈空时 pop 或 top 输出 EMPTY。",
    input: "第一行是整数 m（1 ≤ m ≤ 1000）。随后 m 行，每行是一条指令：push x（x 为整数）或 pop 或 top。",
    output: "对每条 pop 和 top 指令输出一行：栈非空时输出相应元素值，栈空时输出 EMPTY。push 指令不产生输出。",
    publicCases: [
      { input: "5\npush 3\npush 5\ntop\npop\npop", output: "5\n5\n3\n" },
      { input: "4\npop\npush 7\ntop\npush 9", output: "EMPTY\n7\n" }
    ],
    hiddenCases: [
      { input: "3\npush 1\npop\npop", output: "1\nEMPTY\n" },
      { input: "6\npush 2\npush 4\npop\npush 6\ntop\npop", output: "4\n6\n6\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int m;\n    scanf(\"%d\", &m);\n    int stack[1000];\n    int top = 0;\n    char cmd[10];\n    for (int i = 0; i < m; i++) {\n        scanf(\"%9s\", cmd);\n        // 按 cmd 是 push、pop 还是 top 分别处理，注意判断栈是否为空\n    }\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int m;\n    if (scanf(\"%d\", &m) != 1) {\n        return 0;\n    }\n    int stack[1005];\n    int top = 0;   /* 栈中元素个数，栈顶是 stack[top-1] */\n    char cmd[16];\n    for (int i = 0; i < m; i++) {\n        if (scanf(\"%15s\", cmd) != 1) {\n            break;\n        }\n        if (strcmp(cmd, \"push\") == 0) {\n            int x;\n            scanf(\"%d\", &x);\n            stack[top++] = x;\n        } else if (strcmp(cmd, \"pop\") == 0) {\n            if (top == 0) {\n                printf(\"EMPTY\\n\");\n            } else {\n                printf(\"%d\\n\", stack[--top]);\n            }\n        } else {\n            if (top == 0) {\n                printf(\"EMPTY\\n\");\n            } else {\n                printf(\"%d\\n\", stack[top - 1]);\n            }\n        }\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出 pop / top 的结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取指令条数 m 和每条指令。"]
    ]
  },
  {
    id: 96, courseId: "algorithms", chapter: 2, lesson: "常见写法与执行过程", level: "hard", label: "挑战",
    title: "滑动窗口求和",
    description: "队列的顺序处理常常用来维护一个滑动窗口。读入 n 个整数和窗口长度 k，窗口从左向右每次移动一个位置，输出每个窗口内所有元素之和（共 n-k+1 个结果）。窗口滑动时用「加入右边新元素、移出左边旧元素」的方式维护和。",
    input: "第一行是两个整数 n 和 k，1 ≤ k ≤ n ≤ 1000。第二行是 n 个整数，绝对值不超过 1000。",
    output: "共 n-k+1 行，每行一个整数，依次是每个窗口内元素之和。",
    publicCases: [
      { input: "5 3\n1 2 3 4 5", output: "6\n9\n12\n" },
      { input: "4 1\n4 3 2 1", output: "4\n3\n2\n1\n" }
    ],
    hiddenCases: [
      { input: "1 1\n7", output: "7\n" },
      { input: "5 5\n2 2 2 2 2", output: "10\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n, k;\n    scanf(\"%d %d\", &n, &k);\n    int a[1000];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    // 维护一个不断右移的窗口：加进 a[i]，并在窗口过长时减去 a[i-k]\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n, k;\n    if (scanf(\"%d %d\", &n, &k) != 2) {\n        return 0;\n    }\n    int a[1005];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    long long sum = 0;\n    for (int i = 0; i < n; i++) {\n        sum += a[i];\n        if (i >= k) {\n            sum -= a[i - k];\n        }\n        if (i >= k - 1) {\n            printf(\"%lld\\n\", sum);\n        }\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 依次输出每个窗口的和。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取 n、k 以及 n 个整数。"]
    ]
  },
  {
    id: 97, courseId: "algorithms", chapter: 3, lesson: "数据变化与边界情况", level: "easy", label: "入门",
    title: "头插法建链表",
    description: "用动态内存建立一条单链表：读入 n 个整数，每读入一个就用 malloc 建一个结点并插到链表头部。最后从表头开始遍历，输出整条链表，并输出结点个数。",
    input: "第一行是整数 n（0 ≤ n ≤ 1000），n 为 0 时后面没有数据。第二行是 n 个整数。",
    output: "第一行输出链表中的元素，用空格分隔，行末不要多余空格；链表为空时输出 EMPTY。第二行输出 N=结点个数。",
    publicCases: [
      { input: "3\n1 2 3", output: "3 2 1\nN=3\n" },
      { input: "1\n42", output: "42\nN=1\n" }
    ],
    hiddenCases: [
      { input: "0", output: "EMPTY\nN=0\n" },
      { input: "4\n5 5 5 5", output: "5 5 5 5\nN=4\n" }
    ],
    starter: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int value;\n    struct Node *next;\n};\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    struct Node *head = NULL;\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        // 用 malloc 建立新结点，并用头插法接到 head 上\n    }\n    // 遍历链表输出元素和结点个数，最后用 free 释放所有结点\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int value;\n    struct Node *next;\n} Node;\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    Node *head = NULL;\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        Node *p = (Node *)malloc(sizeof(Node));\n        if (p == NULL) {\n            return 0;\n        }\n        p->value = x;\n        p->next = head;   /* 头插法：新结点成为新的表头 */\n        head = p;\n    }\n    int count = 0;\n    if (head == NULL) {\n        printf(\"EMPTY\\n\");\n    } else {\n        for (Node *p = head; p != NULL; p = p->next) {\n            if (count > 0) {\n                printf(\" \");\n            }\n            printf(\"%d\", p->value);\n            count++;\n        }\n        printf(\"\\n\");\n    }\n    printf(\"N=%d\\n\", count);\n    Node *p = head;\n    while (p != NULL) {\n        Node *next = p->next;\n        free(p);\n        p = next;\n    }\n    return 0;\n}",
    checks: [
      ["/malloc\\s*\\(/", "链表结点必须用 malloc 动态分配。"],
      ["/free\\s*\\(/", "程序结束前必须 free 释放所有结点。"],
      ["/printf\\s*\\(/", "必须用 printf 输出链表内容与结点个数。"]
    ]
  },
  {
    id: 98, courseId: "algorithms", chapter: 3, lesson: "数据变化与边界情况", level: "medium", label: "进阶",
    title: "链表删除元素",
    description: "先用尾插法把读入的 n 个整数建成单链表，然后再读入一个整数 x，把链表中所有值等于 x 的结点都删除掉，输出剩下的链表。注意删除时要先接好前后结点再 free。",
    input: "第一行是整数 n（0 ≤ n ≤ 1000）。第二行是 n 个整数。第三行是一个整数 x，表示要删除的值。",
    output: "输出删除后链表中的元素，用空格分隔，行末不要多余空格；若链表被删空则输出 EMPTY。",
    publicCases: [
      { input: "5\n1 2 3 2 5\n2", output: "1 3 5\n" },
      { input: "3\n7 7 7\n7", output: "EMPTY\n" }
    ],
    hiddenCases: [
      { input: "4\n1 2 3 4\n9", output: "1 2 3 4\n" },
      { input: "1\n5\n5", output: "EMPTY\n" }
    ],
    starter: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int value;\n    struct Node *next;\n};\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    struct Node *head = NULL, *tail = NULL;\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        // 用 malloc 建结点，用尾插法接到 tail 后面\n    }\n    int x;\n    scanf(\"%d\", &x);\n    // 删除所有值为 x 的结点，再遍历输出剩余元素，最后 free 所有结点\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int value;\n    struct Node *next;\n} Node;\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    Node *head = NULL, *tail = NULL;\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        Node *p = (Node *)malloc(sizeof(Node));\n        if (p == NULL) {\n            return 0;\n        }\n        p->value = x;\n        p->next = NULL;\n        if (tail == NULL) {\n            head = tail = p;\n        } else {\n            tail->next = p;\n            tail = p;\n        }\n    }\n    int x;\n    if (scanf(\"%d\", &x) != 1) {\n        x = 0;\n    }\n    Node dummy;          /* 虚拟头结点，统一处理删除表头的情况 */\n    dummy.value = 0;\n    dummy.next = head;\n    Node *prev = &dummy;\n    Node *cur = head;\n    while (cur != NULL) {\n        if (cur->value == x) {\n            prev->next = cur->next;\n            free(cur);\n            cur = prev->next;\n        } else {\n            prev = cur;\n            cur = cur->next;\n        }\n    }\n    head = dummy.next;\n    if (head == NULL) {\n        printf(\"EMPTY\\n\");\n    } else {\n        int first = 1;\n        for (Node *p = head; p != NULL; p = p->next) {\n            if (!first) {\n                printf(\" \");\n            }\n            printf(\"%d\", p->value);\n            first = 0;\n        }\n        printf(\"\\n\");\n    }\n    Node *p = head;\n    while (p != NULL) {\n        Node *next = p->next;\n        free(p);\n        p = next;\n    }\n    return 0;\n}",
    checks: [
      ["/malloc\\s*\\(/", "链表结点必须用 malloc 动态分配。"],
      ["/free\\s*\\(/", "被删除的结点和剩余结点都必须 free 释放。"],
      ["/printf\\s*\\(/", "必须用 printf 输出删除后的链表。"]
    ]
  },
  {
    id: 99, courseId: "algorithms", chapter: 3, lesson: "数据变化与边界情况", level: "hard", label: "挑战",
    title: "合并有序链表",
    description: "读入两条各自升序的单链表，把它们合并成一条新的升序链表并输出。用尾插法建表，再用两个游标比较表头元素，谁小就先接谁，最后把剩下的整段接上。",
    input: "第一行是整数 n（0 ≤ n ≤ 1000），第二行是 n 个升序整数；第三行是整数 m（0 ≤ m ≤ 1000），第四行是 m 个升序整数。n 或 m 为 0 时对应的那一行不存在。",
    output: "一行，输出合并后的升序链表，元素之间用空格分隔，行末不要多余空格；两条链表都为空时输出 EMPTY。",
    publicCases: [
      { input: "3\n1 3 5\n3\n2 4 6", output: "1 2 3 4 5 6\n" },
      { input: "2\n1 1\n2\n1 1", output: "1 1 1 1\n" }
    ],
    hiddenCases: [
      { input: "0\n3\n7 8 9", output: "7 8 9\n" },
      { input: "1\n5\n1\n5", output: "5 5\n" }
    ],
    starter: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int value;\n    struct Node *next;\n};\n\n/* 建议写一个建表函数：读入 count 个数，尾插成一条升序链表并返回表头 */\n\nint main(void) {\n    int n, m;\n    scanf(\"%d\", &n);\n    // 先读入 n 个元素，用尾插法建立第一条升序链表\n    scanf(\"%d\", &m);\n    // 再读入 m 个元素建立第二条链表，然后逐个比较两条链表的表头结点完成合并\n    // 输出合并结果，最后 free 释放所有结点\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int value;\n    struct Node *next;\n} Node;\n\nstatic Node *build(int count) {\n    Node *head = NULL, *tail = NULL;\n    for (int i = 0; i < count; i++) {\n        int x;\n        if (scanf(\"%d\", &x) != 1) {\n            break;\n        }\n        Node *p = (Node *)malloc(sizeof(Node));\n        if (p == NULL) {\n            return head;\n        }\n        p->value = x;\n        p->next = NULL;\n        if (tail == NULL) {\n            head = tail = p;\n        } else {\n            tail->next = p;\n            tail = p;\n        }\n    }\n    return head;\n}\n\nstatic void destroy(Node *head) {\n    while (head != NULL) {\n        Node *next = head->next;\n        free(head);\n        head = next;\n    }\n}\n\nint main(void) {\n    int n, m;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    Node *a = build(n);\n    if (scanf(\"%d\", &m) != 1) {\n        destroy(a);\n        return 0;\n    }\n    Node *b = build(m);\n\n    Node dummy;          /* 合并结果的虚拟头结点 */\n    dummy.value = 0;\n    dummy.next = NULL;\n    Node *tail = &dummy;\n    while (a != NULL && b != NULL) {\n        if (a->value <= b->value) {\n            tail->next = a;\n            a = a->next;\n        } else {\n            tail->next = b;\n            b = b->next;\n        }\n        tail = tail->next;\n    }\n    tail->next = (a != NULL) ? a : b;\n\n    Node *merged = dummy.next;\n    if (merged == NULL) {\n        printf(\"EMPTY\\n\");\n    } else {\n        int first = 1;\n        for (Node *p = merged; p != NULL; p = p->next) {\n            if (!first) {\n                printf(\" \");\n            }\n            printf(\"%d\", p->value);\n            first = 0;\n        }\n        printf(\"\\n\");\n    }\n    destroy(merged);\n    return 0;\n}",
    checks: [
      ["/malloc\\s*\\(/", "两条链表的结点必须用 malloc 动态分配。"],
      ["/free\\s*\\(/", "程序结束前必须 free 释放整条链表。"],
      ["/printf\\s*\\(/", "必须用 printf 输出合并后的链表。"]
    ]
  },
  {
    id: 100, courseId: "algorithms", chapter: 4, lesson: "调试方法与代码质量", level: "easy", label: "入门",
    title: "递归求和",
    description: "用递归函数求 1 + 2 + … + n。递归必须写清终止条件：n 小于等于 0 时直接返回 0，否则返回 n 加上规模小一号的结果。读入 n 并输出这个和。",
    input: "一行包含一个整数 n，0 ≤ n ≤ 1000。",
    output: "输出 1 到 n 的累加和，末尾换行。",
    publicCases: [
      { input: "5", output: "15\n" },
      { input: "1", output: "1\n" }
    ],
    hiddenCases: [
      { input: "1000", output: "500500\n" },
      { input: "0", output: "0\n" }
    ],
    starter: "#include <stdio.h>\n\n/* 递归函数：返回 1+2+...+n，注意先写终止条件 */\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    // 调用递归函数并输出结果\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstatic long long sumTo(int n) {\n    if (n <= 0) {\n        return 0;   /* 递归终止条件 */\n    }\n    return n + sumTo(n - 1);\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    printf(\"%lld\\n\", sumTo(n));\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出累加和。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须从标准输入读取 n。"]
    ]
  },
  {
    id: 101, courseId: "algorithms", chapter: 4, lesson: "调试方法与代码质量", level: "medium", label: "进阶",
    title: "递归二分查找",
    description: "在升序数组中用递归实现二分查找。每层递归取区间中点比较：相等就返回下标，中点偏小就到右半区间找，否则到左半区间找；区间为空时说明找不到。",
    input: "第一行是整数 n（1 ≤ n ≤ 1000）。第二行是 n 个互不相同、严格升序的整数。第三行是要查找的目标值 x。",
    output: "找到时输出 x 在数组中的下标（从 0 开始），找不到输出 -1，末尾换行。",
    publicCases: [
      { input: "5\n1 3 5 7 9\n7", output: "3\n" },
      { input: "6\n-5 -1 0 2 8 10\n-1", output: "1\n" }
    ],
    hiddenCases: [
      { input: "1\n42\n42", output: "0\n" },
      { input: "1\n42\n7", output: "-1\n" }
    ],
    starter: "#include <stdio.h>\n\n/* 递归二分查找：在 a[lo..hi] 中找 x，返回下标或 -1 */\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int a[1000];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    int x;\n    scanf(\"%d\", &x);\n    // 调用递归二分查找并输出下标\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstatic int search(const int *a, int lo, int hi, int x) {\n    if (lo > hi) {\n        return -1;   /* 区间为空：终止条件 */\n    }\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] == x) {\n        return mid;\n    }\n    if (a[mid] < x) {\n        return search(a, mid + 1, hi, x);\n    }\n    return search(a, lo, mid - 1, x);\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int a[1005];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    int x;\n    if (scanf(\"%d\", &x) != 1) {\n        printf(\"-1\\n\");\n        return 0;\n    }\n    printf(\"%d\\n\", search(a, 0, n - 1, x));\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出找到的下标或 -1。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取数组长度、数组元素和目标值。"]
    ]
  },
  {
    id: 102, courseId: "algorithms", chapter: 4, lesson: "调试方法与代码质量", level: "hard", label: "挑战",
    title: "子集和判定",
    description: "用递归枚举每一件物品「选或不选」：读入 n 个非负整数和一个目标和 s，判断能否从中挑出若干个数（每个数最多用一次，也可以一个都不选），使它们的和恰好等于 s。选够 s 就立刻返回成功，这是搜索的重要剪枝。",
    input: "第一行是整数 n（1 ≤ n ≤ 15）。第二行是 n 个非负整数，每个不超过 1000。第三行是目标和 s（0 ≤ s ≤ 1000）。",
    output: "能凑出目标和输出 YES，否则输出 NO，末尾换行。",
    publicCases: [
      { input: "4\n1 2 3 4\n6", output: "YES\n" },
      { input: "3\n2 4 6\n5", output: "NO\n" }
    ],
    hiddenCases: [
      { input: "1\n5\n0", output: "YES\n" },
      { input: "4\n1 2 3 4\n11", output: "NO\n" }
    ],
    starter: "#include <stdio.h>\n\nint n;\nint a[15];\n\n/* 递归函数：考虑第 idx 个数时，还需要凑出 rest 这么多 */\n\nint main(void) {\n    int s;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    scanf(\"%d\", &s);\n    // 从第 0 个数开始递归搜索，输出 YES 或 NO\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstatic int n;\nstatic int a[20];\n\nstatic int canMake(int idx, int rest) {\n    if (rest == 0) {\n        return 1;   /* 已经凑够目标：成功终止 */\n    }\n    if (idx >= n || rest < 0) {\n        return 0;   /* 没有数可选或已经超了：失败终止 */\n    }\n    if (canMake(idx + 1, rest - a[idx])) {\n        return 1;   /* 选第 idx 个数 */\n    }\n    return canMake(idx + 1, rest);   /* 不选第 idx 个数 */\n}\n\nint main(void) {\n    int s;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    if (scanf(\"%d\", &s) != 1) {\n        return 0;\n    }\n    printf(canMake(0, s) ? \"YES\\n\" : \"NO\\n\");\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出 YES 或 NO。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取 n、n 个整数以及目标和 s。"]
    ]
  },
  {
    id: 103, courseId: "algorithms", chapter: 5, lesson: "综合练习与迁移应用", level: "easy", label: "入门",
    title: "选择排序",
    description: "实现选择排序：每一轮从未排序区间里挑出最小的元素，和区间第一个位置交换，直到整个数组升序。读入 n 个整数，输出排好序的序列。",
    input: "第一行是整数 n（1 ≤ n ≤ 1000）。第二行是 n 个整数，绝对值不超过 10000。",
    output: "一行，输出升序排列后的 n 个整数，用空格分隔，行末不要多余空格。",
    publicCases: [
      { input: "5\n5 1 4 2 8", output: "1 2 4 5 8\n" },
      { input: "3\n3 2 1", output: "1 2 3\n" }
    ],
    hiddenCases: [
      { input: "1\n7", output: "7\n" },
      { input: "5\n2 2 2 2 2", output: "2 2 2 2 2\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int a[1000];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    // 每轮选出未排序部分的最小值，与当前位置交换\n    // 最后按顺序输出数组\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int a[1005];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (a[j] < a[minIdx]) {\n                minIdx = j;\n            }\n        }\n        if (minIdx != i) {\n            int t = a[i];\n            a[i] = a[minIdx];\n            a[minIdx] = t;\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (i > 0) {\n            printf(\" \");\n        }\n        printf(\"%d\", a[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出排序结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取数组长度和数组元素。"]
    ]
  },
  {
    id: 104, courseId: "algorithms", chapter: 5, lesson: "综合练习与迁移应用", level: "medium", label: "进阶",
    title: "冒泡交换次数",
    description: "冒泡排序每发现一对相邻的逆序元素就交换一次，交换的总次数正好等于数组的逆序对数量，可以用它衡量数据的混乱程度。读入 n 个整数，用冒泡排序排成升序，输出排序结果和总交换次数。",
    input: "第一行是整数 n（1 ≤ n ≤ 1000）。第二行是 n 个整数，绝对值不超过 10000。",
    output: "第一行输出升序排列后的序列，用空格分隔，行末不要多余空格；第二行输出 SWAP=总交换次数。",
    publicCases: [
      { input: "3\n3 1 2", output: "1 2 3\nSWAP=2\n" },
      { input: "4\n4 3 2 1", output: "1 2 3 4\nSWAP=6\n" }
    ],
    hiddenCases: [
      { input: "1\n5", output: "5\nSWAP=0\n" },
      { input: "3\n1 2 3", output: "1 2 3\nSWAP=0\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int a[1000];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    // 冒泡排序：相邻逆序就交换，同时统计交换次数\n    // 输出排序结果和 SWAP=交换次数\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int a[1005];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    long long swaps = 0;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (a[j] > a[j + 1]) {\n                int t = a[j];\n                a[j] = a[j + 1];\n                a[j + 1] = t;\n                swaps++;\n            }\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (i > 0) {\n            printf(\" \");\n        }\n        printf(\"%d\", a[i]);\n    }\n    printf(\"\\n\");\n    printf(\"SWAP=%lld\\n\", swaps);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出排序结果和交换次数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取数组长度和数组元素。"]
    ]
  },
  {
    id: 105, courseId: "algorithms", chapter: 5, lesson: "综合练习与迁移应用", level: "hard", label: "挑战",
    title: "排序后统计次数",
    description: "先把数组排成升序，再用二分查找回答多次询问：对每个询问值 x，统计 x 在数组中出现的次数。可以用两次二分分别找出第一个不小于 x 的位置和第一个大于 x 的位置，两者相减就是答案。",
    input: "第一行是整数 n（1 ≤ n ≤ 1000）。第二行是 n 个整数，绝对值不超过 10000。第三行是询问个数 q（1 ≤ q ≤ 100）。随后 q 行，每行一个整数 x。",
    output: "对每个询问输出一行：x 在数组中出现的次数（不存在输出 0）。",
    publicCases: [
      { input: "6\n5 1 5 2 5 3\n2\n5\n4", output: "3\n0\n" },
      { input: "3\n7 7 7\n1\n7", output: "3\n" }
    ],
    hiddenCases: [
      { input: "1\n42\n2\n42\n0", output: "1\n0\n" },
      { input: "5\n-1 -1 0 0 0\n3\n0\n-1\n1", output: "3\n2\n0\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int a[1000];\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    int q;\n    scanf(\"%d\", &q);\n    // 先给数组排序，再对每个询问用二分统计出现次数并输出\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nstatic int a[1005];\n\n/* 第一个不小于 x 的下标 */\nstatic int lowerBound(int n, int x) {\n    int lo = 0, hi = n;\n    while (lo < hi) {\n        int mid = (lo + hi) / 2;\n        if (a[mid] < x) {\n            lo = mid + 1;\n        } else {\n            hi = mid;\n        }\n    }\n    return lo;\n}\n\n/* 第一个大于 x 的下标 */\nstatic int upperBound(int n, int x) {\n    int lo = 0, hi = n;\n    while (lo < hi) {\n        int mid = (lo + hi) / 2;\n        if (a[mid] <= x) {\n            lo = mid + 1;\n        } else {\n            hi = mid;\n        }\n    }\n    return lo;\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &a[i]);\n    }\n    for (int i = 1; i < n; i++) {   /* 插入排序，保证数组有序 */\n        int key = a[i];\n        int j = i - 1;\n        while (j >= 0 && a[j] > key) {\n            a[j + 1] = a[j];\n            j--;\n        }\n        a[j + 1] = key;\n    }\n    int q;\n    if (scanf(\"%d\", &q) != 1) {\n        return 0;\n    }\n    for (int i = 0; i < q; i++) {\n        int x;\n        if (scanf(\"%d\", &x) != 1) {\n            break;\n        }\n        printf(\"%d\\n\", upperBound(n, x) - lowerBound(n, x));\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每个询问的出现次数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取数组、询问个数和每个询问值。"]
    ]
  },
  {
    id: 106, courseId: "file-io", chapter: 1, lesson: "核心概念与基本模型", level: "easy", label: "入门",
    title: "带行号读入回显",
    description: "本题用标准输入模拟一个已经打开的文本文件：先读入行数，再逐行读入「文件内容」。请像带行号的阅读器那样，把每一行原样回显，并在前面加上从 1 开始的行号。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行文本，每行长度不超过 100 个字符，可能包含空格。",
    output: "输出 n 行，每行格式为「行号: 内容」，行号从 1 开始，内容要原样保留（包括行首和行中的空格）。",
    publicCases: [
      { input: "2\nhello world\nC language", output: "1: hello world\n2: C language\n" },
      { input: "1\nabc", output: "1: abc\n" }
    ],
    hiddenCases: [
      { input: "1\n\n", output: "1: \n" },
      { input: "2\nC is fun\n   indent", output: "1: C is fun\n2:    indent\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();  /* 吃掉第一行末尾的换行符 */\n    char line[300];\n    for (int i = 1; i <= n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 去掉行尾换行符，再按「行号: 内容」的格式输出\n    }\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }   /* 跳过第一行剩余内容 */\n    char line[300];\n    for (int i = 1; i <= n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        size_t len = strlen(line);\n        while (len > 0 && (line[len - 1] == '\\n' || line[len - 1] == '\\r')) {\n            line[--len] = '\\0';\n        }\n        printf(\"%d: %s\\n\", i, line);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出带行号的内容。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取行数并按行读取文本。"]
    ]
  },
  {
    id: 107, courseId: "file-io", chapter: 1, lesson: "核心概念与基本模型", level: "medium", label: "进阶",
    title: "读到结束数行数",
    description: "本题用标准输入模拟一个文本文件，不给行数，要一直读到输入结束（fgets 返回 NULL）为止。请统计这个「文件」一共有多少行，空行同样计入。",
    input: "若干行文本（至少 1 行），每行长度不超过 100 个字符，读到输入结束为止。",
    output: "一行，格式为 LINES=行数，末尾换行。",
    publicCases: [
      { input: "a\nb\nc", output: "LINES=3\n" },
      { input: "hello\nworld", output: "LINES=2\n" }
    ],
    hiddenCases: [
      { input: "a\n\nb", output: "LINES=3\n" },
      { input: "hello", output: "LINES=1\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[300];\n    int lines = 0;\n    while (fgets(line, sizeof(line), stdin) != NULL) {\n        // 每成功读到一行就让计数器加一，读到 NULL 说明已到文件末尾\n    }\n    // 输出 LINES=行数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[300];\n    int lines = 0;\n    while (fgets(line, sizeof(line), stdin) != NULL) {\n        lines++;   /* 空行也会被读到，同样计数 */\n    }\n    printf(\"LINES=%d\\n\", lines);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出统计结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须从标准输入一直读到结束（EOF）。"]
    ]
  },
  {
    id: 108, courseId: "file-io", chapter: 1, lesson: "核心概念与基本模型", level: "hard", label: "挑战",
    title: "逐行标注与统计",
    description: "本题用标准输入模拟一个文本文件，读到输入结束为止。对每一行输出「行号|内容」，空行写成「行号|(empty)」；全部读完后，再输出总行数和非空行的字符总数（不含换行符）。",
    input: "若干行文本（至少 1 行），每行长度不超过 100 个字符，读到输入结束为止。",
    output: "先按顺序输出每一行的「行号|内容」或「行号|(empty)」；最后两行依次为 TOTAL=总行数 和 CHARS=非空行字符总数。",
    publicCases: [
      { input: "hello\n\nworld", output: "1|hello\n2|(empty)\n3|world\nTOTAL=3\nCHARS=10\n" },
      { input: "abc", output: "1|abc\nTOTAL=1\nCHARS=3\n" }
    ],
    hiddenCases: [
      { input: "\n\nx", output: "1|(empty)\n2|(empty)\n3|x\nTOTAL=3\nCHARS=1\n" },
      { input: "a b c\nd", output: "1|a b c\n2|d\nTOTAL=2\nCHARS=6\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[300];\n    int no = 0;\n    int chars = 0;\n    while (fgets(line, sizeof(line), stdin) != NULL) {\n        // 去掉行尾换行符，空行输出 (empty)，否则输出内容\n        // 同时累计行数和非空字符数\n    }\n    // 输出 TOTAL=行数 和 CHARS=字符总数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[300];\n    int no = 0;\n    int chars = 0;\n    while (fgets(line, sizeof(line), stdin) != NULL) {\n        size_t len = strlen(line);\n        while (len > 0 && (line[len - 1] == '\\n' || line[len - 1] == '\\r')) {\n            line[--len] = '\\0';\n        }\n        no++;\n        if (len == 0) {\n            printf(\"%d|(empty)\\n\", no);\n        } else {\n            printf(\"%d|%s\\n\", no, line);\n        }\n        chars += (int)len;\n    }\n    printf(\"TOTAL=%d\\n\", no);\n    printf(\"CHARS=%d\\n\", chars);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每行的标注和最后的统计。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须从标准输入一直读到结束（EOF）。"]
    ]
  },
  {
    id: 109, courseId: "file-io", chapter: 2, lesson: "常见写法与执行过程", level: "easy", label: "入门",
    title: "每行字符数",
    description: "本题用标准输入模拟文件内容：先读入行数 n，再逐行读入文本。请统计每一行的字符个数，空格也要算进去，行尾换行符不算。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行文本，每行长度不超过 100 个字符。",
    output: "共 n 行，第 i 行是第 i 行文本的字符个数（空行输出 0）。",
    publicCases: [
      { input: "2\nabc\nde", output: "3\n2\n" },
      { input: "1\nhello world", output: "11\n" }
    ],
    hiddenCases: [
      { input: "1\n\n", output: "0\n" },
      { input: "3\na\n\nbb", output: "1\n0\n2\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 去掉行尾换行符后输出这一行的字符个数\n    }\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            printf(\"0\\n\");\n            continue;\n        }\n        size_t len = strlen(line);\n        while (len > 0 && (line[len - 1] == '\\n' || line[len - 1] == '\\r')) {\n            line[--len] = '\\0';\n        }\n        printf(\"%d\\n\", (int)len);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 逐行输出字符个数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取行数并按行读取文本。"]
    ]
  },
  {
    id: 110, courseId: "file-io", chapter: 2, lesson: "常见写法与执行过程", level: "medium", label: "进阶",
    title: "单词数与最长词",
    description: "本题用标准输入模拟文件内容：先读入行数 n，再逐行读入文本。单词之间用空格分隔，一行里可能有多个连续空格，也可能是空行。请统计整段文本的单词总数和最长单词的长度。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行文本，每行长度不超过 100 个字符，只包含英文字母和空格。",
    output: "第一行输出 WORDS=单词总数，第二行输出 MAXLEN=最长单词的字母个数；一个单词都没有时输出 WORDS=0 和 MAXLEN=0。",
    publicCases: [
      { input: "2\nhello world\nC programming", output: "WORDS=4\nMAXLEN=11\n" },
      { input: "1\na  b   c", output: "WORDS=3\nMAXLEN=1\n" }
    ],
    hiddenCases: [
      { input: "1\n\n", output: "WORDS=0\nMAXLEN=0\n" },
      { input: "2\nabc defg\nh", output: "WORDS=3\nMAXLEN=4\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    int words = 0;\n    int maxLen = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 用 strtok 按空格切出每个单词，累计个数并更新最长长度\n    }\n    // 输出 WORDS=... 和 MAXLEN=...\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    int words = 0;\n    int maxLen = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *tok = strtok(line, \" \\t\\r\\n\");\n        while (tok != NULL) {\n            int len = (int)strlen(tok);\n            words++;\n            if (len > maxLen) {\n                maxLen = len;\n            }\n            tok = strtok(NULL, \" \\t\\r\\n\");\n        }\n    }\n    printf(\"WORDS=%d\\n\", words);\n    printf(\"MAXLEN=%d\\n\", maxLen);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出单词总数和最长单词长度。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取行数并按行读取文本。"]
    ]
  },
  {
    id: 111, courseId: "file-io", chapter: 2, lesson: "常见写法与执行过程", level: "hard", label: "挑战",
    title: "逐行整数求和",
    description: "本题用标准输入模拟文件内容：先读入行数 n，再逐行读入，每行是若干用空格分隔的整数，也可能是空行或只有空格的行。请对每一行求整数之和，并找出所有整数中的最大值。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行，每行不超过 500 个字符，最多包含 50 个整数，每个整数的绝对值不超过 10000。",
    output: "前 n 行：每行是这一行所有整数之和，若该行没有任何整数则输出 EMPTY。最后一行输出 MAX=所有整数的最大值；一个整数都没有时输出 MAX=NONE。",
    publicCases: [
      { input: "2\n1 2 3\n10 -5", output: "6\n5\nMAX=10\n" },
      { input: "3\n7\n\n2 2", output: "7\nEMPTY\n4\nMAX=7\n" }
    ],
    hiddenCases: [
      { input: "1\n\n", output: "EMPTY\nMAX=NONE\n" },
      { input: "2\n-3 -4\n0", output: "-7\n0\nMAX=0\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[600];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 把这一行按空格切分，逐个转成整数求和，同时更新全局最大值\n        // 一个整数都没有时输出 EMPTY\n    }\n    // 输出 MAX=最大值 或 MAX=NONE\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[600];\n    int hasAny = 0;\n    int maxVal = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            printf(\"EMPTY\\n\");\n            continue;\n        }\n        int sum = 0;\n        int count = 0;\n        char *tok = strtok(line, \" \\t\\r\\n\");\n        while (tok != NULL) {\n            int v;\n            if (sscanf(tok, \"%d\", &v) == 1) {\n                sum += v;\n                count++;\n                if (!hasAny || v > maxVal) {\n                    maxVal = v;\n                    hasAny = 1;\n                }\n            }\n            tok = strtok(NULL, \" \\t\\r\\n\");\n        }\n        if (count == 0) {\n            printf(\"EMPTY\\n\");\n        } else {\n            printf(\"%d\\n\", sum);\n        }\n    }\n    if (hasAny) {\n        printf(\"MAX=%d\\n\", maxVal);\n    } else {\n        printf(\"MAX=NONE\\n\");\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每行之和与全局最大值。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取行数并按行读取文本。"]
    ]
  },
  {
    id: 112, courseId: "file-io", chapter: 3, lesson: "数据变化与边界情况", level: "easy", label: "入门",
    title: "逗号记录解析",
    description: "本题用标准输入模拟记录文件：先读入条数 n，再逐行读入「学号,姓名,成绩」，三个字段用英文逗号分隔。请按逗号切分字段，把姓名和成绩解析出来。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行记录，格式为 学号,姓名,成绩：学号不超过 10 个字符，姓名不超过 20 个字符且不含空格，成绩是整数。",
    output: "共 n 行，每行格式为 NAME=姓名 SCORE=成绩。",
    publicCases: [
      { input: "2\n1001,Tom,88\n1002,Li,95", output: "NAME=Tom SCORE=88\nNAME=Li SCORE=95\n" },
      { input: "1\n7,Ann,60", output: "NAME=Ann SCORE=60\n" }
    ],
    hiddenCases: [
      { input: "1\n5,Z,0", output: "NAME=Z SCORE=0\n" },
      { input: "1\n20240001,ZhangSan,100", output: "NAME=ZhangSan SCORE=100\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[400];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 用 strtok 以英文逗号为分隔符切出三个字段，再输出姓名和成绩\n    }\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[400];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *id = strtok(line, \",\\r\\n\");       /* 学号字段，本题不输出 */\n        char *name = strtok(NULL, \",\\r\\n\");\n        char *scoreStr = strtok(NULL, \",\\r\\n\");\n        int score = 0;\n        if (name == NULL) {\n            name = \"\";\n        }\n        if (scoreStr != NULL) {\n            sscanf(scoreStr, \"%d\", &score);\n        }\n        printf(\"NAME=%s SCORE=%d\\n\", name, score);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出解析出的姓名和成绩。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录条数和每条记录。"]
    ]
  },
  {
    id: 113, courseId: "file-io", chapter: 3, lesson: "数据变化与边界情况", level: "medium", label: "进阶",
    title: "字段完整性校验",
    description: "本题用标准输入模拟记录文件并检查字段是否完整。每行应为「学号,姓名,成绩」三个字段；如果字段不足三个（例如只有两个字段），或者成绩部分不是整数，这一行就是损坏记录。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行记录，正常行为 学号,姓名,成绩（逗号分隔），也可能出现缺字段、空行或成绩非数字的坏行。",
    output: "按顺序处理每一行：正常记录输出 OK 学号 成绩；损坏记录输出 BAD。最后输出一行 VALID=有效条数 BAD=损坏条数。",
    publicCases: [
      { input: "2\n1001,Tom,88\n1002,Li", output: "OK 1001 88\nBAD\nVALID=1 BAD=1\n" },
      { input: "1\n1003,Ann,95", output: "OK 1003 95\nVALID=1 BAD=0\n" }
    ],
    hiddenCases: [
      { input: "2\n,\n2001,Bob,abc", output: "BAD\nBAD\nVALID=0 BAD=2\n" },
      { input: "3\n1,A,10\n\n2,B,20", output: "OK 1 10\nBAD\nOK 2 20\nVALID=2 BAD=1\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[400];\n    int valid = 0;\n    int bad = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 依次取出三个字段：少一个字段或成绩不是整数就判为 BAD\n    }\n    // 输出 VALID=有效条数 BAD=损坏条数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[400];\n    int valid = 0;\n    int bad = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *id = strtok(line, \",\\r\\n\");\n        char *name = strtok(NULL, \",\\r\\n\");\n        char *scoreStr = strtok(NULL, \",\\r\\n\");\n        int score = 0;\n        int ok = 1;\n        if (id == NULL || name == NULL || scoreStr == NULL) {\n            ok = 0;   /* 字段不足三个 */\n        } else if (sscanf(scoreStr, \"%d\", &score) != 1) {\n            ok = 0;   /* 成绩不是整数 */\n        }\n        if (ok) {\n            printf(\"OK %s %d\\n\", id, score);\n            valid++;\n        } else {\n            printf(\"BAD\\n\");\n            bad++;\n        }\n    }\n    printf(\"VALID=%d BAD=%d\\n\", valid, bad);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每行的判定结果和总计。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录条数和每一行。"]
    ]
  },
  {
    id: 114, courseId: "file-io", chapter: 3, lesson: "数据变化与边界情况", level: "hard", label: "挑战",
    title: "定长字段解析",
    description: "本题用标准输入模拟定长记录文件。每行恰好 10 个字符：第 1~4 位是学号，第 5~8 位是姓名（左对齐，右侧用空格补齐），第 9~10 位是两位成绩。请按位置解析字段，并把姓名右侧的补位空格去掉。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行，每行恰好 10 个字符（不含换行符），也可能出现长度不足 10 的坏行。",
    output: "每行输出「学号 姓名 成绩」，字段之间用一个空格分隔；若某行不足 10 个字符，则输出 SHORT。",
    publicCases: [
      { input: "2\n1001Tom 88\n1002Ann 95", output: "1001 Tom 88\n1002 Ann 95\n" },
      { input: "1\n2024Li  60", output: "2024 Li 60\n" }
    ],
    hiddenCases: [
      { input: "1\n1234A 9", output: "SHORT\n" },
      { input: "1\n7777Z   00", output: "7777 Z 0\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 去掉行尾换行符；长度不足 10 就输出 SHORT\n        // 否则按 4+4+2 的位置切出学号、姓名、成绩，并去掉姓名右侧空格\n    }\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        size_t len = strlen(line);\n        while (len > 0 && (line[len - 1] == '\\n' || line[len - 1] == '\\r')) {\n            line[--len] = '\\0';\n        }\n        if (len < 10) {\n            printf(\"SHORT\\n\");\n            continue;\n        }\n        char id[5], name[5], scoreText[3];\n        memcpy(id, line, 4);\n        id[4] = '\\0';\n        memcpy(name, line + 4, 4);\n        name[4] = '\\0';\n        memcpy(scoreText, line + 8, 2);\n        scoreText[2] = '\\0';\n        int k = 3;\n        while (k >= 0 && name[k] == ' ') {   /* 去掉姓名右侧补位空格 */\n            name[k] = '\\0';\n            k--;\n        }\n        int score = 0;\n        sscanf(scoreText, \"%d\", &score);\n        printf(\"%s %s %d\\n\", id, name, score);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出解析结果或 SHORT。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并按行读取定长记录。"]
    ]
  },
  {
    id: 115, courseId: "file-io", chapter: 4, lesson: "调试方法与代码质量", level: "easy", label: "入门",
    title: "整数格式校验",
    description: "本题用标准输入模拟配置文件：先读入行数 n，再逐行读入。每行应该是一个合法整数——可以带一个负号，负号后至少有一位数字，整体长度不超过 10。请逐行判断格式是否合法。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行，每行可能为空行，也可能是一个不含空格的数据项。",
    output: "共 n 行：该行是合法整数输出 OK，否则输出 ERROR。",
    publicCases: [
      { input: "3\n123\n-45\n12a", output: "OK\nOK\nERROR\n" },
      { input: "2\n\n007", output: "ERROR\nOK\n" }
    ],
    hiddenCases: [
      { input: "1\n-", output: "ERROR\n" },
      { input: "2\n-0\n+5", output: "OK\nERROR\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 去掉行尾换行符：空行、只有负号、含非数字字符、长度超过 10 都是 ERROR\n    }\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nstatic int isIntToken(const char *s) {\n    int i = 0;\n    if (s[0] == '-') {\n        i = 1;\n    }\n    if (s[i] == '\\0') {\n        return 0;   /* 空串或只有一个负号 */\n    }\n    for (int k = i; s[k] != '\\0'; k++) {\n        if (!isdigit((unsigned char)s[k])) {\n            return 0;\n        }\n    }\n    return (int)strlen(s) <= 10;\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        size_t len = strlen(line);\n        while (len > 0 && (line[len - 1] == '\\n' || line[len - 1] == '\\r')) {\n            line[--len] = '\\0';\n        }\n        if (isIntToken(line)) {\n            printf(\"OK\\n\");\n        } else {\n            printf(\"ERROR\\n\");\n        }\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每行的判定结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须按行读取，空行也要单独判断。"]
    ]
  },
  {
    id: 116, courseId: "file-io", chapter: 4, lesson: "调试方法与代码质量", level: "medium", label: "进阶",
    title: "跳过坏记录",
    description: "本题用标准输入模拟读取数据表时的容错处理。每行应为「编号 数值」，两者用空格分隔；如果数值不是合法整数，就跳过这一行并报告，其余记录参与累计。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行，每行是「编号 数值」，编号是不含空格的字符串，数值可能是任意不含空格的字符串。",
    output: "按读取顺序，对每个被跳过的行输出一行 SKIP 编号；最后输出一行 COUNT=有效条数 SUM=有效数值之和。",
    publicCases: [
      { input: "3\nA1 10\nA2 x\nA3 32", output: "SKIP A2\nCOUNT=2 SUM=42\n" },
      { input: "2\nB1 -5\nB2 5", output: "COUNT=2 SUM=0\n" }
    ],
    hiddenCases: [
      { input: "2\nC1 bad\nC2 bad", output: "SKIP C1\nSKIP C2\nCOUNT=0 SUM=0\n" },
      { input: "1\nD9 100", output: "COUNT=1 SUM=100\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    int count = 0;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 取出编号与数值：数值不是整数就输出 SKIP 编号并跳过\n        // 否则累加到 count 和 sum\n    }\n    // 输出 COUNT=有效条数 SUM=总和\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    int count = 0;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[128] = \"\";\n        char valueText[128] = \"\";\n        int fields = sscanf(line, \"%127s %127s\", id, valueText);\n        int v = 0;\n        if (fields < 2 || sscanf(valueText, \"%d\", &v) != 1) {\n            printf(\"SKIP %s\\n\", id[0] != '\\0' ? id : \"-\");\n            continue;\n        }\n        count++;\n        sum += v;\n    }\n    printf(\"COUNT=%d SUM=%d\\n\", count, sum);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出被跳过的编号和累计结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并逐行取出字段。"]
    ]
  },
  {
    id: 117, courseId: "file-io", chapter: 4, lesson: "调试方法与代码质量", level: "hard", label: "挑战",
    title: "校验位检查",
    description: "本题用标准输入模拟带校验位的记录流，用来检测读取到的数据有没有出错。每行格式为「内容:校验值」，冒号前的内容不含冒号。校验规则是：内容中字母个数 × 3 加上数字字符个数，结果应当等于冒号后的校验值。",
    input: "第一行是整数 n（1 ≤ n ≤ 100）。随后 n 行，每行是「内容:校验值」，内容不超过 100 个字符且不含冒号，校验值是十进制整数。",
    output: "共 n+1 行：前 n 行按顺序输出 PASS 行号 或 FAIL 行号（行号从 1 开始）；最后一行输出 FAILED=校验失败的条数。",
    publicCases: [
      { input: "2\nabc:9\na1:1", output: "PASS 1\nFAIL 2\nFAILED=1\n" },
      { input: "1\nxy:6", output: "PASS 1\nFAILED=0\n" }
    ],
    hiddenCases: [
      { input: "1\n:0", output: "PASS 1\nFAILED=0\n" },
      { input: "2\nC:1\n99:2", output: "FAIL 1\nPASS 2\nFAILED=1\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[400];\n    int failed = 0;\n    for (int i = 1; i <= n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 用 strchr 找到冒号，统计冒号前内容的字母数与数字字符数\n        // 按规则算出校验值并和冒号后的数字比较，输出 PASS 或 FAIL\n    }\n    // 输出 FAILED=失败条数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[400];\n    int failed = 0;\n    for (int i = 1; i <= n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        size_t len = strlen(line);\n        while (len > 0 && (line[len - 1] == '\\n' || line[len - 1] == '\\r')) {\n            line[--len] = '\\0';\n        }\n        char *colon = strchr(line, ':');\n        if (colon == NULL) {\n            printf(\"FAIL %d\\n\", i);\n            failed++;\n            continue;\n        }\n        *colon = '\\0';\n        int expect = 0;\n        if (sscanf(colon + 1, \"%d\", &expect) != 1) {\n            printf(\"FAIL %d\\n\", i);\n            failed++;\n            continue;\n        }\n        int letters = 0;\n        int digits = 0;\n        for (const char *p = line; *p != '\\0'; p++) {\n            if (isalpha((unsigned char)*p)) {\n                letters++;\n            } else if (isdigit((unsigned char)*p)) {\n                digits++;\n            }\n        }\n        if (letters * 3 + digits == expect) {\n            printf(\"PASS %d\\n\", i);\n        } else {\n            printf(\"FAIL %d\\n\", i);\n            failed++;\n        }\n    }\n    printf(\"FAILED=%d\\n\", failed);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每行的校验结果与失败总数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并按行读取记录。"]
    ]
  },
  {
    id: 118, courseId: "file-io", chapter: 5, lesson: "综合练习与迁移应用", level: "easy", label: "入门",
    title: "保存格式转换",
    description: "本题用标准输入模拟记录文件的读取与另存。先读入条数 n，随后 n 行是「学号,姓名,成绩」（逗号分隔、无空格），请把它们转换成保存格式「学号 姓名 成绩」（用一个空格分隔）逐行写出。",
    input: "第一行是整数 n（0 ≤ n ≤ 100），n 为 0 时后面没有记录。随后 n 行，每行是 学号,姓名,成绩。",
    output: "按顺序输出 n 行「学号 姓名 成绩」；最后输出一行 SAVED=保存的记录条数。",
    publicCases: [
      { input: "2\n1,A,10\n2,B,20", output: "1 A 10\n2 B 20\nSAVED=2\n" },
      { input: "1\n5,Z,0", output: "5 Z 0\nSAVED=1\n" }
    ],
    hiddenCases: [
      { input: "0", output: "SAVED=0\n" },
      { input: "1\n9,ZZ,100", output: "9 ZZ 100\nSAVED=1\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[400];\n    int saved = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 以逗号切分三个字段，按「学号 姓名 成绩」输出，并累计保存条数\n    }\n    // 输出 SAVED=条数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[400];\n    int saved = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[64] = \"\";\n        char name[64] = \"\";\n        int score = 0;\n        char *tok = strtok(line, \",\\r\\n\");\n        if (tok != NULL) {\n            strncpy(id, tok, sizeof(id) - 1);\n        }\n        tok = strtok(NULL, \",\\r\\n\");\n        if (tok != NULL) {\n            strncpy(name, tok, sizeof(name) - 1);\n        }\n        tok = strtok(NULL, \",\\r\\n\");\n        if (tok != NULL) {\n            sscanf(tok, \"%d\", &score);\n        }\n        printf(\"%s %s %d\\n\", id, name, score);\n        saved++;\n    }\n    printf(\"SAVED=%d\\n\", saved);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出保存格式的记录和条数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录条数和每条记录。"]
    ]
  },
  {
    id: 119, courseId: "file-io", chapter: 5, lesson: "综合练习与迁移应用", level: "medium", label: "进阶",
    title: "成绩表校验汇总",
    description: "本题用标准输入模拟成绩记录表并做数据校验。先读入条数 n，随后 n 行是「学号,成绩」；成绩必须是 0 到 100 之间的整数（含两端），越界或不是整数的记录视为无效并报告学号。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号,成绩。",
    output: "先按顺序对每条无效记录输出 INVALID 学号；最后输出一行 VALID=有效条数 AVG=有效成绩的平均分（保留两位小数）。一条有效记录都没有时输出 VALID=0 AVG=NONE。",
    publicCases: [
      { input: "3\n1,80\n2,120\n3,90", output: "INVALID 2\nVALID=2 AVG=85.00\n" },
      { input: "1\n5,59", output: "VALID=1 AVG=59.00\n" }
    ],
    hiddenCases: [
      { input: "2\n1,-1\n2,101", output: "INVALID 1\nINVALID 2\nVALID=0 AVG=NONE\n" },
      { input: "2\n1,0\n2,100", output: "VALID=2 AVG=50.00\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[400];\n    int valid = 0;\n    double sum = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 切出学号和成绩：成绩不是整数或不在 0~100 就输出 INVALID 学号\n        // 否则累加有效条数与总分\n    }\n    // 输出 VALID=... AVG=...（保留两位小数），没有有效记录时 AVG=NONE\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[400];\n    int valid = 0;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *id = strtok(line, \",\\r\\n\");\n        char *scoreText = strtok(NULL, \",\\r\\n\");\n        int score = 0;\n        if (id == NULL || scoreText == NULL || sscanf(scoreText, \"%d\", &score) != 1) {\n            printf(\"INVALID %s\\n\", id != NULL ? id : \"-\");\n            continue;\n        }\n        if (score < 0 || score > 100) {\n            printf(\"INVALID %s\\n\", id);\n            continue;\n        }\n        valid++;\n        sum += score;\n    }\n    if (valid == 0) {\n        printf(\"VALID=0 AVG=NONE\\n\");\n    } else {\n        printf(\"VALID=%d AVG=%.2f\\n\", valid, (double)sum / valid);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出无效记录和汇总结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录条数和每条记录。"]
    ]
  },
  {
    id: 120, courseId: "file-io", chapter: 5, lesson: "综合练习与迁移应用", level: "hard", label: "挑战",
    title: "记录导出排名",
    description: "本题用标准输入模拟记录表的导出流程。先读入条数 n，随后 n 行是「学号,姓名,成绩」；成绩必须是 0 到 100 的整数，否则这条记录在读取时就被丢弃。有效记录按成绩从高到低排名，成绩相同则学号小的排在前面。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号,姓名,成绩。",
    output: "先按读取顺序输出所有被丢弃的记录：DROP 学号；再对有效记录按名次输出「名次|学号|姓名|成绩」（名次从 1 开始依次递增）；最后输出一行 KEPT=有效条数 DROPPED=丢弃条数。",
    publicCases: [
      { input: "4\n1002,Li,88\n1001,Tom,abc\n1003,Ann,95\n1004,Zoe,88", output: "DROP 1001\n1|1003|Ann|95\n2|1002|Li|88\n3|1004|Zoe|88\nKEPT=3 DROPPED=1\n" },
      { input: "2\n7,A,60\n8,B,80", output: "1|8|B|80\n2|7|A|60\nKEPT=2 DROPPED=0\n" }
    ],
    hiddenCases: [
      { input: "0", output: "KEPT=0 DROPPED=0\n" },
      { input: "2\n1,X,999\n2,Y,-5", output: "DROP 1\nDROP 2\nKEPT=0 DROPPED=2\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nstruct Rec {\n    char id[16];\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[400];\n    struct Rec recs[100];\n    int kept = 0;\n    int dropped = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 切分字段：成绩非法就输出 DROP 学号并丢弃，否则存进 recs 数组\n    }\n    // 按成绩降序（相同则学号升序）排序后输出名次，最后输出 KEPT 与 DROPPED\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char id[16];\n    char name[32];\n    int score;\n} Rec;\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[400];\n    Rec recs[105];\n    int kept = 0;\n    int dropped = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *id = strtok(line, \",\\r\\n\");\n        char *name = strtok(NULL, \",\\r\\n\");\n        char *scoreText = strtok(NULL, \",\\r\\n\");\n        int score = 0;\n        int ok = 1;\n        if (id == NULL || name == NULL || scoreText == NULL) {\n            ok = 0;\n        } else if (sscanf(scoreText, \"%d\", &score) != 1 || score < 0 || score > 100) {\n            ok = 0;\n        }\n        if (!ok) {\n            printf(\"DROP %s\\n\", id != NULL ? id : \"-\");\n            dropped++;\n            continue;\n        }\n        strncpy(recs[kept].id, id, sizeof(recs[kept].id) - 1);\n        recs[kept].id[sizeof(recs[kept].id) - 1] = '\\0';\n        strncpy(recs[kept].name, name, sizeof(recs[kept].name) - 1);\n        recs[kept].name[sizeof(recs[kept].name) - 1] = '\\0';\n        recs[kept].score = score;\n        kept++;\n    }\n    for (int i = 0; i < kept - 1; i++) {   /* 冒泡：成绩降序，成绩相同学号升序 */\n        for (int j = 0; j < kept - 1 - i; j++) {\n            int swap = 0;\n            if (recs[j].score < recs[j + 1].score) {\n                swap = 1;\n            } else if (recs[j].score == recs[j + 1].score && strcmp(recs[j].id, recs[j + 1].id) > 0) {\n                swap = 1;\n            }\n            if (swap) {\n                Rec t = recs[j];\n                recs[j] = recs[j + 1];\n                recs[j + 1] = t;\n            }\n        }\n    }\n    for (int i = 0; i < kept; i++) {\n        printf(\"%d|%s|%s|%d\\n\", i + 1, recs[i].id, recs[i].name, recs[i].score);\n    }\n    printf(\"KEPT=%d DROPPED=%d\\n\", kept, dropped);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出丢弃提示、名次表和统计。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录条数和每条记录。"]
    ]
  },
  {
    id: 121, courseId: "project", chapter: 1, lesson: "核心概念与基本模型", level: "easy", label: "入门",
    title: "录入与条数确认",
    description: "学生管理系统的第一步是录入。本题用标准输入模拟录入过程，用数组当记录表：先读入要录入的条数 n，再逐条读入「学号 姓名 成绩」，然后按录入顺序回显这些记录并报告实际条数。",
    input: "第一行是整数 n（0 ≤ n ≤ 100），n 为 0 时没有后续记录。随后 n 行，每行是 学号 姓名 成绩（用一个或多个空格分隔）。",
    output: "按录入顺序输出 n 行，格式为「#序号 学号 姓名」（序号从 1 开始，成绩不回显）；最后输出一行 TOTAL=实际录入条数。",
    publicCases: [
      { input: "2\n1001 Tom 88\n1002 Li 95", output: "#1 1001 Tom\n#2 1002 Li\nTOTAL=2\n" },
      { input: "1\n7 Ann 60", output: "#1 7 Ann\nTOTAL=1\n" }
    ],
    hiddenCases: [
      { input: "0", output: "TOTAL=0\n" },
      { input: "1\n9 Z 0", output: "#1 9 Z\nTOTAL=1\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    int total = 0;\n    for (int i = 1; i <= n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 取出学号和姓名，按「#序号 学号 姓名」输出，并累计条数\n    }\n    // 输出 TOTAL=实际条数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    int total = 0;\n    for (int i = 1; i <= n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[64], name[64];\n        if (sscanf(line, \"%63s %63s\", id, name) != 2) {\n            continue;\n        }\n        printf(\"#%d %s %s\\n\", i, id, name);\n        total++;\n    }\n    printf(\"TOTAL=%d\\n\", total);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 回显记录并输出条数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取录入条数和每条记录。"]
    ]
  },
  {
    id: 122, courseId: "project", chapter: 1, lesson: "核心概念与基本模型", level: "medium", label: "进阶",
    title: "学号唯一性检查",
    description: "学号是学生的唯一标识。本题用标准输入模拟录入过程，用数组保存已经出现过的学号：先读入条数 n，再逐条读入「学号 姓名 成绩」，找出第一个与前面记录重复的学号。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号 姓名 成绩，学号是不含空格的字符串。",
    output: "发现重复学号时输出 DUP=重复的学号（按读取顺序第一个被发现的）；所有学号都不重复时输出 UNIQUE。",
    publicCases: [
      { input: "3\n1 A 10\n2 B 20\n1 C 30", output: "DUP=1\n" },
      { input: "2\n5 X 50\n6 Y 60", output: "UNIQUE\n" }
    ],
    hiddenCases: [
      { input: "1\n7 A 70", output: "UNIQUE\n" },
      { input: "4\n1 A 1\n2 B 2\n2 C 3\n1 D 4", output: "DUP=2\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    char ids[100][32];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 取出学号，和已保存的学号逐个比较；发现重复就记下来\n        // 否则把学号存进 ids 数组\n    }\n    // 输出 DUP=学号 或 UNIQUE\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    char ids[105][32];\n    int cnt = 0;\n    char dup[32] = \"\";\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32];\n        if (sscanf(line, \"%31s\", id) != 1) {\n            continue;\n        }\n        if (dup[0] == '\\0') {\n            for (int j = 0; j < cnt; j++) {\n                if (strcmp(ids[j], id) == 0) {\n                    strcpy(dup, id);\n                    break;\n                }\n            }\n        }\n        strcpy(ids[cnt], id);\n        cnt++;\n    }\n    if (dup[0] == '\\0') {\n        printf(\"UNIQUE\\n\");\n    } else {\n        printf(\"DUP=%s\\n\", dup);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出检查结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并按行读取记录。"]
    ]
  },
  {
    id: 123, courseId: "project", chapter: 1, lesson: "核心概念与基本模型", level: "hard", label: "挑战",
    title: "记录摘要统计",
    description: "把功能清单落成一张摘要表。本题用标准输入模拟记录表，用数组保存数据：先读入条数 n，再读入 n 行「学号 姓名 成绩」，然后统计总条数、成绩总和、最高分和最低分。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号 姓名 成绩，成绩是整数且绝对值不超过 1000。",
    output: "输出四行：COUNT=总条数、SUM=成绩总和、MAX=最高分、MIN=最低分。没有任何记录时 SUM 输出 0，MAX 和 MIN 输出 NONE。",
    publicCases: [
      { input: "3\n1 A 80\n2 B 95\n3 C 60", output: "COUNT=3\nSUM=235\nMAX=95\nMIN=60\n" },
      { input: "1\n9 Z 77", output: "COUNT=1\nSUM=77\nMAX=77\nMIN=77\n" }
    ],
    hiddenCases: [
      { input: "0", output: "COUNT=0\nSUM=0\nMAX=NONE\nMIN=NONE\n" },
      { input: "2\n1 A 0\n2 B 0", output: "COUNT=2\nSUM=0\nMAX=0\nMIN=0\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    int count = 0;\n    int sum = 0;\n    int max = 0;\n    int min = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 取出成绩，累计条数与总和，并维护最高分和最低分\n        // 注意第一条记录要同时初始化 max 和 min\n    }\n    // 输出 COUNT、SUM、MAX、MIN（无记录时 MAX/MIN 输出 NONE）\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    int count = 0;\n    int sum = 0;\n    int max = 0;\n    int min = 0;\n    int has = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[64], name[64];\n        int score;\n        if (sscanf(line, \"%63s %63s %d\", id, name, &score) != 3) {\n            continue;\n        }\n        sum += score;\n        count++;\n        if (!has || score > max) {\n            max = score;\n        }\n        if (!has || score < min) {\n            min = score;\n        }\n        has = 1;\n    }\n    printf(\"COUNT=%d\\n\", count);\n    printf(\"SUM=%d\\n\", sum);\n    if (!has) {\n        printf(\"MAX=NONE\\n\");\n        printf(\"MIN=NONE\\n\");\n    } else {\n        printf(\"MAX=%d\\n\", max);\n        printf(\"MIN=%d\\n\", min);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出四项统计结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并按行读取记录。"]
    ]
  },
  {
    id: 124, courseId: "project", chapter: 2, lesson: "常见写法与执行过程", level: "easy", label: "入门",
    title: "按学号查询",
    description: "字段设计好以后就能按唯一编号检索。本题用标准输入模拟记录表，用数组当记录表：先读入条数 n 和 n 行「学号 姓名 成绩」，最后一行是要查询的学号，请输出这位学生的姓名和成绩。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行记录，每行是 学号 姓名 成绩。最后一行是要查询的学号。",
    output: "找到时输出一行「姓名 成绩」；找不到输出 NOT_FOUND。",
    publicCases: [
      { input: "2\n1001 Tom 88\n1002 Li 95\n1001", output: "Tom 88\n" },
      { input: "1\n7 Ann 60\n7", output: "Ann 60\n" }
    ],
    hiddenCases: [
      { input: "1\n7 Ann 60\n8", output: "NOT_FOUND\n" },
      { input: "0\n5", output: "NOT_FOUND\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    char ids[100][32];\n    char names[100][32];\n    int scores[100];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 把学号、姓名、成绩分别保存到三个数组里\n    }\n    char query[32];\n    scanf(\"%31s\", query);\n    // 用 strcmp 逐个比较学号，找到就输出姓名和成绩，否则输出 NOT_FOUND\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    char ids[105][32];\n    char names[105][32];\n    int scores[105];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32], name[32];\n        int score;\n        if (sscanf(line, \"%31s %31s %d\", id, name, &score) != 3) {\n            continue;\n        }\n        strcpy(ids[cnt], id);\n        strcpy(names[cnt], name);\n        scores[cnt] = score;\n        cnt++;\n    }\n    char query[32];\n    if (scanf(\"%31s\", query) != 1) {\n        printf(\"NOT_FOUND\\n\");\n        return 0;\n    }\n    for (int i = 0; i < cnt; i++) {\n        if (strcmp(ids[i], query) == 0) {\n            printf(\"%s %d\\n\", names[i], scores[i]);\n            return 0;\n        }\n    }\n    printf(\"NOT_FOUND\\n\");\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出查询结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录表和要查询的学号。"]
    ]
  },
  {
    id: 125, courseId: "project", chapter: 2, lesson: "常见写法与执行过程", level: "medium", label: "进阶",
    title: "分配最小编号",
    description: "新增学生时要自动分配一个没被占用的学号，规则是取最小的可用正整数。本题用标准输入模拟已占用的学号表，用一个标记数组记录哪些编号已经被占用。",
    input: "第一行是整数 n（0 ≤ n ≤ 1000），表示已占用的学号个数。第二行是 n 个已占用的学号，均为 1 到 1000 之间的整数，可能重复也可能乱序；n 为 0 时第二行不存在。",
    output: "输出应该分配的新学号，即从 1 开始第一个没有被占用的正整数；若 1 到 1000 全部被占用，输出 1001。",
    publicCases: [
      { input: "3\n1 2 3", output: "4\n" },
      { input: "4\n3 1 4 1", output: "2\n" }
    ],
    hiddenCases: [
      { input: "0", output: "1\n" },
      { input: "5\n1 1 2 2 3", output: "4\n" }
    ],
    starter: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    int used[1002] = {0};\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        // 把已占用的编号在 used 数组里标记出来\n    }\n    // 从 1 开始找第一个没有被占用的编号并输出\n    return 0;\n}",
    solution: "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int used[1002] = {0};\n    for (int i = 0; i < n; i++) {\n        int x;\n        if (scanf(\"%d\", &x) != 1) {\n            break;\n        }\n        if (x >= 1 && x <= 1000) {\n            used[x] = 1;\n        }\n    }\n    int id = 1;\n    while (id <= 1000 && used[id]) {\n        id++;   /* 跳到下一个候选编号 */\n    }\n    printf(\"%d\\n\", id);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出分配的新学号。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取已占用的学号个数和编号。"]
    ]
  },
  {
    id: 126, courseId: "project", chapter: 2, lesson: "常见写法与执行过程", level: "hard", label: "挑战",
    title: "定宽表格输出",
    description: "系统要求把记录按固定宽度输出成整齐的表格：学号右对齐占 6 列、姓名左对齐占 10 列、成绩右对齐占 3 列，三列之间各用一个空格隔开。成绩不在 0 到 100 之间的记录要先跳过。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号 姓名 成绩。",
    output: "先按读取顺序输出被跳过的记录：DROP 学号；再用 printf(\"%6s %-10s %3d\") 的宽度输出所有有效记录；最后输出一行 KEPT=有效条数。",
    publicCases: [
      { input: "2\n1001 Tom 88\n1002 Li 120", output: "DROP 1002\n  1001 Tom         88\nKEPT=1\n" },
      { input: "1\n7 Ann 60", output: "     7 Ann         60\nKEPT=1\n" }
    ],
    hiddenCases: [
      { input: "0", output: "KEPT=0\n" },
      { input: "2\n7 A 0\n8 B 100", output: "     7 A            0\n     8 B          100\nKEPT=2\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    int kept = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 取出学号、姓名、成绩：成绩越界就输出 DROP 学号并跳过\n        // 否则用 %6s %-10s %3d 的宽度输出，并累计有效条数\n    }\n    // 输出 KEPT=有效条数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char id[32];\n    char name[32];\n    int score;\n} Rec;\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    Rec recs[105];\n    char dropped[105][32];\n    int kept = 0;\n    int drops = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *id = strtok(line, \" \\t\\r\\n\");\n        char *name = strtok(NULL, \" \\t\\r\\n\");\n        char *scoreText = strtok(NULL, \" \\t\\r\\n\");\n        int score = 0;\n        int ok = 1;\n        if (id == NULL || name == NULL || scoreText == NULL) {\n            ok = 0;\n        } else if (sscanf(scoreText, \"%d\", &score) != 1 || score < 0 || score > 100) {\n            ok = 0;\n        }\n        if (!ok) {   /* 先记下坏记录，稍后统一报告 */\n            if (id != NULL) {\n                strncpy(dropped[drops], id, 31);\n                dropped[drops][31] = '\\0';\n            } else {\n                strcpy(dropped[drops], \"-\");\n            }\n            drops++;\n            continue;\n        }\n        strncpy(recs[kept].id, id, 31);\n        recs[kept].id[31] = '\\0';\n        strncpy(recs[kept].name, name, 31);\n        recs[kept].name[31] = '\\0';\n        recs[kept].score = score;\n        kept++;\n    }\n    for (int i = 0; i < drops; i++) {\n        printf(\"DROP %s\\n\", dropped[i]);\n    }\n    for (int i = 0; i < kept; i++) {\n        printf(\"%6s %-10s %3d\\n\", recs[i].id, recs[i].name, recs[i].score);\n    }\n    printf(\"KEPT=%d\\n\", kept);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出表格和统计。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录条数和每条记录。"]
    ]
  },
  {
    id: 127, courseId: "project", chapter: 3, lesson: "数据变化与边界情况", level: "easy", label: "入门",
    title: "修改学生成绩",
    description: "更新功能：本题用标准输入模拟记录表，用数组当记录表。先读入条数 n 和 n 行「学号 姓名 成绩」，最后一行是「学号 新成绩」；把该学号的成绩改成新成绩后，输出更新后的整张表。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行记录，每行是 学号 姓名 成绩。最后一行是 学号 新成绩，两者用空格分隔。",
    output: "学号存在时按原顺序输出更新后的全部记录，每行「学号 姓名 成绩」；学号不存在时只输出 NOT_FOUND。",
    publicCases: [
      { input: "2\n1001 Tom 88\n1002 Li 95\n1002 100", output: "1001 Tom 88\n1002 Li 100\n" },
      { input: "1\n7 Ann 60\n7 0", output: "7 Ann 0\n" }
    ],
    hiddenCases: [
      { input: "2\n1 A 10\n2 B 20\n3 30", output: "NOT_FOUND\n" },
      { input: "0\n1 50", output: "NOT_FOUND\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    char ids[100][32];\n    char names[100][32];\n    int scores[100];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 存下这一条记录\n    }\n    char qid[32];\n    int newScore;\n    scanf(\"%31s %d\", qid, &newScore);\n    // 找到学号对应的记录并修改成绩，然后输出整张表\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    char ids[105][32];\n    char names[105][32];\n    int scores[105];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32], name[32];\n        int score;\n        if (sscanf(line, \"%31s %31s %d\", id, name, &score) != 3) {\n            continue;\n        }\n        strcpy(ids[cnt], id);\n        strcpy(names[cnt], name);\n        scores[cnt] = score;\n        cnt++;\n    }\n    char qid[32];\n    int newScore = 0;\n    int found = 0;\n    if (scanf(\"%31s %d\", qid, &newScore) == 2) {\n        for (int i = 0; i < cnt; i++) {\n            if (strcmp(ids[i], qid) == 0) {\n                scores[i] = newScore;\n                found = 1;\n                break;\n            }\n        }\n    }\n    if (!found) {\n        printf(\"NOT_FOUND\\n\");\n        return 0;\n    }\n    for (int i = 0; i < cnt; i++) {\n        printf(\"%s %s %d\\n\", ids[i], names[i], scores[i]);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出更新后的记录表。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录表以及「学号 新成绩」。"]
    ]
  },
  {
    id: 128, courseId: "project", chapter: 3, lesson: "数据变化与边界情况", level: "medium", label: "进阶",
    title: "按学号删除",
    description: "删除功能：本题用标准输入模拟记录表，用数组当记录表。先读入条数 n 和 n 行「学号 姓名 成绩」，最后一行是要删除的学号；删除后要把后面的记录整体前移，保持数组连续。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行记录，每行是 学号 姓名 成绩。最后一行是要删除的学号。",
    output: "删除成功时先输出 LEFT=剩余条数，再按顺序输出剩余记录（每行「学号 姓名 成绩」）；被删空时只输出 LEFT=0。学号不存在时只输出 NOT_FOUND。",
    publicCases: [
      { input: "3\n1 A 10\n2 B 20\n3 C 30\n2", output: "LEFT=2\n1 A 10\n3 C 30\n" },
      { input: "1\n9 Z 90\n9", output: "LEFT=0\n" }
    ],
    hiddenCases: [
      { input: "2\n1 A 10\n2 B 20\n5", output: "NOT_FOUND\n" },
      { input: "0\n1", output: "NOT_FOUND\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    char ids[100][32];\n    char names[100][32];\n    int scores[100];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 存下这一条记录\n    }\n    char qid[32];\n    scanf(\"%31s\", qid);\n    // 找到学号后把它后面的记录整体前移，条数减一，再输出剩余记录\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    char ids[105][32];\n    char names[105][32];\n    int scores[105];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32], name[32];\n        int score;\n        if (sscanf(line, \"%31s %31s %d\", id, name, &score) != 3) {\n            continue;\n        }\n        strcpy(ids[cnt], id);\n        strcpy(names[cnt], name);\n        scores[cnt] = score;\n        cnt++;\n    }\n    char qid[32];\n    int found = -1;\n    if (scanf(\"%31s\", qid) == 1) {\n        for (int i = 0; i < cnt; i++) {\n            if (strcmp(ids[i], qid) == 0) {\n                found = i;\n                break;\n            }\n        }\n    }\n    if (found < 0) {\n        printf(\"NOT_FOUND\\n\");\n        return 0;\n    }\n    for (int i = found; i < cnt - 1; i++) {   /* 后面的记录整体前移 */\n        strcpy(ids[i], ids[i + 1]);\n        strcpy(names[i], names[i + 1]);\n        scores[i] = scores[i + 1];\n    }\n    cnt--;\n    printf(\"LEFT=%d\\n\", cnt);\n    for (int i = 0; i < cnt; i++) {\n        printf(\"%s %s %d\\n\", ids[i], names[i], scores[i]);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出剩余条数和剩余记录。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录表和要删除的学号。"]
    ]
  },
  {
    id: 129, courseId: "project", chapter: 3, lesson: "数据变化与边界情况", level: "hard", label: "挑战",
    title: "分数线筛选排序",
    description: "按条件查询是系统的常用功能。本题用标准输入模拟记录表：先读入条数 n 和 n 行「学号 姓名 成绩」，最后一行是分数线 k；请筛出成绩不低于 k 的学生，并按成绩从高到低排序输出，成绩相同时学号小的排在前面。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行记录，每行是 学号 姓名 成绩。最后一行是整数 k。",
    output: "按上述顺序每行输出一条「学号 姓名 成绩」；一个学生都不满足条件时输出 NONE。",
    publicCases: [
      { input: "4\n1001 Tom 88\n1002 Li 95\n1003 Ann 60\n1004 Zoe 88\n88", output: "1002 Li 95\n1001 Tom 88\n1004 Zoe 88\n" },
      { input: "2\n1 A 60\n2 B 70\n100", output: "NONE\n" }
    ],
    hiddenCases: [
      { input: "1\n5 X 75\n75", output: "5 X 75\n" },
      { input: "0\n0", output: "NONE\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nstruct Rec {\n    char id[32];\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    struct Rec recs[100];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 存下这一条记录\n    }\n    int k;\n    scanf(\"%d\", &k);\n    // 先按成绩降序排序（相同则学号升序），再输出成绩不低于 k 的记录\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char id[32];\n    char name[32];\n    int score;\n} Rec;\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    Rec recs[105];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32], name[32];\n        int score;\n        if (sscanf(line, \"%31s %31s %d\", id, name, &score) != 3) {\n            continue;\n        }\n        strcpy(recs[cnt].id, id);\n        strcpy(recs[cnt].name, name);\n        recs[cnt].score = score;\n        cnt++;\n    }\n    int k = 0;\n    if (scanf(\"%d\", &k) != 1) {\n        k = 0;\n    }\n    for (int i = 0; i < cnt - 1; i++) {   /* 冒泡：成绩降序，成绩相同学号升序 */\n        for (int j = 0; j < cnt - 1 - i; j++) {\n            int swap = 0;\n            if (recs[j].score < recs[j + 1].score) {\n                swap = 1;\n            } else if (recs[j].score == recs[j + 1].score && strcmp(recs[j].id, recs[j + 1].id) > 0) {\n                swap = 1;\n            }\n            if (swap) {\n                Rec t = recs[j];\n                recs[j] = recs[j + 1];\n                recs[j + 1] = t;\n            }\n        }\n    }\n    int printed = 0;\n    for (int i = 0; i < cnt; i++) {\n        if (recs[i].score >= k) {\n            printf(\"%s %s %d\\n\", recs[i].id, recs[i].name, recs[i].score);\n            printed++;\n        }\n    }\n    if (printed == 0) {\n        printf(\"NONE\\n\");\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出筛选结果或 NONE。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取记录表和分数线 k。"]
    ]
  },
  {
    id: 130, courseId: "project", chapter: 4, lesson: "调试方法与代码质量", level: "easy", label: "入门",
    title: "条数一致性检查",
    description: "记录表开头会声明条数，但实际读到的行数可能对不上，这是最常见的加载异常。本题用标准输入模拟这个场景：第一行是声明的条数，随后一直读到输入结束，统计真正读到的非空行数，再比较两者。",
    input: "第一行是整数 declared（0 ≤ declared ≤ 100），表示声明的记录条数。随后是若干行记录，每行「学号 姓名 成绩」，读到输入结束为止（也可能一行都没有）。",
    output: "第一行输出 DECLARED=声明条数 ACTUAL=实际读到的非空行数；第二行在两者相等时输出 OK，否则输出 MISMATCH。",
    publicCases: [
      { input: "2\n1 A 10\n2 B 20", output: "DECLARED=2 ACTUAL=2\nOK\n" },
      { input: "3\n1 A 10\n2 B 20", output: "DECLARED=3 ACTUAL=2\nMISMATCH\n" }
    ],
    hiddenCases: [
      { input: "0", output: "DECLARED=0 ACTUAL=0\nOK\n" },
      { input: "0\n1 A 10", output: "DECLARED=0 ACTUAL=1\nMISMATCH\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int declared;\n    scanf(\"%d\", &declared);\n    getchar();\n    char line[300];\n    int actual = 0;\n    while (fgets(line, sizeof(line), stdin) != NULL) {\n        // 判断这一行是否为空行（只有空白字符），非空行让 actual 加一\n    }\n    // 输出 DECLARED=... ACTUAL=...，再输出 OK 或 MISMATCH\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int declared;\n    if (scanf(\"%d\", &declared) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    int actual = 0;\n    while (fgets(line, sizeof(line), stdin) != NULL) {\n        int blank = 1;\n        for (const char *p = line; *p != '\\0'; p++) {\n            if (*p != ' ' && *p != '\\t' && *p != '\\n' && *p != '\\r') {\n                blank = 0;\n                break;\n            }\n        }\n        if (!blank) {\n            actual++;\n        }\n    }\n    printf(\"DECLARED=%d ACTUAL=%d\\n\", declared, actual);\n    if (declared == actual) {\n        printf(\"OK\\n\");\n    } else {\n        printf(\"MISMATCH\\n\");\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出声明条数、实际条数和结论。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读到输入结束并统计实际行数。"]
    ]
  },
  {
    id: 131, courseId: "project", chapter: 4, lesson: "调试方法与代码质量", level: "medium", label: "进阶",
    title: "加载保存的记录",
    description: "加载已保存的记录时要跳过损坏行，不能让一条坏数据毁掉整次加载。本题用标准输入模拟保存文件，格式是每行「学号|姓名|成绩」（竖线分隔）：字段不足三个或成绩不是整数的行算损坏行。",
    input: "第一行是整数 n（0 ≤ n ≤ 100），表示保存文件的行数。随后 n 行，每行是竖线分隔的保存格式记录，也可能出现损坏行。",
    output: "第一行输出 LOADED=成功加载条数 BROKEN=损坏行数；第二行输出 TOP=成功记录中的最高成绩，一条都没加载成功时输出 TOP=NONE。",
    publicCases: [
      { input: "2\n1001|Tom|88\n1002|Li|95", output: "LOADED=2 BROKEN=0\nTOP=95\n" },
      { input: "2\n1|A|10\nbad-line", output: "LOADED=1 BROKEN=1\nTOP=10\n" }
    ],
    hiddenCases: [
      { input: "1\nx|y|z", output: "LOADED=0 BROKEN=1\nTOP=NONE\n" },
      { input: "2\n1|A|50\n2|B|50", output: "LOADED=2 BROKEN=0\nTOP=50\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    int loaded = 0;\n    int broken = 0;\n    int top = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 用 strtok 以竖线切分三个字段：不完整或成绩非整数算损坏行\n        // 成功加载时累计条数并更新最高成绩\n    }\n    // 输出 LOADED 与 BROKEN，再输出 TOP=最高成绩 或 TOP=NONE\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    int loaded = 0;\n    int broken = 0;\n    int top = 0;\n    int hasTop = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char *id = strtok(line, \"|\\r\\n\");\n        char *name = strtok(NULL, \"|\\r\\n\");\n        char *scoreText = strtok(NULL, \"|\\r\\n\");\n        int score = 0;\n        int ok = 1;\n        if (id == NULL || name == NULL || scoreText == NULL) {\n            ok = 0;\n        } else if (sscanf(scoreText, \"%d\", &score) != 1) {\n            ok = 0;\n        }\n        if (!ok) {\n            broken++;\n            continue;\n        }\n        loaded++;\n        if (!hasTop || score > top) {\n            top = score;\n            hasTop = 1;\n        }\n    }\n    printf(\"LOADED=%d BROKEN=%d\\n\", loaded, broken);\n    if (hasTop) {\n        printf(\"TOP=%d\\n\", top);\n    } else {\n        printf(\"TOP=NONE\\n\");\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出加载结果。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取行数并逐行读取保存记录。"]
    ]
  },
  {
    id: 132, courseId: "project", chapter: 4, lesson: "调试方法与代码质量", level: "hard", label: "挑战",
    title: "记录问题清单",
    description: "一致性检查要一次看清所有问题。本题用标准输入模拟记录表，逐条检查并按顺序报告：成绩不在 0 到 100 报 BADSCORE，姓名字符数超过 8 报 BADNAME，学号与前面某条重复报 DUP。每条记录只报告第一个命中的问题。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号 姓名 成绩。",
    output: "按记录顺序，每条有问题的记录输出一行：BADSCORE 学号、BADNAME 学号 或 DUP 学号；最后输出一行 ISSUES=问题总数（没有问题就输出 ISSUES=0）。",
    publicCases: [
      { input: "3\n1001 Tom 88\n1002 VeryLongName 95\n1001 Amy 70", output: "BADNAME 1002\nDUP 1001\nISSUES=2\n" },
      { input: "2\n1 A 60\n2 B 100", output: "ISSUES=0\n" }
    ],
    hiddenCases: [
      { input: "0", output: "ISSUES=0\n" },
      { input: "3\n3 ABCDEFGHI 50\n3 Bob 50\n4 Zed -1", output: "BADNAME 3\nDUP 3\nBADSCORE 4\nISSUES=3\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    char ids[100][32];\n    int cnt = 0;\n    int issues = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 先检查成绩范围，再检查姓名长度，最后和已保存的学号比较是否重复\n        // 每条记录最多报告一个问题，并把学号保存起来\n    }\n    // 输出 ISSUES=问题总数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    char ids[105][32];\n    int cnt = 0;\n    int issues = 0;\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32], name[32];\n        int score;\n        if (sscanf(line, \"%31s %31s %d\", id, name, &score) != 3) {\n            printf(\"BADREC -\\n\");\n            issues++;\n            continue;\n        }\n        if (score < 0 || score > 100) {\n            printf(\"BADSCORE %s\\n\", id);\n            issues++;\n        } else if (strlen(name) > 8) {\n            printf(\"BADNAME %s\\n\", id);\n            issues++;\n        } else {\n            int dup = 0;\n            for (int j = 0; j < cnt; j++) {\n                if (strcmp(ids[j], id) == 0) {\n                    dup = 1;\n                    break;\n                }\n            }\n            if (dup) {\n                printf(\"DUP %s\\n\", id);\n                issues++;\n            }\n        }\n        strcpy(ids[cnt], id);\n        cnt++;\n    }\n    printf(\"ISSUES=%d\\n\", issues);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出问题清单和总数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并按行读取记录。"]
    ]
  },
  {
    id: 133, courseId: "project", chapter: 5, lesson: "综合练习与迁移应用", level: "easy", label: "入门",
    title: "数据验收判定",
    description: "交付前的验收标准之一：所有成绩都必须落在 0 到 100 之间。本题用标准输入模拟记录表，先读入条数 n 和 n 行「学号 姓名 成绩」，检查是否全部合格，并报告第一条不合格记录的学号。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行，每行是 学号 姓名 成绩。",
    output: "全部合格（或没有任何记录）时输出 PASS；否则输出 FAIL 学号，学号取第一条不合格的记录的学号。",
    publicCases: [
      { input: "2\n1 A 60\n2 B 100", output: "PASS\n" },
      { input: "2\n1 A 60\n2 B 120", output: "FAIL 2\n" }
    ],
    hiddenCases: [
      { input: "0", output: "PASS\n" },
      { input: "1\n5 X -1", output: "FAIL 5\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    getchar();\n    char line[300];\n    char badId[32] = \"\";\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) break;\n        // 成绩不在 0~100 就把学号记进 badId（只记第一条），最后据此输出\n    }\n    // 输出 PASS 或 FAIL 学号\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    int ch;\n    while ((ch = getchar()) != '\\n' && ch != EOF) { }\n    char line[300];\n    char badId[32] = \"\";\n    for (int i = 0; i < n; i++) {\n        if (fgets(line, sizeof(line), stdin) == NULL) {\n            break;\n        }\n        char id[32], name[32];\n        int score;\n        if (sscanf(line, \"%31s %31s %d\", id, name, &score) != 3) {\n            if (badId[0] == '\\0') {\n                strcpy(badId, \"-\");\n            }\n            continue;\n        }\n        if ((score < 0 || score > 100) && badId[0] == '\\0') {\n            strcpy(badId, id);\n        }\n    }\n    if (badId[0] == '\\0') {\n        printf(\"PASS\\n\");\n    } else {\n        printf(\"FAIL %s\\n\", badId);\n    }\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出验收结论。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取条数并按行读取记录。"]
    ]
  },
  {
    id: 134, courseId: "project", chapter: 5, lesson: "综合练习与迁移应用", level: "medium", label: "进阶",
    title: "两批记录合并",
    description: "回归验证：把两次导出的记录合并成一张表。本题用标准输入模拟两次录入，用数组去重——同一个学号出现多次时以最后一次出现的记录为准，合并结果按学号从小到大输出。",
    input: "先是第一批：一行整数 m（0 ≤ m ≤ 100），随后 m 行「学号 姓名 成绩」；接着是第二批：一行整数 k（0 ≤ k ≤ 100），随后 k 行同样的记录。学号是 1 到 1000 之间的整数。",
    output: "按学号升序每行输出一条「学号 姓名 成绩」；最后输出一行 TOTAL=合并后的记录条数。",
    publicCases: [
      { input: "2\n1 Tom 88\n2 Li 95\n2\n2 Li 100\n3 Ann 70", output: "1 Tom 88\n2 Li 100\n3 Ann 70\nTOTAL=3\n" },
      { input: "1\n5 Zoe 60\n1\n5 Zoe 0", output: "5 Zoe 0\nTOTAL=1\n" }
    ],
    hiddenCases: [
      { input: "0\n0", output: "TOTAL=0\n" },
      { input: "2\n9 Q 90\n3 P 30\n0", output: "3 P 30\n9 Q 90\nTOTAL=2\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nstruct Rec {\n    int id;\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    struct Rec recs[100];\n    int cnt = 0;\n    for (int batch = 0; batch < 2; batch++) {\n        int m;\n        scanf(\"%d\", &m);\n        for (int i = 0; i < m; i++) {\n            // 读一条记录：学号已存在就覆盖，否则追加到 recs 末尾\n        }\n    }\n    // 按学号升序排序后输出，最后输出 TOTAL=条数\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    int id;\n    char name[32];\n    int score;\n} Rec;\n\nint main(void) {\n    Rec recs[105];\n    int cnt = 0;\n    for (int batch = 0; batch < 2; batch++) {\n        int m;\n        if (scanf(\"%d\", &m) != 1) {\n            return 0;\n        }\n        for (int i = 0; i < m; i++) {\n            int id, score;\n            char name[32];\n            if (scanf(\"%d %31s %d\", &id, name, &score) != 3) {\n                continue;\n            }\n            int found = -1;\n            for (int j = 0; j < cnt; j++) {\n                if (recs[j].id == id) {\n                    found = j;\n                    break;\n                }\n            }\n            if (found >= 0) {   /* 后出现的记录覆盖前面的 */\n                strcpy(recs[found].name, name);\n                recs[found].score = score;\n            } else {\n                recs[cnt].id = id;\n                strcpy(recs[cnt].name, name);\n                recs[cnt].score = score;\n                cnt++;\n            }\n        }\n    }\n    for (int i = 0; i < cnt - 1; i++) {   /* 按学号升序冒泡 */\n        for (int j = 0; j < cnt - 1 - i; j++) {\n            if (recs[j].id > recs[j + 1].id) {\n                Rec t = recs[j];\n                recs[j] = recs[j + 1];\n                recs[j + 1] = t;\n            }\n        }\n    }\n    for (int i = 0; i < cnt; i++) {\n        printf(\"%d %s %d\\n\", recs[i].id, recs[i].name, recs[i].score);\n    }\n    printf(\"TOTAL=%d\\n\", cnt);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出合并结果和总条数。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取两批记录及其条数。"]
    ]
  },
  {
    id: 135, courseId: "project", chapter: 5, lesson: "综合练习与迁移应用", level: "hard", label: "挑战",
    title: "增删改查会话",
    description: "交付前的端到端检查：本题用标准输入模拟一次完整会话，用数组当记录表。先读入初始条数 n 和 n 行「学号 姓名 成绩」，再读入命令条数 q 和 q 条命令：F 学号 查询、U 学号 成绩 更新、D 学号 删除，最后输出剩余记录的条数与成绩总和。",
    input: "第一行是整数 n（0 ≤ n ≤ 100）。随后 n 行初始记录，每行是 学号 姓名 成绩。接着一行整数 q（0 ≤ q ≤ 100），随后 q 行命令，格式为 F 学号、U 学号 成绩 或 D 学号。",
    output: "按命令顺序输出：F 成功输出「学号 姓名 成绩」，失败输出 NOT_FOUND；U 成功输出 UPDATED，失败输出 NOT_FOUND；D 成功输出 DELETED，失败输出 NOT_FOUND。最后输出一行 FINAL=剩余条数 SUM=剩余成绩总和。",
    publicCases: [
      { input: "2\n1 Tom 88\n2 Li 95\n3\nF 2\nU 1 90\nD 2", output: "2 Li 95\nUPDATED\nDELETED\nFINAL=1 SUM=90\n" },
      { input: "1\n7 Ann 60\n3\nF 8\nU 8 100\nD 8", output: "NOT_FOUND\nNOT_FOUND\nNOT_FOUND\nFINAL=1 SUM=60\n" }
    ],
    hiddenCases: [
      { input: "0\n2\nF 1\nD 1", output: "NOT_FOUND\nNOT_FOUND\nFINAL=0 SUM=0\n" },
      { input: "2\n3 C 50\n1 A 10\n2\nU 1 100\nD 3", output: "UPDATED\nDELETED\nFINAL=1 SUM=100\n" }
    ],
    starter: "#include <stdio.h>\n#include <string.h>\n\nstruct Rec {\n    int id;\n    char name[32];\n    int score;\n};\n\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    struct Rec recs[100];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        // 读入初始记录并保存\n    }\n    int q;\n    scanf(\"%d\", &q);\n    for (int i = 0; i < q; i++) {\n        char cmd[8];\n        scanf(\"%7s\", cmd);\n        // 按 F / U / D 分别处理，注意找不到学号时输出 NOT_FOUND\n    }\n    // 输出 FINAL=剩余条数 SUM=剩余成绩总和\n    return 0;\n}",
    solution: "#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    int id;\n    char name[32];\n    int score;\n} Rec;\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) {\n        return 0;\n    }\n    Rec recs[105];\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        int id, score;\n        char name[32];\n        if (scanf(\"%d %31s %d\", &id, name, &score) != 3) {\n            break;\n        }\n        recs[cnt].id = id;\n        strcpy(recs[cnt].name, name);\n        recs[cnt].score = score;\n        cnt++;\n    }\n    int q = 0;\n    if (scanf(\"%d\", &q) != 1) {\n        q = 0;\n    }\n    for (int i = 0; i < q; i++) {\n        char cmd[8];\n        if (scanf(\"%7s\", cmd) != 1) {\n            break;\n        }\n        int idx = -1;\n        if (strcmp(cmd, \"F\") == 0) {\n            int id;\n            if (scanf(\"%d\", &id) != 1) {\n                break;\n            }\n            for (int j = 0; j < cnt; j++) {\n                if (recs[j].id == id) {\n                    idx = j;\n                    break;\n                }\n            }\n            if (idx < 0) {\n                printf(\"NOT_FOUND\\n\");\n            } else {\n                printf(\"%d %s %d\\n\", recs[idx].id, recs[idx].name, recs[idx].score);\n            }\n        } else if (strcmp(cmd, \"U\") == 0) {\n            int id, score;\n            if (scanf(\"%d %d\", &id, &score) != 2) {\n                break;\n            }\n            for (int j = 0; j < cnt; j++) {\n                if (recs[j].id == id) {\n                    idx = j;\n                    break;\n                }\n            }\n            if (idx < 0) {\n                printf(\"NOT_FOUND\\n\");\n            } else {\n                recs[idx].score = score;\n                printf(\"UPDATED\\n\");\n            }\n        } else {\n            int id;\n            if (scanf(\"%d\", &id) != 1) {\n                break;\n            }\n            for (int j = 0; j < cnt; j++) {\n                if (recs[j].id == id) {\n                    idx = j;\n                    break;\n                }\n            }\n            if (idx < 0) {\n                printf(\"NOT_FOUND\\n\");\n            } else {\n                for (int j = idx; j < cnt - 1; j++) {   /* 后面的记录整体前移 */\n                    recs[j] = recs[j + 1];\n                }\n                cnt--;\n                printf(\"DELETED\\n\");\n            }\n        }\n    }\n    int sum = 0;\n    for (int i = 0; i < cnt; i++) {\n        sum += recs[i].score;\n    }\n    printf(\"FINAL=%d SUM=%d\\n\", cnt, sum);\n    return 0;\n}",
    checks: [
      ["/printf\\s*\\(/", "必须用 printf 输出每条命令的结果和最终统计。"],
      ["/scanf\\s*\\(|fgets\\s*\\(|getchar\\s*\\(/", "必须读取初始记录和每条命令。"]
    ]
  }
];
