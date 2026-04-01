# 01｜全站 UI 原则与 Design Token（Week2）

## 目标

给所有页面提供统一视觉与交互基线，直接服务以下要求：用户友好、降低理解成本、建立信任感、表达克制、风格一致。

## 设计原则（执行版）

### 1) 用户友好

- 单页一个主任务，主按钮固定且明显。
- 每个交互状态可见：`default / hover / active / focus / disabled / loading`。
- 错误提示就近出现，文案可执行（告诉用户下一步做什么）。

### 2) 降低理解成本

- 同类页面采用同一骨架：`标题区 -> 过滤/操作区 -> 内容区 -> 辅助区`。
- 同类组件不换样式语言（例如按钮不在不同页面使用不同圆角和阴影）。
- 术语与标签统一，沿用 `docs/week1/04-naming-glossary.md`。

### 3) 建立信任感

- 信息优先，视觉克制，不使用跳色和强装饰。
- 保持“稳定可预期”：同操作在不同页面反馈一致。
- 保持足够留白与对齐，避免拥挤和噪音。

## Token v1（建议作为唯一事实来源）

> 命名采用语义化，避免直接写色值名（例如 `--color-blue-500`）。

### 颜色


| Token                         | 值（建议）                   | 用途           |
| ----------------------------- | ----------------------- | ------------ |
| `--color-bg-page`             | `#F7F8FA`               | 页面背景         |
| `--color-bg-surface`          | `#FFFFFF`               | 卡片/面板背景      |
| `--color-text-primary`        | `#111827`               | 主文本          |
| `--color-text-secondary`      | `#4B5563`               | 次文本          |
| `--color-text-muted`          | `#6B7280`               | 提示文本         |
| `--color-border-default`      | `#E5E7EB`               | 默认边框         |
| `--color-brand-primary`       | `#14B8C4`               | 主品牌色（按钮、主强调） |
| `--color-brand-primary-hover` | `#0EA5B4`               | 主按钮 hover    |
| `--color-success`             | `#16A34A`               | 成功状态         |
| `--color-warning`             | `#D97706`               | 警示状态         |
| `--color-danger`              | `#DC2626`               | 风险/破坏性动作     |
| `--color-focus-ring`          | `rgba(20,184,196,0.35)` | 键盘聚焦环        |


### 字体层级


| Token                 | 值                                                     | 用途     |
| --------------------- | ----------------------------------------------------- | ------ |
| `--font-family-base`  | `Inter, "PingFang SC", "Microsoft YaHei", sans-serif` | 全站默认字体 |
| `--font-size-h1`      | `32px`                                                | 页面主标题  |
| `--font-size-h2`      | `24px`                                                | 区块标题   |
| `--font-size-h3`      | `20px`                                                | 子区块标题  |
| `--font-size-body`    | `16px`                                                | 正文     |
| `--font-size-small`   | `14px`                                                | 辅助文案   |
| `--line-height-tight` | `1.3`                                                 | 标题行高   |
| `--line-height-base`  | `1.6`                                                 | 正文行高   |


### 间距、圆角、边框、阴影


| Token            | 值                                | 用途     |
| ---------------- | -------------------------------- | ------ |
| `--space-1`      | `4px`                            | 微间距    |
| `--space-2`      | `8px`                            | 控件内间距  |
| `--space-3`      | `12px`                           | 小区块间距  |
| `--space-4`      | `16px`                           | 标准间距   |
| `--space-6`      | `24px`                           | 区块间距   |
| `--space-8`      | `32px`                           | 大区块间距  |
| `--radius-sm`    | `6px`                            | 输入框/标签 |
| `--radius-md`    | `10px`                           | 按钮/卡片  |
| `--radius-lg`    | `14px`                           | 大面板    |
| `--border-width` | `1px`                            | 统一边框宽度 |
| `--shadow-sm`    | `0 1px 3px rgba(17,24,39,0.08)`  | 轻阴影    |
| `--shadow-md`    | `0 8px 24px rgba(17,24,39,0.10)` | 弹层/下拉  |


## 状态与反馈规范

- `hover`：仅微弱亮度变化，避免大幅位移动画。
- `focus`：统一 `focus ring`，保证键盘可见性。
- `disabled`：降低对比度并禁止指针手势。
- `loading`：显示骨架或按钮内转圈，不改变布局尺寸。
- `error`：错误颜色 + 文字解释 + 修复建议。

## Pixso 对齐规范（建议）

- 画板命名：`Page/<route>/<state>`，例如 `Page/assessments/list-default`。
- 组件命名：`Comp/<name>/<variant>/<state>`。
- 变量命名与 token 一致：`color/text/primary`、`space/4`。
- 同页面只使用一套字号与间距系统，不做“局部特例”。

## 实现映射建议

- 先在样式层建立 token，再逐页替换硬编码值。
- 文案仍通过 `src/locales/zh-CN.json` 管理，不在组件硬编码中文。
- 对现有页面做“样式统一改造”时，优先改：按钮、表单、卡片、标题区。

