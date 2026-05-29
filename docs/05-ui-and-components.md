# 05｜UI 与组件

设计 token 见 [tailwind.config.cjs](../tailwind.config.cjs) 与 [03-tech-stack.md](03-tech-stack.md)。组件导出：[src/components/ui/index.ts](../src/components/ui/index.ts)。

## 布局组件

### `MainLayout`

全站壳：顶栏 + 主内容区 + 页脚。见 [04-routes-and-pages.md](04-routes-and-pages.md)。

### `SiteHeader` / `SiteFooter`

- 顶栏：品牌、模块下拉、登录/注册入口、渐变「开始测评」、头像占位
- 页脚：浅底、链接占位（文案来自 i18n）

### `PageIntro`

| Prop | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 页面 H1（`text-brandInk`） |
| `subtitle` | `string` | 副标题 |
| `hint?` | `string` | 筛选提示等 |
| `kicker?` | `string` | 标题上方短标签 |
| `aside?` | `ReactNode` | 右侧附加区 |
| `className?` | `string` | 额外 class |

### `PageBreadcrumb`

| Prop | 类型 | 说明 |
|------|------|------|
| `items` | `BreadcrumbCrumb[]` | `{ label, to? }`；无 `to` 为当前项 |
| `className?` | `string` | |

`useListPageBreadcrumb(currentLabelKey)`：列表页「首页 / 当前模块」，key 为 `'breadcrumb.assessments' | 'breadcrumb.courses'`。

### `SectionHeading`

居中区块标题 + 品牌色下划线（首页产品特点等）。

## UI 组件（`src/components/ui/`）

### `Button`

| Prop | 类型 | 默认 |
|------|------|------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'gradient'` | `'secondary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `fullWidth` | `boolean` | — |
| 其余 | `ButtonHTMLAttributes` | `type` 默认 `'button'` |

`buttonStyleClasses(variant?, size?, className?)`：供 `Link` 使用，避免 `<a><button>` 嵌套。

### `Card`

`HTMLElement` 属性 + `children`；默认 `section` + 白底圆角边框。

### `Input` / `Select`

扩展原生属性；`invalid?: boolean` 影响边框样式。

### `EmptyState`

| Prop | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 主文案 |
| `description?` | `string` | |
| `actionLabel?` + `actionTo?` | | 次要按钮样式的 `Link` |
| `secondaryActionLabel?` + `onSecondaryAction?` | | 主按钮样式（如「清除筛选」） |

### `MetaRow`

| Prop | 类型 | 说明 |
|------|------|------|
| `icon` | `'users' \| 'clock'` | 内联 SVG |
| `children` | `ReactNode` | 元信息文案 |

导出 `IconUsers`、`IconClock` 供自定义场景。

### `Toast`

| Prop | 类型 | 默认 |
|------|------|------|
| `message` | `string` | |
| `variant` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |

`role="status"`，无自动关闭逻辑（由页面 `useEffect` 控制，如 Profile）。

### `cn`（`utils.ts`）

合并 className 字符串。

## 测评组件

### `AssessmentScale`

| Prop | 类型 | 说明 |
|------|------|------|
| `scaleCount` | `number` | 刻度数量，内部 `Math.max(2, scaleCount)` |
| `value` | `number \| null` | 当前选中 |
| `onChange` | `(value: number) => void` | |
| `leftLabel?` / `rightLabel?` | `string` | 锚点文案 |

`role="radiogroup"`，各选项为 `role="radio"` 的 `button`。

## 相关测试

见 [04-routes-and-pages.md#测试](04-routes-and-pages.md#测试)。
