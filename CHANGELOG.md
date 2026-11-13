# 0.6.1 — 2026-11-13

- 公众号 HTML 导出支持独立保存目录、日期命名与自定义格式，同名自动编号，保留原附件目录默认行为。
- 修复公众号“另存为模板”在沙箱中点击无响应，改为简洁的行内名称输入与保存操作。
- 公众号模板和配色支持在“已移除”中确认后彻底删除，删空后仍可新建。
- 两种模板编辑器统一保存成功后关闭、失败保留输入；复制时自动处理长名称与重名。
- 图片模板删除确认绑定列表版本，避免多窗口更新后继续执行过期删除；中文输入法选字不再误触保存。
- 补齐公众号空列表引导并统一“已移除”分组样式。

# 0.6.0 — 2026-11-13

- 新增公众号排版：三款模板、临时原稿、手机宽度预览、标题层级、局部字色、复制富文本与导出 HTML。
- 新增公众号模板与配色管理，支持复制、实时编辑、排序及移除恢复；保存样式不包含文章正文或图片。
- 图片模板编辑统一为演示预览与设置双栏；独立设置窗口编辑后恢复原窗口尺寸与位置。
- 公众号功能沿用现有会员与试用权益，保留原到期时间和早鸟时间。
- 发布检查覆盖公众号模块的 DOM、HTML 清洗、样式与模型测试，修复漏检规则及无浏览器环境下的模块加载。

# 0.5.2 — 2026-11-11

- 首次字体图库下载改为分段下载，显示实际已保存进度，支持暂停、关闭窗口后续传及有限重试。
- 为长时间无响应的请求增加 90 秒等待上限，区分网络、资源校验和磁盘写入失败，保留可恢复的下载缓存。
- 继续校验完整 ZIP 及每个资源的 SHA256；全部安装成功才写就绪标记，随后清空临时下载缓存。
- 仅从原 GitHub 发行地址下载静态资源，不新增镜像或上传笔记；价格、试用、授权及离线使用方式不变。

# 0.5.1 — 2026-11-11

- 修复官方审核发现的静态样式与原生 DOM 创建问题，保持独立排版窗口正常运行。
- 替换已弃用的光标定位接口；旧环境保留点击产生的原生选区。
- 本地与 CI 发布检查增加官方规则差异防护和四项负例回归，避免同类问题漏检。
- 会员、试用和早鸟日期不变。

# 0.5.0 — 2026-11-11

- 早鸟优惠期由 30 天调整为 14 天，起点仍为北京时间 2026/11/7 19:33:19，截止时间调整为 2026/11/21 19:33:19（精确到毫秒为 .070）；截止时起由 ¥19.9 恢复为 ¥39.9。同步授权页、购买说明及宣传资料；早鸟结束后新开通试用改为 24 小时，之前新开通为 72 小时；已开始试用及已购权益不变。历史版本记录中的期限由本次调整取代。

- 新增预览内文字框拖动、缩放、直接编辑，正文图片移动、等比缩放、对齐和复位，优化分页与长图排版。
- 调整纸感强度控制、照片署名对比度，保留文字框与模板配置兼容。
- 加固授权状态及试用记录签名，图片写入前再次检查权益；兼容原永久授权及旧试用，保留离线能力。
- 源码许可更新为 1.1，明确付费权益边界和正常维护、安全研究例外，不追溯缩减既有权利。

# 0.4.3

- 移除上传图片按钮的下划线颜色属性，消除官方扫描报告的旧版 Obsidian CSS 兼容性警告。
- 包含 0.4.2 的统一模板管理及全部修复，会员权益和早鸟日期不变。

# Changelog

## 0.4.2 — 2026-11-08

- Unify built-in layouts and saved styles into one template picker. Save layouts with photos and crop positions without copying note content.
- Add template management for copying, editing, reordering, removing, restoring, and confirmed permanent deletion. Preserve existing styles and temporary export adjustments.
- Refine gallery browsing, paper-and-ink choices, dropdowns, and footer-cat controls; fix bundled artwork IDs and cat preview images.
- Use window-specific documents and cross-window element checks for export, review, and bookshelf interactions.
- Update development lint and Obsidian API dependencies and patch the development-only minimatch dependency; preserve membership and early-bird dates.

