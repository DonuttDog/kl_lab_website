# 项目索引（入口文档）

> **用途**：给**新对话里的协作者（含 AI）**和**新加入的同学**一个总览：当前仓库里有什么、该去哪个文件找什么、各周大致做了什么。  
> **维护约定**：每周末或每个里程碑合并后，由负责人**更新「按周变更记录」和「目录结构快照」**（几分钟即可）。

---

## 新对话 / 新任务开始时建议先读

| 顺序 | 文件 | 说明 |
|------|------|------|
| 1 | [README.md](../README.md) | 非技术向：项目是什么、如何 `npm install` / `npm run dev` |
| 2 | **本文件** `docs/PROJECT_INDEX.md` | 结构与索引（你正在读的） |
| 3 | [week2/08-implementation-status.md](week2/08-implementation-status.md) | 当前实现状态（计划→代码对照，建议优先） |
| 4 | [week1/06-tech-stack.md](week1/06-tech-stack.md) | 技术栈与工程维护（已按 Week2 同步） |
| 5 | 当周文件夹 `docs/weekN/` | 该周产品/流程/文案的详细说明 |

---

## 按主题快速查找

| 想了解 | 去看 |
|--------|------|
| 有哪些页面、路由是什么 | [week1/01-page-inventory.md](week1/01-page-inventory.md) |
| 每页模块、顶栏、跳转 | [week1/02-page-content-structure.md](week1/02-page-content-structure.md) |
| 测评/课程用户路径（图） | [week1/03-user-flows.md](week1/03-user-flows.md) |
| 按钮/模块/字段中文用语 | [week1/04-naming-glossary.md](week1/04-naming-glossary.md) |
| 低保真线框与信息层级 | [week1/05-low-fidelity-wireframes.md](week1/05-low-fidelity-wireframes.md) |
| 依赖、构建命令、维护项 | [week1/06-tech-stack.md](week1/06-tech-stack.md)、[week2/06-styling-tech-decision.md](week2/06-styling-tech-decision.md) |
| Week2 全站 UI/UX 统一规范 | [week2/README.md](week2/README.md) |
| Week2 计划与实现对照 | [week2/08-implementation-status.md](week2/08-implementation-status.md) |
| 路由与布局代码 | `src/app/router.tsx`、`src/layouts/MainLayout.tsx` |
| 全站顶栏 / 页脚 | `src/components/layout/SiteHeader.tsx`、`SiteFooter.tsx` |
| 界面中文文案（key） | `src/locales/zh-CN.json` |
| Mock 测评/课程数据 | `src/mocks/assessments.ts`、`src/mocks/courses.ts` |
| 环境变量占位 | [.env.example](../.env.example) |

---

## 源代码目录结构（快照）

以下为**当前**约定结构，随功能增加可改；改完请同步更新本小节。

```
项目根目录/
├── README.md                 # 面向非技术：说明与 npm 命令
├── package.json              # 脚本：dev / build / preview
├── index.html
├── vite.config.ts
├── tsconfig*.json
├── .env.example
├── docs/
│   ├── PROJECT_INDEX.md      # 本文件：总索引 + 按周记录
│   ├── week1/                # 第一周产品与技术文档（01–06）
│   └── week2/                # 第二周 UI/UX 文档（01–08）
└── src/
    ├── main.tsx              # 入口；加载 i18n 与样式
    ├── App.tsx               # RouterProvider
    ├── app/router.tsx        # 路由表
    ├── i18n/                 # i18next 初始化
    ├── locales/zh-CN.json    # 中文文案（集中字典）
    ├── layouts/              # MainLayout
    ├── components/layout/    # SiteHeader、SiteFooter
    ├── components/ui/        # Button/Card/Input/Select/EmptyState/Toast
    ├── components/assessment/# AssessmentScale（X 分量表）
    ├── pages/                # 各路由页面
    ├── mocks/                # Mock 数据（引用 locale key）
    └── hooks/                # 如 useDocumentTitle
```

---

## 按周变更记录（持续更新）

### Week 1（当前基线）

- **范围**：教育心理平台前端 MVP——首页、心理测评（列表/详情/作答）、课程（列表/详情）；数据为 Mock；文案集中 `zh-CN.json`；测评列表为「搜索 + 三维度下拉 + 卡片标签」。
- **详细文档**：`docs/week1/` 下 `01`～`06`。
- **合并说明**：功能开发在功能分支（如 `week1_dev`）进行，经 **PR 合入 `main`**（以仓库实际分支策略为准）。

### Week 2（已落地）

- **范围**：完成全站 UI/UX 统一改造（首页、测评、课程、“我的”），并落地 Tailwind 渐进重构。
- **代码成果**：
  - 新增基础组件：`src/components/ui/`
  - 新增量表组件：`src/components/assessment/AssessmentScale.tsx`
  - 新增页面：`src/pages/ProfilePage.tsx`、`src/pages/LoginPage.tsx`、`src/pages/RegisterPage.tsx`
  - 路由扩展：`/profile`、`/login`、`/register`
- **详细文档**：`docs/week2/` 下 `README + 01~08`。
- **实现对照**：见 [week2/08-implementation-status.md](week2/08-implementation-status.md)。
- **已知边界**：深色模式仅完成开关入口，尚未完成全量 dark 样式适配；登录/注册仍为 mock 流程。

---

## 给 AI / 自动化助手的提示

在新需求对话中，可将下面整段粘贴为开场，减少重复说明：

```text
请先阅读仓库中的 docs/PROJECT_INDEX.md 与 README.md，再阅读与本次任务相关的 docs/weekN/ 文档，
然后基于当前 src/ 结构实现；界面文案只改 src/locales/zh-CN.json，避免在组件里硬编码中文。
```

---

## 维护 checklist（每周末或发版前）

- [ ] 「按周变更记录」增加本周一行或一小节  
- [ ] 「目录结构快照」若有大目录新增/重命名则更新  
- [ ] 「按主题快速查找」表若有新文档或关键文件则追加一行  
