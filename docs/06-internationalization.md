# 06｜国际化与文案

## 当前语言

仓库 **仅内置简体中文**：

- 初始化：[src/i18n/index.ts](../src/i18n/index.ts)
- 资源：[src/locales/zh-CN.json](../src/locales/zh-CN.json)
- `lng` / `fallbackLng` 均为 `'zh-CN'`

`.env.example` 中的 `VITE_DEFAULT_LOCALE` 为预留，**当前代码未读取该变量**。

## 使用方式

页面与组件通过 `useTranslation()` 的 `t('key')` 取文案。文档标题等使用 [src/hooks/useDocumentTitle.ts](../src/hooks/useDocumentTitle.ts)。

## Key 组织（常见前缀）

| 前缀 | 用途 |
|------|------|
| `app.*` | 应用级（如文档标题后缀） |
| `common.*` | 通用按钮、返回列表等 |
| `breadcrumb.*` | 面包屑 |
| `page.home.*` | 首页 |
| `page.assessmentList.*` / `page.assessmentDetail.*` / `page.assessmentAnswer.*` | 测评 |
| `page.courseList.*` / `page.courseDetail.*` | 课程 |
| `page.profile.*` | 用户中心 |
| `page.auth.*` | 登录注册 |
| `mock.assessment.*` / `mock.course.*` | Mock 条目展示文案 |

Mock 数据文件存 **key 名**（如 `titleKey: 'mock.assessment.a1.title'`），展示时再 `t(key)`。

## 维护约定

1. **新增用户可见中文**：优先在 `zh-CN.json` 增加 key，组件内不写硬编码中文（测试中断言的中文除外）。
2. **插值**：使用 i18next 插值语法（如 `page.assessmentAnswer.progress` 的 `{{current}}`）。
3. **新增语言**：需扩展 `resources`、语言切换 UI 及构建策略 — **TODO：未实现**。
