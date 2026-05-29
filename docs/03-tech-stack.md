# 03｜技术栈与工程

版本以 [package.json](../package.json) 为准；升级依赖后请同步本文件或改为「见 package.json」。

## 运行时依赖

| 包 | 用途 |
|----|------|
| `react` / `react-dom` ^18.3 | UI |
| `react-router-dom` ^7.6 | 客户端路由（`createBrowserRouter`） |
| `i18next` + `react-i18next` | 文案国际化（当前仅 `zh-CN`） |

## 开发与构建

| 包 | 用途 |
|----|------|
| `vite` ^6.2 | 开发与生产构建 |
| `@vitejs/plugin-react-swc` | React 快速刷新 |
| `typescript` ~5.7 | 类型检查；`build` 前执行 `tsc -p tsconfig.app.json --noEmit` |
| `vitest` ^4.1 | 测试（配置在 [vite.config.ts](../vite.config.ts)） |
| `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` | 组件测试环境 |

## 样式

| 包 / 文件 | 用途 |
|-----------|------|
| `tailwindcss` ^3.4 | 原子类；配置 [tailwind.config.cjs](../tailwind.config.cjs) |
| `postcss` + `autoprefixer` | [postcss.config.cjs](../postcss.config.cjs)：`tailwindcss`、`autoprefixer` |
| `@tailwindcss/postcss` | 在 `devDependencies` 中；**当前 PostCSS 主链路未使用此包** |
| [src/index.css](../src/index.css) | Tailwind 指令与少量全局基础样式 |

`tailwind.config.cjs` 要点：

- `darkMode: 'class'`（深色模式类名策略已配置；全站 dark 视觉未完整落地，见 [08-implementation-status.md](08-implementation-status.md)）
- 颜色 token：`brand`、`brandInk`、`brandSecondary`、`surfaceMuted`、`signature-gradient` 等
- `maxWidth.content`: `1200px`

## 入口与路由

- 入口：[src/main.tsx](../src/main.tsx) → 加载 `i18n`、`index.css`、`App`
- 路由：[src/App.tsx](../src/App.tsx) → `RouterProvider` + [src/app/router.tsx](../src/app/router.tsx)

## 可选 / 仅脚本使用

| 包 | 用途 |
|----|------|
| `@google/stitch-sdk` | `scripts/stitch-week3-reference.mjs`、`scripts/fetch-stitch-project.mjs` |

## 测试配置

[vite.config.ts](../vite.config.ts)：

```ts
test: {
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
  globals: true,
}
```

[src/test/setup.ts](../src/test/setup.ts) 引入 `@testing-library/jest-dom/vitest` 并加载 `i18n`。

## 未接入（文档不宣称已存在）

- ESLint / Prettier 配置目录
- `@tanstack/react-query`、`react-hook-form`、`zod`
- Radix / Headless UI（顶栏下拉为自实现，见 [05-ui-and-components.md](05-ui-and-components.md)）
