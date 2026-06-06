/**
 * 边城日报社 · 彩蛋系统 v1.0
 * "这里什么都没有，但是有猫猫。"
 * 共12个彩蛋散落在网站各处。
 */
(function() {
  'use strict';

  // 已找到的彩蛋
  var found = [];
  try {
    var saved = localStorage.getItem('bordernews-cat-eggs');
    if (saved) found = JSON.parse(saved);
  } catch(e) {}

  // 保存进度
  function saveFound() {
    try { localStorage.setItem('bordernews-cat-eggs', JSON.stringify(found)); } catch(e) {}
  }

  // 创建弹窗
  function showEgg(n, catSrc) {
    // 去重
    if (found.indexOf(n) >= 0) return;
    found.push(n);
    saveFound();

    // 遮罩
    var overlay = document.createElement('div');
    overlay.className = 'egg-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;font-family:SimSun,宋体,serif;';

    var box = document.createElement('div');
    box.style.cssText = 'background:#faf6ed;border:3px double #8a7a5a;padding:24px 28px;text-align:center;max-width:380px;box-shadow:4px 4px 16px rgba(0,0,0,0.4);position:relative;';

    var title = document.createElement('div');
    title.style.cssText = 'font-size:11px;color:#8a7a6a;letter-spacing:1px;margin-bottom:6px;';
    title.textContent = '边城日报社 · 档案室角落';

    var countBadge = document.createElement('div');
    countBadge.style.cssText = 'font-size:10px;color:#b0a090;margin-bottom:10px;';
    countBadge.textContent = '彩蛋 ' + found.length + ' / 12';

    var imgContainer = document.createElement('div');
    imgContainer.style.cssText = 'width:240px;height:240px;margin:0 auto 12px;border:2px solid #b0a080;background:#ece4d4;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;';

    var img = document.createElement('img');
    // 从网站根目录加载猫猫图片
    img.src = catSrc || '/assets/cat-' + n + '.png';
    img.alt = '猫猫 #' + n;
    img.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;';
    img.onerror = function() {
      // 如果图片不存在，显示占位猫猫
      img.style.display = 'none';
      var placeholder = document.createElement('div');
      placeholder.style.cssText = 'font-size:80px;text-align:center;';
      placeholder.textContent = '🐱';
      imgContainer.appendChild(placeholder);
    };

    imgContainer.appendChild(img);

    var text = document.createElement('p');
    text.style.cssText = 'font-size:15px;color:#3a2010;font-weight:bold;margin:8px 0;font-family:KaiTi,楷体,serif;letter-spacing:1px;';
    text.textContent = '这里什么都没有，但是有猫猫。';

    var subtext = document.createElement('p');
    subtext.style.cssText = 'font-size:11px;color:#7a6a5a;margin-bottom:12px;';
    subtext.textContent = '你在档案深处发现了一只猫。';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '继 续 探 索';
    closeBtn.style.cssText = 'padding:5px 20px;font-size:13px;font-family:SimSun,宋体,serif;border:2px outset #c0b8a8;background:#d8ccb4;color:#3a2010;cursor:pointer;letter-spacing:2px;margin-right:6px;';
    closeBtn.onclick = function() { document.body.removeChild(overlay); };

    var wallBtn = document.createElement('button');
    wallBtn.textContent = '去 猫 猫 墙';
    wallBtn.style.cssText = 'padding:5px 20px;font-size:13px;font-family:SimSun,宋体,serif;border:2px outset #c0b8a8;background:#e8dcc8;color:#3a2010;cursor:pointer;letter-spacing:2px;';
    wallBtn.onclick = function() { window.location.href = 'cat-wall.html'; };

    box.appendChild(title);
    box.appendChild(countBadge);
    box.appendChild(imgContainer);
    box.appendChild(text);
    box.appendChild(subtext);
    box.appendChild(closeBtn);
    box.appendChild(wallBtn);
    overlay.appendChild(box);

    // 点击遮罩关闭
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
  }

  // ═══════════ 暴露API ═══════════
  window.catEgg = {
    show: showEgg,
    found: function() { return found.length; },
    total: 12
  };

})();
