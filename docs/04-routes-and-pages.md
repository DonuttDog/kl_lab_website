# 04｜路由与页面

路由定义：[src/app/router.tsx](../src/app/router.tsx)。

## 路由总表

| 路径 | 布局 | 组件 | 说明 |
|------|------|------|------|
| `/` | `MainLayout` | `HomePage` | 首页 |
| `/assessments` | `MainLayout` | `AssessmentListPage` | 测评列表 |
| `/assessments/:id` | `MainLayout` | `AssessmentDetailPage` | 测评详情 |
| `/assessments/:id/answer` | **无** `MainLayout` | `AssessmentAnswerPage` | 作答（全屏，无全站顶栏/页脚） |
| `/courses` | `MainLayout` | `CourseListPage` | 课程列表 |
| `/courses/:id` | `MainLayout` | `CourseDetailPage` | 课程详情 |
| `/login` | `MainLayout` | `LoginPage` | Mock 登录 |
| `/register` | `MainLayout` | `RegisterPage` | Mock 注册 |
| `/profile` | `MainLayout` | `ProfilePage` | 用户中心（Mock 资料） |
| `*` | — | `NotFoundPage` | 404 品牌页面（渐变 404 + 返回/浏览入口） |

`MainLayout`：[src/layouts/MainLayout.tsx](../src/layouts/MainLayout.tsx) — `SiteHeader` + `Outlet`（`max-w-content`）+ `SiteFooter`。

## 各页行为（用户可见）

### 首页 `HomePage`

- Hero：主标题、强调色片段、双 CTA（测评列表、`#product-features` 锚点）
- 双列入口卡片链到测评/课程
- 三列产品特点（`id="product-features"`）
- 列表卡片 hover 使用 `motion-safe:hover:-translate-y-1`（减少动效偏好下不位移）

### 心理测评列表 `AssessmentListPage`

- 面包屑：`useListPageBreadcrumb('breadcrumb.assessments')`
- `PageIntro`（含 `kicker`）
- 筛选：搜索框 + 主题/对象/场景三下拉；与 Mock 字段叠加过滤（[listAssessments](../src/mocks/assessments.ts)）
- 卡片：`MetaRow` 展示适用人群、预计时长；链到详情/作答
- 无结果：`EmptyState`；若有活跃筛选则提供「清除筛选」回调 `resetFilters`

### 测评详情 `AssessmentDetailPage`

- 面包屑：首页 / 列表 / 当前标题
- 未找到 id：提示 + 回列表
- 进入作答：链到 `/assessments/:id/answer`

### 测评作答 `AssessmentAnswerPage`

- 独立布局，自带顶栏区（退出、进度文案）
- 占位总题数 `TOTAL_PLACEHOLDER = 12`；题型含单选与 `AssessmentScale`（示例 7 分，`scaleCount` 由页面传入）
- 退出：Modal 确认弹窗（品牌样式，danger 确认按钮） — 见 [05-ui-and-components.md](05-ui-and-components.md#modal)
- 提交：Toast 通知后回详情或列表
- 无效 id：未找到 UI + 回列表按钮

### 课程列表 `CourseListPage`

- 与测评列表类似的面包屑、`PageIntro`、筛选区（搜索 + 受众/主题）
- `MetaRow` 仅适用对象一行（Mock 无时长字段）
- 筛选空状态与「清除筛选」逻辑同测评列表

### 课程详情 `CourseDetailPage`

- 面包屑：首页 / 课程列表 / 标题
- Mock 正文来自 locale key
- 「立即学习」按钮：Toast info 通知（占位）

### 登录 `LoginPage` / 注册 `RegisterPage`

- Mock：必填校验 → Toast warning 通知 → 登录成功跳转 `/profile`（Toast success）；注册成功后跳转 `/login`
- 文案含 mock 提示（`page.auth.mockHint`）

### 用户中心 `ProfilePage`

- 本地 state 模拟资料（`INITIAL_PROFILE`），非后端拉取
- Tab：`settings` | `wallet` | `orders`；操作通过全局 `useToast()` 反馈
- 编辑姓名/手机：Modal 输入框（品牌样式，支持 Enter 提交） — 见 [05-ui-and-components.md](05-ui-and-components.md#modal)
- 深色模式开关等交互为前端占位

## 顶栏导航（跨页）

[src/components/layout/SiteHeader.tsx](../src/components/layout/SiteHeader.tsx)：

- 路径以 `/assessments` 开头 → 「心理测评」下拉触发器 `aria-current="page"` + 底边高亮
- 路径以 `/courses` 开头 → 「商城」模块同理
- 首页不高亮上述两项
- 「开始测评」使用 `buttonStyleClasses('gradient', …)`；「登录」链到 `/login`

## 测试

| 文件 | 覆盖 |
|------|------|
| [src/pages/__tests__/smoke.test.tsx](../src/pages/__tests__/smoke.test.tsx) | 首页 hero、`#product-features`、测评/课程列表标题与搜索 |
| [src/components/layout/__tests__/SiteHeader.test.tsx](../src/components/layout/__tests__/SiteHeader.test.tsx) | `/assessments`、`/courses` 下 `aria-current`、渐变 CTA、头像样式 |

运行：`npm run test` 或 `npm run test:watch`（见 [02-getting-started.md](02-getting-started.md)）。
