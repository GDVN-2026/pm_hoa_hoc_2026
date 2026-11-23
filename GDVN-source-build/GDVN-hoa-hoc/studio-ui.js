/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {apparatusLibrary,apparatusKeys,apparatusMarkup,studioTemplates,templateScene,validateStudio} from './studio-library.js';
import {escapeHTML as esc,normalize} from './chemistry.js';
import {download} from './visuals.js';
import {$,set,panel,result,toast} from './modules.js';
export function studio(){
 set(panel('Thư viện dụng cụ & mẫu sơ đồ','<div class="row"><label class="grow">Tìm dụng cụ<input id="studio-search" placeholder="Cốc, sinh hàn, burette…"></label><label>Nhóm<select id="studio-category"><option value="">Tất cả</option>'+[...new Set(apparatusKeys.map(k=>apparatusLibrary[k].group))].map(g=>'<option>'+g+'</option>').join('')+'</select></label><label>Mẫu sơ đồ<select id="studio-template">'+studioTemplates.map(t=>'<option value="'+t.id+'">'+esc(t.name)+'</option>').join('')+'</select></label><button id="studio-apply">Nạp mẫu</button></div><div id="studio-library" class="apparatus-palette"></div><p id="studio-template-note" class="muted">Chọn dụng cụ để thêm vào bảng. Có thể kéo, xoay, đổi màu và kích thước.</p>')+panel('Bảng thiết kế sơ đồ','<div class="row"><label class="grow">Tên sơ đồ<input id="studio-title" value="Sơ đồ thí nghiệm GDVN"></label><label class="check"><input id="studio-grid" type="checkbox" checked> Lưới</label><label class="check"><input id="studio-snap" type="checkbox" checked> Hít lưới 10 px</label><button id="studio-undo">Hoàn tác</button><button id="studio-redo">Làm lại</button></div><div class="canvas-wrap"><svg id="studio-scene" viewBox="0 0 1200 720" class="studio-scene" role="img" aria-label="Bảng thiết kế sơ đồ thí nghiệm"></svg></div><div class="row"><button id="studio-duplicate">Nhân bản</button><button id="studio-front">Đưa lên trước</button><button id="studio-back">Đưa ra sau</button><button id="studio-delete">Xóa mục chọn</button><button id="studio-clear">Trang trắng</button></div><div class="row studio-properties"><label>Nhãn chữ<input id="studio-label" maxlength="120" placeholder="Dùng cho mục Nhãn chữ"></label><label>Màu chất lỏng / chữ<input id="studio-color" type="color" value="#36aef1"></label><label>Tỉ lệ (%)<input id="studio-scale" type="number" min="20" max="300" value="100"></label><label>Góc xoay (°)<input id="studio-angle" type="number" min="-360" max="360" value="0"></label><label class="check"><input id="studio-flip" type="checkbox"> Lật ngang</label><button id="studio-update" class="primary">Áp dụng thuộc tính</button></div>'+result('studio-status')+'<div class="row"><button id="studio-svg" class="primary">Tải SVG</button><button id="studio-png">Tải PNG</button><button id="studio-json">Lưu sơ đồ JSON</button><button id="studio-import">Mở sơ đồ JSON</button><input id="studio-file" type="file" accept="application/json,.json" hidden></div><p class="muted">Sơ đồ tự lưu trên máy. Delete xóa, Ctrl/Cmd D nhân bản; Ctrl/Cmd Z hoàn tác; Ctrl/Cmd Shift Z làm lại. Mẫu chỉ minh họa bố trí, không mô phỏng vận hành dụng cụ.</p>'));
 let scene=templateScene('neutral'),past=[],future=[],selected=null,drag=null,serial=Date.now(),disposed=false;
 try{const saved=localStorage.getItem('gdvn-studio-v2');if(saved)scene=validateStudio(JSON.parse(saved));}catch{toast('Không đọc được bản lưu cũ; đã mở sơ đồ mặc định.');}
 $('studio-template').value=studioTemplates.find(t=>t.name===scene.title)?.id||'blank';
 const svg=$('studio-scene');
 const design=svg.closest('.panel');
 const library=design.previousElementSibling;
 const canvasWrap=svg.parentElement;
 const toolbar=document.createElement('div');
 toolbar.className='studio-toolbar';
 const tools=document.createElement('details');
 tools.className='studio-drawer';
 const summary=document.createElement('summary');
 summary.textContent='Dụng cụ và mẫu sơ đồ';
 tools.append(summary,...Array.from(library.children).slice(1));
 const properties=document.createElement('details');
 properties.className='studio-drawer';
 const propertyTitle=document.createElement('summary');
 propertyTitle.textContent='Thuộc tính mục chọn';
 properties.append(propertyTitle,design.querySelector('.studio-properties'));
 const actionRow=$('studio-duplicate').parentElement;
 const fileRow=$('studio-svg').parentElement;
 const files=document.createElement('details');
 files.className='studio-drawer';
 const filesTitle=document.createElement('summary');
 filesTitle.textContent='Lưu và mở sơ đồ';
 files.append(filesTitle,fileRow);
 toolbar.append(tools,actionRow,properties,files);
 design.insertBefore(toolbar,canvasWrap);
 library.remove();
 $('studio-library').addEventListener('click',event=>{if(event.target.closest('[data-apparatus]'))tools.open=false;});
 function current(){return scene.items.find(item=>item.id===selected);}
 function remember(){past.push(structuredClone(scene));if(past.length>60)past.shift();future=[];}
 function persist(){try{localStorage.setItem('gdvn-studio-v2',JSON.stringify(scene));}catch{toast('Không thể tự lưu. Hãy tải JSON để giữ sơ đồ.');}}
 function content(interactive=false){const grid=interactive&&$('studio-grid').checked?'<defs><pattern id="gdvn-studio-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e3eef7" stroke-width="1"/></pattern></defs><rect width="1200" height="720" fill="url(#gdvn-studio-grid)"/>':'';return '<rect width="1200" height="720" fill="white"/>'+grid+'<text x="25" y="34" fill="#145bc8" font-family="Arial,sans-serif" font-size="20">'+esc(scene.title)+'</text>'+scene.items.map(item=>'<g '+(interactive?'data-object="'+item.id+'" tabindex="0" role="button" aria-label="'+esc(apparatusLibrary[item.type].name)+'"':'')+' transform="translate('+item.x+' '+item.y+') rotate('+item.angle+') scale('+(item.flip?-item.scale:item.scale)+' '+item.scale+')">'+(interactive&&selected===item.id?'<rect x="-80" y="-82" width="160" height="176" rx="8" fill="#1591eb0b" stroke="#0e87df" stroke-width="1.5" stroke-dasharray="5 4"/>':'')+apparatusMarkup(item)+'</g>').join('');}
 function exportSVG(){return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">'+content(false)+'</svg>';}
 function draw(){svg.innerHTML=content(true);$('studio-undo').disabled=!past.length;$('studio-redo').disabled=!future.length;$('studio-title').value=scene.title;const item=current();for(const id of ['studio-duplicate','studio-front','studio-back','studio-delete','studio-update'])$(id).disabled=!item;if(item){$('studio-label').value=item.label;$('studio-color').value=item.color;$('studio-scale').value=Math.round(item.scale*100);$('studio-angle').value=Math.round(item.angle);$('studio-flip').checked=item.flip;}$('studio-status').classList.remove('error');$('studio-status').textContent=scene.items.length+' mục trong sơ đồ'+(item?' · Đang chọn: '+apparatusLibrary[item.type].name:' · Chọn một dụng cụ để chỉnh sửa.');}
 function commit(){draw();persist();}
 function palette(){const q=normalize($('studio-search').value),group=$('studio-category').value;const keys=apparatusKeys.filter(k=>(!group||apparatusLibrary[k].group===group)&&normalize(apparatusLibrary[k].name).includes(q));$('studio-library').innerHTML=keys.map(type=>'<button data-apparatus="'+type+'"><svg viewBox="-85 -85 170 180" aria-hidden="true">'+apparatusMarkup({type,color:'#36aef1',label:'Chữ'})+'</svg><span>'+esc(apparatusLibrary[type].name)+'</span></button>').join('')||'<p>Không có dụng cụ phù hợp.</p>';}
 $('studio-search').oninput=$('studio-category').onchange=palette;
 $('studio-library').onclick=event=>{const button=event.target.closest('[data-apparatus]');if(!button)return;if(scene.items.length>=150){toast('Tối đa 150 mục trong một sơ đồ.');return;}remember();const id='item-'+(++serial);scene.items.push({id,type:button.dataset.apparatus,x:250+(scene.items.length*90)%700,y:260,scale:1,angle:0,flip:false,color:$('studio-color').value,label:$('studio-label').value||'Nhãn'});selected=id;commit();};
 $('studio-apply').onclick=()=>{remember();scene=templateScene($('studio-template').value);selected=null;$('studio-template-note').textContent=studioTemplates.find(t=>t.id===$('studio-template').value).note;commit();};
 function point(event){const r=svg.getBoundingClientRect(),scale=Math.min(r.width/1200,r.height/720),ox=(r.width-1200*scale)/2,oy=(r.height-720*scale)/2;return [(event.clientX-r.left-ox)/scale,(event.clientY-r.top-oy)/scale];}
 svg.onpointerdown=event=>{const hit=event.target.closest('[data-object]');if(!hit){selected=null;draw();return;}selected=hit.dataset.object;const item=current(),p=point(event);remember();drag={id:selected,dx:p[0]-item.x,dy:p[1]-item.y};svg.setPointerCapture(event.pointerId);draw();};
 svg.onpointermove=event=>{if(!drag)return;const item=scene.items.find(i=>i.id===drag.id);if(!item)return;const p=point(event),snap=$('studio-snap').checked?10:1;item.x=Math.max(40,Math.min(1160,Math.round((p[0]-drag.dx)/snap)*snap));item.y=Math.max(90,Math.min(640,Math.round((p[1]-drag.dy)/snap)*snap));draw();};svg.onpointerup=()=>{if(drag){drag=null;persist();}};svg.onpointercancel=()=>{if(drag){drag=null;persist();}};
 function undo(){if(!past.length)return;future.push(structuredClone(scene));scene=past.pop();selected=null;commit();}
 function redo(){if(!future.length)return;past.push(structuredClone(scene));scene=future.pop();selected=null;commit();}
 $('studio-undo').onclick=undo;$('studio-redo').onclick=redo;$('studio-grid').onchange=draw;
 $('studio-title').onchange=()=>{remember();scene.title=$('studio-title').value.slice(0,120);commit();};
 $('studio-update').onclick=()=>{const item=current();if(!item)return;const scale=Number($('studio-scale').value)/100,angle=Number($('studio-angle').value);if(!$('studio-scale').value||!Number.isFinite(scale)||scale<.2||scale>3||!$('studio-angle').value||!Number.isFinite(angle)||Math.abs(angle)>360){$('studio-status').classList.add('error');$('studio-status').textContent='Tỉ lệ từ 20–300%, góc từ −360 đến 360°.';return;}remember();Object.assign(item,{scale,angle,color:$('studio-color').value,label:$('studio-label').value.slice(0,120),flip:$('studio-flip').checked});commit();};
 $('studio-duplicate').onclick=()=>{const item=current();if(!item||scene.items.length>=150)return;remember();const copy={...item,id:'item-'+(++serial),x:Math.min(1160,item.x+30),y:Math.min(640,item.y+30)};scene.items.push(copy);selected=copy.id;commit();};
 $('studio-delete').onclick=()=>{if(!current())return;remember();scene.items=scene.items.filter(item=>item.id!==selected);selected=null;commit();};
 for(const [id,front]of [['studio-front',true],['studio-back',false]])$(id).onclick=()=>{const item=current();if(!item)return;remember();scene.items=scene.items.filter(i=>i.id!==selected);front?scene.items.push(item):scene.items.unshift(item);commit();};
 $('studio-clear').onclick=()=>{remember();scene=templateScene('blank');selected=null;commit();};
 $('studio-svg').onclick=()=>download('GDVN-so-do.svg',exportSVG(),'image/svg+xml');$('studio-json').onclick=()=>download('GDVN-so-do.json',JSON.stringify(scene,null,2),'application/json');
 $('studio-png').onclick=async()=>{const button=$('studio-png');button.disabled=true;let url;try{url=URL.createObjectURL(new Blob([exportSVG()],{type:'image/svg+xml'}));const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error('Không tạo được ảnh từ SVG.'));image.src=url;});if(disposed)return;const canvas=document.createElement('canvas');canvas.width=2400;canvas.height=1440;canvas.getContext('2d').drawImage(image,0,0,2400,1440);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('Không xuất được PNG.');download('GDVN-so-do.png',blob);}catch(error){if(!disposed)toast(error.message);}finally{if(url)URL.revokeObjectURL(url);if(!disposed)button.disabled=false;}};
 $('studio-import').onclick=()=>$('studio-file').click();$('studio-file').onchange=async()=>{const file=$('studio-file').files[0];if(!file)return;try{if(file.size>1024*1024)throw Error('Tệp tối đa 1 MB.');const text=await file.text();if(disposed)return;const next=validateStudio(JSON.parse(text));remember();scene=next;selected=null;commit();toast('Đã mở sơ đồ.');}catch(error){if(!disposed)toast(error.message||'Không đọc được tệp JSON.');}finally{if(!disposed)$('studio-file').value='';}};
 function keyboard(event){if(event.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;const command=event.ctrlKey||event.metaKey;if(command&&event.key.toLowerCase()==='z'){event.preventDefault();event.shiftKey?redo():undo();}else if(command&&event.key.toLowerCase()==='d'){event.preventDefault();$('studio-duplicate').click();}else if(event.key==='Delete'||event.key==='Backspace'){if(current()){event.preventDefault();$('studio-delete').click();}}else if(current()&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();remember();const item=current(),step=event.shiftKey?1:10;item.x=Math.max(40,Math.min(1160,item.x+(event.key==='ArrowRight'?step:event.key==='ArrowLeft'?-step:0)));item.y=Math.max(90,Math.min(640,item.y+(event.key==='ArrowDown'?step:event.key==='ArrowUp'?-step:0)));commit();}}
 document.addEventListener('keydown',keyboard);palette();draw();return ()=>{disposed=true;document.removeEventListener('keydown',keyboard);};
}
export const studioHandlers={studio};
