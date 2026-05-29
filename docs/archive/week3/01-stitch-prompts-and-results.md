# Stitch：我们怎么沟通、得到了什么

面向**产品经理、运营、设计师**的阅读说明；不涉及具体代码实现。

## 1. 我们用什么工具跟 Stitch「说话」

- 在浏览器里可以直接使用 [Stitch 网站](https://stitch.withgoogle.com/)，用文字描述界面。
- 本仓库另外用 **Node 脚本**（`scripts/stitch-week3-reference.mjs`）调用官方 **`@google/stitch-sdk`**，把同样的描述发给 Stitch 的接口，这样可以在本地重复执行、并把结果记在 `docs/week3/` 里。
- **密钥**：需要在项目根目录的 `.env` 里配置 `STITCH_API_KEY=`（密钥本身不要提交到 Git）。运行脚本示例：
  `node --env-file=.env scripts/stitch-week3-reference.mjs`

**和 Cursor 里「MCP」的关系**：若你在 Cursor 设置里配置了 Stitch 的 MCP，那是**另一条**让 AI 助手调用 Stitch 的通道；本 Week3 实际采用的是 **SDK + 脚本**，不依赖 MCP 是否开启。

## 2. 我们向 Stitch 提的三条需求（提示词原文）

三条分别对应：**首页**、**心理测评列表**、**课程列表**。写法是英文（Stitch 对英文描述支持较好），内容要求与《网站需求文档》和 Week2 品牌色一致。

完整原文已保存在 [stitch-generation-summary.json](stitch-generation-summary.json) 的 `screensRequested` 字段，下面是人话摘要：

| 画面 | 我们想要什么 |
|------|----------------|
| 首页 | 教育心理平台、专业极简可信；主色 `#14B8C4`、灰底 `#F7F8FA`、白卡片；**不要**画顶栏（网站已有）；要有大标题区、两大入口（心理测评 / 课程）、三列「产品特点」。 |
| 测评列表 | 同一套视觉；有标题、副标题、说明一行；上面有搜索和三个下拉；下面卡片里要有标签、简介、适用人群、时长、两个按钮。 |
| 课程列表 | 同一套视觉；标题与副标题；搜索与两个下拉；课程卡片上面是封面占位，下面是标题、简介、适用对象、主按钮。 |

## 3. Stitch 返回了什么

- **创建项目**：成功。接口返回里带有形如 `projects/数字` 的项目名（详见 [stitch-generation-summary.json](stitch-generation-summary.json)）。
- **生成三个画面的截图 / 可下载 HTML**：本次在调用「根据文字生成画面」时，接口报错：**响应不完整**（技术信息：`Incomplete API response from generate_screen_from_text`）。因此**没有**可用的预览图或 HTML 链接写进仓库。

也就是说：**沟通内容（提示词）已留痕；自动生成参考图这一环本次未成功**，页面改版主要依据仍是《需求文档》+ Week2 设计 token + 开发上的统一布局。

## 4. 网页里我们怎么用这个结果

- **若以后 Stitch 生成成功**：可以把截图当作「视觉验收参考」，把 HTML 当作结构参考，但**不会**整段贴进项目；我们会用 React 组件和已有的颜色变量（Tailwind 语义色）重做一版，保证和全站顶栏、文案表一致。
- **本次**：直接按上述产品约束，在 [02-week3-implementation-notes.md](02-week3-implementation-notes.md) 所列页面做了第一版统一风格。
