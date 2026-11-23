import {formulaLab,quotientLab,massReferenceNote} from './pilot-tools.js';
/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {setupLimitingReagent} from './stoichiometry-ui.js';
import {strongTitration} from './titration.js';
import {standardCell,nernstCell,faradayMass,enthalpyDelta,simpleEquilibrium} from './physical-chemistry.js';
import {reactions,potentials} from './data.js';
import {escapeHTML as esc,formatFormula as formula,parseFormula,molarMass,balanceEquation,solutionPH,pretty} from './chemistry.js';
import {plot,download} from './visuals.js';
import {$,opt,panel,result,number,safe,positive,set,table,textSVG,toast} from './modules.js';
function equation(){
  formulaLab();
  set(panel('Cân bằng tự động','<div class="row"><label class="grow">Phương trình<input id="equation-input" value="Fe + O2 -> Fe2O3"></label><button id="balance" class="primary">Cân bằng</button></div><p class="muted">Dùng -> để ngăn hai vế. Hỗ trợ ngoặc, hydrate và ion. Với ion, viết Fe^3+ + e^- -> Fe^2+ và dùng khoảng trắng quanh dấu + ngăn các chất.</p><div class="row" id="equation-examples" aria-label="Dùng ví dụ"></div>'+result()+'<div class="row"><button id="copy-equation">Chép phương trình</button><button id="svg-equation">Xuất SVG</button></div><div id="conservation"></div>')+panel('Tính theo phương trình','<div class="row"><label>Chất đã biết<select id="known"></select></label>'+number('amount','Lượng đã biết',10)+'<label>Đơn vị<select id="unit"><option>g</option><option>mol</option></select></label>'+number('yield','Hiệu suất (%)',100)+'<button id="stoich" class="primary">Tính</button></div>'+result('stoich-result'))+panel('Khối lượng mol & thành phần','<div class="row"><input id="mass-formula" value="Ca3(PO4)2" aria-label="Công thức hóa học"><button id="mass-button">Tính khối lượng mol</button></div>'+result('mass-result')));
  let balanced; const updateLimiting=setupLimitingReagent();
  const equationInput=$('equation-input');
  function clearEquation(){
    balanced=null;
    updateLimiting(null);
    for(const id of ['known','stoich-result','result','conservation'])$(id).textContent='';
  }
  const examples=[
    ['Phân tử','Fe + O2 -> Fe2O3'],
    ['Nhóm trong ngoặc','Ca(OH)2 + HCl -> CaCl2 + H2O'],
    ['Muối ngậm nước','CuSO4·5H2O -> CuSO4 + H2O'],
    ['Phương trình ion','Ag^+ + Cl^- -> AgCl'],
    ['Bán phản ứng','Fe^3+ + e^- -> Fe^2+']
  ];
  $('equation-examples').append('Dùng ví dụ: ');
  for(const [label,example] of examples){
    const button=document.createElement('button');
    button.type='button';
    button.textContent=label;
    button.onclick=()=>{equationInput.value=example;clearEquation();equationInput.focus();};
    $('equation-examples').append(button);
  }
  function run(){clearEquation();const b=balanceEquation($('equation-input').value);balanced=b;updateLimiting(b);$('result').innerHTML='<div class="formula">'+formula(b.text)+'</div>';$('known').innerHTML=opt(b.all);$('conservation').innerHTML=table(['Nguyên tố / điện tích','Vế trái','Vế phải'],b.symbols.map(s=>{const count=(a,z)=>b.parsed.slice(a,z).reduce((sum,p,j)=>sum+b.coefficients[a+j]*(s==='charge'?p.charge:p.atoms[s]||0),0);return [s,count(0,b.split),count(b.split,b.all.length)];}));}
  $('balance').onclick=()=>safe(run);$('equation-input').onkeydown=e=>{if(e.key==='Enter')safe(run);};equationInput.oninput=clearEquation;
  $('stoich').onclick=()=>safe(()=>{if(!balanced)throw Error('Hãy cân bằng phương trình hiện tại trước.');const index=Number($('known').value),amount=positive('amount'),eff=positive('yield');if(eff>100)throw Error('Hiệu suất không vượt quá 100%.');if(index>=balanced.split&&eff!==100)throw Error('Khi nhập lượng sản phẩm, đặt hiệu suất 100% để tính tỉ lượng.');const m=molarMass(balanced.all[index]);if(m===0&&$('unit').value==='g')throw Error('Electron cần nhập theo mol.');const mol=$('unit').value==='g'?amount/m:amount;const extent=mol/balanced.coefficients[index];$('stoich-result').innerHTML='<p>Giả định các chất phản ứng khác đủ hoặc dư.</p>'+table(['Chất','Số mol','Khối lượng (g)'],balanced.all.map((c,i)=>{const n=extent*balanced.coefficients[i]*(i>=balanced.split?eff/100:1);return [esc(c),pretty(n),pretty(n*molarMass(c))];}));},'stoich-result');
  $('mass-button').onclick=()=>safe(()=>{const f=$('mass-formula').value,m=molarMass(f),atoms=parseFormula(f).atoms;$('mass-result').innerHTML='<b>M = '+pretty(m)+' g/mol</b>'+table(['Nguyên tố','Số nguyên tử','% khối lượng'],Object.entries(atoms).map(([s,n])=>[s,n,pretty(100*n*molarMass(s)/m)]));const note=massReferenceNote(f);if(note){const msg=document.createElement('p');msg.className='mass-reference-note';msg.textContent=note;$('mass-result').append(msg);}},'mass-result');
  $('copy-equation').onclick=async()=>{if(balanced){try{await navigator.clipboard.writeText(balanced.text);toast('Đã chép phương trình');}catch{toast('Bạn có thể chọn và sao chép kết quả.');}}};
  $('svg-equation').onclick=()=>{if(balanced)download('GDVN-phuong-trinh.svg',textSVG(balanced.text),'image/svg+xml');};safe(run);$('mass-button').click();
}
function ionic(){
  const rules=[
  ['Ag+','Cl−','Ag⁺ + Cl⁻ → AgCl↓','Trắng'],['Ag+','Br−','Ag⁺ + Br⁻ → AgBr↓','Vàng nhạt'],['Ag+','I−','Ag⁺ + I⁻ → AgI↓','Vàng'],
  ['Ba2+','SO4²−','Ba²⁺ + SO₄²⁻ → BaSO₄↓','Trắng'],['Ca2+','CO3²−','Ca²⁺ + CO₃²⁻ → CaCO₃↓','Trắng'],['Ba2+','CO3²−','Ba²⁺ + CO₃²⁻ → BaCO₃↓','Trắng'],
  ['Cu2+','OH−','Cu²⁺ + 2OH⁻ → Cu(OH)₂↓','Xanh lam'],['Fe2+','OH−','Fe²⁺ + 2OH⁻ → Fe(OH)₂↓','Trắng xanh'],['Fe3+','OH−','Fe³⁺ + 3OH⁻ → Fe(OH)₃↓','Nâu đỏ'],
  ['Al3+','OH−','Al³⁺ + 3OH⁻ → Al(OH)₃↓','Keo trắng, tan trong OH⁻ dư'],['Zn2+','OH−','Zn²⁺ + 2OH⁻ → Zn(OH)₂↓','Trắng, tan trong OH⁻ dư'],
  ['H+','OH−','H⁺ + OH⁻ → H₂O','Trung hòa'],['H+','CO3²−','2H⁺ + CO₃²⁻ → CO₂↑ + H₂O','Thoát khí'],['H+','SO3²−','2H⁺ + SO₃²⁻ → SO₂↑ + H₂O','Thoát khí'],['NH4+','OH−','NH₄⁺ + OH⁻ → NH₃↑ + H₂O','Thoát khí khi đun nhẹ']
  ];const cations=[...new Set(rules.map(r=>r[0]))],anions=[...new Set(rules.map(r=>r[1]))];
  set(panel('Phương trình ion rút gọn','<div class="row"><label>Cation<select id="cation">'+opt(cations)+'</select></label><label>Anion<select id="anion">'+opt(anions)+'</select></label><button id="ionic-check" class="primary">Tra phản ứng</button></div>'+result())+panel('Quy tắc độ tan','<p>Muối nitrate và phần lớn muối kim loại kiềm, ammonium tan. Chloride phần lớn tan, ngoại trừ AgCl, PbCl₂ và một số muối khác. BaSO₄, PbSO₄ không tan; CaSO₄ ít tan. Carbonate và hydroxide phần lớn ít tan, cần xét ngoại lệ.</p>'+table(['Cation','Anion','Phương trình','Hiện tượng'],rules)));
  $('ionic-check').onclick=()=>{const hit=rules.find(r=>r[0]===cations[Number($('cation').value)]&&r[1]===anions[Number($('anion').value)]);$('result').textContent=hit?hit[2]+' · '+hit[3]:'Chưa có dữ liệu cho cặp ion này trong bảng tra.';};$('ionic-check').click();
}
function electro(){
  set(panel('Pin galvanic và Nernst','<div class="row"><label>Điện cực A<select id="electrode-a">'+opt(potentials.map(x=>x[0]))+'</select></label><label>Điện cực B<select id="electrode-b">'+opt(potentials.map(x=>x[0]))+'</select></label>'+number('temperature','Nhiệt độ (K)',298.15)+number('quotient','Thương số Q',1)+number('electron-n','Số electron n',2,1)+'<button id="cell" class="primary">Tính sức điện động</button></div>'+result()+'<p class="muted">Q và n phải được lập từ phương trình tổng đã cân bằng. Dùng hoạt độ, giả định biến thiên E° theo nhiệt độ nhỏ.</p>')+panel('Thế khử chuẩn ở khoảng 25 °C',table(['Cặp oxi hóa / khử','E° (V)'],potentials.map(p=>[p[0],p[3]]))));
  $('electrode-a').value='2';$('electrode-b').value='8';
  $('electron-n').readOnly=true;$('electron-n').title='Tự xác định theo phương trình ion tổng tối giản.';
  const cellInputs=()=>[potentials[Number($('electrode-a').value)],potentials[Number($('electrode-b').value)]];
  const invalidateCell=()=>{try{$('electron-n').value=standardCell(...cellInputs()).n;}catch{$('electron-n').value='';}$('result').textContent='Dữ kiện đã đổi. Tính lại sức điện động.';};
  for(const id of ['temperature','quotient'])$(id).oninput=invalidateCell;for(const id of ['electrode-a','electrode-b'])$(id).onchange=invalidateCell;
  $('cell').onclick=()=>safe(()=>{const r=nernstCell(...cellInputs(),positive('temperature'),positive('quotient'));$('electron-n').value=r.n;$('result').innerHTML='<div class="formula">E° = '+pretty(r.e0)+' V &nbsp; E = '+pretty(r.e)+' V</div><p>Chiều quy ước theo điều kiện chuẩn: oxi hóa '+esc(r.anode[0])+'; khử '+esc(r.cathode[0])+'.</p><div class="formula">'+formula(r.equation)+'</div><p>n = '+r.n+' mol electron/mol phản ứng tối giản · Q = '+esc(r.qExpression)+'</p><p>ΔG = −nFE = '+pretty(r.dg)+' kJ/mol phản ứng.</p><p>'+(Math.abs(r.e)<1e-12?'Trong sai số số học, E ≈ 0: hệ ở cân bằng theo mô hình.':r.e>0?'Chiều quy ước thuận lợi về nhiệt động ở dữ kiện nhập.':'Chiều nghịch thuận lợi về nhiệt động ở dữ kiện nhập; vai trò hai cực của pin tự phát đảo so với chiều quy ước.')+'</p><p class="muted">Q phải dùng đúng biểu thức trên, hoạt độ và áp suất tương đối không có đơn vị. Không nhân thế điện cực với hệ số cân bằng. Giá trị E° tra ở khoảng 25 °C; dùng ở nhiệt độ khác là xấp xỉ.</p>';});$('cell').click();
}
function electrolysis(){
  const systems=[
    ['CuSO₄ dung dịch · điện cực trơ','Cu²⁺ + 2e⁻ → Cu','2H₂O → O₂ + 4H⁺ + 4e⁻','2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄','Cu bám đỏ nâu','O₂ thoát ra','Cu²⁺ giảm nên màu xanh nhạt dần. Nước bị oxi hóa ở anot, tạo O₂ và H⁺. SO₄²⁻ là ion khán giả trong mô hình.','cell','#63bde7','#bc6741','O₂'],
    ['CuSO₄ dung dịch · anode đồng','Cu²⁺ + 2e⁻ → Cu','Cu → Cu²⁺ + 2e⁻','Cu (anode) → Cu (cathode)','Cu bám đỏ nâu','Anode đồng tan','Đồng chuyển từ anode sang cathode. Trong mô hình lý tưởng, nồng độ Cu²⁺ gần như giữ nguyên.','cell','#63bde7','#bc6741',''],
    ['NaCl nóng chảy','Na⁺ + e⁻ → Na','2Cl⁻ → Cl₂ + 2e⁻','2NaCl(l) → 2Na(l) + Cl₂(g)','Na lỏng','Cl₂ thoát ra','Điện phân muối nóng chảy. Hai sản phẩm được tách riêng.','molten','#df9853','#dce6eb','Cl₂'],
    ['Nước muối đậm đặc · có màng ngăn','2H₂O + 2e⁻ → H₂ + 2OH⁻','2Cl⁻ → Cl₂ + 2e⁻','2NaCl + 2H₂O → H₂ + Cl₂ + 2NaOH','H₂, dung dịch NaOH','Cl₂ thoát ra','Màng ngăn giúp tách chlorine khỏi dung dịch kiềm ở khoang cathode.','cell','#72bdd8','','Cl₂','H₂'],
    ['Nước · chất điện li thích hợp','2H₂O + 2e⁻ → H₂ + 2OH⁻','2H₂O → O₂ + 4H⁺ + 4e⁻','2H₂O → 2H₂ + O₂','H₂ thoát ra','O₂ thoát ra','Khí thu riêng. Thể tích H₂ gấp đôi O₂ ở cùng nhiệt độ và áp suất.','cell','#a7dae9','','O₂','H₂'],
    ['Al₂O₃ trong cryolite nóng chảy','Al³⁺ + 3e⁻ → Al','C + 2O²⁻ → CO₂ + 4e⁻','2Al₂O₃ + 3C → 4Al + 3CO₂','Al lỏng xuống đáy','CO₂ tại anode carbon','Sơ đồ Hall–Héroult giản lược. Nhôm lỏng nằm dưới lớp điện ly và anode carbon bị tiêu hao.','molten','#df9853','#dce6eb','CO₂'],
    ['AgNO₃ dung dịch · điện cực trơ','Ag⁺ + e⁻ → Ag','2H₂O → O₂ + 4H⁺ + 4e⁻','4AgNO₃ + 2H₂O → 4Ag + O₂ + 4HNO₃','Ag bám trên cathode','O₂ thoát ra','Mô tả giai đoạn còn Ag⁺ trong dung dịch. Nitrate là ion khán giả.','cell','#a7dae9','#dce6eb','O₂']
  ];
  const waterReduction='2H₂O + 2e⁻ → H₂ + 2OH⁻';
  const waterOxidation='2H₂O → O₂ + 4H⁺ + 4e⁻';
  const moreSystems=[
    ['CuCl₂ dung dịch','Cu²⁺ + 2e⁻ → Cu','2Cl⁻ → Cl₂ + 2e⁻','CuCl₂ → Cu + Cl₂','Cu bám đỏ nâu','Cl₂ thoát ra','Minh họa khi chloride đủ đậm đặc.','#61c7d6','#bc6741','Cl₂','',['Cu²⁺','Cl⁻']],
    ['Cu(NO₃)₂ dung dịch','Cu²⁺ + 2e⁻ → Cu',waterOxidation,'2Cu(NO₃)₂ + 2H₂O → 2Cu + O₂ + 4HNO₃','Cu bám đỏ nâu','O₂ thoát ra','Dung dịch xanh nhạt dần khi Cu²⁺ giảm.','#63bde7','#bc6741','O₂','',['Cu²⁺','NO₃⁻']],
    ['ZnSO₄ dung dịch','Zn²⁺ + 2e⁻ → Zn',waterOxidation,'2ZnSO₄ + 2H₂O → 2Zn + O₂ + 2H₂SO₄','Zn bám xám','O₂ thoát ra','Minh họa chế độ thu Zn. Có thể cạnh tranh với thoát H₂ tùy điều kiện.','#a9d9e8','#aebbc6','O₂','',['Zn²⁺','SO₄²⁻']],
    ['NiSO₄ dung dịch','Ni²⁺ + 2e⁻ → Ni',waterOxidation,'2NiSO₄ + 2H₂O → 2Ni + O₂ + 2H₂SO₄','Ni bám xám bạc','O₂ thoát ra','Minh họa chế độ mạ Ni, có thể kèm thoát H₂.','#79c89c','#c0c9ce','O₂','',['Ni²⁺','SO₄²⁻']],
    ['Pb(NO₃)₂ dung dịch','Pb²⁺ + 2e⁻ → Pb','Pb²⁺ + 2H₂O → PbO₂ + 4H⁺ + 2e⁻','2Pb(NO₃)₂ + 2H₂O → Pb + PbO₂ + 4HNO₃','Pb bám xám','PbO₂ có thể bám sẫm','Minh họa điều kiện tạo PbO₂ ở anot. O₂ có thể cạnh tranh tùy điện cực và điều kiện.','#a9d9e8','#8795a3','','',['Pb²⁺','NO₃⁻']],
    ['FeSO₄ dung dịch','Fe²⁺ + 2e⁻ → Fe','Fe²⁺ → Fe³⁺ + e⁻','3Fe²⁺ → Fe + 2Fe³⁺','Fe có thể bám','Fe²⁺ bị oxi hóa','Một trường hợp lý tưởng hóa. Sản phẩm thực tế phụ thuộc pH, điện cực và các phản ứng cạnh tranh.','#a5cba2','#9daab5','','',['Fe²⁺','SO₄²⁻']],
    ['KBr dung dịch',waterReduction,'2Br⁻ → Br₂ + 2e⁻','2KBr + 2H₂O → H₂ + Br₂ + 2KOH','H₂ thoát ra','Bromine vàng nâu','Xét dung dịch đủ bromide và tách sản phẩm hai cực.','#a7dae9','','','H₂',['K⁺','Br⁻']],
    ['KI dung dịch',waterReduction,'2I⁻ → I₂ + 2e⁻','2KI + 2H₂O → H₂ + I₂ + 2KOH','H₂ thoát ra','Iodine màu nâu','Iodine có thể tạo triiodide khi còn iodide dư.','#a7dae9','','','H₂',['K⁺','I⁻']],
    ...[['MgCl₂','Mg²⁺','Mg(OH)₂'],['BaCl₂','Ba²⁺','Ba(OH)₂']].map(([salt,ion,base])=>[
      salt+' dung dịch',waterReduction,'2Cl⁻ → Cl₂ + 2e⁻',salt+' + 2H₂O → '+base+' + H₂ + Cl₂','H₂ thoát ra','Cl₂ thoát ra','Mô hình chloride đủ đậm đặc. '+(salt==='MgCl₂'?'Mg(OH)₂ có thể kết tủa gần catot.':'Dung dịch phía catot trở nên kiềm.'),'#a7dae9','','Cl₂','H₂',[ion,'Cl⁻']]),
    ['HCl dung dịch','2H⁺ + 2e⁻ → H₂','2Cl⁻ → Cl₂ + 2e⁻','2HCl → H₂ + Cl₂','H₂ thoát ra','Cl₂ thoát ra','Minh họa khi chloride đủ đậm đặc; hai khí thu riêng.','#a7dae9','','Cl₂','H₂',['H⁺','Cl⁻']],
    ...[['H₂SO₄','H⁺','SO₄²⁻'],['NaOH','Na⁺','OH⁻'],['Na₂SO₄','Na⁺','SO₄²⁻'],['KNO₃','K⁺','NO₃⁻']].map(([salt,cation,anion])=>[
      salt+' dung dịch',salt==='H₂SO₄'?'2H⁺ + 2e⁻ → H₂':waterReduction,salt==='NaOH'?'4OH⁻ → O₂ + 2H₂O + 4e⁻':waterOxidation,'2H₂O → 2H₂ + O₂','H₂ thoát ra','O₂ thoát ra','Điện cực trơ, mô hình điện phân nước. Thu khí riêng ở hai cực.','#a7dae9','','O₂','H₂',[cation,anion]])
  ];
  systems.push(...moreSystems.map(([name,cathode,anode,total,left,right,note,color,metal,gasRight,gasLeft,ions])=>
    [name,cathode,anode,total,left,right,note,'cell',color,metal,gasRight,gasLeft,ions]));
  // Additional reference cases contrast aqueous and molten electrolytes.
  systems.push(
    ['KCl nóng chảy','K⁺ + e⁻ → K','2Cl⁻ → Cl₂ + 2e⁻','2KCl(l) → 2K + Cl₂(g)','Tạo kali ở catot','Cl₂ thoát ra','Sơ đồ tỉ lượng lý tưởng của muối nóng chảy. Không mô tả trạng thái, vận hành hoặc cách thu kali ở nhiệt độ cao.','molten','#df9853','','Cl₂','',['K⁺','Cl⁻']],
    ['K₂SO₄ dung dịch',waterReduction,waterOxidation,'2H₂O → 2H₂ + O₂','H₂ thoát ra','O₂ thoát ra','Điện cực trơ trong mô hình. Nước bị điện phân, K⁺ và SO₄²⁻ là ion khán giả. Tỉ lệ mol H₂ : O₂ bằng 2 : 1.','cell','#a7dae9','','O₂','H₂',['K⁺','SO₄²⁻']]
  );
  const duration=40;
  const controls='<div class="row"><label>Hệ điện phân<select id="system">'+opt(systems.map(s=>s[0]))+'</select></label><label>Anot<select id="electro-anode" aria-describedby="electro-anode-note"><option value="">Than chì / Pt</option><option value="Cu">Cu</option><option value="Ag">Ag</option><option value="Ni">Ni</option><option value="Zn">Zn</option><option value="Fe">Fe</option></select></label><button id="electro-start" class="primary">Bật dòng điện</button><button id="electro-pause" disabled>Tạm dừng</button><button id="electro-reset">Đặt lại</button></div>';
  set('<section class="electro-simulation"><div class="electro-left"><div class="electro-card"><h2>Thiết lập thí nghiệm</h2>'+controls+'<p id="electro-anode-note" aria-live="polite"></p><p id="electro-status" role="status"></p><label class="electro-progress">Tiến trình minh họa<input id="electro-progress" type="range" min="0" max="'+duration+'" step="any" value="0"><span id="electro-clock"></span></label><div id="electro-quantity" class="electro-quantity" hidden></div></div><div class="electro-card"><h2>Sơ đồ bình điện phân</h2><div id="electro-cell"></div><div class="row electro-view"><button id="electro-view-left">Nghiêng trái</button><button id="electro-view-center">Nhìn thẳng</button><button id="electro-view-right">Nghiêng phải</button><button id="electro-svg">Tải SVG</button></div></div></div><div id="electro-detail"></div></section>'+
panel('Định luật Faraday','<div class="row"><label>Kim loại bám cathode<select id="metal">'+opt(potentials.filter(p=>p[1]!=='H').map(p=>p[1]))+'</select></label>'+number('current','Cường độ I (A)',2)+number('time','Thời gian (phút)',30)+number('efficiency','Hiệu suất dòng (%)',100)+'<button id="faraday" class="primary">Tính lượng chất</button></div>'+result()+'<p class="muted">Tính lượng kim loại giả định phản ứng khử ion kim loại xảy ra. Các kim loại hoạt động mạnh cần môi trường nóng chảy thích hợp.</p>')+panel('Mạ điện','<div class="row">'+number('area','Diện tích mạ (cm²)',100)+number('density','Khối lượng riêng (g/cm³)',8.96)+'<button id="thickness">Tính độ dày</button></div>'+result('thickness-result')));
  const cell=$('electro-cell'),progress=$('electro-progress'),pause=$('electro-pause');
  // Playback uses the same time scale as the model.
  const currentAmps=2,initialCopperMoles=.002;
  let elapsed=0,frame=0,previous=null,phase='',copperModel=null,waterModel=false,solubleMetal='',supported=true,playing=false;
  function updateScene(){
    const seconds=Math.floor(elapsed);
    progress.value=elapsed;
    progress.setAttribute('aria-valuetext',seconds+' trên '+duration+' giây');
    $('electro-clock').textContent=seconds+' / '+duration+' giây';
    const closed=elapsed>0||playing;
    const products=elapsed>=8;
    cell.dataset.running=String(closed);
    cell.dataset.motion=String(playing&&elapsed>=3);
    cell.dataset.wire=String(playing);
    cell.dataset.products=String(products);
    const start=$('electro-start');
    start.disabled=!supported||(closed&&elapsed<duration);
    start.textContent=elapsed>=duration?'Chạy lại':'Bật dòng điện';
    pause.disabled=!supported||!closed||elapsed>=duration;
    pause.textContent=playing||!closed||elapsed>=duration?'Tạm dừng':'Tiếp tục';
    const nextPhase=!supported?'unavailable':elapsed>=duration?'complete':products?'products':elapsed>=3?'migration':playing||elapsed>0?'closed':'ready';
    if(phase!==nextPhase){
      phase=nextPhase;
      $('electro-status').textContent={
        ready:'Sẵn sàng. Bật dòng điện hoặc kéo thanh tiến trình để quan sát.',
        closed:'Mạch đã đóng. Electron chuyển động trong mạch ngoài.',
        migration:'Cation hướng về catot (−), anion hướng về anot (+). Ion đến gần cực có thể vẫn là ion khán giả.',
        products:'Đang quan sát sản phẩm. Mốc xuất hiện trên cảnh chỉ để minh họa, không phải thời điểm phản ứng bắt đầu.',
        complete:'Đã hoàn thành '+duration+' giây mô phỏng. Có thể chạy lại hoặc kéo thanh tiến trình để xem từng mốc.',
        unavailable:'Tổ hợp này chưa có mô hình. Hãy đổi hệ hoặc vật liệu anot.'
      }[phase];
    }
    const output=$('electro-quantity');
    output.hidden=!(copperModel||waterModel||solubleMetal)||!supported;
    if(output.hidden)return;
    const metal=solubleMetal||'Cu';
    const {charge,electrons,mass}=faradayMass({M:molarMass(metal),z:metal==='Ag'?1:2,current:currentAmps,minutes:seconds/60});
    const oxygen=electrons/4;
    updateVisuals();
    output.innerHTML='<p><strong>Điện lượng</strong> '+seconds+' s × '+currentAmps+' A = '+pretty(charge)+' C</p>'+
      (copperModel||solubleMetal?'<p><strong>'+metal+' bám ở catot</strong> '+pretty(mass*1000)+' mg</p>':
        '<p><strong>H₂ ở catot</strong> '+pretty(electrons*500)+' mmol</p>')+
      (copperModel?.soluble||solubleMetal?'<p><strong>'+metal+' tan ở anot</strong> '+pretty(mass*1000)+' mg</p>':
        '<p><strong>O₂ ở anot</strong> '+pretty(oxygen*1000)+' mmol</p>')+
      '<small>Mô hình Faraday lý tưởng · hiệu suất dòng 100%</small>';
  }
  let depositNode,anodeNode;
  function updateVisuals(){
    if(!(copperModel||solubleMetal)||!supported)return;
    const progressFraction=elapsed/duration;
    depositNode.style.setProperty('--deposit',String(progressFraction));
    if(copperModel?.soluble||solubleMetal){
      anodeNode.style.setProperty('--anode-scale',String(1-.22*progressFraction));
    }else{
      const consumed=currentAmps*elapsed/(2*96485);
      cell.style.setProperty('--copper-opacity',String(1-.75*consumed/initialCopperMoles));
    }
  }
  function stop(){
    playing=false;
    if(frame)cancelAnimationFrame(frame);
    frame=0;
    previous=null;
  }
  function tick(now){
    const oldSecond=Math.floor(elapsed);
    if(previous!==null)elapsed=Math.min(duration,elapsed+(now-previous)/1000);
    previous=now;
    if(elapsed>=duration)stop();
    if(Math.floor(elapsed)!==oldSecond)updateScene();
    else{progress.value=elapsed;updateVisuals();}
    if(playing)frame=requestAnimationFrame(tick);
  }
  function play(){
    if(!supported||playing||elapsed>=duration)return;
    playing=true;
    updateScene();
    frame=requestAnimationFrame(tick);
  }
  const anodeSelect=$('electro-anode');
  const solubleAnodes=new Map([[0,'Cu'],[1,'Cu'],[6,'Ag'],[7,'Cu'],[8,'Cu'],[9,'Zn'],[10,'Ni'],[12,'Fe']]);
  function unavailableReason(index,kind,active,expected){
    if(kind==='molten')return index===5?'Hệ cryolite trong bài dùng anot carbon tiêu hao.':'Hệ nóng chảy này chỉ có mô hình với anot mặc định ở nhiệt độ vận hành của hệ.';
    if(index===1)return 'Hệ này minh họa sự chuyển đồng từ anot sang catot, nên cần anot đồng.';
    if(index===11)return 'Sản phẩm ở anot phụ thuộc điều kiện tạo PbO₂ và phản ứng cạnh tranh. Dùng anot mặc định để xem trường hợp đã mô tả.';
    if(expected)return 'Mô hình anot tan chỉ xét '+expected+' vì đây là kim loại tương ứng với ion được khử ở catot. Anot '+active+' cần dữ liệu riêng về sản phẩm và phản ứng cạnh tranh.';
    return 'Hệ đang minh họa sản phẩm với anot mặc định. Anot '+active+' có thể hòa tan hoặc bị thụ động hóa tùy môi trường, nên chưa xác định được sản phẩm từ thiết lập này.';
  }
  function draw(){
    stop();elapsed=0;phase='';
    let [name,cathode,anode,total,left,right,note,kind,color,metal,gasRight,gasLeft,customIons]=systems[Number($('system').value)];
    const index=Number($('system').value);
    const active=anodeSelect.value;
    const expected=solubleAnodes.get(index);
    const compatible=Boolean(active&&active===expected);
    const activeMismatch=active&&!compatible;
    if(compatible){
      const electrons=active==='Ag'?'e⁻':'2e⁻';
      const ion=active==='Ag'?'Ag⁺':active+'²⁺';
      anode=active+' → '+ion+' + '+electrons;
      total=active+' (anot) → '+active+' (catot)';
      right='Anot '+active+' tan';gasRight='';
      note='Mô hình anot tan cùng kim loại với ion trong dung dịch. Bỏ qua phản ứng cạnh tranh.';
    }
    const defaultAnode=index===5?'Carbon (anot tiêu hao)':index===1?'Cu (anot tan theo hệ)':'Điện cực trơ theo mô hình';
    for(const option of anodeSelect.options){
      option.textContent=option.value?option.value+(option.value===expected?' · có mô phỏng':' · chưa hỗ trợ'):defaultAnode;
    }
    const reason=activeMismatch?unavailableReason(index,kind,active,expected):'';
    $('electro-anode-note').textContent=reason?'Không thể chạy tổ hợp này trong mô hình. '+reason:
      'Anot dùng được: '+defaultAnode+(expected&&index!==1?' hoặc '+expected+' (anot tan lý tưởng).':'.');
    if(activeMismatch){
      anode='Cần dữ liệu điều kiện cho tổ hợp này';
      cathode='Chưa xác định trong mô hình';
      total='Chưa có phương trình cho tổ hợp đã chọn';
      left=right='Chưa mô phỏng';
      note=reason;
    }
    const aluminium=name.startsWith('Al₂O₃');
    supported=!activeMismatch;
    solubleMetal=compatible?active:'';
    waterModel=total==='2H₂O → 2H₂ + O₂';
    cell.dataset.running='false';
    cell.dataset.membrane=String(name.startsWith('Nước muối')||kind==='molten'&&!aluminium);
    copperModel=index<2?{soluble:index===1||compatible}:null;
    cell.classList.toggle('electro-copper',Boolean(copperModel&&!copperModel.soluble));
    const sceneName=activeMismatch?name.split(' · ')[0]+' · tổ hợp chưa mô phỏng':copperModel?.soluble?'CuSO₄ dung dịch · anot đồng':compatible?name.split(' · ')[0]+' · anot '+active:name;

    const ions=customIons||[['Cu²⁺','SO₄²⁻'],['Cu²⁺','SO₄²⁻'],['Na⁺','Cl⁻'],['Na⁺','Cl⁻'],[],['Al³⁺','O²⁻'],['Ag⁺','NO₃⁻']][index];
    const divided=cell.dataset.membrane==='true';
    const positions=divided?[[265,196],[324,211],[260,227],[330,241]]:[[254,196],[310,211],[302,227],[262,241]];
    const particles=ions.length?positions.map(([x,y],i)=>{
      const negative=i%2===1;
      return '<g class="electro-ion '+(negative?'electro-anion':'electro-cation')+'" style="--ion-delay:'+(-i*.54)+'s;--ion-drift:'+(negative?24:-(divided?29:Math.min(69,x-233)))+'px"><circle cx="'+x+'" cy="'+y+'" r="10" fill="'+(negative?'#286bd8':'#db3b43')+'"/><text x="'+x+'" y="'+(y+3)+'" text-anchor="middle" fill="white" font-size="8">'+ions[i%2]+'</text></g>';
    }).join(''):'';
    const gas=(x,label)=>label?'<g class="electro-product electro-gas"><text x="'+x+'" y="118" text-anchor="middle" fill="#162134">'+label+'↑</text>'+
      Array.from({length:7},(_,i)=>{
        const cx=x+17+(i%3)*5,cy=236-(i%4)*9;
        return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(2+i%3)+'" fill="#f5fcff" fill-opacity=".66" stroke="#5799ba" stroke-width=".8" style="--bubble-drift:'+((i%3-1)*5)+'px;--bubble-delay:'+(-i*.39)+'s;--bubble-duration:'+(1.4+(i%4)*.24)+'s"/>';
      }).join('')+'</g>':'';
    const colouredProduct=index>=7&&/Bromine|Iodine|PbO₂/.test(right)?'<ellipse class="electro-product" cx="366" cy="223" rx="23" ry="30" fill="#8c4b25" opacity=".72"/>':'';
    const coating=aluminium?'<path class="electro-product" d="M139 279h306v12H139z" fill="#b0bdca"/>':metal?'<rect class="electro-product electro-deposit" x="205" y="235" width="34" height="20" rx="2" fill="'+(metal==='#bc6741'?'url(#electro-copper-metal)':metal)+'"/>':'';
    const anodeColor=copperModel?.soluble?'url(#electro-copper-metal)':compatible||aluminium?'#394351':'url(#electro-rod)';
    cell.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 584 342" role="img" aria-label="'+esc(sceneName)+'" font-family="system-ui,sans-serif" font-size="13" fill="#142034">'
      +'<defs><radialGradient id="electro-backdrop" cx=".42" cy=".25" r=".86"><stop stop-color="#fff"/><stop offset="1" stop-color="#cddfec"/></radialGradient><linearGradient id="electro-glass-surface" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".72"/><stop offset="1" stop-color="#b5edff" stop-opacity=".14"/></linearGradient><linearGradient id="electro-copper-metal" x2="1" y2="1"><stop stop-color="#f5b38a"/><stop offset=".35" stop-color="#cb7951"/><stop offset="1" stop-color="#854326"/></linearGradient><linearGradient id="electro-depth" x2="0" y2="1"><stop stop-color="#d8f5ff" stop-opacity=".15"/><stop offset="1" stop-color="#163d67" stop-opacity=".42"/></linearGradient><linearGradient id="electro-rod"><stop stop-color="#65788e"/><stop offset=".38" stop-color="#38495f"/><stop offset="1" stop-color="#1b283b"/></linearGradient></defs><rect width="584" height="342" rx="14" fill="url(#electro-backdrop)"/><ellipse cx="306" cy="302" rx="178" ry="16" fill="#8ca7bb" opacity=".25"/><text x="292" y="26" text-anchor="middle" font-weight="750">'+esc(sceneName)+'</text>'
      +'<path d="M222 68V56h45m45 0h50v12" fill="none" stroke="#47566a" stroke-width="3"/><path d="M268 44v24m7-16v8m34-16v24m7-16v8" stroke="#182436" stroke-width="4"/><text x="262" y="40" fill="#2563eb">−</text><text x="321" y="40" fill="#e32732">+</text><path class="electro-current" d="M252 56h-20m0 0 7-4m-7 4 7 4m94-4h-16m0 0 7-4m-7 4 7 4" fill="none" stroke="#206084" stroke-width="2"/><circle class="electro-electron cathode-electron" cx="250" cy="56" r="3" fill="#31a8e7"/><circle class="electro-electron anode-electron" cx="342" cy="56" r="3" fill="#31a8e7"/><text x="141" y="58">e⁻ đến catot</text><text x="396" y="58">e⁻ rời anot</text>'
      +'<path d="M132 146l26-16h320l-26 16z" fill="#d6edf8" stroke="#66869f" stroke-width="2"/><path d="M452 146l26-16v140q0 9-8 14l-21 13z" fill="#abcfe3" stroke="#66869f" stroke-width="2"/><path d="M132 146h320v141q0 12-13 12H145q-13 0-13-12z" fill="#f7fafc" stroke="#47566a" stroke-width="3"/><path class="electro-liquid" d="M135 166h314v121q0 9-10 9H145q-10 0-10-9z" fill="'+color+'"/><path d="M135 166l24-13h316l-26 13z" fill="'+color+'" opacity=".63"/><path d="M135 166l24-13h316l-26 13z" fill="url(#electro-glass-surface)"/><path d="M136 166h312" stroke="#e8faff" stroke-width="2" opacity=".72"/><path d="M135 166h314v121q0 9-10 9H145q-10 0-10-9z" fill="url(#electro-depth)"/><path d="M142 174v98m299-98v98" stroke="#e9faff" stroke-width="4" opacity=".65"/>'
      +'<path class="electro-membrane" d="M292 146v150" stroke="#eef7fc" stroke-width="3"/>'+(!aluminium?'<path d="M207 66l9-7h30l-9 7v190l9-7V59" fill="#26374b"/><rect x="207" y="66" width="30" height="190" rx="3" fill="url(#electro-rod)"/>':'<path d="M222 68v70H134v153h24" stroke="#343e4d" stroke-width="5" fill="none"/>')
      +'<rect class="electro-anode-rod" x="347" y="66" width="30" height="190" rx="3" fill="'+anodeColor+'"/>'+particles+coating+colouredProduct+gas(222,gasLeft)+gas(362,gasRight)
      +'<text x="222" y="319" fill="#2563eb" text-anchor="middle" font-weight="750">'+(aluminium?'ĐÁY BỂ (−)':'CATOT (−)')+'</text><text x="362" y="319" fill="#d92f39" text-anchor="middle" font-weight="750">ANOT (+)</text><text x="222" y="333" text-anchor="middle" font-size="10">xảy ra sự khử</text><text x="362" y="333" text-anchor="middle" font-size="10">xảy ra sự oxi hóa</text></svg>';
    depositNode=cell.querySelector('.electro-deposit');
    anodeNode=cell.querySelector('.electro-anode-rod');
    cell.style.setProperty('--electro-liquid',color);
    $('electro-detail').innerHTML='<div class="electro-card"><h2>Các quá trình ở điện cực</h2><b class="electro-negative">Catot (−) · Sự khử</b><p class="electro-equation">'+esc(cathode)+'</p><b class="electro-positive">Anot (+) · Sự oxi hóa</b><p class="electro-equation">'+esc(anode)+'</p></div><div class="electro-card"><h2>Phương trình điện phân</h2><p class="electro-equation">'+esc(total)+'</p></div><div class="electro-card"><h2>Hiện tượng & kết quả</h2><p><b>Ở catot</b> '+esc(left)+'</p><p><b>Ở anot</b> '+esc(right)+'</p><p>'+esc(note)+'</p></div>';

    progress.disabled=!supported;
    updateScene();
  }
  $('system').onchange=$('electro-anode').onchange=draw;
  $('electro-reset').onclick=draw;
  $('electro-start').onclick=()=>{if(elapsed>=duration){elapsed=0;phase='';}play();};
  pause.onclick=()=>{if(playing){stop();updateScene();}else play();};
  progress.oninput=()=>{stop();elapsed=Number(progress.value);updateScene();};
  for(const [id,angle] of [['electro-view-left',-15],['electro-view-center',0],['electro-view-right',15]]){
    $(id).onclick=()=> $('electro-cell').style.setProperty('--electro-angle',angle+'deg');
  }
  $('electro-svg').onclick=()=>{
    const svg=cell.querySelector('svg').cloneNode(true);
    if(cell.dataset.membrane!=='true')svg.querySelector('.electro-membrane').remove();
    if(cell.dataset.products!=='true')svg.querySelectorAll('.electro-product').forEach(node=>node.remove());
    if(cell.dataset.running!=='true')svg.querySelector('.electro-current').remove();
    svg.querySelectorAll('.electro-electron').forEach(node=>node.remove());
    const layer=svg.querySelector('.electro-deposit');
    if(layer&&(copperModel||solubleMetal)){
      const height=20*elapsed/duration;
      layer.setAttribute('height',height);
      layer.setAttribute('y',255-height);
    }
    if(copperModel?.soluble||solubleMetal){
      svg.querySelector('.electro-anode-rod').setAttribute('height',190*(1-.22*elapsed/duration));
    }else if(copperModel){
      svg.querySelector('.electro-liquid').setAttribute('opacity',cell.style.getPropertyValue('--copper-opacity'));
    }
    download('GDVN-dien-phan.svg',svg.outerHTML,'image/svg+xml');
  };
  const metals=potentials.filter(p=>p[1]!=='H');$('metal').value='7';let mass=null;
  function run(){mass=null;$('thickness-result').textContent='';const metal=metals[Number($('metal').value)],r=faradayMass({M:molarMass(metal[1]),z:metal[2],current:positive('current',true),minutes:positive('time',true),efficiency:positive('efficiency',true)});mass=r.mass;$('result').innerHTML='<div class="formula">m = '+pretty(mass)+' g '+metal[1]+'</div><p>Q = '+pretty(r.charge)+' C · n(e) = '+pretty(r.electrons)+' mol · m = MItη/(nF)</p>';}
  $('faraday').onclick=()=>safe(run);['metal','current','time','efficiency'].forEach(id=>$(id).oninput=()=>{mass=null;$('result').textContent='Dữ kiện đã đổi. Tính lại khối lượng.';$('thickness-result').textContent='';});
  for(const id of ['area','density'])$(id).oninput=()=>{$('thickness-result').textContent='Dữ kiện đã đổi. Tính lại độ dày.';};
  $('thickness').onclick=()=>safe(()=>{if(mass===null)throw Error('Hãy tính lại khối lượng với các giá trị hiện tại.');$('thickness-result').textContent='Độ dày δ = m/(ρS) = '+pretty(mass/(positive('area')*positive('density'))*1e4)+' µm';},'thickness-result');
  safe(run);
  draw();
  return stop;
}
function solution(){
  set(panel('Tính pH ở 25 °C','<div class="row"><label>Dung dịch<select id="acid-type"><option value="strong-acid">Axit mạnh một nấc</option><option value="strong-base">Bazơ mạnh một nấc</option><option value="weak-acid">Axit yếu một nấc</option><option value="weak-base">Bazơ yếu một nấc</option></select></label>'+number('concentration','Nồng độ C (mol/L)',.01)+number('ka','Ka hoặc Kb',.000018)+'<button id="ph" class="primary">Tính pH</button></div>'+result()+'<div class="ph-scale">'+Array.from({length:15},(_,i)=>'<span style="background:hsl('+i*19+',70%,40%)">'+i+'</span>').join('')+'</div><p class="muted">Dung dịch lý tưởng có xét sự tự ion hóa của nước, bỏ qua hệ số hoạt độ.</p>')+panel('Chuẩn độ HCl bằng NaOH','<div class="row">'+number('acid-c','C HCl (mol/L)',.1)+number('acid-v','V HCl (mL)',25)+number('base-c','C NaOH (mol/L)',.1)+'<button id="titrate">Vẽ đường cong</button></div><canvas class="science-chart" id="curve" aria-label="Đường cong chuẩn độ HCl bằng NaOH"></canvas>'+result('titration-result'))+panel('Dung dịch đệm & pha loãng','<div class="columns"><div><h3>Đệm HA/A⁻</h3><div class="row">'+number('pka','pKa',4.76)+number('ha','[HA] (M)',.1)+number('a-minus','[A⁻] (M)',.1)+'<button id="buffer">Tính pH đệm</button></div>'+result('buffer-result')+'</div><div><h3>C₁V₁ = C₂V₂</h3><div class="row">'+number('c1','C₁ (M)',1)+number('c2','C₂ (M)',.1)+number('v2','V₂ (mL)',100)+'<button id="dilute">Tính V₁</button></div>'+result('dilute-result')+'</div></div>'));
  $('ph').onclick=()=>safe(()=>{const c=positive('concentration',true);$('result').innerHTML='<div class="formula">pH = '+pretty(solutionPH($('acid-type').value,c,$('acid-type').value.startsWith('weak-')?positive('ka'):1.8e-5))+'</div><p class="muted">'+(c>0.1?'Đây là giá trị theo mô hình nồng độ lý tưởng; dung dịch đậm đặc cần xét hoạt độ, không coi là số đo thực.':'Giá trị trong mô hình dung dịch lý tưởng ở 25 °C.')+'</p>';});
  set(panel('Độ tan và nồng độ phần trăm',
    '<p>Dùng khối lượng theo gram. Với độ tan, mẫu phải là dung dịch bão hòa ở nhiệt độ xác định.</p>'+
    '<div class="row">'+number('solute-mass','Khối lượng chất tan (g)',10)+
    number('water-mass','Khối lượng nước (g)',90)+
    '<label>Đại lượng<select id="mass-concentration-kind"><option value="percent">Nồng độ phần trăm</option><option value="solubility">Độ tan của mẫu bão hòa</option></select></label>'+
    '<button id="mass-concentration">Tính</button></div>'+result('mass-concentration-result')));
  const resetMassConcentration=()=>{$('mass-concentration-result').textContent='';};
  for(const id of ['solute-mass','water-mass','mass-concentration-kind'])$(id).addEventListener('input',resetMassConcentration);
  $('mass-concentration').onclick=()=>safe(()=>{
    const solute=positive('solute-mass',true),water=positive('water-mass');
    const solubility=$('mass-concentration-kind').value==='solubility';
    const value=100*(solute/(solubility?water:solute+water));
    $('mass-concentration-result').textContent=solubility?'S = '+pretty(value)+' g chất tan/100 g nước':'C% = '+pretty(value)+'%';
  },'mass-concentration-result');
  const titrationPanel=$('titrate').closest('.panel');titrationPanel.querySelector('h2').textContent='Chuẩn độ acid mạnh – base mạnh';
  $('acid-c').parentElement.firstChild.textContent='C dung dịch trong bình (mol/L)';$('acid-v').parentElement.firstChild.textContent='V dung dịch trong bình (mL)';$('base-c').parentElement.firstChild.textContent='C dung dịch trên burette (mol/L)';
  $('titrate').parentElement.insertAdjacentHTML('beforebegin','<label>Chiều chuẩn độ<select id="titration-direction"><option value="base">NaOH trong bình, thêm HCl từ burette</option><option value="acid">HCl trong bình, thêm NaOH từ burette</option></select></label><p class="muted">Mô hình lý tưởng ở 25 °C, thể tích cộng được. Điểm tương đương xác định theo tỉ lượng. Điểm kết thúc nhận biết qua tín hiệu quan sát, ví dụ chất chỉ thị đổi màu. Đồ thị minh họa điểm tương đương.</p>');
  titrationPanel.insertAdjacentHTML('beforeend','<div id="indicator-demo" hidden><label>Chất chỉ thị<select id="indicator-kind"><option value="pp">Phenolphthalein</option><option value="mo">Methyl da cam</option></select></label><label>Thể tích chất chuẩn <input id="indicator-volume" type="range" min="0" max="2000" value="1000"></label><p><span id="indicator-swatch" aria-hidden="true" style="display:inline-block;width:2rem;height:1rem;border:1px solid currentColor"></span> <span id="indicator-reading" role="status"></span></p><p id="indicator-range"></p><p id="indicator-endpoint"></p><button id="indicator-drop" type="button">+ 1 giọt chuẩn (0,05 mL)</button><p>Nét đứt xanh: tương đương. Nét liền hồng: ngưỡng mô phỏng. Hai vạch có thể trùng nhau ở độ phân giải hiện tại.</p><p>Điểm kết thúc thực nghiệm được xác định bằng tín hiệu đổi màu bền theo quy ước của bài thực hành. Thanh kéo biểu diễn màu dự đoán theo pH.</p></div>');
  let titration, dropVolume;
  const updateIndicator=(redraw=false)=>{
    if(!titration)return;
    const pp=$('indicator-kind').value==='pp';
    const [low,high]=pp?[8.2,10]:[3.1,4.4];
    const volume=dropVolume??titration.equivalence*Number($('indicator-volume').value)/1000;
    const ph=titration.pHAt(volume),fraction=Math.max(0,Math.min(1,(ph-low)/(high-low)));
    $('indicator-swatch').style.background=pp?'rgba(221,0,91,'+fraction+')':'hsl('+fraction*55+',90%,48%)';
    const color=pp?(fraction===0?'Không màu':'Hồng'):(fraction===0?'Đỏ':fraction===1?'Vàng':'Da cam');
    $('indicator-reading').textContent=pretty(volume)+' mL · pH '+pretty(ph)+' · '+color;
    if(redraw){
      const baseInFlask=$('titration-direction').value==='base';
      const threshold=pp?(baseInFlask?8.1:8.3):3.75;
      const max=titration.points.at(-1)[0];
      const crossed=baseInFlask?titration.pHAt(0)>=threshold&&titration.pHAt(max)<=threshold:titration.pHAt(0)<=threshold&&titration.pHAt(max)>=threshold;
      let left=0,right=max;
      if(crossed)for(let i=0;i<55;i++){
        const mid=left+(right-left)/2;
        if((titration.pHAt(mid)<threshold)!==baseInFlask)left=mid;else right=mid;
      }
      const endpoint=crossed?left+(right-left)/2:null;
      $('indicator-endpoint').textContent=endpoint===null?'Ngưỡng chỉ thị nằm ngoài đồ thị.':
        'Mốc cắt ngưỡng chỉ thị Vcurve (pH '+pretty(threshold)+'): '+endpoint.toLocaleString('vi-VN',{maximumFractionDigits:6})+
        ' mL · Sai lệch có dấu: '+(endpoint-titration.equivalence).toExponential(3)+' mL.';
      const markers=[{volume:titration.equivalence,color:'#2563eb',dash:true}];
      if(endpoint!==null)markers.push({volume:endpoint,color:'#be185d'});
      plot($('curve'),titration.points,{xLabel:'Thể tích '+(baseInFlask?'HCl':'NaOH')+' (mL)',yLabel:'pH',
        yMin:Math.min(0,...titration.points.map(p=>p[1])),yMax:Math.max(14,...titration.points.map(p=>p[1])),
        band:{low,high,color:pp?'rgba(236,72,153,.16)':'rgba(249,115,22,.16)'},markers});
    }
    $('indicator-range').textContent='Khoảng đổi màu: pH '+pretty(low)+'–'+pretty(high)+'. Điểm tương đương lý thuyết: '+pretty(titration.equivalence)+' mL.';
  };
  $('indicator-kind').onchange=()=>updateIndicator(true);$('indicator-volume').oninput=()=>{dropVolume=undefined;updateIndicator();};
  $('indicator-drop').onclick=()=>{if(!titration)return;const slider=$('indicator-volume'),end=titration.points.at(-1)[0];dropVolume=Math.min(end,(dropVolume??titration.equivalence*Number(slider.value)/1000)+0.05);slider.value=Math.round(dropVolume/titration.equivalence*1000);updateIndicator();};
  const invalidateCurve=()=>{$('curve').hidden=true;$('indicator-demo').hidden=true;titration=null;dropVolume=undefined;$('titration-result').textContent='Dữ kiện đã đổi. Vẽ lại đường cong để cập nhật.';};
  for(const id of ['acid-c','acid-v','base-c'])$(id).addEventListener('input',invalidateCurve);$('titration-direction').onchange=invalidateCurve;
  $('titrate').onclick=()=>safe(()=>{invalidateCurve();const initialKind=$('titration-direction').value,computed=strongTitration({initialKind,c0:positive('acid-c'),v0:positive('acid-v'),cAdded:positive('base-c')});titration=computed;const {equivalence}=computed;$('indicator-demo').hidden=false;$('curve').hidden=false;updateIndicator(true);$('titration-result').textContent='Điểm tương đương tại V '+(initialKind==='base'?'HCl':'NaOH')+' = '+pretty(equivalence)+' mL, pH = 7 ở 25 °C trong mô hình lý tưởng.';},'titration-result');
  const updateKa=()=>{$('ka').disabled=!$('acid-type').value.startsWith('weak-');$('result').textContent='Dữ kiện đã đổi. Tính lại pH.';};$('acid-type').onchange=updateKa;updateKa();for(const id of ['concentration','ka'])$(id).addEventListener('input',()=>{$('result').textContent='Dữ kiện đã đổi. Tính lại pH.';});
  $('buffer').onclick=()=>safe(()=>{const pka=Number($('pka').value);if(!Number.isFinite(pka)||!$('pka').value)throw Error('Nhập pKa hợp lệ.');$('buffer-result').textContent='pH ≈ pKa + log([A⁻]/[HA]) = '+pretty(pka+Math.log10(positive('a-minus')/positive('ha')))+'. Xấp xỉ Henderson–Hasselbalch.';},'buffer-result');
  $('dilute').onclick=()=>safe(()=>{const c1=positive('c1'),c2=positive('c2');if(c2>c1)throw Error('Pha loãng cần C₂ ≤ C₁.');$('dilute-result').textContent='Lấy '+pretty(c2*positive('v2')/c1)+' mL dung dịch ban đầu, thêm dung môi đến tổng thể tích '+$('v2').value+' mL.';},'dilute-result');$('ph').click();$('titrate').click();
  const grade=new URLSearchParams(location.hash.split('?')[1]).get('grade');
  const basic=$('mass-concentration').closest('.panel');
  set(panel('Nồng độ mol và pha chế theo khối lượng',
    '<div class="row">'+number('basic-n','Lượng chất (mol)',0.2)+number('basic-v','Thể tích dung dịch (mL)',500)+
    '<button id="basic-cm">Tính nồng độ mol</button></div><div class="row">'+number('basic-m','Khối lượng dung dịch (g)',200)+
    number('basic-percent','C% theo khối lượng',15)+'<button id="basic-prepare">Tính khối lượng pha</button></div>'+result('basic-cm-result')));
  const concentration=$('basic-cm').closest('.panel');
  $('basic-cm').onclick=()=>safe(()=>{$('basic-cm-result').textContent='C = '+pretty(positive('basic-n',true)*1000/positive('basic-v'))+' mol/L.';},'basic-cm-result');
  $('basic-prepare').onclick=()=>safe(()=>{
    const m=positive('basic-m'),p=positive('basic-percent',true);
    if(p>=100)throw Error('C% phải nhỏ hơn 100%.');
    const solute=m*p/100;
    $('basic-cm-result').textContent='Cân '+pretty(solute)+' g chất tan và '+pretty(m-solute)+' g nước. Kiểm tra độ tan tại nhiệt độ pha.';
  },'basic-cm-result');
  set(panel('Đọc thang pH ở 25 °C','<label>pH <input id="basic-ph" type="range" min="0" max="14" step="0.1" value="7"></label>'+result('basic-ph-result')+
    '<p>Màu chỉ thị vạn năng chỉ minh họa. Quỳ tím có khoảng chuyển màu, nên gần trung tính màu có thể không rõ.</p>'));
  const phReading=$('basic-ph').closest('.panel');
  const updateReading=()=>{
    const value=Number($('basic-ph').value),output=$('basic-ph-result');
    output.textContent='pH '+pretty(value)+' · '+(value<7?'Môi trường acid':value>7?'Môi trường base':'Trung tính')+
      ' · Quỳ: '+(value<=4.5?'đỏ':value>=8.3?'xanh':'trong vùng chuyển màu');
    output.style.borderInlineStart='8px solid hsl('+Math.round(value*19)+',65%,42%)';
  };
  $('basic-ph').oninput=updateReading;
  updateReading();
  const ph=$('ph').closest('.panel'),advanced=[ph,titrationPanel,$('buffer').closest('.panel')];
  const switcher=document.createElement('div');
  switcher.className='row';
  switcher.innerHTML='<button id="solution-grade8">KHTN lớp 8</button><button id="solution-grade11">Hóa học lớp 11</button>';
  ph.before(switcher);
  const school=set=>{[basic,concentration,phReading].forEach(panel=>panel.hidden=!set);advanced.forEach(panel=>panel.hidden=set);$('solution-grade8').setAttribute('aria-pressed',String(set));$('solution-grade11').setAttribute('aria-pressed',String(!set));};
  $('solution-grade8').onclick=()=>school(true);
  $('solution-grade11').onclick=()=>school(false);
  school(grade==='8');

}
function thermo(){
  quotientLab();
  set(panel('Enthalpy phản ứng','<p>Mỗi dòng gồm hệ số, ΔfH° (kJ/mol). Ví dụ sự cháy CH₄.</p><div class="columns"><label>Chất phản ứng<textarea id="enthalpy-left">1, -74.8\n2, 0</textarea></label><label>Sản phẩm<textarea id="enthalpy-right">1, -393.5\n2, -285.8</textarea></label></div><button id="enthalpy" class="primary">Tính ΔrH°</button>'+result())+panel('Cân bằng A ⇌ B','<p>Hệ kín thể tích không đổi, ban đầu chỉ có A. Hệ số hai chất bằng 1.</p><div class="row">'+number('initial-a','[A] ban đầu (M)',1)+number('kc','Kc',4)+'<button id="equilibrium">Lập bảng cân bằng</button></div>'+result('eq-result'))+panel('Tốc độ & nhiệt độ','<div class="row">'+number('activation','Ea (kJ/mol)',50)+number('temp1','T₁ (K)',298)+number('temp2','T₂ (K)',308)+'<button id="arrhenius">Tính k₂/k₁</button></div>'+result('rate-result')));
  $('enthalpy-left').parentElement.parentElement.insertAdjacentHTML('beforebegin','<p class="muted">Dữ liệu mẫu tại khoảng 298 K: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l). Đổi trạng thái nước thành hơi cần đổi ΔfH°. Khi nhập riêng hệ số và số liệu, công cụ chưa tự kiểm tra cân bằng nguyên tố.</p>');
  $('enthalpy').onclick=()=>safe(()=>{const h=enthalpyDelta($('enthalpy-left').value,$('enthalpy-right').value);$('result').innerHTML='<div class="formula">ΔrH° = '+pretty(h)+' kJ/mol phản ứng</div><p>'+(h<0?'Phản ứng tỏa nhiệt.':h>0?'Phản ứng thu nhiệt.':'Enthalpy không đổi theo dữ liệu nhập.')+'</p>';});
  const equilibriumNumber=n=>n!==0&&(Math.abs(n)<1e-6||Math.abs(n)>=1e9)?n.toExponential(5):pretty(n);
  $('equilibrium').onclick=()=>safe(()=>{const a=positive('initial-a'),k=positive('kc'),{reactant,product}=simpleEquilibrium(a,k);$('eq-result').innerHTML=table(['Trạng thái','[A]','[B]'],[['Ban đầu',equilibriumNumber(a),0],['Biến thiên','−'+equilibriumNumber(product),'+'+equilibriumNumber(product)],['Cân bằng',equilibriumNumber(reactant),equilibriumNumber(product)]])+'<p>Kc = [B]/[A] = '+equilibriumNumber(k)+'</p>';},'eq-result');
  for(const id of ['enthalpy-left','enthalpy-right'])$(id).oninput=()=>{$('result').textContent='Dữ kiện đã đổi. Tính lại enthalpy.';};
  for(const id of ['initial-a','kc'])$(id).oninput=()=>{$('eq-result').textContent='Dữ kiện đã đổi. Lập lại bảng cân bằng.';};
  for(const id of ['activation','temp1','temp2'])$(id).oninput=()=>{$('rate-result').textContent='Dữ kiện đã đổi. Tính lại tỉ số tốc độ.';};
  $('arrhenius').onclick=()=>safe(()=>{const ratio=Math.exp(positive('activation',true)*1000/8.314462618*(1/positive('temp1')-1/positive('temp2')));if(!Number.isFinite(ratio))throw Error('Kết quả vượt miền biểu diễn.');$('rate-result').textContent='k₂/k₁ = exp[Ea/R × (1/T₁ − 1/T₂)] = '+pretty(ratio);},'rate-result');$('enthalpy').click();$('equilibrium').click();$('arrhenius').click();
}
export const reactionHandlers={equation,ionic,electro,electrolysis,solution,thermo};


