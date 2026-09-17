/* 同步更新两个 README：
     README-UTF8.txt  UTF-8（带 BOM），给 macOS / Linux / 英文系统
     README.txt       GBK，给中文 Windows 记事本
   内容一致，用同一个脚本改两份，避免只改一份导致两份说明不一致。
   改动点：
     1. 「打包分发」一节把 develop 目录也列为不需要打包的内容
     2. 常见问题补充「想改 OJ 题库」的说明
   用法：node update-readme.mjs
*/
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(import.meta.dirname, '..');
const TARGETS = [
  { file: 'README-UTF8.txt', encoding: 'utf8', bom: '\uFEFF' },
  { file: 'README.txt', encoding: 'gbk', bom: '' }
];

const EDITS = [
  {
    find: '  有两样东西不要打包进去：\n',
    replace: '  有三样东西不要打包进去：\n',
    packing: true
  },
  {
    find: '    .git       版本库（含全部提交历史），交作业用不上。\n',
    replace: '    .git       版本库（含全部提交历史），交作业用不上。\n' +
      '    develop    OJ 题库维护工具（开发脚本 + 题目源数据，约 300 KB）。\n' +
      '               网站运行不依赖它，删掉不影响任何功能。\n',
    packing: true
  },
  {
    find: "$src = (Get-ChildItem '.\\c------' -Force | Where-Object { $_.Name -notin @('.cache','.git','.env') }).FullName",
    replace: "$src = (Get-ChildItem '.\\c------' -Force | Where-Object { $_.Name -notin @('.cache','.git','.env','develop') }).FullName",
    packing: true
  },
  {
    find: '  tar -a -c -f CodeMaster.zip --exclude ".cache" --exclude ".git" --exclude ".env" -C ".\\c------" .',
    replace: '  tar -a -c -f CodeMaster.zip --exclude ".cache" --exclude ".git" --exclude ".env" --exclude "develop" -C ".\\c------" .',
    packing: true
  },
  {
    find: '  - 想清空编译器缓存重新下载\n      -> 删除项目下的 .cache 目录。\n',
    replace: '  - 想清空编译器缓存重新下载\n      -> 删除项目下的 .cache 目录。\n\n' +
      '  - 想改 OJ 题库（题目、测试点、参考答案）\n' +
      '      -> 题目源数据在 develop/data/batch-*.js。改完后在 develop 目录下依次执行\n' +
      '         check-structure.mjs、run.mjs verify-all.mjs、build-data.mjs，\n' +
      '         由 build-data.mjs 重新生成 assets/js/oj-data.js（网站加载的就是它）。\n' +
      '         细节见 develop/README.md；平时使用网站不需要碰这个目录。\n'
  }
];

const decode = (buffer, encoding) => encoding === 'gbk'
  ? new TextDecoder('gbk').decode(buffer)
  : buffer.toString('utf8');

/* Node 没有 GBK 编码器（Buffer.transcode 不在标准发行版里），
   所以 GBK 版本先写出 UTF-8 中间文件，再由 update-readme.ps1 转成 GBK 覆盖回去。 */

for (const target of TARGETS) {
  const full = path.join(ROOT, target.file);
  if (!fs.existsSync(full)) { console.log('跳过（不存在）', target.file); continue; }
  const buffer = fs.readFileSync(full);
  let text = decode(buffer, target.encoding);
  if (text.startsWith('\uFEFF')) text = text.slice(1);
  const crlf = text.includes('\r\n');
  if (crlf) text = text.replace(/\r\n/g, '\n');

  let changed = 0;
  for (const edit of EDITS) {
    /* 两份 README 内容并不完全相同：README.txt（GBK，给中文 Windows）没有
       「打包发给别人」那一节，所以与打包相关的改动只在 UTF-8 版上做。 */
    if (edit.packing && target.encoding === 'gbk') continue;
    if (!text.includes(edit.find)) {
      if (!edit.optional) console.log(`  ! ${target.file} 未匹配：${edit.find.split('\n')[0].trim().slice(0, 36)}`);
      continue;
    }
    text = text.replace(edit.find, edit.replace);
    changed += 1;
  }
  if (crlf) text = text.replace(/\n/g, '\r\n');

  let out;
  if (target.encoding === 'gbk') {
    /* GBK 交给 PowerShell 处理（见 update-readme.ps1），这里先落一个 UTF-8 中间文件 */
    const temp = path.join(path.dirname(full), 'README.txt.utf8.tmp');
    fs.writeFileSync(temp, text, 'utf8');
    console.log(`${target.file}: 替换 ${changed}/${EDITS.length} 处 -> 已写中间文件 README.txt.utf8.tmp（接着运行 update-readme.ps1 转成 GBK）`);
    continue;
  }
  out = Buffer.from(text, 'utf8');
  if (target.bom) out = Buffer.concat([Buffer.from(target.bom, 'utf8'), out]);

  fs.writeFileSync(full, out);
  console.log(`${target.file}: 替换 ${changed}/${EDITS.length} 处，${out.length} 字节（${target.encoding}${target.bom ? ' + BOM' : ''}，${crlf ? 'CRLF' : 'LF'}）`);
}
