# AI Scientist Enterprise

企业级互动演示系统：**AI 如何像物理学家一样发现物理规律**。

在线访问：

https://ywyai.github.io/AI-Scientist-Enterprise-Split/

当前版本：**AI Scientist v2.70**

## 项目定位

这不是传统 PPT，也不是普通网页，而是一个可直接用于大屏演示、企业培训、公开课和产业论坛的单页互动演示系统。

核心叙事：

- 从现象到规律
- 从规律到理论
- 从理论到工程系统
- 从工程系统到 AI Scientist
- 从 AI Scientist 到自动科研与产业落地

## 核心特性

- 纯静态部署，无后端依赖
- HTML / CSS / JavaScript 原生实现
- Canvas 星空粒子背景，支持鼠标互动
- SVG / Canvas / CSS Animation 动态演示
- 左侧章节目录、当前章节高亮、进度条
- Presenter Notes 讲解备注系统
- 支持演讲模式、全屏模式、边栏切换
- 支持演示笔友好的键盘翻页
- 多章节内置互动：点击、拖拽、问答、逐步展开、公式搜索、模型预测
- 物理规律发现实验室：多类物理规律的数据生成、拟合、解释和可视化
- 独立版本迭代记录页

## 章节结构

1. 世界为什么有规律
2. 牛顿发现引力
3. 数学如何压缩世界
4. 科学发现流程
5. 人脑 VS AI
6. AI 如何学习
7. 数据拟合
8. 关联与因果
9. 符号回归
10. AI 真实发现规律案例
11. Physics Informed AI
12. 世界模型 World Model
13. 数字孪生
14. AI Scientist
15. 自动实验室系统架构
16. AI 发现新材料
17. AI 发现新药
18. AI 发现物理规律
19. AI for Science 全景图
20. 工业人工智能融合路线图：从系统底座到反馈闭环
21. 企业落地方法论
22. AI 科研能力演进路线图
23. 终极总结
24. 附录：物理规律发现实验室

## 重点互动

- 第1章：比萨斜塔落体实验、伽利略斜面实验
- 第4章：科学发现流程逐步展开，支持鼠标点击和左右键
- 第5章：人脑 VS AI 能力说明逐项展开，支持鼠标点击和左右键
- 第7章：拖动数据点，自动拟合曲线
- 第8章：关联与因果互动问答
- 第9章：符号回归公式搜索动画
- 第11章：普通 AI 与 Physics Informed AI 工程对比
- 第12章：世界模型中的预测轨迹和碰撞反馈
- 第19章：AI for Science 全景图拖拽浏览
- 第24章：物理规律发现实验室，支持重新生成数据和规律识别

## 快捷键

- `F`：全屏
- `P`：演讲模式
- `N`：备注模式
- `M`：打开或关闭边栏
- `↑ / ↓`：上一页 / 下一页
- `← / →`：当前页互动
- 鼠标：粒子背景互动、章节内点击、拖拽和实验触发

## 技术实现

项目使用原生前端技术实现：

- `index.html`：页面外壳、导航、备注面板、快捷键提示
- `css/theme.css`：全局视觉系统、响应式布局、动画和章节样式
- `js/content.js`：章节内容、讲解备注、HTML 结构
- `js/app.js`：导航、快捷键、Canvas、SVG、交互逻辑和物理规律实验室
- `version-history.html`：版本迭代记录

没有使用：

- React
- Vue
- Angular
- Node 构建
- npm 依赖
- CDN
- 后端服务

## 本地运行

直接双击打开：

```text
index.html
```

或使用浏览器打开本仓库的 GitHub Pages 地址：

```text
https://ywyai.github.io/AI-Scientist-Enterprise-Split/
```

## GitHub Pages 部署

当前仓库已经按 GitHub Pages 静态站点配置：

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/root`

仓库根目录即站点根目录，`index.html` 是入口文件。

## 适用场景

- 企业管理层 AI for Science 培训
- 制造业智能化转型讲解
- 工业软件 / 数字孪生 / 工业 AI 方案展示
- 机器人与自动实验室主题演讲
- 大学公开课和科普演示
- 科技馆级互动展示原型

## 设计目标

视觉风格参考 Apple、Tesla、DeepMind 的克制科技感，强调专业、清晰、未来感和大屏可读性。

内容目标不是展示“会聊天的 AI”，而是展示更重要的方向：

> 未来最重要的 AI，不是最会聊天的 AI，而是最会发现规律的 AI。
