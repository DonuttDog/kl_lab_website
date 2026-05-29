# 09｜Stitch 与设计参考（开发者）

面向需要从 [Google Stitch](https://stitch.withgoogle.com/) 拉取或复现设计稿的开发者。不影响 `npm run dev` 运行主应用。

## 依赖与密钥

- SDK：`@google/stitch-sdk`（`devDependencies`）
- 环境变量：`STITCH_API_KEY`（写在根目录 `.env`，**勿提交**；见 [.env.example](../.env.example)）

## npm 脚本

| 命令 | 脚本文件 | 作用 |
|------|----------|------|
| `npm run stitch:fetch` | [scripts/fetch-stitch-project.mjs](../scripts/fetch-stitch-project.mjs) | 列出指定项目各屏并下载 HTML |
| `npm run stitch:week3` | [scripts/stitch-week3-reference.mjs](../scripts/stitch-week3-reference.mjs) | 创建/生成参考屏并写 JSON 摘要 |

默认 Stitch 项目 ID（fetch）：`7886715977653878132`（可通过 CLI 参数覆盖）。

## 输出目录

| 路径 | 内容 |
|------|------|
| `docs/stitch/fetched/*.html` | 拉取的 HTML（[.gitignore](../.gitignore) 忽略，可本地再生） |
| `docs/stitch/fetched/stitch-fetch-summary.json` | `stitch:fetch` 生成的元数据 |
| `docs/archive/week3/stitch-generation-summary.json` | `stitch:week3` 历史摘要（归档） |
| `docs/archive/week3/Stitch-manually-cpied` | 手动复制的参考稿 |

`fetch` 脚本记录的 `hasDedicatedCourseListScreen: false` 表示 API 曾仅返回首页 + 测评列表两屏；课程列表页在代码中按测评列表骨架与 token 统一（见 [08-implementation-status.md](08-implementation-status.md)）。

## 与产品/UI 文档的关系

- 实现说明（页面级改动）已并入 [04-routes-and-pages.md](04-routes-and-pages.md)、[05-ui-and-components.md](05-ui-and-components.md)
- 原始 prompt 全文见 [archive/week3/01-stitch-prompts-and-results.md](archive/week3/01-stitch-prompts-and-results.md)

## 不确定性

- Stitch API 可用性、配额与项目 ID 生命周期 — **TODO：以 Google 官方文档为准**
- 生成 HTML 与生产 React 组件并非 1:1，仅作视觉与结构参考
