window.AI_SCIENTIST_CONTENT = [
  {
    title:"首页",
    type:"hero",
    time:"2分钟",
    notes:{
      points:["开场问题：为什么苹果、月亮、飞机、机器人都服从规律？","强调本演示关注的不是聊天 AI，而是能发现规律、提出假设、驱动研发的 AI。"],
      question:"如果 AI 能像牛顿一样工作，企业研发会发生什么变化？",
      control:"用首页循环动画建立主线：现象 → 科学家 → 理论 → AI → 新规律。"
    },
    html:`<section class="chapter hero" id="s0">
      <div class="kicker">AI Scientist · From Data To Discovery</div>
      <h1>AI如何像物理学家一样发现物理规律</h1>
      <div class="subtitle">AI Scientist：
从数据到规律
从规律到理论
从理论到创新</div>
      <div class="cycle" id="heroCycle">
        <div class="cycle-node active">苹果下落</div><div class="cycle-arrow">→</div>
        <div class="cycle-node">牛顿</div><div class="cycle-arrow">→</div>
        <div class="cycle-node">引力</div><div class="cycle-arrow">→</div>
        <div class="cycle-node">AI</div><div class="cycle-arrow">→</div>
        <div class="cycle-node">新规律</div>
      </div>
    </section>`
  },
  {
    title:"世界为什么有规律",
    time:"2分钟",
    notes:{points:["第1章不讲牛顿万有引力，而讲伽利略如何把下落现象变成可测量的数据。","对公众展示时，页面文案要直接面向听众，使用实验一、实验二和可见现象，不使用内部分析标签。","自由落体规律表达的是同一条件下的可重复、可预测、可验证，而不是苹果传说本身。"],question:"为什么把下落变慢，反而更容易发现规律？",control:"先点实验一，让观众看到不同重量同时下落；再点实验二，说明斜面让运动变慢、数据可测；最后落到公式 s = 1/2gt²。"},
    html:`<section class="chapter galileo-chapter" id="s1">
      <h2>第1章 世界为什么有规律</h2>
      <div class="galileo-page">
        <div class="galileo-intro">
          <p class="lead">规律，是世界中稳定出现的关系。科学家要找的不是孤立事件，而是在不同时间、地点、条件下仍然成立的结构。</p>
          <div class="galileo-method"><b>伽利略的关键改变</b><span>不是只看见物体下落，而是把下落变成可测量的时间和距离。</span></div>
        </div>
        <div class="galileo-stage split-stage">
          <div class="experiment-window tower-window" role="button" tabindex="0" aria-label="点击演示比萨斜塔落体实验">
            <div class="experiment-title"><b>实验一</b><strong>比萨斜塔落体实验</strong><span>不同重量，同时下落</span></div>
            <div class="experiment-count"><span id="towerCount">0</span><em>次</em></div>
            <div class="window-hint">点击窗口演示</div>
            <div class="tower-demo"><div class="release-platform"></div><div class="drop-guide guide-heavy"></div><div class="drop-guide guide-light"></div><div class="tower"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="tower-ball heavy"></div><div class="tower-ball light"></div></div>
          </div>
          <div class="experiment-window incline-window" role="button" tabindex="0" aria-label="点击演示伽利略斜面实验">
            <div class="experiment-title"><b>实验二</b><strong>斜面实验</strong><span>放慢运动，测量数据</span></div>
            <div class="experiment-count"><span id="inclineCount">0</span><em>次</em></div>
            <div class="window-hint">点击窗口演示</div>
            <div class="incline-demo"><div class="incline-track"><div class="incline-line"></div><div class="track-dot d0"></div><div class="track-dot d1"></div><div class="track-dot d2"></div><div class="incline-ball" id="inclineBall"></div></div><div class="measure m0">t</div><div class="measure m1">2t</div><div class="measure m2">3t</div></div>
          </div>
        </div>
        <div class="galileo-bottom">
          <div class="grid three galileo-principles">
            <div class="card"><div class="metric">01</div><h3>可重复</h3><p class="muted">同样条件下会再次发生。</p></div>
            <div class="card"><div class="metric">02</div><h3>可预测</h3><p class="muted">能提前计算结果。</p></div>
            <div class="card"><div class="metric">03</div><h3>可验证</h3><p class="muted">能被实验检验。</p></div>
          </div>
          <div class="freefall-formula"><b>自由落体规律</b><strong>s = 1/2 · g · t²</strong><em>距离与时间的平方成正比</em><div class="formula-legend compact"><span>s：下落距离</span><span>g：重力加速度</span><span>t：下落时间</span></div></div>
        </div>
      </div>
    </section>`
  },
  {
    title:"牛顿发现引力",
    time:"3分钟",
    notes:{points:["从局部现象走向统一理论。","苹果下落、月亮绕地、地球绕太阳都被同一套引力规律解释，并最终写成数学公式。"],question:"为什么伟大的理论往往能用很短的公式解释很多现象？",control:"按三个现象标签讲：苹果落下、月亮绕地、地球绕日；最后让观众看三条线汇聚到引力公式。"},
    html:`<section class="chapter" id="s2">
      <h2>第2章 牛顿发现引力</h2>
      <div class="grid two">
        <div class="panel gravity-stage"><svg viewBox="0 0 820 470">
          <defs><marker id="gravityArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#00E5FF"/></marker></defs>
          <rect width="820" height="470" fill="#071126"/>
          <circle cx="654" cy="104" r="32" fill="#FFC107"/><g class="orbit-slow"><circle cx="654" cy="104" r="92" fill="none" stroke="#00E5FF55"/><circle cx="746" cy="104" r="15" fill="#4CAF50"/></g>
          <circle cx="456" cy="238" r="46" fill="#1d7bd8"/><g class="orbit"><circle cx="456" cy="238" r="82" fill="none" stroke="#00E5FF66"/><circle cx="538" cy="238" r="13" fill="#ddd"/></g>
          <path d="M105 346 C132 228 166 206 202 118 C228 202 264 228 300 346" fill="none" stroke="#6d4c41" stroke-width="22" stroke-linecap="round"/>
          <circle cx="200" cy="100" r="63" fill="#236b38"/><circle cx="202" cy="154" r="15" fill="#FF5252"><animate attributeName="cy" values="154;336;154" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="118" cy="368" r="27" fill="#B0BEC5"/><rect x="98" y="394" width="42" height="45" rx="12" fill="#263238"/>
          <g class="gravity-rays"><path class="ray-one" d="M206 304 C275 270 318 250 370 232"/><path class="ray-two" d="M538 238 C585 248 610 268 640 304"/><path class="ray-three" d="M724 124 C685 194 665 250 640 304"/></g>
          <g class="gravity-formula"><rect x="310" y="286" width="390" height="116" rx="8"/><text x="505" y="326" text-anchor="middle">F = Gm₁m₂ / r²</text><text x="505" y="357" text-anchor="middle">F引力 · G引力常数 · m质量 · r距离</text><text x="505" y="383" text-anchor="middle">不同现象，同一规律</text></g>
          <g class="gravity-tags"><text class="tag-one" x="126" y="44">苹果落下</text><text class="tag-two" x="382" y="152">月亮绕地</text><text class="tag-three" x="610" y="42">地球绕日</text><text x="82" y="452">牛顿：把现象变成数学模型</text></g>
        </svg></div>
        <div class="panel"><h3>从故事到公式</h3><p class="lead">牛顿的伟大不只是解释苹果为什么落下，而是把地面上的落体和天空中的天体运动放进同一个数学框架。科学发现的核心，是用更少、更深的规律解释更多现象。</p><div class="grid two" style="margin-top:22px"><div class="card"><h3>现象</h3><p class="muted">苹果、月亮、行星看似属于不同世界。</p></div><div class="card"><h3>统一</h3><p class="muted">同一条规律把地面和天空连接起来。</p></div><div class="card"><h3>公式</h3><p class="muted">数学让规律可计算、可预测、可验证。</p></div><div class="card"><h3>理论</h3><p class="muted">理论用更少假设解释更多事实。</p></div></div></div>
      </div>
    </section>`
  },
  {
    title:"数学如何压缩世界",
    time:"3分钟",
    notes:{points:["数学公式的价值，是用极少符号压缩大量现象。","AI Scientist 不是只做预测，而是要找到这种可压缩、可传播、可验证的表达。"],question:"为什么一个短公式能比一堆数据更有价值？",control:"从左侧大量观测点讲起，再看右侧公式如何压缩世界。"},
    html:`<section class="chapter" id="s20"><h2>第3章 数学如何压缩世界</h2><div class="grid two"><div class="compression-field panel"><div class="data-cloud"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="compress-arrow">→</div><div class="law-capsule">F = Gm₁m₂ / r²<div class="formula-legend compact"><span>F：引力</span><span>m：物体质量</span><span>r：两物体距离</span></div></div></div><div class="panel"><h3>从数据到公式</h3><p class="lead">数据记录世界发生了什么，公式解释为什么会这样发生。科学理论的力量，来自把大量现象压缩成少数可计算、可预测、可验证的关系。</p><div class="grid three" style="margin-top:22px"><div class="card"><h3>压缩</h3><p class="muted">用少数符号表达大量现象。</p></div><div class="card"><h3>外推</h3><p class="muted">预测尚未观测到的状态。</p></div><div class="card"><h3>传播</h3><p class="muted">让知识跨实验、跨行业复用。</p></div></div></div></div></section>`
  },
  {
    title:"科学发现流程",
    time:"2分钟",
    notes:{points:["科学不是灵感一闪，而是观察、建模、预测、验证、修正的闭环流程。","AI Scientist 的价值，是把这个闭环加速、放大、自动化，并把失败实验转化为下一轮更好的假设。"],question:"企业研发卡住时，通常卡在观察、建模、验证，还是失败后的修正？",control:"先逐个点击流程块，再讲底部反馈回路：验证失败不是终点，而是新假设的起点。"},
    html:`<section class="chapter" id="s3"><h2>第4章 科学发现流程</h2><div id="flowGrid" class="flow-grid"></div><div class="discovery-feedback panel"><div><strong>验证失败</strong><span>预测和实验不一致</span></div><i>→</i><div><strong>修改假设</strong><span>寻找遗漏变量或错误机制</span></div><i>→</i><div><strong>重新建模</strong><span>让理论更接近真实世界</span></div></div></section>`
  },
  {
    title:"人脑 VS AI",
    time:"2分钟",
    notes:{points:["不要神化 AI，也不要低估 AI。","人类负责意义、目标、跨领域判断；AI 负责规模、搜索、模拟和高维模式识别。"],question:"在企业创新中，哪些工作应该交给人，哪些应该交给 AI？",control:"用左右对比建立互补关系。"},
    html:`<section class="chapter" id="s4">
      <h2>第5章 人脑 VS AI</h2>
      <div class="grid two">
        <div class="panel"><h3>科学家</h3><p class="lead">少量数据中形成直觉，提出高价值问题，进行概念抽象，并判断理论是否有意义。</p><div class="meter"><i></i></div></div>
        <div class="panel"><h3>AI</h3><p class="lead">处理海量数据，搜索复杂组合，运行大规模模拟，发现高维空间中的隐藏模式。</p><div class="meter"><i style="animation-delay:1s"></i></div></div>
      </div>
      <div class="grid four" style="margin-top:24px">
        <div class="card pulse"><h3>观察能力</h3><p class="muted">从仪器和工业系统接收海量信号。</p></div>
        <div class="card pulse"><h3>推理能力</h3><p class="muted">在假设空间中快速排除错误路径。</p></div>
        <div class="card pulse"><h3>抽象能力</h3><p class="muted">把复杂数据压缩成可解释结构。</p></div>
        <div class="card pulse"><h3>预测能力</h3><p class="muted">在实验前预演未来状态。</p></div>
      </div>
    </section>`
  },
  {
    title:"AI如何学习",
    time:"3分钟",
    notes:{points:["神经网络学习的核心是不断降低误差。","输入、参数、输出、Loss、优化，是管理层需要掌握的五个关键词。"],question:"AI 的“学习”更像背答案，还是调参数？",control:"观察 Epoch 增加和 Loss 下降。"},
    html:`<section class="chapter" id="s5"><h2>第6章 AI如何学习</h2><div class="grid two"><svg id="networkSvg" class="network" viewBox="0 0 720 340"></svg><div class="panel"><h3>实时训练</h3><p class="lead">Epoch：<span id="epoch" class="accent">0</span></p><p class="lead">Loss：<span id="loss" class="green">1.000</span></p><div class="meter"><i id="lossBar"></i></div><p class="lead" style="margin-top:18px">AI 通过参数优化，让预测结果越来越接近真实数据。</p></div></div></section>`
  },
  {
    title:"数据拟合",
    time:"3分钟",
    notes:{points:["数据拟合是从数据到模式的第一步。","模式很有价值，但模式不自动等于理论。"],question:"为什么一条拟合曲线还不是物理规律？",control:"拖动蓝色数据点，观察拟合公式变化。"},
    html:`<section class="chapter" id="s6"><h2>第7章 数据拟合</h2><div class="grid two"><canvas id="fitCanvas" class="canvas-box" width="900" height="520"></canvas><div class="panel"><h3>AI发现模式</h3><p class="lead">拖动数据点，系统自动拟合曲线。这里演示的是从观测数据到数学关系的第一步。</p><div class="formula" id="fitFormula" style="margin-top:22px">y = ax² + bx + c</div><div class="formula-legend"><span>y：预测结果</span><span>x：输入变量</span><span>a / b / c：拟合得到的参数</span></div></div></div></section>`
  },
  {
    title:"关联与因果",
    time:"2分钟",
    notes:{points:["相关不是因果。","工业 AI 最危险的误判之一，是把共同原因造成的相关当作直接因果。"],question:"企业指标一起上升，就一定互相导致吗？",control:"点击第二个选项揭晓。"},
    html:`<section class="chapter" id="s7"><h2>第8章 关联与因果</h2><div class="grid two"><div class="panel"><h3>经典案例</h3><p class="lead">夏天冰淇淋销量上升，溺水人数也上升。冰淇淋导致溺水吗？</p><button class="quiz-option" data-good="false">是，冰淇淋导致溺水</button><button class="quiz-option" data-good="true">不是，背后共同原因是高温</button><div id="causalAnswer" class="answer">答案：二者相关，但真正的因果变量是气温。AI Scientist 必须从相关走向因果，才能形成可靠理论。</div></div><svg viewBox="0 0 620 380"><rect width="620" height="380" fill="#071126"/><polyline points="50,300 120,250 190,200 260,160 330,120 400,90 520,70" fill="none" stroke="#00E5FF" stroke-width="5"/><polyline points="50,310 120,275 190,230 260,190 330,145 400,110 520,95" fill="none" stroke="#FF5252" stroke-width="5"/><text x="70" y="60" fill="#00E5FF" font-size="22">冰淇淋销量</text><text x="70" y="95" fill="#FF5252" font-size="22">溺水人数</text><text x="250" y="340" fill="#FFC107" font-size="26">隐藏变量：气温</text></svg></div></section>`
  },
  {
    title:"符号回归",
    time:"2分钟",
    notes:{points:["符号回归是在公式空间中搜索，不只是拟合曲线。","好的科学公式要同时满足准确、简洁、可解释。"],question:"企业更需要预测准确，还是公式可解释？不同场景答案不同。",control:"先看公式不断组合，再看三条评分；最后强调正确公式不是最长的，而是准确且简洁的。"},
    html:`<section class="chapter" id="s8"><h2>第9章 符号回归</h2><div class="symbolic-lab panel"><p class="lead">AI 在公式空间中搜索：运算符、变量、常数不断组合，直到找到既准确又简洁的表达式。</p><div class="formula" id="formulaSearch">y = ?</div><div class="formula-legend" id="formulaLegend"><span>y：待解释的观测结果</span><span>?：尚未确定的候选公式</span></div><div class="score-bars"><div><span>Accuracy</span><i id="accuracyScore" style="--w:42%"></i></div><div><span>Simplicity</span><i id="simplicityScore" style="--w:55%"></i></div><div><span>Explainability</span><i id="explainScore" style="--w:48%"></i></div></div><div id="formulaVerdict" class="formula-verdict">搜索公式空间...</div></div></section>`
  },
  {
    title:"AI真实发现规律案例",
    time:"4分钟",
    notes:{points:["第10章是证据页，不是名词列表：它把前面的拟合、符号回归、科学流程落到真实 AI for Science 方法。","三类证据路径分别是：轨迹到方程、数据到公式、约束到可信物理模型。","讲完这一页后，要自然过渡到第11章：真实工程系统有工况、边界和守恒，因此需要 Physics Informed AI。"],question:"如果 AI 能从轨迹、数据和约束中恢复规律，企业研发最先会被改变的是仿真、实验，还是工艺优化？",control:"按三条证据路径讲：先说明承接前面哪个章节，再说明证明了什么能力，最后指出它导向后面的工程物理系统。"},
    html:`<section class="chapter evidence-chapter" id="s21"><h2>第10章 AI真实发现规律案例</h2><div class="evidence-intro panel"><strong>这一章的作用：把“AI 能拟合数据”推进到“AI 能恢复规律”。</strong><span>三类案例分别证明：轨迹可以恢复方程，数据可以搜索公式，物理约束可以让模型可信。</span></div><div class="grid three evidence-grid"><div class="case-card panel"><div class="case-path">轨迹 → 方程</div><div class="metric">SINDy</div><h3>从运动轨迹恢复动力学</h3><div class="chapter-jumps"><button type="button" data-goto="s6">对应第7章 数据拟合</button></div><p class="muted">当系统状态随时间变化，AI 可以从轨迹中寻找稀疏、可解释的动力学方程。</p><div class="mini-formula">ẋ = f(x)</div><div class="formula-legend compact"><span>ẋ：状态变化率</span><span>x：系统状态</span></div><div class="case-proof"><b>证明能力</b><span>从“看到运动”走向“写出方程”。</span></div></div><div class="case-card panel"><div class="case-path">数据 → 公式</div><div class="metric">符号回归</div><h3>从实验数据搜索表达式</h3><div class="chapter-jumps"><button type="button" data-goto="s8">对应第9章 符号回归</button></div><p class="muted">AI 在运算符、变量和常数空间中搜索，找到准确、简洁、可解释的公式。</p><div class="mini-formula">y = 1/2gt²</div><div class="formula-legend compact"><span>y：观测距离</span><span>g：重力加速度</span><span>t：时间</span></div><div class="case-proof"><b>证明能力</b><span>从“拟合曲线”走向“发现公式”。</span></div></div><div class="case-card panel"><div class="case-path">约束 → 可信模型</div><div class="metric">PINN</div><h3>从物理约束学习系统</h3><div class="chapter-jumps"><button type="button" data-goto="s9">导向第11章 工程工况</button></div><p class="muted">当数据稀疏或需要外推时，把方程残差和边界条件写进 Loss，限制模型不能违反物理。</p><div class="mini-formula">L = Ld + Lp</div><div class="formula-legend compact"><span>L：总误差</span><span>Ld：数据误差</span><span>Lp：物理误差</span></div><div class="case-proof"><b>证明能力</b><span>从“像数据”走向“符合物理”。</span></div></div></div><div class="evidence-bridge panel"><span>前面：</span><button type="button" data-goto="s6">拟合</button><button type="button" data-goto="s7">因果</button><button type="button" data-goto="s8">符号回归</button><b>→</b><strong>第10章：真实方法证据</strong><b>→</b><button type="button" data-goto="s9">PINN</button><button type="button" data-goto="s10">世界模型</button><button type="button" data-goto="s11">数字孪生</button></div></section>`
  },
  {
    title:"Physics Informed AI",
    time:"3分钟",
    notes:{points:["PINN 的核心不是多喂数据，而是把物理方程、边界条件和守恒约束写进 Loss。","工程仿真中，普通 AI 可能拟合数据却违反物理；PINN 把预测拉回物理可行区域。"],question:"为什么制造业 AI 不能只靠大数据，还必须懂物理？",control:"先讲左侧普通 AI 的红色错误流线，再讲右侧 PINN 的三类约束，最后用底部公式收束：Loss = 数据误差 + 物理误差 + 边界误差。"},
    html:`<section class="chapter pinn-chapter" id="s9"><h2>第11章 Physics Informed AI</h2><div class="pinn-scenario panel"><div><b>实际工况：机翼流场预测</b><span>速度 70m/s · 攻角 8° · 机翼表面不可穿透 · 压力传感器稀疏采样</span></div><div><b>工程目标</b><span>预测压力分布、升阻力、边界层分离风险，并保证结果符合守恒定律。</span></div></div><div class="pinn-board"><div class="pinn-card panel bad"><div class="pinn-head"><h3>普通 AI</h3><span>Data Only</span></div><svg class="pinn-svg" viewBox="0 0 560 320"><rect width="560" height="320" fill="#071126"/><path class="airfoil" d="M70 168 C170 62 360 70 500 168 C365 150 190 150 70 168Z"/><g class="bad-flow"><path d="M38 112 C170 180 285 72 520 138"/><path d="M38 178 C170 98 330 260 520 160"/><path d="M38 235 C180 130 300 292 520 206"/></g><g class="warning-tags"><text x="58" y="44">传感器点拟合</text><text x="310" y="288">流线可能穿透机翼</text></g><circle cx="238" cy="168" r="9" fill="#FF5252"><animate attributeName="r" values="6;14;6" dur="1.6s" repeatCount="indefinite"/></circle></svg><p class="lead">当工况改变或传感器稀疏时，模型可能只贴合历史数据，却给出违反边界和守恒的流场。</p><div class="constraint-chips muted"><span>训练点误差低</span><span class="red">外推风险高</span><span class="red">物理约束弱</span></div></div><div class="pinn-card panel good"><div class="pinn-head"><h3>PINN</h3><span>Physics Informed</span></div><svg class="pinn-svg" viewBox="0 0 560 320"><rect width="560" height="320" fill="#071126"/><path class="airfoil" d="M70 168 C170 62 360 70 500 168 C365 150 190 150 70 168Z"/><g class="good-flow"><path d="M38 116 C154 88 360 88 520 126"/><path d="M38 166 C160 132 365 132 520 166"/><path d="M38 224 C165 196 365 196 520 214"/></g><g class="constraint-labels"><text x="58" y="44">Navier-Stokes</text><text x="232" y="288">Conservation</text><text x="390" y="44">No-penetration</text></g><circle cx="408" cy="166" r="8" fill="#4CAF50"><animate attributeName="cx" values="126;408;500" dur="3s" repeatCount="indefinite"/></circle></svg><p class="lead">PINN 把流体方程、质量守恒、边界条件和传感器数据一起优化，让预测从“像数据”变成“像真实物理系统”。</p><div class="constraint-chips"><span>传感器数据</span><span>控制方程</span><span>守恒关系</span><span>边界条件</span></div></div></div><div class="pinn-equation panel"><strong>Loss</strong><span>=</span><b>Data Loss</b><span>+</span><b>Physics Loss</b><span>+</span><b>Boundary Loss</b><em>Data Loss：传感器与仿真数据误差 · Physics Loss：流体方程残差 · Boundary Loss：机翼表面与入口出口边界误差</em></div></section>`
  },
  {
    title:"世界模型",
    time:"2分钟",
    notes:{points:["世界模型承接第11章：有了物理约束以后，AI 还要能在内部推演未来状态。","它导向第13章数字孪生和机器人应用：不是只预测一个点，而是预测行动后的系统演化。"],question:"机器人为什么不能只会识别物体，还必须预测物理后果？",control:"先讲逻辑条：物理约束之后是未来推演；再观察小球碰撞与轨迹预测。"},
    html:`<section class="chapter" id="s10"><h2>第12章 世界模型 World Model</h2><div class="logic-strip panel"><button type="button" data-goto="s9">承接第11章：物理约束</button><b>→</b><strong>本章：在内部模拟未来</strong><b>→</b><button type="button" data-goto="s11">导向第13章：数字孪生</button></div><div class="grid two"><canvas id="worldCanvas" class="canvas-box" width="900" height="520"></canvas><div class="panel"><h3>从观察到预测</h3><p class="lead">世界模型不是只识别画面，而是在内部模拟“如果我这样行动，世界会怎样变化”。</p><div class="world-legend"><span><i class="cyan-dot"></i>真实运动</span><span><i class="amber-dot"></i>AI预测轨迹</span><span><i class="green-dot"></i>结果反馈</span></div><div class="grid three" style="margin-top:20px"><div class="card"><h3>状态</h3><p class="muted">物体位置、速度、接触关系。</p></div><div class="card"><h3>动作</h3><p class="muted">推、抓、放、碰撞、移动。</p></div><div class="card"><h3>未来</h3><p class="muted">预测下一秒会发生什么。</p></div></div></div></div></section>`
  },
  {
    title:"数字孪生",
    time:"2分钟",
    notes:{points:["数字孪生不只是看板，而是现实工厂和虚拟工厂之间的实时闭环。","传感器、MES、PLM、CAE、SCADA 与 AI 平台打通后，企业才能预测质量、能耗、故障和产能。"],question:"你的工厂数据是记录过去，还是预测未来？",control:"先讲左侧现实工厂，再讲数据流进入虚拟工厂，最后讲 AI 预测结果反向优化生产。"},
    html:`<section class="chapter" id="s11"><h2>第13章 数字孪生</h2><div class="grid two"><div class="digital-twin panel"><svg viewBox="0 0 760 500"><defs><marker id="twinArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#00E5FF"/></marker></defs><rect width="760" height="500" fill="#071126"/><text x="150" y="52" fill="#fff" font-size="24" font-weight="800" text-anchor="middle">现实工厂</text><text x="565" y="52" fill="#00E5FF" font-size="24" font-weight="800" text-anchor="middle">虚拟工厂</text><g class="factory-svg"><rect x="72" y="250" width="250" height="130" rx="8"/><path d="M72 250 L122 205 L172 250 L222 205 L272 250 Z"/><rect x="112" y="292" width="42" height="88"/><rect x="184" y="292" width="42" height="88"/><rect x="256" y="292" width="42" height="88"/><circle cx="106" cy="230" r="10"/><circle cx="200" cy="226" r="10"/><circle cx="294" cy="230" r="10"/></g><g class="twin-ghost"><rect x="462" y="220" width="250" height="160" rx="10"/><path d="M462 220 L512 174 L562 220 L612 174 L662 220 Z"/><rect x="510" y="268" width="44" height="112"/><rect x="585" y="268" width="44" height="112"/><rect x="660" y="268" width="44" height="112"/></g><g class="twin-data"><path d="M132 230 C260 118 370 118 505 205"/><path d="M200 226 C290 160 420 160 590 215"/><path d="M294 230 C385 270 460 285 590 300"/><path d="M625 380 C500 446 295 432 145 380"/></g><g class="twin-tags"><text x="92" y="430">传感器</text><text x="196" y="430">MES</text><text x="300" y="430">SCADA</text><text x="480" y="430">CAE</text><text x="585" y="430">PLM</text><text x="680" y="430">AI</text></g><g class="twin-alerts"><g style="--d:0s"><rect x="486" y="82" width="148" height="34" rx="8"/><text x="560" y="105">质量风险 82%</text></g><g style="--d:.55s"><rect x="500" y="126" width="148" height="34" rx="8"/><text x="574" y="149">能耗异常 +12%</text></g><g style="--d:1.1s"><rect x="514" y="170" width="148" height="34" rx="8"/><text x="588" y="193">设备预警 36h</text></g></g><text x="265" y="128" fill="#FFC107" font-size="20" font-weight="900" text-anchor="middle">数据流 → 预测 → 优化 → 反馈</text></svg></div><div class="panel"><h3>从看板到可推演平台</h3><p class="lead">数字孪生让企业在真实生产前先在数字空间中试错：预测故障、优化能耗、评估质量风险，并把最优策略反馈给现实产线。</p><div class="twin-status"><div><b>质量风险</b><span>82%</span><i style="--w:82%"></i></div><div><b>能耗偏差</b><span>+12%</span><i class="warn" style="--w:62%"></i></div><div><b>维护窗口</b><span>36h</span><i class="safe" style="--w:76%"></i></div></div><div class="grid two" style="margin-top:18px"><div class="card"><div class="metric">预测</div><h3>质量波动</h3><p class="muted">提前识别异常趋势。</p></div><div class="card"><div class="metric">优化</div><h3>能耗与节拍</h3><p class="muted">在虚拟产线中推演方案。</p></div><div class="card"><div class="metric">预警</div><h3>设备故障</h3><p class="muted">从停机维修转向预测维护。</p></div><div class="card"><div class="metric">闭环</div><h3>工艺反馈</h3><p class="muted">把结果回流到设计和制造。</p></div></div></div></div></section>`
  },
  {
    title:"AI Scientist",
    time:"3分钟",
    notes:{points:["AI Scientist 是自动科研闭环，不只是机器人做实验。","核心链条是：提出假设、设计实验、机器人执行、采集数据、更新模型、生成理论。"],question:"企业实验室中哪些环节最适合先自动化？",control:"先讲中心 AI 大脑，再沿六个节点顺时针讲完整闭环。"},
    html:`<section class="chapter" id="s12"><h2>第14章 AI Scientist</h2><div class="grid two"><div class="scientist-loop panel"><div class="loop-core"><strong>AI Scientist</strong><span id="loopStatus">自动科研大脑</span></div><div class="loop-node" data-loop="提出假设" style="--a:-90deg;--b:90deg"><b>提出假设</b><span>生成可验证问题</span></div><div class="loop-node" data-loop="设计实验" style="--a:-30deg;--b:30deg"><b>设计实验</b><span>选择变量与方案</span></div><div class="loop-node" data-loop="机器人执行" style="--a:30deg;--b:-30deg"><b>机器人执行</b><span>机械臂与实验平台</span></div><div class="loop-node" data-loop="采集数据" style="--a:90deg;--b:-90deg"><b>采集数据</b><span>传感器与仪器流</span></div><div class="loop-node" data-loop="更新模型" style="--a:150deg;--b:-150deg"><b>更新模型</b><span>拟合、推断、修正</span></div><div class="loop-node" data-loop="形成理论" style="--a:210deg;--b:-210deg"><b>形成理论</b><span>规律、公式、机制</span></div><svg class="loop-svg" viewBox="0 0 620 520"><defs><marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#00E5FF"/></marker></defs><circle cx="310" cy="260" r="176" fill="none" stroke="#00E5FF44" stroke-width="3" stroke-dasharray="8 10"/><path class="flow-ring" d="M310 84 A176 176 0 1 1 309 84" fill="none" stroke="#00E5FF" stroke-width="4" marker-end="url(#arrowCyan)"/></svg></div><div class="panel"><h3>从工具到科研主体</h3><p class="lead">AI Scientist 的价值不是替代某一个软件，而是把科学发现闭环自动化：它能提出问题、安排实验、读取结果，并把失败实验转化为下一轮更好的假设。</p><div class="grid two" style="margin-top:22px"><div class="card"><div class="metric">10x</div><h3>假设搜索</h3><p class="muted">同时探索更多候选机制。</p></div><div class="card"><div class="metric">24h</div><h3>连续实验</h3><p class="muted">机器人实验室持续迭代。</p></div><div class="card"><div class="metric">↓</div><h3>失败成本</h3><p class="muted">先仿真、再实验、再放大。</p></div><div class="card"><div class="metric">↑</div><h3>理论产出</h3><p class="muted">从数据中提炼可解释规律。</p></div></div></div></div></section>`
  },
  {
    title:"自动实验室系统架构",
    time:"4分钟",
    notes:{points:["AI Scientist 真正落地，需要目标、理论库、仿真系统、实验设计、安全审核、机器人实验平台、仪器检测、LIMS 数据平台和模型更新协同。","这一章把第14章的概念闭环展开成可执行系统架构：AI 不是直接做实验，而是在安全边界内调度实验、读取数据、更新模型、进入下一轮主动学习。","安全审核、人机确认和 LIMS/实验数据平台是企业级自动实验室区别于演示原型的关键。"],question:"企业要建设自动实验室，最先缺的是机器人设备、实验数据闭环、模型更新能力，还是安全审核机制？",control:"按闭环箭头讲：科研目标 → AI Scientist → 理论库 → 仿真筛选 → 实验设计 → 安全审核 → 机器人实验平台 → 仪器检测 → LIMS/实验数据平台 → 模型更新/主动学习 → 下一轮。"},
    html:`<section class="chapter" id="s22"><h2>第15章 自动实验室系统架构</h2><div class="lab-architecture panel"><svg viewBox="0 0 1120 560"><defs><marker id="labArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#00E5FF"/></marker></defs><rect width="1120" height="560" fill="#071126"/><g opacity=".62"><rect x="48" y="82" width="1024" height="132" rx="10" fill="#00E5FF" opacity=".045" stroke="#00E5FF" stroke-opacity=".18"/><rect x="48" y="292" width="1024" height="132" rx="10" fill="#FFC107" opacity=".045" stroke="#FFC107" stroke-opacity=".18"/></g><g fill="#B0BEC5" font-size="15" font-weight="900"><text x="64" y="70">规划与设计闭环</text><text x="64" y="280">执行与学习闭环</text></g><g class="lab-boxes"><rect x="70" y="112" width="160" height="64" rx="8"/><text x="150" y="136"><tspan x="150" dy="0">科研目标</tspan><tspan x="150" dy="20">业务约束</tspan></text><rect x="275" y="112" width="160" height="64" rx="8"/><text x="355" y="136"><tspan x="355" dy="0">AI Scientist</tspan><tspan x="355" dy="20">假设生成</tspan></text><rect x="480" y="112" width="160" height="64" rx="8"/><text x="560" y="136"><tspan x="560" dy="0">理论库 /</tspan><tspan x="560" dy="20">文献库</tspan></text><rect x="685" y="112" width="160" height="64" rx="8"/><text x="765" y="146">仿真筛选</text><rect x="890" y="112" width="160" height="64" rx="8"/><text x="970" y="136"><tspan x="970" dy="0">实验设计</tspan><tspan x="970" dy="20">变量与配方</tspan></text><rect x="890" y="320" width="160" height="64" rx="8"/><text x="970" y="356">安全审核</text><rect x="685" y="320" width="160" height="64" rx="8"/><text x="765" y="344"><tspan x="765" dy="0">机器人</tspan><tspan x="765" dy="20">实验平台</tspan></text><rect x="480" y="320" width="160" height="64" rx="8"/><text x="560" y="344"><tspan x="560" dy="0">仪器检测</tspan><tspan x="560" dy="20">传感器采集</tspan></text><rect x="275" y="320" width="160" height="64" rx="8"/><text x="355" y="344"><tspan x="355" dy="0">LIMS /</tspan><tspan x="355" dy="20">实验数据平台</tspan></text><rect x="70" y="320" width="160" height="64" rx="8"/><text x="150" y="344"><tspan x="150" dy="0">模型更新 /</tspan><tspan x="150" dy="20">主动学习</tspan></text></g><g class="lab-lines"><path d="M230 144 H275"/><path d="M435 144 H480"/><path d="M640 144 H685"/><path d="M845 144 H890"/><path d="M970 176 V320"/><path d="M890 352 H845"/><path d="M685 352 H640"/><path d="M480 352 H435"/><path d="M275 352 H230"/><path d="M150 320 V176"/></g><g fill="#B0BEC5" font-size="14" font-weight="800" text-anchor="middle"><text x="560" y="452">执行结果回流：实验记录、元数据、失败样本、模型误差与下一轮候选实验</text></g><text x="560" y="506" fill="#00E5FF" font-size="18" font-weight="900" text-anchor="middle">目标 → 假设 → 理论库 → 仿真筛选 → 实验设计 → 安全审核</text><text x="560" y="534" fill="#FFC107" font-size="18" font-weight="900" text-anchor="middle">机器人实验平台 → 仪器检测 → LIMS/数据平台 → 模型更新/主动学习 → 下一轮实验</text></svg></div></section>`
  },
  {
    title:"AI发现新材料",
    time:"1分钟",
    notes:{points:["第16章承接自动实验室系统架构：材料发现是自动科研闭环最容易理解的高价值场景。","材料空间巨大，AI 的价值是把盲目试错变成候选结构的智能排序。"],question:"新材料研发中，最贵的是算力、实验，还是试错时间？",control:"先讲它是自动实验室的落地场景，再用 10000 → 100 → 10 → 实验 的漏斗快速讲完。"},
    html:`<section class="chapter" id="s13"><h2>第16章 AI发现新材料</h2><div class="logic-strip panel"><button type="button" data-goto="s22">承接第15章：自动实验室</button><b>→</b><strong>材料空间高通量搜索</strong><b>→</b><span>候选结构进入仿真与实验验证</span></div><div class="grid two"><div class="panel"><svg viewBox="0 0 620 420"><rect width="620" height="420" fill="#071126"/><g id="atoms"></g><text x="132" y="382" fill="#FFC107" font-size="28" font-weight="800">从材料空间到实验验证</text></svg></div><div class="panel"><h3>高通量材料筛选</h3><p class="lead">AI 先预测强度、导电性、热稳定性和成本，再把最值得做实验的候选结构排到前面。</p><div class="funnel"><div><b>10000+</b><span>候选结构</span></div><div><b>100</b><span>性能预测通过</span></div><div><b>10</b><span>进入仿真验证</span></div><div><b>1-3</b><span>实验合成</span></div></div><div class="material-scores"><div><span>强度</span><i style="--w:86%"></i></div><div><span>导电性</span><i style="--w:74%"></i></div><div><span>热稳定性</span><i style="--w:91%"></i></div><div><span>成本风险</span><i class="risk" style="--w:38%"></i></div></div></div></div></section>`
  },
  {
    title:"AI发现新药",
    time:"1分钟",
    notes:{points:["第17章与第16章并列：一个讲材料空间搜索，一个讲分子空间搜索。","新药发现不是只生成分子，还要经过靶点对接、毒性过滤、可制造性和实验验证。"],question:"如果筛选速度提升 100 倍，药企组织方式会怎样变化？",control:"先说明它和新材料同属高维候选空间搜索，再讲蛋白质结合和三条指标。"},
    html:`<section class="chapter" id="s14"><h2>第17章 AI发现新药</h2><div class="logic-strip panel"><button type="button" data-goto="s13">承接第16章：高维搜索</button><b>→</b><strong>分子生成与靶点匹配</strong><b>→</b><span>毒性、可制造性与实验验证</span></div><div class="grid two"><div class="panel"><svg viewBox="0 0 620 420"><rect width="620" height="420" fill="#071126"/><path d="M115 220 C180 80 250 355 320 210 S470 95 525 230" fill="none" stroke="#00E5FF" stroke-width="10"/><g class="orbit"><circle cx="330" cy="210" r="85" fill="none" stroke="#4CAF5055"/><circle cx="415" cy="210" r="18" fill="#FFC107"/></g><g fill="none" stroke="#FFC107" stroke-width="4"><circle cx="430" cy="190" r="16"/><circle cx="462" cy="210" r="12"/><line x1="430" y1="190" x2="462" y2="210"/></g><text x="140" y="360" fill="#fff" font-size="28">蛋白质 × 药物分子</text></svg></div><div class="panel"><h3>自动候选药筛选</h3><p class="lead">AI 生成候选分子，预测结合能力、毒性和可制造性，把早期研发从盲目试错转向智能搜索。</p><div class="drug-pipeline"><div><b>生成</b><span>候选分子</span></div><div><b>对接</b><span>蛋白靶点</span></div><div><b>过滤</b><span>毒性 / ADMET</span></div><div><b>验证</b><span>实验候选</span></div></div><div class="drug-metrics"><div><span>结合亲和力</span><i style="--w:88%"></i></div><div><span>毒性风险</span><i style="--w:34%" class="risk"></i></div><div><span>可制造性</span><i style="--w:72%"></i></div></div></div></div></section>`
  },
  {
    title:"AI发现物理规律",
    time:"2分钟",
    notes:{points:["从已知规律走向未知规律。","企业竞争会从使用工具，转向发现机制和创造新理论。"],question:"未来真正稀缺的是模型，还是能提出新机制的数据闭环？",control:"让公式显现动画跑一轮，再强调 Data → Pattern → Law → Theory → Innovation。"},
    html:`<section class="chapter" id="s15"><h2>第18章 AI发现物理规律</h2><div class="law-discovery panel"><div><p class="lead">未来的 AI 不只是回答问题，而是提出可验证的新规律：未知材料、未知能源、未知物理机制。它会把科学探索从人类直觉驱动，推进到人机协同的高维搜索。</p><div class="formula" style="margin-top:22px">Data → Pattern → Law → Theory → Innovation</div><div class="formula-legend"><span>Data：实验与仿真数据</span><span>Pattern：稳定模式</span><span>Law：可计算规律</span><span>Theory：可解释理论</span><span>E = ?：待发现的能量或机制关系</span></div></div><div class="law-field"><span>∂ψ/∂t</span><span>∇·E</span><span>ΣF=ma</span><span>未知机制</span><strong>E = ?</strong><em>New Law</em></div></div></section>`
  },
  {
    title:"AI for Science全景图",
    time:"3分钟",
    notes:{points:["AI for Science 横跨基础学科、产业应用和科研基础设施。","全景图可拖拽缩放，适合产业论坛现场讲解。","推荐路径从物理规律出发，连接材料、制造业、工业软件、自动实验室与世界模型，形成从科学发现到产业闭环的叙事主线。"],question:"你的行业在这张图中的位置在哪里？",control:"先讲中心 AI for Science，再沿金色推荐路径讲：物理规律、材料发现、制造闭环、工业软件、自动实验室、世界模型。"},
    html:`<section class="chapter map-chapter" id="s16"><h2>第19章 AI for Science 全景图</h2><div class="map-shell"><div class="map-legend"><span><i class="cyan-dot"></i>基础学科</span><span><i class="green-dot"></i>产业应用</span><span><i class="amber-dot"></i>科研基础设施</span><span class="guide-legend"><i></i>推荐讲解路径</span></div><div class="stage map" id="mapStage"><div class="map-inner" id="mapInner"></div></div></div></section>`
  },
  {
    title:"工业人工智能融合路线图：从系统底座到反馈闭环",
    time:"4分钟",
    notes:{points:["第20章现在表达的是企业可执行路线：先接入工业软件与自动化系统，再建立统一对象模型和跨系统贯通。这里的工业软件与自动化系统包括 CAD、CAE、EDA、PLM、MES、SCADA、PLC 等企业已有系统。","预测优化的前置是目标与约束、数字孪生/机理模型、工业 AI 预测模型和模型验证，不能跳过验证直接控制产线。","进入生产执行前必须有人机审核和执行系统承接，执行结果回流后才形成持续优化闭环。"],question:"你的企业当前卡在哪一步：对象模型、系统贯通、目标约束、模型验证，还是执行反馈？",control:"按两行闭环讲：上排从左到右讲系统与治理前置，下排从右到左讲建模、验证、审核、执行和反馈回流。不把 AI 当成单点工具，而把它放进受控工程闭环。第一步先讲工业软件与自动化系统，再用 CAD/CAE/EDA/PLM/MES/SCADA/PLC 举例，重点强调：没有目标约束和模型验证，就不能进入执行系统。"},
    html:`<section class="chapter" id="s17"><h2>第20章 工业人工智能融合路线图：从系统底座到反馈闭环</h2><div class="route-map panel"><svg data-route-version="enterprise-executable" viewBox="0 0 1180 560"><defs><marker id="routeArrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#FFC107"/></marker></defs><rect width="1180" height="560" fill="#071126"/><g opacity=".66"><rect x="58" y="88" width="1064" height="132" rx="10" fill="#00E5FF" opacity=".045" stroke="#00E5FF" stroke-opacity=".18"/><rect x="58" y="298" width="1064" height="132" rx="10" fill="#FFC107" opacity=".045" stroke="#FFC107" stroke-opacity=".18"/></g><g fill="#B0BEC5" font-size="15" font-weight="900"><text x="76" y="76">系统与治理闭环</text><text x="76" y="286">建模与执行闭环</text></g><g class="route-stage" text-anchor="middle" font-size="15" font-weight="900"><text x="160" y="54">阶段1 工业底座</text><text x="390" y="54">阶段2 对象治理</text><text x="620" y="54">阶段3 系统贯通</text><text x="850" y="54">阶段4 目标约束</text><text x="1040" y="54">阶段5 孪生建模</text></g><g class="route-boxes" text-anchor="middle" font-size="16" font-weight="800"><rect x="70" y="122" width="180" height="64" rx="8"/><text x="160" y="146"><tspan x="160" dy="0">工业软件与</tspan><tspan x="160" dy="20">自动化系统</tspan></text><rect x="300" y="122" width="180" height="64" rx="8"/><text x="390" y="156">统一对象模型</text><rect x="530" y="122" width="180" height="64" rx="8"/><text x="620" y="156">系统贯通</text><rect x="760" y="122" width="180" height="64" rx="8"/><text x="850" y="156">目标与约束</text><rect x="950" y="122" width="160" height="64" rx="8"/><text x="1030" y="146"><tspan x="1030" dy="0">数字孪生 /</tspan><tspan x="1030" dy="20">机理模型</tspan></text><rect x="950" y="330" width="160" height="64" rx="8"/><text x="1030" y="354"><tspan x="1030" dy="0">工业AI</tspan><tspan x="1030" dy="20">预测模型</tspan></text><rect x="760" y="330" width="180" height="64" rx="8"/><text x="850" y="366">模型验证</text><rect x="530" y="330" width="180" height="64" rx="8"/><text x="620" y="366">人机审核</text><rect x="300" y="330" width="180" height="64" rx="8"/><text x="390" y="366">执行系统</text><rect x="70" y="330" width="180" height="64" rx="8"/><text x="160" y="366">反馈闭环</text></g><g class="route-lines"><path d="M250 154 H300"/><path d="M480 154 H530"/><path d="M710 154 H760"/><path d="M940 154 H950"/><path d="M1030 186 V330"/><path d="M950 362 H940"/><path d="M760 362 H710"/><path d="M530 362 H480"/><path d="M300 362 H250"/><path d="M160 330 V186"/></g><g fill="#B0BEC5" font-size="14" font-weight="800" text-anchor="middle"><text x="590" y="458">反馈回流：执行结果修正对象模型、目标约束、预测模型和验证基线</text></g><text x="590" y="508" fill="#00E5FF" font-size="18" font-weight="900" text-anchor="middle">工业软件与自动化系统 → 统一对象模型 → 系统贯通 → 目标与约束 → 数字孪生/机理模型</text><text x="590" y="536" fill="#FFC107" font-size="18" font-weight="900" text-anchor="middle">工业AI预测模型 → 模型验证 → 人机审核 → 执行系统 → 反馈闭环</text></svg></div></section>`
  },
  {
    title:"企业落地方法论",
    time:"5分钟",
    notes:{points:["企业导入 AI Scientist 不能一步到位，应从数据闭环、仿真闭环、实验闭环逐步升级。","管理层需要的是路线，而不是单点工具；90 天试点可以把概念变成第一个可验证成果。"],question:"你的企业现在处在数据闭环、模型闭环，还是实验闭环？",control:"先讲四个闭环，再讲 90 天试点计划：选场景、建基线、跑闭环。每个阶段都要讲清交付物和验收门槛，避免停留在口号。"},
    html:`<section class="chapter" id="s23"><h2>第21章 企业落地方法论</h2><div class="enterprise-road panel"><div class="enterprise-step"><b>1</b><h3>数据闭环</h3><p>打通传感器、实验记录、仿真结果和业务指标。</p></div><div class="enterprise-step"><b>2</b><h3>模型闭环</h3><p>建立可验证的预测模型，而不是只做报表。</p></div><div class="enterprise-step"><b>3</b><h3>实验闭环</h3><p>让 AI 推荐实验，实验结果反向更新模型。</p></div><div class="enterprise-step"><b>4</b><h3>组织闭环</h3><p>让研发、工艺、制造、软件团队围绕规律发现协同。</p></div></div><div class="pilot-plan panel"><h3>90 天试点计划</h3><div class="pilot-steps"><div><b>0-30天</b><strong>选择场景</strong><p>选一个高价值问题：质量、能耗、材料、工艺或故障预测。</p><em>交付：场景清单、数据字典、业务指标。</em></div><div><b>31-60天</b><strong>建立基线</strong><p>打通数据，建立可验证模型，明确当前误差和业务指标。</p><em>交付：基线模型、误差报告、验证样本。</em></div><div><b>61-90天</b><strong>跑通闭环</strong><p>让 AI 推荐实验或仿真方案，用结果反向更新模型。</p><em>交付：闭环记录、收益评估、扩展决策。</em></div></div><div class="pilot-gates"><span>验收门槛</span><b>数据可追溯</b><b>模型可验证</b><b>建议可执行</b><b>结果可回流</b></div></div><div class="panel" style="margin-top:22px"><p class="lead">真正的竞争力不是买一个 AI 工具，而是建设一个持续发现规律、验证规律、利用规律的企业系统。</p></div></section>`
  },
  {
    title:"AI科研能力演进路线图",
    time:"2分钟",
    notes:{points:["AI辅助科研已经进入实践，不能再作为远期预测来讲。","后续阶段受模型能力、数据闭环、自动实验室、监管和组织能力共同影响，应表达为能力成熟度，而不是确定年份。"],question:"你的企业当前处在工具辅助、人机协同，还是已经开始建设自动科研闭环？",control:"按四个成熟度阶段讲：当前实践、能力扩展、闭环自主、长期愿景；再补充四个阶段门槛：数据闭环、模型评估、实验接口、安全治理；强调阶段不是年份承诺。"},
    html:`<section class="chapter" id="s18"><h2>第22章 AI科研能力演进路线图</h2><div class="future-roadmap"><div class="future-line"></div><div class="future-card"><b>当前实践</b><h3>AI辅助科研</h3><p>能力：文献综述、代码生成、仿真建模、实验数据分析已在科研和企业研发中落地。</p><span>企业行动：规范数据资产、知识库、仿真流程和人机协作边界。</span></div><div class="future-card"><b>能力扩展</b><h3>AI协同科学家</h3><p>能力：在专家约束下提出候选假设、实验方案和可验证预测。</p><span>企业行动：建设可追溯实验记录、模型评估体系和自动化实验接口。</span></div><div class="future-card"><b>闭环自主</b><h3>自动科研系统</h3><p>能力：在限定领域内完成假设、仿真、实验、数据回流和模型更新闭环。</p><span>企业行动：形成 AI 研发工厂，连接仿真平台、实验平台和业务指标。</span></div><div class="future-card"><b>长期愿景</b><h3>科学智能基础设施</h3><p>能力：跨学科发现人类难以直觉理解但可验证的新规律。</p><span>企业行动：积累高质量闭环数据、理论库和可信验证体系。</span></div></div><div class="future-gates"><span>阶段门槛</span><b>数据闭环</b><b>模型评估</b><b>实验接口</b><b>安全治理</b></div></section>`
  },
  {
    title:"物理规律发现实验室",
    time:"6分钟",
    notes:{points:["这是本项目的自主进化实验层：用同一个交互框架展示 10 种物理规律发现能力。","每个实验都遵循数据生成、噪声观测、模型拟合、规律解释四步，不破坏原有第7章拟合与第12章绘图逻辑。","讲解时可选择 2-3 个代表案例：简谐振动、行星轨道、冷却定律。"],question:"如果 AI 能自动识别不同实验背后的方程，企业实验平台应该优先接入哪类物理过程？",control:"点击左侧规律按钮，观察画布数据和右侧自动发现结果；强调这是从单一拟合升级到多规律识别。"},
    html:`<section class="chapter physics-lab-chapter" id="s24"><h2>附录 物理规律发现实验室</h2><div class="logic-strip panel"><button type="button" data-goto="s21">承接第10章：真实发现证据</button><b>→</b><strong>本章：多规律自动识别</strong><b>→</b><button type="button" data-goto="s23">导向第21章：企业试点</button></div><div class="physics-lab-grid"><div class="law-menu panel" id="lawMenu"></div><div class="law-stage panel"><canvas id="lawCanvas" width="880" height="520"></canvas></div><div class="law-result panel"><div class="kicker">AI Discovery Result</div><h3 id="lawTitle">简谐振动</h3><div class="formula" id="lawFormula">x = A cos(ωt + φ)</div><div class="formula-legend" id="lawLegend"><span>A：振幅</span><span>ω：角频率</span><span>t：时间</span></div><p class="lead" id="lawInsight">AI 从周期性轨迹中估计周期和角频率，识别回复力与位移成正比。</p><div class="law-metrics" id="lawMetrics"></div><button class="button" id="lawRegenerate" type="button">重新生成数据</button></div></div></section>`
  },
  {
    title:"终极总结",
    time:"2分钟",
    notes:{points:["逐句停顿，给听众留下最后观点。","未来最重要的 AI，不是最会聊天的 AI，而是最会发现规律的 AI。"],question:"你的企业准备用 AI 释放哪一种能力？",control:"慢速滚动或翻页到此页后停顿 5 秒，让最后定格句出现；需要回到开场时点击“回到首页”。"},
    html:`<section class="chapter summary-chapter" id="s19"><h2>第23章 终极总结</h2><div class="summary-wrap"><div class="summary-line">工业革命：释放体力</div><div class="summary-line">信息革命：释放计算力</div><div class="summary-line">AI革命：释放发现规律的能力</div><div class="summary-line accent">未来最重要的AI，不是最会聊天的AI</div><div class="summary-line amber">而是最会发现规律的AI</div><div class="summary-lock">AI Scientist = 发现规律的生产力</div><button class="button summary-home" data-goto="s0">回到首页</button></div></section>`
  }
];
