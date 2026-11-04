# 朝花夕拾 · Zhaohua Xishi

日记写了很多，却很少回看？随机翻开过去的日记，回顾往年今日，把今天的感想保存到今日日记。

作者：Tangerine.Cat · 当前版本：0.3.2

## 免费功能

随机回顾、往年今日、回顾历史导航及保存感想永久免费。支持正文与图片阅读、打开原文，保存感想时附原日记链接，可沿用核心日记插件的目录、日期格式和模板。

## 永久会员（可选付费）

早鸟买断价 **¥9.9**。包含“我的书架”、后续新功能更新，以及售后支持与问题反馈。

“我的书架”支持按月份或按子文件夹成书，可自定义封面、阅读目录、标题来源和字号。新增 35 张内置离线封面，可在封面编辑器中直接选用；保留上传及笔记库选图。图片来源与许可见 [图片说明](docs/COVER-CREDITS.md)。目前不提供导出。

在插件设置查看会员信息，添加作者微信 **qian_yu_sui** 购买。复制本机申请码发给作者，收到授权码后在同一页面激活。

授权绑定本机 Obsidian 应用凭据，不写入笔记库，也不随笔记同步。清空应用数据、换机或部分重装操作可能需要重新签发。完整应用环境克隆或修改程序不在离线授权的保护范围内。

## 安装与升级

1. 从 [0.3.2 发布页](https://github.com/Tangerine-Cat888/zhaohua-xishi/releases/tag/0.3.2) 下载 `main.js`、`manifest.json`、`styles.css`。
2. 放入笔记库 `.obsidian/plugins/zhaohua-xishi/`，重新加载插件。升级时保留已有 `data.json`。
3. 配置日记文件夹、日期格式，从侧栏入口打开插件。比如 `Diary/2024/2024-01-17.md`，目录设为 `Diary`，日期格式为 `YYYY-MM-DD`，开启子文件夹。

社区目录上架与审核状态以 Obsidian 页面为准，GitHub 发布不代表审核已通过。

## 隐私与兼容性

不上传日记，不调用 AI，无遥测或插件主动网络请求。远程图片和嵌入可能由 Obsidian 原生渲染器联网加载。见 [PRIVACY.md](PRIVACY.md)。

已进行 Windows 桌面验收。手机真机和声明的最低 Obsidian 1.7.2 版本尚未完成实测。反馈时请勿提交私人日记或授权码。

## 仓库与许可

公开仓库提供安装包、版本信息和 [问题反馈](https://github.com/Tangerine-Cat888/zhaohua-xishi/issues)。新版源码在私有仓库维护并提供给 Obsidian 审核。公开仓库保留的旧版源码和历史不代表 0.3.2 的实现。

使用与分享须遵循 [LICENSE](LICENSE)。未经作者另行授权，不得转售或付费打包。既有版本已授予的权利不因本次发布被追溯改变。

---

# English

Rediscover past journals in Obsidian. Random review, on-this-day review, navigation history and saving reflections remain free. Reflections link to the original journal and can inherit the core Daily Notes folder, date format and template.

Optional lifetime membership unlocks **My Journal Books**: monthly books, a yearly shelf, custom covers, reading navigation, configurable title sources and font sizes. The early-bird price is CNY 9.9, including future feature updates and support. Contact the author through plugin settings, send the device request code and paste the returned signed license to activate offline.

Download `main.js`, `manifest.json` and `styles.css` from the release above. Copy them to `.obsidian/plugins/zhaohua-xishi/`, reload Obsidian and configure the journal folder and date format. Keep `data.json` when upgrading. Click the ribbon icon, select Random review or On this day, then save reflections to today's daily note.

No telemetry, AI integration or plugin-initiated network requests. Obsidian may load remote images and embeds. Activation is stored in local application storage, not the vault. Clearing app storage or changing devices may require a replacement license.

Windows desktop has been validated. Physical mobile devices and the declared minimum version have not been tested. Current source is private and available for official review. Public historical source does not represent this release. See LICENSE and PRIVACY.md.


## 回顾集

在设置中通过“管理回顾集”添加读书笔记、工作日志等文件夹。随机回顾、往年今日和书架同步使用当前回顾集；无日期的内容也可以随机回顾。每个回顾集可指定标题来自 title 属性、正文第一个标题或文件名。

默认“日记”沿用已有配置，选中后书架标题显示“我的日记本”。感想仍统一写入今天的日记。回顾集管理与随机回顾免费，成书阅读属于永久会员功能。

设置按“回顾内容、我的日记本、感想保存、授权与支持”分组，保留 Obsidian 原生控件。“日记模板”名称与原保存方式不变。

详细规则见 [回顾集说明](docs/REVIEW-SETS.md)。
