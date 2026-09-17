// Verification harness: compiles real C11 through the same browsercc build the
// OJ page uses, so every problem's reference solution + expected outputs are
// checked against the actual judge runtime.
/* 用 localhost:3000 而不是读 .env 里的 PORT：验证工具默认按 README 的启动方式
   （start.bat → 3000）运行，改过端口时把下面的 3000 换成实际端口。
   clang.wasm / lld.wasm 是相对模块 URL 定位的，所以必须由
   oj-scratch-server.cjs（4321，把 .cache/vendor 里的编译器文件用 /assets/* 暴露出来）
   提供，不能直接从网站服务器加载。 */
const SCRATCH = 'http://localhost:4321/';
const PROJECT = 'http://localhost:3000/vendor/npm/';

let compilerPromise;
let wasiPromise;

export function loadCompiler() {
  if (!compilerPromise) compilerPromise = import(SCRATCH + 'assets/index.js');
  return compilerPromise;
}

export function loadWasi() {
  if (!wasiPromise) wasiPromise = import(PROJECT + '@bjorn3/browser_wasi_shim@0.4.2/dist/index.js');
  return wasiPromise;
}

export async function runC(source, inputs) {
  const compiler = await loadCompiler();
  const wasiMod = await loadWasi();
  const compiled = await compiler.compile({ source, fileName: 'main.c', flags: [] });
  if (!compiled.module) return { ok: false, error: compiled.compileOutput || 'compile failed' };
  const results = [];
  for (const input of inputs) {
    let output = '';
    const stdout = new wasiMod.ConsoleStdout(d => { output += new TextDecoder().decode(d); });
    const stderr = new wasiMod.ConsoleStdout(d => { output += new TextDecoder().decode(d); });
    const stdin = new TextEncoder().encode(input === '无' ? '' : input + '\n');
    const wasi = new wasiMod.WASI([], [], [new wasiMod.OpenFile(new wasiMod.File(stdin)), stdout, stderr]);
    const instance = await WebAssembly.instantiate(compiled.module, { wasi_snapshot_preview1: wasi.wasiImport });
    let crashed = null;
    try {
      wasi.start(instance);
    } catch (error) {
      if (error?.name !== 'WASIProcExit' || error?.code !== 0) crashed = String(error);
    }
    results.push(crashed ? { input, error: crashed } : { input, output });
  }
  return { ok: true, results };
}

export const normalizeOutput = output => output.replace(/\r\n/g, '\n').trim();
