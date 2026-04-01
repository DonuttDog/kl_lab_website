# 08｜Week2 实施状态（计划 -> 实现对照）

## 说明

本文件用于把 Week2 的“计划文档”与“当前代码实现”对齐，避免出现文档领先代码或代码领先文档的问题。

---

## 总体结论

- Week2 主目标已完成：全站 UI/UX 统一改造 + 新增“我的”页面 + 测评作答页量表化 + 课程页搜索补齐。
- 样式路线已落地为 Tailwind 渐进改造（保留少量全局基础样式）。
- 当前仓库可正常 `npm run build`。

---

## 计划任务对照表

| 计划项 | 状态 | 代码位置 |
|---|---|---|
| Tailwind 基线 | 已完成 | `tailwind.config.cjs`、`postcss.config.cjs`、`src/index.css` |
| 布局与导航统一 | 已完成 | `src/layouts/MainLayout.tsx`、`src/components/layout/SiteHeader.tsx`、`SiteFooter.tsx` |
| 基础 UI 组件抽取 | 已完成 | `src/components/ui/` (`Button`/`Card`/`Input`/`Select`/`EmptyState`/`Toast`) |
| 新增“我的”页面（mock） | 已完成 | `src/pages/ProfilePage.tsx`、`src/app/router.tsx` (`/profile`) |
| 测评页面升级 + X 分量表 | 已完成 | `src/pages/Assessment*.tsx`、`src/components/assessment/AssessmentScale.tsx` |
| 首页与课程页面统一升级 | 已完成 | `src/pages/HomePage.tsx`、`CourseListPage.tsx`、`CourseDetailPage.tsx` |
| 回归与构建验证 | 已完成 | 构建命令 `npm run build` 已通过 |

---

## Week2 额外新增（计划外但已实现）

- 登录按钮跳转能力：Header “登录”已改为跳转 `/login`。
- 新增登录页：`src/pages/LoginPage.tsx`（mock 登录，成功跳转用户中心）。
- 新增注册页：`src/pages/RegisterPage.tsx`（mock 注册，当前仅用户名 + 密码流程）。
- 课程页补齐搜索：`src/pages/CourseListPage.tsx`（搜索与筛选可叠加）。

---

## 文案与字典同步

- `src/locales/zh-CN.json` 已新增：
  - `page.profile.*`（用户中心）
  - `page.auth.*`（登录注册）
  - `page.courseList.search*`（课程搜索）
  - `page.assessmentAnswer.scale*`（量表题锚点与提示）

---

## 当前已知未闭环项（下一周建议）

1. 深色模式仅有开关入口，未全量落地 `dark` 视觉 token。
2. 登录注册尚未接后端接口与会话管理（当前为 mock 交互）。
3. 顶栏下拉菜单键盘方向键导航可继续增强（目前已支持外部点击与 Esc 关闭）。

---

## 建议的 Week3 起点

1. 先做深色主题 token 与关键页面适配（首页/列表/详情/我的）。
2. 定义最小 auth 状态管理（本地 mock store -> 后端接口可替换）。
3. 把“动作区间距规范（如 `mt-3`）”收敛为可复用布局组件，减少未来样式漂移。
