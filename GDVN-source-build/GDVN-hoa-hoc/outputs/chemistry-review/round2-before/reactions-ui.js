/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {setupLimitingReagent} from './stoichiometry-ui.js';
import {strongTitration} from './titration.js';
import {reactions,potentials} from './data.js';
import {escapeHTML as esc,formatFormula as formula,parseFormula,molarMass,balanceEquation,solutionPH,pretty} from './chemistry.js';
import {plot,download} from './visuals.js';
import {$,opt,panel,result,number,safe,positive,set,table,textSVG,toast} from './modules.js';
function equation(){
  set(panel('Cân bằng tự động','<div class="row"><label class="grow">Phương trình<input id="equation-input" value="Fe + O2 -> Fe2O3"></label><button id="balance" class="primary">Cân bằng</button></div><p class="muted">Hỗ trợ ngoặc, hydrate và ion. Với ion, viết Fe^3+ + e^- -> Fe^2+ và dùng khoảng trắng quanh dấu + ngăn các chất.</p>'+result()+'<div class="row"><button id="copy-equation">Chép phương trình</button><button id="svg-equation">Xuất SVG</button></div><div id="conservation"></div>')+panel('Tính theo phương trình','<div class="row"><label>Chất đã biết<select id="known"></select></label>'+number('amount','Lượng đã biết',10)+'<label>Đơn vị<select id="unit"><option>g</option><option>mol</option></select></label>'+number('yield','Hiệu suất (%)',100)+'<button id="stoich" class="primary">Tính</button></div>'+result('stoich-result'))+panel('Khối lượng mol & thành phần','<div class="row"><input id="mass-formula" value="Ca3(PO4)2" aria-label="Công thức hóa học"><button id="mass-button">Tính khối lượng mol</button></div>'+result('mass-result')));
  let balanced; const updateLimiting=setupLimitingReagent();
  function run(){updateLimiting(null);balanced=null;$('known').innerHTML='';$('stoich-result').textContent='';const b=balanceEquation($('equation-input').value);balanced=b;updateLimiting(b);$('result').innerHTML='<div class="formula">'+formula(b.text)+'</div>';$('known').innerHTML=opt(b.all);$('conservation').innerHTML=table(['Nguyên tố / điện tích','Vế trái','Vế phải'],b.symbols.map(s=>{const count=(a,z)=>b.parsed.slice(a,z).reduce((sum,p,j)=>sum+b.coefficients[a+j]*(s==='charge'?p.charge:p.atoms[s]||0),0);return [s,count(0,b.split),count(b.split,b.all.length)];}));}
  $('balance').onclick=()=>safe(run);$('equation-input').onkeydown=e=>{if(e.key==='Enter')safe(run);};$('equation-input').oninput=()=>{balanced=null;};
  $('stoich').onclick=()=>safe(()=>{if(!balanced)throw Error('Hãy cân bằng phương trình hiện tại trước.');const index=Number($('known').value),amount=positive('amount'),eff=positive('yield');if(eff>100)throw Error('Hiệu suất không vượt quá 100%.');if(index>=balanced.split&&eff!==100)throw Error('Khi nhập lượng sản phẩm, đặt hiệu suất 100% để tính tỉ lượng.');const m=molarMass(balanced.all[index]);if(m===0&&$('unit').value==='g')throw Error('Electron cần nhập theo mol.');const mol=$('unit').value==='g'?amount/m:amount;const extent=mol/balanced.coefficients[index];$('stoich-result').innerHTML='<p>Giả định các chất phản ứng khác đủ hoặc dư.</p>'+table(['Chất','Số mol','Khối lượng (g)'],balanced.all.map((c,i)=>{const n=extent*balanced.coefficients[i]*(i>=balanced.split?eff/100:1);return [esc(c),pretty(n),pretty(n*molarMass(c))];}));},'stoich-result');
  $('mass-button').onclick=()=>safe(()=>{const f=$('mass-formula').value,m=molarMass(f),atoms=parseFormula(f).atoms;$('mass-result').innerHTML='<b>M = '+pretty(m)+' g/mol</b>'+table(['Nguyên tố','Số nguyên tử','% khối lượng'],Object.entries(atoms).map(([s,n])=>[s,n,pretty(100*n*molarMass(s)/m)]));},'mass-result');
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
  $('cell').onclick=()=>safe(()=>{const a=potentials[Number($('electrode-a').value)],b=potentials[Number($('electrode-b').value)];if(a===b)throw Error('Chọn hai cặp điện cực khác nhau.');const cathode=a[3]>b[3]?a:b,anode=a[3]>b[3]?b:a,n=positive('electron-n');if(!Number.isInteger(n))throw Error('n là số nguyên dương.');const t=positive('temperature'),q=positive('quotient'),e0=cathode[3]-anode[3],e=e0-8.314462618*t/(n*96485.33212)*Math.log(q);$('result').innerHTML='<div class="formula">E° = '+pretty(e0)+' V &nbsp; E = '+pretty(e)+' V</div><p>Anode (oxi hóa) '+anode[0]+' · Cathode (khử) '+cathode[0]+'</p><p>ΔG = −nFE = '+pretty(-n*96485.33212*e/1000)+' kJ/mol phản ứng.</p><p>'+(e>0?'Chiều đã chọn thuận lợi về nhiệt động.':'Chiều đã chọn không có E dương tại điều kiện nhập.')+'</p>';});$('cell').click();
}
function electrolysis(){
  const systems=[
    ['CuSO₄ dung dịch · điện cực trơ','Cu²⁺ + 2e⁻ → Cu','2H₂O → O₂ + 4H⁺ + 4e⁻','2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄','Cu bám đỏ nâu','O₂ thoát ra','Cu²⁺ giảm, màu xanh nhạt dần. Dung dịch tăng tính axit.','cell','#63bde7','#bc6741','O₂'],
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
  const controls='<div class="row"><label>Hệ điện phân<select id="system">'+opt(systems.map(s=>s[0]))+'</select></label><label>Anot<select id="electro-anode"><option value="">Than chì / Pt</option><option>Cu</option><option>Ag</option><option>Ni</option><option>Zn</option><option>Fe</option></select></label><button id="electro-start" class="primary">Bật dòng điện</button><button id="electro-reset">Làm lại</button></div>';
  set('<section class="electro-simulation"><div class="electro-left"><div class="electro-card"><h2>Thiết lập thí nghiệm</h2>'+controls+'<p id="electro-status" role="status"></p></div><div class="electro-card"><h2>Sơ đồ bình điện phân</h2><div id="electro-cell"></div><div class="row electro-view"><button id="electro-view-left">Nghiêng trái</button><button id="electro-view-center">Nhìn thẳng</button><button id="electro-view-right">Nghiêng phải</button><button id="electro-svg">Tải SVG</button></div></div></div><div id="electro-detail"></div></section>'+
panel('Định luật Faraday','<div class="row"><label>Kim loại bám cathode<select id="metal">'+opt(potentials.filter(p=>p[1]!=='H').map(p=>p[1]))+'</select></label>'+number('current','Cường độ I (A)',2)+number('time','Thời gian (phút)',30)+number('efficiency','Hiệu suất dòng (%)',100)+'<button id="faraday" class="primary">Tính lượng chất</button></div>'+result()+'<p class="muted">Tính lượng kim loại giả định phản ứng khử ion kim loại xảy ra. Các kim loại hoạt động mạnh cần môi trường nóng chảy thích hợp.</p>')+panel('Mạ điện','<div class="row">'+number('area','Diện tích mạ (cm²)',100)+number('density','Khối lượng riêng (g/cm³)',8.96)+'<button id="thickness">Tính độ dày</button></div>'+result('thickness-result')));
  function draw(running){
    let [name,cathode,anode,total,left,right,note,kind,color,metal,gasRight,gasLeft,customIons]=systems[Number($('system').value)];
    const active=$('electro-anode').value;
    const compatible=kind==='cell'&&cathode.endsWith('→ '+active)&&Boolean(active);
    const activeMismatch=active&&!compatible;
    if(compatible){
      const electrons=active==='Ag'?'e⁻':'2e⁻';
      const ion=active==='Ag'?'Ag⁺':active+'²⁺';
      anode=active+' → '+ion+' + '+electrons;
      total=active+' (anot) → '+active+' (catot)';
      right='Anot '+active+' tan';gasRight='';
      note='Mô hình anot tan cùng kim loại với ion trong dung dịch. Bỏ qua phản ứng cạnh tranh.';
    }
    if(activeMismatch){
      running=false;
      anode='Cần dữ liệu điều kiện cho tổ hợp này';
      cathode='Chưa xác định trong mô hình';
      total='Chưa có phương trình cho tổ hợp đã chọn';
      left=right='Chưa mô phỏng';
      note='Chọn anot trơ hoặc anot tan cùng kim loại với ion được mạ. Tổ hợp khác có thể có phản ứng phụ hoặc thụ động hóa.';
    }
    const aluminium=name.startsWith('Al₂O₃');
    const cell=$('electro-cell');
    cell.dataset.running=String(running);
    cell.dataset.membrane=String(name.startsWith('Nước muối')||name.startsWith('NaCl nóng'));
    const index=Number($('system').value);
    $('electro-anode').options[0].textContent=index===5?'Carbon (anot tiêu hao)':index===1?'Cu (anot tan theo hệ)':'Điện cực trơ theo mô hình';
    const ions=customIons||[['Cu²⁺','SO₄²⁻'],['Cu²⁺','SO₄²⁻'],['Na⁺','Cl⁻'],['Na⁺','Cl⁻'],[],['Al³⁺','O²⁻'],['Ag⁺','NO₃⁻']][index];
    const divided=cell.dataset.membrane==='true';
    const positions=divided?[[265,196],[324,211],[260,227],[330,241]]:[[254,196],[310,211],[302,227],[262,241]];
    const particles=ions.length?positions.map(([x,y],i)=>{
      const negative=i%2===1;
      return '<g class="electro-ion '+(negative?'electro-anion':'electro-cation')+'" style="--ion-delay:'+(-i*.54)+'s;--ion-drift:'+(negative?24:-(divided?29:Math.min(69,x-233)))+'px"><circle cx="'+x+'" cy="'+y+'" r="10" fill="'+(negative?'#286bd8':'#db3b43')+'"/><text x="'+x+'" y="'+(y+3)+'" text-anchor="middle" fill="white" font-size="8">'+ions[i%2]+'</text></g>';
    }).join(''):'';
    const gas=(x,label)=>label?'<g class="electro-product electro-gas"><text x="'+x+'" y="118" text-anchor="middle" fill="#162134">'+label+'↑</text><g fill="#fff" opacity=".8"><circle cx="'+(x+8)+'" cy="248" r="5"/><circle cx="'+(x-7)+'" cy="221" r="5"/><circle cx="'+(x+9)+'" cy="177" r="4"/></g></g>':'';
    const colouredProduct=index>=7&&/Bromine|Iodine|PbO₂/.test(right)?'<ellipse class="electro-product" cx="366" cy="223" rx="23" ry="30" fill="#8c4b25" opacity=".72"/>':'';
    const coating=aluminium?'<path class="electro-product" d="M139 279h306v12H139z" fill="#b0bdca"/>':metal?'<rect class="electro-product" x="202" y="230" width="40" height="14" rx="2" fill="'+metal+'"/>':'';
    const anodeColor=compatible||index===1?'#a96448':'url(#electro-rod)';
    cell.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 584 342" role="img" aria-label="'+esc(name)+'" font-family="system-ui,sans-serif" font-size="13" fill="#142034">'
      +'<defs><linearGradient id="electro-depth" x2="0" y2="1"><stop stop-color="#d8f5ff" stop-opacity=".15"/><stop offset="1" stop-color="#163d67" stop-opacity=".42"/></linearGradient><linearGradient id="electro-rod"><stop stop-color="#65788e"/><stop offset=".38" stop-color="#38495f"/><stop offset="1" stop-color="#1b283b"/></linearGradient></defs><rect width="584" height="342" rx="14" fill="#edf2f8"/><ellipse cx="306" cy="302" rx="178" ry="16" fill="#8ca7bb" opacity=".25"/><text x="292" y="26" text-anchor="middle" font-weight="750">'+esc(name)+'</text>'
      +'<path d="M222 68V56h45m45 0h50v12" fill="none" stroke="#47566a" stroke-width="3"/><path d="M268 44v24m7-16v8m34-16v24m7-16v8" stroke="#182436" stroke-width="4"/><text x="262" y="40" fill="#2563eb">−</text><text x="321" y="40" fill="#e32732">+</text><text x="115" y="58">← e⁻</text><text x="427" y="58">e⁻ →</text>'
      +'<path d="M132 146l26-16h320l-26 16z" fill="#d6edf8" stroke="#66869f" stroke-width="2"/><path d="M452 146l26-16v140q0 9-8 14l-21 13z" fill="#abcfe3" stroke="#66869f" stroke-width="2"/><path d="M132 146h320v141q0 12-13 12H145q-13 0-13-12z" fill="#f7fafc" stroke="#47566a" stroke-width="3"/><path class="electro-liquid" d="M135 166h314v121q0 9-10 9H145q-10 0-10-9z" fill="'+color+'"/><path d="M135 166l24-13h316l-26 13z" fill="'+color+'" opacity=".63"/><path d="M135 166h314v121q0 9-10 9H145q-10 0-10-9z" fill="url(#electro-depth)"/><path d="M142 174v98m299-98v98" stroke="#e9faff" stroke-width="4" opacity=".65"/>'
      +'<path class="electro-membrane" d="M292 146v150" stroke="#eef7fc" stroke-width="3"/>'+(!aluminium?'<path d="M207 66l9-7h30l-9 7v190l9-7V59" fill="#26374b"/><rect x="207" y="66" width="30" height="190" rx="3" fill="url(#electro-rod)"/>':'<path d="M222 68v70H134v153h24" stroke="#343e4d" stroke-width="5" fill="none"/>')
      +'<rect x="347" y="66" width="30" height="190" rx="3" fill="'+anodeColor+'"/>'+particles+coating+colouredProduct+gas(222,gasLeft)+gas(362,gasRight)
      +'<text x="222" y="319" fill="#2563eb" text-anchor="middle" font-weight="750">'+(aluminium?'ĐÁY BỂ (−)':'CATOT (−)')+'</text><text x="362" y="319" fill="#d92f39" text-anchor="middle" font-weight="750">ANOT (+)</text><text x="222" y="333" text-anchor="middle" font-size="10">xảy ra sự khử</text><text x="362" y="333" text-anchor="middle" font-size="10">xảy ra sự oxi hóa</text></svg>';
    cell.style.setProperty('--electro-liquid',color);
    cell.classList.toggle('electro-copper',running&&!compatible&&Number($('system').value)===0);
    $('electro-detail').innerHTML='<div class="electro-card"><h2>Các quá trình ở điện cực</h2><b class="electro-negative">Catot (−) · Sự khử</b><p class="electro-equation">'+esc(cathode)+'</p><b class="electro-positive">Anot (+) · Sự oxi hóa</b><p class="electro-equation">'+esc(anode)+'</p></div><div class="electro-card"><h2>Phương trình điện phân</h2><p class="electro-equation">'+esc(total)+'</p></div><div class="electro-card"><h2>Hiện tượng & kết quả</h2><p><b>Ở catot</b> '+esc(left)+'</p><p><b>Ở anot</b> '+esc(right)+'</p><p>'+esc(note)+'</p></div>';

    $('electro-status').textContent=running?'Đang chạy. Cation hướng về catot (−), anion hướng về anot (+). Ion đi về cực không nhất thiết bị phóng điện.':'Chọn hệ rồi bật dòng điện để quan sát sản phẩm.';
    $('electro-start').disabled=running||Boolean(activeMismatch);
  }
  function changeSystem(){draw(false);}
  $('system').onchange=$('electro-anode').onchange=changeSystem;
  $('electro-reset').onclick=()=>draw(false);
  $('electro-start').onclick=()=>{
    const cell=$('electro-cell');
    cell.dataset.running='true';
    cell.classList.toggle('electro-copper',Number($('system').value)===0&&!$('electro-anode').value);
    $('electro-status').textContent='Đang minh họa sản phẩm tại hai điện cực.';
    $('electro-start').disabled=true;
  };
  for(const [id,angle] of [['electro-view-left',-15],['electro-view-center',0],['electro-view-right',15]]){
    $(id).onclick=()=> $('electro-cell').style.setProperty('--electro-angle',angle+'deg');
  }
  $('electro-svg').onclick=()=>{
    const svg=$('electro-cell').querySelector('svg').cloneNode(true);
    if($('electro-cell').dataset.membrane!=='true')svg.querySelector('.electro-membrane').remove();
    if($('electro-cell').dataset.running!=='true')svg.querySelectorAll('.electro-product').forEach(node=>node.remove());
    download('GDVN-dien-phan.svg',svg.outerHTML,'image/svg+xml');
  };
  const metals=potentials.filter(p=>p[1]!=='H');$('metal').value='7';let mass=null;
  function run(){const metal=metals[Number($('metal').value)],i=positive('current'),t=positive('time')*60,eff=positive('efficiency');if(eff>100)throw Error('Hiệu suất không vượt 100%.');const electrons=i*t/96485.33212;mass=electrons/metal[2]*molarMass(metal[1])*eff/100;$('result').innerHTML='<div class="formula">m = '+pretty(mass)+' g '+metal[1]+'</div><p>Q = '+pretty(i*t)+' C · n(e) = '+pretty(electrons)+' mol · m = MItη/(nF)</p>';}
  $('faraday').onclick=()=>safe(run);['metal','current','time','efficiency'].forEach(id=>$(id).oninput=()=>{mass=null;$('thickness-result').textContent='';});
  $('thickness').onclick=()=>safe(()=>{if(mass===null)throw Error('Hãy tính lại khối lượng với các giá trị hiện tại.');$('thickness-result').textContent='Độ dày δ = m/(ρS) = '+pretty(mass/(positive('area')*positive('density'))*1e4)+' µm';},'thickness-result');
  safe(run);
  draw(false);
}
function solution(){
  set(panel('Tính pH ở 25 °C','<div class="row"><label>Dung dịch<select id="acid-type"><option value="strong-acid">Axit mạnh một nấc</option><option value="strong-base">Bazơ mạnh một nấc</option><option value="weak-acid">Axit yếu một nấc</option><option value="weak-base">Bazơ yếu một nấc</option></select></label>'+number('concentration','Nồng độ C (mol/L)',.01)+number('ka','Ka hoặc Kb',.000018)+'<button id="ph" class="primary">Tính pH</button></div>'+result()+'<div class="ph-scale">'+Array.from({length:15},(_,i)=>'<span style="background:hsl('+i*19+',70%,40%)">'+i+'</span>').join('')+'</div><p class="muted">Dung dịch lý tưởng có xét sự tự ion hóa của nước, bỏ qua hệ số hoạt độ.</p>')+panel('Chuẩn độ HCl bằng NaOH','<div class="row">'+number('acid-c','C HCl (mol/L)',.1)+number('acid-v','V HCl (mL)',25)+number('base-c','C NaOH (mol/L)',.1)+'<button id="titrate">Vẽ đường cong</button></div><canvas class="science-chart" id="curve" aria-label="Đường cong chuẩn độ HCl bằng NaOH"></canvas>'+result('titration-result'))+panel('Dung dịch đệm & pha loãng','<div class="columns"><div><h3>Đệm HA/A⁻</h3><div class="row">'+number('pka','pKa',4.76)+number('ha','[HA] (M)',.1)+number('a-minus','[A⁻] (M)',.1)+'<button id="buffer">Tính pH đệm</button></div>'+result('buffer-result')+'</div><div><h3>C₁V₁ = C₂V₂</h3><div class="row">'+number('c1','C₁ (M)',1)+number('c2','C₂ (M)',.1)+number('v2','V₂ (mL)',100)+'<button id="dilute">Tính V₁</button></div>'+result('dilute-result')+'</div></div>'));
  $('ph').onclick=()=>safe(()=>{const c=positive('concentration',true);$('result').innerHTML='<div class="formula">pH = '+pretty(solutionPH($('acid-type').value,c,$('acid-type').value.startsWith('weak-')?positive('ka'):1.8e-5))+'</div><p class="muted">'+(c>0.1?'Đây là giá trị theo mô hình nồng độ lý tưởng; dung dịch đậm đặc cần xét hoạt độ, không coi là số đo thực.':'Giá trị trong mô hình dung dịch lý tưởng ở 25 °C.')+'</p>';});
  const titrationPanel=$('titrate').closest('.panel');titrationPanel.querySelector('h2').textContent='Chuẩn độ acid mạnh – base mạnh';
  $('acid-c').parentElement.firstChild.textContent='C dung dịch trong bình (mol/L)';$('acid-v').parentElement.firstChild.textContent='V dung dịch trong bình (mL)';$('base-c').parentElement.firstChild.textContent='C dung dịch trên burette (mol/L)';
  $('titrate').parentElement.insertAdjacentHTML('beforebegin','<label>Chiều chuẩn độ<select id="titration-direction"><option value="base">NaOH trong bình, thêm HCl từ burette</option><option value="acid">HCl trong bình, thêm NaOH từ burette</option></select></label><p class="muted">Mô hình lý tưởng ở 25 °C, thể tích cộng được. Đồ thị không thay cho kỹ năng thao tác, đọc burette hoặc chọn điểm kết thúc bằng chỉ thị.</p>');
  const invalidateCurve=()=>{$('curve').hidden=true;$('titration-result').textContent='Dữ kiện đã đổi. Vẽ lại đường cong để cập nhật.';};
  for(const id of ['acid-c','acid-v','base-c'])$(id).addEventListener('input',invalidateCurve);$('titration-direction').onchange=invalidateCurve;
  $('titrate').onclick=()=>safe(()=>{invalidateCurve();const initialKind=$('titration-direction').value,{equivalence,points}=strongTitration({initialKind,c0:positive('acid-c'),v0:positive('acid-v'),cAdded:positive('base-c')});$('curve').hidden=false;plot($('curve'),points,{xLabel:'V '+(initialKind==='base'?'HCl':'NaOH')+' (mL)',yLabel:'pH',yMin:Math.min(0,...points.map(p=>p[1])),yMax:Math.max(14,...points.map(p=>p[1]))});$('titration-result').textContent='Điểm tương đương tại V '+(initialKind==='base'?'HCl':'NaOH')+' = '+pretty(equivalence)+' mL, pH = 7 ở 25 °C trong mô hình lý tưởng.';},'titration-result');
  const updateKa=()=>{$('ka').disabled=!$('acid-type').value.startsWith('weak-');$('result').textContent='Dữ kiện đã đổi. Tính lại pH.';};$('acid-type').onchange=updateKa;updateKa();for(const id of ['concentration','ka'])$(id).addEventListener('input',()=>{$('result').textContent='Dữ kiện đã đổi. Tính lại pH.';});
  $('buffer').onclick=()=>safe(()=>{const pka=Number($('pka').value);if(!Number.isFinite(pka)||!$('pka').value)throw Error('Nhập pKa hợp lệ.');$('buffer-result').textContent='pH ≈ pKa + log([A⁻]/[HA]) = '+pretty(pka+Math.log10(positive('a-minus')/positive('ha')))+'. Xấp xỉ Henderson–Hasselbalch.';},'buffer-result');
  $('dilute').onclick=()=>safe(()=>{const c1=positive('c1'),c2=positive('c2');if(c2>c1)throw Error('Pha loãng cần C₂ ≤ C₁.');$('dilute-result').textContent='Lấy '+pretty(c2*positive('v2')/c1)+' mL dung dịch ban đầu, thêm dung môi đến tổng thể tích '+$('v2').value+' mL.';},'dilute-result');$('ph').click();$('titrate').click();
}
function thermo(){
  set(panel('Enthalpy phản ứng','<p>Mỗi dòng gồm hệ số, ΔfH° (kJ/mol). Ví dụ sự cháy CH₄.</p><div class="columns"><label>Chất phản ứng<textarea id="enthalpy-left">1, -74.8\n2, 0</textarea></label><label>Sản phẩm<textarea id="enthalpy-right">1, -393.5\n2, -285.8</textarea></label></div><button id="enthalpy" class="primary">Tính ΔrH°</button>'+result())+panel('Cân bằng A ⇌ B','<p>Hệ kín thể tích không đổi, ban đầu chỉ có A. Hệ số hai chất bằng 1.</p><div class="row">'+number('initial-a','[A] ban đầu (M)',1)+number('kc','Kc',4)+'<button id="equilibrium">Lập bảng cân bằng</button></div>'+result('eq-result'))+panel('Tốc độ & nhiệt độ','<div class="row">'+number('activation','Ea (kJ/mol)',50)+number('temp1','T₁ (K)',298)+number('temp2','T₂ (K)',308)+'<button id="arrhenius">Tính k₂/k₁</button></div>'+result('rate-result')));
  $('enthalpy').onclick=()=>safe(()=>{function sum(id){return $(id).value.trim().split('\n').reduce((total,line)=>{const values=line.split(',').map(Number);if(values.length!==2||values.some(x=>!Number.isFinite(x))||values[0]<=0)throw Error('Mỗi dòng cần hệ số dương, enthalpy. Dùng dấu chấm cho phần thập phân.');return total+values[0]*values[1];},0);}const h=sum('enthalpy-right')-sum('enthalpy-left');$('result').innerHTML='<div class="formula">ΔrH° = '+pretty(h)+' kJ/mol phản ứng</div><p>'+(h<0?'Phản ứng tỏa nhiệt.':h>0?'Phản ứng thu nhiệt.':'Enthalpy không đổi theo dữ liệu nhập.')+'</p>';});
  $('equilibrium').onclick=()=>safe(()=>{const a=positive('initial-a'),k=positive('kc'),x=a*k/(1+k);$('eq-result').innerHTML=table(['Trạng thái','[A]','[B]'],[['Ban đầu',a,0],['Biến thiên','−'+pretty(x),'+'+pretty(x)],['Cân bằng',pretty(a-x),pretty(x)]])+'<p>Kc = [B]/[A] = '+pretty(k)+'</p>';},'eq-result');
  $('arrhenius').onclick=()=>safe(()=>{const ratio=Math.exp(positive('activation',true)*1000/8.314462618*(1/positive('temp1')-1/positive('temp2')));if(!Number.isFinite(ratio))throw Error('Kết quả vượt miền biểu diễn.');$('rate-result').textContent='k₂/k₁ = exp[Ea/R × (1/T₁ − 1/T₂)] = '+pretty(ratio);},'rate-result');$('enthalpy').click();$('equilibrium').click();$('arrhenius').click();
}
export const reactionHandlers={equation,ionic,electro,electrolysis,solution,thermo};


