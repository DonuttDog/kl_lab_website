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
| `loading` | `boolean` | — |
| 其余 | `ButtonHTMLAttributes` | `type` 默认 `'button'` |

`loading`: 为 `true` 时按钮 disabled 并显示 `Loader2` 旋转动画（`lucide-react`）。

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
| `icon` | `ReactNode` | 内联图标（`lucide-react`） |
| `children` | `ReactNode` | 元信息文案 |

导出 `IconUsers`、`IconClock`（`lucide-react` 封装）供自定义场景。

### `ToastContainer` / `ToastProvider` / `useToast`

全局 Toast 通知系统（`src/context/ToastContext.tsx` + `src/components/ui/Toast.tsx`）：

| API | 说明 |
|-----|------|
| `ToastProvider` | Context Provider，挂载在 `App.tsx` 中，通过 `createPortal` 将 Toast 渲染到 `document.body` |
| `useToast()` | Hook，返回 `{ showToast(message, type?) }` |
| `showToast(message, type?)` | 触发通知。`type`: `'success' \| 'error' \| 'info' \| 'warning'`（默认 `'info'`）。显示 3s 后自行消失 |
| `ToastContainer` | 纯展示组件，不直接使用 |

**特性**：
- 固定右上角（`fixed right-4 top-4 z-50`），多 Toast 堆叠
- 进入动画：opacity + translateX 过渡 300ms
- 退出动画：opacity + translateX + scale 过渡 250ms
- 手动关闭：点击 ✕ 立即触发退出动画
- 图标：`lucide-react`（CheckCircle / AlertCircle / Info）
- 颜色：success=emerald, error=red, info=sky, warning=amber

### `Modal`

Radix UI Dialog 薄封装（`src/components/ui/Modal.tsx`）：

| Prop | 类型 | 说明 |
|------|------|------|
| `open` | `boolean` | 控制显示/隐藏 |
| `onClose` | `() => void` | 关闭回调 |
| `title?` | `string` | 标题（DialogTitle） |
| `description?` | `string` | 描述文案（DialogDescription） |
| `children?` | `ReactNode` | 正文区域 |
| `footer?` | `ReactNode` | 底栏（通常放确认/取消按钮） |

**底层**：`Dialog` 组件（`src/components/ui/Dialog.tsx`）封装 Radix UI `DialogPrimitive`，提供：
- `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`
- Portal 渲染、焦点捕捉、Esc 关闭、ARIA 标注
- Header 带 `border-b` 分隔线、Footer 带 `border-t` + `bg-surfaceMuted/50` 底色
- 打开/关闭 `data-[state]` 动画（scale + opacity）

### `ErrorAlert`

内联错误横幅（`src/components/ui/ErrorAlert.tsx`）：

| Prop | 类型 | 说明 |
|------|------|------|
| `message` | `string` | 错误消息 |
| `onDismiss?` | `() => void` | 关闭回调（出现 ✕ 按钮） |
| `className?` | `string` | 额外 class |

`role="alert"`，红色主题，`lucide-react` AlertCircle 图标。用于表单内联错误，替代弹窗。

### `cn`（`utils.ts`）

合并 className 字符串，底层为 `clsx` + `tailwind-merge`（智能处理 Tailwind class 冲突），定义在 `src/lib/utils.ts`，由 `src/components/ui/utils.ts` 转发。

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
