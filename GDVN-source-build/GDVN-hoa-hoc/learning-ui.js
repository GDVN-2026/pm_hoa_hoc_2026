/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {setupCAS} from './advanced-ui.js';
import {curriculumTopics} from './curriculum-topics.js';
import {routes} from './tool-catalog.js';
import {concepts} from './data.js';
import {normalize,escapeHTML as esc,calculate,pretty} from './chemistry.js';
import {download} from './visuals.js';
import {$,opt,panel,result,number,safe,positive,set,table,textSVG} from './modules.js';
function separation(){
  const lessons=[
  ['Lọc','Tách chất rắn không tan khỏi chất lỏng.',['Chọn hỗn hợp cát và nước.','Đặt giấy lọc vào phễu.','Cho hỗn hợp qua giấy lọc.','So sánh cát giữ lại với nước lọc.']],
  ['Cô cạn','Loại dung môi để thu chất tan phù hợp.',['Chọn ví dụ nước muối.','Quan sát nước bay hơi trong mô hình.','So sánh thể tích trước và sau.','Nhận diện chất rắn còn lại.']],
  ['Tách bằng nam châm','Tách vật liệu bị hút mạnh khỏi vật liệu ít bị hút.',['Chọn hỗn hợp mạt sắt và cát khô.','Đưa nam châm lại gần mẫu.','Quan sát mạt sắt dịch chuyển.','Giải thích vì sao cát vẫn ở lại.']],
  ['Chưng cất','Dựa trên sự khác nhau về độ bay hơi.',['Lắp bình chứa hỗn hợp, nhiệt kế và sinh hàn.','Đun đều và theo dõi nhiệt độ hơi.','Dẫn hơi qua sinh hàn, nước làm mát đi từ dưới lên.','Thu phân đoạn theo khoảng nhiệt độ phù hợp.']],
  ['Chiết lỏng – lỏng','Chất tan phân bố giữa hai dung môi hầu như không trộn lẫn.',['Cho dung dịch và dung môi chiết vào phễu.','Đảo nhẹ và xả áp phù hợp.','Để yên cho hai lớp phân tách.','Tháo lớp dưới, thu riêng hai pha.']],
  ['Kết tinh lại','Dựa vào sự thay đổi độ tan theo nhiệt độ.',['Hòa tan chất rắn trong lượng dung môi nóng thích hợp.','Lọc nóng để tách tạp chất không tan.','Làm nguội chậm để tinh thể hình thành.','Lọc, rửa tinh thể bằng ít dung môi lạnh, làm khô.']],
  ['Thăng hoa','Một số chất rắn chuyển trực tiếp sang hơi rồi ngưng tụ thành rắn.',['Cho mẫu vào dụng cụ thích hợp.','Đun nhẹ trong hệ kiểm soát.','Hơi tiếp xúc bề mặt lạnh.','Thu tinh thể trên bề mặt lạnh.']],
  ['Sắc ký','Các cấu tử có ái lực khác nhau với pha tĩnh và pha động.',['Chấm mẫu nhỏ trên vạch xuất phát.','Đặt bản vào dung môi, vết mẫu nằm trên mức dung môi.','Để dung môi di chuyển qua pha tĩnh.','Đánh dấu mức dung môi và xác định vị trí các vết.']]
  ];
  set(panel('Quy trình thực hành','<div class="row"><label>Phương pháp<select id="method">'+opt(lessons.map(l=>l[0]))+'</select></label><button id="previous">← Bước trước</button><button id="next">Bước tiếp →</button></div>'+result()+'<div id="steps"></div>')+panel('Hiệu quả chiết','<p>K = C hữu cơ / C nước. Mỗi lần dùng dung môi hữu cơ mới, thể tích pha không đổi.</p><div class="row">'+number('partition','Hệ số phân bố K',3)+number('water-volume','V pha nước (mL)',100)+number('organic-volume','V dung môi mỗi lần (mL)',20)+number('extract-count','Số lần chiết',3,1)+'<button id="extract">Tính</button></div>'+result('extract-result'))+panel('Hệ số lưu giữ sắc ký','<div class="row">'+number('spot','Quãng đường vết (cm)',3)+number('front','Quãng đường dung môi (cm)',5)+'<button id="rf">Tính Rf</button></div>'+result('rf-result')));
  set(panel('Ví dụ: Tách cát, muối và nước','<p>Lọc để giữ lại cát không tan. Chưng cất phần nước muối để thu nước ngưng tụ. Kết tinh muối từ dung dịch còn lại.</p><p><a href="#studio">Xem sơ đồ chưng cất trong Thiết kế bố trí →</a></p>'));
  let step=0;function render(){const l=lessons[Number($('method').value)];$('result').innerHTML='<b>'+l[0]+'</b><p>'+l[1]+'</p><div class="formula">Bước '+(step+1)+' / 4</div><p>'+l[2][step]+'</p><div class="bar"><span style="width:'+((step+1)*25)+'%"></span></div>';$('previous').disabled=step===0;$('next').disabled=step===3;$('steps').innerHTML=l[2].map((s,i)=>'<p class="'+(i===step?'':'muted')+'">'+(i<step?'✓':i+1)+'. '+s+'</p>').join('');}
  $('method').onchange=()=>{step=0;render();};$('previous').onclick=()=>{step--;render();};$('next').onclick=()=>{step++;render();};
  $('extract').onclick=()=>safe(()=>{const k=positive('partition'),v=positive('water-volume'),o=positive('organic-volume'),n=positive('extract-count');if(!Number.isInteger(n)||n>100)throw Error('Số lần chiết phải là số nguyên từ 1 đến 100.');$('extract-result').textContent='Tỉ lệ đã chiết = '+pretty(100*(1-(v/(v+k*o))**n))+'%. Tổng dung môi '+pretty(n*o)+' mL.';},'extract-result');
  $('rf').onclick=()=>safe(()=>{const spot=positive('spot',true),front=positive('front');if(spot>front)throw Error('Vết không thể đi xa hơn mặt dung môi.');$('rf-result').textContent='Rf = '+pretty(spot/front);},'rf-result');render();
}
function mechanism(){
  const items=[
  ['Thế gốc tự do SR','CH₄ + Cl₂ → CH₃Cl + HCl',['Khơi mào · Cl₂ —ánh sáng→ 2Cl•. Liên kết Cl–Cl phân cắt đồng li.','Phát triển · Cl• + CH₄ → HCl + •CH₃.','Phát triển · •CH₃ + Cl₂ → CH₃Cl + Cl•.','Tắt mạch · Hai gốc tự do kết hợp, ví dụ •CH₃ + Cl• → CH₃Cl.']],
  ['Cộng electrophile AE','CH₂=CH₂ + HBr → CH₃CH₂Br',['Liên kết π của alkene tương tác với H⁺.','H gắn vào carbon, tạo carbocation theo mô hình giản lược.','Br⁻ cho cặp electron vào carbocation hình thành liên kết C–Br.']],
  ['Thế nucleophile SN2','CH₃Br + OH⁻ → CH₃OH + Br⁻',['OH⁻ tiếp cận carbon từ phía đối diện nhóm Br.','Liên kết C–O hình thành đồng thời liên kết C–Br đứt.','Tạo alcohol và Br⁻. Tốc độ phụ thuộc cơ chất và nucleophile.']],
  ['Thế nucleophile SN1','(CH₃)₃CBr + H₂O → (CH₃)₃COH + HBr',['Liên kết C–Br phân cắt dị li, tạo carbocation và Br⁻.','H₂O tấn công carbocation, tạo ion oxonium.','Tách proton tạo alcohol. Bước tạo carbocation thường quyết định tốc độ.']],
  ['Tách E2','CH₃CH₂Br + OH⁻ → CH₂=CH₂ + H₂O + Br⁻',['Bazơ lấy proton ở carbon β.','Đồng thời hình thành liên kết π và Br rời đi.','Cấu dạng anti-periplanar thuận lợi cho quá trình tách.']],
  ['Tách E1','Alcohol bậc ba → alkene + H₂O',['Proton hóa nhóm OH trong môi trường axit.','H₂O rời đi tạo carbocation.','Tách proton ở carbon kề bên tạo liên kết đôi.']],
  ['Thế electrophile thơm','C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O',['Hỗn hợp axit tạo electrophile NO₂⁺.','Hệ π của benzene tấn công NO₂⁺, tạo phức sigma.','Tách proton, khôi phục tính thơm của vòng.']],
  ['Cộng nucleophile AN','R₂C=O + HCN ⇌ R₂C(OH)CN',['CN⁻ tấn công carbon của nhóm C=O.','Electron π chuyển về oxygen, hình thành alkoxide.','Alkoxide nhận proton tạo cyanohydrin.']],
  ['Ester hóa','CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',['Proton hóa oxygen carbonyl.','Alcohol tấn công carbonyl, tạo trung gian tứ diện.','Chuyển proton và tách nước.','Tách proton, tái sinh xúc tác axit và tạo ester.']],
  ['Xà phòng hóa','CH₃COOC₂H₅ + OH⁻ → CH₃COO⁻ + C₂H₅OH',['OH⁻ tấn công carbon carbonyl của ester.','Trung gian tứ diện chuyển hóa, loại alkoxide.','Chuyển proton tạo ion carboxylate và alcohol.']]
  ];
  set(panel('Quan sát từng bước','<label>Cơ chế<select id="mechanism">'+opt(items.map(i=>i[0]))+'</select></label><div class="row"><button id="prev">← Trước</button><button id="next">Tiếp →</button></div>'+result()+'<div id="mechanism-steps"></div><p class="muted">Sơ đồ phổ thông. Điều kiện, dung môi và cấu trúc cơ chất quyết định cơ chế thực tế.</p>'));
  let step=0;function show(){const [name,eq,steps]=items[Number($('mechanism').value)];$('result').innerHTML='<span class="pill">'+name+'</span><div class="formula">'+eq+'</div><h3>Bước '+(step+1)+' / '+steps.length+'</h3><p>'+steps[step]+'</p>';$('prev').disabled=step===0;$('next').disabled=step===steps.length-1;$('mechanism-steps').innerHTML=steps.map((text,i)=>'<details '+(i===step?'open':'')+'><summary>Bước '+(i+1)+'</summary><p>'+text+'</p></details>').join('');}
  $('mechanism').onchange=()=>{step=0;show();};$('prev').onclick=()=>{step--;show();};$('next').onclick=()=>{step++;show();};show();
}
const additionalConcepts=[
  {name:'Điểm tương đương và điểm kết thúc',grade:11,text:'Điểm tương đương đạt khi lượng thuốc chuẩn vừa đủ theo hệ số phản ứng. Điểm kết thúc là thời điểm quan sát tín hiệu, chẳng hạn màu chỉ thị đổi. Hai điểm có thể lệch nhau.'},
  {name:'Dung dịch đệm và giới hạn đệm',grade:11,text:'Đệm gồm cặp axit yếu và bazơ liên hợp hoặc bazơ yếu và axit liên hợp. Đệm hạn chế biến thiên pH khi thêm một lượng nhỏ axit hoặc bazơ. Khả năng đệm hữu hạn.'},
  {name:'Thương số phản ứng Q',grade:11,text:'So sánh Q với K ở cùng nhiệt độ. Q nhỏ hơn K thì hệ có xu hướng biến đổi theo chiều thuận, Q lớn hơn K theo chiều nghịch, Q bằng K tại cân bằng.'},
  {name:'Ion khán giả',grade:11,text:'Ion xuất hiện cùng dạng và lượng ở hai vế của phương trình ion đầy đủ được lược bỏ khi viết phương trình ion rút gọn.'},
  {name:'Anode và cathode',grade:12,text:'Oxi hóa xảy ra ở anode, khử xảy ra ở cathode. Trong pin galvanic đang phát điện anode là cực âm. Trong bình điện phân anode nối cực dương của nguồn.'},
  {name:'Điện lượng trong điện phân',grade:12,text:'Với dòng không đổi Q = It. Số mol electron bằng Q/F. Nếu cần z electron để tạo một tiểu phân sản phẩm, lượng lý thuyết là Q/(zF), với hiệu suất dòng 100%.'},
  {name:'Mạng ion và độ dẫn điện',grade:10,text:'Trong NaCl rắn các ion bị giữ tại vị trí mạng. Khi nóng chảy hoặc hòa tan trong nước, ion linh động nên có thể tải điện.'},
  {name:'Đồng phân cấu tạo',grade:11,text:'Các chất có cùng công thức phân tử nhưng khác cách nối nguyên tử. Ethanol và dimethyl ether cùng có C₂H₆O nhưng thuộc hai nhóm chức khác nhau.'}
];
function knowledge(){
  set(panel('Tra cứu kiến thức','<div class="row"><input class="grow" id="term" placeholder="Nhập khái niệm…" aria-label="Tìm khái niệm"><label>Lớp<select id="grade"><option value="">Tất cả</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></label></div><div id="terms"></div>')+panel('Công thức thường dùng',table(['Đại lượng','Biểu thức','Điều kiện / đơn vị'],[['Hóa trị','x·a = y·b','Hợp chất hai nguyên tố đơn giản'],['Phần trăm nguyên tố','%m(A) = 100·x·M(A)/M(hợp chất)','x là số nguyên tử A trong công thức'],['Bảo toàn khối lượng','Σm trước = Σm sau','Xét toàn bộ hệ kín'],['Tỉ khối khí','d(A/B) = M(A)/M(B)','Khí lý tưởng ở cùng T và p'],['Độ tan','S = 100·m chất tan/m nước','g chất tan/100 g nước, bão hòa tại nhiệt độ xác định'],['Nồng độ phần trăm','C% = 100·m chất tan/m dung dịch','Khối lượng cùng đơn vị'],['Thể tích khí lý tưởng','V ≈ 24,79·n','V (L), n (mol), 25 °C và 1 bar'],['Độ cồn','100·V ethanol/V dung dịch','Thể tích ở cùng nhiệt độ quy ước'],['Số mol','n = m/M','m (g), M (g/mol)'],['Nồng độ mol','C = n/V','V dung dịch (L)'],['Khí lý tưởng','PV = nRT','Pa và m³: R ≈ 8,314 J/(mol·K). Bar và L: R ≈ 0,08314 L·bar/(mol·K).'],['Pha loãng','C₁V₁ = C₂V₂','Cùng chất tan, không phản ứng'],['pH','−log₁₀a(H⁺)','Xấp xỉ bằng nồng độ trong dung dịch loãng'],['Faraday','m = MIt/(nF)','F ≈ 96485 C/mol'],['Nernst','E = E° − RT/(nF) ln Q','Hoạt độ không có đơn vị'],['Nhiệt phản ứng','ΔrH° = ΣνΔfH° sản phẩm − ΣνΔfH° chất đầu','Phương trình đã cân bằng'],['Arrhenius','k = A exp(−Ea/RT)','Ea (J/mol), T (K)'],['Hiệu suất','H = lượng thực tế / lượng lý thuyết × 100%','Cùng đơn vị']])));
  const topics=[...concepts,...additionalConcepts,...curriculumTopics].sort((a,b)=>a.grade-b.grade);
  function render(){
    const q=normalize($('term').value.trim()),grade=$('grade').value;
    const items=topics.filter(c=>(!grade||String(c.grade)===grade)&&normalize(c.name+' '+c.text).includes(q));
    $('terms').innerHTML=items.map(c=>'<details><summary>'+esc(c.name)+' <span class="pill">Lớp '+c.grade+'</span></summary><p>'+esc(c.text)+'</p>'+(c.tools||[]).map(id=>'<p><a href="#'+id+'?grade='+c.grade+'">Mở '+esc(routes.find(route=>route[0]===id)[2])+' →</a></p>').join('')+(normalize(c.name).includes('tinh bot')?'<p><a href="#reference?example=starch">Quan sát iodine và tinh bột →</a></p>':normalize(c.name).includes('halogen')?'<p><a href="#reference?example=bleach">Quan sát chlorine làm nhạt màu giấy ẩm →</a></p>':'')+'</details>').join('')||'<p>Chưa tìm thấy khái niệm.</p>';
  }
  const params=new URLSearchParams(location.hash.split('?')[1]);
  const gradeFromLink=params.get('grade');
  $('term').value=params.get('term')||'';
  if([...$('grade').options].some(option=>option.value===gradeFromLink))$('grade').value=gradeFromLink;
  $('term').oninput=$('grade').onchange=render;render();
  if(params.has('term')&&$('terms').children.length===1){
    const match=$('terms').querySelector('details');if(match)match.open=true;
  }
}
function calculator(){
  set(panel('Máy tính khoa học','<div class="calculator"><label class="check"><input id="degrees" type="checkbox" checked> Góc theo độ (bỏ chọn để dùng radian)</label><input id="expression" value="sqrt(8) + sqrt(18)" aria-label="Biểu thức">'+result()+'<div id="keys" class="keypad"></div></div>')+panel('Phương trình ax² + bx + c = 0','<div class="row">'+number('coef-a','a',1)+number('coef-b','b',-5)+number('coef-c','c',6)+'<button id="quadratic">Giải phương trình</button></div>'+result('quadratic-result')));
  const keys=['sin(','cos(','tan(','log(','ln(','sqrt(','(',')','^','!', '7','8','9','/','AC','4','5','6','*','⌫','1','2','3','-','pi','0','.','%','+','='];$('keys').innerHTML=keys.map(k=>'<button class="'+(/[a-z+*/^%=]/.test(k)?'op':'')+'" data-key="'+esc(k)+'">'+esc(k)+'</button>').join('');
  function compute(){safe(()=>{$('result').textContent='= '+pretty(calculate($('expression').value,$('degrees').checked),12);});}
  $('keys').onclick=e=>{const k=e.target.closest('[data-key]')?.dataset.key;if(!k)return;const field=$('expression');if(k==='='){compute();return;}if(k==='AC')field.value='';else if(k==='⌫'){const a=field.selectionStart,b=field.selectionEnd;field.setRangeText('',a===b?Math.max(0,a-1):a,b,'end');}else field.setRangeText(k,field.selectionStart,field.selectionEnd,'end');field.focus();};
  $('expression').onkeydown=e=>{if(e.key==='Enter')compute();};$('degrees').onchange=compute;
  $('quadratic').onclick=()=>safe(()=>{const a=Number($('coef-a').value),b=Number($('coef-b').value),c=Number($('coef-c').value);if([a,b,c].some(n=>!Number.isFinite(n))||['coef-a','coef-b','coef-c'].some(id=>!$(id).value))throw Error('Nhập đủ ba hệ số.');let text;if(a===0)text=b===0?(c===0?'Vô số nghiệm.':'Vô nghiệm.'):'x = '+pretty(-c/b);else{const d=b*b-4*a*c;if(d<0)text='Hai nghiệm phức x = '+pretty(-b/(2*a))+' ± '+pretty(Math.sqrt(-d)/(2*Math.abs(a)))+'i';else if(d===0)text='Nghiệm kép x = '+pretty(-b/(2*a));else{const q=-.5*(b+Math.sign(b||1)*Math.sqrt(d));text='x₁ = '+pretty(q/a)+' · x₂ = '+pretty(c/q);}}$('quadratic-result').textContent=text;},'quadratic-result');compute();$('quadratic').click();return setupCAS();
}
export const learningHandlers={separation,mechanism,knowledge,calculator};
