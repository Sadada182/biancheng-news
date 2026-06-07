/**
 * 边城日报社 · 公告与规则系统
 * 首次访问弹出公告，违反规则可被踢出5分钟
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'bordernews-rules-accepted';
  var BAN_KEY = 'bordernews-banned-until';

  // 检查是否被踢出
  var bannedUntil = null;
  try { bannedUntil = localStorage.getItem(BAN_KEY); } catch(e) {}

  if (bannedUntil) {
    var now = Date.now();
    if (now < parseInt(bannedUntil)) {
      // 还在封禁期
      showBanScreen(parseInt(bannedUntil));
      return;
    } else {
      // 封禁已过期
      try { localStorage.removeItem(BAN_KEY); } catch(e) {}
    }
  }

  // 检查是否已读过公告
  var accepted = false;
  try { accepted = localStorage.getItem(STORAGE_KEY) === '1'; } catch(e) {}

  if (!accepted) {
    // 等 body 和 loader 动画完成后再弹窗
    if (document.body) {
      setTimeout(function() { showAnnouncement(); }, 3000);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() { showAnnouncement(); }, 3000);
      });
    }
  }

  function showAnnouncement() {
    var overlay = document.createElement('div');
    overlay.id = 'rules-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:100000;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;font-family:SimSun,宋体,serif;';

    overlay.innerHTML =
      '<div style="background:#faf6ed;border:3px double #8a7a5a;max-width:520px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:4px 4px 20px rgba(0,0,0,0.5);">' +
        '<div style="background:#3a2010;color:#d8c8b0;padding:12px 16px;font-size:16px;font-weight:bold;font-family:SimHei,黑体,sans-serif;letter-spacing:2px;text-align:center;">' +
          '📋 边城日报社 · 访客须知' +
        '</div>' +
        '<div style="padding:16px 20px;font-size:13px;line-height:2;color:#3a2010;">' +

          '<p style="margin:0 0 10px;font-size:12px;color:#6a5a5a;">' +
            '欢迎来到边城日报社。本站是一个沉浸式网页解谜游戏，所有内容均为虚构。在您开始探索之前，请阅读以下规则：' +
          '</p>' +

          '<div style="border-left:3px solid #5a3a10;padding-left:10px;margin:10px 0;">' +
            '<p style="margin:4px 0;"><strong>一、探索规则</strong></p>' +
            '<p style="margin:2px 0;font-size:12px;">· 所有线索均可在页面内容、源码及互联网公开资料中找到。请勿使用黑客工具或暴力破解。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 欢迎在评论区讨论，但<strong>请勿直接公开答案或密码</strong>——给别人留下自己探索的乐趣。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 鼓励团队协作。一个人找不到的线索，或许别人能发现。</p>' +
          '</div>' +

          '<div style="border-left:3px solid #8a2010;padding-left:10px;margin:10px 0;">' +
            '<p style="margin:4px 0;"><strong>二、禁止行为</strong></p>' +
            '<p style="margin:2px 0;font-size:12px;">· 禁止在评论区发布广告、色情、暴力或违法内容。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 禁止恶意刷屏或发布大量垃圾信息。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 禁止冒充报社工作人员或散布虚假信息误导其他玩家。</p>' +
            '<p style="margin:2px 0;font-size:12px;color:#a03030;"><strong>违反以上规则将被临时踢出网站 5 分钟。</strong></p>' +
          '</div>' +

          '<div style="border-left:3px solid #3a5a3a;padding-left:10px;margin:10px 0;">' +
            '<p style="margin:4px 0;"><strong>三、存档与进度</strong></p>' +
            '<p style="margin:2px 0;font-size:12px;">· 报道解锁状态和彩蛋收集进度保存在<strong>本机浏览器</strong>中。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 换电脑、换浏览器或清除缓存后进度会丢失。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· <strong>建议定期备份：</strong>登录后在检索页底部点击「<strong>导出进度</strong>」保存文件，需要恢复时点击「<strong>导入进度</strong>」即可。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 若忘记密码，从备份文件中可查看已解锁的报道编号。</p>' +
          '</div>' +

          '<div style="border-left:3px solid #5a3a5a;padding-left:10px;margin:10px 0;">' +
            '<p style="margin:4px 0;"><strong>四、其他说明</strong></p>' +
            '<p style="margin:2px 0;font-size:12px;">· 本站为纯静态网站，无需注册、不收集个人信息。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 所有打赏均为自愿，不影响任何游戏内容。</p>' +
            '<p style="margin:2px 0;font-size:12px;">· 网站会持续更新新案件。欢迎收藏本站。</p>' +
          '</div>' +

          '<div style="text-align:center;margin-top:16px;">' +
            '<button onclick="acceptRules()" style="padding:8px 32px;font-size:14px;font-family:SimSun,宋体,serif;border:2px outset #c0b8a8;background:#3a2010;color:#d8c8b0;cursor:pointer;letter-spacing:3px;font-weight:bold;">我已阅读，开始探索</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var target = document.body || document.documentElement;
    target.appendChild(overlay);
    if (document.body) document.body.style.overflow = 'hidden';
  }

  window.acceptRules = function() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch(e) {}
    var overlay = document.getElementById('rules-overlay');
    if (overlay) overlay.remove();
    if (document.body) document.body.style.overflow = '';
  };

  function showBanScreen(until) {
    // 替换整个页面为踢出画面
    var remaining = Math.ceil((until - Date.now()) / 1000 / 60);
    document.body.innerHTML =
      '<div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:100001;background:#1a0a00;display:flex;align-items:center;justify-content:center;font-family:SimSun,宋体,serif;color:#c8b8a0;">' +
        '<div style="text-align:center;max-width:400px;">' +
          '<div style="font-size:60px;margin-bottom:12px;">🚫</div>' +
          '<h2 style="font-size:20px;color:#a03030;font-family:SimHei,黑体,sans-serif;letter-spacing:3px;margin:0 0 10px;">访 问 被 暂 停</h2>' +
          '<p style="font-size:13px;line-height:2;color:#8a7a6a;">' +
            '您因违反边城日报社访客规则，已被暂时踢出网站。<br>' +
            '剩余封禁时间：<strong style="color:#d8c8b0;">约 ' + remaining + ' 分钟</strong><br>' +
            '请在封禁结束后刷新页面。' +
          '</p>' +
          '<p style="font-size:11px;color:#6a5a5a;margin-top:16px;">' +
            '如有疑问，请重新阅读访客须知中的规则说明。<br>' +
            '边城日报社保留对本网站的所有管理权利。' +
          '</p>' +
        '</div>' +
      '</div>';
    document.body.style.overflow = 'hidden';

    // 封禁到期后自动刷新
    setTimeout(function() {
      try { localStorage.removeItem(BAN_KEY); } catch(e) {}
      location.reload();
    }, until - Date.now() + 1000);
  }

  // 暴露踢出函数
  window.banUser = function() {
    var until = Date.now() + 5 * 60 * 1000; // 5分钟
    try { localStorage.setItem(BAN_KEY, String(until)); } catch(e) {}
    showBanScreen(until);
  };

})();
