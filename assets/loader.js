/**
 * 边城日报社 · 系统加载模块
 * 模拟90年代老旧系统启动时的加载画面
 * 最后修改：2003-04-12
 */
(function() {
  'use strict';

  // 避免在 iframe 中重复加载
  if (window.top !== window.self) return;
  // 如果已经有加载画面则跳过
  if (document.getElementById('border-loader')) return;

  // ═══════════ 创建加载画面 ═══════════
  var overlay = document.createElement('div');
  overlay.id = 'border-loader';
  overlay.innerHTML =
    '<div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:#c8c0b4;display:flex;align-items:center;justify-content:center;font-family:SimSun,宋体,serif;">' +
      '<div style="text-align:center;max-width:400px;">' +
        '<div style="font-size:28px;font-weight:bold;color:#3a2010;font-family:SimHei,黑体,sans-serif;letter-spacing:3px;margin-bottom:6px;">边 城 日 报 社</div>' +
        '<div style="font-size:11px;color:#6a5a3a;letter-spacing:1px;margin-bottom:18px;">新闻存档查询系统 v1.2</div>' +
        '<div style="width:280px;height:4px;background:#b0a090;margin:0 auto 10px;border:1px inset #a09888;">' +
          '<div id="loader-bar" style="width:0%;height:100%;background:#5a4a2a;transition:width 0.3s;"></div>' +
        '</div>' +
        '<div id="loader-status" style="font-size:11px;color:#5a5a5a;min-height:18px;">正在连接服务器...</div>' +
        '<div style="font-size:9px;color:#b0a090;margin-top:12px;">建议分辨率 800×600 · 兼容 IE 5.5+</div>' +
      '</div>' +
    '</div>';

  document.documentElement.appendChild(overlay);

  var bar = document.getElementById('loader-bar');
  var status = document.getElementById('loader-status');

  // ═══════════ 模拟加载步骤 ═══════════
  var steps = [
    { pct: 15, delay: 400,  text: '正在连接边城日报社服务器...' },
    { pct: 35, delay: 500,  text: '验证网络连接...' },
    { pct: 55, delay: 600,  text: '加载新闻存档数据...' },
    { pct: 75, delay: 400,  text: '检索历史案卷索引...' },
    { pct: 90, delay: 500,  text: '渲染页面模板...' },
    { pct: 100,delay: 300,  text: '加载完成。' }
  ];

  var totalDelay = 0;
  steps.forEach(function(step) {
    totalDelay += step.delay;
    setTimeout(function() {
      if (bar) bar.style.width = step.pct + '%';
      if (status) status.textContent = step.text;
    }, totalDelay);
  });

  // ═══════════ 加载完成后淡出 ═══════════
  setTimeout(function() {
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.opacity = '0';
    setTimeout(function() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 500);
  }, totalDelay + 400);

})();
