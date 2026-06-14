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

## 物理仿真工具学习来源

第24章“物理规律发现实验室”的图例表达参考了多个成熟物理教育与仿真工具的设计思想，但本项目没有直接引入这些项目源码，也不依赖它们运行。

工具范式分层：

| 层级 | 参考工具 | 在本项目中的作用 |
| --- | --- | --- |
| 前端交互 | JSXGraph / CindyJS | 函数曲线、变量滑块、动态几何和交互图表 |
| 物理实验演示 | PhET 思路参考 | 概念探索、参数反馈、教学级互动演示 |
| 真实视频分析 | Tracker | 观测点、实验轨迹、模型曲线和残差检查 |
| 3D 动画 | VPython / Three.js | 空间对象、轨迹运动、WebGL 实时可视化 |
| 公式推导 | SymPy | 符号表达式、方程变换、解析关系 |
| 工程系统仿真 | OpenModelica | 多物理系统、DAE/ODE 求解、状态变量和工程耦合 |

第24章附录已按上述分层重新设计可视化实例：每条规律不再只是统一曲线，而是组合展示物理对象场景、数据点、模型曲线、残差检查、变量标签和工具范式流程。

核心参考工具：

| 工具 | 源码 / 项目地址 | 主要参考方向 |
| --- | --- | --- |
| PhET | https://github.com/phetsims | 教学级互动仿真、参数探索、即时反馈 |
| Tracker | https://github.com/OpenSourcePhysics/tracker | 真实实验视频/轨迹分析、观测点与模型对照 |
| Open Source Physics | https://github.com/OpenSourcePhysics | 物理教育开源生态、可检查的计算模型 |
| VPython | https://github.com/vpython/vpython-jupyter | 浏览器/Jupyter 3D 物理动画、轨迹和空间对象 |
| OpenModelica | https://github.com/OpenModelica/OpenModelica | 工程级多物理系统建模、仿真和求解器语义 |

扩展参考工具：

| 工具 | 源码 / 项目地址 | 本项目借鉴的表达方式 |
| --- | --- | --- |
| PhET | https://github.com/phetsims | 面向教学的概念探索、参数拖动、即时因果反馈 |
| Open Source Physics / OSP | https://github.com/OpenSourcePhysics | 物理教育开源生态、可检查的计算模型结构 |
| Tracker | https://github.com/OpenSourcePhysics/tracker | 真实实验轨迹分析、观测点、模型曲线、残差检查 |
| OSP Core | https://github.com/OpenSourcePhysics/osp | OSP 核心库思想，支撑物理建模与工具复用 |
| EJS / OSP EJS | https://github.com/OpenSourcePhysics/osp_ejs | 交互式物理仿真课件的模型-变量-视图组织方式 |
| EjsS | https://gitlab.com/ejsS | HTML / JavaScript 科学仿真课件生成思路 |
| CircuitJS1 | https://github.com/sharpie7/circuitjs1 | 浏览器电子电路仿真器，适合欧姆定律、基尔霍夫定律、RC/RLC、电容电感、二极管和运放等电路演示 |
| Paul Falstad GitHub | https://github.com/pfalstad | Falstad 电路仿真和其他物理可视化项目来源 |
| JSXGraph | https://github.com/jsxgraph/jsxgraph | 网页交互几何、函数绘图、图表和数据可视化，适合物理公式曲线、变量滑块和交互图表 |
| CindyJS | https://github.com/CindyJS/CindyJS | 网页交互数学框架，适合几何构造、数学关系和物理可视化 |
| SageMath | https://github.com/sagemath/sage | 综合数学系统，适合符号计算、数值计算、建模和可视化 |
| SymPy | https://github.com/sympy/sympy | Python 符号计算库，适合公式推导、方程求解、微积分和物理公式计算 |
| Scilab GitLab | https://gitlab.com/scilab/scilab | 工程数值计算、控制系统和科学计算 |
| VPython Jupyter | https://github.com/vpython/vpython-jupyter | 在 Jupyter / 浏览器中运行 VPython，生成可导航 3D 物理动画 |
| GlowScript / Web VPython | https://github.com/vpython/glowscript | Web 版 VPython，用 WebGL 生成可导航实时 3D 动画 |
| VPython 组织页 | https://github.com/vpython | VPython 相关项目集合 |
| VPython 官网 | https://vpython.org/ | 三维物理对象、运动轨迹、实时变量可视化 |
| OpenModelica 组织页 | https://github.com/OpenModelica | 工程级多物理系统建模仿真生态 |
| OpenModelica 主仓库 | https://github.com/OpenModelica/OpenModelica | Modelica 建模与仿真环境，适合热、流、电、机、控制系统耦合建模 |
| OMPython | https://github.com/OpenModelica/OMPython | Python 调用 OpenModelica 的接口，适合脚本化建模、编译、仿真与参数实验 |
| OpenModelica 官网 | https://openmodelica.org/ | 方程驱动、多物理系统、状态变量与求解器语义 |

因此，附录中的 `PhET-style`、`Tracker-style`、`OSP/EJS-style`、`CircuitJS-style`、`JSXGraph-style`、`CindyJS-style`、`SymPy-style`、`SageMath-style`、`Scilab-style`、`VPython/Three.js-style`、`OpenModelica-style` 表示“图例表达范式”，不是软件依赖声明。其中 `CircuitJS-style` 主要借鉴 Falstad / CircuitJS1 的浏览器电路仿真表达，强调元件拓扑、电压颜色和电流流动；`JSXGraph-style` 主要借鉴交互函数图表、变量滑块和数据可视化；`CindyJS-style` 主要借鉴动态几何构造和可拖动约束关系；`SymPy-style` 主要借鉴符号表达式、方程变换和解析关系；`SageMath-style` 主要借鉴综合数学建模、代数结构、数值计算和可视化；`Scilab-style` 主要借鉴工程数值计算、控制系统和科学计算；`VPython/Three.js-style` 主要借鉴浏览器 3D、WebGL、空间对象、轨迹运动和可导航实时动画表达；`OpenModelica-style` 主要借鉴工程级多物理系统建模，强调 DAE/ODE 求解、状态变量和热-流-电-机-控制系统耦合。

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
