# KL Lab 网站（前端）

教育心理学平台的 **Web 前端**：在浏览器中浏览首页、心理测评、课程与用户中心；数据以本地 **Mock** 为主，无需后端即可开发与预览。

**当前生产预览**（仓库外托管）：[https://kllabwebsite-production.up.railway.app/](https://kllabwebsite-production.up.railway.app/)  

> 仓库内 **无** Railway / CI / Docker 配置文件；部署步骤 **TODO：待运维文档确认**。

**完整文档入口**：[docs/INDEX.md](docs/INDEX.md)

---

## 项目概览


| 模块   | 说明                                           |
| ---- | -------------------------------------------- |
| 首页   | 平台介绍、测评/课程入口、产品特点（`#product-features`）       |
| 心理测评 | 列表（搜索 + 筛选）、详情、独立作答页；退出确认用 Modal，操作反馈用 Toast |
| 课程   | 列表（搜索 + 筛选）、详情                               |
| 账户   | Mock 登录/注册；用户中心支持 Modal 编辑资料、全局 Toast 反馈     |
| 404  | 品牌 404 页面（渐变设计 + 返回/浏览入口）                    |
| 通知   | 全局 Toast 系统（成功/警告/错误/信息，3s 自动消失，渐进渐出动画）      |


不在本仓库：真实 API、会话持久化、测评结果云端存储与付费。详见 [docs/01-project-overview.md](docs/01-project-overview.md)。

---

## 技术栈

- **Vite 6** + **React 18** + **TypeScript**
- **react-router-dom 7**（`createBrowserRouter`）
- **i18next**（当前仅 `zh-CN`）
- **Tailwind CSS 3** + 少量全局样式
- **Radix UI**（Dialog 原语，供 Modal 组件）
- **lucide-react**（统一图标库）
- **clsx** + **tailwind-merge**（智能 class 合并）

细节：[docs/03-tech-stack.md](docs/03-tech-stack.md)

---

## 环境要求

- [Node.js](https://nodejs.org/) **LTS**（推荐）
- **npm**（随 Node 安装）

```bash
node -v
npm -v
```

`package.json` 未声明 `engines`，故不写死具体 Node 小版本。

---

## 安装

在仓库根目录（含 `package.json`）：

```bash
npm install
```

---

## 环境变量

参考 [.env.example](.env.example)：


| 变量                    | 开发 `npm run dev` | 说明                      |
| --------------------- | ---------------- | ----------------------- |
| `VITE_API_BASE_URL`   | 不需要              | 预留，后端接入                 |
| `VITE_USE_MOCK`       | 不需要              | 预留                      |
| `VITE_DEFAULT_LOCALE` | 不需要              | 预留；代码现仅加载 `zh-CN`       |
| `STITCH_API_KEY`      | 不需要              | 仅 `npm run stitch:*` 需要 |


本地开发通常 **无需** 创建 `.env`。

---

## 开发命令

```bash
npm run dev
```

终端会显示本地地址（多为 [http://127.0.0.1:5173）。`Ctrl+C`](http://127.0.0.1:5173）。`Ctrl+C`) 停止。

---

## 构建与预览

```bash
npm run build    # tsc 类型检查 + vite build → dist/
npm run preview  # 本地预览 dist/
```

---

## 测试

```bash
npm run test         # Vitest 单次
npm run test:watch   # 监听模式
```

覆盖：首页/列表冒烟、`SiteHeader` 导航断言（含移动端）。见 [docs/04-routes-and-pages.md](docs/04-routes-and-pages.md)。

---

## 其他脚本（可选）


| 命令                     | 作用                                          |
| ---------------------- | ------------------------------------------- |
| `npm run stitch:fetch` | 从 Stitch 项目拉取 HTML 到 `docs/stitch/fetched/` |
| `npm run stitch:week3` | 生成 Week3 参考屏 JSON（归档目录）                     |


需 `.env` 中配置 `STITCH_API_KEY`。见 [docs/09-stitch-and-design-reference.md](docs/09-stitch-and-design-reference.md)。

---

## 目录结构

```
kl-lab-website/
├── README.md
├── package.json
├── vite.config.ts
├── tailwind.config.cjs
├── .env.example
├── scripts/                 # Stitch 相关
├── docs/
│   ├── INDEX.md             # 文档总索引
│   ├── 01-09 *.md           # 当前规范文档
│   ├── 网站需求文档(Week1-2).md
│   ├── archive/             # 历史 week1/2/3 文档
│   └── stitch/fetched/      # Stitch 拉取产物
└── src/
    ├── main.tsx, App.tsx
    ├── app/router.tsx
    ├── i18n/, locales/zh-CN.json
    ├── context/ToastContext.tsx   # 全局 Toast Provider
    ├── lib/utils.ts              # cn() — clsx + tailwind-merge
    ├── layouts/, components/
    │   ├── layout/           # SiteHeader (含移动端汉堡菜单), SiteFooter, PageBreadcrumb, PageIntro
    │   ├── ui/               # Button, Card, Modal, Dialog, Toast, ErrorAlert, Input, Select 等
    │   └── assessment/       # AssessmentScale
    ├── pages/                # Home, Login, Register, Profile, NotFound 等
    ├── mocks/, hooks/, test/
```

---

## 常用工作流

1. **改页面**：`src/pages/` + [docs/04-routes-and-pages.md](docs/04-routes-and-pages.md)
2. **改中文文案**：`src/locales/zh-CN.json`（勿在组件硬编码）— [docs/06-internationalization.md](docs/06-internationalization.md)
3. **改 Mock 数据**：`src/mocks/` — [docs/07-mock-data.md](docs/07-mock-data.md)
4. **触发通知**：`useToast()` → `showToast(message, type)` — 见 [docs/05-ui-and-components.md](docs/05-ui-and-components.md)
5. **弹出确认**：`<Modal open={...} title={...} footer={...}>` — 同上
6. **查实现状态**：[docs/08-implementation-status.md](docs/08-implementation-status.md)
7. **发版前**：`npm run build` && `npm run test`

---

## 排错


| 问题                 | 建议                                           |
| ------------------ | -------------------------------------------- |
| 找不到 `node` / `npm` | 安装 Node LTS 并重启终端                            |
| `npm install` 失败   | 检查网络，复制完整报错                                  |
| `npm run build` 失败 | 查看 TypeScript 错误输出                           |
| Stitch 脚本报错        | 确认 `.env` 含 `STITCH_API_KEY`                 |
| 页面空白               | 使用 `npm run dev` 的 URL，勿直接打开 `index.html`    |
| 移动端菜单不出现           | 确认视口 <768px；检查 `header.mobileMenu`* i18n key |


---

## 产品需求

Week1–2 需求基线：[docs/网站需求文档(Week1-2).md](docs/网站需求文档(Week1-2).md)