/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
export function cloudView(canvas){
 const ctx=canvas.getContext('2d');let model=null,yaw=.5,pitch=.25,zoom=1,drag=null,disposed=false,running=false,frame=0,options={phase:true,cut:'all',axes:true};
 function draw(){if(disposed)return;const rect=canvas.getBoundingClientRect(),w=Math.max(1,rect.width),h=Math.max(1,rect.height),dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=w*dpr;canvas.height=h*dpr;ctx.scale(dpr,dpr);ctx.fillStyle='#0b1f3b';ctx.fillRect(0,0,w,h);if(!model){ctx.fillStyle='#c4dcf8';ctx.font='16px sans-serif';ctx.fillText('Chọn orbital và bấm Tạo đám mây.',20,35);return;}
 const scale=Math.min(w,h)*.48*zoom/model.extent;
 const project=([x,y,z])=>{const xx=x*Math.cos(yaw)+y*Math.sin(yaw),yy=-x*Math.sin(yaw)+y*Math.cos(yaw);return [w/2+xx*scale,h/2+(-z*Math.cos(pitch)+yy*Math.sin(pitch))*scale,yy*Math.cos(pitch)+z*Math.sin(pitch)];};
 const points=model.points.filter(p=>options.cut==='all'||options.cut==='z+'&&p[2]>=0||options.cut==='x+'&&p[0]>=0).map(p=>[...project(p),p[3]]).sort((a,b)=>a[2]-b[2]);
 ctx.globalAlpha=.52;for(const[x,y,,phase]of points){ctx.fillStyle=!options.phase?'#6dd9ff':phase>0?'#69caff':'#ff809d';ctx.fillRect(x,y,1.65,1.65);}ctx.globalAlpha=1;
 if(options.axes){for(const[vector,label,color]of [[[model.extent*.75,0,0],'x','#ff8c9e'],[[0,model.extent*.75,0],'y','#70ecbf'],[[0,0,model.extent*.75],'z','#aad4ff']]){const p=project(vector);ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(w/2,h/2);ctx.lineTo(p[0],p[1]);ctx.stroke();ctx.fillStyle=color;ctx.font='15px sans-serif';ctx.fillText(label,p[0]+5,p[1]);}}
 ctx.fillStyle='#ffd37c';ctx.beginPath();ctx.arc(w/2,h/2,3,0,2*Math.PI);ctx.fill();ctx.fillStyle='#b0ccea';ctx.font='13px sans-serif';ctx.fillText(model.type+' · '+points.length+' điểm · kéo xoay / cuộn phóng to',16,h-18);
 }
 function animate(){if(disposed||!running)return;yaw+=.006;draw();frame=requestAnimationFrame(animate);}
 canvas.onpointerdown=e=>{drag=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);};canvas.onpointermove=e=>{if(!drag)return;yaw+=(e.clientX-drag[0])*.01;pitch+=(e.clientY-drag[1])*.01;drag=[e.clientX,e.clientY];draw();};canvas.onpointerup=canvas.onpointercancel=()=>drag=null;canvas.onwheel=e=>{e.preventDefault();zoom=Math.max(.5,Math.min(4,zoom-e.deltaY*.001));draw();};const observer=new ResizeObserver(draw);observer.observe(canvas);draw();
 return {setModel(m){model=m;draw();},setOptions(next){options={...options,...next};draw();},toggle(){running=!running;cancelAnimationFrame(frame);if(running)animate();return running;},reset(){yaw=.5;pitch=.25;zoom=1;draw();},dispose(){disposed=true;running=false;cancelAnimationFrame(frame);observer.disconnect();}};
}
