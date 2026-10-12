(function(){
  const hero=document.querySelector('.hero');
  if(!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  hero.classList.add('dimensional-hero');
  const canvas=document.createElement('canvas');
  canvas.className='dimensional-canvas';
  canvas.setAttribute('aria-hidden','true');
  hero.prepend(canvas);
  const ctx=canvas.getContext('2d');
  let w=0,h=0,dpr=1,t=0,mx=.5,my=.5;
  const particles=Array.from({length:42},()=>({x:Math.random(),y:.2+Math.random()*.65,s:Math.random()*1.8+.5,p:Math.random()*6.28}));
  const resize=()=>{dpr=Math.min(devicePixelRatio||1,2);w=hero.clientWidth;h=hero.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)};
  const move=e=>{const r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width;my=(e.clientY-r.top)/r.height};
  const draw=()=>{
    t+=.004;ctx.clearRect(0,0,w,h);
    const dark=document.documentElement.classList.contains('dark-mode')||document.body.classList.contains('dark-mode');
    const line=dark?'rgba(145,151,255,.40)':'rgba(91,91,247,.23)';
    ctx.lineWidth=.65;
    for(let i=-8;i<28;i++){
      ctx.beginPath();
      for(let x=-20;x<=w+20;x+=9){
        const nx=x/Math.max(w,1), wave=Math.sin(nx*7+i*.34+t*2.1)*17+Math.sin(nx*15-i*.22+t)*6;
        const y=h*.67+(i-9)*14+wave+(nx-.5)*(my-.5)*38+(mx-.5)*12;
        if(x===-20)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.strokeStyle=line;ctx.globalAlpha=i%4===0?.8:.55;ctx.stroke();
    }
    ctx.globalAlpha=.7;
    particles.forEach(p=>{
      const x=p.x*w+Math.sin(t*2+p.p)*8+(mx-.5)*18;
      const y=p.y*h+Math.cos(t*1.5+p.p)*5+(my-.5)*12;
      ctx.beginPath();ctx.arc(x,y,p.s,0,Math.PI*2);ctx.fillStyle=dark?'rgba(125,211,252,.48)':'rgba(91,91,247,.28)';ctx.fill();
    });
    ctx.globalAlpha=1;requestAnimationFrame(draw);
  };
  addEventListener('resize',resize);hero.addEventListener('pointermove',move,{passive:true});resize();draw();
})();
