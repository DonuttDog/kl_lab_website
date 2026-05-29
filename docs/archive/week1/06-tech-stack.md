# 技术栈与工程维护说明

> **已归档**：当前规范见 [../../INDEX.md](../../INDEX.md)、[../../03-tech-stack.md](../../03-tech-stack.md)。

面向：**仅前端**；后端接口后续接入。信息架构见 [01-page-inventory.md](01-page-inventory.md)，全站顶栏见 [02-page-content-structure.md](02-page-content-structure.md)。  
**维护说明（重要）**：本文件最初创建于 Week1，当前已按 Week2 实际代码更新；若与其他周文档冲突，以 [../week2/08-implementation-status.md](../week2/08-implementation-status.md) 为准。**Week3 起**外观与顶栏/列表等迭代另见 [../week3/02-week3-implementation-notes.md](../week3/02-week3-implementation-notes.md) 与 [../../INDEX.md](../../INDEX.md)。

---

## 1. 是否采用「React + Router」

教育心理平台是多页任务流（首页 → 列表 → 详情 → 作答），采用 **React SPA + 客户端路由** 表达跳转与布局复用（全站顶栏、页脚），并便于后续按路由懒加载拆分。

| 方案 | 适用性 |
|------|--------|
| **Vite + React + TypeScript + React Router** | **当前采用**：仓库已按此实现。 |
| Next.js（App Router） | 强 SEO / SSR / Node 部署需求明显时再评估。 |
| 无路由、纯条件渲染 | 不推荐：URL 不可分享、路由一多难维护。 |

结论：**React + `react-router-dom` + `createBrowserRouter`**（见 [src/app/router.tsx](../../src/app/router.tsx)）。

---

## 2. 当前已落地技术栈（与 `package.json` 一致）

以下版本以仓库 [package.json](../../package.json) 为准，升级后请同步改本节或改为「见 package.json」。

| 层级 | 选型 | 说明 |
|------|------|------|
| 构建 | **Vite 6.x** | `vite.config.ts` 使用 `@vitejs/plugin-react-swc`。 |
| 语言 | **TypeScript ~5.7** | `tsconfig.app.json`，构建前执行 `tsc -p tsconfig.app.json --noEmit`。 |
| UI | **React 18.3** | 函数组件 + Hooks。 |
| 路由 | **react-router-dom 7.x** | 与 v6 数据路由 API 兼容；布局路由 + 作答页独立路由。 |
| 国际化 | **i18next** + **react-i18next** | 文案集中 [src/locales/zh-CN.json](../../src/locales/zh-CN.json)；初始化 [src/i18n/index.ts](../../src/i18n/index.ts)。 |
| 样式 | **TailwindCSS + 少量全局基础样式** | `tailwind.config.cjs` + `postcss.config.cjs` + [src/index.css](../../src/index.css)；页面样式以 Tailwind class 为主。 |
| 顶栏下拉 | **自实现** | `SiteHeader` 内 `button` + 状态 + 悬停/点击；**未**安装 Radix / Headless UI。 |

---

## 3. 依赖现状与可选扩展

| 包 / 能力 | 用途 | 状态 |
|-----------|------|------|
| `tailwindcss` + `postcss` + `autoprefixer` | 设计 Token、快速排版、统一样式语言 | **已接入** |
| `@tailwindcss/postcss` | Tailwind PostCSS 适配（保留） | 已安装（当前主链路未强依赖） |
| `@radix-ui/react-dropdown-menu` 等 | 顶栏下拉可达性、焦点管理 | 按需 |
| `@tanstack/react-query` | 接口缓存与加载态 | 接后端 API 时 |
| `react-hook-form` + `zod` | 表单与复杂校验 | 登录/注册或作答规则复杂化时 |
| Vitest + `@testing-library/react` + `@testing-library/jest-dom` | 单元/冒烟测试 | **已接入**：`npm run test`，配置见 `vite.config.ts`、`src/test/setup.ts` |
| ESLint + Prettier | 规范与格式化 | 按需引入 |

