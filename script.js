(function(){
  const c = document.getElementById('compass');
  if(!c) return;
  const ctx = c.getContext('2d');
  const W = 128, H = 128, cx = 64, cy = 64;
  const colors = {
    bg:'#0f1020', ring:'#83769c', north:'#29adff',
    needle:'#ff004d', tip:'#00e436', center:'#fff1e8'
  };
  let angle = -Math.PI / 2;

  function px(x,y,w,h,col){
    ctx.fillStyle = col;
    ctx.fillRect(Math.floor(x),Math.floor(y),w,h);
  }

  function draw(){
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0,0,W,H);
    for(let r=56;r<=60;r+=2){
      for(let a=0;a<Math.PI*2;a+=0.05){
        const x = cx + Math.cos(a)*r - 1;
        const y = cy + Math.sin(a)*r - 1;
        px(x,y,2,2,colors.ring);
      }
    }
    for(let r=38;r<=40;r+=2){
      for(let a=0;a<Math.PI*2;a+=0.08){
        const x = cx + Math.cos(a)*r - 1;
        const y = cy + Math.sin(a)*r - 1;
        px(x,y,2,2,'#5d275d');
      }
    }
    px(cx-1,8,2,10,colors.north);
    px(cx-3,6,6,2,colors.north);
    const nx = cx + Math.cos(angle)*40;
    const ny = cy + Math.sin(angle)*40;
    const steps = 20;
    for(let i=0;i<steps;i++){
      const t = i/steps;
      const x = cx + (nx-cx)*t;
      const y = cy + (ny-cy)*t;
      px(x-2,y-2,4,4, i<steps*0.6 ? colors.needle : colors.tip);
    }
    px(cx-4,cy-4,8,8,colors.center);
    px(cx-2,cy-2,4,4,colors.needle);
  }

  function tick(){
    angle += 0.008;
    draw();
    requestAnimationFrame(tick);
  }
  tick();
})();
