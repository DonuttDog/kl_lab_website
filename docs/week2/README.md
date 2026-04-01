# Week2：UI/UX 统一设计与实现（已落地）

## 本周目标

本周已完成「从文档到代码」的落地：在 Week1 基线之上完成全站视觉统一改造，新增“我的”页面，补齐登录/注册 mock 页面，并引入 Tailwind 方案。

- 用户友好：关键操作一眼可见，交互反馈明确。
- 降低理解成本：结构统一、命名一致、信息层级稳定。
- 建立信任感：专业、克制、稳定，避免娱乐化表达。
- 视觉风格统一：同类组件跨页面外观与行为一致。
- 字体、颜色、间距一致：统一 token 驱动，避免局部特例。

## 与 Week1 的关系（避免重复）

- Week1 已定义页面清单、流程、基础信息结构与技术栈基线。
- Week2 仅补充“视觉与交互如何实现一致”，不复述 Week1 已定内容。
- 引用关系：
  - 页面与流程基线：`docs/week1/01-page-inventory.md`、`docs/week1/03-user-flows.md`
  - 内容结构基线：`docs/week1/02-page-content-structure.md`
  - 命名基线：`docs/week1/04-naming-glossary.md`

## 文档阅读顺序（建议）

1. `01-ui-principles-and-tokens.md`：先定统一设计原则与 token。
2. `02-all-pages-layout-and-navigation-spec.md`：定全站骨架与导航行为。
3. `05-existing-pages-ui-upgrade-spec.md`：把首页/测评/课程统一升级规则定清楚。
4. `03-my-page-ia-and-wireframe.md`：新增“我的”页面信息架构与 mock 规则。
5. `04-assessment-ui-pages-only.md`：测评页面的 UI-only 设计规范（不做具体测评逻辑）。
6. `05-component-spec-v1.md`：组件级规格，供前端映射实现。
7. `06-styling-tech-decision.md`：样式技术选型（含 Tailwind 可选方案）。
8. `07-delivery-checklist-and-handoff.md`：交付与验收清单。
9. `08-implementation-status.md`：Week2 计划与实际实现对照（重点）。

## 本周实际产出

- 文档侧：完成 `01~07` 设计规范，并新增 `08` 实施状态文档。
- 代码侧：完成 Tailwind 基线、布局改造、基础组件抽取、页面升级与“我的”页面。
- 功能侧：新增 `登录/注册` mock 页面（无后端交互），Header 登录按钮已可跳转。
- 交互侧：测评作答页已支持 `AssessmentScale(X 分量表)`（示例 7 分）。

## 图片参考映射

- 图1：头像下拉菜单结构与入口层级。
- 图2：用户中心（“我的”）双栏布局与字段行交互。
- 图3：测评问卷题目块与 X 分量表布局（示例为 7 分）。

## 当前已知边界（与代码一致）

- 深色模式目前仅完成“状态切换入口”，未完成整站 `dark` 视觉 token 全量适配。
- 登录/注册为纯 mock 流程：仅前端校验与跳转，不涉及后端鉴权和会话持久化。

