# 02｜快速开始

## 环境要求

- **Node.js**：建议使用官网 [nodejs.org](https://nodejs.org/) 的 **LTS** 版本（`package.json` 未声明 `engines` 字段，故不写死具体版本号）
- **npm**：随 Node 安装，用于安装依赖与运行脚本

验证：

```bash
node -v
npm -v
```

## 安装

在仓库根目录（含 `package.json`）执行：

```bash
npm install
```

## 环境变量

复制或参考根目录 [.env.example](../.env.example)：

| 变量 | 是否必需 | 说明 |
|------|----------|------|
| `VITE_API_BASE_URL` | 否（注释状态） | 预留：后端 API 基址 |
| `VITE_USE_MOCK` | 否（注释状态） | 预留：是否使用 Mock |
| `VITE_DEFAULT_LOCALE` | 否（注释状态） | 预留：默认语言；当前代码仅加载 `zh-CN` |
| `STITCH_API_KEY` | 仅 Stitch 脚本 | 运行 `npm run stitch:*` 时需要；**不要提交**到 Git |

本地开发 **`npm run dev` 不配置 `.env` 也可运行**。

Stitch 脚本示例：

```bash
# 根目录创建 .env（勿提交）
# STITCH_API_KEY=your_key_here
npm run stitch:fetch
```

## npm 脚本（与 package.json 一致）

| 命令 | 作用 |
|------|------|
| `npm run dev` | Vite 开发服务器（默认 http://127.0.0.1:5173） |
| `npm run build` | `tsc -p tsconfig.app.json --noEmit` 后 `vite build`，产出 `dist/` |
| `npm run preview` | 本地预览 `dist/` |
| `npm run test` | Vitest 单次运行 |
| `npm run test:watch` | Vitest 监听模式 |
| `npm run stitch:week3` | `node --env-file=.env scripts/stitch-week3-reference.mjs` |
| `npm run stitch:fetch` | `node --env-file=.env scripts/fetch-stitch-project.mjs` |

## 常用工作流

1. **日常开发**：`npm install` → `npm run dev` → 浏览器打开终端提示的本地地址
2. **改中文文案**：编辑 [src/locales/zh-CN.json](../src/locales/zh-CN.json)，见 [06-internationalization.md](06-internationalization.md)
3. **改 Mock 条目**：编辑 [src/mocks](../src/mocks/)，见 [07-mock-data.md](07-mock-data.md)
4. **发版前检查**：`npm run build` 与 `npm run test`
5. **拉 Stitch 参考 HTML**（可选）：配置 `STITCH_API_KEY` 后 `npm run stitch:fetch`，见 [09-stitch-and-design-reference.md](09-stitch-and-design-reference.md)

## 排错

| 现象 | 处理 |
|------|------|
| `node` / `npm` 找不到 | 安装 Node LTS 并重启终端 |
| `npm install` 失败 | 检查网络；将完整终端报错提供给维护者 |
| `npm run build` 失败 | 查看 TypeScript 报错；先修 `src/` 类型错误 |
| Stitch 脚本报 `Missing STITCH_API_KEY` | 在 `.env` 中设置密钥，并用 `--env-file=.env`（npm 脚本已包含） |
| 页面空白 | 确认访问的是 `npm run dev` 输出的 URL，而非直接打开 `index.html` 文件 |
