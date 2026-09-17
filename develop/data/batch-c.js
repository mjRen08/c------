export default [
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
