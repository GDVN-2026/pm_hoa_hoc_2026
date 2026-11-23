/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
const fs=require('node:fs'),assert=require('node:assert/strict');
const {Worker:NodeWorker}=require('node:worker_threads');
const {JSDOM,VirtualConsole}=require(process.env.GDVN_JSDOM||'jsdom');
const codeByURL=new Map(),errors=[];let objectID=0;
const vc=new VirtualConsole();vc.on('jsdomError',error=>errors.push(error.message));
const context=new Proxy({createRadialGradient:()=>({addColorStop(){}}),createLinearGradient:()=>({addColorStop(){}}),measureText:()=>({width:100})},{get:(target,key)=>key in target?target[key]:()=>{},set:(target,key,value)=>(target[key]=value,true)});
const bootstrap="const {parentPort}=require('node:worker_threads');globalThis.self=globalThis;self.postMessage=value=>parentPort.postMessage(value);parentPort.on('message',data=>self.onmessage({data}));";
const dom=new JSDOM(fs.readFileSync('dist/gdvn.html','utf8'),{
  pretendToBeVisual:true,runScripts:'dangerously',url:'http://127.0.0.1:8770/',virtualConsole:vc,
  beforeParse(w){
    w.scrollTo=()=>{};w.structuredClone=global.structuredClone;w.Blob=global.Blob;w.ResizeObserver=class{observe(){}disconnect(){}};
    w.HTMLCanvasElement.prototype.getContext=()=>context;
    w.URL.createObjectURL=blob=>{const id='blob:gdvn-'+(++objectID);codeByURL.set(id,blob);return id;};
    w.URL.revokeObjectURL=id=>codeByURL.delete(id);
    w.Worker=class{
      constructor(url){this.ready=codeByURL.get(url).text().then(code=>{if(this.dead)return;this.worker=new NodeWorker(bootstrap+code,{eval:true});this.worker.on('message',data=>this.onmessage?.({data}));this.worker.on('error',error=>{console.error('Worker detail:',error.message);this.onerror?.(error);});});}
      postMessage(data){this.ready.then(()=>{if(!this.dead)this.worker.postMessage(data);});}
      terminate(){this.dead=true;this.worker?.terminate();}
    };
  }
});
const w=dom.window,d=w.document;
function route(id){w.location.hash=id;w.dispatchEvent(new w.HashChangeEvent('hashchange'));}
async function until(check){const start=Date.now();while(!check()){if(Date.now()-start>14000)throw Error('UI result timeout');await new Promise(r=>setTimeout(r,30));}}
(async()=>{
  try{
    assert.equal(d.querySelectorAll('#navigation a').length,22);assert.equal(d.querySelectorAll('.nav-tool-icon svg').length,21);assert.equal(d.querySelector('.overview-link').textContent,'Tổng hợp');
    assert.equal(d.querySelectorAll('.nav-category').length,5);
    assert.equal(d.querySelectorAll('.topic-row').length,5);
    assert.equal(d.querySelectorAll('.tool-entry').length,21);
    d.querySelector('[data-home-group="Phản ứng và dung dịch"]').click();
    assert.equal(d.querySelectorAll('.topic-row').length,1);
    assert.equal(d.querySelectorAll('.tool-entry').length,4);
    d.getElementById('menu').click();assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'true');
    d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(d.getElementById('menu').getAttribute('aria-expanded'),'false');
    d.getElementById('search').value='khong-tim-thay-123';d.getElementById('search').dispatchEvent(new w.Event('input'));assert.ok(d.getElementById('content').textContent.includes('Không tìm thấy'));
    d.getElementById('search').value='';
    d.getElementById('presentation-toggle').click();assert.ok(d.body.classList.contains('presenting'));d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(d.body.classList.contains('presenting'),false);
    for(const [query,expected] of [['halogen','periodic'],['do tan','solution'],['pH','solution']]){
      d.getElementById('search').value=query;
      d.getElementById('search').dispatchEvent(new w.Event('input'));
      assert.ok(d.querySelector('.tool-entry[href="#'+expected+'"]'));
      if(query==='pH')assert.ok(!d.querySelector('.tool-entry[href="#molecule"]'));
    }
    d.getElementById('search').value='lop 6';
    d.getElementById('search').dispatchEvent(new w.Event('input'));
    const topicLinks=[...d.querySelectorAll('.knowledge-matches a')];
    assert.ok(topicLinks.length>0);
    assert.ok(topicLinks.every(link=>link.hash.includes('grade=6')));
    d.getElementById('search').value='';
    route('periodic?grade=7');await new Promise(r=>setTimeout(r,0));
    assert.ok(d.querySelector('#content a[href="#knowledge?grade=7"]'));
    assert.equal(d.querySelectorAll('.periodic button[data-z]:not(.dim)').length,20);
    route('solution?grade=8');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.getElementById('titrate').closest('.panel').hidden,true);
    d.getElementById('basic-cm').click();assert.match(d.getElementById('basic-cm-result').textContent,/0,4 mol/);
    d.getElementById('basic-prepare').click();assert.match(d.getElementById('basic-cm-result').textContent,/30 g.*170 g/);
    const phInput=d.getElementById('basic-ph');phInput.value='11';phInput.dispatchEvent(new w.Event('input'));
    assert.match(d.getElementById('basic-ph-result').textContent,/base.*xanh/);
    d.getElementById('solution-grade11').click();assert.equal(d.getElementById('titrate').closest('.panel').hidden,false);
    route('equation');await new Promise(r=>setTimeout(r,0));
    d.getElementById('mass-formula').value='Tc';d.getElementById('mass-button').click();
    assert.ok(d.querySelector('.mass-reference-note').textContent.includes('Tc [97]'));
    route('knowledge?grade=7');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.getElementById('grade').value,'7');
    for(const grade of ['6','7','8','9','10','11','12']){
      const filter=d.getElementById('grade');filter.value=grade;filter.dispatchEvent(new w.Event('change'));
      const items=[...d.querySelectorAll('#terms > details > summary')];
      assert.ok(items.length>0);assert.ok(items.every(item=>item.textContent.endsWith('Lớp '+grade)));
    }
    route('periodic');await new Promise(r=>setTimeout(r,0));
    assert.ok(d.querySelector('.tool-guide').textContent.includes('Li, Na, K'));
    route('separation');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.getElementById('method').options.length,8);
    assert.equal(d.getElementById('separation-task'),null);
    assert.ok(d.querySelector('a[href="#studio"]'));
    route('lessons');await new Promise(r=>setTimeout(r,0));
    const pilotSelect=d.getElementById('lesson-select');
    assert.equal(pilotSelect.options.length,18);
    for(const option of [...pilotSelect.options]){
      pilotSelect.value=option.value;pilotSelect.dispatchEvent(new w.Event('change'));
      d.querySelector('[data-lesson-step="1"]').click();
      assert.doesNotMatch(d.querySelector('#lesson-view article').textContent,/Câu kiểm tra|Tự kiểm tra|thang điểm/);
      w.dispatchEvent(new w.Event('beforeprint'));
      assert.match(d.querySelector('.lesson-print-sheet').textContent,/Minh họa/);
      assert.doesNotMatch(d.querySelector('.lesson-print-sheet').textContent,/Câu kiểm tra|Đáp án/);
    }
    route('solution');await new Promise(r=>setTimeout(r,0));
    d.getElementById('mass-concentration').click();
    assert.equal(d.getElementById('mass-concentration-result').textContent,'C% = 10%');
    d.getElementById('mass-concentration-kind').value='solubility';d.getElementById('mass-concentration').click();
    assert.match(d.getElementById('mass-concentration-result').textContent,/11,111/);
    route('equation');await new Promise(r=>setTimeout(r,0));
    d.getElementById('formula-valence').click();assert.match(d.getElementById('formula-result').textContent,/Fe2\(SO4\)3/);
    d.getElementById('formula-composition').click();assert.match(d.getElementById('formula-result').textContent,/C6H12O6/);
    route('thermo');await new Promise(r=>setTimeout(r,0));
    for(const [value,expected] of [[1,'Chiều thuận'],[2,'Cân bằng'],[3,'Chiều nghịch']]){
      d.getElementById('qc-c2').value=value;d.getElementById('qc-run').click();
      assert.ok(d.getElementById('qc-result').textContent.includes(expected));
    }
    route('bond');await new Promise(r=>setTimeout(r,0));
    for(const [model,bonds,lone] of [['NH3',[1,1,1],[1,0,0,0]],['CO2',[2,2],[0,2,2]]]){
      const select=d.getElementById('lewis-model');select.value=model;select.dispatchEvent(new w.Event('change'));
      bonds.forEach((value,i)=>d.getElementById('lewis-b'+(i+1)).value=value);
      lone.forEach((value,i)=>d.getElementById('lewis-l'+i).value=value);
      d.getElementById('lewis-l0').dispatchEvent(new w.Event('input',{bubbles:true}));
      assert.match(d.getElementById('lewis-result').textContent,/Đạt octet/);
    }
    route('solution?grade=11');await new Promise(r=>setTimeout(r,0));
    const endpoint=d.getElementById('indicator-endpoint');
    assert.match(endpoint.textContent,/8,1/);
    const indicator=d.getElementById('indicator-kind');
    indicator.value='mo';indicator.dispatchEvent(new w.Event('change'));
    assert.match(endpoint.textContent,/3,75/);
    route('lessons');await new Promise(r=>setTimeout(r,0));
    const lesson=d.getElementById('lesson-select');lesson.value='pilot-01';lesson.dispatchEvent(new w.Event('change'));
    d.querySelector('[data-lesson-step="2"]').click();
    assert.match(d.querySelector('#lesson-view table caption').textContent,/Dữ liệu giả định/);
    route('knowledge?grade=11');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.querySelectorAll('[data-topic-answer],[data-metal-series],[data-npk]').length,0);
    for(const removed of ['quiz','practice','tutor']){
      route(removed);await new Promise(r=>setTimeout(r,0));
      assert.equal(d.body.dataset.page,'home');
      assert.equal(d.querySelector('[data-route="'+removed+'"]'),null);
    }
    route('reference');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.querySelectorAll('#ion-reference tbody tr').length,8);
    d.getElementById('ion-search').value='ket tua trang';d.getElementById('ion-search').dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('#ion-reference tbody tr').length,2);
    d.getElementById('crystal-choice').value='2';d.getElementById('crystal-choice').dispatchEvent(new w.Event('change'));assert.ok(d.getElementById('crystal-info').textContent.includes('sáu cạnh'));
    assert.equal(d.querySelectorAll('[data-reference-smiles]').length,8);

    route('board');await new Promise(r=>setTimeout(r,0));
    const board=d.getElementById('board');
    assert.equal(board.tabIndex,0);
    assert.equal(d.getElementById('board-import'),null);
    assert.equal(d.getElementById('board-backup'),null);
    assert.equal(d.getElementById('board-svg'),null);
    const hand=d.getElementById('board-hand');
    hand.click();assert.equal(hand.getAttribute('aria-pressed'),'true');
    hand.click();assert.equal(hand.getAttribute('aria-pressed'),'false');
    route('periodic?path=matter');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.querySelectorAll('.journey-guide nav a').length,4);
    d.getElementById('journey-complete').click();assert.ok(JSON.parse(w.localStorage.getItem('gdvn-journey-progress-v1')).matter.includes('periodic'));
    assert.equal(d.querySelector('.journey-next').getAttribute('href'),'#config?path=matter');
    route('home');await new Promise(r=>setTimeout(r,0));assert.equal(d.querySelector('.home-journeys a').getAttribute('href'),'#config?path=matter');
    route('studio');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.querySelectorAll('[data-apparatus]').length,34);
    d.getElementById('studio-clear').click();d.querySelector('[data-apparatus="beaker"]').click();assert.equal(d.querySelectorAll('#studio-scene [data-object]').length,1);
    d.getElementById('studio-scale').value='150';d.getElementById('studio-angle').value='45';d.getElementById('studio-update').click();assert.ok(d.querySelector('#studio-scene [data-object]').getAttribute('transform').includes('rotate(45) scale(1.5'));
    d.getElementById('studio-duplicate').click();assert.equal(d.querySelectorAll('#studio-scene [data-object]').length,2);
    d.getElementById('studio-undo').click();assert.equal(d.querySelectorAll('#studio-scene [data-object]').length,1);
    d.getElementById('studio-redo').click();assert.equal(d.querySelectorAll('#studio-scene [data-object]').length,2);
    d.getElementById('studio-template').value='titration';d.getElementById('studio-apply').click();assert.equal(d.querySelectorAll('#studio-scene [data-object]').length,5);
    route('home');await new Promise(r=>setTimeout(r,0));route('studio');await new Promise(r=>setTimeout(r,0));assert.equal(d.querySelectorAll('#studio-scene [data-object]').length,5);
    route('lab');await new Promise(r=>setTimeout(r,0));assert.equal(d.getElementById('experiment').options.length,140);assert.equal(d.getElementById('lab-stage').dataset.view,'2d');assert.equal(d.getElementById('lab-mode-3d'),null);
    d.getElementById('lab-product').value='Al';d.getElementById('lab-product').dispatchEvent(new w.Event('change'));assert.equal(d.getElementById('lab-stage').dataset.apparatus,'molten');assert.ok(d.getElementById('result').textContent.includes('Hall–Héroult'));
    d.getElementById('lab-product').value='';d.getElementById('lab-product').dispatchEvent(new w.Event('change'));d.getElementById('experiment').selectedIndex=0;d.getElementById('experiment').dispatchEvent(new w.Event('change'));
    d.getElementById('react').click();assert.equal(d.getElementById('lab-stage').dataset.state,'materials');assert.ok(d.getElementById('lab-scene-label').textContent.includes('Trong cốc'));await until(()=>d.getElementById('lab-stage').dataset.state==='dosing');assert.equal(d.getElementById('lab-stage').dataset.effect,'none');await until(()=>d.getElementById('lab-stage').dataset.state==='reacting');assert.ok(d.getElementById('result').textContent.includes('Hiện tượng'));assert.equal(d.getElementById('lab-stage').dataset.state,'reacting');assert.equal(d.getElementById('lab-stage').dataset.effect,'precipitate');d.getElementById('restart').click();assert.equal(d.getElementById('lab-stage').dataset.state,'ready');
    d.getElementById('lab-quantitative').click();assert.ok(d.getElementById('lab-quantity-result').textContent.includes('Chất giới hạn'));
    d.getElementById('reagent-a').value='AgNO3';d.getElementById('reagent-a').dispatchEvent(new w.Event('change'));d.getElementById('reagent-b').value='KI';d.getElementById('mix').click();assert.ok(d.getElementById('mix-result').textContent.includes('AgI'));
    d.getElementById('lab-search').value='Luyện sắt từ oxide';d.getElementById('lab-search').dispatchEvent(new w.Event('input'));
    d.getElementById('react').click();
    assert.equal(d.getElementById('lab-stage').dataset.apparatus,'blast');
    for(let i=0;i<5;i++){await until(()=>d.getElementById('lab-stage').dataset.ironStep===String(i));}
    await until(()=>d.getElementById('lab-stage').dataset.state==='reacting');assert.ok(d.getElementById('lab-scene-label').textContent.includes('gang lỏng và xỉ'));
    d.getElementById('mix-open').click();await until(()=>d.getElementById('lab-stage').dataset.state==='reacting');assert.ok(d.getElementById('result').textContent.includes('AgI'));
    d.getElementById('lab-search').value='khong-co-123';d.getElementById('lab-search').dispatchEvent(new w.Event('input'));assert.equal(d.getElementById('react').disabled,true);
    route('structure');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.querySelectorAll('[data-symbol]').length,8);assert.equal(d.querySelectorAll('[data-mode]').length,3);
    d.getElementById('structure-clear').click();
    const canvas=d.getElementById('structure-canvas');canvas.getBoundingClientRect=()=>({left:0,top:0,width:1000,height:600});canvas.setPointerCapture=()=>{};
    function pointer(target,type,x,y){canvas['on'+type]?.({target,clientX:x,clientY:y,pointerId:1});}
    pointer(canvas,'pointerdown',300,300);pointer(canvas,'pointerup',300,300);assert.equal(d.querySelectorAll('#structure-canvas [data-atom]').length,1);
    pointer(d.querySelector('#structure-canvas [data-atom="0"]'),'pointerdown',300,300);pointer(canvas,'pointermove',385,300);pointer(canvas,'pointerup',385,300);assert.equal(d.querySelectorAll('#structure-canvas [data-atom]').length,2);assert.ok(d.getElementById('structure-result').textContent.includes('C2H6'));
    pointer(d.querySelector('#structure-canvas [data-bond="0"]'),'pointerdown',342,300);assert.ok(d.getElementById('structure-result').textContent.includes('C2H4'));
    d.getElementById('structure-undo').click();assert.ok(d.getElementById('structure-result').textContent.includes('C2H6'));
    d.getElementById('structure-template').value='ethanol';d.getElementById('structure-load-template').click();
    d.getElementById('structure-3d').click();await until(()=>w.location.hash==='#molecule');await until(()=>d.getElementById('generate-3d')&&!d.getElementById('generate-3d').disabled);assert.ok(d.getElementById('result').textContent.includes('C2H6O'));
    route('bond');await new Promise(r=>setTimeout(r,0));assert.equal(d.querySelectorAll('#bond-legend i').length,2);d.getElementById('geometry').value='3';d.getElementById('geometry').dispatchEvent(new w.Event('change'));assert.equal(d.querySelectorAll('#bond-legend i').length,4);
    route('complex');await new Promise(r=>setTimeout(r,0));assert.ok(d.getElementById('result').textContent.includes('Số phối trí'));
    route('periodic');await new Promise(r=>setTimeout(r,0));
    assert.equal(d.querySelectorAll('.periodic [data-z]').length,118);
    assert.equal(d.getElementById('pin-element'),null);assert.equal(d.getElementById('compare-elements'),null);
    d.querySelector('.periodic [data-z="8"]').click();assert.ok(d.getElementById('element-info').textContent.includes('Oxygen'));
    d.getElementById('family-filter').value='noble';d.getElementById('family-filter').dispatchEvent(new w.Event('input'));assert.equal(d.getElementById('element-count').textContent,'7 / 118 nguyên tố');
    route('config?z=26');await new Promise(r=>setTimeout(r,0));assert.equal(d.getElementById('element').value,'26');
    route('atom?z=1');await new Promise(r=>setTimeout(r,0));assert.ok(d.getElementById('result').textContent.includes('0 neutron'));
    d.getElementById('quantum-build').click();await until(()=>!d.getElementById('quantum-build').disabled);assert.ok(d.getElementById('quantum-result').textContent.includes('Nút xuyên tâm: 0'),d.getElementById('quantum-result').textContent);
    d.getElementById('quantum-type').value='3dxy';d.getElementById('quantum-type').dispatchEvent(new w.Event('input'));d.getElementById('quantum-build').click();await until(()=>!d.getElementById('quantum-build').disabled);assert.ok(d.getElementById('quantum-result').textContent.includes('Nút góc: 2'));
    d.getElementById('atom-mass').value='0';d.getElementById('update-atom').click();assert.ok(d.getElementById('result').classList.contains('error'));
    route('molecule');await new Promise(r=>setTimeout(r,0));
    d.getElementById('smiles-input').value='CCO';d.getElementById('generate-3d').click();
    await until(()=>!d.getElementById('generate-3d').disabled);
    assert.ok(d.getElementById('result').textContent.includes('C2H6O'),d.getElementById('result').textContent);
    assert.equal(d.getElementById('structure-2d').hidden,false);
    d.getElementById('show-hydrogen').click();d.getElementById('model-style').value='spacefill';d.getElementById('model-style').dispatchEvent(new w.Event('change'));
    d.getElementById('measure').click();assert.ok(d.getElementById('measure-result').textContent.includes('Å'));
    d.getElementById('smiles-input').value='invalid';d.getElementById('generate-3d').click();await until(()=>!d.getElementById('generate-3d').disabled);assert.ok(d.getElementById('result').classList.contains('error'));
    route('home');await new Promise(r=>setTimeout(r,0));
    assert.ok(d.getElementById('content').textContent.includes('Học theo lớp'));
    route('ionic');await new Promise(r=>setTimeout(r,0));route('lab');await new Promise(r=>setTimeout(r,0));d.getElementById('go-back').click();await until(()=>w.location.hash==='#ionic');await until(()=>d.body.dataset.page==='ionic');
    for(const link of d.querySelectorAll('#navigation a[data-route]')){
      const id=link.dataset.route;
      route(id);await new Promise(r=>setTimeout(r,0));
      assert.equal(d.body.dataset.page,id);
      assert.ok(d.querySelector('#content section'),id+' renders content');
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: reference lessons/presentation, built HTML, direct structure drawing/3D, studio editing/save, lab search/mixing/amounts, periodic filters, board controls, atomic orbitals, SMILES worker, 3D UI, display controls, measurement, invalid SMILES, stale data and navigation cleanup.');
  }finally{dom.window.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});



