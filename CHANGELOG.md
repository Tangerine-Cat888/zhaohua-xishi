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
