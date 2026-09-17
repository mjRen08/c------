export default [
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
  }
];
