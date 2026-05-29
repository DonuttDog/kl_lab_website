# 01｜项目概览

## 这是什么

本仓库是 **教育心理学平台** 的 **前端 Web 应用**（浏览器内可见、可点击的界面层）。用户可浏览首页、心理测评（列表、详情、模拟作答）、课程（列表、详情）、用户中心（我的），以及 **登录/注册 mock 页面**。

界面文案为 **简体中文**；业务数据以 **本地 Mock** 为主，不依赖后端即可运行。

## 不在本仓库内

以下能力 **当前未实现**，文档与代码均按 Mock/占位处理：

- 真实后端 API、用户会话与鉴权持久化
- 测评/课程结果的云端保存与付费
- 生产环境部署流水线配置（仓库内无 CI/Docker/Railway 配置文件）

接入后端后，预期通过环境变量（见 [.env.example](../.env.example)）切换 API 基址等；具体接口形态 **TODO：待后端规格确认**。

## MVP 范围（与路由一致）

| 模块 | 用户能做什么 |
|------|----------------|
| 首页 | 了解平台、进入测评/课程、查看产品特点锚点 `#product-features` |
| 心理测评 | 列表搜索+三维度筛选、详情、独立作答页（全屏、无顶栏） |
| 课程 | 列表搜索+筛选、详情 |
| 账户 | Mock 登录/注册（校验后 alert + 跳转）、用户中心展示占位信息 |

路由与页面细节见 [04-routes-and-pages.md](04-routes-and-pages.md)。

## 迭代阶段（归档说明）

- **Week1**：信息结构、Mock 数据、基础路由与 i18n（详见 [archive/week1](archive/week1)）
- **Week2**：全站 UI 统一、Tailwind、基础组件、「我的」与登录注册 mock（详见 [archive/week2](archive/week2)）
- **Week3**：首页与两列表 Stitch 向视觉、顶栏高亮、面包屑、MetaRow、筛选空状态等（详见 [archive/week3](archive/week3) 与 [08-implementation-status.md](08-implementation-status.md)）

## 产品需求文档

高层需求与页面定义见 [网站需求文档(Week1-2).md](网站需求文档(Week1-2).md)。实现状态以代码与 [08-implementation-status.md](08-implementation-status.md) 为准。

## 已知演示环境

README 中记载的生产预览地址：`https://kllabwebsite-production.up.railway.app/`  
**TODO**：仓库内无部署配置，构建/发布步骤无法从本仓库确认。
