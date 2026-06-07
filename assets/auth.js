/**
 * 边城日报社 · 新闻存档查询系统 v1.2
 * 身份验证模块
 * 最后修改：2003-04-12
 */

(function() {
  'use strict';

  // --- 系统时间 ---
  function updateSysTime() {
    var el = document.getElementById('sys-time');
    if (!el) return;
    var now = new Date();
    var yyyy = now.getFullYear();
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var dd = String(now.getDate()).padStart(2, '0');
    var hh = String(now.getHours()).padStart(2, '0');
    var min = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    el.textContent = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
  }
  updateSysTime();
  setInterval(updateSysTime, 1000);

  // --- 登录逻辑 ---
  window.doLogin = function() {
    var reporterId = document.getElementById('reporter-id').value.trim();
    var password = document.getElementById('query-password').value.trim();
    var errorEl = document.getElementById('login-error');

    // 清除之前的错误
    if (errorEl) errorEl.textContent = '';

    // 空值检查
    if (!reporterId || !password) {
      if (errorEl) errorEl.textContent = '※ 请输入记者编号和查询密码。';
      return;
    }

    // 验证记者编号（支持多关卡 · 线索在百度百科各自事件词条中）
    var accounts = {
      'PJM-1980-0617': { pw: '19800617', to: 'case-pjm/index.html' },
      'LJZ-1956-0815': { pw: '19560815', to: 'case-ljz/index.html' },
      'BUS-1995-1114': { pw: '19951114', to: 'case-375/index.html' }
    };
    var acc = accounts[reporterId.toUpperCase()];

    if (!acc) {
      if (errorEl) errorEl.textContent = '※ 记者编号不匹配。凭证与记者档案关联，格式沿用旧制。';
      return;
    }
    if (password !== acc.pw) {
      if (errorEl) errorEl.textContent = '※ 查询密码不匹配。格式沿用旧制，请自行推导。';
      return;
    }

    // 登录成功
    if (errorEl) {
      errorEl.style.color = '#2a6a2a';
      errorEl.textContent = '身份验证通过，正在进入存档系统……';
    }
    setTimeout(function() { window.location.href = acc.to; }, 800);
  };

  // --- 清除表单 ---
  window.clearForm = function() {
    var rid = document.getElementById('reporter-id');
    var pwd = document.getElementById('query-password');
    var err = document.getElementById('login-error');
    if (rid) rid.value = '';
    if (pwd) pwd.value = '';
    if (err) {
      err.textContent = '';
      err.style.color = '#a03030';
    }
  };

  // --- 回车键登录 ---
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.doLogin();
    }
  });

})();
