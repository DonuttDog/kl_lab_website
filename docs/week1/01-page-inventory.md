# 第一周交付：核心页面清单

教育心理学平台（首页 / 测评 / 课程）的页面级清单，含测评「列表 → 详情 → 作答」与课程「列表 → 详情」分支。命名与 [04-naming-glossary.md](04-naming-glossary.md) 一致。全站 **MainLayout** 顶栏结构（测评/商城下拉、登录、开始测评）见 [02-page-content-structure.md](02-page-content-structure.md)；技术选型见 [06-tech-stack.md](06-tech-stack.md)。

## 页面总表

| 编号 | 页面名称 | 路由建议（占位） | 说明 |
|------|----------|------------------|------|
| P-01 | 首页 | `/` | 平台入口：介绍、两大模块入口、产品特点 |
| P-02 | 测评列表 | `/assessments` | 搜索 + 三维度下拉筛选（主题/人群/场景）+ 卡片标签 + Mock 列表 |
| P-03 | 测评详情 | `/assessments/:id` | 单套测评说明、适用人群、时长、进入作答 |
| P-04 | 测评作答 | `/assessments/:id/answer` | 问卷作答，独立、简洁、少干扰 |
| P-05 | 课程列表 | `/courses` | 卡片列表 + 筛选 |
| P-06 | 课程详情 | `/courses/:id` | 完整课程信息与学习价值 |

## 分支说明（已定稿）

### 测评

- **必经**：P-02 → P-04（从列表经详情或直接开始作答，见 [03-user-flows.md](03-user-flows.md)）。
- **推荐路径**：P-02 → P-03 → P-04（先读说明再作答，路径最清晰）。
- **可选快捷**：P-02 卡片上提供「开始测评」直达 P-04（与 P-03 中主按钮等价，避免重复流程）。

### 课程

- **必经**：P-05 → P-06。
- 文档要求：浏览、筛选、详情；无「课堂内学习页」的第一周范围，**学习/播放**若后续有，单独增页（如 `P-07 课程学习`），第一周不纳入 MVP 页面清单。

## 功能清单（模块能力）

| 模块 | 第一周能力（前端可实现 / Mock） |
|------|----------------------------------|
| 首页 | 展示平台定位、测评入口、课程入口、产品特点；跳转至 P-02 / P-05 |
| 测评 | 列表：名称搜索 + 三下拉筛选 + 卡片归类标签；卡片字段：名称、简介、适用人群、预计时长；详情页；作答页（题目展示、选项、进度、提交占位） |
| 课程 | 列表 + 筛选；卡片：名称、封面、简介、适用对象；详情页完整内容区块（后端后续补全数据） |

## 非第一周范围（备忘）

- 用户登录 / 注册、支付、答卷提交与结果回写（依赖后端时再接）。
- 高保真视觉与组件规范（第二周 UI）。

---

## 代码实现对照（仓库根目录）

| 说明 | 位置 |
|------|------|
| 路由 | [src/app/router.tsx](../../src/app/router.tsx)（`react-router-dom` `createBrowserRouter`） |
| 全站顶栏 + 页脚布局 | [src/layouts/MainLayout.tsx](../../src/layouts/MainLayout.tsx)、[src/components/layout/SiteHeader.tsx](../../src/components/layout/SiteHeader.tsx) |
| 作答页（无全站顶栏） | [src/pages/AssessmentAnswerPage.tsx](../../src/pages/AssessmentAnswerPage.tsx) 独立路由 |
| 页面组件 | [src/pages/](../../src/pages/) |
| Mock 数据 | [src/mocks/](../../src/mocks/)（卡片标题等通过 **i18n key** 引用，见下） |
| 中文文案（集中字典） | [src/locales/zh-CN.json](../../src/locales/zh-CN.json)；初始化 [src/i18n/index.ts](../../src/i18n/index.ts) |

**约定**：界面可见文案（除未来由后端返回的正式测评题干外）均通过 `t('…')` 从字典读取；新增文案先加 key 再写组件。多语言时在 `src/locales/` 增加如 `en.json` 并在 `i18n` 中注册即可。
