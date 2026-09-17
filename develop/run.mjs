/* ============================================================
   验证脚本入口
   ------------------------------------------------------------
   Node 默认不能 import http:// 上的模块（browsercc 的 clang.js 需要这样加载），
   所以这里先注册 http-loader.mjs 钩子，再运行目标脚本。

   用法（在 develop 目录下）：
       node run.mjs verify-all.mjs          # 全部 135 题
       node run.mjs verify-all.mjs 1,2,3    # 只验证指定题号
   ============================================================ */
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { register } from 'node:module';

const target = process.argv[2];
if (!target) {
  console.error('用法：node run.mjs <脚本名> [参数…]');
  process.exit(1);
}

register('./http-loader.mjs', import.meta.url);
await import(pathToFileURL(path.resolve(target)).href);
