/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {molecules} from './data.js';
import {escapeHTML as esc,formatFormula as formula,molarMass,pretty} from './chemistry.js';
import {modelView,download} from './visuals.js';
import {$,set,panel,result,opt,table,safe,toast} from './modules.js';
import {engineClient} from './engine-client.js';
export function molecule(){
  set(panel('Phân tử 3D từ thư viện hoặc SMILES','<div class="row"><label>Thư viện phân tử<select id="molecule">'+opt(molecules.map(m=>m.name+' · '+m.formula))+'</select></label><label>SMILES mẫu<select id="smiles-example">'+opt(['Ethanol · CCO','Benzene · c1ccccc1','Axit acetic · CC(=O)O','Acetone · CC(=O)C','Glucose · OCC(O)C(O)C(O)C(O)C=O','Caffeine · Cn1c(=O)c2c(ncn2C)n(C)c1=O','Alanine · N[C@@H](C)C(=O)O'])+'</select></label></div><div class="row"><label class="grow">Nhập SMILES<input id="smiles-input" value="CCO" spellcheck="false" placeholder="Ví dụ CCO hoặc c1ccccc1"></label><button id="generate-3d" class="primary">Dựng mô hình 3D</button></div><div class="row"><label>Kiểu hiển thị<select id="model-style"><option value="ball-stick">Cầu và que</option><option value="spacefill">Lấp đầy không gian</option><option value="wireframe">Khung liên kết</option></select></label><label class="check"><input id="show-hydrogen" type="checkbox" checked> Hiện H</label><label class="check"><input id="show-labels" type="checkbox" checked> Nhãn nguyên tử</label><label class="check"><input id="molecule-colors" type="checkbox" checked> Tô màu liên kết</label><button id="rotate">Tự xoay</button><button id="reset">Đặt lại góc nhìn</button></div><canvas id="model" class="visual" aria-label="Phân tử 3D, kéo để xoay"></canvas><div id="molecule-legend" class="bond-legend"><span><i style="background:#4bd1ff"></i>Liên kết đơn</span><span><i style="background:#ff75aa"></i>Liên kết đôi</span><span><i style="background:#ffcf68"></i>Liên kết ba</span></div>'+result()+'<div class="row"><button id="save-model">Tải PNG</button></div><details id="structure-2d" hidden><summary>Cấu tạo 2D</summary><img id="structure-image" alt="Cấu tạo phân tử từ SMILES" style="width:100%;background:white;border-radius:10px"></details><p class="muted">Cấu dạng sinh từ SMILES là một hình học khả dĩ, chưa được tối ưu bằng tính toán lượng tử. Hỗ trợ tối đa 80 nguyên tử trước khi thêm H; một số muối, phức kim loại và cấu trúc đặc biệt có thể không dựng được.</p>')+panel('Đo hình học phân tử','<div class="row"><label>Nguyên tử A<select id="measure-a"></select></label><label>Nguyên tử B<select id="measure-b"></select></label><label>Nguyên tử C<select id="measure-c"></select></label><button id="measure">Đo khoảng cách & góc ABC</button></div>'+result('measure-result')+'<p class="muted">Khoảng cách theo Å và góc theo độ. Tọa độ trong thư viện có sẵn mang tính minh họa.</p>'));
  const client=engineClient();let current=molecules[0],disposed=false,request=0;
  const bondPalette={1:'#4bd1ff',2:'#ff75aa',3:'#ffcf68'};
  const atomPalette={C:'#72b8df',H:'#edf7ff',O:'#ff657d',N:'#739fff',S:'#ffd875',F:'#6de1ad',Cl:'#6de1ad',Br:'#e8a76d',P:'#ffb36b'};
  const tintModel=m=>({...m,bondColors:$('molecule-colors').checked?(m.bonds||[]).map(b=>bondPalette[b[2]]||'#4bd1ff'):undefined,atomColors:$('molecule-colors').checked?m.atoms.map(a=>atomPalette[a[0]]||'#c7a4fa'):undefined});
  const view=modelView($('model'),tintModel(current));
  function display(m,generated=false){
    current=m;view.setModel(tintModel(m));$('rotate').textContent='Tự xoay';
    const mass=m.mass??molarMass(m.formula);
    $('result').classList.remove('error');$('result').innerHTML='<div class="formula">'+formula(m.formula)+'</div><p>'+esc(m.name||m.smiles||'')+' · M = '+pretty(mass)+' g/mol · '+m.atoms.length+' nguyên tử trong mô hình</p>'+(m.shape?'<p>'+esc(m.shape)+'</p>':'');
    $('structure-2d').hidden=!generated;if(generated)$('structure-image').src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(m.svg);
    for(const id of ['measure-a','measure-b','measure-c'])$(id).innerHTML=opt(m.atoms.map((a,i)=>(i+1)+' · '+a[0]));
    $('measure-b').selectedIndex=Math.min(1,m.atoms.length-1);$('measure-c').selectedIndex=Math.min(2,m.atoms.length-1);$('measure-result').textContent='Chọn các nguyên tử để đo.';
  }
  $('molecule').onchange=()=>{request++;client.dispose();$('generate-3d').disabled=false;display(molecules[Number($('molecule').value)]);};
  function invalidateMolecule(){request++;client.dispose();$('generate-3d').disabled=false;$('result').classList.remove('error');$('result').textContent='SMILES đã đổi. Mô hình đang xem là kết quả trước; bấm Dựng mô hình 3D để cập nhật.';$('structure-2d').hidden=true;}
  $('smiles-input').oninput=invalidateMolecule;
  $('smiles-example').onchange=()=>{$('smiles-input').value=['CCO','c1ccccc1','CC(=O)O','CC(=O)C','OCC(O)C(O)C(O)C(O)C=O','Cn1c(=O)c2c(ncn2C)n(C)c1=O','N[C@@H](C)C(=O)O'][Number($('smiles-example').value)];invalidateMolecule();};
  async function generate(){
    const id=++request;const button=$('generate-3d');button.disabled=true;$('result').classList.remove('error');$('result').textContent='Đang dựng cấu dạng 3D…';
    try{const m=await client.run('smiles',{smiles:$('smiles-input').value,seed:42});if(!disposed&&id===request)display(m,true);}
    catch(error){if(!disposed&&id===request){$('result').classList.add('error');$('result').textContent=error.message;}}
    finally{if(!disposed&&id===request)button.disabled=false;}
  }
  $('generate-3d').onclick=generate;$('smiles-input').onkeydown=e=>{if(e.key==='Enter')generate();};
  const style=()=>view.setOptions({style:$('model-style').value,hydrogen:$('show-hydrogen').checked,labels:$('show-labels').checked});
  $('molecule-colors').onchange=()=>{view.setModel(tintModel(current));$('molecule-legend').hidden=!$('molecule-colors').checked;$('rotate').textContent='Tự xoay';};
  $('model-style').onchange=$('show-hydrogen').onchange=$('show-labels').onchange=style;
  $('rotate').onclick=()=>{$('rotate').textContent=view.toggle()?'Dừng xoay':'Tự xoay';};$('reset').onclick=view.reset;
  $('save-model').onclick=()=>$('model').toBlob(blob=>{if(blob)download('GDVN-phan-tu.png',blob);});
  $('measure').onclick=()=>safe(()=>{
    const ids=['measure-a','measure-b','measure-c'].map(id=>Number($(id).value));if(ids[0]===ids[1])throw Error('Chọn A và B là hai nguyên tử khác nhau.');
    const [a,b,c]=ids.map(i=>current.atoms[i].slice(1)),u=a.map((x,i)=>x-b[i]),v=c.map((x,i)=>x-b[i]);
    const ab=Math.hypot(...u),bc=Math.hypot(...v);if(ab<1e-9)throw Error('Không đo được khoảng cách với các điểm trùng nhau.');
    if(new Set(ids).size<3){$('measure-result').textContent='AB = '+pretty(ab)+' Å · Chọn C khác A và B để đo góc.';return;}
    if(bc<1e-9)throw Error('Không đo được góc với các điểm trùng nhau.');
    const angle=Math.acos(Math.max(-1,Math.min(1,u.reduce((s,x,i)=>s+x*v[i],0)/(ab*bc))))*180/Math.PI;
    $('measure-result').textContent='AB = '+pretty(ab)+' Å · BC = '+pretty(bc)+' Å · ∠ABC = '+pretty(angle)+'°';
  },'measure-result');
  display(current);try{const incoming=sessionStorage.getItem('gdvn-structure-smiles');if(incoming){sessionStorage.removeItem('gdvn-structure-smiles');$('smiles-input').value=incoming;generate();}}catch{}return ()=>{disposed=true;request++;client.dispose();view.dispose();};
}
export function setupCAS(){
  set(panel('Đại số ký hiệu CAS','<div class="row"><label>Phép toán<select id="cas-operation"><option value="simplify">Rút gọn</option><option value="expand">Khai triển</option><option value="factor">Phân tích nhân tử</option><option value="diff">Đạo hàm</option><option value="integrate">Nguyên hàm</option><option value="solve">Giải phương trình</option><option value="limit">Giới hạn</option></select></label><label>Biến<input id="cas-variable" value="x" maxlength="1" style="width:70px"></label><label id="cas-point-label" hidden>Điểm giới hạn<input id="cas-point" value="0" style="width:100px"></label></div><div class="row"><label class="grow">Biểu thức hoặc phương trình<input id="cas-expression" value="x^2+2*x+1" spellcheck="false"></label><button id="cas-run" class="primary">Tính CAS</button></div><p class="muted">Dùng dấu * cho phép nhân, ^ cho lũy thừa. Ví dụ: factor với x^2-1; diff với sin(x); solve với x^2-5*x+6=0. Lượng giác trong CAS dùng radian.</p>'+result('cas-result')+'<div class="row"><button id="cas-copy" disabled>Chép kết quả</button><button id="cas-latex" disabled>Chép LaTeX</button></div><details><summary>Lịch sử trong phiên</summary><div id="cas-history"></div></details>'));
  const client=engineClient();let disposed=false,output=null,history=[];
  const invalidate=()=>{output=null;$('cas-copy').disabled=$('cas-latex').disabled=true;$('cas-result').textContent='Dữ liệu đã đổi. Bấm Tính CAS để cập nhật.';};
  $('cas-operation').onchange=()=>{$('cas-point-label').hidden=$('cas-operation').value!=='limit';invalidate();};
  for(const id of ['cas-expression','cas-variable','cas-point'])$(id).oninput=invalidate;
  const run=async()=>{
    $('cas-run').disabled=true;output=null;$('cas-copy').disabled=$('cas-latex').disabled=true;$('cas-result').classList.remove('error');$('cas-result').textContent='Đang tính…';
    const payload={operation:$('cas-operation').value,expression:$('cas-expression').value,variable:$('cas-variable').value,point:$('cas-point').value};
    const fingerprint=JSON.stringify(payload);
    try{const answer=await client.run('cas',payload);if(disposed)return;
      const now=JSON.stringify({operation:$('cas-operation').value,expression:$('cas-expression').value,variable:$('cas-variable').value,point:$('cas-point').value});
      if(now!==fingerprint){invalidate();return;}output=answer;
      $('cas-result').textContent=answer.text+(payload.operation==='integrate'?' + C':'')+(answer.incomplete?' · Chưa tìm được nguyên hàm đầy đủ.':'');
      $('cas-copy').disabled=$('cas-latex').disabled=false;
      history.unshift({input:payload.operation+'('+payload.expression+')',output:$('cas-result').textContent});history=history.slice(0,10);$('cas-history').innerHTML=table(['Biểu thức','Kết quả'],history.map(h=>[esc(h.input),esc(h.output)]));
    }catch(error){if(!disposed){$('cas-result').classList.add('error');$('cas-result').textContent=error.message;}}
    finally{if(!disposed)$('cas-run').disabled=false;}
  };
  $('cas-run').onclick=run;$('cas-expression').onkeydown=e=>{if(e.key==='Enter')run();};
  for(const [id,key] of [['cas-copy','text'],['cas-latex','latex']])$(id).onclick=async()=>{if(!output)return;try{await navigator.clipboard.writeText(output[key]);toast('Đã chép kết quả');}catch{toast('Hãy chọn văn bản kết quả để sao chép.');}};
  return ()=>{disposed=true;client.dispose();};
}
export const advancedHandlers={molecule};
