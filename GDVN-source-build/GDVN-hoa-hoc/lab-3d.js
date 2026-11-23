/** GDVN · Nguyễn Thanh Vy · Interactive projected 3D apparatus; qualitative, not kinetics. */
export const supportsLab3D=(kind,variant)=>variant==='lime-kiln'||['dropper','tongs','dry','oxygen','ammonia'].includes(kind);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function projectLabPoint(p,w,h,yaw=-.36,pitch=.22,zoom=1){const [x,y,z]=p,xx=x*Math.cos(yaw)+z*Math.sin(yaw),zz=-x*Math.sin(yaw)+z*Math.cos(yaw),yy=(y-1.2)*Math.cos(pitch)-zz*Math.sin(pitch),depth=(y-1.2)*Math.sin(pitch)+zz*Math.cos(pitch),scale=Math.min(w/5.2,h/4.3)*zoom*6/(6-depth);return [w/2+xx*scale,h*.56-yy*scale,depth];}
export function apparatusModel(kind,variant,state,effect,t=0,colors={}){
 const faces=[],labels=[];
 const polygon=(points,color,alpha=1)=>faces.push({points,color,alpha});
 function box(x,y,z,w,h,d,color){const p=[[x,y,z],[x+w,y,z],[x+w,y+h,z],[x,y+h,z],[x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d]];for(const f of [[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[1,5,6,2],[0,3,7,4]])polygon(f.map(i=>p[i]),color);}
 function cylinder(x,y,z,r,h,color,alpha=1,n=20){const ring=(yy)=>Array.from({length:n},(_,i)=>[x+r*Math.cos(i*2*Math.PI/n),yy,z+r*Math.sin(i*2*Math.PI/n)]),a=ring(y),b=ring(y+h);for(let i=0;i<n;i++)polygon([a[i],a[(i+1)%n],b[(i+1)%n],b[i]],color,alpha);polygon(b,color,alpha);}
 function pipe(points,r=0.045,color='#83a7b8'){for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],v=b.map((p,j)=>p-a[j]),length=Math.hypot(...v),u=v.map(p=>p/length);let normal=Math.abs(u[1])<.9?[0,1,0]:[1,0,0];const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];let n=cross(u,normal),nn=Math.hypot(...n);n=n.map(p=>p/nn);const m=cross(u,n);const ring=p=>Array.from({length:10},(_,k)=>p.map((q,j)=>q+r*(n[j]*Math.cos(k*Math.PI/5)+m[j]*Math.sin(k*Math.PI/5))));const aa=ring(a),bb=ring(b);for(let k=0;k<10;k++)polygon([aa[k],aa[(k+1)%10],bb[(k+1)%10],bb[k]],color);}}
 const active=['dosing','process','reacting'].includes(state),done=state==='reacting';
 box(-2,-.14,-1.4,4,.12,2.8,'#c3d3dc');
 if(variant==='lime-kiln'){
   // Cutaway furnace: rear and side walls remain volumetric; front exposes the charge.
   box(-.95,0,-.68,1.9,2.05,.22,'#54758a');box(-.95,0,-.46,.24,2.05,1.13,'#54758a');box(.71,0,-.46,.24,2.05,1.13,'#54758a');
   box(-.71,.08,-.45,1.42,.2,1.06,'#3c5366');box(-.95,1.8,-.45,1.9,.25,1.12,'#7594a5');
   box(-.66,.3,-.38,1.32,.12,.95,'#b7a18c');
   if(active){box(-.58,.44,-.3,1.16,.08,.8,'#e58e43');for(let i=0;i<6;i++)cylinder(-.44+i*.18,.5,-.12,.045,.22+Math.sin(t*3+i)*.06,'#ffc16d',.8,8);}
   cylinder(0,.67,.12,.47,.13,'#b4c4cc');
   for(let i=0;i<9;i++){const x=(i%3-1)*.25,z=(Math.floor(i/3)-1)*.2+.12;box(x-.09,.8+(i%2)*.035,z-.08,.18,.14,.16,done?'#f0eee1':'#cbbfa4');}
   pipe([[.35,1.76,-.1],[.35,2.45,-.1],[1.45,2.45,-.1]],.085);
   if(active)for(let i=0;i<7;i++){const q=((t*.24+i/7)%1);cylinder(1.48+q*.32,2.45+q*.45,-.1,.025+q*.02,.025,'#a4d6e2',.8,8);}
   labels.push({point:[-.04,1.03,.28],text:done?'CaO · rắn':'CaCO₃ · rắn'},{point:[1.42,2.58,-.1],text:active?'CO₂ · khí không màu':'Đường thoát CO₂'},{point:[-.75,.48,.7],text:active?'Cấp nhiệt':'Buồng nung'});
 }else if(['dry','oxygen','ammonia'].includes(kind)){
   box(-1.7,0,-.25,.7,.08,.5,'#405e74');cylinder(-1.4,.08,0,.035,2.1,'#7898aa');
   pipe([[-1.4,1.6,0],[-.5,1.6,0]],.035);
   cylinder(-.65,.8,0,.24,1.05,'#a8d9e9',.2);cylinder(-.65,.83,0,.2,.19,colors.solid||'#b6ac9a');
   cylinder(-.65,.07,0,.23,.12,'#405e74');cylinder(-.65,.19,0,.075,.32,'#7898aa');
   if(active)cylinder(-.65,.51,0,.085,.24,'#ffc577',.9,10);
   if(kind==='oxygen'){
     pipe([[-.65,1.86,0],[-.65,2.12,0],[.9,2.12,0],[.9,.42,0]],.035);
     cylinder(.9,.05,0,.58,.45,'#90cfe5',.18);cylinder(.9,.07,0,.53,.23,'#48adcf',.35);
     cylinder(.9,.29,0,.23,1.1,'#b9e2ed',.22);cylinder(.9,.31,0,.2,done?.24:.91,'#59b4d4',.4);
     labels.push({point:[.9,1.48,0],text:done?'O₂ · thu qua nước':'Bình thu qua nước'});
   }
   labels.push({point:[-.65,1.98,0],text:'Ống chịu nhiệt'},{point:[-.65,.48,.3],text:active?'Cấp nhiệt':'Nguồn nhiệt'});
   if(kind==='ammonia'){box(-.34,1.87,0,.44,.07,.12,done?'#618eca':'#d78895');labels.push({point:[.42,2.05,0],text:done?'Quỳ ẩm chuyển xanh':'Giấy quỳ đỏ ẩm'});}
 }else{
   cylinder(0,.05,0,.64,1.35,'#9ed6e8',.19,28);
   cylinder(0,.08,0,.59,.63,colors.liquid||'#65bbd5',.55,28);
   if(done&&effect==='precipitate')cylinder(0,.09,0,.56,.13,colors.deposit||'#d4d6bb',.95);
   if(kind==='tongs'){const remaining=done&&Number.isFinite(colors.solidFraction)?clamp(colors.solidFraction,0,1):1;if(remaining>0)box(-.13,.1,0,.26,.8*remaining,.13,'#859da9');if(done&&effect==='coating')box(-.14,.12,.14,.28,.66,.025,colors.deposit||'#ba754b');}
   else{
     cylinder(.15,1.8,0,.055,.48,'#acdeed',.6);cylinder(.15,2.28,0,.12,.21,'#3f6c8c');
     if(state==='dosing')cylinder(.15,1.4+((t*.7)%1)*.3,0,.025,.04,'#61c5e2',.9,8);
   }
   if(done&&effect==='gas')for(let i=0;i<9;i++){const a=i*2.4,y=.2+((t*.3+i/9)%1)*.75;cylinder(Math.sin(a)*.35,y,Math.cos(a)*.35,.035,.04,'#e0f8ff',.8,8);}
   labels.push({point:[-.65,.95,.1],text:done&&effect==='precipitate'?'Kết tủa ở đáy':'Bình phản ứng'},{point:[.2,2.58,0],text:kind==='tongs'?'Mẫu rắn':'Dung dịch thêm vào'});
 }
 return {faces,labels};
}
export function mountLab3D(stage){
 const canvas=document.createElement('canvas');canvas.id='lab-3d';canvas.tabIndex=0;canvas.setAttribute('aria-label','Mô hình dụng cụ 3D. Kéo để xoay; phím mũi tên đổi góc, cộng trừ thu phóng, phím 0 đặt lại.');stage.append(canvas);
 const ctx=canvas.getContext('2d');let yaw=-.36,pitch=.22,zoom=1,frame,dead=false,last=0,time=0,dirty=true,key='',pointer=null;
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const project=(p,w,h)=>projectLabPoint(p,w,h,yaw,pitch,zoom);
 function draw(){
   const rect=stage.getBoundingClientRect(),w=rect.width||640,h=rect.height||460,dpr=Math.min(window.devicePixelRatio||1,2);
   if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
   const gradient=ctx.createLinearGradient(0,0,0,h);gradient.addColorStop(0,'#eaf4f8');gradient.addColorStop(1,'#cbdde6');ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
   const kind=stage.dataset.apparatus,variant=stage.dataset.variant,state=stage.dataset.state,effect=stage.dataset.effect;
   if(!supportsLab3D(kind,variant))return;
   const liquid=document.getElementById('liquid')?.style.getPropertyValue('--liquid-color'),deposit=document.getElementById('deposit')?.style.getPropertyValue('--precipitate-color'),solid=stage.style.getPropertyValue('--lab-solid');
   const remaining=stage.style.getPropertyValue('--lab-remaining');
   const model=apparatusModel(kind,variant,state,effect,time,{liquid,deposit,solid,solidFraction:remaining===''?1:Number(remaining)});
   const faces=model.faces.map(f=>({...f,projected:f.points.map(p=>project(p,w,h))}));
   faces.sort((a,b)=>a.projected.reduce((s,p)=>s+p[2],0)/a.points.length-b.projected.reduce((s,p)=>s+p[2],0)/b.points.length);
   for(const f of faces){const a=f.points[0],b=f.points[1],c=f.points[2],u=b.map((v,i)=>v-a[i]),v=c.map((q,i)=>q-a[i]),n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],light=.62+.32*Math.abs((n[0]*.4+n[1]*.8+n[2]*.5)/(Math.hypot(...n)||1));ctx.globalAlpha=f.alpha;ctx.fillStyle=f.color;ctx.beginPath();f.projected.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill();ctx.fillStyle='rgba(8,30,48,'+(1-light)*.42+')';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=.5;ctx.stroke();}
   ctx.globalAlpha=1;ctx.font='600 12px Segoe UI, sans-serif';ctx.textAlign='center';
   for(const label of model.labels){const [x,y]=project(label.point,w,h),tw=ctx.measureText(label.text).width+18,xx=clamp(x,tw/2+8,w-tw/2-8),yy=clamp(y,75,h-48);ctx.fillStyle='rgba(250,254,255,.94)';ctx.fillRect(xx-tw/2,yy-14,tw,24);ctx.fillStyle='#25465b';ctx.fillText(label.text,xx,yy+2);}
 }
 function loop(now){if(dead)return;const signature=[stage.dataset.apparatus,stage.dataset.variant,stage.dataset.state,stage.dataset.effect,stage.dataset.paused,stage.dataset.view].join('|'),moving=stage.dataset.view==='3d'&&stage.dataset.paused!=='true'&&!reduced&&['dosing','reacting','process'].includes(stage.dataset.state);if(stage.dataset.view==='3d'&&(dirty||signature!==key||(moving&&now-last>45))){if(moving)time+=Math.min((now-last)/1000,.06);draw();dirty=false;key=signature;last=now;}frame=requestAnimationFrame(loop);}
 const observer=new ResizeObserver(()=>{dirty=true;});observer.observe(stage);
 canvas.onpointerdown=e=>{pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture?.(e.pointerId);canvas.focus();};
 canvas.onpointermove=e=>{if(!pointer||e.pointerId!==pointer.id)return;yaw+=(e.clientX-pointer.x)*.009;pitch=clamp(pitch+(e.clientY-pointer.y)*.006,-.25,.85);pointer={id:e.pointerId,x:e.clientX,y:e.clientY};dirty=true;};
 canvas.onpointerup=canvas.onpointercancel=()=>{pointer=null;};
 function scale(factor){zoom=clamp(zoom*factor,.65,1.65);dirty=true;}
 function reset(){yaw=-.36;pitch=.22;zoom=1;dirty=true;}
 canvas.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.15;if(e.key==='ArrowRight')yaw+=.15;if(e.key==='ArrowUp')pitch=clamp(pitch+.1,-.25,.85);if(e.key==='ArrowDown')pitch=clamp(pitch-.1,-.25,.85);if(e.key==='+'||e.key==='=')scale(1.1);if(e.key==='-')scale(1/1.1);if(e.key==='0')reset();dirty=true;};
 frame=requestAnimationFrame(loop);
 return {canvas,reset,scale,angle(value){yaw=value;dirty=true;},refresh(){dirty=true;},dispose(){dead=true;cancelAnimationFrame(frame);observer.disconnect();}};
}
