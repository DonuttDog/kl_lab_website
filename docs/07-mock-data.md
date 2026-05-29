# 07｜Mock 数据

业务数据来自 `src/mocks/`，**不发起 HTTP 请求**。接入后端后预期由 API 层替换；`VITE_API_BASE_URL` 等见 [.env.example](../.env.example)（当前未接线）。

## 心理测评 `assessments.ts`

### 类型

- `MockAssessment`：`id`、`titleKey`、`summaryKey`、`durationKey`、`audienceKey`、`detailBodyKey`，以及筛选维度 `theme` / `audience` / `scenario`
- 筛选枚举：`AssessmentThemeFilter`、`AssessmentAudienceFilter`、`AssessmentScenarioFilter`（均含 `'all'`）

### 数据

`mockAssessments`：当前 **2 条** 固定条目（id `'1'`、`'2'`），文案 key 在 `mock.assessment.a1.*`、`a2.*`。

### 函数

| 函数 | 输入 | 输出 |
|------|------|------|
| `listAssessments(filters, titleText)` | 四维筛选 + `titleText(key)=>string` | 过滤后的数组；搜索对 **标题译文** 做不区分大小写包含匹配 |
| `getAssessmentById(id)` | `string` | 单条或 `undefined` |

## 课程 `courses.ts`

### 类型

- `MockCourse`：`id`、若干 `*Key`、`audienceFilter`、`topicFilter`（用于列表筛选，非展示用 audience 文案）
- 筛选：`CourseAudienceFilter`、`CourseTopicFilter`

### 数据

`mockCourses`：**2 条**（id `'1'`、`'2'`）。

### 函数

| 函数 | 输入 | 输出 |
|------|------|------|
| `listCourses({ audience, topic })` | 两个筛选维度 | 过滤后的数组 |
| `getCourseById(id)` | `string` | 单条或 `undefined` |

## 用户中心

`ProfilePage` 内联 `INITIAL_PROFILE` 常量，**不在** `src/mocks/` 中。

## 扩展 Mock

新增条目时：

1. 在对应 `mock*.ts` 增加对象
2. 在 [src/locales/zh-CN.json](../src/locales/zh-CN.json) 增加对应 `mock.*` key
3. 若新增筛选枚举值，需同步列表页 `Select` 选项与 i18n 标签
