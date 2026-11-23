/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {apparatusFor,preparationGroups,reactionEffect} from './lab-preparation.js';
import {labScene} from './lab-scenes.js';
import {labReactions,matchReaction} from './lab-data.js';
import {labDomain,chemistrySources} from './lab-domain.js';
import {balanceEquation,escapeHTML as esc,formatFormula as formula,normalize,pretty} from './chemistry.js';
import {limitingReagent} from './stoichiometry.js';
import {download} from './visuals.js';
import {$,set,panel,result,table,toast,safe} from './modules.js';
export function lab(){
 let favorites=[],history=[];try{favorites=JSON.parse(localStorage.getItem('gdvn-lab-favorites')||'[]');if(!Array.isArray(favorites))favorites=[];}catch{}
 set(panel('Thư viện thí nghiệm & phản ứng','<div class="row"><label class="grow">Tìm thí nghiệm<input id="lab-search" placeholder="Tên chất, công thức, hiện tượng…"></label><label>Chủ đề<select id="lab-topic"><option value="">Tất cả</option><option>Sắt</option><option>Nhôm</option><option>Halogen</option><option>Hữu cơ</option><option>Điện phân</option></select></label><label>Loại phản ứng<select id="lab-type"><option value="">Tất cả</option>'+[...new Set(labReactions.map(r=>r.type))].map(t=>'<option>'+esc(t)+'</option>').join('')+'</select></label><label class="check"><input id="lab-favorites" type="checkbox"> Chỉ mục đã lưu</label><span class="pill" id="lab-count"></span></div><div class="row"><label>Nhóm sản phẩm<select id="lab-group"><option value="">Tất cả</option>'+Object.keys(preparationGroups).map(g=>'<option>'+esc(g)+'</option>').join('')+'</select></label><label>Sản phẩm cần tạo<select id="lab-product"></select></label><label class="grow">Thí nghiệm<select id="experiment"></select></label><button id="lab-favorite">☆ Lưu yêu thích</button><button id="react" class="primary">Cho phản ứng</button><button id="restart">Làm lại</button></div><div class="columns lab-layout"><div class="lab-visual-column"><div class="lab-stage" id="lab-stage" data-state="ready"><div class="lab-world"><div class="stage-halo"></div><div id="lab-apparatus"></div><div id="lab-metal-sample" aria-hidden="true"></div><div class="stage-bench"></div><div class="glass-beaker"><div class="glass-rim back"></div><div class="beaker-volume"><div class="liquid" id="liquid"><div class="liquid-surface"></div><div class="liquid-caustic"></div><div id="bubbles" class="lab-bubbles"></div><div class="deposit" id="deposit"></div></div><div class="glass-shine left"></div><div class="glass-shine right"></div><div class="glass-graduations"><span>100</span><span>75</span><span>50</span><span>25</span></div></div><div class="glass-rim front"></div><div class="glass-base"></div></div></div><div id="lab-label-line" hidden></div><div id="lab-scene-label" role="status" hidden></div><div class="stage-caption"><span></span> GDVN · MÔ PHỎNG PHẢN ỨNG</div></div><div class="lab-view-controls" aria-label="Góc quan sát"><button id="lab-view-left" aria-label="Góc nhìn trái">↶</button><button id="lab-view-center">Nhìn thẳng</button><button id="lab-view-right" aria-label="Góc nhìn phải">↷</button></div><p class="lab-phase" id="lab-phase" aria-live="polite">Sẵn sàng</p><div id="lab-materials" class="lab-materials" aria-label="Chú thích phản ứng"></div></div><div>'+result()+'</div></div><p class="muted">Thư viện hiện có '+labReactions.length+' phương trình/biến thể chất phản ứng. Đây là mô phỏng định tính; màu, tốc độ và lượng kết tủa chỉ minh họa, không phải mô hình cân bằng hóa học toàn diện.</p>')+panel('Lượng chất, chất giới hạn & dư','<div id="lab-amounts"></div><div class="row"><button id="lab-quantitative">Tính theo lượng đã nhập</button><button id="lab-report">Tải ghi chép TXT</button></div>'+result('lab-quantity-result'))+panel('Tự chọn cặp chất','<div class="row"><label>Chất thứ nhất<select id="reagent-a"></select></label><label>Chất thứ hai<select id="reagent-b"></select></label><button id="mix" class="primary">Kiểm tra cặp chất</button><button id="mix-open" disabled>Mở thí nghiệm tương ứng</button></div>'+result('mix-result'))+panel('Nhận biết qua màu sắc','<div class="row"><label>Hiện tượng<select id="lab-colour-test"><option value="starch">Hồ tinh bột và iodine</option><option value="bleach">Chlorine ẩm và giấy màu</option></select></label><button id="lab-colour-run" class="primary">Quan sát đổi màu</button><button id="lab-colour-reset">Làm lại</button></div><div class="lab-colour-card"><div id="lab-colour-sample" role="img" aria-label="Mẫu trước phản ứng"></div><p id="lab-colour-note" role="status"></p></div>')+panel('Nhật ký trong phiên','<div id="lab-history">Chưa có thí nghiệm được thực hiện.</div>'));
 let selected=labReactions[0],balanced=balanceEquation(selected.equation),mixed=null,lastQuantity=null;
 let runQuantity=null;
 const stageNode=$('lab-stage');
 stageNode.insertAdjacentHTML('beforebegin','<div class="lab-playback"><label>Tốc độ trình diễn<select id="lab-speed"><option value="0.5">Chậm ×0,5</option><option value="1" selected>Thường ×1</option><option value="2">Nhanh ×2</option></select></label><span>Thời gian trình diễn không phải tốc độ phản ứng thực.</span></div><ol id="lab-progress" class="lab-progress" aria-label="Tiến trình thí nghiệm"><li>Chuẩn bị</li><li>Chất ban đầu</li><li>Thao tác</li><li>Kết quả</li></ol>');
 const quantityPanel=$('lab-amounts').closest('.panel');
 quantityPanel.classList.add('lab-input-panel');
 $('result').before(quantityPanel);
 $('result').insertAdjacentHTML('beforebegin','<div id="lab-run-summary" class="lab-run-summary" aria-live="polite" hidden></div>');
 $('result').insertAdjacentHTML('afterend','<aside id="lab-domain" class="lab-domain" aria-label="Phạm vi khoa học"></aside>');
 function domainNotice(scope){const source=chemistrySources[scope.source];const node=$('lab-domain');node.dataset.blocked=String(scope.blocked);node.innerHTML='<h3>'+(scope.blocked?'Cần xét phản ứng tiếp theo':'Phạm vi khoa học của cảnh')+'</h3><p>'+esc(scope.message)+'</p><p>'+esc(scope.next)+'</p><a href="'+source.url+'" target="_blank" rel="noopener noreferrer">'+esc(source.title)+' ↗</a>';}
 function checkDomain(quantity){const scope=labDomain(balanced,quantity);domainNotice(scope);if(scope.blocked)throw Error('Ngoài phạm vi mô hình: '+scope.message+' '+scope.next);return quantity;}
 $('lab-amounts').insertAdjacentHTML('afterend','<div class="lab-presets"><button id="lab-stoich">Điền theo tỉ lệ phương trình</button><span>Điền số mol bằng hệ số; bạn có thể sửa từng lượng.</span></div>');
 function progress(step){$('lab-progress').querySelectorAll('li').forEach((node,i)=>{node.classList.toggle('complete',i<step);node.classList.toggle('current',i===step);if(i===step)node.setAttribute('aria-current','step');else node.removeAttribute('aria-current');});}
 let pendingStep=null,paused=false,phaseBeforePause='';
 const pauseButton=document.createElement('button');
 pauseButton.id='lab-pause';pauseButton.textContent='Tạm dừng';pauseButton.disabled=true;
 pauseButton.setAttribute('aria-pressed','false');
 stageNode.parentElement.querySelector('.lab-playback').append(pauseButton);
 function resumeTimer(){
   const step=pendingStep;if(!step)return;
   step.started=performance.now();
   dosingTimer=setTimeout(()=>{pendingStep=null;step.fn();},step.remaining);
 }
 function schedule(fn,ms){
   clearTimeout(dosingTimer);
   pendingStep={fn,remaining:ms/Number($('lab-speed').value),started:0};
   resumeTimer();return dosingTimer;
 }
 pauseButton.onclick=()=>{
   paused=!paused;stageNode.dataset.paused=String(paused);
   pauseButton.setAttribute('aria-pressed',String(paused));
   pauseButton.textContent=paused?'Tiếp tục':'Tạm dừng';
   if(paused){
     phaseBeforePause=$('lab-phase').textContent;
     clearTimeout(dosingTimer);
     if(pendingStep)pendingStep.remaining=Math.max(0,pendingStep.remaining-(performance.now()-pendingStep.started));
     $('lab-phase').textContent='Đã tạm dừng. Bấm Tiếp tục để xem tiếp.';
   }else{$('lab-phase').textContent=phaseBeforePause;resumeTimer();}
 };
 $('lab-speed').onchange=()=>{reset();$('lab-phase').textContent='Đã đổi tốc độ trình diễn. Bấm Cho phản ứng để chạy lại.';};
 $('lab-stoich').onclick=()=>{for(let i=0;i<balanced.split;i++){$('lab-n-'+i).value=balanced.coefficients[i];$('lab-unit-'+i).value='mol';}invalidateAmounts();};
 for(const [id,angle] of [['lab-view-left',-14],['lab-view-center',0],['lab-view-right',14]]){
   $(id).onclick=()=> $('lab-stage').style.setProperty('--lab-view',angle+'deg');
 }
 function colourTest(reacted){
   const starch=$('lab-colour-test').value==='starch';
   const sample=$('lab-colour-sample');
   sample.dataset.test=starch?'starch':'bleach';
   sample.dataset.reacted=String(reacted);
   const explanation=starch
     ?(reacted?'Xuất hiện màu xanh tím đậm do iodine tạo phức màu với tinh bột.':'Hồ tinh bột ban đầu có màu trắng đục. Chọn Quan sát đổi màu để thêm dung dịch iodine.')
     :(reacted?'Vùng giấy màu ẩm tiếp xúc chlorine nhạt màu do tác dụng oxi hóa của HOCl hình thành trong nước.':'Mẫu giấy màu ẩm ở trạng thái ban đầu.');
   sample.setAttribute('aria-label',explanation);
   $('lab-colour-note').textContent=explanation;
 }
 $('lab-colour-test').onchange=$('lab-colour-reset').onclick=()=>colourTest(false);
 $('lab-colour-run').onclick=()=>colourTest(true);
 colourTest(false);
 function show(){balanced=balanceEquation(selected.equation);lastQuantity=null;$('lab-amounts').innerHTML=balanced.all.slice(0,balanced.split).map((s,i)=>'<div class="row"><label>'+esc(s)+' — lượng ban đầu<input id="lab-n-'+i+'" type="number" value="1" min="0" step="any"></label><label>Đơn vị<select id="lab-unit-'+i+'"><option value="mol">mol</option><option value="g">g</option></select></label></div>').join('');$('lab-quantity-result').textContent='Nhập lượng từng chất phản ứng để tính giới hạn và lượng dư.';$('lab-favorite').textContent=favorites.includes(selected.id)?'★ Đã lưu':'☆ Lưu yêu thích';reset();}
 const ironStages=[
  ['Nạp liệu','Quặng chứa Fe₂O₃, than cốc và đá vôi CaCO₃ đi vào đỉnh lò.','Quặng + than cốc + đá vôi'],
  ['Tạo khí khử','Gió nóng cấp oxygen. Than cốc cháy tạo nhiệt và CO₂, rồi CO₂ phản ứng tiếp với carbon nóng.','C + O₂ → CO₂   ·   CO₂ + C → 2CO'],
  ['Khử oxide sắt','CO đi lên, khử oxide qua các dạng trung gian. Phương trình dưới đây gộp các bước khử.','Fe₂O₃ + 3CO → 2Fe + 3CO₂'],
  ['Tạo xỉ','Đá vôi phân hủy. CaO kết hợp với silica trong quặng, tạo thành phần minh họa của xỉ.','CaCO₃ → CaO + CO₂   ·   CaO + SiO₂ → CaSiO₃'],
  ['Thu gang và xỉ','Gang lỏng chứa carbon tích tụ bên dưới. Xỉ nhẹ hơn nổi phía trên và được tháo ở cửa riêng.','Xỉ ở trên · Gang lỏng ở dưới']
 ];
 const thermiteStages=[
  ['Nhận diện chất ban đầu','Nhôm là chất khử. Iron(III) oxide cung cấp sắt cho phản ứng.','Al + Fe₂O₃'],
  ['Phản ứng tỏa nhiệt','Sau khi được mồi, phản ứng giải phóng nhiệt mạnh. Nhôm bị oxi hóa và ion sắt trong oxide bị khử.','2Al + Fe₂O₃ → Al₂O₃ + 2Fe'],
  ['Quan sát sản phẩm','Sắt tạo thành có thể nóng chảy do nhiệt phản ứng. Aluminium oxide là sản phẩm còn lại.','Sắt · Aluminium oxide']
 ];
 const acidStages=[
   ['Oxi hóa sulfur dioxide','SO₂ đi qua vùng xúc tác. Oxygen tham gia tạo sulfur trioxide.','2SO₂ + O₂ ⇌ 2SO₃'],
   ['Hấp thụ sulfur trioxide','SO₃ được hấp thụ vào sulfuric acid trong tháp để tạo oleum.','SO₃ + H₂SO₄ → H₂S₂O₇'],
   ['Pha loãng oleum','Oleum được chuyển sang công đoạn pha loãng để tạo sulfuric acid.','H₂S₂O₇ + H₂O → 2H₂SO₄']
 ];
 const stages=()=>{
   const stage=$('lab-stage');
   return stage.dataset.variant==='acid-contact'?acidStages:stage.dataset.apparatus==='thermite'?thermiteStages:ironStages;
 };
 function enteredAmounts(){
   return balanced.all.slice(0,balanced.split).map((_,i)=>({
     amount:$('lab-n-'+i).valueAsNumber,unit:$('lab-unit-'+i).value
   }));
 }
 const names={CuSO4:'Đồng(II) sulfate',NaOH:'Natri hydroxide',AgNO3:'Bạc nitrate',KI:'Kali iodide',Fe:'Sắt',Al:'Nhôm',HCl:'Axit hydrochloric',H2O2:'Hydrogen peroxide',CaCO3:'Calcium carbonate',CaO:'Vôi sống','Ca(OH)2':'Calcium hydroxide',KMnO4:'Kali permanganate',K2MnO4:'Kali manganate',MnO2:'Manganese dioxide','NaAl(OH)4':'Natri tetrahydroxoaluminate',FeSO4:'Sắt(II) sulfate',Cu:'Đồng',Ag:'Bạc',CuCl2:'Đồng(II) chloride','Cu(NO3)2':'Đồng(II) nitrate','Cu(OH)2':'Đồng(II) hydroxide',Na2SO4:'Natri sulfate',AgCl:'Bạc chloride',BaSO4:'Barium sulfate',CO2:'Carbon dioxide',H2:'Hydrogen',O2:'Oxygen',NH3:'Ammonia',H2O:'Nước',NaCl:'Natri chloride'};
 function named(formulaText){
   return names[formulaText]?names[formulaText]+' ('+formulaText+')':formulaText;
 }
 let labelFrame;
 function trackLabel(){
   cancelAnimationFrame(labelFrame);
   const stage=$('lab-stage'),label=$('lab-scene-label'),line=$('lab-label-line');
   if(label.hidden){line.hidden=true;return;}
   const anchor=stage.dataset.labelAnchor;
   const kind=stage.dataset.apparatus;
   const svg=stage.querySelector('svg');
   const marker=svg?.querySelector('[data-lab-anchor="'+anchor+'"]')||svg?.querySelector('[data-lab-anchor="vessel"]');
   const target=anchor==='sample'?$('lab-metal-sample'):anchor==='deposit'?$('deposit'):
     (kind==='dropper'||kind==='tongs')&&anchor==='vessel'?$('liquid'):marker||$('liquid');
   const box=stage.getBoundingClientRect(),point=target.getBoundingClientRect();
   if(box.width&&point.width){
     const x=point.left+point.width/2-box.left,y=point.top+point.height/2-box.top;
     const right=x<box.width*.52;
     const left=Math.max(8,Math.min(box.width-label.offsetWidth-8,right?x+35:x-label.offsetWidth-35));
     const top=Math.max(8,Math.min(box.height-label.offsetHeight-34,y-label.offsetHeight-12));
     label.style.left=left+'px';label.style.top=top+'px';
     const endX=right?left:left+label.offsetWidth,endY=top+label.offsetHeight/2;
     line.hidden=false;
     line.style.left=x+'px';line.style.top=y+'px';
     line.style.width=Math.hypot(endX-x,endY-y)+'px';
     line.style.transform='rotate('+Math.atan2(endY-y,endX-x)+'rad)';
   }
   labelFrame=requestAnimationFrame(trackLabel);
 }
 let dosingTimer;
 let ironStep=-1;
 function sceneLabel(title,description,anchor='vessel'){
   const stage=$('lab-stage');
   stage.dataset.labelAnchor=anchor;
   const label=$('lab-scene-label');
   label.hidden=false;
   label.innerHTML='<b>'+esc(title)+'</b><span>'+esc(description)+'</span>';
   trackLabel();
 }
 function runIronStep(){
   progress(2);
   const steps=stages();
   const [title,description,equation]=steps[ironStep];
   const stage=$('lab-stage');
   stage.dataset.state='process';
   stage.dataset.ironStep=String(ironStep);
   sceneLabel((ironStep+1)+' / '+steps.length+' · '+title,equation,stage.dataset.variant==='acid-contact'?'step'+ironStep:['charge','air','reduction','slag','outlet'][ironStep]);
   $('lab-phase').textContent=description;
   dosingTimer=schedule(()=>{
     if(ironStep===steps.length-1){showReaction();return;}
     ironStep++;
     runIronStep();
   },4200);
 }

 function annotate(reacted=false){
 const reactants=balanced.all.slice(0,balanced.split);
 const products=balanced.all.slice(balanced.split);
 $('lab-materials').innerHTML='<b>Chất ban đầu</b><span>'+reactants.map(formula).join(' + ')+'</span>'
   +(reacted?'<b>Sản phẩm</b><span>'+products.map(p=>esc(named(p))).join(' + ')+'</span><b>Hiện tượng</b><span>'+esc(selected.observation)+'</span>':'');
 }
 function reset(){
 annotate();
 clearTimeout(dosingTimer);
 pendingStep=null;paused=false;stageNode.dataset.paused='false';
 pauseButton.disabled=true;pauseButton.textContent='Tạm dừng';pauseButton.setAttribute('aria-pressed','false');
 cancelAnimationFrame(labelFrame);
 $('lab-label-line').hidden=true;
 runQuantity=null;
 domainNotice(labDomain(balanced,{rows:balanced.all.map((formula,i)=>({formula,initial:i<balanced.split?0:null,remaining:i<balanced.split?0:null,product:i<balanced.split?null:0}))}));
 $('lab-run-summary').hidden=true;
 $('lab-run-summary').replaceChildren();
 progress(0);
 ironStep=-1;

 $('lab-scene-label').hidden=true;
 delete $('lab-stage').dataset.ironStep;
 delete $('lab-stage').dataset.gasOutput;
 $('react').disabled=false;
 const [apparatus,equipment]=apparatusFor(selected,balanced.all.slice(0,balanced.split));
 const kind=selected.equation==='Fe2O3 + CO -> Fe + CO2'?'blast':apparatus;
 $('lab-stage').dataset.apparatus=kind;
 const variant=selected.name==='Điện phân để sản xuất nhôm'?'aluminium':selected.name==='Tạo chlorine từ nước muối'?'brine':selected.name==='Tạo nước Javel'?'javel':selected.name==='CaCO3 nung nóng'?'lime-kiln':selected.name==='Sản xuất sulfuric acid'?'acid-contact':selected.equation.startsWith('H2 + O2')?'hydrogen-burn':'';
 $('lab-stage').dataset.variant=variant;
 $('lab-stage').classList.toggle('lab-permanganate',balanced.all[0]==='KMnO4');
 $('lab-stage').classList.toggle('lab-limestone',balanced.all[0]==='CaCO3'&&balanced.all[1]==='HCl');
 $('lab-stage').classList.toggle('lab-copper-hydroxide',balanced.all[0]==='Cu(OH)2'&&kind==='dry');
 $('lab-apparatus').innerHTML=labScene(kind,variant);
 $('lab-stage').style.removeProperty('--lab-remaining');

 $('lab-stage').classList.toggle('lab-magnesium',selected.equation==='Mg + O2 -> MgO');
 $('lab-stage').style.setProperty('--lab-inlet-start',selected.equation.startsWith('CaCO3 + CO2')?'#e6eef0':'url(#lab-liquid)');
 $('lab-stage').style.setProperty('--lab-solid',balanced.all[0]==='KMnO4'?'#7744a7':balanced.all[0]==='Cu(OH)2'?'#48b9f0':'#c3cdd1');
$('lab-stage').dataset.state='ready';$('lab-stage').dataset.effect='none';$('liquid').style.setProperty('--liquid-color',balanced.all.slice(0,balanced.split).some(p=>/^Cu(?:SO4|Cl2|\(NO3\)2)$/.test(p))?'#55b8e9':'#d1eff9');$('deposit').style.setProperty('--precipitate-color','transparent');$('bubbles').innerHTML='';$('lab-phase').textContent='Sẵn sàng';$('result').classList.remove('error');$('result').innerHTML='<h3>'+esc(selected.name)+'</h3><p><b>Điều kiện:</b> '+esc(selected.condition)+'</p><p><b>Dụng cụ:</b> '+esc(equipment)+'</p><div class="formula">'+formula(balanced.text)+'</div><p>Bấm Cho phản ứng để xem hiện tượng.</p>';}
 const productsById=new Map(labReactions.map(r=>{
   const equation=balanceEquation(r.equation);
   return [r.id,equation.all.slice(equation.split)];
 }));
 function loadProducts(){
   const groups=preparationGroups[$('lab-group').value];
   const products=groups||Object.assign({},...Object.values(preparationGroups));
   $('lab-product').innerHTML='<option value="">Tất cả</option>'+Object.entries(products).map(([formula,name])=>'<option value="'+esc(formula)+'">'+esc(name+' · '+formula)+'</option>').join('');
 }
 loadProducts();
 $('lab-group').onchange=()=>{loadProducts();filter();};
 $('lab-product').onchange=()=>filter();
 function matchesTopic(reaction){
   const topic=$('lab-topic').value;
   const equation=reaction.equation;
   switch(topic){
     case 'Sắt':return /Fe/.test(equation);
     case 'Nhôm':return /Al/.test(equation);
     case 'Halogen':return /(?:^|[ +])(?:Cl2|Br2|I2|Ag(?:Cl|Br|I))(?=$|[ +])/.test(equation);
     case 'Hữu cơ':return /CH3CHO|C6H7N|CH3NH2|C57H110O6|CH3COO|C2H[456]O|C4H8O2|CH4|C6H12O6|C2H4/.test(equation);
     case 'Điện phân':return ['cell','molten'].includes(reaction.apparatus);
     default:return true;
   }
 }
 $('lab-topic').onchange=()=>filter();
 function filter(preferred){
   reset();lastQuantity=null;
   const q=normalize($('lab-search').value),type=$('lab-type').value,only=$('lab-favorites').checked;
   const group=preparationGroups[$('lab-group').value],product=$('lab-product').value;
   const visible=labReactions.filter(r=>matchesTopic(r)&&(!group||productsById.get(r.id).some(p=>Object.hasOwn(group,p)))&&(!product||productsById.get(r.id).includes(product))&&(!type||r.type===type)&&(!only||favorites.includes(r.id))&&normalize(r.name+' '+r.equation+' '+r.observation).includes(q));
   $('lab-count').textContent=visible.length+' / '+labReactions.length+' mục';
   $('experiment').innerHTML=visible.map(r=>'<option value="'+r.id+'">'+esc(r.name)+'</option>').join('');
   for(const id of ['experiment','react','lab-favorite','restart','lab-quantitative','lab-report','lab-stoich','lab-speed','lab-view-left','lab-view-center','lab-view-right'])$(id).disabled=!visible.length;
   $('lab-domain').hidden=!visible.length;
   if(!visible.length){
     $('result').classList.remove('error');
     $('result').textContent='Không có thí nghiệm phù hợp. Xóa từ khóa hoặc giảm bộ lọc để chọn lại.';
     $('lab-quantity-result').classList.remove('error');
     $('lab-quantity-result').textContent='Chọn một thí nghiệm để nhập và tính lượng chất.';
     $('lab-amounts').replaceChildren();
     stageNode.dataset.state='ready';stageNode.dataset.apparatus='empty';
     $('lab-apparatus').replaceChildren();$('lab-materials').replaceChildren();
     $('lab-phase').textContent='Không có mẫu phù hợp';return;
   }
   selected=visible.find(r=>r.id===preferred)||visible.find(r=>r.id===selected.id)||visible[0];
   $('experiment').value=selected.id;show();
 }
 $('lab-search').oninput=$('lab-type').onchange=$('lab-favorites').onchange=()=>filter();$('experiment').onchange=()=>{selected=labReactions.find(r=>r.id===$('experiment').value);show();};
 $('lab-favorite').onclick=()=>{favorites=favorites.includes(selected.id)?favorites.filter(id=>id!==selected.id):[...favorites,selected.id];try{localStorage.setItem('gdvn-lab-favorites',JSON.stringify(favorites));}catch{toast('Không lưu được mục yêu thích trên trình duyệt.');}filter(selected.id);};
 $('restart').onclick=reset;
 function showReaction(){
 if(!runQuantity)return;
 progress(3);
 lastQuantity=runQuantity;
 const summary=$('lab-run-summary');
 summary.hidden=false;
 summary.innerHTML='<h3>Kết quả theo lượng đã chạy</h3><p>Chất giới hạn: <b>'+runQuantity.limiting.map(i=>esc(balanced.all[i])).join(', ')+'</b></p>'+table(['Chất','Sản phẩm lý thuyết (mol)','Còn dư (mol)'],runQuantity.rows.map(r=>[esc(r.formula),r.product===null?'—':pretty(r.product),r.remaining===null?'—':pretty(r.remaining)]))+'<p class="muted">Tính theo phương trình và giả định phản ứng hoàn toàn. Lượng trên không dự đoán cân bằng, hiệu suất thực tế hay tốc độ phản ứng.</p>';
 const isLimestone=balanced.all[0]==='CaCO3'&&balanced.all[1]==='HCl';
 let limestoneNote='';
 let noLimestoneReaction=false;
 if(isLimestone){
   try{
     const inputs=balanced.all.slice(0,balanced.split).map((_,i)=>({amount:$('lab-n-'+i).valueAsNumber,unit:$('lab-unit-'+i).value}));
     const calculation=limitingReagent(balanced,inputs);
     const {initial,remaining}=calculation.rows[0];
     const fraction=initial>0?Math.max(0,Math.min(1,remaining/initial)):0;
     $('lab-stage').style.setProperty('--lab-remaining',fraction);
     limestoneNote=initial===0?'Không có đá vôi ban đầu.':fraction<1e-9?'Theo lượng đã nhập, HCl đủ để đá vôi phản ứng hết.':'Theo lượng đã nhập, đá vôi còn dư '+pretty(remaining)+' mol.';
     if(!calculation.rows[0].consumed){noLimestoneReaction=true;limestoneNote+=' Không có CO₂ sinh ra với lượng đã nhập.';}
   }catch{limestoneNote='Đá vôi chỉ phản ứng hết nếu đủ HCl. Nhập lượng hợp lệ để xác định chất dư.';}
 }

 annotate(true);

 if($('lab-stage').dataset.apparatus==='oxygen')sceneLabel('O₂ trong bình thu','Khí oxygen đẩy nước xuống. Chất rắn còn trong ống nung.','receiver');
 else if($('lab-stage').dataset.apparatus==='ammonia')sceneLabel('NH₃ thoát ra','Quỳ đỏ ẩm chuyển xanh.','tool');
 else if(selected.name==='CaCO3 nung nóng')sceneLabel('CaO rắn trong lò','CO₂ thoát theo đường ống phía trên.','vessel');
 else if($('lab-stage').dataset.apparatus==='thermite')sceneLabel('Sắt và aluminium oxide','Phản ứng nhiệt nhôm tỏa nhiệt mạnh.','vessel');
 else if($('lab-stage').dataset.variant==='aluminium')sceneLabel('Nhôm lỏng','Tích tụ ở đáy bể, dưới lớp điện ly.','bottom');
 else if($('lab-stage').dataset.variant==='brine')sceneLabel('Cl₂ ở anode (+)','H₂ thoát riêng ở cathode (−).','anode');
 else if($('lab-stage').dataset.variant==='acid-contact')sceneLabel('Dung dịch H₂SO₄','Sản phẩm ở sau công đoạn pha loãng oleum.','step2');
 else if($('lab-stage').dataset.variant==='hydrogen-burn')sceneLabel('Giọt nước ngưng tụ','Hơi nước gặp mặt kính nguội tạo giọt.','condensate');
 else if(ironStep>=0)sceneLabel('Kết quả lò cao','Thu gang lỏng và xỉ ở hai cửa riêng. Phương trình bên cạnh chỉ mô tả bước khử oxide sắt.','outlet');
 else if(noLimestoneReaction)sceneLabel('Không sinh CO₂','Kiểm tra lượng đá vôi và HCl đã nhập.');
 else if(isLimestone)sceneLabel('CO₂ thoát ra',limestoneNote,'vessel');
 else {
   const stage=$('lab-stage');
   const products=balanced.all.slice(balanced.split);
   const effect=reactionEffect(selected,products,stage.dataset.apparatus);
   const anchor=effect==='precipitate'?'deposit':effect==='coating'?'sample':'vessel';
   sceneLabel(effect==='coating'?'Kim loại bám trên mẫu':'Sản phẩm và hiện tượng',effect==='coating'?named(products.find(p=>p==='Ag'||p==='Cu')):selected.observation,anchor);
 }
 const products=balanced.all.slice(balanced.split);
 const effect=noLimestoneReaction?'none':reactionEffect(selected,products,$('lab-stage').dataset.apparatus);
 $('lab-stage').dataset.gasOutput=effect==='gas'?'yes':'no';
 const liquid=$('liquid');
 const initialColor=liquid.style.getPropertyValue('--liquid-color');
 const finalColor=['none','neutral','dissolve'].includes(effect)?initialColor:selected.color;
 $('lab-metal-sample').style.setProperty('--sample-coating',selected.deposit||'#b46a43');
 pendingStep=null;
 dosingTimer=setTimeout(()=>{$('lab-scene-label').hidden=true;},4500);
 $('react').disabled=false;$('lab-stage').dataset.state='reacting';$('lab-stage').dataset.effect=effect;$('liquid').style.setProperty('--liquid-color',finalColor);$('deposit').style.setProperty('--precipitate-color',effect==='precipitate'?selected.deposit:'transparent');$('bubbles').innerHTML=effect==='gas'&&['tongs','dropper'].includes($('lab-stage').dataset.apparatus)?Array.from({length:14},(_,i)=>'<i style="--x:'+($('lab-stage').dataset.apparatus==='tongs'?38+(i*7)%25:(i*17)%85+7)+'%;--delay:'+(-i*.23)+'s;--size:'+(5+i%4*3)+'px;--duration:'+(1.7+i%5*.32)+'s"></i>').join(''):'';$('lab-phase').textContent='Đã thực hiện mô phỏng';$('result').innerHTML='<span class="pill">'+esc(selected.type)+'</span><div class="formula">'+formula(balanced.text)+'</div><p><b>Tạo thành:</b> '+(noLimestoneReaction?'Không có sản phẩm mới.':products.map(p=>esc(named(p))).join(' + '))+'</p><p><b>Hiện tượng:</b> '+esc(noLimestoneReaction?'Không có phản ứng với lượng đã nhập.':selected.observation)+(limestoneNote?' '+esc(limestoneNote):'')+'</p><p><b>Điều kiện:</b> '+esc(selected.condition)+'</p>';history.unshift({name:selected.name,equation:balanced.text,observation:selected.observation,time:new Date().toLocaleTimeString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'})});history=history.slice(0,10);$('lab-history').innerHTML=table(['Thời gian','Thí nghiệm','Hiện tượng'],history.map(r=>[r.time,esc(r.name),esc(r.observation)]));}
 $('react').onclick=()=>{
   reset();
   const stage=$('lab-stage');
   let amounts;
   try{
     amounts=checkDomain(limitingReagent(balanced,enteredAmounts()));
   }catch(error){
     $('result').textContent=error.message;
     $('lab-phase').textContent='Kiểm tra lượng chất ban đầu.';
     return;
   }
   if(!amounts.rows.some(row=>row.product>0)){
     progress(3);
     sceneLabel('Không có sản phẩm mới','Ít nhất một chất phản ứng có lượng bằng 0.');
     $('lab-phase').textContent='Không xảy ra phản ứng với lượng đã nhập.';
     $('result').innerHTML='<div class="formula">'+formula(balanced.text)+'</div><p><b>Tạo thành:</b> Không có sản phẩm mới.</p><p><b>Hiện tượng:</b> Không xảy ra phản ứng với lượng đã nhập.</p>';
     return;
   }
   runQuantity=amounts;
   pauseButton.disabled=false;
   progress(1);
   $('react').disabled=true;
   if(stage.dataset.variant==='acid-contact'||['blast','thermite'].includes(stage.dataset.apparatus)){ironStep=0;runIronStep();return;}
   stage.dataset.state='materials';
   const materials=balanced.all.slice(0,balanced.split).map(s=>names[s]?names[s]+' ('+s+')':s);
   sceneLabel(stage.dataset.apparatus==='dropper'?'Trong cốc':'Chất ban đầu',stage.dataset.apparatus==='dropper'?materials[0]:materials.join(' + '));
   $('lab-phase').textContent='Đang giới thiệu chất ban đầu…';
   dosingTimer=schedule(startDosing,3000);
 };
 function startDosing(){
   progress(2);
   const stage=$('lab-stage');
   stage.dataset.state='dosing';
   stage.dataset.gasOutput=reactionEffect(selected,balanced.all.slice(balanced.split),stage.dataset.apparatus)==='gas'?'yes':'no';
   if(selected.equation.startsWith('Al(OH)3 + NaOH'))stage.dataset.effect='dissolve';
   const [,equipment]=apparatusFor(selected,balanced.all.slice(0,balanced.split));
   const added=balanced.all[1];
   const dropper=stage.dataset.apparatus==='dropper'&&added;
   sceneLabel(dropper?'Đang nhỏ vào cốc':'Dụng cụ đang hoạt động',dropper?(names[added]?names[added]+' ('+added+')':added):equipment,'tool');
   $('lab-phase').textContent=stage.dataset.apparatus==='dropper'?'Đang nhỏ dung dịch…':'Đang mô phỏng thao tác…';
   const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
   dosingTimer=schedule(showReaction,reduced?180:2400);
 }
 $('lab-quantitative').onclick=()=>safe(()=>{const inputs=balanced.all.slice(0,balanced.split).map((_,i)=>{if(!$('lab-n-'+i).value.trim())throw Error('Nhập lượng của tất cả chất phản ứng.');return {amount:Number($('lab-n-'+i).value),unit:$('lab-unit-'+i).value};});const r=checkDomain(limitingReagent(balanced,inputs));lastQuantity=r;$('lab-quantity-result').innerHTML='<p>Chất giới hạn: <b>'+r.limiting.map(i=>esc(balanced.all[i])).join(', ')+'</b></p>'+table(['Chất','Ban đầu (mol)','Đã phản ứng (mol)','Dư (mol)','Sản phẩm (mol)'],r.rows.map(row=>[esc(row.formula),row.initial===null?'—':pretty(row.initial),row.consumed===null?'—':pretty(row.consumed),row.remaining===null?'—':pretty(row.remaining),row.product===null?'—':pretty(row.product)]))+'<p class="muted">Giả định phản ứng hoàn toàn theo phương trình. Không xét phản ứng phụ, độ tan hay cân bằng.</p>';},'lab-quantity-result');
 function invalidateAmounts(){lastQuantity=null;reset();$('lab-quantity-result').textContent='Dữ liệu đã đổi. Bấm tính lại.';$('lab-phase').textContent='Dữ kiện đã đổi. Bấm Cho phản ứng để chạy lại.';}
 $('lab-amounts').oninput=invalidateAmounts;
 $('lab-amounts').onchange=invalidateAmounts;
 const reagents=[...new Set(labReactions.flatMap(r=>balanceEquation(r.equation).all.slice(0,balanceEquation(r.equation).split)))].sort();for(const id of ['reagent-a','reagent-b'])$(id).innerHTML=reagents.map(s=>'<option>'+esc(s)+'</option>').join('');$('reagent-b').selectedIndex=1;
 const resetPair=()=>{mixed=null;$('mix-open').disabled=true;$('mix-result').textContent='Cặp chất đã đổi. Bấm Kiểm tra cặp chất.';};$('reagent-a').onchange=$('reagent-b').onchange=resetPair;
 $('mix').onclick=()=>{mixed=matchReaction($('reagent-a').value,$('reagent-b').value);$('mix-open').disabled=!mixed;$('mix-result').textContent=mixed?balanceEquation(mixed.equation).text+' · '+mixed.observation+' · '+mixed.condition:[ $('reagent-a').value, $('reagent-b').value ].sort().join('|')==='Ba(NO3)2|CH3COOH'?'Với dung dịch loãng, không dự kiến tạo kết tủa, khí hoặc phản ứng ion rút gọn khi trộn CH₃COOH và Ba(NO₃)₂. Axit acetic vẫn phân li một phần.':'Chưa có dữ liệu để kết luận cho cặp này. Có thể thử AgNO₃ và KI để quan sát kết tủa.';};
 $('mix-open').onclick=()=>{if(!mixed)return;$('lab-search').value='';$('lab-type').value='';$('lab-topic').value='';$('lab-group').value='';loadProducts();$('lab-favorites').checked=false;filter(mixed.id);$('react').click();};
 $('lab-report').onclick=()=>{
   let text='GDVN — GHI CHÉP THÍ NGHIỆM\n\n'+selected.name+'\n'+balanced.text+'\nĐiều kiện: '+selected.condition+'\nHiện tượng tham khảo: '+selected.observation+'\n';
   text+='\nLượng ban đầu đã nhập:\n'+enteredAmounts().map((r,i)=>balanced.all[i]+': '+(Number.isFinite(r.amount)?r.amount:'chưa hợp lệ')+' '+r.unit).join('\n');
   if(lastQuantity)text+='\n\nKết quả tỉ lượng — giả định phản ứng hoàn toàn theo một phương trình:\n'+lastQuantity.rows.map(r=>r.formula+': còn dư '+(r.remaining??'—')+' mol; sản phẩm '+(r.product??'—')+' mol').join('\n');
   else text+='\n\nChưa có kết quả định lượng hợp lệ cho dữ kiện hiện tại.';
   text+='\n\nPhạm vi: không xét đầy đủ cân bằng, độ tan, phản ứng phụ hoặc hiệu suất thực. Màu, bọt và thời gian trình diễn chỉ minh họa; không phải quy trình thực hành.\n';
   download('GDVN-thi-nghiem.txt',text);
 };filter();
 return ()=>{clearTimeout(dosingTimer);pendingStep=null;cancelAnimationFrame(labelFrame);};
}
export const labHandlers={lab};



