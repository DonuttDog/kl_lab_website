# Week3 实现说明（含 Stitch UI 对齐）

## Stitch 数据来源

- **API 拉取**：`npm run stitch:fetch`（或 `node --env-file=.env scripts/fetch-stitch-project.mjs`）从项目 `7886715977653878132` 列出屏幕并下载 HTML 到 `docs/week3/fetched/`（`*.html` 已 `.gitignore`，摘要见同目录 `stitch-fetch-summary.json`）。
- **结论**：当前 API 仅 **2 屏**（首页向落地页 + 心理测评列表），**无独立「课程列表」屏**；课程列表页按测评列表同款骨架与 token 统一。
- **备用稿**：[Stitch-manually-cpied](Stitch-manually-cpied) 为手动「Code to Clipboard」备份，用于结构对照。

## 改了哪些页面

| 页面 | 文件 | 改动要点 |
|------|------|----------|
| 首页 | `src/pages/HomePage.tsx` | 对齐 Stitch：徽章、主标题 + 强调色、双 CTA（测评 / 锚点至 `#product-features`）、双列大图入口卡、三列特点（标题 + 正文）；文案均走 i18n。 |
| 心理测评列表 | `src/pages/AssessmentListPage.tsx` | `PageIntro` 增加 `kicker`；筛选区 `lg:grid-cols-4`、浅底输入；卡片圆角、hover 上浮、双列 `Link` + `buttonStyleClasses`（渐变 / 次按钮）。 |
| 课程列表 | `src/pages/CourseListPage.tsx` | 同上筛选与卡片节奏；主操作渐变链接。 |
| 顶栏 / 页脚 | `SiteHeader.tsx`、`SiteFooter.tsx` | 轻量毛玻璃与阴影、页脚浅底。 |

## 新增 / 扩展

- `src/components/layout/SectionHeading.tsx`：居中标题 + 品牌色下划线（首页「产品特点」）。
- `Button`：`variant="gradient"`；导出 `buttonStyleClasses()` 供 `Link` 避免 `<a><button>` 嵌套。
- `tailwind.config.cjs`：`brandInk`、`brandSecondary`、`surfaceMuted`、`backgroundImage.signature-gradient`。
- `scripts/fetch-stitch-project.mjs`：拉取项目 HTML。
- 测试：`vitest` + `@testing-library/react`，`src/pages/__tests__/smoke.test.tsx`；第二轮起增加 `src/components/layout/__tests__/SiteHeader.test.tsx`。
- **第二轮另见**下文「Stitch 演示对齐（第二轮）」：`MetaRow`、`PageBreadcrumb`、列表 `EmptyState` 清除筛选、`motion-safe` 卡片 hover 等。

## 未改动范围

- **作答、登录注册、我的**等路由：无 Stitch 级视觉改版，业务逻辑仍为 Mock。
- **测评/课程详情**：无大块内容或流程改版；第二轮仅将面包屑换为统一 `PageBreadcrumb` 组件（与列表页导航体验一致）。

## 文案（zh-CN）要点

首页大量 key 已替换为 Stitch 向占位中文（如 `heroTitleLead`、`heroTitleAccent`、`heroCtaPrimary`、`featureTitle1` 等）；列表页增加 `introKicker`。详见 `src/locales/zh-CN.json`。

## 测试命令

```bash
npm run build
npm run test
```

## Stitch 演示对齐（第二轮）

与 Stitch 演示稿在**密度与导航反馈**上进一步对齐，仍保持单一全站壳（`MainLayout` + `SiteHeader` / `SiteFooter`），页面内不重复顶栏。

### 顶栏「当前模块」高亮

- **规则**：`useLocation()`；路径以 `/assessments` 开头时「心理测评」下拉触发器为当前页；以 `/courses` 开头时「商城」为当前页；首页不高亮这两项。
- **样式**：激活时 `text-brandInk`、`font-semibold`、底边 `border-brandInk`；`aria-current="page"` 挂在对应触发器 `button` 上。
- **主 CTA / 头像**：「开始测评」使用与首页一致的渐变按钮样式（`buttonStyleClasses('gradient', …)`）；头像占位为 `bg-signature-gradient` + `ring-brand/30` 细环。

### 列表卡片元信息行

- **组件**：`src/components/ui/MetaRow.tsx`（`icon` + 文案），内联 SVG：`IconUsers`、`IconClock`（约 16px）。
- **测评列表**：适用人群、预计时长两行均使用 `MetaRow`。
- **课程列表**：适用对象一行使用 `MetaRow`（当前 Mock 无时长字段，未硬凑第二行）。

### 面包屑与空状态

- **面包屑**：`PageBreadcrumb`（`src/components/layout/PageBreadcrumb.tsx`）；测评/课程**列表**页在 `PageIntro` 上方展示「首页 / 当前模块」；测评/课程**详情**页为「首页 / 列表 / 标题」，与 Week2「我在哪里」一致。
- **筛选无结果**：`EmptyState` 在存在有效筛选/搜索条件时提供 **「清除筛选」**（`page.*.clearFilters`），一键恢复默认筛选并保留「回首页」。

### 动效

- 列表与首页入口卡片的 hover 上浮使用 `motion-safe:hover:-translate-y-1`，在 `prefers-reduced-motion: reduce` 下不位移。

### 测试

- `src/components/layout/__tests__/SiteHeader.test.tsx`：断言 `/assessments`、`/courses` 下对应导航触发器的 `aria-current`、渐变 CTA 与头像样式。
- 原有 `src/pages/__tests__/smoke.test.tsx` 冒烟仍覆盖三页渲染。
