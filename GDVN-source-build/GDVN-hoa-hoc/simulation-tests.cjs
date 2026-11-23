/** GDVN · Tác giả: Nguyễn Thanh Vy · Copyright © 2026.
 * Regression tests for simulation and 3D behavior; no visual-browser claims.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {JSDOM,VirtualConsole}=require(process.env.GDVN_JSDOM||'jsdom');
const {Worker:NodeWorker}=require('node:worker_threads');
const source=__dirname;
const out=process.env.GDVN_TEST_OUTPUT||path.join(__dirname,'outputs/testing/simulation-regression');fs.mkdirSync(out,{recursive:true});
const results=[];let dom,w,d;const errors=[],blobs=new Map();let objectId=0,draws=0;
async function test(id,fn){if(process.env.GDVN_FOCUS&&!new RegExp(process.env.GDVN_FOCUS).test(id))return;try{await fn();results.push({id,status:'PASS'});}catch(e){results.push({id,status:'FAIL',actual:e.message,stack:e.stack,evidence:{page:d?.body.dataset.page,result:d?.getElementById('result')?.textContent,measurement:d?.getElementById('measure-result')?.textContent,smiles:d?.getElementById('smiles-input')?.value,amount:d?.getElementById('lab-n-0')?.value,stage:d?.getElementById('lab-stage')?.dataset.state}});}fs.writeFileSync(path.join(out,process.env.GDVN_FOCUS?'focused-results.json':'deep-results.json'),JSON.stringify({time:new Date().toISOString(),node:process.version,results,errors},null,2));}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn){const start=Date.now();while(!fn()){if(Date.now()-start>16000)throw Error('Timed out');await wait(5);}}
async function route(id){w.location.hash=id;w.dispatchEvent(new w.HashChangeEvent('hashchange'));await wait(0);}
const $=id=>d.getElementById(id);
// Native select interaction emits input followed by change; include both.
const change=(id,value)=>{$(id).value=value;$(id).dispatchEvent(new w.Event('input',{bubbles:true}));$(id).dispatchEvent(new w.Event('change',{bubbles:true}));};
const input=(id,value)=>{$(id).value=value;$(id).dispatchEvent(new w.Event('input',{bubbles:true}));};
async function main(){
 const {build}=require(process.env.GDVN_ESBUILD||'esbuild');
 const bundle=(await build({entryPoints:[path.join(source,'app.js')],bundle:true,minify:true,format:'iife',target:'es2020',write:false})).outputFiles[0].text;
 let html=fs.readFileSync(path.join(source,'index.html'),'utf8').replace(/<script type="module" src="app.js"><\/script>/,'');
 html=html.replace('</body>',()=>'<script>'+bundle.replace(/<\/script/gi,'<\\/script')+'</script></body>');
 fs.writeFileSync(path.join(out,'source-test.html'),html);
 const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const context=new Proxy({createRadialGradient:()=>({addColorStop(){}}),createLinearGradient:()=>({addColorStop(){}}),measureText:()=>({width:100})},{get:(o,k)=>k in o?o[k]:(...args)=>{if(k==='fillRect')draws++;},set:(o,k,v)=>(o[k]=v,true)});
 const bootstrap="const {parentPort}=require('node:worker_threads');globalThis.self=globalThis;self.postMessage=value=>parentPort.postMessage(value);parentPort.on('message',data=>self.onmessage({data}));";
 dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'http://127.0.0.1:8771/',virtualConsole:vc,beforeParse(win){
  win.scrollTo=()=>{};win.structuredClone=global.structuredClone;win.Blob=global.Blob;win.ResizeObserver=class{observe(){}disconnect(){}};
  win.HTMLCanvasElement.prototype.getContext=()=>context;
  win.HTMLCanvasElement.prototype.getBoundingClientRect=()=>({left:0,top:0,width:800,height:500});
  win.HTMLCanvasElement.prototype.setPointerCapture=()=>{};
  win.URL.createObjectURL=blob=>{const id='blob:test-'+(++objectId);blobs.set(id,blob);return id;};win.URL.revokeObjectURL=id=>blobs.delete(id);
  win.HTMLAnchorElement.prototype.click=function(){};
  const timer=win.setTimeout.bind(win);win.setTimeout=(fn,ms,...args)=>timer(fn,!process.env.GDVN_FOCUS&&[3000,2400,4200,4500].includes(ms)?2:ms,...args);
  win.Worker=class{constructor(url){this.ready=blobs.get(url).text().then(code=>{if(this.dead)return;this.worker=new NodeWorker(bootstrap+code,{eval:true});this.worker.on('message',data=>this.onmessage?.({data}));this.worker.on('error',e=>this.onerror?.(e));});}postMessage(data){this.ready.then(()=>{if(!this.dead)this.worker.postMessage(data);});}terminate(){this.dead=true;this.worker?.terminate();}};
 }});w=dom.window;d=w.document;
 const {labReactions}=await import(pathToFileURL(path.join(source,'lab-data.js')));
 const {balanceEquation}=await import(pathToFileURL(path.join(source,'chemistry.js')));
 const {labDomain}=await import(pathToFileURL(path.join(source,'lab-domain.js')));
 const {limitingReagent}=await import(pathToFileURL(path.join(source,'stoichiometry.js')));
 const {molecules}=await import(pathToFileURL(path.join(source,'data.js')));
 await route('lab');
 await test('LAB-DEFAULT-IN-SCOPE-ALL',async()=>{
  for(const r of labReactions){
   change('experiment',r.id);
   const b=balanceEquation(r.equation);
   const inputs=Array.from({length:b.split},(_,i)=>({amount:$('lab-n-'+i).valueAsNumber,unit:'mol'}));
   assert.equal(labDomain(b,limitingReagent(b,inputs)).blocked,false,r.name);
  }
 });
 for(const r of labReactions)await test('LAB-ALL-'+r.id,async()=>{
  change('experiment',r.id);assert.equal($('lab-stage').dataset.state,'ready');
  assert.ok($('lab-apparatus').innerHTML.length>0,'Missing apparatus');
  const equation=balanceEquation(r.equation),scope=labDomain(equation,limitingReagent(equation,Array.from({length:equation.split},()=>({amount:1,unit:'mol'}))));
  for(let i=0;i<equation.split;i++)input('lab-n-'+i,'1');
  $('react').click();if(scope.blocked){assert.equal($('lab-stage').dataset.state,'ready');assert.equal($('lab-domain').dataset.blocked,'true');assert.ok($('result').textContent.includes(scope.message));return;}await until(()=>$('lab-stage').dataset.state==='reacting');
  assert.ok($('result').textContent.includes('Hiện tượng'));assert.ok(!$('result').textContent.includes('undefined'));
  const b=balanceEquation(r.equation);
  const specimens=Array.from($('lab-materials').querySelectorAll('[data-formula]'),node=>node.dataset.formula);
  assert.deepEqual(specimens,b.all);
  $('restart').click();assert.equal($('lab-stage').dataset.state,'ready');assert.equal($('lab-stage').dataset.effect,'none');
 });
 await test('LAB-ZERO-ALL',async()=>{for(const r of labReactions){change('experiment',r.id);input('lab-n-0','0');$('react').click();assert.equal($('lab-stage').dataset.state,'ready',r.name);assert.ok($('result').textContent.includes('Không có sản phẩm mới'),r.name);}});
 await test('LAB-INVALID-AMOUNTS',async()=>{change('experiment',labReactions[0].id);for(const v of ['-1','']){input('lab-n-0',v);$('react').click();assert.equal($('lab-stage').dataset.state,'ready');assert.notEqual($('lab-phase').textContent,'Đang giới thiệu chất ban đầu…');}});
 await test('LAB-RESET-CANCELS-TIMERS',async()=>{change('experiment',labReactions[0].id);$('react').click();$('restart').click();await wait(40);assert.equal($('lab-stage').dataset.state,'ready');});
 await test('LAB-FILTER-CANCELS-TIMERS',async()=>{$('react').click();input('lab-search','no-match-qa-xyz');await wait(40);assert.equal($('react').disabled,true);assert.equal($('lab-stage').dataset.apparatus,'empty');input('lab-search','');});
 await test('LAB-PAIR-CHANGE-INVALIDATES',async()=>{change('reagent-a','AgNO3');change('reagent-b','KI');$('mix').click();assert.equal($('mix-open').disabled,false);change('reagent-b','NaCl');assert.equal($('mix-open').disabled,true);});
 await test('REFERENCE-COLOUR-RESET',async()=>{await route('reference');for(const choice of ['starch','bleach']){const card=$('reference-'+choice),sample=card.querySelector('[data-reference-colour]'),button=card.querySelector('[data-colour-toggle]');button.click();assert.equal(sample.dataset.reacted,'true');button.click();assert.equal(sample.dataset.reacted,'false');}await route('lab');});
 await test('LAB-UNIT-CHANGE-INVALIDATES',async()=>{change('experiment',labReactions[0].id);$('lab-quantitative').click();assert.ok($('lab-quantity-result').textContent.includes('Chất giới hạn'));change('lab-unit-0','g');assert.ok($('lab-quantity-result').textContent.includes('Dữ liệu đã đổi'),'Old quantitative result retained after mol→g change');});
 await test('LAB-AMOUNT-CHANGE-INVALIDATES-SIMULATION',async()=>{change('experiment',labReactions[0].id);$('react').click();await until(()=>$('lab-stage').dataset.state==='reacting');input('lab-n-0','0');assert.notEqual($('lab-stage').dataset.state,'reacting','Old simulated reaction remains after zeroing reagent');});
 await test('LAB-EDIT-DURING-REACTION',async()=>{change('experiment',labReactions[0].id);$('react').click();input('lab-n-0','0');await wait(process.env.GDVN_FOCUS?5600:50);assert.notEqual($('lab-stage').dataset.state,'reacting','Reaction completed for stale positive amount while current input is zero');});
 await route('molecule');
 for(let i=0;i<molecules.length;i++)await test('MODEL-LIBRARY-'+i,async()=>{change('molecule',String(i));assert.ok($('result').textContent.includes(molecules[i].formula));$('measure').click();assert.ok($('measure-result').textContent.includes('Å'));});
 await test('MODEL-CONTROLS',async()=>{for(const style of ['ball-stick','spacefill','wireframe'])change('model-style',style);$('show-hydrogen').click();$('show-labels').click();$('molecule-colors').click();const n=draws;const c=$('model');c.onpointerdown({clientX:10,clientY:10,pointerId:1});c.onpointermove({clientX:60,clientY:35});c.onpointerup();c.onwheel({preventDefault(){},deltaY:-10000});c.onwheel({preventDefault(){},deltaY:10000});$('rotate').click();assert.equal($('rotate').textContent,'Dừng xoay');$('rotate').click();$('reset').click();assert.ok(draws>n);});
 for(const [smiles,formula]of [['CCO','C2H6O'],['c1ccccc1','C6H6'],['CC(=O)O','C2H4O2'],['N[C@@H](C)C(=O)O','C3H7NO2']])await test('MODEL-GENERATE-'+smiles,async()=>{input('smiles-input',smiles);$('generate-3d').click();await until(()=>!$('generate-3d').disabled);assert.ok($('result').textContent.includes(formula),$('result').textContent);assert.equal($('structure-2d').hidden,false);});
 await test('MODEL-INVALID-RECOVERS',async()=>{input('smiles-input','invalid');$('generate-3d').click();await until(()=>!$('generate-3d').disabled);assert.ok($('result').classList.contains('error'));input('smiles-input','O');$('generate-3d').click();await until(()=>!$('generate-3d').disabled);assert.ok($('result').textContent.includes('H2O'));});
 await test('MODEL-INPUT-CHANGE-IN-FLIGHT',async()=>{input('smiles-input','CCO');$('generate-3d').click();input('smiles-input','c1ccccc1');await until(()=>!$('generate-3d').disabled);assert.ok(!$('result').textContent.includes('C2H6O'),'Ethanol result appears while input now says benzene, without stale-result warning');});
 await test('MODEL-NAVIGATION-CANCELS-WORKER',async()=>{input('smiles-input','CCO');$('generate-3d').click();await route('lab');await wait(100);assert.equal(d.body.dataset.page,'lab');assert.equal($('model'),null);});
 await test('VSEPR-ALL',async()=>{await route('bond');const n=$('geometry').options.length;for(let i=0;i<n;i++){change('geometry',String(i));assert.ok($('result').textContent.includes('Góc'));assert.ok(d.querySelectorAll('#bond-legend i').length>=2);}});
 await test('COMPLEX-ALL',async()=>{await route('complex');for(let i=0;i<$('complex').options.length;i++){change('complex',String(i));assert.ok($('result').textContent.includes('Số phối trí'));}});
 await route('electrolysis');let supported=0,unsupported=0;
 for(let i=0;i<$('system').options.length;i++)for(let a=0;a<$('electro-anode').options.length;a++)await test('ELECTRO-'+i+'-'+a,async()=>{
  change('system',String(i));change('electro-anode',$('electro-anode').options[a].value);$('electro-reset').click();
  const disabled=$('electro-start').disabled;
  assert.equal($('electro-cell').dataset.running,'false');
  if(disabled){unsupported++;assert.ok($('electro-detail').textContent.includes('Chưa xác định'));}
  else{supported++;$('electro-start').click();assert.equal($('electro-cell').dataset.running,'true');assert.equal($('electro-start').disabled,true);$('electro-reset').click();assert.equal($('electro-cell').dataset.running,'false');}
 });
 results.push({id:'ELECTRO-COVERAGE',status:'INFO',supported,unsupported});
 await test('ELECTRO-VIEW',async()=>{$('electro-view-left').click();assert.equal($('electro-cell').style.getPropertyValue('--electro-angle'),'-15deg');$('electro-view-right').click();assert.equal($('electro-cell').style.getPropertyValue('--electro-angle'),'15deg');$('electro-view-center').click();assert.equal($('electro-cell').style.getPropertyValue('--electro-angle'),'0deg');});
 await route('lab');
 for(const r of labReactions)await test('LAB-QUANTITY-'+r.id,async()=>{change('experiment',r.id);for(const unit of ['mol','g']){for(const el of d.querySelectorAll('[id^="lab-unit-"]'))change(el.id,unit);for(const el of d.querySelectorAll('[id^="lab-n-"]'))input(el.id,'1');$('lab-quantitative').click();const text=$('lab-quantity-result').textContent,b=balanceEquation(r.equation),scope=labDomain(b,limitingReagent(b,Array.from({length:b.split},()=>({amount:1,unit}))));assert.ok(text.includes(scope.blocked?'Ngoài phạm vi mô hình':'Chất giới hạn'),text);assert.ok(!/\b(?:NaN|Infinity|undefined)\b/.test(text),text);}});
 await test('LAB-NEW-PROGRESS-SNAPSHOT',async()=>{change('experiment',labReactions[0].id);$('lab-stoich').click();assert.equal($('lab-n-0').value,'1');assert.equal($('lab-n-1').value,'2');assert.equal($('lab-progress').querySelector('[aria-current="step"]').textContent,'Chuẩn bị');$('react').click();await until(()=>$('lab-stage').dataset.state==='reacting');assert.equal($('lab-progress').querySelector('[aria-current="step"]').textContent,'Kết quả');assert.equal($('lab-run-summary').hidden,false);assert.ok($('lab-run-summary').textContent.includes('Cu(OH)2'));input('lab-n-0','0');assert.equal($('lab-run-summary').hidden,true);assert.equal($('lab-stage').dataset.state,'ready');});
 await test('LAB-SPEED-INVALIDATES-RUN',async()=>{input('lab-n-0','1');$('react').click();change('lab-speed','2');await wait(30);assert.equal($('lab-stage').dataset.state,'ready');assert.equal($('lab-speed').value,'2');change('lab-speed','1');});
 await test('ELECTRO-CHANGE-REQUIRES-RESTART',async()=>{await route('electrolysis');change('system','0');change('electro-anode','');$('electro-start').click();assert.equal($('electro-cell').dataset.running,'true');change('system','1');assert.equal($('electro-cell').dataset.running,'false');assert.equal($('electro-start').disabled,false);});
 await test('MODEL-KEYBOARD-CONTROLS',async()=>{await route('molecule');const c=$('model'),before=draws;assert.equal(c.tabIndex,0);for(const key of ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','0'])c.dispatchEvent(new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));assert.ok(draws>=before+7);});
 await test('LAB-AMPHOTERIC-GATE-AND-RECOVERY',async()=>{await route('lab');const reaction=labReactions.find(r=>r.equation.startsWith('AlCl3 + NaOH'));assert.ok(reaction);change('experiment',reaction.id);input('lab-n-0','1');input('lab-n-1','4');$('react').click();assert.equal($('lab-stage').dataset.state,'ready');assert.equal($('lab-domain').dataset.blocked,'true');assert.ok($('result').textContent.includes('tan tiếp'));$('lab-quantitative').click();assert.ok($('lab-quantity-result').textContent.includes('Ngoài phạm vi'));$('lab-stoich').click();$('react').click();await until(()=>$('lab-stage').dataset.state==='reacting');assert.equal($('lab-domain').dataset.blocked,'false');});
 await test('SOLUTION-UI-MODEL-CONSISTENCY',async()=>{await route('solution');input('ka','0');$('ph').click();assert.ok($('result').textContent.includes('2'));assert.equal($('ka').disabled,true);change('acid-type','weak-acid');$('ph').click();assert.ok($('result').classList.contains('error'));input('ka','0.000018');$('ph').click();assert.equal($('result').classList.contains('error'),false);assert.equal($('titration-direction').value,'base');$('titrate').click();assert.ok($('titration-result').textContent.includes('V HCl'));change('titration-direction','acid');assert.equal($('curve').hidden,true);$('titrate').click();assert.ok($('titration-result').textContent.includes('V NaOH'));input('acid-v','0');assert.equal($('curve').hidden,true);$('titrate').click();assert.ok($('titration-result').classList.contains('error'));});
 await test('ELECTRO-ANODE-LABELS',async()=>{await route('electrolysis');change('system','1');assert.ok($('electro-anode').options[0].textContent.includes('Cu'));change('system','5');assert.ok($('electro-anode').options[0].textContent.includes('Carbon'));});
 await test('CURRICULUM-SCOPE-LABELS',async()=>{await route('bond');assert.ok(d.querySelector('.curriculum-context').textContent.includes('Chuyên đề 10.1'));await route('config');assert.ok(d.querySelector('.curriculum-context').textContent.includes('20 nguyên tố'));});
 await test('NERNST-AUTO-COEFFICIENTS',async()=>{await route('electro');change('electrode-a','1');change('electrode-b','8');$('cell').click();assert.equal($('electron-n').value,'6');assert.equal($('electron-n').readOnly,true);assert.ok($('result').textContent.includes('Q ='));change('electrode-a','8');change('electrode-b','9');$('cell').click();assert.equal($('electron-n').value,'2');input('quotient','1e100');assert.ok($('result').textContent.includes('Dữ kiện đã đổi'));$('cell').click();assert.ok($('result').textContent.includes('Chiều nghịch'));});
 await test('FARADAY-ZERO-AND-STALE',async()=>{await route('electrolysis');input('efficiency','0');$('faraday').click();assert.ok($('result').textContent.includes('m = 0 g'));$('thickness').click();assert.ok($('thickness-result').textContent.includes('= 0'));input('area','200');assert.ok($('thickness-result').textContent.includes('Dữ kiện đã đổi'));input('current','2');assert.ok($('result').textContent.includes('Dữ kiện đã đổi'));$('thickness').click();assert.ok($('thickness-result').classList.contains('error'));});
 await test('THERMO-MISSING-VALUE-REJECTED',async()=>{await route('thermo');assert.ok($('result').textContent.includes('890,3'));input('enthalpy-left','1,');$('enthalpy').click();assert.ok($('result').classList.contains('error'));input('enthalpy-left','1, 0');input('enthalpy-right','1, 0');$('enthalpy').click();assert.ok($('result').textContent.includes('= 0'));});
 await test('THERMO-LARGE-EQUILIBRIUM',async()=>{await route('thermo');input('kc','1e308');$('equilibrium').click();assert.ok(!/NaN|Infinity/.test($('eq-result').textContent));const rows=$('eq-result').querySelectorAll('tbody tr'),a=rows[2].children[1].textContent;assert.notEqual(a,'0');input('temp1','310');assert.ok($('rate-result').textContent.includes('Dữ kiện đã đổi'));});
 await test('LAB-EMPTY-FILTER-CLEARS-AND-RECOVERS',async()=>{
  await route('lab');$('lab-quantitative').click();assert.ok($('lab-quantity-result').textContent.includes('Chất giới hạn'));
  input('lab-search','no-match-round3-xyz');
  for(const id of ['experiment','lab-stoich','lab-speed','react','lab-report','lab-pause'])assert.equal($(id).disabled,true,id);
  assert.ok(!$('lab-quantity-result').textContent.includes('Chất giới hạn'));
  assert.equal($('lab-domain').hidden,true);$('lab-stoich').click();
  input('lab-search','');assert.equal($('lab-stoich').disabled,false);assert.equal($('lab-domain').hidden,false);
  $('lab-stoich').click();$('react').click();await until(()=>$('lab-stage').dataset.state==='reacting');
 });
 await test('LAB-PAUSE-RESUME-PRESERVES-STEP',async()=>{
  await route('lab');$('react').click();const state=$('lab-stage').dataset.state;
  $('lab-pause').click();assert.equal($('lab-pause').getAttribute('aria-pressed'),'true');
  await wait(80);assert.equal($('lab-stage').dataset.state,state);assert.equal($('lab-stage').dataset.paused,'true');
  $('lab-pause').click();await until(()=>$('lab-stage').dataset.state==='reacting');
  assert.equal($('lab-stage').dataset.paused,'false');
 });
 await test('LAB-PAUSE-RESET-CANCELS-RESUME',async()=>{
  await route('lab');$('react').click();$('lab-pause').click();$('restart').click();
  await wait(80);assert.equal($('lab-stage').dataset.state,'ready');assert.equal($('lab-pause').disabled,true);
  assert.equal($('lab-pause').getAttribute('aria-pressed'),'false');
  $('react').click();await until(()=>$('lab-stage').dataset.state==='reacting');
 });
 await test('LAB-PAUSE-INPUT-CANCELS-OLD-RUN',async()=>{
  await route('lab');$('react').click();$('lab-pause').click();input('lab-n-0','0');
  assert.equal($('lab-stage').dataset.paused,'false');assert.equal($('lab-pause').disabled,true);
  $('react').click();await wait(80);assert.equal($('lab-stage').dataset.state,'ready');
  assert.ok($('result').textContent.includes('Không có sản phẩm mới'));
 });
 await test('LAB-EXPORT-INPUTS-AND-MODEL-LIMITS',async()=>{
  await route('lab');input('lab-n-0','2');$('lab-quantitative').click();$('lab-report').click();
  let text=await [...blobs.values()].at(-1).text();assert.ok(text.includes('2 mol'));assert.ok(text.includes('giả định phản ứng hoàn toàn'));assert.ok(text.includes('thời gian trình diễn chỉ minh họa'));
  input('lab-n-0','3');$('lab-report').click();text=await [...blobs.values()].at(-1).text();
  assert.ok(text.includes('3 mol'));assert.ok(text.includes('Chưa có kết quả định lượng hợp lệ'));
 });
 await test('LAB-DIAGRAM-DEFAULT',async()=>{
  await route('lab');change('experiment',labReactions.find(r=>r.name==='CaCO3 nung nóng').id);
  assert.equal($('lab-stage').dataset.view,'2d');
  assert.equal($('lab-mode-3d'),null);assert.equal($('lab-3d'),null);
  assert.ok($('lab-stage').textContent.includes('Mô phỏng thí nghiệm'));
 });
 await test('LAB-PAUSE-RESET-AND-SCENE-SWAP',async()=>{
  await route('lab');change('experiment',labReactions.find(r=>r.name==='CaCO3 nung nóng').id);$('react').click();$('lab-pause').click();
  await wait(80);assert.equal($('lab-stage').dataset.paused,'true');$('restart').click();assert.equal($('lab-stage').dataset.state,'ready');
  change('experiment',labReactions[0].id);assert.ok($('lab-scene-title').textContent.includes(labReactions[0].name));
 });
 await test('LAB-SPECIALIZED-DIAGRAM-FALLBACK',async()=>{
  await route('lab');const r=labReactions.find(r=>r.equation==='Fe2O3 + CO -> Fe + CO2');assert.ok(r);change('experiment',r.id);
  assert.equal($('lab-stage').dataset.view,'2d');assert.equal($('lab-3d'),null);
  input('lab-search','no-match-renderer');assert.equal($('lab-stage').dataset.apparatus,'empty');input('lab-search','');
 });
 await test('LAB-DISPOSE-ON-NAVIGATION',async()=>{
  await route('lab');const old=$('lab-stage');await route('thermo');await wait(80);assert.equal(old.isConnected,false);assert.equal($('lab-3d'),null);
 });
 await test('NO-UNHANDLED-JSDOM-ERRORS',async()=>assert.deepEqual(errors,[]));
 if(results.some(r=>r.status==='FAIL'))process.exitCode=1;dom.window.close();console.log(JSON.stringify({passed:results.filter(r=>r.status==='PASS').length,failed:results.filter(r=>r.status==='FAIL'),output:path.join(out,'deep-results.json')},null,2));
}
main().catch(e=>{console.error(e);dom?.window.close();process.exitCode=1;});



