/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */

import {lewisLab} from './pilot-tools.js';
import {elements,molecules} from './data.js';
import {electronConfig,pretty} from './chemistry.js';
import {modelView,download} from './visuals.js';
import {$,opt,panel,result,number,safe,positive,set,table} from './ui-kit.js';
export {$,opt,panel,result,number,safe,positive,set,table,textSVG,toast} from './ui-kit.js';
export {routes} from './tool-catalog.js';
function atomSelect(id='element',value=6){return '<label>Nguyên tố<select id="'+id+'">'+elements.map(e=>'<option value="'+e.z+'" '+(e.z===value?'selected':'')+'>'+e.z+' · '+e.symbol+' — '+e.name+'</option>').join('')+'</select></label>';}
function config(){
 const query=Number(new URLSearchParams(location.hash.split('?')[1]).get('z'));const initial=Number.isInteger(query)&&query>=1&&query<=118?query:6;
  set(panel('Nguyên tử và ion','<div class="row">'+atomSelect('element',initial)+number('charge','Điện tích ion (0 là nguyên tử)',0,1)+'<button id="compute" class="primary">Xem cấu hình</button></div>'+result()+'<div class="config-layout"><div id="orbitals"></div><canvas id="config-model" class="visual" aria-label="Mô hình lớp electron"></canvas></div><p class="muted">Điền theo nguyên lí vững bền, Pauli và Hund, có xét ngoại lệ. Với cation kim loại chuyển tiếp, electron lớp có n lớn nhất được tách trước.</p>'));
  const view=modelView($('config-model'),{symbol:'C',shells:[2,4]},{bohr:true});
  function run(){const z=Number($('element').value),charge=Number($('charge').value);if(charge<-3||charge>8)throw Error('Điện tích hỗ trợ từ −3 đến +8.');const cfg=electronConfig(z,charge),shells=[];for(const [orbital,n] of cfg){const i=Number(orbital[0])-1;shells[i]=(shells[i]||0)+n;}view.setModel({symbol:elements[z-1].symbol,shells});$('result').innerHTML='<b>'+elements[z-1].symbol+'</b> · '+(z-charge)+' electron<div class="formula">'+cfg.map(([o,n])=>o+'<sup>'+n+'</sup>').join(' ')+'</div>';$('orbitals').innerHTML=cfg.map(([o,n])=>{const count={s:1,p:3,d:5,f:7}[o[1]];return '<div class="row"><b style="width:30px">'+o+'</b>'+Array.from({length:count},(_,i)=>'<span class="orbital">'+(i<n?'↑':'')+(i<n-count?'↓':'')+'</span>').join('')+'</div>';}).join('');}
  $('compute').onclick=()=>safe(run);safe(run);return ()=>view.dispose();
}
const geometries=[
['AX₂','Thẳng','sp','180°',[[1,0,0],[-1,0,0]],0],
['AX₃','Tam giác phẳng','sp²','120°',[[1,0,0],[-.5,.866,0],[-.5,-.866,0]],0],
['AX₂E','Gấp khúc','sp²','nhỏ hơn 120°',[[1,0,0],[-.5,.866,0]],1],
['AX₄','Tứ diện','sp³','109,5°',[[.7,.7,.7],[-.7,-.7,.7],[-.7,.7,-.7],[.7,-.7,-.7]],0],
['AX₃E','Chóp tam giác','sp³','khoảng 107° (NH₃)',[[1,.4,0],[-.5,.4,.866],[-.5,.4,-.866]],1],
['AX₂E₂','Gấp khúc','sp³','khoảng 104,5° (H₂O)',[[-.79,.61,0],[.79,.61,0]],2],
['AX₅','Lưỡng chóp tam giác','sp³d','90°, 120°, 180°',[[1,0,0],[-.5,.866,0],[-.5,-.866,0],[0,0,1],[0,0,-1]],0],
['AX₄E','Bập bênh','sp³d','nhỏ hơn 90° và 120°',[[1,0,0],[-.5,.866,0],[0,0,1],[0,0,-1]],1],
['AX₃E₂','Chữ T','sp³d','khoảng 90°',[[1,0,0],[0,1,0],[0,-1,0]],2],
['AX₆','Bát diện','sp³d²','90°, 180°',[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],0],
['AX₅E','Chóp vuông','sp³d²','khoảng 90°',[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1]],1],
['AX₄E₂','Vuông phẳng','sp³d²','90°, 180°',[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0]],2]
];
function bond(){
  lewisLab();
  set(panel('Hình học VSEPR','<div class="row"><label>Kiểu phân tử<select id="geometry">'+opt(geometries.map(g=>g[0]+' · '+g[1]))+'</select></label><button id="rotate">Tự xoay</button><label class="check"><input id="bond-colors" type="checkbox" checked> Tô màu hướng liên kết</label></div><canvas id="model" class="visual"></canvas><div id="bond-legend" class="bond-legend"></div>'+result())+panel('Liên kết σ và π',table(['Liên kết','Thành phần','Ví dụ'],[['Đơn','1σ','H–H'],['Đôi','1σ + 1π','O=O'],['Ba','1σ + 2π','N≡N']])+'<p class="muted">sp³d và sp³d² là mô tả quy ước ở mức phổ thông. Liên kết trong phân tử siêu hóa trị cần mô hình hiện đại chi tiết hơn.</p>'));
  const palette=['#52cfff','#ff729e','#68e4b0','#ffcc67','#b89aff','#ff9c68'];
  const view=modelView($('model'),molecules[0]);function update(){const [ax,shape,hybrid,angle,coords,lone]=geometries[Number($('geometry').value)];const colorful=$('bond-colors').checked;view.setModel({atoms:[['C',0,0,0],...coords.map(c=>['H',...c])],bonds:coords.map((_,i)=>[0,i+1,1]),viewScale:1.65,atomLabels:['A',...coords.map((_,i)=>'X'+(i+1))],atomRadii:[24,...coords.map(()=>18)],atomColors:colorful?['#ffb763',...coords.map((_,i)=>palette[i])]:undefined,bondColors:colorful?coords.map((_,i)=>palette[i]):undefined});$('bond-legend').innerHTML='<span class="bond-legend-center">A: nguyên tử trung tâm</span>'+coords.map((_,i)=>'<span><i style="background:'+(colorful?palette[i]:'#a9bfd3')+'"></i>A–X'+(i+1)+'</span>').join('');$('rotate').textContent='Tự xoay';$('result').innerHTML='<b>'+ax+' · '+shape+'</b><p>Lai hóa quy ước '+hybrid+' · Góc '+angle+' · '+lone+' cặp electron tự do. A là tâm, X là vị trí liên kết. Màu chỉ giúp phân biệt các hướng, không biểu thị loại nguyên tố hay độ bền liên kết.</p>';}
  $('geometry').onchange=$('bond-colors').onchange=update;$('rotate').onclick=()=>{$('rotate').textContent=view.toggle()?'Dừng xoay':'Tự xoay';};update();return view.dispose;
}
function complex(){
  const examples=[['[Cu(H₂O)₆]²⁺','Cu','O',6,'Bát diện','Aqua','+2','Dung dịch xanh lam.'],['[Ag(NH₃)₂]⁺','Ag','N',2,'Thẳng','Ammine','+1','AgCl tan trong ammonia dư tạo phức này.'],['[Fe(CN)₆]⁴⁻','Fe','C',6,'Bát diện','Cyanido','+2','Mỗi phối tử cyanido mang điện tích −1.'],['[CoCl₄]²⁻','Co','Cl',4,'Tứ diện','Chlorido','+2','Phức thường có màu xanh.'],['[Pt(NH₃)₂Cl₂]','Pt','N',4,'Vuông phẳng','Ammine và chlorido','+2','Có đồng phân cis và trans. Hình chỉ biểu diễn vị trí nguyên tử cho electron.']];
  set(panel('Cấu tạo và hình học','<label>Phức chất<select id="complex">'+opt(examples.map(x=>x[0]))+'</select></label><canvas id="model" class="visual" style="margin-top:18px"></canvas>'+result())+panel('Thuyết trường tinh thể','<p>Trong trường bát diện, orbital d tách thành nhóm t₂g năng lượng thấp và e<sub>g</sub> năng lượng cao. Độ tách Δ phụ thuộc kim loại, số oxi hóa và phối tử.</p><div class="row">'+number('wavelength','Bước sóng hấp thụ λ (nm)',600)+'<button id="energy">Tính năng lượng photon</button></div>'+result('energy-result')));
  const view=modelView($('model'),molecules[0]);function show(){const [name,metal,lig,n,shape,ligName,oxidation,desc]=examples[Number($('complex').value)];const coords=n===6?geometries[9][4]:n===2?geometries[0][4]:shape==='Tứ diện'?geometries[3][4]:geometries[11][4];view.setModel({atoms:[[metal,0,0,0],...coords.map((c,i)=>[metal==='Pt'&&i>1?'Cl':lig,...c.map(v=>v*1.3)])],bonds:coords.map((_,i)=>[0,i+1,1])});$('result').innerHTML='<b>'+name+'</b><p>Trung tâm '+metal+' · Số oxi hóa '+oxidation+' · Số phối trí '+n+' · '+shape+'</p><p>Phối tử '+ligName+'. '+desc+'</p>';}
  $('complex').onchange=show;$('energy').onclick=()=>safe(()=>{$('energy-result').textContent='E = hc/λ = '+pretty(119626.5656/positive('wavelength'))+' kJ/mol photon';},'energy-result');show();return view.dispose;
}
export const moduleHandlers={config,bond,complex};
