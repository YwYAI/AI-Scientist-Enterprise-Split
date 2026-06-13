(function(){
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const deck = $("#deck");
  const navList = $("#navList");
  const navToggle = $("#navToggle");
  const sidebarToggle = $("#sidebarToggle");
  const notesContent = $("#notesContent");
  const progressBar = $("#progressBar");
  const chapters = window.AI_SCIENTIST_CONTENT;
  let current = 0;
  let fallCount = 0;
  let towerCount = 0;
  let inclineCount = 0;

  deck.innerHTML = chapters.map(c => c.html).join("");
  const sections = $$(".chapter");
  chapters.forEach((chapter, i) => {
    const link = document.createElement("a");
    link.href = "#" + (sections[i] ? sections[i].id : "s" + i);
    link.innerHTML = `<span>${String(i).padStart(2,"0")}</span><strong>${chapter.title}</strong>`;
    navList.appendChild(link);
  });

  const navLinks = $$("#navList a");
  function setCurrent(index){
    if(index < 0 || !chapters[index]) return;
    current = index;
    navLinks.forEach((a,i)=>a.classList.toggle("active", i === index));
    progressBar.style.width = `${index / (sections.length - 1) * 100}%`;
    const n = chapters[index].notes;
    notesContent.innerHTML = `
      <h3>讲解要点 · ${chapters[index].time}</h3>
      <ul>${n.points.map(x=>`<li>${x}</li>`).join("")}</ul>
      <h3>互动问题</h3><p>${n.question}</p>
      <h3>时间控制与备注</h3><p>${n.control}</p>`;
  }
  function isActiveSection(id){
    return sections[current] && sections[current].id === id;
  }
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const index = sections.indexOf(entry.target);
        entry.target.classList.add("visible");
        setCurrent(index);
      }
    });
  },{threshold:.55});
  sections.forEach(s=>observer.observe(s));
  setCurrent(0);

  function go(index){
    const target = Math.max(0, Math.min(sections.length - 1, index));
    sections[target].scrollIntoView({behavior:"smooth"});
  }
  function indexFromHash(){
    const id = decodeURIComponent(location.hash.slice(1));
    return sections.findIndex(section => section.id === id);
  }
  function goToHash(behavior = "auto"){
    const index = indexFromHash();
    if(index < 0) return;
    sections[index].scrollIntoView({behavior});
    setCurrent(index);
  }
  let aiAbilityStep = 0;
  function aiAbilityCards(){
    const section = $("#s4");
    return section ? $$(".ai-ability-card", section) : [];
  }
  function setAiAbilityStep(step){
    const cards = aiAbilityCards();
    if(!cards.length) return;
    aiAbilityStep = Math.max(0, Math.min(cards.length, step));
    cards.forEach((card, i) => {
      card.classList.toggle("revealed", i < aiAbilityStep);
      card.classList.toggle("active", i === aiAbilityStep - 1);
    });
  }
  navList.addEventListener("click", e => {
    const link = e.target.closest("a");
    if(!link) return;
    const id = link.getAttribute("href").slice(1);
    const index = sections.findIndex(section => section.id === id);
    if(index < 0) return;
    e.preventDefault();
    history.pushState(null, "", "#" + id);
    go(index);
    setCurrent(index);
  });
  requestAnimationFrame(() => goToHash("auto"));
  addEventListener("hashchange", () => goToHash("smooth"));
  addEventListener("popstate", () => goToHash("smooth"));
  function setSidebarOpen(open){
    document.body.classList.toggle("sidebar-closed", !open);
    if(navToggle){
      navToggle.textContent = "×";
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", "关闭目录边栏");
    }
    if(sidebarToggle){
      sidebarToggle.setAttribute("aria-expanded", String(open));
      sidebarToggle.setAttribute("aria-label", open ? "目录边栏已打开" : "打开目录边栏");
    }
  }
  function toggleSidebar(){
    setSidebarOpen(document.body.classList.contains("sidebar-closed"));
  }
  if(navToggle){
    navToggle.addEventListener("click", () => setSidebarOpen(false));
  }
  if(sidebarToggle){
    sidebarToggle.addEventListener("click", () => setSidebarOpen(true));
  }
  setSidebarOpen(true);
  document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();
    if(isActiveSection("s4") && (e.key === "ArrowRight" || e.key === "ArrowLeft")){
      e.preventDefault();
      setAiAbilityStep(aiAbilityStep + (e.key === "ArrowRight" ? 1 : -1));
      return;
    }
    if(e.key === "ArrowDown"){
      e.preventDefault();
      go(current + 1);
    }
    if(e.key === "ArrowUp"){
      e.preventDefault();
      go(current - 1);
    }
    if(key === "n") document.body.classList.toggle("notes-open");
    if(key === "p") document.body.classList.toggle("presenter");
    if(key === "m") toggleSidebar();
    if(key === "f"){
      if(!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    if((e.key === "Enter" || e.key === " ") && document.activeElement?.classList.contains("experiment-window")){
      e.preventDefault();
      document.activeElement.click();
    }
    if((e.key === "Enter" || e.key === " ") && document.activeElement?.classList.contains("ai-ability-card")){
      e.preventDefault();
      const step = Number(document.activeElement.dataset.abilityStep || 0);
      setAiAbilityStep(step + 1);
    }
    if((e.key === "Enter" || e.key === " ") && document.activeElement?.classList.contains("ai-compare-guide")){
      e.preventDefault();
      setAiAbilityStep(aiAbilityStep + 1);
    }
  });

  document.addEventListener("click", e => {
    const jump = e.target.closest("[data-goto]");
    if(jump){
      const targetIndex = sections.findIndex(section => section.id === jump.dataset.goto);
      if(targetIndex >= 0){
        history.pushState(null, "", "#" + jump.dataset.goto);
        go(targetIndex);
        setCurrent(targetIndex);
      }
      return;
    }
    const guide = e.target.closest(".ai-compare-guide");
    if(guide){
      setAiAbilityStep(aiAbilityStep + 1);
      return;
    }
    const abilityCard = e.target.closest(".ai-ability-card");
    if(abilityCard){
      const step = Number(abilityCard.dataset.abilityStep || 0);
      setAiAbilityStep(step + 1);
      return;
    }
    const towerWindow = e.target.closest(".tower-window");
    if(towerWindow){
      runTowerExperiment();
      return;
    }
    const inclineWindow = e.target.closest(".incline-window");
    if(inclineWindow){
      runInclineExperiment();
      return;
    }
    const flowStep = e.target.closest(".flow-step");
    if(flowStep){
      flowStep.classList.toggle("open");
      return;
    }
    if(e.target.matches(".quiz-option")){
      const options = $$(".quiz-option", e.target.parentElement);
      options.forEach(option => option.classList.remove("good","bad"));
      e.target.classList.add(e.target.dataset.good === "true" ? "good" : "bad");
      const answer = $("#causalAnswer");
      if(answer) answer.classList.add("show");
    }
  });

  function runTowerExperiment(){
    const towerBalls = $$(".tower-ball");
    towerBalls.forEach(ball => ball.classList.remove("dropping"));
    void (towerBalls[0] && towerBalls[0].offsetWidth);
    towerBalls.forEach(ball => ball.classList.add("dropping"));
    towerCount++;
    const counter = $("#towerCount");
    if(counter) counter.textContent = towerCount;
  }

  function runInclineExperiment(){
    const inclineBall = $("#inclineBall");
    if(!inclineBall) return;
    inclineBall.classList.remove("rolling");
    void inclineBall.offsetWidth;
    inclineBall.classList.add("rolling");
    inclineCount++;
    const counter = $("#inclineCount");
    if(counter) counter.textContent = inclineCount;
  }

  function initSpace(){
    const canvas = $("#spaceCanvas");
    const ctx = canvas.getContext("2d");
    let width = 0, height = 0;
    const mouse = {x:-9999,y:-9999};
    const particles = [];
    function resize(){
      width = canvas.width = innerWidth;
      height = canvas.height = innerHeight;
      if(!particles.length){
        for(let i=0;i<560;i++){
          particles.push({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+.4});
        }
      }
    }
    addEventListener("resize", resize);
    addEventListener("mousemove", e => {mouse.x = e.clientX; mouse.y = e.clientY;});
    resize();
    function draw(){
      if(document.hidden){ requestAnimationFrame(draw); return; }
      ctx.clearRect(0,0,width,height);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > width) p.vx *= -1;
        if(p.y < 0 || p.y > height) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx,dy);
        if(d < 110 && d > 0){ p.x += dx / d * 1.1; p.y += dy / d * 1.1; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = "rgba(0,229,255,.75)"; ctx.fill();
      }
      for(let i=0;i<particles.length;i+=2){
        for(let j=i+1;j<particles.length;j+=7){
          const a=particles[i], b=particles[j], d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d < 96){ ctx.strokeStyle = `rgba(0,229,255,${(1-d/96)*.18})`; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  function initHeroCycle(){
    let index = 0;
    setInterval(()=>{
      if(!isActiveSection("s0")) return;
      $$("#heroCycle .cycle-node").forEach((node,i)=>node.classList.toggle("active", i === index));
      index = (index + 1) % 5;
    }, 1300);
  }

  function initFlow(){
    const names = ["观察","测量","模式","假设","数学模型","预测","验证","理论"];
    const desc = ["看见现象：苹果落下、月亮绕行、工厂波动。","把现象变成数字，建立可分析的数据。","在数据中寻找稳定结构和重复关系。","提出可能的原因和机制。","用公式或模型表达关系。","用模型推断尚未发生的结果。","用实验或现实数据检验预测。","经受反复验证后形成可传播的解释体系。"];
    $("#flowGrid").innerHTML = names.map((name,i)=>`<div class="flow-step"><em>${String(i + 1).padStart(2,"0")}</em><strong>${name}</strong><p>${desc[i]}</p></div>`).join("");
  }

  function initNetwork(){
    const svg = $("#networkSvg");
    const layers = [4,6,5,3], xs = [90,270,450,630], nodes = [];
    let html = '<rect width="720" height="340" fill="#071126"/>';
    layers.forEach((count, li)=>{ for(let k=0;k<count;k++) nodes.push({x:xs[li],y:62+k*(220/(count-1||1)),l:li}); });
    const connections = [];
    nodes.forEach(a=>nodes.forEach(b=>{ if(b.l === a.l + 1) connections.push({a,b,w:.35 + Math.random() * .65, d:(Math.random() * 1.8).toFixed(2)}); }));
    html += '<defs><filter id="networkGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="synapseGradient" x1="0" x2="1"><stop offset="0%" stop-color="#00E5FF" stop-opacity=".16"/><stop offset="50%" stop-color="#4CAF50" stop-opacity=".92"/><stop offset="100%" stop-color="#FFC107" stop-opacity=".22"/></linearGradient></defs>';
    connections.forEach(({a,b,w,d},i)=>{
      const width = (2.4 + w * 3.4).toFixed(2);
      html += `<line class="synapse synapse-glow" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke-width="${Number(width)+4}"/>`;
      html += `<line class="synapse synapse-core" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke-width="${width}" style="--delay:${d}s"><animate attributeName="stroke-opacity" values=".28;.95;.28" dur="${1.6+w*1.4}s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="stroke-width" values="${width};${Number(width)+1.6};${width}" dur="${2+w}s" begin="${d}s" repeatCount="indefinite"/></line>`;
      if(i % 2 === 0) html += `<circle class="signal-pulse" r="4.2"><animateMotion dur="${1.4+w*1.2}s" begin="${d}s" repeatCount="indefinite" path="M${a.x} ${a.y} L${b.x} ${b.y}"/></circle>`;
    });
    nodes.forEach((n,i) => html += `<circle class="network-node" cx="${n.x}" cy="${n.y}" r="13"><animate attributeName="r" values="10;15;10" dur="${1.8 + (i % 4) * .25}s" repeatCount="indefinite"/></circle><circle class="node-core" cx="${n.x}" cy="${n.y}" r="5"/>`);
    svg.innerHTML = html;
    let epoch = 0;
    setInterval(()=>{
      if(!isActiveSection("s5")) return;
      epoch++;
      $("#epoch").textContent = epoch;
      $("#loss").textContent = (Math.exp(-epoch/38)+.025).toFixed(3);
      $("#lossBar").style.width = Math.max(5,100*Math.exp(-epoch/38)) + "%";
    },500);
  }

  function initFit(){
    const canvas = $("#fitCanvas");
    const ctx = canvas.getContext("2d");
    let drag = null;
    const points = [{x:90,y:350},{x:230,y:260},{x:390,y:175},{x:570,y:150},{x:760,y:100}];
    function solve(){
      const S=[0,0,0,0,0], T=[0,0,0];
      points.forEach(p=>{const x=(p.x-450)/250,y=(420-p.y)/120;S[0]+=1;S[1]+=x;S[2]+=x*x;S[3]+=x*x*x;S[4]+=x*x*x*x;T[0]+=y;T[1]+=x*y;T[2]+=x*x*y;});
      const A=[[S[4],S[3],S[2],T[2]],[S[3],S[2],S[1],T[1]],[S[2],S[1],S[0],T[0]]];
      for(let i=0;i<3;i++){let m=A[i][i] || 1; for(let j=i;j<4;j++) A[i][j]/=m; for(let k=0;k<3;k++) if(k!==i){let f=A[k][i]; for(let j=i;j<4;j++) A[k][j]-=f*A[i][j];}}
      return [A[0][3],A[1][3],A[2][3]];
    }
    function draw(){
      ctx.clearRect(0,0,900,520);
      ctx.strokeStyle = "rgba(255,255,255,.12)";
      for(let x=0;x<900;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,520);ctx.stroke();}
      for(let y=0;y<520;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(900,y);ctx.stroke();}
      const [a,b,c] = solve();
      ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 4; ctx.beginPath();
      for(let px=40;px<860;px++){const x=(px-450)/250,y=a*x*x+b*x+c,py=420-y*120; if(px===40)ctx.moveTo(px,py); else ctx.lineTo(px,py);}
      ctx.stroke();
      points.forEach(p=>{ctx.fillStyle="#00E5FF";ctx.beginPath();ctx.arc(p.x,p.y,11,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#fff";ctx.stroke();});
      $("#fitFormula").textContent = `y = ${a.toFixed(2)}x² ${b>=0?"+":"-"} ${Math.abs(b).toFixed(2)}x ${c>=0?"+":"-"} ${Math.abs(c).toFixed(2)}`;
    }
    canvas.addEventListener("pointerdown", e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*900/r.width,y=(e.clientY-r.top)*520/r.height; drag=points.find(p=>Math.hypot(p.x-x,p.y-y)<20); if(drag) canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener("pointermove", e=>{if(!drag)return;const r=canvas.getBoundingClientRect();drag.x=Math.max(20,Math.min(880,(e.clientX-r.left)*900/r.width));drag.y=Math.max(20,Math.min(500,(e.clientY-r.top)*520/r.height));draw();});
    canvas.addEventListener("pointerup",()=>drag=null);
    canvas.addEventListener("pointercancel",()=>drag=null);
    draw();
  }

  function initFormula(){
    const ops = ["+","-","*","/","sin","cos","log","exp","x²","√x","π","e"];
    const renderLegend = (items) => {
      const legend = $("#formulaLegend");
      if(!legend) return;
      legend.innerHTML = items.map(item => `<span>${item}</span>`).join("");
    };
    setInterval(()=>{
      if(!isActiveSection("s8")) return;
      const found = Math.random() < .22;
      const tokens = Array.from({length:5},()=>ops[Math.floor(Math.random()*ops.length)]);
      let text = "y = " + tokens.join(" ");
      const scores = found
        ? { accuracy: 94, simplicity: 88, explain: 92, verdict: "发现可解释规律：准确、简洁、可验证" }
        : {
            accuracy: 42 + Math.floor(Math.random() * 35),
            simplicity: 35 + Math.floor(Math.random() * 42),
            explain: 30 + Math.floor(Math.random() * 38),
            verdict: "搜索公式空间..."
          };
      if(found){
        text = "y = 1/2 · g · t²";
        renderLegend(["y：观测到的下落距离","g：重力加速度","t：下落时间"]);
      }else{
        const hasX = tokens.some(t => t === "x²" || t === "√x");
        const hasFunc = tokens.some(t => ["sin","cos","log","exp"].includes(t));
        const legendItems = ["y：待解释的观测结果"];
        if(hasX) legendItems.push("x：候选输入变量");
        if(hasFunc) legendItems.push("sin / cos / log / exp：候选函数");
        legendItems.push("+ - * /：候选运算符");
        renderLegend(legendItems);
      }
      $("#formulaSearch").textContent = text;
      $("#accuracyScore").style.setProperty("--w", scores.accuracy + "%");
      $("#simplicityScore").style.setProperty("--w", scores.simplicity + "%");
      $("#explainScore").style.setProperty("--w", scores.explain + "%");
      $("#formulaVerdict").textContent = scores.verdict;
    },700);
  }

  function initScientistLoop(){
    const nodes = $$("#s12 .loop-node");
    const status = $("#loopStatus");
    let index = 0;
    setInterval(()=>{
      if(!isActiveSection("s12") || !nodes.length) return;
      nodes.forEach((node,i)=>node.classList.toggle("active", i === index));
      if(status) status.textContent = nodes[index].dataset.loop;
      index = (index + 1) % nodes.length;
    }, 1150);
  }

  function initWorld(){
    const canvas = $("#worldCanvas");
    const ctx = canvas.getContext("2d");
    const balls = [
      {x:120,y:120,vx:2.9,vy:.6,r:24,c:"#00E5FF",m:24},
      {x:500,y:160,vx:-1.6,vy:.8,r:30,c:"#FFC107",m:30}
    ];
    const blocks = [
      {x:610,y:334,w:58,h:70,tilt:0,hit:0},
      {x:672,y:334,w:58,h:70,tilt:0,hit:0},
      {x:641,y:264,w:58,h:70,tilt:0,hit:0}
    ];
    function predict(ball, steps){
      const clone = {...ball};
      const path = [];
      for(let i=0;i<steps;i++){
        clone.vy += .045;
        clone.x += clone.vx;
        clone.y += clone.vy;
        if(clone.x < clone.r || clone.x > 900 - clone.r) clone.vx *= -1;
        if(clone.y > 492 - clone.r){ clone.y = 492 - clone.r; clone.vy *= -.82; }
        if(i % 9 === 0) path.push({x:clone.x,y:clone.y});
      }
      return path;
    }
    function resolveBallCollision(a,b){
      const dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx,dy), min = a.r + b.r;
      if(dist <= 0 || dist > min) return;
      const nx = dx / dist, ny = dy / dist;
      const overlap = (min - dist) / 2;
      a.x -= nx * overlap; a.y -= ny * overlap; b.x += nx * overlap; b.y += ny * overlap;
      const dvx = b.vx - a.vx, dvy = b.vy - a.vy;
      const impulse = (2 * (dvx * nx + dvy * ny)) / (a.m + b.m);
      a.vx += impulse * b.m * nx; a.vy += impulse * b.m * ny;
      b.vx -= impulse * a.m * nx; b.vy -= impulse * a.m * ny;
    }
    function hitBlocks(ball){
      blocks.forEach((block,index)=>{
        const nearestX = Math.max(block.x, Math.min(ball.x, block.x + block.w));
        const nearestY = Math.max(block.y, Math.min(ball.y, block.y + block.h));
        const dx = ball.x - nearestX, dy = ball.y - nearestY;
        if(dx*dx + dy*dy < ball.r*ball.r){
          block.hit = 1;
          block.tilt = Math.min(.58, block.tilt + .08 + index * .015);
          ball.vx *= -0.72;
          ball.vy -= 2.2;
        }
      });
    }
    function draw(){
      if(!isActiveSection("s10") || document.hidden){ requestAnimationFrame(draw); return; }
      ctx.clearRect(0,0,900,520);
      ctx.fillStyle = "#071126"; ctx.fillRect(0,0,900,520);
      ctx.strokeStyle = "rgba(255,255,255,.09)";
      for(let x=0;x<900;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,520);ctx.stroke();}
      ctx.fillStyle = "rgba(255,255,255,.10)"; ctx.fillRect(0,492,900,3);
      balls.forEach(ball=>{
        const path = predict(ball,72);
        ctx.setLineDash([6,8]);
        ctx.strokeStyle = "rgba(255,193,7,.78)";
        ctx.beginPath();
        path.forEach((p,i)=>i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
        ctx.stroke();
        ctx.setLineDash([]);
      });
      resolveBallCollision(balls[0], balls[1]);
      balls.forEach(ball=>{
        ball.vy += .045;
        ball.x += ball.vx;
        ball.y += ball.vy;
        if(ball.x < ball.r){ball.x = ball.r; ball.vx *= -1;}
        if(ball.x > 900 - ball.r){ball.x = 900 - ball.r; ball.vx *= -1;}
        if(ball.y > 492 - ball.r){ball.y = 492 - ball.r; ball.vy *= -.82;}
        hitBlocks(ball);
      });
      blocks.forEach(block=>{
        block.tilt *= .992;
        ctx.save();
        ctx.translate(block.x + block.w/2, block.y + block.h);
        ctx.rotate(block.tilt);
        ctx.fillStyle = block.hit ? "#4CAF50" : "rgba(76,175,80,.82)";
        ctx.fillRect(-block.w/2, -block.h, block.w, block.h);
        ctx.strokeStyle = "rgba(255,255,255,.45)";
        ctx.strokeRect(-block.w/2, -block.h, block.w, block.h);
        ctx.restore();
      });
      balls.forEach(ball=>{
        ctx.fillStyle = ball.c;
        ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.65)";
        ctx.beginPath(); ctx.moveTo(ball.x,ball.y); ctx.lineTo(ball.x+ball.vx*24,ball.y+ball.vy*24); ctx.stroke();
      });
      ctx.fillStyle = "#B0BEC5"; ctx.font = "700 18px system-ui";
      ctx.fillText("AI 预测轨迹", 38, 44);
      ctx.fillStyle = "#FFC107"; ctx.fillRect(38, 56, 56, 3);
      ctx.fillStyle = "#B0BEC5"; ctx.fillText("真实运动与碰撞反馈", 38, 92);
      requestAnimationFrame(draw);
    }
    draw();
  }

  function initAtoms(){
    const g = $("#atoms");
    let html = "";
    for(let i=0;i<42;i++){
      const x=80+(i%7)*72,y=70+Math.floor(i/7)*48,c=i%3?"#00E5FF":"#FFC107";
      html += `<circle cx="${x}" cy="${y}" r="15" fill="${c}"><animate attributeName="cy" values="${y};${y-8};${y}" dur="${2+i%5*.3}s" repeatCount="indefinite"/></circle>`;
      if(i%7!==6) html += `<line x1="${x}" y1="${y}" x2="${x+72}" y2="${y}" stroke="#00E5FF55"/>`;
    }
    g.innerHTML = html;
  }

  function initMap(){
    const map = $("#mapStage"), inner = $("#mapInner");
    const center = {x:660,y:380};
    const items = [
      {text:"数学",sub:"优化与概率",type:"science",x:220,y:90},
      {text:"物理",sub:"规律与仿真",type:"science",x:520,y:60,guide:1},
      {text:"化学",sub:"反应与合成",type:"science",x:840,y:96},
      {text:"生命科学",sub:"蛋白质与细胞",type:"science",x:1080,y:190},
      {text:"材料",sub:"结构与性能",type:"industry",x:180,y:310,guide:2},
      {text:"能源",sub:"电池与储能",type:"industry",x:1080,y:370},
      {text:"制造业",sub:"数字孪生",type:"industry",x:170,y:570,guide:3},
      {text:"机器人",sub:"世界模型",type:"industry",x:930,y:600},
      {text:"航空航天",sub:"复杂仿真",type:"industry",x:530,y:660},
      {text:"自动实验室",sub:"机器人科研",type:"infra",x:1180,y:560,guide:5},
      {text:"工业软件",sub:"CAD/CAE/EDA",type:"infra",x:360,y:470,guide:4},
      {text:"科学数据库",sub:"知识与数据",type:"infra",x:850,y:470},
      {text:"算力平台",sub:"训练与推理",type:"infra",x:650,y:210},
      {text:"世界模型",sub:"预测未来",type:"infra",x:720,y:610,guide:6}
    ];
    const links = items.map(item=>`<path d="M${center.x} ${center.y} C${(center.x+item.x)/2} ${center.y} ${(center.x+item.x)/2} ${item.y} ${item.x+66} ${item.y+32}"/>`).join("");
    const guideItems = items.filter(item => item.guide).sort((a,b) => a.guide - b.guide);
    const guidePoints = [{...center}, ...guideItems.map(item => ({x:item.x + 66, y:item.y + 34}))];
    const guideLinks = guidePoints.slice(0, -1).map((p, i) => {
      const n = guidePoints[i + 1];
      const mx = (p.x + n.x) / 2;
      return `<path style="--path-delay:${i * .38}s" d="M${p.x} ${p.y} C${mx} ${p.y} ${mx} ${n.y} ${n.x} ${n.y}"/>`;
    }).join("");
    inner.innerHTML = `<svg class="map-links" viewBox="0 0 1450 840">${links}</svg><svg class="map-guide-links" viewBox="0 0 1450 840">${guideLinks}</svg><div class="bubble core pulse" style="left:${center.x-95}px;top:${center.y-48}px">AI for Science<span>发现规律的基础设施</span></div><div class="map-guide-note">推荐讲解路径：物理规律 → 材料发现 → 制造闭环 → 工业软件 → 自动实验室 → 世界模型</div>`;
    items.forEach(item=>{
      const d=document.createElement("div");
      d.className=`bubble ${item.type} ${item.guide ? "guided" : ""} pulse`;
      d.style.setProperty("--guide-delay", item.guide ? `${(item.guide - 1) * .65}s` : "0s");
      d.innerHTML=`${item.guide ? `<b>${item.guide}</b>` : ""}${item.text}<span>${item.sub}</span>`;
      d.style.left=item.x+"px";
      d.style.top=item.y+"px";
      inner.appendChild(d);
    });
    let scale=1, ox=0, oy=0, down=false, sx=0, sy=0;
    function fitMap(){
      const fitScale = Math.min(1, map.clientWidth / 1450, map.clientHeight / 840) * .96;
      scale = Math.max(.34, fitScale);
      ox = (map.clientWidth - 1450 * scale) / 2;
      oy = (map.clientHeight - 840 * scale) / 2;
      transform();
    }
    function transform(){inner.style.transform=`translate(${ox}px,${oy}px) scale(${scale})`;}
    fitMap();
    addEventListener("resize", fitMap);
    map.addEventListener("wheel", e=>{e.preventDefault();scale=Math.max(.34,Math.min(1.8,scale+(e.deltaY<0?.1:-.1)));transform();});
    map.addEventListener("pointerdown", e=>{down=true;sx=e.clientX-ox;sy=e.clientY-oy;map.setPointerCapture(e.pointerId);});
    map.addEventListener("pointermove", e=>{if(down){ox=e.clientX-sx;oy=e.clientY-sy;transform();}});
    map.addEventListener("pointerup",()=>down=false);
    map.addEventListener("pointercancel",()=>down=false);
  }

  function initManufacturingRoute(){
    const svg = $("#s17 .route-map svg");
    if(!svg || svg.dataset.optimizationReady) return;
    if(svg.dataset.routeVersion === "enterprise-executable") return;
    svg.dataset.optimizationReady = "true";
    const ns = "http://www.w3.org/2000/svg";
    const make = (name, attrs, text) => {
      const node = document.createElementNS(ns, name);
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      if(text) node.textContent = text;
      return node;
    };
    $$("text", svg).forEach(text => {
      if(text.textContent === "孪生、模型、验证") text.textContent = "目标、孪生、验证";
    });
    const boxes = $(".route-boxes", svg);
    if(boxes && !$("text[data-route-target]", boxes)){
      boxes.appendChild(make("rect", {x:670, y:114, width:160, height:44, rx:8}));
      boxes.appendChild(make("text", {x:750, y:142, "data-route-target":"true"}, "目标与约束"));
    }
    const lines = $(".route-lines", svg);
    if(!lines) return;
    $$("path", lines).forEach(path => {
      if(path.getAttribute("d") === "M600 136 C642 150 652 210 670 242"){
        path.setAttribute("d", "M600 136 H670");
      }
    });
    if(!$("path[data-route-target-link]", lines)){
      const firstStageThreeLink = $('path[d="M750 264 V326"]', lines);
      lines.insertBefore(make("path", {d:"M750 158 V220", "data-route-target-link":"true"}), firstStageThreeLink);
    }
  }

  function initPhysicsLab(){
    const canvas = $("#lawCanvas");
    const menu = $("#lawMenu");
    if(!canvas || !menu) return;
    const ctx = canvas.getContext("2d");
    let active = 0;
    const discoveryLaws = [
      {name:"简谐振动", category:"振动、波动与声学", sub:"周期轨迹 → x=Acos(ωt)", formula:"x = A cos(ωt + φ)", legend:["A：振幅","ω：角频率","t：时间","φ：初相位"], insight:"AI 从周期性轨迹中估计周期和角频率，识别回复力与位移成正比。", gen:()=>{const A=1.25,w=1.72;return sample(90,i=>{const t=i/10;return {x:t,y:A*Math.cos(w*t)+noise(.035)}})}, fit:d=>{const period=estimatePeriod(d);const w=2*Math.PI/period;return [["估计周期",period.toFixed(2)+" s"],["估计角频率",w.toFixed(2)+" rad/s"],["发现规律","周期性回复运动"]]}},
      {name:"阻尼运动", category:"振动、波动与声学", sub:"衰减振荡 → e^(-γt)", formula:"x = A e^(-γt) cos(ωt)", legend:["A：初始振幅","γ：阻尼系数","ω：振荡频率","t：时间"], insight:"AI 识别振幅包络随时间指数下降，区分理想振动和能量耗散系统。", gen:()=>sample(100,i=>{const t=i/10;return {x:t,y:1.25*Math.exp(-.16*t)*Math.cos(1.85*t)+noise(.025)}}), fit:d=>[["包络趋势","指数衰减"],["估计阻尼γ","0.16 /s"],["发现规律","能量逐步耗散"]]},
      {name:"抛体运动", category:"运动学 & 动力学", sub:"轨迹点 → 二次曲线", formula:"y = x tanθ - gx²/(2v²cos²θ)", legend:["y：竖直位移","x：水平位移","θ：发射角","g：重力加速度","v：初速度"], insight:"AI 从飞行轨迹中拟合二次项，发现竖直方向存在恒定加速度。", gen:()=>sample(70,i=>{const x=i/7;return {x,y:.9*x-.048*x*x+noise(.04)}}), fit:d=>{const q=quadFit(d);return [["二次项",q.a.toFixed(3)],["估计g比例",Math.abs(q.a*2).toFixed(3)],["发现规律","恒定重力加速度"]]}},
      {name:"单摆小角度", category:"运动学 & 动力学", sub:"T² 与 L 成正比", formula:"T = 2π√(L/g)", legend:["T：周期","L：摆长","g：重力加速度"], insight:"AI 比较不同摆长的周期，发现 T² 与 L 呈线性关系。", gen:()=>sample(60,i=>{const L=.2+i*.025;return {x:L,y:2*Math.PI*Math.sqrt(L/9.8)+noise(.015)}}), fit:d=>{const pts=d.map(p=>({x:p.x,y:p.y*p.y}));const l=linearFit(pts);return [["T²-L斜率",l.m.toFixed(2)],["估计g",(4*Math.PI*Math.PI/l.m).toFixed(2)],["发现规律","周期由摆长决定"]]}},
      {name:"行星轨道", category:"运动学 & 动力学", sub:"半径三次方 → 周期平方", formula:"T² ∝ r³", legend:["T²：公转周期平方","r³：轨道半径三次方"], insight:"AI 把轨道半径三次方与周期平方对齐，发现同一中心天体下 T² 与 r³ 成正比。", gen:()=>sample(70,i=>{const r=.4+i*.035;const r3=r*r*r;return {x:r3,y:1.18*r3+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["T²/r³",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","中心引力轨道"]]}},
      {name:"反平方定律", category:"运动学 & 动力学", sub:"距离平方倒数 → 作用强度", formula:"F ∝ 1/r²", legend:["F：作用强度","1/r²：距离平方倒数"], insight:"AI 在距离平方倒数和作用强度之间识别线性关系，连接引力、电场和光照衰减。", gen:()=>sample(70,i=>{const r=.8+i*.05;const inv2=1/(r*r);return {x:inv2,y:1.8*inv2+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["比例系数",l.m.toFixed(2)],["模型形态","反平方"],["发现规律","反平方衰减"]]}},
      {name:"胡克定律", category:"运动学 & 动力学", sub:"形变 → 回复力", formula:"F = kx", legend:["F：回复力","k：弹性系数","x：形变量"], insight:"AI 从弹簧拉伸数据中拟合线性斜率，发现力与形变成正比。", gen:()=>sample(70,i=>{const x=-1.5+i*.045;return {x,y:2.4*x+noise(.08)}}), fit:d=>{const l=linearFit(d);return [["估计k",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","线性回复力"]]}},
      {name:"欧姆定律", category:"电磁学 · 核心方程", sub:"电流 → 电压", formula:"V = IR", legend:["V：电压","I：电流","R：电阻"], insight:"AI 从电路测量中识别线性比例关系，估计未知电阻。", gen:()=>sample(70,i=>{const I=i*.04;return {x:I,y:5.6*I+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["估计R",l.m.toFixed(2)+" Ω"],["线性残差","低"],["发现规律","电压电流正比"]]}},
      {name:"扩散规律", category:"流体、连续介质与输运", sub:"均方位移 → 时间", formula:"⟨x²⟩ = 2Dt", legend:["⟨x²⟩：均方位移","D：扩散系数","t：时间"], insight:"AI 从粒子扩散的均方位移中发现线性增长，估计扩散系数。", gen:()=>sample(70,i=>{const t=i*.14;return {x:t,y:.72*t+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["估计2D",l.m.toFixed(2)],["估计D",(l.m/2).toFixed(2)],["发现规律","随机扩散线性增长"]]}},
      {name:"冷却定律", category:"热学基础 & 热力学定律", sub:"时间 → 温差指数衰减", formula:"T - Tenv = ΔT₀e^(-kt)", legend:["T：物体温度","Tenv：环境温度","ΔT₀：初始温差","k：冷却系数","t：时间"], insight:"AI 识别温差按指数衰减，说明热交换速率与温差成正比。", gen:()=>sample(90,i=>{const t=i/9;return {x:t,y:1.5*Math.exp(-.23*t)+noise(.025)}}), fit:d=>{const l=linearFit(d.map(p=>({x:p.x,y:Math.log(Math.max(.03,p.y))})));return [["估计k",(-l.m).toFixed(2)+" /s"],["模型形态","指数衰减"],["发现规律","温差驱动散热"]]}},
      {name:"波速规律", category:"振动、波动与声学", sub:"频率 → 波长", formula:"v = fλ", legend:["v：波速","f：频率","λ：波长"], insight:"AI 从频率和波长的反比关系中识别介质中的传播速度。", gen:()=>sample(70,i=>{const f=.8+i*.08;return {x:f,y:6.4/f+noise(.035)}}), fit:d=>{const vals=d.map(p=>p.x*p.y);const v=vals.reduce((s,x)=>s+x,0)/vals.length;return [["估计波速v",v.toFixed(2)],["关系形态","fλ≈常数"],["发现规律","波速守恒"]]}},
      {name:"声学多普勒", category:"振动、波动与声学", sub:"相对速度 → 频移", formula:"f' = f(v+vo)/(v-vs)", legend:["f'：观测频率","f：声源频率","v：声速","vo：观测者速度","vs：声源速度"], insight:"AI 从相对运动造成的频率偏移中识别多普勒效应。", gen:()=>sample(70,i=>{const vs=-22+i*.7;return {x:vs,y:440*343/(343-vs)+noise(1.8)}}), fit:d=>{const left=d[0].y,right=d[d.length-1].y;return [["频移方向",right>left?"接近升高":"远离降低"],["中心频率","约440 Hz"],["发现规律","相对运动改变频率"]]}},
      {name:"流体阻力", category:"流体、连续介质与输运", sub:"速度平方 → 阻力", formula:"Fd = 1/2ρCdAv²", legend:["Fd：阻力","ρ：流体密度","Cd：阻力系数","A：迎风面积","v²：速度平方"], insight:"AI 在高速区识别阻力与速度平方近似成正比。", gen:()=>sample(70,i=>{const v=.4+i*.08;return {x:v*v,y:.42*v*v+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["v²斜率",l.m.toFixed(2)],["模型形态","二次阻力"],["发现规律","高速阻力∝v²"]]}},
      {name:"伯努利规律", category:"流体、连续介质与输运", sub:"速度平方 → 压强下降", formula:"P + 1/2ρv² = const", legend:["P：静压","ρ：密度","v²：流速平方","const：沿流线机械能密度常量"], insight:"AI 从流速增大导致压强下降的数据中识别能量守恒关系。", gen:()=>sample(70,i=>{const v=.2+i*.07;return {x:v*v,y:2.6-.36*v*v+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["P-v²斜率",l.m.toFixed(2)],["趋势","流速越高静压越低"],["发现规律","流体能量守恒"]]}},
      {name:"理想气体", category:"热学基础 & 热力学定律", sub:"温度 → 压强", formula:"PV = nRT", legend:["P：压强","V：体积","n：物质的量","R：气体常数","T：绝对温度"], insight:"AI 在定容数据中发现压强与绝对温度成正比。", gen:()=>sample(70,i=>{const T=250+i*2.2;return {x:T,y:.032*T+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["P-T斜率",l.m.toFixed(3)],["截距",l.b.toFixed(2)],["发现规律","定容压强∝温度"]]}},
      {name:"放射性衰变", category:"近代物理·相对论与量子初步", sub:"数量 → 指数衰减", formula:"N = N₀e^(-λt)", legend:["N：剩余数量","N₀：初始数量","λ：衰变常数","t：时间"], insight:"AI 从计数随时间下降的曲线中估计衰变常数和半衰期。", gen:()=>sample(90,i=>{const t=i/8;return {x:t,y:1.6*Math.exp(-.18*t)+noise(.025)}}), fit:d=>{const l=linearFit(d.map(p=>({x:p.x,y:Math.log(Math.max(.03,p.y))})));const lambda=-l.m;return [["估计λ",lambda.toFixed(2)+" /s"],["半衰期",(Math.log(2)/lambda).toFixed(2)+" s"],["发现规律","随机衰变指数下降"]]}},
      {name:"洛伦兹力", category:"电磁学 · 核心方程", sub:"垂直速度分量 → 磁场力", formula:"F = qvB sinθ", legend:["F：磁场力","q：电荷","v：速度","B：磁场","θ：速度与磁场夹角"], insight:"AI 从带电粒子在磁场中的受力数据中识别垂直速度分量，θ=90°时退化为 F=qvB。", gen:()=>sample(70,i=>{const v=i*.06;return {x:v,y:1.9*v+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["qB估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","磁力∝垂直速度分量"]]}},
      {name:"RC充放电", category:"电磁学 · 核心方程", sub:"时间 → 电容电压渐近", formula:"V = V₀(1-e^(-t/RC))", legend:["V：电容电压","V₀：电源电压","R：电阻","C：电容","t：时间"], insight:"AI 识别电容电压趋近上限的指数过程，估计时间常数。", gen:()=>sample(90,i=>{const t=i/8;return {x:t,y:1.5*(1-Math.exp(-.32*t))+noise(.02)}}), fit:d=>{const vmax=Math.max(...d.map(p=>p.y));const mid=d.find(p=>p.y>vmax*.63)||d[Math.floor(d.length/2)];return [["估计τ",mid.x.toFixed(2)+" s"],["极限电压",vmax.toFixed(2)],["发现规律","一阶系统渐近响应"]]}},
      {name:"热传导", category:"热学基础 & 热力学定律", sub:"温度梯度 → 热流", formula:"q = -k∇T", legend:["q：热流","k：导热系数","∇T：温度梯度"], insight:"AI 从热流和温度梯度数据中发现负线性关系，对应傅里叶热传导定律。", gen:()=>sample(70,i=>{const grad=-2+i*.06;return {x:grad,y:-1.35*grad+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["估计-k",l.m.toFixed(2)],["导热系数k",Math.abs(l.m).toFixed(2)],["发现规律","热从高温流向低温"]]}},
      {name:"相对论动能", category:"近代物理·相对论与量子初步", sub:"速度接近光速", formula:"Eₖ = (γ-1)mc²", legend:["Eₖ：相对论动能","γ：洛伦兹因子","m：静质量","c：光速"], insight:"AI 识别高速区能量不再按 v² 线性外推，而是随洛伦兹因子快速上升。", gen:()=>sample(70,i=>{const beta=.05+i*.012;const g=1/Math.sqrt(1-beta*beta);return {x:beta,y:g-1+noise(.002)}}), fit:d=>{const last=d[d.length-1];const gamma=1/Math.sqrt(1-last.x*last.x);return [["最高β",last.x.toFixed(2)],["γ-1",(gamma-1).toFixed(3)],["发现规律","接近光速能量非线性上升"]]}},
      {name:"光电效应", category:"近代物理·相对论与量子初步", sub:"频率 → 最大动能", formula:"Kmax = hf - φ", legend:["Kmax：光电子最大动能","h：普朗克常数","f：光频率","φ：逸出功"], insight:"AI 从阈值频率之后的线性动能增长中识别量子化能量关系。", gen:()=>sample(70,i=>{const f=1+i*.06;return {x:f,y:Math.max(0,.82*(f-1.7))+noise(.018)}}), fit:d=>{const useful=d.filter(p=>p.y>.03);const l=linearFit(useful);return [["估计h比例",l.m.toFixed(2)],["阈值频率",(-l.b/l.m).toFixed(2)],["发现规律","光能量按频率量子化"]]}},
      {name:"布拉格衍射", category:"固体物理 / 凝聚态核心", sub:"sinθ → 波长", formula:"nλ = 2d sinθ", legend:["n：衍射级次","λ：波长","d：晶面间距","θ：衍射角"], insight:"AI 从晶体衍射峰位置中发现波长与 sinθ 成正比。", gen:()=>sample(60,i=>{const s=.12+i*.012;return {x:s,y:2.4*s+noise(.01)}}), fit:d=>{const l=linearFit(d);return [["2d/n估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","晶格衍射线性条件"]]}},
      {name:"斯涅尔定律", category:"光学 · 几何与波动", sub:"sin入射角 → sin折射角", formula:"n₁sinθ₁ = n₂sinθ₂", legend:["n₁：入射介质折射率","n₂：折射介质折射率","θ₁：入射角","θ₂：折射角"], insight:"AI 从入射和折射角数据中识别正弦量之间的比例不变。", gen:()=>sample(60,i=>{const s=.05+i*.014;return {x:s,y:.67*s+noise(.006)}}), fit:d=>{const l=linearFit(d);return [["sin比值",l.m.toFixed(2)],["折射率比","约1.49"],["发现规律","折射由介质比例控制"]]}},
      {name:"马吕斯定律", category:"光学 · 几何与波动", sub:"cos²θ → 光强", formula:"I = I₀ cos²θ", legend:["I：透射光强","I₀：入射光强","θ：偏振夹角","cos²θ：线性化横轴"], insight:"AI 从偏振片旋转实验中发现强度随 cos²θ 线性变化。", gen:()=>sample(80,i=>{const th=i*Math.PI/160;const c2=Math.cos(th)**2;return {x:c2,y:1.3*c2+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["I₀估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","偏振投影平方"]]}},
      {name:"向心力", category:"运动学 & 动力学", sub:"速度平方 → 圆周力", formula:"F = mv²/r", legend:["F：向心力","m：质量","v²：速度平方","r：半径"], insight:"AI 从圆周运动实验中发现保持轨道所需力与速度平方成正比。", gen:()=>sample(70,i=>{const v=.2+i*.055;return {x:v*v,y:.86*v*v+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["v²斜率",l.m.toFixed(2)],["模型形态","平方关系"],["发现规律","圆周运动需要向心力"]]}},
      {name:"转动定律", category:"运动学 & 动力学", sub:"角加速度 → 力矩", formula:"τ = Iα", legend:["τ：力矩","I：转动惯量","α：角加速度"], insight:"AI 从转动实验中发现力矩与角加速度成正比。", gen:()=>sample(70,i=>{const a=i*.045;return {x:a,y:3.1*a+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["估计I",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","转动物体服从线性动力学"]]}},
      {name:"角动量", category:"功能·动量", sub:"角速度 → 角动量", formula:"L = Iω", legend:["L：角动量","I：转动惯量","ω：角速度"], insight:"AI 从角速度和角动量数据中识别转动系统的守恒量。", gen:()=>sample(70,i=>{const w=i*.05;return {x:w,y:2.2*w+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["估计I",l.m.toFixed(2)],["线性残差","低"],["发现规律","角动量随角速度线性变化"]]}},
      {name:"重力势能", category:"功能·动量", sub:"高度 → 能量", formula:"U = mgh", legend:["U：重力势能","m：质量","g：重力加速度","h：高度"], insight:"AI 从提升高度和能量消耗中发现重力势能线性增长。", gen:()=>sample(70,i=>{const h=i*.08;return {x:h,y:4.9*h+noise(.06)}}), fit:d=>{const l=linearFit(d);return [["mg估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","高度存储势能"]]}},
      {name:"毛细上升", category:"流体、连续介质与输运", sub:"半径倒数 → 上升高度", formula:"h = 2γcosθ/(ρgr)", legend:["h：液柱高度","γ：表面张力","θ：接触角","ρ：液体密度","g：重力加速度","r：管半径"], insight:"AI 发现细管半径越小，上升高度越大，符合 1/r 关系。", gen:()=>sample(70,i=>{const inv=.5+i*.055;return {x:inv,y:.74*inv+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["h-1/r斜率",l.m.toFixed(2)],["关系形态","反比"],["发现规律","表面张力驱动毛细现象"]]}},
      {name:"泊肃叶定律", category:"流体、连续介质与输运", sub:"半径四次方 → 流量", formula:"Q ∝ r⁴ΔP", legend:["Q：流量","r⁴：管半径四次方","ΔP：压差"], insight:"AI 从管流数据中发现流量对半径极其敏感，近似四次方关系。", gen:()=>sample(70,i=>{const r=.25+i*.015;return {x:r**4,y:5.5*r**4+noise(.003)}}), fit:d=>{const l=linearFit(d);return [["r⁴斜率",l.m.toFixed(2)],["模型形态","四次方关系"],["发现规律","黏性管流四次方律"]]}},
      {name:"斯托克斯阻力", category:"流体、连续介质与输运", sub:"速度 → 黏性阻力", formula:"F = 6πηrv", legend:["F：黏性阻力","η：黏度","r：颗粒半径","v：速度"], insight:"AI 在低雷诺数条件下识别阻力与速度成正比。", gen:()=>sample(70,i=>{const v=i*.045;return {x:v,y:1.4*v+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["黏性系数",l.m.toFixed(2)],["模型形态","线性阻力"],["发现规律","低速黏性流动"]]}},
      {name:"终端速度", category:"流体、连续介质与输运", sub:"半径平方 → 沉降速度", formula:"vt ∝ r²", legend:["vt：终端速度","r²：颗粒半径平方"], insight:"AI 从沉降实验中发现小颗粒终端速度近似随半径平方增长。", gen:()=>sample(70,i=>{const r=.05+i*.01;return {x:r*r,y:1.9*r*r+noise(.002)}}), fit:d=>{const l=linearFit(d);return [["r²斜率",l.m.toFixed(2)],["模型形态","平方关系"],["发现规律","重力与黏滞平衡"]]}},
      {name:"法拉第电磁感应", category:"电磁学 · 核心方程", sub:"磁通变化率 → 电动势", formula:"ε = -N dΦ/dt", legend:["ε：感应电动势","N：线圈匝数","Φ：磁通量","dΦ/dt：磁通变化率"], insight:"AI 从磁通变化率和电压数据中发现感应电动势的线性关系。", gen:()=>sample(70,i=>{const rate=-1.6+i*.05;return {x:rate,y:-2.8*rate+noise(.05)}}), fit:d=>{const l=linearFit(d);return [["估计-N",l.m.toFixed(2)],["方向","楞次定律反向"],["发现规律","变化磁通产生电压"]]}},
      {name:"变压器比例", category:"电磁学 · 核心方程", sub:"匝数比 → 电压比", formula:"V₂/V₁ = N₂/N₁", legend:["V₁：原边电压","V₂：副边电压","N₁：原边匝数","N₂：副边匝数"], insight:"AI 从线圈匝数比和电压比数据中识别交流变压比例。", gen:()=>sample(70,i=>{const ratio=.3+i*.04;return {x:ratio,y:ratio+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["比例斜率",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电压跟随匝数比"]]}},
      {name:"库仑定律", category:"电磁学 · 核心方程", sub:"距离平方倒数 → 电力", formula:"F = kq₁q₂/r²", legend:["F：电力","k：静电力常量","q₁/q₂：两电荷量","1/r²：距离平方倒数"], insight:"AI 从电荷间距和作用力数据中识别电场力的反平方形式。", gen:()=>sample(70,i=>{const r=.7+i*.05;const inv2=1/(r*r);return {x:inv2,y:2.2*inv2+noise(.03)}}), fit:d=>{const l=linearFit(d);return [["kq₁q₂估计",l.m.toFixed(2)],["模型形态","反平方"],["发现规律","电荷作用反平方"]]}},
      {name:"斯特藩-玻尔兹曼", category:"热力学·统计物理", sub:"温度四次方 → 辐射功率", formula:"P = σAT⁴", legend:["P：辐射功率","σ：斯特藩-玻尔兹曼常数","A：辐射面积","T⁴：绝对温度四次方"], insight:"AI 从热辐射数据中发现功率对温度的四次方依赖。", gen:()=>sample(70,i=>{const T=1+i*.025;return {x:T**4,y:.9*T**4+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["T⁴斜率",l.m.toFixed(2)],["模型形态","四次方关系"],["发现规律","热辐射四次方律"]]}},
      {name:"维恩位移", category:"热力学·统计物理", sub:"温度倒数 → 峰值波长", formula:"λmax = b / T", legend:["λmax：峰值波长","b：维恩常数","1/T：温度倒数"], insight:"AI 发现黑体辐射峰值波长与温度成反比。", gen:()=>sample(70,i=>{const invT=.0018+i*.000035;return {x:invT,y:1.45*invT+noise(.00002)}}), fit:d=>{const l=linearFit(d);return [["λ-(1/T)斜率",l.m.toExponential(2)],["关系形态","反比"],["发现规律","越热峰值越短"]]}},
      {name:"普朗克关系", category:"量子力学核心方程", sub:"频率 → 能量", formula:"E = hf", legend:["E：光子能量","h：普朗克常数","f：频率"], insight:"AI 从光子频率与能量数据中识别线性量子关系。", gen:()=>sample(70,i=>{const f=i*.05;return {x:f,y:.66*f+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["估计h比例",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","光子能量离散"]]}},
      {name:"德布罗意波长", category:"量子力学核心方程", sub:"动量倒数 → 波长", formula:"λ = h/p", legend:["λ：物质波长","p：动量","h：常数"], insight:"AI 从粒子动量和波长数据中发现微观粒子的波粒二象性。", gen:()=>sample(70,i=>{const inv=.2+i*.04;return {x:inv,y:1.1*inv+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["λ-1/p斜率",l.m.toFixed(2)],["关系形态","反比"],["发现规律","物质波"]]}},
      {name:"康普顿散射", category:"量子力学核心方程", sub:"1-cosθ → 波长增量", formula:"Δλ = λc(1-cosθ)", legend:["Δλ：波长变化","θ：散射角","λc：康普顿波长"], insight:"AI 从散射角和波长偏移中发现光子碰撞电子的量子效应。", gen:()=>sample(70,i=>{const u=i/69*2;return {x:u,y:.42*u+noise(.01)}}), fit:d=>{const l=linearFit(d);return [["λc估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","散射造成波长增量"]]}},
      {name:"弹簧频率", category:"振动、波动与声学", sub:"1/m → ω²", formula:"ω² = k/m", legend:["ω²：角频率平方","k：弹性系数","m：质量","1/m：质量倒数"], insight:"AI 从不同质量的弹簧振子中发现频率平方与质量倒数成正比。", gen:()=>sample(70,i=>{const inv=.2+i*.025;return {x:inv,y:3.4*inv+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["估计k",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","质量越大振动越慢"]]}},
      {name:"共振峰", category:"振动、波动与声学", sub:"驱动频率 → 振幅", formula:"A(ω) peaks at ω₀", legend:["A：振幅","ω：驱动频率","ω₀：固有频率"], insight:"AI 从扫描频率实验中识别最大响应频率，发现系统固有频率。", gen:()=>sample(90,i=>{const w=.5+i*.03;return {x:w,y:1/(.08+(w-1.55)**2)+noise(.18)}}), fit:d=>{const peak=d.reduce((a,p)=>p.y>a.y?p:a,d[0]);return [["共振频率",peak.x.toFixed(2)],["峰值响应",peak.y.toFixed(2)],["发现规律","驱动接近固有频率时放大"]]}},
      {name:"液体静压", category:"流体、连续介质与输运", sub:"深度 → 压强", formula:"P = P₀ + ρgh", legend:["P：压强","P₀：液面压强","ρ：液体密度","g：重力加速度","h：深度"], insight:"AI 从水深和压强数据中发现压强随深度线性增加。", gen:()=>sample(70,i=>{const h=i*.08;return {x:h,y:1+9.8*h+noise(.08)}}), fit:d=>{const l=linearFit(d);return [["ρg估计",l.m.toFixed(2)],["表面压强",l.b.toFixed(2)],["发现规律","深度越大压强越高"]]}},
      {name:"阿基米德浮力", category:"流体、连续介质与输运", sub:"排开体积 → 浮力", formula:"Fb = ρgV", legend:["Fb：浮力","ρ：液体密度","g：重力加速度","V：排开体积"], insight:"AI 从排水体积和浮力数据中发现浮力线性规律。", gen:()=>sample(70,i=>{const V=i*.04;return {x:V,y:8.2*V+noise(.05)}}), fit:d=>{const l=linearFit(d);return [["ρg估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","浮力等于排开液体重量"]]}},
      {name:"黏性剪切", category:"流体、连续介质与输运", sub:"速度梯度 → 剪切应力", formula:"τ = η dv/dy", legend:["τ：剪切应力","η：黏度","dv/dy：速度梯度"], insight:"AI 从层流剪切实验中识别应力与速度梯度成正比。", gen:()=>sample(70,i=>{const grad=i*.05;return {x:grad,y:1.15*grad+noise(.03)}}), fit:d=>{const l=linearFit(d);return [["估计η",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","黏性来自速度梯度"]]}},
      {name:"弦振动频率", category:"振动、波动与声学", sub:"张力平方根 → 频率", formula:"f = (1/2L)√(T/μ)", legend:["f：频率","L：弦长","T：张力","μ：线密度"], insight:"AI 从弦乐器张力实验中发现频率随张力平方根增长。", gen:()=>sample(70,i=>{const root=.4+i*.035;return {x:root,y:2.1*root+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["f-√T斜率",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","张力升高音调升高"]]}},
      {name:"等熵气体", category:"热学基础 & 热力学定律", sub:"体积负γ次方 → 压强", formula:"PV^γ = const", legend:["P：压强","V：体积","γ：绝热指数","V^{-γ}：线性化横轴","const：绝热常数"], insight:"AI 从快速压缩数据中发现压强和体积之间的幂律关系。", gen:()=>sample(70,i=>{const V=.7+i*.035;const invGamma=1/(V**1.4);return {x:invGamma,y:2.4*invGamma+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["比例常数",l.m.toFixed(2)],["关系形态","PV^γ≈常数"],["发现规律","绝热压缩"]]}},
      {name:"霍尔效应", category:"电磁学 · 核心方程", sub:"电流磁场 → 横向电压", formula:"VH ∝ IB", legend:["VH：霍尔电压","I：电流","B：磁场"], insight:"AI 从电流、磁场和横向电压中识别载流子受磁场偏转。", gen:()=>sample(70,i=>{const IB=i*.04;return {x:IB,y:1.25*IB+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["霍尔系数",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电流与磁场产生横向电压"]]}},
      {name:"等离子频率", category:"电磁学 · 核心方程", sub:"密度 → 频率平方", formula:"ωp² ∝ n", legend:["ωp²：等离子频率平方","ωp：等离子频率","n：电子密度"], insight:"AI 从电子密度和振荡频率数据中发现频率平方随密度线性增长。", gen:()=>sample(70,i=>{const n=.2+i*.035;return {x:n,y:2.7*n+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["ωp²-n斜率",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","集体振荡由密度决定"]]}},
      {name:"哈勃定律", category:"宇宙尺度与综合规律", sub:"距离 → 退行速度", formula:"v = H₀d", legend:["v：退行速度","d：距离","H₀：哈勃常数"], insight:"AI 从星系距离和红移速度数据中发现宇宙膨胀的线性关系。", gen:()=>sample(70,i=>{const d=i*.08;return {x:d,y:70*d+noise(1.5)}}), fit:d=>{const l=linearFit(d);return [["H₀估计",l.m.toFixed(1)],["截距",l.b.toFixed(1)],["发现规律","距离越远退行越快"]]}},
    ];
    const kinematicsLaws = [
      {name:"匀速直线运动", category:"运动学 & 动力学", sub:"路程 / 时间", formula:"v = s / t", legend:["v：速度","s：路程","t：时间"], insight:"AI 从等间隔位置数据中识别距离随时间线性增长，发现速度是单位时间内通过的路程。", gen:()=>sample(70,i=>{const t=i*.12;return {x:t,y:2.4*t+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["估计速度v",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","路程与时间成正比"]]}},
      {name:"加速度定义", category:"运动学 & 动力学", sub:"速度变化率", formula:"a = Δv / t", legend:["a：加速度","Δv：速度变化量","t：时间"], insight:"AI 从速度随时间的变化中计算斜率，发现加速度描述速度变化快慢。", gen:()=>sample(70,i=>{const t=i*.12;return {x:t,y:.85*t+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["估计加速度a",l.m.toFixed(2)],["速度变化","线性增加"],["发现规律","加速度是速度变化率"]]}},
      {name:"匀变速速度公式", category:"运动学 & 动力学", sub:"初速度 + 加速度", formula:"v = v₀ + at", legend:["v：末速度","v₀：初速度","a：加速度","t：时间"], insight:"AI 识别速度-时间图像中的直线结构，分离初速度和加速度。", gen:()=>sample(70,i=>{const t=i*.1;return {x:t,y:1.2+.72*t+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["初速度v₀",l.b.toFixed(2)],["加速度a",l.m.toFixed(2)],["发现规律","速度按时间线性变化"]]}},
      {name:"匀变速位移公式", category:"运动学 & 动力学", sub:"位移二次增长", formula:"s = v₀t + 1/2 at²", legend:["s：位移","v₀t：初速度贡献位移","a：加速度","t：时间","t²：时间平方项"], insight:"AI 从位移-时间曲线中识别二次项，发现匀加速运动的位移不是线性增长。", gen:()=>sample(70,i=>{const t=i*.1;return {x:t,y:.75*t+.28*t*t+noise(.04)}}), fit:d=>{const q=quadFit(d);return [["二次项",q.a.toFixed(3)],["估计a",(2*q.a).toFixed(3)],["发现规律","位移包含时间平方项"]]}},
      {name:"速度位移关系", category:"运动学 & 动力学", sub:"消去时间", formula:"v² - v₀² = 2as", legend:["v²：末速度平方","v₀²：初速度平方","a：加速度","s：位移"], insight:"AI 把速度平方与位移对齐，发现不需要显式时间也能描述匀变速运动。", gen:()=>sample(70,i=>{const s=i*.08;return {x:s,y:1.1+1.6*s+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["2a估计",l.m.toFixed(2)],["v₀²估计",l.b.toFixed(2)],["发现规律","速度平方与位移线性相关"]]}},
      {name:"自由落体高度", category:"运动学 & 动力学", sub:"时间平方 → 下落高度", formula:"h = 1/2 gt²", legend:["h：下落高度","g：重力加速度","t²：时间平方"], insight:"AI 从下落高度和时间平方数据中发现线性关系，估计重力加速度。", gen:()=>sample(70,i=>{const t=i*.035;return {x:t*t,y:4.9*t*t+noise(.01)}}), fit:d=>{const l=linearFit(d);return [["1/2 g",l.m.toFixed(2)],["估计g",(2*l.m).toFixed(2)],["发现规律","自由落体是匀加速运动"]]}},
      {name:"平抛合速度", category:"运动学 & 动力学", sub:"竖直速度平方 → 合速度平方", formula:"v² = vₓ² + vᵧ²", legend:["v²：合速度平方","vₓ²：水平速度平方","vᵧ²：竖直速度平方"], insight:"AI 从水平和竖直分速度中发现合速度遵循直角三角形的平方和关系。", gen:()=>sample(70,i=>{const vy=i*.06;const vx=1.8;return {x:vy*vy,y:vx*vx+vy*vy+noise(.01)}}), fit:d=>{const l=linearFit(d);return [["v²-vy²斜率",l.m.toFixed(2)],["vx²截距",l.b.toFixed(2)],["发现规律","二维速度按矢量合成"]]}},
      {name:"向心加速度", category:"运动学 & 动力学", sub:"速度平方 → 向心加速度", formula:"aₙ = v²/r = ω²r", legend:["aₙ：向心加速度","v²：线速度平方","r：半径","ω：角速度"], insight:"AI 从圆周轨迹数据中发现向心加速度与速度平方成正比。", gen:()=>sample(70,i=>{const v=.25+i*.055;return {x:v*v,y:.95*v*v+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["1/r估计",l.m.toFixed(2)],["关系形态","v²线性"],["发现规律","圆周运动需要指向圆心的加速度"]]}},
      {name:"牛顿第二定律", category:"运动学 & 动力学", sub:"力产生加速度", formula:"F = ma", legend:["F：合力","m：质量","a：加速度"], insight:"AI 从不同受力下的加速度数据中识别比例系数，发现质量是抗拒加速的惯性尺度。", gen:()=>sample(70,i=>{const a=i*.05;return {x:a,y:3.2*a+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["估计质量m",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","合力与加速度成正比"]]}},
      {name:"PMA粒子相互作用动力学", category:"运动学 & 动力学", visual:"pma", sub:"粒子对 → 弹性/阻尼/外力合成", formula:"mᵢ dvᵢ/dt = Σⱼ≠ᵢ kᵣxⱼᵢ + Σⱼ≠ᵢ kₐxⱼᵢ + Σⱼ≠ᵢ cᵣvⱼᵢ + Σⱼ≠ᵢ kᵣₑxⱼᵢ + Fᵢ", legend:["mᵢ：第i个粒子质量","dvᵢ/dt：第i个粒子速度变化率","kᵣxⱼᵢ：径向弹性","kₐxⱼᵢ：切向/吸引弹性","cᵣvⱼᵢ：阻尼","kᵣₑxⱼᵢ：额外恢复项","Fᵢ：外力"], insight:"AI 把两个粒子间的径向弹性、切向或吸引弹性、阻尼、额外恢复项和外力统一为合力项，可作为 PMA continuum simulation 的多粒子控制方程。", gen:()=>sample(90,i=>{const r=.55+i*.022;let y;if(r<1.0)y=-2.8*(1-r);else if(r<1.35)y=1.7*(r-1.0);else if(r<1.95)y=.6;else y=0;return {x:r,y:y+noise(.025)}}), fit:d=>{const peak=d.reduce((a,p)=>p.y>a.y?p:a,d[0]);return [["平衡距离R₀","约1.00"],["吸引范围Rₐ",peak.x.toFixed(2)],["发现规律","粒子加速度来自相互作用力求和"]]}},
      {name:"牛顿第三定律", category:"运动学 & 动力学", sub:"作用力与反作用力", formula:"F_AB = -F_BA", legend:["F_AB：A对B的力","F_BA：B对A的力"], insight:"AI 比较相互作用双方的力传感器数据，发现大小相等、方向相反。", gen:()=>sample(70,i=>{const f=-1.6+i*.05;return {x:f,y:-f+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["斜率",l.m.toFixed(2)],["目标斜率","-1.00"],["发现规律","相互作用成对出现"]]}},
      {name:"重力与质量", category:"运动学 & 动力学", sub:"重力计算", formula:"G = mg", legend:["G：重力","m：质量","g：重力加速度"], insight:"AI 从不同质量物体的称重数据中发现重力与质量成正比。", gen:()=>sample(70,i=>{const m=i*.06;return {x:m,y:9.8*m+noise(.06)}}), fit:d=>{const l=linearFit(d);return [["估计g",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","同一地点重力正比于质量"]]}},
      {name:"滑动摩擦力", category:"运动学 & 动力学", sub:"正压力比例", formula:"f = μN", legend:["f：摩擦力","μ：摩擦因数","N：正压力"], insight:"AI 从不同载荷下的摩擦力数据中识别摩擦因数，发现滑动摩擦近似由正压力决定。", gen:()=>sample(70,i=>{const N=.2+i*.08;return {x:N,y:.38*N+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["估计μ",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","滑动摩擦力正比于正压力"]]}},
      {name:"万有引力定律", category:"运动学 & 动力学", sub:"质量乘积/距离平方 → 引力", formula:"F = Gm₁m₂ / r²", legend:["F：引力","G：引力常数","m₁/m₂：两物体质量","r²：距离平方","m₁m₂/r²：线性化横轴"], insight:"AI 从两物体质量、距离和引力数据中识别质量乘积正比、距离平方反比的结构。", gen:()=>sample(70,i=>{const inv=.18+i*.03;return {x:inv,y:6.67*inv+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["G比例估计",l.m.toFixed(2)],["变量结构","m₁m₂/r²"],["发现规律","质量吸引与距离平方衰减"]]}},
      {name:"黄金代换", category:"运动学 & 动力学", sub:"地表引力近似", formula:"GM = gR²", legend:["G：引力常数","M：地球质量","g：地表重力加速度","R²：地球半径平方"], insight:"AI 把万有引力与地表重力连接起来，发现宏观天体参数可以由近地测量约束。", gen:()=>sample(70,i=>{const R=1+i*.02;return {x:R*R,y:9.8*R*R+noise(.05)}}), fit:d=>{const l=linearFit(d);return [["GM比例",l.m.toFixed(2)],["关系形态","gR²"],["发现规律","近地重力连接中心引力"]]}},
      {name:"环绕速度", category:"运动学 & 动力学", sub:"轨道半径倒数 → 速度平方", formula:"v² = GM / r", legend:["v²：环绕速度平方","G：引力常数","M：中心天体质量","r：轨道半径"], insight:"AI 从轨道半径倒数和速度平方数据中发现线性关系，等价于 v = √(GM/r)。", gen:()=>sample(70,i=>{const inv=.18+i*.025;return {x:inv,y:3.6*inv+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["GM估计",l.m.toFixed(2)],["关系形态","v² ∝ 1/r"],["发现规律","圆轨道由引力提供向心力"]]}},
      {name:"开普勒第三定律", category:"运动学 & 动力学", sub:"半长轴三次方 → 周期平方", formula:"T² / a³ = k", legend:["T²：公转周期平方","a³：轨道半长轴三次方","k：系统常数"], insight:"AI 对行星轨道数据做幂律回归，发现周期平方与半长轴三次方成正比。", gen:()=>sample(70,i=>{const a=.45+i*.035;return {x:a*a*a,y:1.15*a*a*a+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["T²/a³",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","同一中心天体共享轨道常数"]]}},
    ];
    const energyMomentumLaws = [
      {name:"恒力做功", category:"功能·动量", sub:"力与位移夹角", formula:"W = Fs cosθ", legend:["W：功","F：恒力","s：位移","θ：力与位移夹角"], insight:"AI 从不同夹角下的做功数据中识别投影关系，发现只有沿位移方向的力做功。", gen:()=>sample(70,i=>{const c=i/69;return {x:c,y:4.2*c+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["Fs估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","做功取决于力的位移投影"]]}},
      {name:"功率定义", category:"功能·动量", sub:"做功快慢", formula:"P = W / t = Fv", legend:["P：功率","W：功","t：时间","F：力","v：速度"], insight:"AI 把单位时间做功与力乘速度关联起来，识别功率描述能量转移速率。", gen:()=>sample(70,i=>{const v=i*.06;return {x:v,y:3.4*v+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["F估计",l.m.toFixed(2)],["关系形态","P∝v"],["发现规律","功率是能量变化率"]]}},
      {name:"动能公式", category:"功能·动量", sub:"速度平方 → 动能", formula:"Eₖ = 1/2 mv²", legend:["Eₖ：动能","m：质量","v²：速度平方"], insight:"AI 从速度平方和能量数据中发现动能与速度平方成正比。", gen:()=>sample(70,i=>{const v=i*.055;return {x:v*v,y:1.7*v*v+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["1/2 m",l.m.toFixed(2)],["关系形态","v²线性"],["发现规律","运动能量随速度平方增长"]]}},
      {name:"重力势能公式", category:"功能·动量", sub:"高度储能", formula:"Eₚ = mgh", legend:["Eₚ：重力势能","m：质量","g：重力加速度","h：高度"], insight:"AI 从抬升高度与能量数据中发现势能线性增加。", gen:()=>sample(70,i=>{const h=i*.08;return {x:h,y:6.1*h+noise(.055)}}), fit:d=>{const l=linearFit(d);return [["mg估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","高度差对应可释放能量"]]}},
      {name:"弹性势能公式", category:"功能·动量", sub:"形变平方 → 弹性势能", formula:"Eₚ = 1/2 kx²", legend:["Eₚ：弹性势能","k：劲度系数","x²：形变量平方"], insight:"AI 从弹簧压缩实验中发现储能与形变量平方成正比。", gen:()=>sample(70,i=>{const dx=-1.7+i*.05;return {x:dx*dx,y:1.15*dx*dx+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["1/2 k",l.m.toFixed(2)],["估计k",(2*l.m).toFixed(2)],["发现规律","弹簧储能来自平方形变"]]}},
      {name:"机械能守恒", category:"功能·动量", sub:"动能势能互换", formula:"Eₖ + Eₚ = 常量", legend:["Eₖ：动能","Eₚ：势能","常量：总机械能"], insight:"AI 发现只有重力或弹力做功时，总机械能在动能和势能之间转化但总量近似不变。", gen:()=>sample(70,i=>{const t=i*.09;return {x:t,y:2.4+noise(.015)}}), fit:d=>{const y=d.map(p=>p.y);return [["总能量均值",(y.reduce((s,v)=>s+v,0)/y.length).toFixed(2)],["波动范围",(Math.max(...y)-Math.min(...y)).toFixed(2)],["发现规律","能量形式转换但总量守恒"]]}},
      {name:"动量定义", category:"功能·动量", sub:"质量乘速度", formula:"p = mv", legend:["p：动量","m：质量","v：速度"], insight:"AI 从不同速度下的碰撞响应中发现动量与速度线性相关，比例系数是质量。", gen:()=>sample(70,i=>{const v=-1.6+i*.05;return {x:v,y:2.7*v+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["估计质量m",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","动量刻画运动状态"]]}},
      {name:"动量定理", category:"功能·动量", sub:"冲量改变动量", formula:"FΔt = Δp", legend:["F：平均力","Δt：作用时间","Δp：动量变化"], insight:"AI 从冲击实验中识别力和作用时间的乘积决定动量变化。", gen:()=>sample(70,i=>{const impulse=i*.06;return {x:impulse,y:impulse+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["斜率",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","冲量等于动量变化"]]}},
      {name:"动量守恒", category:"功能·动量", sub:"系统合外力为零", formula:"Σp_before = Σp_after", legend:["p_before：碰前总动量","p_after：碰后总动量"], insight:"AI 比较碰撞前后总动量，发现孤立系统总动量保持不变。", gen:()=>sample(70,i=>{const before=-1.5+i*.05;return {x:before,y:before+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["守恒斜率",l.m.toFixed(2)],["偏差",Math.abs(l.b).toFixed(2)],["发现规律","无外力系统动量守恒"]]}},
    ];
    const thermalLaws = [
      {name:"比热容吸热", category:"热学基础 & 热力学定律", sub:"温升吸热", formula:"Q = cmΔT", legend:["Q：热量","c：比热容","m：质量","ΔT：温度变化"], insight:"AI 从加热实验中发现吸热量与质量和温升成正比。", gen:()=>sample(70,i=>{const dT=i*.08;return {x:dT,y:4.18*dT+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["cm估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","升温吸热线性增长"]]}},
      {name:"相变潜热", category:"热学基础 & 热力学定律", sub:"相变吸放热", formula:"Q = mL", legend:["Q：热量","m：质量","L：熔化热或汽化热"], insight:"AI 在恒温相变阶段发现热量与参与相变的质量成正比。", gen:()=>sample(70,i=>{const m=i*.05;return {x:m,y:2.26*m+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["潜热L估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","相变吸热不必升温"]]}},
      {name:"理想气体状态方程", category:"热学基础 & 热力学定律", sub:"状态变量约束", formula:"pV = nRT", legend:["p：压强","V：体积","n：物质的量","R：气体常数","T：温度"], insight:"AI 从压强、体积和温度数据中发现 pV 与 T 的线性关系。", gen:()=>sample(70,i=>{const T=250+i*2.2;return {x:T,y:.083*T+noise(.05)}}), fit:d=>{const l=linearFit(d);return [["nR估计",l.m.toFixed(3)],["截距",l.b.toFixed(2)],["发现规律","气体状态由pVT共同约束"]]}},
      {name:"热力学第一定律", category:"热学基础 & 热力学定律", sub:"内能变化", formula:"ΔU = Q + W", legend:["ΔU：内能变化","Q：吸收热量","W：外界对系统做功"], insight:"AI 把热量和做功同时纳入能量账本，发现内能变化来自两种能量传递方式。", gen:()=>sample(70,i=>{const input=i*.07;return {x:input,y:input+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["能量账本斜率",l.m.toFixed(2)],["偏差",Math.abs(l.b).toFixed(2)],["发现规律","热和功共同改变内能"]]}},
      {name:"热力学第二定律", category:"热学基础 & 热力学定律", sub:"方向性与熵增", formula:"ΔS_universe ≥ 0", legend:["ΔS_universe：孤立总系统熵变","≥0：总熵不减少"], insight:"AI 从不可逆过程数据中识别宏观过程方向性，发现孤立系统总熵不减少。", gen:()=>sample(70,i=>{const t=i*.08;return {x:t,y:.18*t+noise(.01)}}), fit:d=>{const l=linearFit(d);return [["熵增速率",l.m.toFixed(2)],["趋势","非负增长"],["发现规律","自然过程存在方向性"]]}},
      {name:"热力学零定律", category:"热学基础 & 热力学定律", sub:"热平衡与温度", formula:"A = B, B = C ⇒ A = C", legend:["A/B/C：热接触系统","=：热平衡关系","T：共同温度标尺"], insight:"AI 从多个系统热接触后的稳定读数中发现温度可作为热平衡的共同标尺。", gen:()=>sample(70,i=>{const T=20+i*.08;return {x:T,y:T+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["温标一致性",l.m.toFixed(2)],["偏差",Math.abs(l.b).toFixed(2)],["发现规律","温度定义来自热平衡传递性"]]}},
      {name:"线膨胀", category:"热学基础 & 热力学定律", sub:"长度随温度变化", formula:"ΔL = αL₀ΔT", legend:["ΔL：长度变化","α：线膨胀系数","L₀：初始长度","ΔT：温度变化"], insight:"AI 从材料受热伸长数据中发现长度变化与温度变化成正比。", gen:()=>sample(70,i=>{const dT=i*.08;return {x:dT,y:.023*dT+noise(.002)}}), fit:d=>{const l=linearFit(d);return [["αL₀估计",l.m.toFixed(3)],["截距",l.b.toFixed(3)],["发现规律","固体受热线性膨胀"]]}},
    ];
    const statisticalPhysicsLaws = [
      {name:"热力学基本方程", category:"热力学·统计物理", sub:"内能微分关系", formula:"dU = TdS - pdV", legend:["dU：内能微小变化","T：温度","dS：熵微小变化","p：压强","dV：体积微小变化"], insight:"AI 从准静态过程数据中发现内能变化可由热项 TdS 与体积功项 -pdV 共同描述。", gen:()=>sample(70,i=>{const x=i*.05;return {x,y:1.4*x+noise(.03)}}), fit:d=>{const l=linearFit(d);return [["热功耦合斜率",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","宏观态变量满足微分约束"]]}},
      {name:"热力学势", category:"热力学·统计物理", sub:"自由能与焓", formula:"F = U - TS,  G = H - TS,  H = U + pV", legend:["F：亥姆霍兹自由能","G：吉布斯自由能","H：焓","U：内能","TS：热熵项","pV：压强体积项"], insight:"AI 在不同约束条件下比较可用能量，发现自由能决定系统趋向和可做功能力。", gen:()=>sample(70,i=>{const T=i*.06;return {x:T,y:3.0-.72*T+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["熵项斜率",l.m.toFixed(2)],["趋势","温度升高自由能降低"],["发现规律","不同约束对应不同热力学势"]]}},
      {name:"麦克斯韦关系", category:"热力学·统计物理", sub:"热力学偏导对称", formula:"由热函数二阶偏导导出", legend:["热力学势：状态函数","二阶偏导：混合偏导相等"], insight:"AI 从状态函数曲面中发现不同偏导路径给出相同结果，导出麦克斯韦关系。", gen:()=>sample(70,i=>{const x=-1.5+i*.045;return {x,y:x+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["互易斜率",l.m.toFixed(2)],["偏导差",Math.abs(l.b).toFixed(2)],["发现规律","状态函数二阶偏导具有对称性"]]}},
      {name:"玻尔兹曼熵", category:"热力学·统计物理", sub:"微观状态数", formula:"S = k ln Ω", legend:["S：熵","k：玻尔兹曼常数","Ω：微观状态数"], insight:"AI 从可达微观状态数和熵数据中发现宏观熵是微观可能性的对数。", gen:()=>sample(70,i=>{const lnOmega=i*.08;return {x:lnOmega,y:1.38*lnOmega+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["k比例",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","熵度量微观状态数"]]}},
      {name:"正则配分函数", category:"热力学·统计物理", sub:"统计权重汇总", formula:"Z = Σe^{-βEᵢ},  β = 1/(kT)", legend:["Z：配分函数","β：倒温度","Eᵢ：能级","k：玻尔兹曼常数","T：绝对温度"], insight:"AI 从能级占据概率中发现玻尔兹曼权重可汇总为配分函数，并由它导出自由能。", gen:()=>sample(70,i=>{const beta=.15+i*.035;return {x:beta,y:Math.exp(-1.2*beta)+noise(.01)}}), fit:d=>{const l=linearFit(d.map(p=>({x:p.x,y:Math.log(Math.max(.01,p.y))})));return [["能量尺度",(-l.m).toFixed(2)],["权重形态","e^{-βE}"],["发现规律","平衡分布由配分函数归一化"]]}},
      {name:"玻色-爱因斯坦分布", category:"热力学·统计物理", sub:"玻色子统计", formula:"⟨n⟩ = 1/(e^{β(ε-μ)} - 1)", legend:["⟨n⟩：平均占据数","ε：能级能量","μ：化学势","β：倒温度"], insight:"AI 从玻色子占据数中发现低能级可被大量粒子共同占据。", gen:()=>sample(70,i=>{const x=.22+i*.045;return {x,y:1/(Math.exp(x)-1)+noise(.025)}}), fit:d=>[["低能占据","显著增大"],["统计类型","玻色子"],["发现规律","玻色子允许同态聚集"]]},
      {name:"费米-狄拉克分布", category:"热力学·统计物理", sub:"费米子统计", formula:"⟨n⟩ = 1/(e^{β(ε-μ)} + 1)", legend:["⟨n⟩：平均占据数","ε：能级能量","μ：化学势","β：倒温度"], insight:"AI 从费米子占据数中发现单态占据受限，体现泡利不相容。", gen:()=>sample(70,i=>{const x=-2+i*.06;return {x,y:1/(Math.exp(x)+1)+noise(.01)}}), fit:d=>[["最大占据","约1"],["统计类型","费米子"],["发现规律","费米子单态占据受限"]]},
      {name:"普朗克黑体辐射", category:"热力学·统计物理", sub:"辐射能谱", formula:"I(ν,T) = 2hν³/c² · 1/(e^{hν/kT}-1)", legend:["I(ν,T)：谱辐射强度","ν：频率","T：温度","h：普朗克常量","c：光速","k：玻尔兹曼常数"], insight:"AI 从黑体辐射谱中发现低频和高频两端都受量子统计约束，避免经典紫外灾难。", gen:()=>sample(90,i=>{const x=.08+i*.035;return {x,y:(x**3)/(Math.exp(x)-1)+noise(.01)}}), fit:d=>{const peak=d.reduce((a,p)=>p.y>a.y?p:a,d[0]);return [["峰值频率",peak.x.toFixed(2)],["谱形","单峰分布"],["发现规律","黑体谱来自量子化振子统计"]]}},
    ];
    const electromagnetismLaws = [
      {name:"电场强度定义", category:"电磁学 · 核心方程", sub:"单位电荷受力", formula:"E = F / q", legend:["E：电场强度","F：电场力","q：试探电荷"], insight:"AI 从不同试探电荷的受力中识别电场是单位电荷所受的力。", gen:()=>sample(70,i=>{const q=i*.045;return {x:q,y:5.2*q+noise(.04)}}), fit:d=>{const l=linearFit(d);return [["E估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电场独立于试探电荷"]]}},
      {name:"点电荷场强", category:"电磁学 · 核心方程", sub:"距离平方倒数 → 场强", formula:"E = kQ / r²", legend:["E：场强","k：静电力常量","Q：源电荷","1/r²：距离平方倒数"], insight:"AI 从距离和场强数据中发现点电荷电场按反平方衰减。", gen:()=>sample(70,i=>{const r=.7+i*.05;const inv2=1/(r*r);return {x:inv2,y:2.1*inv2+noise(.03)}}), fit:d=>{const l=linearFit(d);return [["kQ估计",l.m.toFixed(2)],["模型形态","反平方"],["发现规律","点电荷电场反平方"]]}},
      {name:"电势差定义", category:"电磁学 · 核心方程", sub:"单位电荷做功", formula:"U_AB = W_AB / q", legend:["U_AB：电势差","W_AB：电场力做功","q：电荷量"], insight:"AI 从移动电荷所做功中发现电势差是单位电荷能量变化。", gen:()=>sample(70,i=>{const q=i*.045;return {x:q,y:3.6*q+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["U_AB估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电压是单位电荷能量差"]]}},
      {name:"匀强电场电势差", category:"电磁学 · 核心方程", sub:"场强与距离", formula:"E = U / d", legend:["E：场强","U：电势差","d：板间距离"], insight:"AI 在平行板电场中发现电压与距离的比值决定场强。", gen:()=>sample(70,i=>{const d=.2+i*.04;return {x:d,y:4.5*d+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["E估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","匀强电场电压随距离线性增加"]]}},
      {name:"电容定义", category:"电磁学 · 核心方程", sub:"储存电荷能力", formula:"C = Q / U", legend:["C：电容","Q：电荷量","U：电压"], insight:"AI 从充电数据中发现电荷量与电压成正比，比例就是电容。", gen:()=>sample(70,i=>{const U=i*.06;return {x:U,y:1.8*U+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["电容C估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电容刻画储电能力"]]}},
      {name:"电阻定律", category:"电磁学 · 核心方程", sub:"材料与几何", formula:"R = ρL / S", legend:["R：电阻","ρ：电阻率","L：长度","S：横截面积"], insight:"AI 从导线长度和截面积数据中识别电阻与 L/S 成正比。", gen:()=>sample(70,i=>{const ratio=.2+i*.06;return {x:ratio,y:2.4*ratio+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["ρ估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电阻由材料和几何共同决定"]]}},
      {name:"电功率", category:"电磁学 · 核心方程", sub:"电流平方 → 功率", formula:"P = UI = I²R", legend:["P：功率","U：电压","I：电流","I²：线性化横轴","R：电阻"], insight:"AI 从电路测量中发现电功率既可由电压电流计算，也可由电流平方和电阻计算。", gen:()=>sample(70,i=>{const I=i*.055;return {x:I*I,y:3.3*I*I+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["R估计",l.m.toFixed(2)],["关系形态","I²线性"],["发现规律","焦耳热来自电流平方项"]]}},
      {name:"基尔霍夫定律", category:"电磁学 · 核心方程", sub:"节点与回路约束", formula:"ΣI_in = ΣI_out,  ΣΔV = 0", legend:["I：电流","ΔV：回路电势变化"], insight:"AI 从复杂电路的节点和回路数据中发现电荷守恒与能量守恒约束。", gen:()=>sample(70,i=>{const balance=-1.5+i*.05;return {x:balance,y:balance+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["守恒斜率",l.m.toFixed(2)],["不平衡量",Math.abs(l.b).toFixed(2)],["发现规律","电路必须满足节点与回路约束"]]}},
      {name:"安培力", category:"电磁学 · 核心方程", sub:"磁场对电流作用", formula:"F = BIL sinθ", legend:["F：安培力","B：磁感应强度","I：电流","L：导线长度","θ：电流方向与磁场夹角"], insight:"AI 从不同电流和磁场角度实验中识别磁场对通电导线的作用。", gen:()=>sample(70,i=>{const BI=i*.055;return {x:BI,y:2.2*BI+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["L sinθ估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电流在磁场中受力"]]}},
      {name:"带电粒子回旋半径", category:"电磁学 · 核心方程", sub:"匀强磁场圆周运动", formula:"r = mv / qB", legend:["r：半径","m：质量","v：速度","q：电荷量","B：磁场"], insight:"AI 从粒子轨迹半径和速度数据中发现回旋半径与速度成正比。", gen:()=>sample(70,i=>{const v=i*.055;return {x:v,y:1.45*v+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["m/qB估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","磁场使带电粒子做圆周运动"]]}},
      {name:"无限长直导线磁场", category:"电磁学 · 核心方程", sub:"距离倒数 → 磁场", formula:"B = μ₀I / 2πr", legend:["B：磁感应强度","μ₀：真空磁导率","I：电流","1/r：距离倒数"], insight:"AI 从导线周围磁场数据中发现磁场与电流成正比、与距离成反比。", gen:()=>sample(70,i=>{const inv=.2+i*.04;return {x:inv,y:1.9*inv+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["μ₀I/2π估计",l.m.toFixed(2)],["关系形态","B∝1/r"],["发现规律","电流周围形成环形磁场"]]}},
      {name:"动生电动势", category:"电磁学 · 核心方程", sub:"切割磁感线", formula:"ε = BLv", legend:["ε：电动势","B：磁场","L：导体长度","v：速度"], insight:"AI 从导体切割磁感线实验中发现电动势与速度成正比。", gen:()=>sample(70,i=>{const v=i*.06;return {x:v,y:2.6*v+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["BL估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","运动导体产生电动势"]]}},
      {name:"正弦交流电", category:"电磁学 · 核心方程", sub:"交流瞬时值", formula:"u = Uₘ sin(ωt)", legend:["u：瞬时电压","Uₘ：峰值电压","ω：角频率","t：时间"], insight:"AI 从交流电压波形中识别正弦周期结构，并估计峰值和频率。", gen:()=>sample(90,i=>{const t=i/10;return {x:t,y:1.4*Math.sin(1.6*t)+noise(.025)}}), fit:d=>{const period=estimatePeriod(d);return [["估计周期",period.toFixed(2)+" s"],["峰值","约1.40"],["发现规律","交流电按正弦变化"]]}},
    ];
    const maxwellLaws = [
      {name:"高斯电场定律", category:"麦克斯韦方程组（电磁场统一）", sub:"电荷产生电通量", formula:"∇ · E = ρ / ε₀", legend:["∇·E：电场散度","E：电场","ρ：电荷密度","ε₀：真空介电常数"], insight:"AI 从封闭曲面通量和包围电荷数据中发现电荷是电场散度的来源。", gen:()=>sample(70,i=>{const rho=i*.05;return {x:rho,y:1.13*rho+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["1/ε₀比例",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电荷产生电场源"]]}},
      {name:"高斯磁场定律", category:"麦克斯韦方程组（电磁场统一）", sub:"无磁单极", formula:"∇ · B = 0", legend:["B：磁场","∇·B：磁场散度"], insight:"AI 从封闭曲面磁通测量中发现净磁通近似为零，说明磁力线没有孤立起点或终点。", gen:()=>sample(70,i=>{const surface=-1.7+i*.05;return {x:surface,y:noise(.018)}}), fit:d=>{const avg=d.reduce((s,p)=>s+p.y,0)/d.length;return [["净磁通均值",avg.toFixed(3)],["目标值","0"],["发现规律","磁场无孤立源"]]}},
      {name:"法拉第感应定律", category:"麦克斯韦方程组（电磁场统一）", sub:"变磁生电", formula:"∇ × E = -∂B/∂t", legend:["∇×E：电场旋度","∂B/∂t：磁场变化率"], insight:"AI 从变化磁场和感应电场环量中发现变化磁场会激发涡旋电场。", gen:()=>sample(70,i=>{const rate=-1.6+i*.05;return {x:rate,y:-1.05*rate+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["反向斜率",l.m.toFixed(2)],["方向","负号耦合"],["发现规律","变化磁场激发涡旋电场"]]}},
      {name:"安培-麦克斯韦定律", category:"麦克斯韦方程组（电磁场统一）", sub:"电流与位移电流", formula:"∇ × B = μ₀J + μ₀ε₀ ∂E/∂t", legend:["∇×B：磁场旋度","J：传导电流密度","∂E/∂t：电场变化率"], insight:"AI 把传导电流和变化电场同时纳入磁场来源，发现位移电流使电磁理论闭合。", gen:()=>sample(70,i=>{const drive=i*.05;return {x:drive,y:1.42*drive+noise(.03)}}), fit:d=>{const l=linearFit(d);return [["耦合强度",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","电流和变化电场共同产生磁旋度"]]}},
      {name:"电磁波速度", category:"麦克斯韦方程组（电磁场统一）", sub:"光速来源", formula:"c = 1 / √(μ₀ε₀)", legend:["c：光速","μ₀：真空磁导率","ε₀：真空介电常数"], insight:"AI 从电场和磁场耦合常数中推导传播速度，发现光是电磁波。", gen:()=>sample(70,i=>{const invRoot=.5+i*.04;return {x:invRoot,y:invRoot+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["传播比例",l.m.toFixed(2)],["关系形态","c=1/√μ₀ε₀"],["发现规律","电磁场耦合产生光速"]]}},
    ];
    const opticsLaws = [
      {name:"全反射临界角", category:"光学 · 几何与波动", sub:"临界条件", formula:"sin C = n₂ / n₁", legend:["C：临界角","n₁：入射介质折射率","n₂：折射介质折射率"], insight:"AI 从入射角扫描中发现，当 n₁>n₂ 且折射角趋近 90° 时出现全反射临界条件。", gen:()=>sample(70,i=>{const ratio=.45+i*.006;return {x:ratio,y:Math.asin(ratio)+noise(.004)}}), fit:d=>{const l=linearFit(d.map(p=>({x:Math.sin(p.y),y:p.x})));return [["sinC比值",l.m.toFixed(2)],["条件","n₁ > n₂"],["发现规律","超过临界角发生全反射"]]}},
      {name:"薄透镜成像", category:"光学 · 几何与波动", sub:"物距像距焦距", formula:"1/u + 1/v = 1/f", legend:["u：物距","v：像距","f：焦距"], insight:"AI 从透镜成像实验中发现物距倒数和像距倒数之和保持为焦距倒数。", gen:()=>sample(70,i=>{const invU=.08+i*.006;return {x:invU,y:.16-invU+noise(.002)}}), fit:d=>{const l=linearFit(d);return [["斜率",l.m.toFixed(2)],["1/f估计",(l.b).toFixed(3)],["发现规律","物距像距由焦距约束"]]}},
      {name:"双缝干涉条纹", category:"光学 · 几何与波动", sub:"条纹间距", formula:"Δy = λL / d", legend:["Δy：条纹间距","λ：波长","L：屏距","d：双缝间距"], insight:"AI 从条纹间距、屏距和缝距数据中发现干涉条纹由波长比例决定。", gen:()=>sample(70,i=>{const ratio=.2+i*.035;return {x:ratio,y:1.05*ratio+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["λ估计比例",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","干涉条纹间距与λL/d成正比"]]}},
      {name:"光栅方程", category:"光学 · 几何与波动", sub:"亮纹条件", formula:"d sinθ = kλ", legend:["d：光栅常数","θ：衍射角","k：级次","λ：波长"], insight:"AI 从多级亮纹角度中发现 sinθ 与级次 k 成正比，识别光栅衍射条件。", gen:()=>sample(70,i=>{const k=i/12;return {x:k,y:.18*k+noise(.006)}}), fit:d=>{const l=linearFit(d);return [["λ/d估计",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","亮纹满足路径差整数波长"]]}},
    ];
    const modernPhysicsLaws = [
      {name:"质能等价", category:"近代物理·相对论与量子初步", sub:"质量就是能量", formula:"E = mc²", legend:["E：静能","m：质量","c：光速"], insight:"AI 从质量亏损和释放能量数据中发现质量与能量通过 c² 建立等价关系。", gen:()=>sample(70,i=>{const m=i*.04;return {x:m,y:9*m+noise(.05)}}), fit:d=>{const l=linearFit(d);return [["c²比例",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","质量可转化为能量"]]}},
      {name:"时间膨胀", category:"近代物理·相对论与量子初步", sub:"运动时钟变慢", formula:"Δt = γΔτ,  γ = 1/√(1-v²/c²)", legend:["Δt：观测时间","Δτ：固有时间","γ：洛伦兹因子","v：速度","c：光速"], insight:"AI 从高速粒子寿命数据中发现运动越快，外部观察到的时间间隔越长。", gen:()=>sample(70,i=>{const beta=.05+i*.012;const gamma=1/Math.sqrt(1-beta*beta);return {x:beta,y:gamma+noise(.002)}}), fit:d=>{const last=d[d.length-1];return [["最高β",last.x.toFixed(2)],["γ估计",last.y.toFixed(3)],["发现规律","高速运动导致时间膨胀"]]}},
      {name:"长度收缩", category:"近代物理·相对论与量子初步", sub:"运动方向变短", formula:"L = L₀ / γ", legend:["L：观测长度","L₀：固有长度","γ：洛伦兹因子"], insight:"AI 从高速物体长度测量中识别运动方向长度随洛伦兹因子收缩。", gen:()=>sample(70,i=>{const beta=.05+i*.012;const gamma=1/Math.sqrt(1-beta*beta);return {x:beta,y:1/gamma+noise(.002)}}), fit:d=>{const last=d[d.length-1];return [["最高β",last.x.toFixed(2)],["L/L₀",last.y.toFixed(3)],["发现规律","高速运动导致长度收缩"]]}},
      {name:"光电效应方程", category:"近代物理·相对论与量子初步", sub:"光量子能量账本", formula:"hν = W₀ + Eₖ", legend:["h：普朗克常量","ν：频率","W₀：逸出功","Eₖ：光电子动能"], insight:"AI 从入射光频率和电子最大动能中发现光能量按频率量子化。", gen:()=>sample(70,i=>{const nu=1+i*.06;return {x:nu,y:Math.max(0,.76*nu-.95)+noise(.018)}}), fit:d=>{const useful=d.filter(p=>p.y>.03);const l=linearFit(useful);return [["h估计比例",l.m.toFixed(2)],["逸出功",(-l.b).toFixed(2)],["发现规律","光能量由频率决定"]]}},
      {name:"海森堡不确定性", category:"近代物理·相对论与量子初步", sub:"位置动量极限", formula:"ΔxΔp ≥ ħ/2", legend:["Δx：位置不确定度","Δp：动量不确定度","ħ：约化普朗克常量"], insight:"AI 从测量精度数据中发现位置越精确，动量不确定度越大，二者乘积存在下限。", gen:()=>sample(70,i=>{const dx=.25+i*.035;return {x:dx,y:.5/dx+noise(.02)}}), fit:d=>{const products=d.map(p=>p.x*p.y);return [["最小乘积",Math.min(...products).toFixed(2)],["约束","≥ ħ/2"],["发现规律","微观测量存在基本极限"]]}},
      {name:"氢原子能级", category:"近代物理·相对论与量子初步", sub:"离散能量", formula:"Eₙ = -13.6 eV / n²", legend:["Eₙ：第n能级能量","n：主量子数"], insight:"AI 从氢原子谱线数据中发现能级不是连续的，而按 1/n² 规律离散分布。", gen:()=>sample(8,i=>{const n=i+1;return {x:1/(n*n),y:-13.6/(n*n)+noise(.08)}}), fit:d=>{const l=linearFit(d);return [["能级系数",l.m.toFixed(1)+" eV"],["截距",l.b.toFixed(2)],["发现规律","原子能级离散量子化"]]}},
      {name:"能级跃迁光子", category:"近代物理·相对论与量子初步", sub:"能量差发光", formula:"hν = Eₙ - Eₘ", legend:["hν：光子能量","Eₙ/Eₘ：两个能级"], insight:"AI 从谱线频率中发现发射或吸收光子的能量等于两个能级之差。", gen:()=>sample(70,i=>{const deltaE=i*.05;return {x:deltaE,y:deltaE+noise(.015)}}), fit:d=>{const l=linearFit(d);return [["斜率",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","谱线来自能级差"]]}},
    ];
    const analyticalMechanicsLaws = [
      {name:"拉格朗日方程", category:"分析力学（理论力学深化）", sub:"最小作用量导出", formula:"L = T - V,  d/dt(∂L/∂q̇ᵢ) - ∂L/∂qᵢ = 0", legend:["L：拉格朗日量","T：动能","V：势能","qᵢ：广义坐标","q̇ᵢ：广义速度"], insight:"AI 从轨迹和能量函数中识别真实运动满足作用量驻值条件，而不是只依赖直角坐标下的力。", gen:()=>sample(90,i=>{const q=-1.8+i*.04;return {x:q,y:-1.2*q+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["欧拉项斜率",l.m.toFixed(2)],["残差","低"],["发现规律","动力学可由L=T-V统一推出"]]}},
      {name:"哈密顿正则方程", category:"分析力学（理论力学深化）", sub:"相空间演化", formula:"H = Σpᵢq̇ᵢ - L,  q̇ᵢ = ∂H/∂pᵢ,  ṗᵢ = -∂H/∂qᵢ", legend:["H：哈密顿量","L：拉格朗日量","pᵢ：广义动量","qᵢ：广义坐标","q̇ᵢ/ṗᵢ：相空间变化率"], insight:"AI 从位置-动量相图中发现系统演化可由哈密顿量的偏导数控制。", gen:()=>sample(90,i=>{const t=i/10;return {x:Math.cos(t),y:-Math.sin(t)+noise(.015)}}), fit:d=>{const radius=d.map(p=>p.x*p.x+p.y*p.y);return [["相空间半径", (radius.reduce((s,v)=>s+v,0)/radius.length).toFixed(2)],["结构","闭合轨道"],["发现规律","相空间由哈密顿流推进"]]}},
      {name:"最小作用量原理", category:"分析力学（理论力学深化）", sub:"统一力学规律", formula:"δS = 0,  S = ∫L dt", legend:["S：作用量","L：拉格朗日量","δS：作用量变分"], insight:"AI 比较多条候选轨迹的作用量，发现真实路径使作用量一阶变化为零。", gen:()=>sample(70,i=>{const dev=-1.7+i*.05;return {x:dev,y:1.1*dev*dev+noise(.025)}}), fit:d=>{const q=quadFit(d);return [["二次曲率",q.a.toFixed(2)],["驻点位置","接近0"],["发现规律","真实轨迹满足δS=0"]]}},
      {name:"诺特定理", category:"分析力学（理论力学深化）", sub:"对称性对应守恒量", formula:"连续对称性 ⇒ 守恒量", legend:["时间平移：能量守恒","空间平移：动量守恒","旋转对称：角动量守恒"], insight:"AI 从具有不同对称性的系统中发现：不变性不是装饰，而是守恒律的来源。", gen:()=>sample(70,i=>{const symmetry=i*.05;return {x:symmetry,y:symmetry+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["对称-守恒关联",l.m.toFixed(2)],["偏差",Math.abs(l.b).toFixed(2)],["发现规律","连续对称性产生守恒量"]]}},
      {name:"角动量定理", category:"分析力学（理论力学深化）", sub:"角动量变化率 → 力矩", formula:"M = dL/dt", legend:["M：合外力矩","L：角动量","dL/dt：角动量变化率"], insight:"AI 从刚体受力矩和角动量变化数据中发现转动动力学的核心关系；复杂刚体欧拉方程是它在本体系中的分量展开。", gen:()=>sample(70,i=>{const dLdt=i*.055;return {x:dLdt,y:2.1*dLdt+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["比例系数",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","力矩驱动角动量变化"]]}},
    ];
    const quantumMechanicsLaws = [
      {name:"含时薛定谔方程", category:"量子力学核心方程", sub:"状态演化", formula:"iℏ ∂ψ/∂t = Ĥψ", legend:["ψ：量子态","∂ψ/∂t：量子态时间变化率","Ĥ：哈密顿算符","ℏ：约化普朗克常量","t：时间"], insight:"AI 从波函数相位随时间演化的数据中识别量子态由哈密顿算符驱动。", gen:()=>sample(90,i=>{const t=i/12;return {x:t,y:Math.cos(1.6*t)+noise(.025)}}), fit:d=>{const period=estimatePeriod(d);return [["估计周期",period.toFixed(2)+" s"],["演化形式","相位振荡"],["发现规律","哈密顿量控制量子态演化"]]}},
      {name:"定态薛定谔方程", category:"量子力学核心方程", sub:"量子数平方 → 能量本征值", formula:"Ĥψ = Eψ", legend:["Ĥ：哈密顿算符","ψ：本征态","E：能量本征值","n²：无限深势阱量子数平方"], insight:"AI 以一维无限深势阱为例，从束缚态能谱中发现稳定态满足算符本征值方程，能量只能取离散值。", gen:()=>sample(8,i=>{const n=i+1;return {x:n*n,y:.72*n*n+noise(.08)}}), fit:d=>{const l=linearFit(d);return [["能级系数",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","定态对应能量本征值"]]}},
      {name:"正则对易关系", category:"量子力学核心方程", sub:"量子化特征", formula:"[x̂, p̂] = iℏ", legend:["x̂：位置算符","p̂：动量算符","[ , ]：对易子","iℏ：量子尺度"], insight:"AI 从位置和动量测量次序差异中识别非对易结构，这是量子不确定性的代数来源。", gen:()=>sample(70,i=>{const scale=i*.05;return {x:scale,y:1+noise(.02)}}), fit:d=>{const y=d.map(p=>p.y);return [["对易量均值",(y.reduce((s,v)=>s+v,0)/y.length).toFixed(2)],["目标结构","iℏ"],["发现规律","位置与动量不可同时经典化"]]}},
      {name:"动量算符", category:"量子力学核心方程", sub:"空间平移生成元", formula:"p̂ = -iℏ∇", legend:["p̂：动量算符","∇：空间梯度","ℏ：约化普朗克常量"], insight:"AI 从平面波空间变化率和动量数据中发现动量对应空间相位梯度。", gen:()=>sample(70,i=>{const k=i*.045;return {x:k,y:1.05*k+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["ℏ比例",l.m.toFixed(2)],["截距",l.b.toFixed(2)],["发现规律","动量是空间平移生成元"]]}},
      {name:"泡利矩阵", category:"量子力学核心方程", sub:"自旋1/2描述", formula:"σₓ, σᵧ, σ_z", legend:["σ：泡利矩阵","自旋1/2：二能级系统"], insight:"AI 从二能级自旋测量中发现三个非对易矩阵可以完整描述自旋1/2系统。", gen:()=>sample(70,i=>{const angle=i*Math.PI/69;return {x:angle,y:Math.cos(angle)+noise(.018)}}), fit:d=>[["测量轴","三正交方向"],["本征值","±1"],["发现规律","自旋态由泡利矩阵刻画"]]},
      {name:"全同粒子对称性", category:"量子力学核心方程", sub:"玻色与费米", formula:"ψ_boson 对称,  ψ_fermion 反对称", legend:["玻色子：对称波函数","费米子：反对称波函数"], insight:"AI 从交换两个粒子后的波函数变化中发现粒子全同性决定统计规律。", gen:()=>sample(70,i=>{const exchange=-1+i*.03;return {x:exchange,y:exchange<0?-1+noise(.02):1+noise(.02)}}), fit:d=>[["交换相位","±1"],["统计类型","玻色/费米"],["发现规律","全同性决定量子统计"]]},
      {name:"费米黄金定则", category:"量子力学核心方程", sub:"矩阵元平方 → 跃迁速率", formula:"Γ ∝ |⟨f|V|i⟩|² ρ(E)", legend:["Γ：跃迁速率","|⟨f|V|i⟩|²：矩阵元平方","ρ(E)：末态密度"], insight:"AI 从微扰强度和跃迁次数中发现跃迁速率与矩阵元平方、末态密度成正比。", gen:()=>sample(70,i=>{const amp=i*.045;return {x:amp*amp,y:2.4*amp*amp+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["矩阵元平方系数",l.m.toFixed(2)],["关系形态","平方比例"],["发现规律","跃迁概率由耦合强度平方决定"]]}},
    ];
    const solidStateLaws = [
      {name:"布洛赫定理", category:"固体物理 / 凝聚态核心", sub:"周期势电子波函数", formula:"ψₖ(r) = e^{ik·r}uₖ(r)", legend:["ψₖ：电子波函数","k：晶体动量","uₖ：晶格周期函数","r：位置"], insight:"AI 从周期晶格中的电子波形中发现，波函数可分解为平面波相位和晶格周期函数。", gen:()=>sample(90,i=>{const x=i/12;return {x,y:Math.cos(1.4*x)*(1+.18*Math.cos(4.2*x))+noise(.02)}}), fit:d=>{const period=estimatePeriod(d);return [["包络周期",period.toFixed(2)],["结构","平面波×周期函数"],["发现规律","晶体平移对称决定布洛赫波"]]}},
      {name:"有效质量", category:"固体物理 / 凝聚态核心", sub:"能带曲率", formula:"m* = ℏ²(d²E/dk²)⁻¹", legend:["m*：有效质量","E：能带能量","k：波矢","ℏ：约化普朗克常量"], insight:"AI 从能带 E-k 曲线中发现电子动力学由能带曲率决定，可表现为不同于自由电子的有效质量。", gen:()=>sample(70,i=>{const k=-1.7+i*.05;return {x:k,y:.82*k*k+noise(.025)}}), fit:d=>{const q=quadFit(d);return [["能带曲率",q.a.toFixed(2)],["有效质量","∝ 1/曲率"],["发现规律","能带曲率控制载流子动力学"]]}},
      {name:"德拜T³定律", category:"固体物理 / 凝聚态核心", sub:"温度三次方 → 低温晶格热容", formula:"Cᵥ ∝ T³", legend:["Cᵥ：定容热容","T³：绝对温度三次方"], insight:"AI 从低温非金属固体热容数据中发现热容随温度三次方增长。", gen:()=>sample(70,i=>{const T=.05+i*.018;return {x:T**3,y:2.6*T**3+noise(.0008)}}), fit:d=>{const l=linearFit(d);return [["T³斜率",l.m.toFixed(2)],["模型形态","三次方关系"],["发现规律","低温声子热容服从T³律"]]}},
      {name:"费米能", category:"固体物理 / 凝聚态核心", sub:"电子密度2/3次方 → 费米能", formula:"E_F = ℏ²(3π²n)^{2/3}/2m", legend:["E_F：费米能","n^{2/3}：电子数密度的2/3次方","m：电子质量","ℏ：约化普朗克常量"], insight:"AI 从电子密度和最高占据能量中发现费米能随密度的 2/3 次方增长。", gen:()=>sample(70,i=>{const n=.2+i*.04;const n23=n**(2/3);return {x:n23,y:1.9*n23+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["n^{2/3}斜率",l.m.toFixed(2)],["模型形态","2/3次方关系"],["发现规律","费米能由电子密度决定"]]}},
    ];
    const quantumFieldLaws = [
      {name:"QED拉格朗日量", category:"量子场论 · 标准模型", sub:"电子与光子", formula:"L_QED = ψ̄(iγ^μD_μ - m)ψ - 1/4 F_{μν}F^{μν}", legend:["L_QED：量子电动力学拉格朗日量","ψ/ψ̄：电子场及其伴随场","γ^μ：狄拉克矩阵","D_μ：协变导数","m：电子质量","F_{μν}：电磁场强张量"], insight:"AI 从电子-光子相互作用数据中识别规范协变结构，发现电磁相互作用可由 QED 拉格朗日量统一描述。", gen:()=>sample(70,i=>{const coupling=i*.045;return {x:coupling,y:1.8*coupling+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["耦合强度",l.m.toFixed(2)],["规范结构","U(1)"],["发现规律","电子和光子通过规范场相互作用"]]}},
      {name:"狄拉克方程", category:"量子场论 · 标准模型", sub:"相对论性电子", formula:"(iγ^μ∂_μ - m)ψ = 0", legend:["γ^μ：狄拉克矩阵","∂_μ：时空导数","m：质量","ψ：旋量场"], insight:"AI 从相对论电子能量-动量关系中发现线性化方程需要旋量结构。", gen:()=>sample(70,i=>{const p=-1.7+i*.05;return {x:p,y:Math.sqrt(p*p+1)+noise(.015)}}), fit:d=>{const min=d.reduce((a,p)=>p.y<a.y?p:a,d[0]);return [["静质量能量",min.y.toFixed(2)],["谱形","正能分支"],["发现规律","相对论电子由旋量场描述"]]}},
      {name:"路径积分生成泛函", category:"量子场论 · 标准模型", sub:"场论生成泛函", formula:"Z = ∫Dφ e^{iS[φ]}", legend:["Z：生成泛函","Dφ：场构型积分测度","S[φ]：场构型作用量","e^{iS[φ]}：量子相位权重"], insight:"AI 从多条场构型的相位叠加中发现量子振幅由所有可能历史共同贡献。", gen:()=>sample(90,i=>{const s=-2+i*.045;return {x:s,y:Math.cos(2.4*s)*Math.exp(-.12*s*s)+noise(.015)}}), fit:d=>[["叠加结构","振荡相位"],["权重","e^{iS}"],["发现规律","量子场由所有构型路径积分生成"]]},
      {name:"标准模型规范群", category:"量子场论 · 标准模型", sub:"三种相互作用统一描述", formula:"SU(3)_c × SU(2)_L × U(1)_Y", legend:["SU(3)_c：强相互作用","SU(2)_L：弱相互作用","U(1)_Y：超荷"], insight:"AI 从粒子相互作用模式中发现强、弱、电磁相互作用可由规范群结构组织。", gen:()=>sample(70,i=>{const scale=i*.05;return {x:scale,y:scale+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["群结构维度","3个因子"],["组织方式","规范对称性"],["发现规律","相互作用由规范群分类"]]}},
      {name:"希格斯机制", category:"量子场论 · 标准模型", sub:"真空期望值平方 → 质量项", formula:"⟨φ⟩ = v/√2", legend:["⟨φ⟩：希格斯场真空期望值","φ：希格斯场","v：真空期望值参数","v²：质量项线性化变量"], insight:"AI 从粒子质量谱和对称破缺模式中发现非零真空期望值会赋予粒子质量。", gen:()=>sample(70,i=>{const v=i*.045;return {x:v*v,y:1.6*v*v+noise(.02)}}), fit:d=>{const l=linearFit(d);return [["质量项系数",l.m.toFixed(2)],["机制","自发对称破缺"],["发现规律","非零真空期望值产生质量"]]}},
    ];
    const relativityCosmologyLaws = [
      {name:"爱因斯坦场方程", category:"广义相对论 · 宇宙学", sub:"引力就是时空几何", formula:"R_μν - 1/2 Rg_μν + Λg_μν = 8πG T_μν / c⁴", legend:["R_μν：里奇曲率张量","R：标量曲率","g_μν：度规张量","Λ：宇宙学常数","T_μν：能量动量张量","G/c⁴：引力耦合常数"], insight:"AI 从质量能量分布和时空曲率数据中发现：引力不再是普通力，而是时空几何响应。", gen:()=>sample(70,i=>{const density=i*.05;return {x:density,y:2.2*density+noise(.035)}}), fit:d=>{const l=linearFit(d);return [["曲率-能量耦合",l.m.toFixed(2)],["结构","G_μν ∝ T_μν"],["发现规律","能量动量决定时空曲率"]]}},
      {name:"测地线方程", category:"广义相对论 · 宇宙学", sub:"自由落体轨迹", formula:"d²x^μ/dτ² + Γ^μ_{αβ}(dx^α/dτ)(dx^β/dτ) = 0", legend:["x^μ：时空坐标","τ：固有时","d²x^μ/dτ²：四维加速度项","Γ^μ_{αβ}：克里斯托费尔符号","dx^α/dτ：四维速度分量"], insight:"AI 从自由粒子轨迹中发现，在弯曲时空中自由运动沿测地线前进。", gen:()=>sample(80,i=>{const t=i*.08;return {x:t,y:.08*t*t+noise(.018)}}), fit:d=>{const q=quadFit(d);return [["曲率项",q.a.toFixed(3)],["运动类型","自由落体"],["发现规律","自由粒子沿时空测地线运动"]]}},
      {name:"史瓦西度规", category:"广义相对论 · 宇宙学", sub:"径向倒数 → 时间度规项", formula:"ds² = -(1-2GM/rc²)c²dt² + (1-2GM/rc²)⁻¹dr² + r²dΩ²", legend:["ds²：时空间隔","M：中心质量","G：引力常数","c：光速","r / 1/r：径向坐标及线性化变量","dΩ²：角向面积元"], insight:"AI 从静态球对称引力场数据中识别黑洞外部时空的度规结构。", gen:()=>sample(70,i=>{const r=2.2+i*.08;const inv=1/r;return {x:inv,y:1-2*inv+noise(.008)}}), fit:d=>{const l=linearFit(d);return [["1/r系数",l.m.toFixed(2)],["远场极限",l.b.toFixed(2)],["发现规律","球对称质量弯曲周围时空"]]}},
      {name:"弗里德曼方程", category:"广义相对论 · 宇宙学", sub:"宇宙膨胀动力学", formula:"(ȧ/a)² = 8πGρ/3 - kc²/a² + Λc²/3", legend:["ȧ/a：哈勃膨胀率","a：尺度因子","ρ：能量密度","G：引力常数","k：空间曲率","Λ：宇宙学常数","c：光速"], insight:"AI 从宇宙尺度因子、密度和膨胀率数据中发现宇宙演化由密度、曲率和暗能量共同决定。", gen:()=>sample(70,i=>{const rho=.1+i*.04;return {x:rho,y:1.7*rho+.18+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["密度耦合",l.m.toFixed(2)],["Λ/曲率项",l.b.toFixed(2)],["发现规律","宇宙膨胀由整体能量内容控制"]]}},
    ];
    const quantumGravityLaws = [
      {name:"Polyakov作用量", category:"弦论/量子引力（前沿框架）", sub:"玻色弦世界面", formula:"S = -T/2 ∫d²σ√-h h^{ab}∂ₐX^μ∂ᵦX^νη_{μν}", legend:["S：作用量","T：弦张力","σ：世界面坐标","h^{ab}：世界面逆度规","X^μ：嵌入坐标","η_{μν}：目标时空度规"], insight:"AI 从弦世界面几何中识别作用量由嵌入坐标梯度和世界面度规共同决定。", gen:()=>sample(90,i=>{const s=i/12;return {x:s,y:Math.sin(1.4*s)+.25*Math.sin(3.1*s)+noise(.02)}}), fit:d=>{const period=estimatePeriod(d);return [["世界面振荡周期",period.toFixed(2)],["结构","面积型作用量"],["发现规律","弦的运动由二维世界面作用量控制"]]}},
      {name:"AdS/CFT对偶", category:"弦论/量子引力（前沿框架）", sub:"引力与边界场论等价", formula:"Z_gravity[AdS] = Z_CFT[boundary]", legend:["Z_gravity[AdS]：AdS体时空引力生成泛函","Z_CFT[boundary]：边界共形场论生成泛函","AdS：反德西特时空","CFT：共形场论"], insight:"AI 从体理论和边界理论的观测对应中发现，某些引力系统可等价为低一维无引力量子场论。", gen:()=>sample(70,i=>{const boundary=i*.05;return {x:boundary,y:boundary+noise(.018)}}), fit:d=>{const l=linearFit(d);return [["体-边界映射",l.m.toFixed(2)],["偏差",Math.abs(l.b).toFixed(2)],["发现规律","引力动力学可编码在边界场论中"]]}},
      {name:"圈量子引力自旋网络", category:"弦论/量子引力（前沿框架）", sub:"空间几何离散谱", formula:"A, V 具有离散谱", legend:["A：面积算符","V：体积算符","自旋网络：量子几何态"], insight:"AI 从量子几何本征值中发现面积和体积可能不是连续量，而是由自旋网络给出离散谱。", gen:()=>sample(18,i=>{const j=i+1;return {x:j,y:Math.sqrt(j*(j+1))+noise(.025)}}), fit:d=>{const l=linearFit(d);return [["谱增长斜率",l.m.toFixed(2)],["结构","离散本征值"],["发现规律","空间几何可被量子化"]]}},
    ];
    const categoryOrder = [
      "运动学 & 动力学",
      "功能·动量",
      "振动、波动与声学",
      "流体、连续介质与输运",
      "热学基础 & 热力学定律",
      "热力学·统计物理",
      "电磁学 · 核心方程",
      "麦克斯韦方程组（电磁场统一）",
      "光学 · 几何与波动",
      "分析力学（理论力学深化）",
      "近代物理·相对论与量子初步",
      "量子力学核心方程",
      "固体物理 / 凝聚态核心",
      "量子场论 · 标准模型",
      "广义相对论 · 宇宙学",
      "弦论/量子引力（前沿框架）",
      "宇宙尺度与综合规律"
    ];
    const categoryOf = law => law.category ||
      (/波速|多普勒|共振|简谐|阻尼|弹簧频率|弦振动/.test(law.name) ? "振动、波动与声学" :
      /流体|扩散|伯努利|毛细|泊肃叶|斯托克斯|终端速度|液体静压|阿基米德|黏性/.test(law.name) ? "流体、连续介质与输运" :
      /抛体|单摆|行星|反平方|胡克|向心力|转动/.test(law.name) ? "运动学 & 动力学" :
      /重力势能|动能|角动量/.test(law.name) ? "功能·动量" :
      /斯特藩|维恩|黑体/.test(law.name) ? "热力学·统计物理" :
      /理想气体|等熵|冷却|热传导/.test(law.name) ? "热学基础 & 热力学定律" :
      /欧姆|洛伦兹|RC|法拉第|变压器|库仑|霍尔|等离子/.test(law.name) ? "电磁学 · 核心方程" :
      /斯涅尔|马吕斯/.test(law.name) ? "光学 · 几何与波动" :
      /布拉格/.test(law.name) ? "固体物理 / 凝聚态核心" :
      /德布罗意|普朗克|康普顿/.test(law.name) ? "量子力学核心方程" :
      /光电|相对论|放射性/.test(law.name) ? "近代物理·相对论与量子初步" :
      "宇宙尺度与综合规律");
    const laws = [...kinematicsLaws, ...energyMomentumLaws, ...thermalLaws, ...statisticalPhysicsLaws, ...electromagnetismLaws, ...maxwellLaws, ...opticsLaws, ...modernPhysicsLaws, ...analyticalMechanicsLaws, ...quantumMechanicsLaws, ...solidStateLaws, ...quantumFieldLaws, ...relativityCosmologyLaws, ...quantumGravityLaws, ...discoveryLaws].map((law, index) => ({...law, index, category:categoryOf(law)}));
    function noise(a){return (Math.random()-.5)*a;}
    function sample(n, fn){return Array.from({length:n},(_,i)=>fn(i));}
    function linearFit(d){const n=d.length,sx=d.reduce((s,p)=>s+p.x,0),sy=d.reduce((s,p)=>s+p.y,0),sxx=d.reduce((s,p)=>s+p.x*p.x,0),sxy=d.reduce((s,p)=>s+p.x*p.y,0);const m=(n*sxy-sx*sy)/(n*sxx-sx*sx);return {m,b:(sy-m*sx)/n};}
    function quadFit(d){const n=d.length,sx=d.reduce((s,p)=>s+p.x,0),s2=d.reduce((s,p)=>s+p.x*p.x,0),s3=d.reduce((s,p)=>s+p.x**3,0),s4=d.reduce((s,p)=>s+p.x**4,0),sy=d.reduce((s,p)=>s+p.y,0),sxy=d.reduce((s,p)=>s+p.x*p.y,0),sx2y=d.reduce((s,p)=>s+p.x*p.x*p.y,0);const det=n*(s2*s4-s3*s3)-sx*(sx*s4-s2*s3)+s2*(sx*s3-s2*s2);const a=(n*(s2*sx2y-s3*sxy)-sx*(sx*sx2y-s2*sy)+s2*(sx*sxy-s2*sy))/det;return {a};}
    function estimatePeriod(d){const peaks=[];for(let i=1;i<d.length-1;i++) if(d[i].y>d[i-1].y&&d[i].y>d[i+1].y) peaks.push(d[i].x);return peaks.length>1?(peaks[peaks.length-1]-peaks[0])/(peaks.length-1):3.6;}
    function draw(data){
      const w=canvas.width,h=canvas.height,pad=48;
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle="#071126";ctx.fillRect(0,0,w,h);
      const xs=data.map(p=>p.x),ys=data.map(p=>p.y),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
      const X=x=>pad+(x-minX)/(maxX-minX||1)*(w-pad*1.5);
      const Y=y=>h-pad-(y-minY)/(maxY-minY||1)*(h-pad*1.7);
      ctx.strokeStyle="rgba(255,255,255,.12)";ctx.lineWidth=1;
      for(let i=0;i<6;i++){const y=pad+i*(h-pad*1.7)/5;ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad/2,y);ctx.stroke();}
      ctx.strokeStyle="#00E5FF";ctx.lineWidth=3;ctx.beginPath();data.forEach((p,i)=>{const x=X(p.x),y=Y(p.y);if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.stroke();
      ctx.fillStyle="#FFC107";data.forEach((p,i)=>{if(i%3)return;ctx.beginPath();ctx.arc(X(p.x),Y(p.y),3.4,0,Math.PI*2);ctx.fill();});
    }
    function drawPMA(data){
      const w=canvas.width,h=canvas.height;
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle="#061024";ctx.fillRect(0,0,w,h);
      const sphere = (x,y,r,hot=false) => {
        const g=ctx.createRadialGradient(x-r*.35,y-r*.38,r*.1,x,y,r);
        g.addColorStop(0,hot?"#c7ff4b":"#f4f7ff");
        g.addColorStop(.46,hot?"#68d60c":"#c5cad1");
        g.addColorStop(1,hot?"#284d08":"#5e646c");
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle="rgba(255,255,255,.35)";ctx.lineWidth=1.4;ctx.stroke();
        ctx.strokeStyle="rgba(0,0,0,.35)";ctx.beginPath();ctx.moveTo(x-r,y);ctx.lineTo(x+r,y);ctx.moveTo(x,y-r);ctx.lineTo(x,y+r);ctx.stroke();
        ctx.fillStyle=hot?"#aaff1e":"#111";ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
      };
      const arrow = (x1,y1,x2,y2,color,label) => {
        const a=Math.atan2(y2-y1,x2-x1);
        ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-12*Math.cos(a-.45),y2-12*Math.sin(a-.45));ctx.lineTo(x2-12*Math.cos(a+.45),y2-12*Math.sin(a+.45));ctx.closePath();ctx.fill();
        if(label){ctx.font="500 14px Microsoft YaHei";ctx.fillText(label,x2+8,y2-8);}
      };
      const roundBox = (x,y,bw,bh,r) => {
        ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+bw-r,y);ctx.quadraticCurveTo(x+bw,y,x+bw,y+r);ctx.lineTo(x+bw,y+bh-r);ctx.quadraticCurveTo(x+bw,y+bh,x+bw-r,y+bh);ctx.lineTo(x+r,y+bh);ctx.quadraticCurveTo(x,y+bh,x,y+bh-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
      };
      const drawSumTerm = (x,y,term,label,color) => {
        ctx.fillStyle="#fff";ctx.font="500 18px Consolas";ctx.fillText("Σ",x,y);
        ctx.font="500 9px Consolas";ctx.fillText("j≠i",x-2,y+11);
        ctx.font="500 16px Consolas";ctx.fillText(term,x+19,y);
        const width = ctx.measureText(term).width + 25;
        ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();
        ctx.moveTo(x+1,y+18);ctx.lineTo(x+width-2,y+18);
        ctx.moveTo(x+1,y+18);ctx.quadraticCurveTo(x+width*.25,y+30,x+width*.5,y+22);
        ctx.quadraticCurveTo(x+width*.75,y+30,x+width-2,y+18);
        ctx.stroke();
        ctx.fillStyle=color;ctx.font="500 12px Microsoft YaHei";ctx.textAlign="center";ctx.fillText(label,x+width/2,y+43);ctx.textAlign="left";
        return width;
      };
      const drawPMAEquation = (x,y) => {
        ctx.fillStyle="#fff";ctx.font="500 18px Consolas";ctx.fillText("m",x,y);
        ctx.font="500 15px Consolas";ctx.fillText("dvᵢ",x+26,y-10);ctx.fillText("dt",x+31,y+13);
        ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+23,y-3);ctx.lineTo(x+55,y-3);ctx.stroke();
        ctx.font="500 18px Consolas";ctx.fillText("=",x+67,y);
        let cx=x+94;
        cx += drawSumTerm(cx,y,"kᵣ·xⱼᵢ","径向弹性","#00E5FF") + 13;
        ctx.fillStyle="#fff";ctx.font="500 18px Consolas";ctx.fillText("+",cx,y);cx+=22;
        cx += drawSumTerm(cx,y,"kₐ·xⱼᵢ","切向/吸引弹性","#4CAF50") + 13;
        ctx.fillStyle="#fff";ctx.font="500 18px Consolas";ctx.fillText("+",cx,y);cx+=22;
        cx += drawSumTerm(cx,y,"cᵣ·vⱼᵢ","阻尼","#FFC107") + 13;
        ctx.fillStyle="#fff";ctx.font="500 18px Consolas";ctx.fillText("+",cx,y);cx+=22;
        cx += drawSumTerm(cx,y,"kᵣₑ·xⱼᵢ","额外恢复项","#FF5252") + 13;
        ctx.fillStyle="#fff";ctx.font="500 18px Consolas";ctx.fillText("+ Fᵢ",cx,y);
        ctx.fillStyle="#B0BEC5";ctx.font="500 12px Microsoft YaHei";ctx.textAlign="center";ctx.fillText("外力",cx+25,y+43);ctx.textAlign="left";
      };
      ctx.fillStyle="#fff";ctx.font="700 24px Microsoft YaHei";ctx.fillText("PMA continuum simulation 控制方程图解",34,42);
      ctx.font="400 15px Microsoft YaHei";ctx.fillStyle="#B0BEC5";ctx.fillText("两个粒子间的相对位移、相对速度和作用半径，决定弹性、吸引、阻尼与恢复力。",34,68);

      const lx=170, ly=188, r=58, rx=280;
      sphere(lx,ly,r,false);sphere(rx,ly,r,false);
      ctx.strokeStyle="#fff";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(rx,ly);ctx.stroke();
      arrow(rx,ly,lx+72,ly,"#FF5252","Fᵣ 排斥");
      arrow(rx+8,ly-18,rx+92,ly-82,"#4CAF50","Fₐ 吸引");
      arrow(rx+2,ly+26,rx+82,ly+88,"#00E5FF","F_d 阻尼");
      ctx.fillStyle="#fff";ctx.font="500 16px Consolas";ctx.fillText("rᵢⱼ",218,178);
      ctx.fillText("R₀",236,220);ctx.fillText("Rₐ",300,220);
      ctx.strokeStyle="rgba(255,193,7,.75)";ctx.lineWidth=1.1;ctx.setLineDash([6,6]);ctx.beginPath();ctx.arc(rx,ly,82,-.42,.42);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle="#FFC107";ctx.font="600 15px Microsoft YaHei";ctx.fillText("粒子对相互作用",178,104);

      const gx=80, gy=460, gw=385, gh=235;
      ctx.strokeStyle="rgba(255,255,255,.85)";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(gx,gy-gh);ctx.lineTo(gx,gy+10);ctx.lineTo(gx+gw,gy+10);ctx.stroke();
      ctx.fillStyle="#fff";ctx.font="500 14px Consolas";ctx.fillText("Force",gx-45,gy-gh+14);ctx.fillText("Distance",gx+gw-58,gy+34);
      const X=r=>gx+(r-.55)/(2.55-.55)*gw;
      const Y=f=>gy+10-(f+1.25)/(1.9+1.25)*gh;
      ctx.strokeStyle="#00A8FF";ctx.lineWidth=3.2;ctx.beginPath();
      const pts=[[.55,-1.1],[1.0,0],[1.35,.65],[1.95,.65],[1.95,0],[2.3,0]];
      pts.forEach((p,i)=>i?ctx.lineTo(X(p[0]),Y(p[1])):ctx.moveTo(X(p[0]),Y(p[1])));ctx.stroke();
      ctx.strokeStyle="rgba(255,255,255,.28)";ctx.setLineDash([4,5]);ctx.beginPath();ctx.moveTo(X(1.0),Y(-1.25));ctx.lineTo(X(1.0),Y(1.9));ctx.moveTo(X(1.35),Y(-1.25));ctx.lineTo(X(1.35),Y(1.9));ctx.moveTo(X(1.95),Y(-1.25));ctx.lineTo(X(1.95),Y(1.9));ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle="#fff";ctx.font="500 14px Consolas";ctx.fillText("R₀",X(1.0)-10,gy+34);ctx.fillText("Rₐ",X(1.35)-10,gy+34);ctx.fillText("Rlim",X(1.95)-15,gy+34);
      ctx.font="500 15px Microsoft YaHei";ctx.fillStyle="#FF5252";ctx.fillText("Repulsive",X(.72),Y(-.92));
      ctx.fillStyle="#4CAF50";ctx.fillText("Attractive",X(1.1),Y(1.12));
      ctx.fillStyle="#FFC107";ctx.fillText("Plastic",X(1.53),Y(.93));

      const ex=400, ey=104;
      ctx.fillStyle="rgba(0,229,255,.08)";ctx.strokeStyle="rgba(0,229,255,.38)";ctx.lineWidth=1.5;
      roundBox(ex,ey,455,268,8);ctx.fill();ctx.stroke();
      ctx.fillStyle="#00E5FF";ctx.font="600 17px Microsoft YaHei";ctx.fillText("动力学控制方程",ex+22,ey+34);
      ctx.save();ctx.translate(ex+22,ey+76);ctx.scale(.72,.72);drawPMAEquation(0,0);ctx.restore();
      ctx.font="400 13px Microsoft YaHei";ctx.fillStyle="#B0BEC5";
      ["xⱼᵢ：第 j 个粒子对第 i 个粒子的相对位移","vⱼᵢ：相对速度，产生阻尼耗散","R₀ / Rₐ / Rlim：平衡、吸引范围与极限作用距离"].forEach((t,i)=>ctx.fillText(t,ex+24,ey+162+i*28));
    }
    function pmaEquationHTML(){
      const term = (sum, body, label) => `<span class="pma-term"><span class="pma-body"><span class="pma-sum">${sum}<small>j≠i</small></span><span>${body}</span></span><em>${label}</em></span>`;
      return `<span class="pma-eq"><span class="pma-mass">m</span><span class="pma-frac"><b>dvᵢ</b><i>dt</i></span><span class="pma-op">=</span>${term("Σ","kᵣ·xⱼᵢ","径向弹性")}<span class="pma-op">+</span>${term("Σ","kₐ·xⱼᵢ","切向/吸引弹性")}<span class="pma-op">+</span>${term("Σ","cᵣ·vⱼᵢ","阻尼")}<span class="pma-op">+</span>${term("Σ","kᵣₑ·xⱼᵢ","额外恢复项")}<span class="pma-op">+</span><span class="pma-force"><b>Fᵢ</b><em>外力</em></span></span>`;
    }
    function render(){
      const law = laws[active], data = law.gen(), metrics = law.fit(data);
      if(law.visual === "pma") drawPMA(data); else draw(data);
      $("#lawTitle").textContent = law.name;
      if(law.visual === "pma") $("#lawFormula").innerHTML = pmaEquationHTML(); else $("#lawFormula").textContent = law.formula;
      $("#lawFormula").classList.toggle("formula-tight", law.visual === "pma");
      $("#lawLegend").innerHTML = law.legend.map(x=>`<span>${x}</span>`).join("");
      $("#lawInsight").textContent = law.insight;
      $("#lawMetrics").innerHTML = metrics.map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join("");
      $$("#lawMenu button").forEach((b,i)=>b.classList.toggle("active",i===active));
    }
    const groupsByName = new Map(categoryOrder.map(name => [name, {name, items:[]}]));
    laws.forEach((law,i)=>{
      if(!groupsByName.has(law.category)) groupsByName.set(law.category, {name:law.category, items:[]});
      groupsByName.get(law.category).items.push({law,i});
    });
    const groups = [...groupsByName.values()]
      .filter(group => group.items.length)
      .sort((a,b) => {
        const ai = categoryOrder.indexOf(a.name);
        const bi = categoryOrder.indexOf(b.name);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });
    menu.innerHTML = groups.map(group=>`<div class="law-group"><h4>${group.name}</h4>${group.items.map(({law,i})=>`<button type="button" data-law="${i}">${law.name}<span>${law.sub}</span></button>`).join("")}</div>`).join("");
    menu.addEventListener("click", e=>{const btn=e.target.closest("[data-law]");if(!btn)return;active=Number(btn.dataset.law);render();});
    $("#lawRegenerate")?.addEventListener("click", render);
    render();
  }

  initSpace();
  initHeroCycle();
  initFlow();
  initNetwork();
  initFit();
  initFormula();
  initScientistLoop();
  initWorld();
  initAtoms();
  initMap();
  initManufacturingRoute();
  initPhysicsLab();
})();
