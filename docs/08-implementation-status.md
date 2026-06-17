# 08｜实现状态与已知缺口

本文件对照历史计划（[archive/week2](archive/week2)、[archive/week3](archive/week3)）与 **当前代码**，作为单一真相来源。

## 总体结论

- **Week1 基线**：路由、Mock、i18n、测评列表筛选 — 已落地。
- **Week2**：Tailwind、布局与基础 UI 组件、「我的」、登录注册 mock、测评量表作答 UI — 已落地。
- **Week3**：首页 + 测评/课程列表 Stitch 向视觉；第二轮顶栏高亮、MetaRow、面包屑、筛选空状态「清除筛选」、`prefers-reduced-motion` — 已落地。
- **Phase 0-2 重构**（当前分支）：全局 Toast 通知系统、Radix UI Modal/Dialog、ErrorAlert、Button loading、lucide-react 图标、clsx+tailwind-merge cn()、404 页面 — 已落地。
- `npm run build` 与 `npm run test` 为仓库内可执行的验证命令。

## 对照表

| 能力 | 状态 | 主要代码位置 |
|------|------|----------------|
| Vite + React + TS + Router | 已完成 | `package.json`、`src/app/router.tsx` |
| Tailwind + token | 已完成 | `tailwind.config.cjs`、`src/index.css` |
| 全站布局与顶栏/页脚 | 已完成 | `MainLayout`、`SiteHeader`、`SiteFooter` |
| 基础 UI 组件 | 已完成 | `src/components/ui/` |
| 首页 Stitch 向区块 | 已完成 | `HomePage.tsx` |
| 测评/课程列表筛选与卡片 | 已完成 | `AssessmentListPage`、`CourseListPage` |
| 面包屑（列表/详情） | 已完成 | `PageBreadcrumb.tsx` |
| 测评作答 + X 分量表 | 已完成 | `AssessmentAnswerPage`、`AssessmentScale.tsx` |
| 用户中心 mock | 已完成 | `ProfilePage.tsx` |
| 登录/注册 mock | 已完成 | `LoginPage.tsx`、`RegisterPage.tsx` |
| Vitest 冒烟 + SiteHeader | 已完成 | `src/pages/__tests__/`、`SiteHeader.test.tsx` |
| Stitch 拉取脚本 | 已完成 | `scripts/fetch-stitch-project.mjs`、`npm run stitch:fetch` |
| Toast 全局通知系统 | 已完成 | `context/ToastContext.tsx`、`ui/Toast.tsx` |
| Modal / Dialog 组件 | 已完成 | `ui/Modal.tsx`、`ui/Dialog.tsx`（Radix UI） |
| ErrorAlert 内联错误 | 已完成 | `ui/ErrorAlert.tsx` |
| Button loading 态 | 已完成 | `ui/Button.tsx` |
| lucide-react 图标 | 已完成 | 全站替换内联 SVG |
| clsx + tailwind-merge cn() | 已完成 | `lib/utils.ts`、`ui/utils.ts` |
| 404 页面 | 已完成 | `pages/NotFoundPage.tsx` |

## Week2 计划外但已实现

- Header「登录」跳转 `/login`
- 课程列表搜索与筛选可叠加

## 已知未闭环

1. **深色模式**：`tailwind.config.cjs` 为 `darkMode: 'class'`；Profile 等有开关入口，**全站 dark 视觉 token 未完整适配**（含新组件 Toast/Modal/ErrorAlert）。
2. **认证**：登录/注册为 Mock 流程，**无**会话存储与后端 API。
3. **顶栏下拉**：支持外部点击与 Esc；**方向键导航**可增强（archive/week2 已知项）。
4. **作答页**：题量 `TOTAL_PLACEHOLDER = 12` 为占位，非真实题库驱动。
5. **后端环境变量**：`.env.example` 中 `VITE_*` 已预留，**应用代码未读取**。
6. **无障碍**：`prefers-reduced-motion` 未支持；无 skip-to-content 链接。
7. **工程化**：无 ESLint 配置；无 `@/` 路径别名。

## 后续增强方向（未排期）

- 全站 `dark:` 样式与 token
- 可替换的 auth store（mock → API）
- 布局间距收敛为可复用布局组件（减少样式漂移）
- Railway / CI 文档化 — **TODO：仓库无配置**

## 历史文档

周计划与线框详见 [archive/README.md](archive/README.md)；勿以 archive 内「计划态」覆盖本表。
