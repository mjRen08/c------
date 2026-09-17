# develop —— OJ 题库与验证工具（不属于网站运行时）

这个目录是**开发 / 维护用**的，网站本身不加载这里的任何文件。
打包发给别人时可以删掉（和 `.cache`、`.git` 一样）。

## 目录结构

```
develop/
├── README.md                 本说明
├── PROBLEM-SPEC.md           题库编写规范（字段、难度、测试点、转义要求）
├── data/
│   ├── batch-a.js            45 题（C语言基础 / 循环分支 / 函数）
│   ├── batch-b.js            45 题（指针 / 数组字符串 / 结构体）
│   └── batch-c.js            45 题（数据结构算法 / 文件IO / 项目实战）
├── build-data.mjs            汇总三个 batch → assets/js/oj-data.js
├── catalog.mjs               课程 / 节次名对照表（与 list.html、lesson-page.js 一致）
├── check-structure.mjs       结构校验（不编译，秒级）
├── oj-runner.mjs             在 Node 里真编译真运行 C11（复用网站同一套 browsercc）
├── verify-all.mjs            全量验证 135 份参考解 + 135 份骨架 + 540 个测试点
├── http-loader.mjs           Node ESM 钩子：允许 import 本地服务器上的模块
├── run.mjs                   入口：注册上面的钩子后再跑目标脚本
├── require-stub.cjs          http-loader 用到的 require 占位文件
├── oj-scratch-server.cjs     临时静态服务器（4321），暴露 .cache 里的编译器文件
└── browser-check.mjs         用 Chrome DevTools Protocol 做真实浏览器交互验证
```

## 常用命令

```powershell
# 0. 先让网站跑起来（另一个窗口）—— 编译器文件需要有缓存
cd c------ ; node server.js            # http://localhost:3000

# 1. 结构校验（秒级，改完题库先跑这个）
cd develop ; node check-structure.mjs

# 2. 全量编译 + 测试点验证（约 5 分钟，需要先在另一个窗口起 4321）
node oj-scratch-server.cjs             # 后台保持运行
node run.mjs verify-all.mjs            # 结果写入 verify-report.json

# 3. 真实浏览器交互验证（悬停按钮 / 折叠展开 / 「练」跳转 / 真判题）
node browser-check.mjs                 # 截图在 develop/shots/，日志在 browser-check-log.txt

# 4. 改完题库后重新生成网站加载的数据文件
node build-data.mjs                    # 覆盖 assets/js/oj-data.js
```

> 用到的端口：网站 3000、验证用临时服务器 4321、Chrome 调试 9333。
> 网站端口改过的话，同步改 `oj-runner.mjs` 和 `browser-check.mjs` 里的 3000。
> Chrome 不在默认位置时，设置环境变量 `CHROME_PATH` 指向 chrome.exe。

## 改题库的正确流程

1. 改 `data/batch-*.js`（新增批次要在 `build-data.mjs` 的 `BATCHES` 里登记）
2. `node check-structure.mjs` —— 结构必须 0 错误
3. `node run.mjs verify-all.mjs` —— 编译与 540 个测试点必须全绿
4. `node build-data.mjs` —— 重新生成 `assets/js/oj-data.js`

**不要直接手改 `assets/js/oj-data.js`**：它是生成物，下次汇总会被覆盖。
