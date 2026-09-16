/* ============================================================
   Phosphor 图标样式加载器
   ------------------------------------------------------------
   原来 quiz.html 直接引 https://unpkg.com/@phosphor-icons/web，
   既跨域、又依赖外网，与"统一端口"的思路冲突。
   现在优先走本站同源代理 /vendor/npm/...（server.js 会从国内 npm 镜像
   取回并缓存到 .cache/vendor），代理不可用时（例如把站点放到别的静态
   服务器）自动回退到 CDN。

   页面里只用到基础字重（class="ph ph-xxx"），所以只加载 regular，
   不再像原来那样把 thin/light/bold/fill/duotone 六个字重一起拉下来。
   ============================================================ */
(function () {
    'use strict';
    var WEIGHT = 'regular';
    var PKG = '@phosphor-icons/web@2.1.2/src/';
    var LOCAL = '/vendor/npm/' + PKG + WEIGHT + '/style.css';
    var CDN = 'https://cdn.jsdelivr.net/npm/' + PKG + WEIGHT + '/style.css';

    function addLink(href, onFail) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        if (onFail) link.addEventListener('error', onFail);
        document.head.appendChild(link);
    }

    addLink(LOCAL, function () { addLink(CDN); });
})();
