# 朝花夕拾 0.3.2

- 修复内置图库导致 main.js 超过 5 MB 的问题：35 张图片优化为 WebP，插件主文件由约 11.6 MB 降至 3.33 MB。
- 全部图片仍可离线使用，原有封面选择、裁切位置和配置保持兼容，无需重新选图。
- 增加 4.5 MB 发布体积检查，保留同步空间余量。
- 保留作品署名、来源与许可，注明图片缩放与格式转换。插件仍使用原有自定义许可证。

下载 ZIP 或三个插件文件，替换笔记库 `.obsidian/plugins/zhaohua-xishi/` 中对应文件后重新启用插件。升级时保留 `data.json`。

已在 Windows Obsidian 验证图片解码、选择与配置恢复；手机真机和最低声明版本尚未实测。

## English

- Reduced main.js from about 11.6 MB to 3.33 MB by optimizing all 35 bundled covers to WebP.
- Preserved offline availability, existing cover IDs, crop positions and licenses.
- Added a 4.5 MB release-size guard. Keep data.json when upgrading.
