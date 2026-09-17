// Node ESM loader hook:
//  - lets verification scripts import modules straight from the local servers
//  - patches the Emscripten glue (clang.js / lld.js) so it takes its *browser*
//    branch in Node (its Node branch calls createRequire/fileURLToPath with an
//    http: URL, and reads clang.wasm through fs instead of fetch)
const STUB = new URL('./require-stub.cjs', import.meta.url).href;

const WEB_ENV_SHIM = 'globalThis.readAsync=async(f,b=true)=>{const r=await fetch(f);return b?r.arrayBuffer():r.text()};';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('http://') || specifier.startsWith('https://')) {
    return { url: specifier, shortCircuit: true, format: 'module' };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    let source = await response.text();
    if (source.includes('createRequire(import.meta.url)')) {
      source = source
        .replace('var _scriptName = import.meta.url;', 'var _scriptName = import.meta.url;' + WEB_ENV_SHIM)
        .replace('var ENVIRONMENT_IS_WEB=typeof window=="object";', 'var ENVIRONMENT_IS_WEB=true;')
        .replace('var ENVIRONMENT_IS_WORKER=typeof WorkerGlobalScope!="undefined";', 'var ENVIRONMENT_IS_WORKER=false;')
        .replace('var ENVIRONMENT_IS_NODE=typeof process=="object"', 'var ENVIRONMENT_IS_NODE=false&&typeof process=="object"')
        // Node's createRequire only accepts file: URLs
        .replace(/createRequire\(\s*import\.meta\.url\s*\)/g, `createRequire(${JSON.stringify(STUB)})`)
        // http(s) is not a file: URL; the data: guard would skip it anyway
        .replace(/if\(!import\.meta\.url\.startsWith\("data:"\)\)\{scriptDirectory=nodePath\.dirname\(require\("url"\)\.fileURLToPath\(import\.meta\.url\)\)\+"\/"\}/g, '');
    }
    return { format: 'module', source, shortCircuit: true };
  }
  return nextLoad(url, context);
}
