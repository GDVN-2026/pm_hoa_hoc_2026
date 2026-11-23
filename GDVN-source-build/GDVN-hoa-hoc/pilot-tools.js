import {$,set,panel,number,result,safe,positive} from './ui-kit.js';
import {masses,elements} from './data.js';
import {parseFormula,pretty} from './chemistry.js';
export function formulaLab(){
 set(panel('Lập công thức hóa học','<div class="row"><label>Nhóm A<input id="formula-a" value="Fe"></label>'+number('valence-a','Hóa trị A',3)+
 '<label>Nhóm B<input id="formula-b" value="SO4"></label>'+number('valence-b','Hóa trị B',2)+'<button id="formula-valence">Từ hóa trị</button></div>'+
 '<div class="row"><label>Thành phần (ký hiệu và % theo dòng)<textarea id="formula-percent">C 40\nH 6,67\nO 53,33</textarea></label>'+number('formula-mass','Khối lượng phân tử (u)',180)+'<button id="formula-composition">Từ thành phần</button></div>'+result('formula-result')));
 const target=$('formula-result');
 $('formula-valence').onclick=()=>safe(()=>{
  const names=['formula-a','formula-b'].map(id=>$(id).value.trim());
  if(names.some(s=>! /^(?:[A-Z][a-z]?\d*)+$/.test(s)))throw Error('Nhập ký hiệu nguyên tố hoặc nhóm nguyên tử trung hòa về cách viết.');
  const atoms=names.map(name=>parseFormula(name).atoms);
  const a=positive('valence-a'),b=positive('valence-b');
  if(![a,b].every(n=>Number.isInteger(n)&&n<=20))throw Error('Nhập hóa trị nguyên từ 1 đến 20.');
  const gcd=(x,y)=>y?gcd(y,x%y):x;
  const d=gcd(a,b),indices=[b/d,a/d];
  const formula=names.map((name,i)=>indices[i]===1?name:(Object.values(atoms[i]).reduce((sum,n)=>sum+n,0)>1?'('+name+')':name)+indices[i]).join('');
  target.textContent='AₓBᵧ: '+a+'x = '+b+'y. UCLN = '+d+'. Tỉ lệ x:y = '+indices.join(':')+'. Công thức: '+formula+'.';
 },'formula-result');
 $('formula-composition').onclick=()=>safe(()=>{
  const entries=$('formula-percent').value.trim().split(/\r?\n/).map(line=>{
   const m=line.trim().match(/^([A-Z][a-z]?)\s+(\d+(?:[,.]\d+)?)$/);
   if(!m||!Object.hasOwn(masses,m[1])||!(Number(m[2].replace(',','.'))>0))throw Error('Mỗi dòng cần ký hiệu hợp lệ và phần trăm dương.');
   return [m[1],Number(m[2].replace(',','.'))];
  });
  if(new Set(entries.map(e=>e[0])).size!==entries.length||Math.abs(entries.reduce((s,e)=>s+e[1],0)-100)>0.15)throw Error('Các nguyên tố phải khác nhau và tổng thành phần gần 100%.');
  const ratios=entries.map(([symbol,pct])=>pct/masses[symbol]),min=Math.min(...ratios);
  const normalized=ratios.map(n=>n/min);
  const count=Array.from({length:20},(_,i)=>i+1).find(k=>normalized.every(n=>Math.abs(n*k-Math.round(n*k))<=0.03));
  if(!count)throw Error('Dữ kiện không cho tỉ lệ nguyên nhỏ trong dung sai của mô hình.');
  const indices=normalized.map(n=>Math.round(n*count));
  const empiricalMass=entries.reduce((s,[symbol],i)=>s+masses[symbol]*indices[i],0);
  const raw=positive('formula-mass')/empiricalMass,k=Math.round(raw);
  if(k<1||Math.abs(raw-k)>0.05)throw Error('Khối lượng phân tử không phù hợp với công thức đơn giản nhất.');
  const formula=factor=>entries.map(([symbol],i)=>symbol+(indices[i]*factor===1?'':indices[i]*factor)).join('');
  target.textContent='Chia %m cho nguyên tử khối: '+ratios.map(x=>pretty(x)).join(' : ')+'. Chia tiếp cho giá trị nhỏ nhất, tìm tỉ lệ nguyên '+indices.join(':')+'. Công thức đơn giản nhất: '+formula(1)+'. k = '+k+'. Công thức phân tử: '+formula(k)+'.';
 },'formula-result');
}
export function quotientLab(){
 set(panel('So sánh Qc với Kc','<p>Mô hình đồng thể aA + bB ⇌ cC + dD. Đặt hệ số 0 để bỏ chất khỏi biểu thức. Nhập nồng độ dương của các chất tham gia.</p>'+
 ['A','B','C','D'].map((symbol,i)=>'<div class="row">'+number('qc-n'+i,'Hệ số '+symbol,[1,0,1,0][i],1)+number('qc-c'+i,'['+symbol+'] (mol/L)',[0.5,1,2,1][i])+'</div>').join('')+
 '<div class="row">'+number('qc-k','Kc',4)+'<button id="qc-run">So sánh</button></div>'+result('qc-result')+'<meter id="qc-scale" hidden min="-6" max="6" value="0" aria-label="Logarit cơ số 10 của Qc chia Kc"></meter><p id="qc-scale-note" hidden>Thang log₁₀(Qc/Kc). Mốc 0 là cân bằng.</p>'));
 $('qc-run').onclick=()=>{
  $('qc-scale').hidden=$('qc-scale-note').hidden=true;
  safe(()=>{
   const powers=[0,1,2,3].map(i=>positive('qc-n'+i,true));
   if(powers.some(n=>!Number.isInteger(n)||n>50)||!(powers[0]+powers[1])||!(powers[2]+powers[3]))throw Error('Nhập hệ số nguyên 0–50 với ít nhất một chất ở mỗi vế.');
   const logQ=powers.reduce((s,n,i)=>s+(n?n*Math.log(positive('qc-c'+i))*(i<2?-1:1):0),0);
   const k=positive('qc-k'),ratio=logQ-Math.log(k),equal=Math.abs(ratio)<1e-9;
   const q=Math.exp(logQ);
   const displayed=Number.isFinite(q)&&q>0?pretty(q):'exp('+pretty(logQ)+')';
   $('qc-result').textContent='Qc = '+displayed+'; Kc = '+pretty(k)+'. '+(equal?'Cân bằng.':ratio<0?'Chiều thuận.':'Chiều nghịch.');
   $('qc-scale').value=Math.max(-6,Math.min(6,ratio/Math.LN10));
   $('qc-scale').hidden=$('qc-scale-note').hidden=false;
  },'qc-result');
 };
}
export function lewisLab(){
 const models={H2O:['O','H','H'],NH3:['N','H','H','H'],CO2:['C','O','O'],N2:['N','N'],CH4:['C','H','H','H','H'],HCl:['Cl','H']};
 const valence={H:1,C:4,N:5,O:6,Cl:7};
 set(panel('Thực hành công thức Lewis','<label>Phân tử<select id="lewis-model">'+Object.keys(models).map(m=>'<option>'+m+'</option>').join('')+'</select></label><div id="lewis-pairs"></div>'+result('lewis-result')));
 function reset(){
  const atoms=models[$('lewis-model').value],target=$('lewis-pairs');
  target.innerHTML=atoms.map((atom,i)=>'<div class="row">'+(i?number('lewis-b'+i,'Cặp chung '+atoms[0]+'–'+atom+' '+i,0,1):'')+
   number('lewis-l'+i,'Cặp riêng '+atom+' '+(i+1),0,1)+'</div>').join('');
  function assess(){
   safe(()=>{
    const bonds=atoms.map((_,i)=>i?positive('lewis-b'+i,true):0);
    const lone=atoms.map((_,i)=>positive('lewis-l'+i,true));
    if([...bonds,...lone].some(n=>!Number.isInteger(n)||n>3))throw Error('Mỗi mục cần từ 0 đến 3 cặp nguyên.');
    const sum=a=>a.reduce((x,y)=>x+y,0);
    const used=2*(sum(bonds)+sum(lone)),budget=sum(atoms.map(a=>valence[a]));
    const octet=atoms.every((a,i)=>2*(lone[i]+(i?bonds[i]:sum(bonds)))===(a==='H'?2:8));
    $('lewis-result').textContent='Electron đã dùng: '+used+' / '+budget+'. '+(octet&&used===budget&&bonds.slice(1).every(Boolean)?'Đạt octet/duet.':'Kiểm tra cặp chung, cặp riêng và ngân sách electron.');
   },'lewis-result');
  }
  target.oninput=assess;
  assess();
 }
 $('lewis-model').onchange=reset;
 reset();
}

export function massReferenceNote(formula){
  const atoms=parseFormula(formula).atoms;
  const references=elements.filter(e=>Object.hasOwn(atoms,e.symbol)&&e.referenceMassNumber);
  return references.length?'Phép tính danh định dùng số khối đồng vị tham chiếu '+references.map(e=>e.symbol+' '+e.massLabel).join(', ')+'. Giá trị này khác nguyên tử khối chuẩn.':'';
}