具体 `package.json` 版本以锁文件为准；新增依赖时在本节「已落地」或「可选」中补一行说明职责即可。

---

## 4. 工程里需要长期维护的内容

### 4.1 路由与页面映射

- 路由：`/`、`/assessments`、`/assessments/:id`、`/assessments/:id/answer`、`/courses`、`/courses/:id`、`/profile`、`/login`、`/register`。
- **MainLayout**：含顶栏 + `Outlet` + 页脚；**作答页**单独顶层路由，无全站顶栏。

### 4.2 目录结构（当前）

```
src/
  app/           router
  layouts/       MainLayout
  components/layout/
  components/ui/
  components/assessment/
  pages/
  mocks/         Mock 数据（展示文案用 i18n key）
  locales/       zh-CN.json 及后续语言
  i18n/
  hooks/
```

### 4.3 Mock 与接口切换

- `src/mocks/*.ts`；后续可用 `import.meta.env.VITE_USE_MOCK` 等开关切换真实请求。

### 4.4 环境与配置

- [.env.example](../../.env.example)；构建产物为静态资源，任意静态托管即可。

### 4.5 与设计文档、文案的同步

- 产品用语：[04-naming-glossary.md](04-naming-glossary.md)。
- 用户可见字符串：**只改** `src/locales/*.json`，组件内用 `t('key')`。

### 4.6 依赖与安全

- 定期升级 `react`、`vite`、`react-router-dom` 等；关注 major 迁移说明。
- 勿提交含密钥的 `.env`。

---

## 5. 与 Pixso 式顶栏的对应（实现侧）

- Sticky 顶栏、左侧 Logo + 测评/商城下拉预览、右侧登录 +「开始测评」——见 [SiteHeader.tsx](../../src/components/layout/SiteHeader.tsx)。
- 文案 key 与 [04-naming-glossary.md](04-naming-glossary.md) 对齐。

---

## 6. 心理测评列表：筛选交互说明（为何不用三个 Tab）

早期原型用「主题 / 对象 / 用途」三个 Tab，按 **tag 包含关系** 过滤，同一测评会出现在多个 Tab 下，**未解释每个 Tab 的语义**，易产生「按钮对应什么」的困惑。

**当前实现**（更直观）：

- **搜索框**：按测评**名称**关键词过滤（Mock 下为字典中的标题译文）。
- **三个独立下拉**：**内容主题**、**适用人群**、**使用场景**，每项可选「全部」或带说明的具体项；多条件为 **AND（交集）**。
- **卡片上的标签**：展示该测评在三个维度上的归类，与下拉选项含义一致。

逻辑与文案见 [AssessmentListPage.tsx](../../src/pages/AssessmentListPage.tsx)、[assessments.ts](../../src/mocks/assessments.ts)、`page.assessmentList.*` / `themeBadge` 等 key。

---

## 7. 小结与命令

| 问题 | 结论 |
|------|------|
| 技术栈？ | Vite 6 + React 18 + TS 5.7 + RR 7 + i18next + TailwindCSS（渐进改造已落地）。 |
| 还要接什么？ | 见第 3 节「计划可选」。 |
| 维护什么？ | 路由、布局、`src/locales/*`、`src/mocks/*`、环境变量、与 `docs/week1` 一致。 |

- 开发：`npm run dev`
- 构建：`npm run build`（含 `tsc --noEmit`）
- 测试：`npm run test`（Vitest）；页面冒烟见 `src/pages/__tests__/smoke.test.tsx`，顶栏见 `src/components/layout/__tests__/SiteHeader.test.tsx`
- 预览：`npm run preview`

Week2 的计划与实际落地对照见 [../week2/08-implementation-status.md](../week2/08-implementation-status.md)。Week3 见 [../week3/02-week3-implementation-notes.md](../week3/02-week3-implementation-notes.md)。
