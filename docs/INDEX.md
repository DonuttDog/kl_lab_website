# 文档索引（入口）

> **用途**：新同学、协作者（含 AI）快速了解仓库：当前实现、该读哪份文档、关键源码在哪。  
> **维护**：功能或目录有较大变更时，更新 [08-implementation-status.md](08-implementation-status.md) 与本文件「目录结构快照」。

---

## 建议阅读顺序

| 顺序 | 文件 | 说明 |
|------|------|------|
| 1 | [../README.md](../README.md) | 项目概览、安装与命令（非技术向） |
| 2 | **本文件** | 文档导航与源码索引 |
| 3 | [08-implementation-status.md](08-implementation-status.md) | 计划→代码对照与已知缺口 |
| 4 | [04-routes-and-pages.md](04-routes-and-pages.md) | 路由与各页用户可见行为 |
| 5 | 按需 | `01`～`07`、`09` 及 [网站需求文档](网站需求文档(Week1-2).md) |

---

## 编号文档（当前规范）

| 文件 | 主题 |
|------|------|
| [01-project-overview.md](01-project-overview.md) | 产品定位、MVP 范围、Mock 与后续后端 |
| [02-getting-started.md](02-getting-started.md) | 安装、环境变量、npm 脚本 |
| [03-tech-stack.md](03-tech-stack.md) | 技术栈与工程配置 |
| [04-routes-and-pages.md](04-routes-and-pages.md) | 路由与页面行为 |
| [05-ui-and-components.md](05-ui-and-components.md) | 布局与 UI 组件 API |
| [06-internationalization.md](06-internationalization.md) | i18n 与文案 key |
| [07-mock-data.md](07-mock-data.md) | Mock 测评/课程数据 |
| [08-implementation-status.md](08-implementation-status.md) | 实现状态与待办 |
| [09-stitch-and-design-reference.md](09-stitch-and-design-reference.md) | Stitch 脚本与设计参考（开发者） |

**产品需求基线**（Week1–2）：[网站需求文档(Week1-2).md](网站需求文档(Week1-2).md)

**历史周文档**（只读归档）：[archive/README.md](archive/README.md)

---

## 按主题查源码

| 想了解 | 去看 |
|--------|------|
| 路由表 | [src/app/router.tsx](../src/app/router.tsx) |
| 全站布局壳 | [src/layouts/MainLayout.tsx](../src/layouts/MainLayout.tsx) |
| 顶栏 / 页脚 | [src/components/layout/SiteHeader.tsx](../src/components/layout/SiteHeader.tsx)、[SiteFooter.tsx](../src/components/layout/SiteFooter.tsx) |
| 面包屑 | [src/components/layout/PageBreadcrumb.tsx](../src/components/layout/PageBreadcrumb.tsx) |
| 列表元信息行 | [src/components/ui/MetaRow.tsx](../src/components/ui/MetaRow.tsx) |
| 测评量表 | [src/components/assessment/AssessmentScale.tsx](../src/components/assessment/AssessmentScale.tsx) |
| 界面中文 | [src/locales/zh-CN.json](../src/locales/zh-CN.json) |
| Mock 数据 | [src/mocks/assessments.ts](../src/mocks/assessments.ts)、[src/mocks/courses.ts](../src/mocks/courses.ts) |
| 测试 | [04-routes-and-pages.md](04-routes-and-pages.md#测试)（见 02 的 `npm run test`） |
| Stitch 拉取摘要 | [docs/stitch/fetched/stitch-fetch-summary.json](stitch/fetched/stitch-fetch-summary.json)（运行 `npm run stitch:fetch` 后生成） |
| 环境变量示例 | [.env.example](../.env.example) |
| Toast / Modal / Dialog | [05-ui-and-components.md](05-ui-and-components.md) |
| 全局通知 (useToast) | [src/context/ToastContext.tsx](../src/context/ToastContext.tsx) |
| 404 页面 | [src/pages/NotFoundPage.tsx](../src/pages/NotFoundPage.tsx) |

---

## 源代码目录结构（快照）

```
项目根目录/
├── README.md
├── package.json
├── index.html
├── vite.config.ts
├── tailwind.config.cjs
├── postcss.config.cjs
├── tsconfig*.json
├── .env.example
├── scripts/                    # Stitch 相关 Node 脚本
├── docs/
│   ├── INDEX.md                # 本文件
│   ├── 01-09 *.md
│   ├── 网站需求文档(Week1-2).md
│   ├── archive/                # 原 week1/2/3 文档
│   └── stitch/fetched/         # Stitch HTML 摘要（*.html 默认不提交）
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── app/router.tsx
    ├── i18n/index.ts
    ├── locales/zh-CN.json
    ├── context/ToastContext.tsx
    ├── lib/utils.ts
    ├── layouts/MainLayout.tsx
    ├── components/layout/
    ├── components/ui/            # Dialog, Modal, Toast, ErrorAlert, Button, Card 等
    ├── components/assessment/
    ├── pages/                   # NotFoundPage 等
    ├── mocks/
    ├── hooks/useDocumentTitle.ts
    └── test/setup.ts
```

---

## 给 AI / 自动化助手的开场提示

```text
请先阅读 docs/INDEX.md 与 README.md，再阅读与任务相关的 docs/0N-*.md，
然后基于当前 src/ 实现；界面文案只改 src/locales/zh-CN.json，避免在组件里硬编码中文。
```
