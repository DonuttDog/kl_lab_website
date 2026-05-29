# Week3 文档索引

> **已归档**：Stitch 与实现说明见 [../../09-stitch-and-design-reference.md](../../09-stitch-and-design-reference.md)、[../../08-implementation-status.md](../../08-implementation-status.md)。

## 目标

- 按 [网站需求文档](../网站需求文档(Week1-2).md) 中的**外观与体验**要求，在现有技术栈与 Week2 规范上，完成**首页、心理测评列表、课程列表**三页的第一版视觉统一升级。
- 通过 [Google Stitch](https://stitch.withgoogle.com/)（本仓库使用 `@google/stitch-sdk` 脚本）尝试生成设计参考，并把**提示词与沟通方式**记录到本目录，便于非开发同事理解。

## 本目录文件

| 文件 | 说明 |
|------|------|
| [01-stitch-prompts-and-results.md](01-stitch-prompts-and-results.md) | 我们向 Stitch 说了什么、得到了什么、网页里怎么用 |
| [02-week3-implementation-notes.md](02-week3-implementation-notes.md) | 第一轮页面改动、文案 key；**含「Stitch 演示对齐（第二轮）」**（顶栏、MetaRow、面包屑、空状态、动效等） |
| [stitch-generation-summary.json](stitch-generation-summary.json) | 机器可读：prompt 全文、API 结果摘要（不含密钥） |
| `fetched/stitch-fetch-summary.json` | 运行 `npm run stitch:fetch` 后生成：项目内各屏 HTML 文件路径与元数据（`*.html` 默认不提交） |

## 与需求文档的对应关系

| 需求文档章节 | Week3 落地 |
|--------------|------------|
| 首页：平台介绍、功能入口、特点 | 首页 Hero、核心入口、产品特点区块 |
| 测评：列表、卡片字段、路径清晰 | 测评列表页标题区、筛选区、卡片顶栏强调与信息分区 |
| 课程：列表、卡片、详情入口 | 课程列表页标题区、筛选区、封面区比例与内容区 |
| 设计目标：友好、低理解成本、信任感 | 统一间距与 token，减少噪音，主色仅作强调 |

## 未包含（按约定）

- 测评/课程**作答页**未做 Stitch 级视觉改版；**详情页**未做大块布局重绘，仅在第二轮起统一为 [`PageBreadcrumb`](../../src/components/layout/PageBreadcrumb.tsx) 与列表页一致的「我在哪里」体验，业务逻辑仍为 Mock。
