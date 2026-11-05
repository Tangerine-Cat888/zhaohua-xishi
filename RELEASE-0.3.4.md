# 朝花夕拾 0.3.4

- 修复依赖锁文件中错误的 eslint-import-resolver-node 版本与下载地址，使无缓存环境能够安装依赖。
- 发布版本号改为按 JSON 字段更新，避免误改依赖版本。
- 增加安装依赖与锁文件版本一致性检查，CI 使用全新 npm 缓存。
- 插件功能与 0.3.3 相同，包含暗色下拉框修复、目录位置保持和封面图片直接拖动。

升级时替换 main.js、manifest.json、styles.css，保留 data.json。原有授权与封面配置保持兼容。

## English

- Fixed the dependency lockfile so clean source review environments can install dependencies.
- Added structured version updates, installed dependency checks and fresh-cache CI.
- No plugin behavior changes from 0.3.3. Keep data.json when upgrading.
