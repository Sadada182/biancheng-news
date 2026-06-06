# 边城日报社 · 新闻存档查询系统

一个伪装成 90 年代报社内部系统的网页解谜游戏。第一关：**彭加木失踪案（1980年）**。

## 快速部署

### Vercel（推荐 — 免费）

1. 把整个项目文件夹拖到 [Vercel](https://vercel.com/new) 的部署页面
2. 或者用命令行：
   ```bash
   npm i -g vercel
   vercel
   ```
3. 部署完成后你会得到一个 `xxx.vercel.app` 域名

### GitHub Pages（免费）

1. 把项目推到一个 GitHub 仓库
2. Settings → Pages → Source 选 `main` 分支，根目录
3. 等几分钟即可访问 `https://你的用户名.github.io/仓库名/`

### 本地测试

用任意静态文件服务器即可：

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# 然后访问 http://localhost:8080
```

> ⚠️ 不要直接用浏览器打开 `index.html`（`file://` 协议）—— JavaScript 页面跳转可能受限制。

---

## 关卡流程（剧透 — 仅供网站维护者阅读）

### 第一关：彭加木失踪案

| 步骤 | 玩家需要做什么 | 线索藏在哪里 |
|------|---------------|-------------|
| 1 | 查看首页源码 | `index.html` 的 HTML 注释中有记者编号 `PJM-1980-0617` 和密码规则 |
| 2 | 搜索"彭加木 1980" | 发现失踪日期为 1980年6月17日 |
| 3 | 登录系统 | 编号: `PJM-1980-0617` / 密码: `19800617` |
| 4 | 点开报道 | 搜索结果页唯一可访问的报道 |
| 5 | 查看被遮挡文字 | `.redacted` 类的文字在 HTML 源码中可见（CSS 渲染为黑块） |
| 6 | 查看图片注释 | 图片的 HTML 注释中有胶片编号和底片手写字 |
| 7 | 查百度百科验证 | 报道页底部的真实外部链接 |
| 8 | 拼出终结码 | `19800617-4027-9035`（日期-纬度前四位-经度前四位） |
| 9 | 通关 | 解密页输入终结码 → 看到第二关提示 |

### 线索分布总览

| 线索 | 藏法 | 位置 |
|------|------|------|
| 记者编号 + 密码规则 | HTML 注释 | `index.html` L16-28 |
| `body::after` 备忘 | CSS 伪元素 `display:none` | `assets/style.css` 末尾 |
| 坐标 `40°27'N, 90°35'E` | `.redacted` 类黑块 | `case-pjm/report-198006.html` |
| 距离 `15` 公里 | `.redacted` 类黑块 | `case-pjm/report-198006.html` |
| 科考目的 `重水` | `.redacted` 类黑块 | `case-pjm/report-198006.html` |
| 胶片编号 + 手写字 | 图片的 HTML 注释 | `case-pjm/report-198006.html` L266-272 |
| 归档密码提示 | 鼠标悬停 tooltip | `case-pjm/index.html` 表格行 |
| 终结码组成规则 | 报道页底部 HTML 注释 | `case-pjm/report-198006.html` L308-325 |
| 第二关编号 1956-0815 | 通关页正文 | `case-pjm/clear.html` |

---

## 添加新关卡

1. 在根目录创建新文件夹（如 `case-ljz/`）
2. 复制 `case-pjm/` 的结构：
   - `index.html` → 搜索结果页
   - `report-YYYYMM.html` → 核心报道页
   - `verify.html` → 密码验证页
   - `clear.html` → 通关页（含下一关钩子）
3. 在 `clear.html` 中更新下一关的案卷编号
4. 在首页 `assets/auth.js` 中添加新关卡的登录校验逻辑

---

## 设计原则

- **所有线索必须可反向查验**：坐标、日期、字条内容都来自真实百度百科/维基百科
- **80% 还原真实案件**：核心事实不编造，只在包装层做游戏化
- **不血腥、不恐怖**：靠氛围和悬疑推动，不靠 jump scare
- **社区友好**：线索分散在不同层面（源码/CSS/外链），鼓励玩家协作分享

---

## 设置打赏赞助

通关页（`case-pjm/clear.html`）已内置打赏区，展示微信赞赏码和支付宝收款码。

### 放入你的收款码：

1. 打开微信/支付宝 → 收付款 → 收款码 → 保存图片
2. 将图片放到 `assets/` 目录下：
   - 微信：`assets/donate-wechat.png`
   - 支付宝：`assets/donate-alipay.png`
3. 图片尺寸建议 300×300 像素以上，格式支持 png/jpg
4. 刷新页面即可显示

如果未放置图片，打赏区会自动显示占位文字，不影响使用。

---

## 文件结构

```
├── index.html              # 报社公开首页
├── login.html              # 隐藏登录页
├── assets/
│   ├── style.css           # 全局样式 + body::after 隐藏备忘
│   ├── auth.js             # 登录校验逻辑
│   ├── donate-wechat.png   # 你的微信赞赏码（需自行放入）
│   └── donate-alipay.png   # 你的支付宝收款码（需自行放入）
├── case-pjm/               # 第一关：彭加木失踪案
│   ├── index.html          # 检索结果页
│   ├── report-198006.html  # 核心报道（旧报纸风格）
│   ├── verify.html         # 终结码验证
│   ├── clear.html          # 通关 + 打赏区 + 第二关预告
│   └── payment.html        # 伪缴费页（氛围障眼法）
└── README.md
```
