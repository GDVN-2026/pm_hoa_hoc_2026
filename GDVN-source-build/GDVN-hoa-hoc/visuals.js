/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
export function modelView(canvas,model,{bohr=false}={}){
  canvas.tabIndex=0;
  canvas.title='Kéo hoặc dùng phím mũi tên để xoay; +/− để phóng to/thu nhỏ; 0 để đặt lại.';
  let options={style:'ball-stick',hydrogen:true,labels:true};
  const ctx=canvas.getContext('2d');let yaw=.35,pitch=.2,zoom=1,drag=null,raf=0,running=false,disposed=false;
  function draw(){
    if(disposed)return;
    const rect=canvas.getBoundingClientRect(),width=Math.max(1,rect.width),height=Math.max(1,rect.height),dpr=window.devicePixelRatio||1;
    const pixelsWide=Math.round(width*dpr),pixelsHigh=Math.round(height*dpr);
    if(canvas.width!==pixelsWide||canvas.height!==pixelsHigh){canvas.width=pixelsWide;canvas.height=pixelsHigh;}
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle='#0e2340';ctx.fillRect(0,0,width,height);
    ctx.strokeStyle='#ffffff0b';ctx.lineWidth=1;for(let x=0;x<width;x+=35){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}for(let y=0;y<height;y+=35){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}
    if(bohr){
      const shells=model.shells, radius=Math.min(width,height)*.39*zoom;
      const cx=width/2, cy=height/2;
      const particles=[];
      const colors=['#64edff','#b9a0ff','#ffd183','#76fac4'];
      const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(width,height)*.55);
      halo.addColorStop(0,'#284875');halo.addColorStop(.52,'#172c52');halo.addColorStop(1,'#0e234000');
      ctx.fillStyle=halo;ctx.fillRect(0,0,width,height);
      const coreRadius=Math.min(39,Math.min(width,height)*.11);
      shells.forEach((count,i)=>{
        const r=coreRadius+8+(radius-coreRadius-8)*(i+1)/shells.length;
        const tilt=yaw+i*.72, flatten=.22+.66*Math.abs(Math.cos(pitch+i*.66));
        const cos=Math.cos(tilt), sin=Math.sin(tilt);
        const color=colors[i%colors.length];
        ctx.strokeStyle=color;ctx.lineWidth=1.6;ctx.globalAlpha=.55;ctx.shadowColor=color;ctx.shadowBlur=10;
        ctx.beginPath();ctx.ellipse(cx,cy,r,r*flatten,tilt,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;ctx.shadowBlur=0;
        for(let j=0;j<count;j++){
          const angle=yaw+j*2*Math.PI/count;
          const x=r*Math.cos(angle),y=r*flatten*Math.sin(angle);
          particles.push([cx+x*cos-y*sin,cy+x*sin+y*cos,Math.sin(angle),color]);
        }
      });
      function sphere(x,y,r,color,shade){
        const g=ctx.createRadialGradient(x-r*.32,y-r*.36,0,x,y,r);
        g.addColorStop(0,'#fff');g.addColorStop(.35,color);g.addColorStop(1,shade);
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.fill();
      }
      function drawElectron([x,y,depth,color]){
        ctx.shadowColor=color;ctx.shadowBlur=depth<0?5:13;
        sphere(x,y,depth<0?4.5:7,color,'#205499');
        ctx.shadowBlur=0;
      }
      particles.filter(p=>p[2]<0).forEach(drawElectron);
      ctx.shadowColor='#ff658d';ctx.shadowBlur=25;
      sphere(cx,cy,coreRadius,'#ff668b','#682366');
      ctx.shadowBlur=0;
      ctx.fillStyle='white';ctx.textAlign='center';ctx.font='bold 23px system-ui';ctx.fillText(model.symbol,cx,cy+8);
      particles.filter(p=>p[2]>=0).forEach(drawElectron);
    }else{
      const atoms=model.atoms;const bound=Math.max(1.5,...atoms.flatMap(a=>a.slice(1).map(Math.abs)));const scale=Math.min(width,height)*.32*zoom*(model.viewScale||1)/bound;
      const points=atoms.map(([s,x,y,z],index)=>{const xx=x*Math.cos(yaw)+z*Math.sin(yaw),zz=-x*Math.sin(yaw)+z*Math.cos(yaw);return {s,color:model.atomColors?.[index],label:model.atomLabels?.[index]||s,radius:model.atomRadii?.[index],x:width/2+xx*scale,y:height/2+(y*Math.cos(pitch)-zz*Math.sin(pitch))*scale,z:y*Math.sin(pitch)+zz*Math.cos(pitch)};});
      for(const [bondIndex,[a,b,n]]of (model.bonds||[]).entries()){const p=points[a],q=points[b];if(options.style==='spacefill'||(!options.hydrogen&&(p.s==='H'||q.s==='H')))continue;ctx.strokeStyle=model.bondColors?.[bondIndex]||'#b9ccdf';ctx.shadowColor=model.bondColors?.[bondIndex]||'transparent';ctx.shadowBlur=model.bondColors?.[bondIndex]?5:0;ctx.lineWidth=options.style==='wireframe'?2:model.bondColors?7:5;ctx.lineCap='round';for(let i=0;i<n;i++){const offset=(i-(n-1)/2)*7,len=Math.hypot(q.x-p.x,q.y-p.y)||1,dx=-(q.y-p.y)*offset/len,dy=(q.x-p.x)*offset/len;ctx.beginPath();ctx.moveTo(p.x+dx,p.y+dy);ctx.lineTo(q.x+dx,q.y+dy);ctx.stroke();}}
      ctx.shadowBlur=0;
      const colors={H:'#e7f1fa',O:'#ef5669',N:'#5898ff',C:'#70869f',S:'#eac85e',F:'#72d9ab',Cl:'#72d9ab',Cu:'#e3a36d',Fe:'#d68c6e',Co:'#c66bd1',Pt:'#c6cbd9'};
      [...points].sort((a,b)=>a.z-b.z).forEach(p=>{if(!options.hydrogen&&p.s==='H')return;const r=(options.style==='wireframe'?5:options.style==='spacefill'?(p.s==='H'?25:38):(p.radius||(p.s==='H'?12:20)))*Math.sqrt(zoom);const g=ctx.createRadialGradient(p.x-r*.3,p.y-r*.4,1,p.x,p.y,r);g.addColorStop(0,'#ffffff');g.addColorStop(.4,p.color||colors[p.s]||'#c7a0f6');g.addColorStop(1,'#405775');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#11243c';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';if(options.labels)ctx.fillText(p.label,p.x,p.y);});
    }
    ctx.fillStyle='#95b4d7';ctx.textAlign='left';ctx.font='12px system-ui';ctx.fillText(bohr?'Mô hình lớp electron • minh họa':'Kéo để xoay · cuộn để phóng to',16,height-16);
  }
  function animate(){if(!running||disposed)return;yaw+=.008;draw();raf=requestAnimationFrame(animate);}
  canvas.onpointerdown=e=>{drag=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);};
  canvas.onpointermove=e=>{if(!drag)return;yaw+=(e.clientX-drag[0])*.012;pitch+=(e.clientY-drag[1])*.012;drag=[e.clientX,e.clientY];draw();};
  canvas.onpointerup=canvas.onpointercancel=()=>drag=null;
  canvas.onwheel=e=>{e.preventDefault();zoom=Math.max(.5,Math.min(2.5,zoom-e.deltaY*.001));draw();};
  canvas.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.12;if(e.key==='ArrowRight')yaw+=.12;if(e.key==='ArrowUp')pitch-=.12;if(e.key==='ArrowDown')pitch+=.12;if(e.key==='+'||e.key==='=')zoom=Math.min(2.5,zoom+.15);if(e.key==='-')zoom=Math.max(.5,zoom-.15);if(e.key==='0'){yaw=.35;pitch=.2;zoom=1;}draw();};
  const resize=new ResizeObserver(draw);resize.observe(canvas);draw();
  return {setOptions(next){options={...options,...next};draw();},setModel(next){model=next;running=false;cancelAnimationFrame(raf);draw();},toggle(){running=!running;cancelAnimationFrame(raf);if(running)animate();return running;},reset(){yaw=.35;pitch=.2;zoom=1;draw();},dispose(){disposed=true;running=false;cancelAnimationFrame(raf);resize.disconnect();}};
}
export function plot(canvas,points,{xLabel='x',yLabel='y',color='#145bc8',yMin,yMax,band,markers=[]}={}){
  const width=Math.max(320,Math.round(canvas.getBoundingClientRect().width)||760),height=330;const dpr=Math.min(3,window.devicePixelRatio||1);canvas.width=width*dpr;canvas.height=height*dpr;const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
  const minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0]));
  const minY=yMin??Math.min(...points.map(p=>p[1])),maxY=yMax??Math.max(...points.map(p=>p[1]));
  const px=x=>65+(x-minX)/(maxX-minX||1)*(width-95),py=y=>275-(y-minY)/(maxY-minY||1)*240;
  if(band){ctx.fillStyle=band.color;ctx.fillRect(65,py(band.high),width-95,py(band.low)-py(band.high));}
  for(const marker of markers){
    ctx.setLineDash(marker.dash?[5,4]:[]);
    ctx.strokeStyle=marker.color;ctx.beginPath();ctx.moveTo(px(marker.volume),35);ctx.lineTo(px(marker.volume),275);ctx.stroke();
  }
  if(markers.length)ctx.setLineDash([]);
  ctx.font='600 13px system-ui';ctx.textAlign='right';ctx.fillStyle='#243f63';
  for(let i=0;i<=5;i++){const y=minY+(maxY-minY)*i/5;ctx.fillText(Number(y.toPrecision(3)),55,py(y)+4);ctx.strokeStyle='#e3eaf3';ctx.beginPath();ctx.moveTo(65,py(y));ctx.lineTo(width-30,py(y));ctx.stroke();}
  ctx.textAlign='center';for(let i=0;i<=5;i++){const x=minX+(maxX-minX)*i/5;ctx.fillText(Number(x.toPrecision(3)),px(x),296);}
  ctx.fillText(xLabel,width/2,322);ctx.textAlign='left';ctx.fillText(yLabel,15,20);
  ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(px(x),py(y)):ctx.moveTo(px(x),py(y)));ctx.stroke();
}
export function download(name,content,type='text/plain'){
  const blob=content instanceof Blob?content:new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
