const visualTopics = [
    {
        tag: '01 · 程序入口', title: '程序是怎样启动的？', description: '理解预处理、main 函数和 return 之间的关系，观察一段 C 程序从加载到输出的完整路径。', visual: 'EXECUTION MAP', keywords: ['main()', '#include', 'printf', 'return 0'], code: ['#include <stdio.h>', '', 'int main() {', '    printf("Hello, C!");', '    return 0;', '}'], steps: [
            { line: 0, title: '预处理器准备工具', description: '#include 把标准输入输出能力带进程序。', counter: '#include', output: '编译准备中...', memory: [{ name: 'stdio.h', value: 'loaded', type: 'header' }] },
            { line: 2, title: '找到程序入口', description: '操作系统从 main 函数开始，把控制权交给你的代码。', counter: 'main()', output: '程序已启动', memory: [{ name: 'main', value: '0x1000', type: '入口地址' }] },
            { line: 3, title: '调用输出函数', description: 'printf 将字符写入标准输出流，控制台出现结果。', counter: 'printf()', output: 'Hello, C!', memory: [{ name: 'stdout', value: 'Hello, C!', type: '输出流' }] },
            { line: 4, title: '正常结束', description: 'return 0 把成功状态返回给操作系统。', counter: 'return 0', output: 'Process exited 0', memory: [{ name: 'exit_code', value: '0', type: 'status' }] }
        ], map: ['加载', 'main()', 'printf()', '结束']
    },
    {
        tag: '02 · 变量与内存', title: '变量究竟放在哪里？', description: '变量是内存中的一块有名字的空间。改变值，就是把新的数据写入这块空间。', visual: 'MEMORY VIEW', keywords: ['int', '赋值', '地址', 'sizeof'], code: ['int score = 72;', 'int bonus = 8;', '', 'score = score + bonus;', 'printf("%d", score);'], steps: [
            { line: 0, title: '申请一块 int 空间', description: '声明变量时，编译器为 score 分配 4 字节空间。', counter: 'score', output: 'score = 72', memory: [{ name: 'score', value: '72', type: '0x7ffd · 4 bytes' }, { name: 'bonus', value: '—', type: '未初始化' }] },
            { line: 1, title: '写入第二个变量', description: 'bonus 也拥有独立的地址和自己的值。', counter: 'bonus', output: 'bonus = 8', memory: [{ name: 'score', value: '72', type: '0x7ffd · 4 bytes' }, { name: 'bonus', value: '8', type: '0x7ff9 · 4 bytes' }] },
            { line: 3, title: '读取并计算', description: 'CPU 读取两个地址的值，计算后把结果写回 score。', counter: 'score = ...', output: 'score = 80', memory: [{ name: 'score', value: '80', type: '0x7ffd · updated' }, { name: 'bonus', value: '8', type: '0x7ff9 · unchanged' }] },
            { line: 4, title: '输出当前值', description: '格式说明符 %d 告诉 printf 按整数解释这块数据。', counter: 'printf()', output: '80', memory: [{ name: 'stdout', value: '80', type: 'console' }] }
        ]
    },
    {
        tag: '03 · 分支与循环', title: '代码如何做决定？', description: '条件让程序选择路径，循环让程序重复路径。这里可以看见 if 和 for 如何改变控制流。', visual: 'CONTROL FLOW', keywords: ['if', 'else', 'for', 'condition'], code: ['for (int i = 1; i <= 3; i++) {', '    if (i % 2 == 0) {', '        printf("even");', '    } else {', '        printf("odd");', '    }', '}'], steps: [
            { line: 0, title: '初始化循环', description: 'i 从 1 开始，循环准备第一次判断。', counter: 'i = 1', output: 'loop started', memory: [{ name: 'i', value: '1', type: 'counter' }] },
            { line: 1, title: '判断条件', description: '1 % 2 不等于 0，程序走向 else 分支。', counter: 'if (false)', output: 'odd', memory: [{ name: 'i', value: '1', type: 'odd' }] },
            { line: 2, title: '执行当前分支', description: '只有被选中的分支会执行，另一条路径被跳过。', counter: 'else', output: 'odd', memory: [{ name: 'i', value: '1', type: 'branch' }] },
            { line: 0, title: '进入下一轮', description: 'i++ 将计数器变为 2，控制流回到条件判断。', counter: 'i = 2', output: 'odd even', memory: [{ name: 'i', value: '2', type: 'counter' }] },
            { line: 2, title: '循环结束', description: '当 i 变成 4，i <= 3 为假，循环自然结束。', counter: 'condition false', output: 'odd even odd', memory: [{ name: 'i', value: '4', type: 'exit' }] }
        ], map: ['初始化', '判断', '分支', 'i++', '结束']
    },
    {
        tag: '04 · 数组与指针', title: '一组数据如何被访问？', description: '数组把相同类型的数据连续放在内存里，指针则记录"从哪里找到它们"。', visual: 'ADDRESS SPACE', keywords: ['array', 'index', '&', '*'], code: ['int nums[3] = {10, 20, 30};', 'int *p = nums;', '', 'printf("%d", *p);', 'p++;', 'printf("%d", *p);'], steps: [
            { line: 0, title: '连续分配数组', description: '三个 int 元素紧挨着排列，每个元素都有自己的下标。', counter: 'nums[0..2]', output: 'array ready', memory: [{ name: '[0]', value: '10', type: '0x1000' }, { name: '[1]', value: '20', type: '0x1004' }, { name: '[2]', value: '30', type: '0x1008' }] },
            { line: 1, title: '指针指向首元素', description: '数组名在表达式中会变成首元素地址，p 保存这个地址。', counter: 'p → nums[0]', output: 'pointer ready', memory: [{ name: 'p', value: '0x1000', type: 'address' }, { name: '*p', value: '10', type: 'dereference' }] },
            { line: 3, title: '解引用读取数据', description: '*p 不是地址，而是"地址里的值"，因此得到 10。', counter: '*p', output: '10', memory: [{ name: 'p', value: '0x1000', type: 'address' }, { name: '*p', value: '10', type: 'value' }] },
            { line: 4, title: '指针向后移动', description: 'p++ 按元素大小移动 4 字节，指向下一个 int。', counter: 'p++', output: '10', memory: [{ name: 'p', value: '0x1004', type: 'next int' }, { name: '*p', value: '20', type: 'value' }] },
            { line: 5, title: '读取第二个元素', description: '同一个指针变量，现在访问的是 nums[1]。', counter: '*p', output: '10 20', memory: [{ name: 'p', value: '0x1004', type: 'address' }, { name: '*p', value: '20', type: 'dereference' }] }
        ]
    },
    {
        tag: '05 · 函数与递归', title: '函数如何把任务拆开？', description: '函数拥有自己的栈帧。调用函数会压入新的执行空间，return 时再逐层返回。', visual: 'CALL STACK', keywords: ['function', 'parameter', 'return', 'recursion'], code: ['int factorial(int n) {', '    if (n <= 1) return 1;', '    return n * factorial(n - 1);', '}', '', 'factorial(3);'], steps: [
            { line: 5, title: '调用 factorial(3)', description: '新的函数调用压入栈顶，参数 n 等于 3。', counter: 'factorial(3)', output: 'call stack: 1', memory: [{ name: 'n', value: '3', type: 'frame #1' }] },
            { line: 2, title: '继续调用 factorial(2)', description: '3 还不能返回，函数把问题缩小为 factorial(2)。', counter: 'factorial(2)', output: 'call stack: 2', memory: [{ name: 'n', value: '2', type: 'frame #2' }, { name: 'caller', value: 'n=3', type: 'frame #1' }] },
            { line: 2, title: '继续调用 factorial(1)', description: '问题继续缩小，直到遇到最基础的情况。', counter: 'factorial(1)', output: 'call stack: 3', memory: [{ name: 'n', value: '1', type: 'frame #3' }, { name: 'caller', value: 'n=2 → n=3', type: 'frames' }] },
            { line: 1, title: '触达递归出口', description: 'n <= 1 成立，返回 1，栈开始逐层弹出。', counter: 'return 1', output: 'returning...', memory: [{ name: 'result', value: '1', type: 'frame #3' }] },
            { line: 2, title: '组合结果并返回', description: '2 × 1 再乘 3，最终得到 factorial(3) = 6。', counter: 'return 6', output: '6', memory: [{ name: 'result', value: '6', type: 'main frame' }] }
        ]
    },
    {
        tag: '06 · 结构体与文件', title: '数据如何被组织和保存？', description: '结构体把不同类型组合成一个对象，文件 I/O 则让对象跨越程序运行周期留在磁盘上。', visual: 'DATA PIPELINE', keywords: ['struct', 'FILE *', 'fwrite', 'fclose'], code: ['struct Student {', '    char name[20];', '    int score;', '};', 'FILE *file = fopen("data.bin", "wb");', 'fwrite(&student, sizeof student, 1, file);', 'fclose(file);'], steps: [
            { line: 0, title: '定义数据模型', description: 'struct 把姓名和成绩放进同一个 Student 对象。', counter: 'struct Student', output: 'schema ready', memory: [{ name: 'name[20]', value: '—', type: 'char array' }, { name: 'score', value: '—', type: 'int' }] },
            { line: 4, title: '打开二进制文件', description: 'fopen 返回文件指针，wb 模式代表写入二进制数据。', counter: 'fopen()', output: 'FILE* opened', memory: [{ name: 'file', value: '0x2A0', type: 'write binary' }] },
            { line: 5, title: '写入结构体', description: 'fwrite 按结构体大小，把一整条记录写入磁盘。', counter: 'fwrite()', output: '1 record saved', memory: [{ name: 'disk', value: 'Student × 1', type: 'data.bin' }] },
            { line: 6, title: '关闭资源', description: 'fclose 刷新缓冲区并释放文件句柄，资源管理完成。', counter: 'fclose()', output: 'save complete', memory: [{ name: 'file', value: 'NULL', type: 'released' }] }
        ]
    },
    {
        tag: '07 · 冒泡排序', title: '冒泡排序怎样交换元素？', description: '相邻元素两两比较，把较大的值逐步交换到右侧。每一轮结束，末尾都会多一个有序元素。', visual: 'BUBBLE SORT', visualType: 'bars', keywords: ['compare', 'swap', '双重循环', 'O(n²)'], code: ['for (int i = 0; i < n - 1; i++) {', '    for (int j = 0; j < n - i - 1; j++) {', '        if (a[j] > a[j + 1]) {', '            swap(&a[j], &a[j + 1]);', '        }', '    }', '}'], steps: [
            { line: 0, title: '准备第 1 轮', description: '外层循环 i = 0，暂时还没有元素确定位置。', counter: 'i = 0', output: '[7, 3, 8, 2, 5, 1, 6, 4]', memory: [{ name: '已排序', value: '0 个', type: 'right side' }], bars: [7, 3, 8, 2, 5, 1, 6, 4], active: [] },
            { line: 2, title: '比较 7 和 3', description: '7 大于 3，条件成立，交换这两个相邻元素。', counter: 'j = 0 · swap', output: '[3, 7, 8, 2, 5, 1, 6, 4]', memory: [{ name: '比较', value: '7 > 3', type: 'true' }], bars: [3, 7, 8, 2, 5, 1, 6, 4], active: [0, 1] },
            { line: 2, title: '比较 7 和 8', description: '7 小于 8，不交换，继续向右检查。', counter: 'j = 1 · keep', output: '[3, 7, 8, 2, 5, 1, 6, 4]', memory: [{ name: '比较', value: '7 < 8', type: 'false' }], bars: [3, 7, 8, 2, 5, 1, 6, 4], active: [1, 2] },
            { line: 3, title: '8 继续向右移动', description: '8 大于 2，交换后继续向右，较大值正在"冒泡"。', counter: 'j = 2 · swap', output: '[3, 7, 2, 8, 5, 1, 6, 4]', memory: [{ name: '交换次数', value: '2', type: 'pass 1' }], bars: [3, 7, 2, 8, 5, 1, 6, 4], active: [2, 3] },
            { line: 3, title: '第 1 轮继续交换', description: '8 依次和 5、1、6、4 比较，最终移动到最右端。', counter: 'j = 3..6', output: '[3, 7, 2, 5, 1, 6, 4, 8]', memory: [{ name: '有序尾部', value: '8', type: 'locked' }], bars: [3, 7, 2, 5, 1, 6, 4, 8], active: [6, 7] },
            { line: 0, title: '准备第 2 轮', description: 'i = 1，最右侧的 8 已经有序，比较范围缩小。', counter: 'i = 1', output: 'ignore index 7', memory: [{ name: '有序尾部', value: '[8]', type: 'locked' }], bars: [3, 7, 2, 5, 1, 6, 4, 8], active: [7] },
            { line: 3, title: '小数值向左移动', description: '2、1 等较小值通过多次交换逐渐靠近左侧。', counter: 'swap adjacent', output: '[2, 3, 1, 5, 6, 4, 7, 8]', memory: [{ name: '有序尾部', value: '[7, 8]', type: 'locked' }], bars: [2, 3, 1, 5, 6, 4, 7, 8], active: [1, 2] },
            { line: 1, title: '重复比较剩余区间', description: '每完成一轮，右侧都会多一个确定的最大值。', counter: 'i = 2..6', output: '[1, 2, 3, 4, 5, 6, 7, 8]', memory: [{ name: '轮次', value: '完成', type: 'n - 1' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [] },
            { line: 6, title: '排序完成', description: '所有相邻逆序对都消失，数组已经从小到大排列。', counter: 'done', output: '[1, 2, 3, 4, 5, 6, 7, 8]', memory: [{ name: '复杂度', value: 'O(n²)', type: '比较型排序' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [] }
        ]
    },
    {
        tag: '08 · 选择排序', title: '选择排序如何寻找最小值？', description: '每一轮从未排序区间找到最小值，再把它放到区间开头。', visual: 'SELECTION SORT', visualType: 'bars', keywords: ['minIndex', '选择', '交换', 'O(n²)'], code: ['for (int i = 0; i < n - 1; i++) {', '    int min = i;', '    for (int j = i + 1; j < n; j++)', '        if (a[j] < a[min]) min = j;', '    swap(&a[i], &a[min]);', '}'], steps: [
            { line: 1, title: '选择第 0 个位置', description: '先假设 9 是未排序区间中的最小值。', counter: 'i = 0 · min = 0', output: '[9, 4, 7, 2, 8, 1, 6, 3]', memory: [{ name: '已排序', value: '[]', type: 'prefix' }], bars: [9, 4, 7, 2, 8, 1, 6, 3], active: [0] },
            { line: 3, title: '发现更小的 2', description: '扫描到 2，比当前候选 9 小，min 改为下标 3。', counter: 'min = 3 · value = 2', output: 'new minimum: 2', memory: [{ name: 'minIndex', value: '3', type: 'scan' }], bars: [9, 4, 7, 2, 8, 1, 6, 3], active: [0, 3] },
            { line: 3, title: '发现更小的 1', description: '继续扫描发现 1，它比 2 还小，更新最小值位置。', counter: 'min = 5 · value = 1', output: 'new minimum: 1', memory: [{ name: 'minIndex', value: '5', type: 'scan' }], bars: [9, 4, 7, 2, 8, 1, 6, 3], active: [3, 5] },
            { line: 4, title: '把 1 换到最前', description: '扫描结束，把最小值 1 与第 0 个元素交换。', counter: 'swap(0, 5)', output: '[1, 4, 7, 2, 8, 9, 6, 3]', memory: [{ name: '已排序', value: '[1]', type: 'prefix' }], bars: [1, 4, 7, 2, 8, 9, 6, 3], active: [0, 5] },
            { line: 1, title: '第二轮从下标 1 开始', description: '下标 0 已经确定，新的未排序区间从 4 开始。', counter: 'i = 1 · min = 1', output: 'prefix: [1]', memory: [{ name: '已排序', value: '[1]', type: 'prefix' }], bars: [1, 4, 7, 2, 8, 9, 6, 3], active: [1] },
            { line: 3, title: '找到第二小的 2', description: '在 [4, 7, 2, 8, 9, 6, 3] 中找到 2。', counter: 'min = 3 · value = 2', output: 'new minimum: 2', memory: [{ name: 'minIndex', value: '3', type: 'scan' }], bars: [1, 4, 7, 2, 8, 9, 6, 3], active: [1, 3] },
            { line: 4, title: '继续放置最小值', description: '交换后，前缀 [1, 2] 有序，范围再次缩小。', counter: 'swap(1, 3)', output: '[1, 2, 7, 4, 8, 9, 6, 3]', memory: [{ name: '已排序', value: '[1, 2]', type: 'prefix' }], bars: [1, 2, 7, 4, 8, 9, 6, 3], active: [1] },
            { line: 5, title: '重复选择直到结束', description: '每一轮只做一次最终交换，逐渐建立有序前缀。', counter: 'i = 2..6', output: '[1, 2, 3, 4, 6, 7, 8, 9]', memory: [{ name: '有序前缀', value: '7 个', type: 'growing' }], bars: [1, 2, 3, 4, 6, 7, 8, 9], active: [] },
            { line: 5, title: '排序完成', description: '每个位置都选择了剩余元素中的最小值。', counter: 'done', output: '[1, 2, 3, 4, 6, 7, 8, 9]', memory: [{ name: '复杂度', value: 'O(n²)', type: '选择型排序' }], bars: [1, 2, 3, 4, 6, 7, 8, 9], active: [] }
        ]
    },
    {
        tag: '09 · 插入排序', title: '插入排序如何整理手里的牌？', description: '把当前元素取出，向左寻找位置并移动更大的元素，像整理扑克牌一样逐步建立有序区。', visual: 'INSERTION SORT', visualType: 'bars', keywords: ['key', 'shift', '有序区', 'O(n²)'], code: ['for (int i = 1; i < n; i++) {', '    int key = a[i];', '    int j = i - 1;', '    while (j >= 0 && a[j] > key) {', '        a[j + 1] = a[j];', '        j--;', '    }', '    a[j + 1] = key;', '}'], steps: [
            { line: 0, title: '从第二张牌开始', description: '下标 0 的 8 可以看作已经排好，从 i = 1 取出下一张牌。', counter: 'i = 1', output: '[8, 3, 7, 2, 6, 1, 5, 4]', memory: [{ name: '有序区', value: '[8]', type: 'left' }], bars: [8, 3, 7, 2, 6, 1, 5, 4], active: [0, 1] },
            { line: 1, title: '取出 key = 3', description: '把 3 暂存起来，当前位置暂时变成一个空位。', counter: 'key = 3', output: 'hold key: 3', memory: [{ name: 'key', value: '3', type: 'temporary' }], bars: [8, 3, 7, 2, 6, 1, 5, 4], active: [1] },
            { line: 4, title: '向右移动 8', description: '8 大于 key，向右移动一格，为 3 腾出位置。', counter: 'a[1] = a[0]', output: '[8, 8, 7, 2, 6, 1, 5, 4]', memory: [{ name: '空位', value: '0', type: 'insert' }], bars: [8, 8, 7, 2, 6, 1, 5, 4], active: [0, 1] },
            { line: 7, title: '插入 3', description: '没有更小的前项了，把 key 放到下标 0。', counter: 'a[0] = key', output: '[3, 8, 7, 2, 6, 1, 5, 4]', memory: [{ name: '有序区', value: '[3, 8]', type: 'left' }], bars: [3, 8, 7, 2, 6, 1, 5, 4], active: [0, 1] },
            { line: 1, title: '取出 key = 7', description: '7 比 8 小，向左移动 8，再把 7 插入空位。', counter: 'key = 7', output: '[3, 7, 8, 2, 6, 1, 5, 4]', memory: [{ name: '有序区', value: '[3, 7, 8]', type: 'left' }], bars: [3, 7, 8, 2, 6, 1, 5, 4], active: [1, 2] },
            { line: 1, title: '取出 key = 2', description: '2 比 8、7、3 都小，三个元素依次右移。', counter: 'key = 2', output: '[2, 3, 7, 8, 6, 1, 5, 4]', memory: [{ name: '移动次数', value: '3', type: 'shift' }], bars: [2, 3, 7, 8, 6, 1, 5, 4], active: [0, 1, 2, 3] },
            { line: 3, title: '依次插入剩余元素', description: '6、1、5、4 重复取出、移动和插入，有序区逐步扩大。', counter: 'i = 4..7', output: '[1, 2, 3, 4, 5, 6, 7, 8]', memory: [{ name: '有序区', value: '8 个', type: 'left' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [] },
            { line: 9, title: '排序完成', description: '所有元素都被插入到左侧有序区，排序结束。', counter: 'done', output: '[1, 2, 3, 4, 5, 6, 7, 8]', memory: [{ name: '复杂度', value: 'O(n²)', type: '插入型排序' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [] }
        ]
    },
    {
        tag: '10 · 快速排序', title: '快速排序如何分治？', description: '选择基准值，把更小和更大的元素分到两侧，再递归处理两个子区间。', visual: 'QUICK SORT', visualType: 'bars', keywords: ['pivot', 'partition', '递归', 'O(n log n)'], code: ['int quicksort(int a[], int lo, int hi) {', '    int pivot = a[hi];', '    int p = partition(a, lo, hi, pivot);', '    quicksort(a, lo, p - 1);', '    quicksort(a, p + 1, hi);', '}'], steps: [
            { line: 1, title: '选择第一个 pivot', description: '当前区间 [7, 2, 6, 3, 5, 1, 8, 4]，选末尾 4 做基准。', counter: 'pivot = 4', output: 'partition [0..7]', memory: [{ name: 'pivot', value: '4', type: 'baseline' }], bars: [7, 2, 6, 3, 5, 1, 8, 4], active: [7] },
            { line: 2, title: '检查 7', description: '7 大于 pivot，暂时留在右侧，大元素区等待处理。', counter: 'j = 0 · 7 > 4', output: 'keep right', memory: [{ name: '左区', value: '[]', type: '< pivot' }], bars: [7, 2, 6, 3, 5, 1, 8, 4], active: [0, 7] },
            { line: 2, title: '交换 2 到左侧', description: '2 小于 pivot，放入左侧分区。', counter: 'swap(0, 1)', output: '[2, 7, 6, 3, 5, 1, 8, 4]', memory: [{ name: '左区', value: '[2]', type: '< pivot' }], bars: [2, 7, 6, 3, 5, 1, 8, 4], active: [0, 1] },
            { line: 2, title: '继续扫描并交换', description: '3 和 1 也小于 4，依次被交换到左侧。', counter: 'swap 3, 1', output: '[2, 3, 1, 7, 5, 6, 8, 4]', memory: [{ name: '左区', value: '[2, 3, 1]', type: '< pivot' }], bars: [2, 3, 1, 7, 5, 6, 8, 4], active: [1, 2] },
            { line: 2, title: 'pivot 放回中间', description: '扫描完成，把 4 放到左右分区的中间位置。', counter: 'pivot index = 3', output: '[2, 3, 1, 4, 5, 6, 8, 7]', memory: [{ name: 'pivot', value: 'index 3', type: 'fixed' }], bars: [2, 3, 1, 4, 5, 6, 8, 7], active: [3] },
            { line: 3, title: '递归处理左区间', description: '左区间 [2, 3, 1] 独立排序，不再碰右边元素。', counter: 'quicksort(0, 2)', output: 'left recursive call', memory: [{ name: '区间', value: '[2, 3, 1]', type: 'recursive' }], bars: [2, 3, 1, 4, 5, 6, 8, 7], active: [0, 1, 2] },
            { line: 4, title: '递归处理右区间', description: '右区间 [5, 6, 8, 7] 同样选择 pivot 并继续分区。', counter: 'quicksort(4, 7)', output: 'right recursive call', memory: [{ name: '区间', value: '[5, 6, 8, 7]', type: 'recursive' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [4, 5, 6, 7] },
            { line: 5, title: '递归到单元素', description: '区间缩小到一个元素时天然有序，递归开始返回。', counter: 'lo >= hi', output: 'base case reached', memory: [{ name: '递归', value: 'return', type: 'base case' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [] },
            { line: 5, title: '排序完成', description: '所有子区间都完成分区，数组整体有序。', counter: 'done', output: '[1, 2, 3, 4, 5, 6, 7, 8]', memory: [{ name: '复杂度', value: 'O(n log n)', type: 'average' }], bars: [1, 2, 3, 4, 5, 6, 7, 8], active: [] }
        ]
    },
    {
        tag: '11 · 栈与队列', title: '栈和队列怎样管理顺序？', description: '栈遵循后进先出，队列遵循先进先出。观察 push、pop、enqueue 和 dequeue 对数据顺序的影响。', visual: 'STACK & QUEUE', visualType: 'stack', keywords: ['push', 'pop', 'peek', 'enqueue', 'dequeue', 'FIFO / LIFO'], code: ['typedef struct {', '    int data[5];', '    int top;', '} Stack;', '', 'void push(Stack *s, int value) {', '    s->data[++s->top] = value;', '}', '', 'int pop(Stack *s) {', '    return s->data[s->top--];', '}', '', 'push(&stack, 10);', 'push(&stack, 20);', 'peek(&stack);', 'pop(&stack);', '', 'enqueue(&queue, 30);', 'enqueue(&queue, 40);', 'dequeue(&queue);'], steps: [
            { line: 0, title: '定义栈的结构', description: '栈用数组保存数据，top 记录当前栈顶下标。初始 top = -1 表示空栈。', counter: 'top = -1', output: 'stack is empty', memory: [{ name: 'top', value: '-1', type: 'empty stack' }], stack: [], queue: [] },
            { line: 13, title: 'push(10)：入栈', description: '先把 top 加 1，再把 10 写入 data[0]，10 成为栈顶。', counter: 'push(10)', output: 'stack top: 10', memory: [{ name: 'top', value: '0', type: 'index' }], stack: ['10'], queue: [] },
            { line: 14, title: 'push(20)：再次入栈', description: 'top 从 0 变成 1，20 放到 10 的上方，后进的元素在最前面。', counter: 'push(20)', output: 'stack top: 20', memory: [{ name: 'top', value: '1', type: 'index' }], stack: ['10', '20'], queue: [] },
            { line: 15, title: 'peek()：只看不取', description: 'peek 读取栈顶 20，但不会改变 top，数据仍然留在栈里。', counter: 'peek() → 20', output: 'stack unchanged', memory: [{ name: 'top', value: '1', type: 'unchanged' }], stack: ['10', '20'], queue: [] },
            { line: 16, title: 'pop()：弹出栈顶', description: 'pop 先读取 data[top]，再让 top 减 1，所以先取出来的是 20。', counter: 'pop() → 20', output: 'stack: [10]', memory: [{ name: 'return', value: '20', type: 'LIFO' }, { name: 'top', value: '0', type: 'decrement' }], stack: ['10'], queue: [] },
            { line: 16, title: '继续 pop()：取出 10', description: '现在栈顶是 10，再次 pop 后 top 回到 -1，栈重新为空。', counter: 'pop() → 10', output: 'stack: []', memory: [{ name: 'return', value: '10', type: 'LIFO' }, { name: 'top', value: '-1', type: 'empty' }], stack: [], queue: [] },
            { line: 19, title: 'enqueue(30)：进入队尾', description: '队列从尾部加入 30，元素会按照进入顺序等待。', counter: 'enqueue(30)', output: 'queue tail: 30', memory: [{ name: 'front', value: '0', type: 'head' }, { name: 'rear', value: '0', type: 'tail' }], stack: [], queue: ['30'] },
            { line: 20, title: 'enqueue(40)：排在 30 后面', description: '40 进入队尾，30 仍然是队首，所以 30 会先出去。', counter: 'enqueue(40)', output: 'queue: [30, 40]', memory: [{ name: 'front', value: '0', type: 'head' }, { name: 'rear', value: '1', type: 'tail' }], stack: [], queue: ['30', '40'] },
            { line: 21, title: 'dequeue()：取队首', description: 'dequeue 从队首取出 30，后进入的 40 继续等待。', counter: 'dequeue() → 30', output: 'queue: [40]', memory: [{ name: 'return', value: '30', type: 'FIFO' }, { name: 'front', value: '1', type: 'advance' }], stack: [], queue: ['40'] },
            { line: 21, title: '顺序总结', description: '栈是后进先出 LIFO，队列是先进先出 FIFO，区别就在于数据从哪一端进出。', counter: 'LIFO ≠ FIFO', output: 'stack: 10 → 20 → pop 20\nqueue: 30 → 40 → dequeue 30', memory: [{ name: '栈', value: '20 first', type: 'LIFO' }, { name: '队列', value: '30 first', type: 'FIFO' }], stack: ['10'], queue: ['40'] }
        ]
    },
    {
        tag: '12 · 链表', title: '链表如何连接数据？', description: '每个结点保存数据和下一个结点的地址，插入和删除只需要修改指针连接。', visual: 'LINKED LIST', visualType: 'list', keywords: ['struct Node', 'next', 'head', 'malloc'], code: ['struct Node *node = malloc(sizeof *node);', 'node->value = 20;', 'node->next = head;', 'head = node;', '', 'free(node);'], steps: [
            { line: 0, title: '创建新结点', description: 'malloc 在堆上申请空间，得到一个结点地址。', counter: 'malloc()', output: 'node = 0x2000', memory: [{ name: 'node', value: '0x2000', type: 'heap' }], list: ['head', '20'] },
            { line: 2, title: '连接旧头结点', description: 'node->next 指向原来的 head，链条被接起来。', counter: 'node->next = head', output: 'link created', memory: [{ name: 'next', value: '0x1000', type: 'pointer' }], list: ['head', '20', '10'] },
            { line: 3, title: '更新 head', description: '让 head 指向新结点，插入完成。', counter: 'head = node', output: '20 → 10', memory: [{ name: 'head', value: '0x2000', type: 'new head' }], list: ['head', '20', '10'] },
            { line: 5, title: '释放结点', description: '删除结点后释放内存，避免内存泄漏。', counter: 'free(node)', output: 'memory released', memory: [{ name: 'node', value: 'freed', type: 'heap' }], list: ['head', '10'] }
        ]
    }
];

const progressKey = 'cm_visual_completed_topics_v2';
let storedTopics = [];
try {
    const parsedTopics = JSON.parse(localStorage.getItem(progressKey) || '[]');
    storedTopics = Array.isArray(parsedTopics)
        ? parsedTopics.filter(index => Number.isInteger(index) && index >= 0 && index < visualTopics.length)
        : [];
} catch (error) {
    storedTopics = [];
}

const state = {
    topicIndex: 0,
    stepIndex: 0,
    playing: false,
    timer: null,
    speed: 1,
    completedTopics: [...new Set(storedTopics)]
};

const select = selector => document.querySelector(selector);

function saveProgress() {
    localStorage.setItem(progressKey, JSON.stringify(state.completedTopics));
}

function completeCurrentTopic() {
    if (state.completedTopics.includes(state.topicIndex)) return;
    state.completedTopics.push(state.topicIndex);
    state.completedTopics.sort((first, second) => first - second);
    saveProgress();
}

function renderTopics() {
    select('#topicList').innerHTML = visualTopics.map((topic, index) => {
        const isCompleted = state.completedTopics.includes(index);
        const isCurrent = index === state.topicIndex;
        const status = isCompleted ? '已探索' : (isCurrent ? '正在观察' : '待探索');

        const classes = [
            'topic-button',
            isCurrent ? 'active' : '',
            isCompleted ? 'done' : ''
        ].filter(Boolean).join(' ');

        return `
            <button class="${classes}" data-topic="${index}" type="button">
                <span class="topic-glow" aria-hidden="true"></span>
                <span class="topic-number">${String(index + 1).padStart(2, '0')}</span>
                <span class="topic-name">${topic.title}</span>
                <span class="topic-status">${status}</span>
            </button>
        `;
    }).join('');

    document.querySelectorAll('.topic-button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('is-clicking')) return;
            button.classList.add('is-clicking');
            stopPlaying();
            setTimeout(() => {
                state.topicIndex = Number(button.dataset.topic);
                state.stepIndex = 0;
                render();
            }, 260);
        });
    });
}

function highlightCode(code) {
    const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escapedCode
        .replace(/(&lt;.*?&gt;|".*?")/g, '<span class="syntax-string">$1</span>')
        .replace(/\b(int|char|return|if|else|for|struct|FILE)\b/g, '<span class="syntax-keyword">$1</span>')
        .replace(/\b(main|printf|fopen|fwrite|fclose|factorial|sizeof)\b/g, '<span class="syntax-function">$1</span>');
}

function renderCode(topic, step) {
    select('#codeLines').innerHTML = topic.code.map((line, index) => `
        <div class="code-line ${index === step.line ? 'active' : ''}">
            <span class="line-number">${String(index + 1).padStart(2, '0')}</span>
            <code>${highlightCode(line) || '&nbsp;'}</code>
        </div>
    `).join('');

    select('#stepLabel').textContent = `步骤 ${state.stepIndex + 1} / ${topic.steps.length}`;
    select('#previousButton').disabled = state.stepIndex === 0;
    select('#nextButton').disabled = state.stepIndex === topic.steps.length - 1;
}

/* =========================================================
   柱状图渲染 —— 柱子原地平滑升降
   柱子不移动，只做高度的自然增长/缩短
   ========================================================= */
function renderBars(topic, step) {
    const visualization = select('#visualization');
    let chart = visualization.querySelector('.bar-chart');

    if (!chart) {
        visualization.innerHTML = `<div class="visual-stage-title">${topic.visual}</div><div class="bar-chart"></div>`;
        chart = visualization.querySelector('.bar-chart');
    }

    const bars = step.bars;
    const existingBars = [...chart.querySelectorAll('.bar-item')];

    // 补充柱子（如果现有数量不足）
    while (existingBars.length < bars.length) {
        const item = document.createElement('div');
        item.className = 'bar-item';
        item.innerHTML = `<strong>0</strong><i style="--bar-height: 0px"></i><span>a[0]</span>`;
        chart.appendChild(item);
        existingBars.push(item);
    }
    // 移除多余柱子（如果有）
    while (existingBars.length > bars.length) {
        existingBars.pop().remove();
    }

    // 按位置更新每根柱子：高度平滑过渡、数值更新、高亮切换
    bars.forEach((value, index) => {
        const item = existingBars[index];
        const bar = item.querySelector('i');
        const strong = item.querySelector('strong');
        const label = item.querySelector('span');

        // 高度变化：CSS transition 自动补间
        bar.style.setProperty('--bar-height', `${value * 25}px`);

        // 数值标签
        if (strong.textContent !== String(value)) {
            strong.textContent = value;
        }
        label.textContent = `a[${index}]`;

        // 高亮状态
        item.classList.toggle('active', step.active.includes(index));
    });
}

function renderVisualization(topic, step) {
    const visualization = select('#visualization');

    if (topic.visualType === 'bars') {
        renderBars(topic, step);
        return;
    }

    if (topic.visualType === 'stack') {
        const stack = step.stack.map((value, index) =>
            `<div class="stack-item ${index === step.stack.length - 1 ? 'active' : ''}">${value}</div>`
        ).join('');

        const queue = step.queue.length
            ? step.queue.map(value => `<div class="stack-item active">${value}</div>`).join('')
            : '<div class="stack-item">空</div>';

        visualization.innerHTML = `
            <div class="visual-stage-title">${topic.visual}</div>
            <div class="stack-visual">
                <div>
                    <div class="stack-column">${stack || '<div class="stack-item">空</div>'}</div>
                    <div class="stack-caption">栈 · LIFO</div>
                </div>
                <div class="flow-arrow">→</div>
                <div>
                    <div class="stack-column">${queue}</div>
                    <div class="stack-caption">队列 · FIFO</div>
                </div>
            </div>`;
        return;
    }

    if (topic.visualType === 'list') {
        visualization.innerHTML = `
            <div class="visual-stage-title">${topic.visual}</div>
            <div class="flow-map">${step.list.map((item, index) =>
                `<div class="flow-node ${index === 0 ? 'round' : ''} ${index === state.stepIndex % step.list.length ? 'active' : ''}">${item}</div>${index < step.list.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`
            ).join('')}</div>`;
        return;
    }

    const map = topic.map || ['数据', '处理', '结果'];
    visualization.innerHTML = `
        <div class="visual-stage-title">${topic.visual}</div>
        <div class="flow-map">${map.map((item, index) =>
            `<div class="flow-node ${index === state.stepIndex % map.length ? 'active' : ''} ${index === 0 || index === map.length - 1 ? 'round' : ''}">${item}</div>${index < map.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`
        ).join('')}</div>`;

    if (!topic.map) {
        visualization.innerHTML = `
            <div class="visual-stage-title">${topic.visual}</div>
            <div class="memory-visual">${step.memory.map((item, index) =>
                `<div class="memory-cell ${index === state.stepIndex % step.memory.length ? 'active' : ''}">
                    <span>${item.name}</span><strong>${item.value}</strong><em>${item.type}</em>
                </div>`
            ).join('')}</div>`;
    }
}

function render() {
    const topic = visualTopics[state.topicIndex];
    const step = topic.steps[state.stepIndex];

    select('#topicTag').textContent = topic.tag;
    select('#topicTitle').textContent = topic.title;
    select('#topicDescription').textContent = topic.description;
    select('#visualLabel').textContent = topic.visual;
    select('#topicProgress').textContent = `${state.completedTopics.length} / ${visualTopics.length}`;
    select('#topicMeter').style.width = `${(state.completedTopics.length / visualTopics.length) * 100}%`;
    select('#programCounter').textContent = step.counter;
    select('#consoleOutput').textContent = step.output;
    select('#stepTitle').textContent = step.title;
    select('#stepDescription').textContent = step.description;
    select('#visualSignal').textContent = state.playing ? '● 执行中' : '● 已暂停';
    select('#keywords').innerHTML = topic.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('');
    select('#memorySnapshot').innerHTML = step.memory.map(item =>
        `<div class="memory-row"><span>${item.name}</span><strong>${item.value}</strong></div>`
    ).join('');

    renderTopics();
    renderCode(topic, step);
    renderVisualization(topic, step);
}

function nextStep() {
    const topic = visualTopics[state.topicIndex];
    if (state.stepIndex < topic.steps.length - 1) {
        state.stepIndex += 1;
    } else if (state.topicIndex < visualTopics.length - 1) {
        completeCurrentTopic();
        state.topicIndex += 1;
        state.stepIndex = 0;
    } else {
        completeCurrentTopic();
        stopPlaying();
    }
    render();
}

function stopPlaying() {
    state.playing = false;
    clearInterval(state.timer);
    state.timer = null;
    select('#playIcon').textContent = '▶';
    select('#playText').textContent = '播放过程';
}

function togglePlaying() {
    if (state.playing) {
        stopPlaying();
        render();
        return;
    }
    state.playing = true;
    select('#playIcon').textContent = 'Ⅱ';
    select('#playText').textContent = '暂停过程';
    render();
    state.timer = setInterval(nextStep, 2600 / state.speed);
}

document.addEventListener('DOMContentLoaded', () => {
    const starField = document.querySelector('#starField');
    if (starField) {
        for (let index = 0; index < 60; index += 1) {
            const star = document.createElement('span');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            starField.appendChild(star);
        }
    }

    select('#nextButton').addEventListener('click', nextStep);
    select('#previousButton').addEventListener('click', () => {
        if (state.stepIndex > 0) state.stepIndex -= 1;
        render();
    });
    select('#playButton').addEventListener('click', togglePlaying);

    select('#speedSelect').addEventListener('change', event => {
        state.speed = Number(event.target.value);
        if (state.playing) {
            clearInterval(state.timer);
            state.timer = setInterval(nextStep, 2600 / state.speed);
        }
    });

    select('#resetButton').addEventListener('click', () => {
        stopPlaying();
        state.topicIndex = 0;
        state.stepIndex = 0;
        render();
    });

    render();
});