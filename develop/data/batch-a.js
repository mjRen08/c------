export default [
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
  }
];