## 0.4.1 — 2026-11-07

- Sanitize export markup into DOM fragments and load imported fonts with the FontFace API, removing unsafe HTML assignments and runtime style elements.
- Preserve imported fonts in exported PNGs through validated, membership-checked local font reads.
- Fix export message typing, cross-window element checks, timers, and CSS compatibility warnings while preserving layout and pagination.
- Include the entire export studio in zero-warning lint, type checking, and the release test suite.
- Keep existing membership, trial start times, early-bird dates, saved styles, and downloaded static resources unchanged.

## 0.4.0 — 2026-11-07

- Offer an explicitly started 72-hour full membership trial. Expiry preserves notes, exported images, photos, and saved styles; free review stays available.
- Include bookshelf reading, all four image export templates, fonts, colors, and saved styles in lifetime membership. Existing full licenses keep all benefits without reactivation or an upgrade fee.
- Set pricing to CNY 19.9 for 30 days from public release, then CNY 39.9. Early-bird window: 2026-11-07T11:33:19.070Z to 2026-12-07T11:33:19.070Z.

- Export notes or selected passages as images from reviews, book readers, editor and file menus, or a command.
- Add four export templates: minimal page, handwritten diary, full-photo essay, and photo journal. Support paginated or long PNG images and multi-page ZIP files.
- Customize export fonts, colors, photos, and layout; save reusable styles and per-template defaults. Import font files or select installed fonts on supported desktops.
- Configure export author, vault destination, and filename format without overwriting existing files. Export text edits do not change source notes.
- Add shared reading appearance settings and review filters for folders, tags, and recent notes.
- Community installs download verified static fonts and images only after a user clicks; executable code ships with the plugin. A complete offline ZIP is also provided.

## 0.3.4 — 2026-11-05

- Restore eslint-import-resolver-node 0.3.10 in the dependency lockfile to fix clean source review installations.
- Use structured version updates and verify installed dependency versions against the lockfile.
- Validate releases with a fresh npm cache. No plugin behavior changes.

## 0.3.3 — 2026-11-05

- Fix repeating dropdown arrows in dark mode.
- Preserve directory scroll position and keyboard focus when switching entries.
- Replace cover position sliders with direct dragging, keyboard adjustments and a center reset button.

## 0.3.2 — 2026-11-04

- Optimize all 35 bundled covers to WebP, reducing main.js to about 3.33 MB.
- Keep existing cover identifiers and credits; add a 4.5 MB build size guard.
- Preserve the custom software license and individual artwork licenses.

## 0.3.1 — 2026-11-04

- Add 35 bundled offline cover images with artwork credits and source links.
- Preserve vault image selection, uploads and existing cover preferences.
- Keep cover editor actions outside scrolling content to prevent gallery overlap.

## 0.3.0 — 2026-11-04

- Add synchronized review collections, folder-based books and selectable title sources.
- Improve cover and directory layout; group native settings with correct rendering on Obsidian 1.13+.
- Preserve free features, existing licenses and stored configuration.


## 0.1.3 — 2026-10-31

- Add English installation, usage, privacy, licensing and compatibility documentation for directory review.
- Correct release status in the Chinese guide. No runtime changes.


## 0.1.2 — 2026-10-31 (pre-release)

- Change the manifest display name to Zhaohua Xishi to meet directory naming requirements.
- Keep the plugin ID, Chinese interface, reflection heading and stored settings unchanged.


## 0.1.1 — 2026-10-31 (pre-release)

- Random journal review, on-this-day review and previous-entry navigation.
- Persisted reflection drafts and append to today's journal with links.
- Core Daily Notes template support and custom configuration.
- Source-available license: personal/internal work use and free sharing allowed; selling, paid bundling and paid product/service integration require separate written permission.
- LICENSE included in installation files.
- Mobile device and minimum-version testing remain pending.
