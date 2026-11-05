# 朝花夕拾 · Zhaohua Xishi

随机回顾日记和笔记，查看往年今日，把感想写入今天的日记。

[English](#english) · [插件主页](https://community.obsidian.md/plugins/zhaohua-xishi) · [问题反馈](https://github.com/Tangerine-Cat888/zhaohua-xishi/issues)

## 回顾日记和笔记

![随机回顾：阅读旧日记，并把现在的感想保存到今天](docs/images/random-review.png)

- **随机回顾**：从选定的文件夹中随机打开一篇旧日记或笔记，可以阅读正文、查看图片，也可以打开原文。
- **往年今日**：查看过去几年同一天写下的内容。
- **保存感想**：边看边写下现在的想法，保存到今天的日记，并附上原文链接。
- **回顾记录**：返回刚刚读过的内容，接着看。

这些功能永久免费。

除了日记，也可以在设置的“管理回顾集”中添加读书笔记、工作日志等文件夹，切换要回顾的内容。没有日期的笔记也能随机回顾；往年今日需要能识别日期的笔记。所有感想统一保存到今天的日记。

## 把笔记放上书架

“我的书架”是可选的付费功能，可以把日记按月份分成一本本日记本，也可以把不同子文件夹里的笔记分别作为一本书阅读。

![示例书架：经典文字、摄影题签、留白画册、满版影像四种封面](docs/images/bookshelf-styles-v2.png)

从左到右是经典文字、摄影题签、留白画册、满版影像。同一张书架上可以使用不同的封面样式。

- 从目录选择篇目，调整阅读字号。
- 设置书名，以及目录中显示的笔记标题。
- 从内置的 35 张图片中选择封面，或使用自己的图片。
- 直接拖动封面图片，调整显示位置。

![内置封面图库：选择图片，预览封面，并拖动调整图片位置](docs/images/cover-gallery-v2.png)

展开“内置图库”，点击图片就能预览封面效果。以上截图使用示例日记。

## 开始使用


1. 在 Obsidian 的 **设置 → 第三方插件 → 浏览** 中搜索 **Zhaohua Xishi**，安装并启用。
2. 打开插件设置，指定日记文件夹和文件名的日期格式。也可以沿用 Obsidian 核心日记插件的目录、日期格式和模板。
3. 点击侧栏中的插件入口，选择“随机回顾”或“往年今日”。

例如，日记路径是 `Diary/2024/2024-01-17.md`，将文件夹设为 `Diary`、日期格式设为 `YYYY-MM-DD`，并开启包含子文件夹。

要回顾其他文件夹，在“管理回顾集”中添加即可。日期识别、标题来源和成书方式的详细设置见 [回顾集说明](docs/REVIEW-SETS.md)。

## 价格与激活

随机回顾、往年今日、回顾记录、保存感想和回顾集管理永久免费。

**永久会员早鸟买断价 ¥9.9**，包含书架阅读、后续新功能更新及售后支持。

购买方式：在插件设置中找到“授权与支持”，添加作者微信 **qian_yu_sui**，发送本机申请码。收到授权码后，回到同一页面粘贴激活。

授权保存在本机，不随笔记库同步。换机、清空应用数据或部分重装操作后，可能需要联系作者重新签发。

## 常见问题

### 日记会上传吗？

插件在本地读取笔记，不上传日记，不调用 AI，也不收集使用数据。笔记中已有的远程图片或嵌入内容，仍可能由 Obsidian 联网加载。详见 [隐私说明](PRIVACY.md)。

### 支持哪些设备？

目前已在 Windows 桌面端测试。手机端和声明的最低 Obsidian 1.7.2 版本尚未完成实测。

### 如何手动安装或升级？

从 [最新发布页](https://github.com/Tangerine-Cat888/zhaohua-xishi/releases/latest) 下载 `main.js`、`manifest.json` 和 `styles.css`，放入笔记库的 `.obsidian/plugins/zhaohua-xishi/` 文件夹，再重新加载插件。升级时保留已有的 `data.json`。

### 遇到问题在哪里反馈？

可以在 GitHub [提交问题](https://github.com/Tangerine-Cat888/zhaohua-xishi/issues)，附上 Obsidian 版本、插件版本和复现步骤。截图请遮住私人日记内容，不要附上授权码。

## 作者与许可

作者：Tangerine.Cat。

公开仓库提供安装包与使用说明；当前版本源码在私有仓库维护，并提供给 Obsidian 审核。公开仓库保留的旧版源码不代表当前版本的实现。

使用与分享请遵循 [LICENSE](LICENSE)，未经作者授权不得转售或付费打包；既有版本已授予的权利不受后续许可变更的追溯影响。封面图片的来源与许可见 [图库说明](assets/covers/README.md)。

---

## English

Browse random journal entries and notes, revisit this day in past years, and add comments to today's daily note.

### Review your notes

![Random review with a comment field for today's daily note](docs/images/random-review.png)

- **Random review**: Open a random past entry or note from a selected folder. Read its text and images, or open the original file.
- **On this day**: Read entries from the same date in previous years.
- **Save comments**: Write a comment while reading and save it to today's daily note, with a link to the original.
- **Review history**: Go back to entries you have just read.

These features are free. You can also add separate review sets for reading notes, work logs, or other folders. Undated notes support random review; on-this-day review requires a valid date. Comments from all sets go to today's daily note.

### Read notes as books

The optional paid bookshelf groups entries into books by month or subfolder. Choose an entry from the table of contents, adjust the font size, and customize book titles and covers. Choose from 35 bundled cover images or use your own, then drag the image to adjust its position.

Books are for reading inside Obsidian. Ebook and PDF export are not supported.

![Four cover layouts on one shelf: text, photo label, framed image, and full image](docs/images/bookshelf-styles-v2.png)

From left to right: text, photo label, framed image, and full image. You can mix layouts on the same shelf.

![Built-in cover gallery with a live cover preview](docs/images/cover-gallery-v2.png)

Choose an image from the built-in gallery, preview it, and drag to adjust its position. Screenshots use sample journal entries.

### Get started

1. Search for **Zhaohua Xishi** in Obsidian's community plugins, then install and enable it.
2. Set your journal folder and filename date format. You can reuse the core Daily Notes folder, date format, and template.
3. Open the plugin from the ribbon and choose random review or on-this-day review.

For a file such as `Diary/2024/2024-01-17.md`, set the folder to `Diary`, use `YYYY-MM-DD`, and include subfolders. Add other folders through the review-set manager in settings.

For manual installation, download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/Tangerine-Cat888/zhaohua-xishi/releases/latest). Place them in `.obsidian/plugins/zhaohua-xishi/` and reload the plugin. Keep your existing `data.json` when upgrading.

### Pricing

Random review, on-this-day review, review history, comments, and review-set management are permanently free.

Optional lifetime membership costs **CNY 9.9 at the early-bird price** and includes bookshelf reading, future feature updates, and support. To purchase, contact the author on WeChat at **qian_yu_sui** and send the device request code shown in plugin settings. Paste the returned license code into the same settings page to activate.

Activation is stored on the device and does not sync with your vault. Changing devices, clearing application data, or some reinstallations may require a replacement license.

### Privacy, compatibility, and support

The plugin reads notes locally. It does not upload journals, use AI, or collect usage data. Obsidian may still load remote images and embeds in your notes. See the [privacy policy](PRIVACY.md).

Tested on Windows desktop. Physical mobile devices and the declared minimum Obsidian version, 1.7.2, have not yet been tested.

[Report an issue](https://github.com/Tangerine-Cat888/zhaohua-xishi/issues) with your Obsidian version, plugin version, and steps to reproduce the problem. Do not include private journal content or license codes.

The public repository provides releases and documentation. Current source is private and available to Obsidian for review; historical public source does not represent the current release. See [LICENSE](LICENSE) for terms and [cover credits](assets/covers/README.md) for image sources and licenses.
