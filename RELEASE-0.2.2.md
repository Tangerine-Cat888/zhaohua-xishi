# 朝花夕拾 0.2.2

- 接入 Obsidian 1.13+ 设置搜索，保留旧版设置页兼容路径。
- 移除已停用的导出／打印样式，清理相关 CSS 兼容性警告来源。
- 去掉 !important 覆盖，改用局部选择器；保持目录显隐、阅读标题和封面裁剪布局。
- 用明确的封面状态类替代 :has() 选择器，保留缺图提示与模板切换。

早鸟买断价仍为 ¥9.9，会员权益不变。随机回顾、往年今日和保存感想永久免费。已有授权无需重新激活。

升级时替换 main.js、manifest.json、styles.css，保留 data.json。

本地检查和 32 项测试通过，已在 Windows Obsidian 验收设置索引、目录显隐、封面状态及布局。官方扫描结果以重新审核为准；手机真机及最低声明版本尚未实测。

## English

- Added searchable setting definitions on Obsidian 1.13+ while retaining a legacy settings-page fallback.
- Removed unused print/export styles and replaced !important overrides with scoped selectors.
- Replaced :has() with explicit cover state classes, preserving missing-photo behavior and layout.
- Early-bird lifetime membership remains CNY 9.9. Free features and existing licenses are unchanged.

Keep data.json when upgrading. Windows desktop checks and 32 tests passed. Physical mobile devices and the declared minimum version have not been tested. Official scan results require a new review.
