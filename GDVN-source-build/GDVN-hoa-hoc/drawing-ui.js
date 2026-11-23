/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {$,panel,set} from './modules.js';

let boardCommands=[];
function board(){
  set(panel('Bảng viết & vẽ','<div class="row palette"><label>Công cụ<select id="tool"><option value="pen">Bút</option><option value="eraser">Tẩy</option><option value="line">Đường thẳng</option><option value="rect">Hình chữ nhật</option><option value="circle">Ellipse</option><option value="triangle">Tam giác</option><option value="diamond">Hình thoi</option><option value="arrow">Mũi tên</option><option value="text">Chữ</option></select></label><label>Màu<input type="color" id="color" value="#145bc8"></label><label>Nét<input type="range" id="width" min="1" max="30" value="3"></label><label>Nội dung chữ<input id="board-text" value="GDVN Hóa học"></label><button id="undo">Hoàn tác</button><button id="redo">Làm lại</button><button id="clear">Xóa bảng</button><button id="board-hand" aria-pressed="false">Bàn tay</button><button id="board-zoom-out" aria-label="Thu nhỏ">−</button><button id="board-zoom-in" aria-label="Phóng to">+</button><button id="board-reset-view">Đặt lại góc nhìn</button></div><div class="canvas-wrap"><canvas id="board" class="drawing" width="1200" height="650" tabindex="0" aria-label="Bảng vẽ. Giữ Space để kéo. Dùng cộng, trừ để thu phóng và 0 để đặt lại góc nhìn."></canvas></div><p class="muted">Chọn công cụ rồi kéo trên bảng. Với công cụ chữ, nhập nội dung và chạm vào vị trí đặt chữ. Dùng Bàn tay để kéo vùng nhìn. Nét vẽ có hiệu lực trong phiên mở trang.</p>'));
  const canvas=$('board'),ctx=canvas.getContext('2d');
  const undo=[],redo=[];
  let active=null,pan=null,pointer=null,space=false,hand=false,frame=0;
  let zoom=1,x=0,y=0;
  const surface=event=>{
    const rect=canvas.getBoundingClientRect();
    return [(event.clientX-rect.left)*canvas.width/rect.width,(event.clientY-rect.top)*canvas.height/rect.height];
  };
  const point=([px,py])=>[(px-x)/zoom,(py-y)/zoom];
  try{
    const raw=sessionStorage.getItem('gdvn-board-handoff');
    if(raw){
      sessionStorage.removeItem('gdvn-board-handoff');
      const card=JSON.parse(raw);
      if(typeof card.title==='string'&&Array.isArray(card.lines)){
        const lines=[card.title,...card.lines.filter(line=>typeof line==='string')].slice(0,10);
        boardCommands.push(...lines.map((text,index)=>({tool:'text',text,color:index?'#17486e':'#006bd7',width:3,points:[point([50,60+index*42])]})));
      }
    }
  }catch{}
  function shapePoints(tool,[x,y],[u,v]){
    const midX=(x+u)/2,midY=(y+v)/2;
    if(tool==='triangle')return [[midX,y],[u,v],[x,v],[midX,y]];
    if(tool==='diamond')return [[midX,y],[u,midY],[midX,v],[x,midY],[midX,y]];
    if(tool==='arrow'){
      const angle=Math.atan2(v-y,u-x),size=Math.min(30,Math.hypot(u-x,v-y)*.4);
      return [[x,y],[u,v],[u-size*Math.cos(angle-.55),v-size*Math.sin(angle-.55)],[u,v],[u-size*Math.cos(angle+.55),v-size*Math.sin(angle+.55)]];
    }
    return null;
  }
  function drawCommand(c){
    const [start,end]=[c.points[0],c.points.at(-1)];if(!start)return;ctx.strokeStyle=c.tool==='eraser'?'#ffffff':c.color;ctx.fillStyle=c.color;ctx.lineWidth=c.width;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();
    if(c.tool==='text'){ctx.font='24px system-ui';ctx.fillText(c.text,start[0],start[1]);return;}
    if(c.tool==='rect')ctx.rect(start[0],start[1],end[0]-start[0],end[1]-start[1]);
    else if(c.tool==='circle')ctx.ellipse((start[0]+end[0])/2,(start[1]+end[1])/2,Math.abs(end[0]-start[0])/2,Math.abs(end[1]-start[1])/2,0,0,Math.PI*2);
    else if(shapePoints(c.tool,start,end)){const [first,...rest]=shapePoints(c.tool,start,end);ctx.moveTo(...first);rest.forEach(p=>ctx.lineTo(...p));}
    else if(c.tool==='line'){ctx.moveTo(...start);ctx.lineTo(...end);}
    else{ctx.moveTo(...start);for(const p of c.points)ctx.lineTo(...p);if(c.points.length===1)ctx.lineTo(start[0]+.01,start[1]);}
    ctx.stroke();
  }
  function draw(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.fillStyle='#fff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.setTransform(zoom,0,0,zoom,x,y);
    boardCommands.forEach(drawCommand);
    if(active)drawCommand(active);
    $('undo').disabled=!undo.length&&!boardCommands.length;
    $('redo').disabled=!redo.length;
  }
  function commit(next){
    undo.push(boardCommands);
    boardCommands=next;
    redo.length=0;
    draw();
  }
  function undoAction(){
    if(!undo.length&&!boardCommands.length)return;
    redo.push(boardCommands);
    boardCommands=undo.length?undo.pop():boardCommands.slice(0,-1);
    draw();
  }
  function redoAction(){
    if(!redo.length)return;
    undo.push(boardCommands);
    boardCommands=redo.pop();
    draw();
  }
  function zoomAt(factor,[px,py]=[canvas.width/2,canvas.height/2]){
    const [worldX,worldY]=point([px,py]);
    zoom=Math.max(.2,Math.min(5,zoom*factor));
    x=px-worldX*zoom;
    y=py-worldY*zoom;
    draw();
  }
  function resetView(){zoom=1;x=0;y=0;draw();}
  function cursor(){canvas.style.cursor=pan?'grabbing':hand||space?'grab':'crosshair';}
  function trace(position){
    const next=point(position);
    if(['pen','eraser'].includes(active.tool))active.points.push(next);
    else if(active.tool!=='text')active.points=[active.points[0],next];
  }
  function extend(){
    if(!active||!pointer){frame=0;return;}
    const [px,py]=pointer,margin=36;
    const speed=(value,size)=>value<margin?Math.min(12,(margin-value)/4):value>size-margin?-Math.min(12,(value-size+margin)/4):0;
    const dx=speed(px,canvas.width),dy=speed(py,canvas.height);
    if(dx||dy){x+=dx;y+=dy;trace(pointer);draw();}
    frame=requestAnimationFrame(extend);
  }
  function finish(keep){
    if(frame)cancelAnimationFrame(frame);
    frame=0;
    const command=active;
    active=null;
    const id=pointer?.id;
    pointer=null;
    pan=null;
    if(id!==undefined&&canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);
    cursor();
    if(keep&&command)commit([...boardCommands,command]);else draw();
  }
  canvas.onpointerdown=event=>{
    if(pointer||![0,1].includes(event.button))return;
    event.preventDefault();
    canvas.focus({preventScroll:true});
    canvas.setPointerCapture(event.pointerId);
    pointer=surface(event);
    pointer.id=event.pointerId;
    if(hand||space||event.button===1){pan=pointer;cursor();return;}
    active={tool:$('tool').value,color:$('color').value,width:Number($('width').value),text:$('board-text').value,points:[point(pointer)]};
    draw();
  };
  canvas.onpointermove=event=>{
    if(pointer?.id!==event.pointerId)return;
    pointer=surface(event);
    pointer.id=event.pointerId;
    if(pan){x+=pointer[0]-pan[0];y+=pointer[1]-pan[1];pan=pointer;draw();return;}
    trace(pointer);
    if(!frame&&active.tool!=='text')frame=requestAnimationFrame(extend);
    draw();
  };
  canvas.onpointerup=event=>{if(pointer?.id===event.pointerId)finish(true);};
  canvas.onpointercancel=canvas.onlostpointercapture=event=>{if(pointer?.id===event.pointerId)finish(false);};
  canvas.addEventListener('wheel',event=>{event.preventDefault();zoomAt(event.deltaY<0?1.12:1/1.12,surface(event));},{passive:false});
  const keys=event=>{
    if(event.target instanceof Element&&event.target.closest('input,select,textarea,[contenteditable]'))return;
    if(document.activeElement!==canvas&&!pointer)return;
    const key=event.key.toLowerCase();
    if((event.ctrlKey||event.metaKey)&&key==='z'&&!event.altKey){
      event.preventDefault();
      if(!pointer)(event.shiftKey?redoAction:undoAction)();
    }else if(!event.ctrlKey&&!event.metaKey&&!event.altKey){
      if(key===' '){event.preventDefault();space=true;cursor();}
      else if(key==='escape'&&pointer){event.preventDefault();event.stopPropagation();finish(false);}
      else if(['+','=','-','0'].includes(key)){event.preventDefault();if(!pointer)(key==='0'?resetView():zoomAt(key==='-'?1/1.2:1.2));}
    }
  };
  const releaseSpace=event=>{if(event.key===' '){space=false;cursor();}};
  const blur=()=>{space=false;if(pointer)finish(false);cursor();};
  document.addEventListener('keydown',keys,true);
  document.addEventListener('keyup',releaseSpace);
  window.addEventListener('blur',blur);
  canvas.addEventListener('blur',blur);
  $('undo').onclick=undoAction;
  $('redo').onclick=redoAction;
  $('clear').onclick=()=>{if(boardCommands.length)commit([]);};
  $('board-hand').onclick=()=>{hand=!hand;$('board-hand').setAttribute('aria-pressed',String(hand));cursor();};
  $('board-zoom-in').onclick=()=>zoomAt(1.2);
  $('board-zoom-out').onclick=()=>zoomAt(1/1.2);
  $('board-reset-view').onclick=resetView;
  canvas.style.touchAction='none';
  cursor();draw();
  return ()=>{
    if(frame)cancelAnimationFrame(frame);
    document.removeEventListener('keydown',keys,true);
    document.removeEventListener('keyup',releaseSpace);
    window.removeEventListener('blur',blur);
  };
}

export const drawingHandlers={board};
