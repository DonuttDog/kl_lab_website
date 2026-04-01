# 05｜组件规格 v1（供前端实现映射）

## 目标

沉淀 Week2 涉及组件的统一规格，避免页面各自实现导致样式和行为分裂。

## 组件清单

- Avatar（头像）
- ProfileMenu（头像下拉菜单）
- SideNav（“我的”页左侧导航）
- FieldRow（账户字段行）
- Button（主/次/危险按钮）
- Input / Select（筛选与编辑输入）
- AssessmentScale（X 分量表，图3为 7 分示例）
- StatusToast（轻提示）
- EmptyState（空状态）

## 组件规格

### Avatar

- Props：`src?`、`fallbackText`、`size(sm|md|lg)`、`clickable`。
- 状态：`default / hover / focus / menu-open`。
- 规则：无图时显示首字母圆形占位（如图2中的“T”）。

### ProfileMenu

- Props：`items[]`、`open`、`onOpenChange`、`onSelect`。
- 菜单项：用户中心、更新日志、访问官网、深色模式、退出登录。
- 可访问性：支持键盘方向键、`Esc` 关闭、焦点陷阱避免。

### SideNav

- Props：`items[]`、`activeKey`、`onChange`。
- 样式：选中项使用背景强调 + 左侧标识，不用夸张动画。

### FieldRow

- Props：`label`、`value`、`actions[]`、`status?`（如已绑定/未绑定）。
- 布局：左侧标签+值，右侧动作按钮，纵向间距统一。
- 限制：单行最多两个动作按钮，超出改为二级菜单。

### Button

- Variant：`primary / secondary / danger / text`。
- Size：`sm / md / lg`，全站统一高度阶梯。
- 状态：`default / hover / active / disabled / loading`。

### Input / Select

- 统一边框、圆角、占位文案样式。
- 错误态：红色边框 + 下方错误文本，错误文本与字段左对齐。

### AssessmentScale（通用量表）

- Props：`value?`、`onChange`、`scaleCount`、`leftLabel`、`rightLabel`、`stepLabels?`。
- 约束：`scaleCount >= 2`，支持 `2/3/5/7/10` 等分值数量。
- 布局：`leftLabel + [1..scaleCount] + rightLabel`。
- 状态：未选中中性，选中高亮，hover 轻强调。

### StatusToast

- 类型：`success / info / warning / error`。
- 位置：右上或底部固定，不遮挡主操作区。
- 时长：默认 2~3 秒，可手动关闭。

### EmptyState

- Props：`title`、`description?`、`action?`。
- 用途：筛选无结果、列表为空、加载失败后的兜底展示。

## 组件状态矩阵（最小要求）


| 组件               | default | hover | active | focus | disabled | loading |
| ---------------- | ------- | ----- | ------ | ----- | -------- | ------- |
| Avatar           | Y       | Y     | N      | Y     | N        | N       |
| ProfileMenu Item | Y       | Y     | Y      | Y     | Y        | N       |
| Button           | Y       | Y     | Y      | Y     | Y        | Y       |
| Input/Select     | Y       | Y     | N      | Y     | Y        | Y       |
| AssessmentScale  | Y       | Y     | Y      | Y     | N        | N       |


## 与文档的关系

- 布局层参考：`02-all-pages-layout-and-navigation-spec.md`
- “我的”页行为参考：`03-my-page-ia-and-wireframe.md`
- 测评页行为参考：`04-assessment-ui-pages-only.md`

## 为什么有助于三大目标

- 用户友好：组件行为可预期，减少操作犹豫。
- 降低理解成本：跨页组件一致，学习成本一次性。
- 建立信任感：细节统一，体现产品成熟度。

