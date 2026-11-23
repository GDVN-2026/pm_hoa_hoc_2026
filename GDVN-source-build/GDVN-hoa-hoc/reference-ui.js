/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {$,set,panel,opt,table} from './ui-kit.js';
import {normalize,escapeHTML as esc} from './chemistry.js';
import {modelView} from './visuals.js';

const ions=[
['Cl⁻','AgNO₃ sau khi axit hóa bằng HNO₃ loãng','Kết tủa trắng AgCl','Ag⁺ + Cl⁻ → AgCl↓','Br⁻ và I⁻ cũng kết tủa với Ag⁺.'],
['SO₄²⁻','BaCl₂ trong môi trường axit HCl loãng','Kết tủa trắng BaSO₄','Ba²⁺ + SO₄²⁻ → BaSO₄↓','Axit giúp loại nhiễu do carbonate.'],
['Cu²⁺','OH⁻','Cu(OH)₂ xanh lam','Cu²⁺ + 2OH⁻ → Cu(OH)₂↓','Xét dung dịch không chứa chất tạo phức mạnh.'],
['Fe³⁺','OH⁻','Fe(OH)₃ nâu đỏ','Fe³⁺ + 3OH⁻ → Fe(OH)₃↓','Màu phụ thuộc lượng kết tủa và nền mẫu.'],
['Fe²⁺','OH⁻','Fe(OH)₂ lục nhạt','Fe²⁺ + 2OH⁻ → Fe(OH)₂↓','Có thể chuyển nâu khi tiếp xúc không khí.'],
['CO₃²⁻','Axit loãng','Giải phóng CO₂','CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O','Sủi bọt riêng lẻ chưa xác định được khí.'],
['NH₄⁺','OH⁻, làm ấm','NH₃ làm xanh quỳ đỏ ẩm','NH₄⁺ + OH⁻ → NH₃↑ + H₂O','Quan sát bằng chỉ thị, tránh ngửi trực tiếp.'],
['I⁻','AgNO₃ trong môi trường HNO₃ loãng','AgI vàng','Ag⁺ + I⁻ → AgI↓','Phân biệt với các halide bằng nhiều dấu hiệu.']
];
const organic=[
['Ethanol / dimethyl ether','C₂H₆O','CH₃CH₂OH / CH₃OCH₃','Ancol / ether','CCO','COC'],
['Propanal / acetone','C₃H₆O','CH₃CH₂CHO / CH₃COCH₃','Aldehyde / ketone','CCC=O','CC(=O)C'],
['Axit acetic / methyl formate','C₂H₄O₂','CH₃COOH / HCOOCH₃','Axit carboxylic / ester','CC(=O)O','COC=O'],
['Butane / isobutane','C₄H₁₀','CH₃CH₂CH₂CH₃ / (CH₃)₃CH','Đồng phân mạch carbon','CCCC','CC(C)C']
];
const scenarios=[
['Pha loãng','Dung dịch gốc 1 M, cần 100 mL ở 0,1 M.','Lấy 10 mL dung dịch gốc, pha đến thể tích cuối 100 mL.','solution'],
['Chuẩn độ HCl bằng NaOH','25 mL HCl 0,10 M và NaOH 0,10 M, ở 25 °C.','Tương đương tại 25 mL NaOH. pH gần 7 trong mô hình lý tưởng.','solution'],
['Pin Zn/Cu','Điều kiện chuẩn, E°(Cu²⁺/Cu) = +0,34 V và E°(Zn²⁺/Zn) = −0,76 V.','E°pin = 1,10 V. Electron qua dây từ Zn sang Cu.','electro'],
['Điện phân đồng','Dung dịch có Cu²⁺, dòng 1 A trong 965 s, hiệu suất dòng 100%.','Q = 965 C, khoảng 0,0100 mol electron. Với Cu²⁺ + 2e⁻ → Cu, thu khoảng 0,318 g đồng.','electrolysis']
];
const crystals=[
['NaCl','Mạng ion. Các ion Na⁺ và Cl⁻ xen kẽ. Mỗi ion bên trong mạng có sáu láng giềng trái dấu. NaCl rắn dẫn điện kém vì các ion bị giữ tại vị trí mạng.'],
['Kim cương','Mạng cộng hóa trị không gian. Mỗi carbon trong mạng liên kết với bốn carbon lân cận theo hình tứ diện. Mạng liên kết cộng hóa trị ba chiều làm kim cương rất cứng.'],
['Graphite','Mạng lớp. Carbon tạo vòng sáu cạnh trong từng lớp. Các lớp dễ trượt và electron có thể di chuyển dọc lớp. Mô hình hiển thị hai mảnh lớp lệch nhau.']
];
function crystal(index){
  const atoms=[],bonds=[];
  if(index===0){
    for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)atoms.push([(x+y+z)%2===0?'Cl':'Na',x,y,z]);
  }else if(index===1){
    for(let x=0;x<=4;x++)for(let y=0;y<=4;y++)for(let z=0;z<=4;z++){
      const even=[x,y,z].every(n=>n%2===0);
      const odd=[x,y,z].every(n=>n%2===1);
      if((even&&(x+y+z)%4===0)||(odd&&(x+y+z)%4===3))atoms.push(['C',(x-2)/2,(y-2)/2,(z-2)/2]);
    }
  }else{
    for(let layer=0;layer<2;layer++)for(let row=0;row<2;row++)for(let col=0;col<2;col++)for(let n=0;n<6;n++){
      const angle=n*Math.PI/3;
      const p=['C',1.5*col-0.75+Math.cos(angle)+layer,Math.sqrt(3)*(row+col/2-0.75)+Math.sin(angle),layer*1.7-.85];
      if(!atoms.some(a=>Math.hypot(a[1]-p[1],a[2]-p[2],a[3]-p[3])<.001))atoms.push(p);
    }
  }
  const distance=[1,Math.sqrt(3)/2,1][index];
  atoms.forEach((a,i)=>atoms.slice(0,i).forEach((b,j)=>{
    if(Math.abs(Math.hypot(a[1]-b[1],a[2]-b[2],a[3]-b[3])-distance)<.001)bonds.push([i,j,1]);
  }));
  return {atoms,bonds,atomColors:atoms.map(a=>index===0?(a[0]==='Cl'?'#70ed9f':'#c588ff'):index===1?'#63d9ff':a[3]>0?'#ffbd5a':'#57d8ff'),bondColors:bonds.map(([a])=>index===0?'#8fb7d7':index===1?'#45baf0':atoms[a][3]>0?'#db8b38':'#329bd2'),atomRadii:atoms.map(a=>a[0]==='Cl'?14:9),atomLabels:index===0?atoms.map(a=>a[0]==='Cl'?'Cl⁻':'Na⁺'):undefined};
}

export function reference(){
  const colourExample=(type,title,before,after)=>'<details id="reference-'+type+'"><summary>'+title+'</summary><div class="lab-colour-card"><div data-reference-colour="'+type+'" data-test="'+type+'" data-reacted="false" role="img" aria-label="Mẫu ban đầu"></div><div><p data-colour-note>'+before+'</p><button type="button" data-colour-toggle>Quan sát đổi màu</button></div></div><template>'+after+'</template></details>';
  set(panel('Tinh bột trong cơ thể và cây xanh',
    '<details><summary>Tiêu hóa và sử dụng glucose</summary><p>Enzyme phân giải tinh bột thành các carbohydrate ngắn hơn. Các enzyme ở ruột non tiếp tục phân giải thành glucose. Tế bào có thể sử dụng glucose để tổng hợp ATP trong hô hấp tế bào.</p></details>'+
    '<details><summary>Tạo tinh bột ở cây xanh</summary><p>Quang hợp tạo carbohydrate từ carbon dioxide và nước nhờ năng lượng ánh sáng. Cây có thể chuyển một phần carbohydrate thành tinh bột dự trữ.</p></details>'+
    '<details><summary>Hấp thu sản phẩm tiêu hóa tinh bột</summary><p>Tinh bột được tiêu hóa thành các đường đơn như glucose trước khi hấp thu.</p></details>'+
    colourExample('starch','Nhận biết tinh bột bằng iodine','Hồ tinh bột ban đầu có màu trắng đục.','Iodine tạo phức màu xanh tím đậm với tinh bột.')));
  set(panel('Halogen',colourExample('bleach','Chlorine làm nhạt màu giấy ẩm','Giấy màu ẩm ở trạng thái ban đầu.','Giấy ẩm nhạt màu do tác dụng oxi hóa của HOCl hình thành trong nước. Chlorine độc khi hít phải. Chỉ quan sát mô phỏng.')));
  for(const sample of $('content').querySelectorAll('[data-reference-colour]')){
    const card=sample.closest('details');
    const note=card.querySelector('[data-colour-note]'),button=card.querySelector('[data-colour-toggle]');
    const before=note.textContent,after=card.querySelector('template').content.textContent;
    sample.setAttribute('aria-label',before);
    button.onclick=()=>{
      const reacted=sample.dataset.reacted!=='true';
      sample.dataset.reacted=String(reacted);
      note.textContent=reacted?after:before;
      sample.setAttribute('aria-label',note.textContent);
      button.textContent=reacted?'Làm lại':'Quan sát đổi màu';
    };
  }

  const example=new URLSearchParams(location.hash.split('?')[1]).get('example');
  if(['starch','bleach'].includes(example)){
    const target=$('reference-'+example);
    target.open=true;
    requestAnimationFrame(()=>target.scrollIntoView({block:'center'}));
  }

  set(panel('Nhận biết ion trong dung dịch','<label>Tìm ion, thuốc thử hoặc màu<input id="ion-search" type="search" placeholder="Ví dụ: kết tủa trắng"></label><div id="ion-reference"></div><p class="muted">Các dấu hiệu mang tính định tính. Cần xét chất gây nhiễu và điều kiện của mẫu.</p><a class="all-tools-link" href="#lab">Mở mô phỏng phản ứng ↗</a>')
  +panel('Mẫu mạng tinh thể minh họa','<div class="row"><label>Chất<select id="crystal-choice">'+opt(crystals.map(c=>c[0]))+'</select></label><button id="crystal-reset">Đặt lại góc nhìn</button></div><canvas class="visual" id="crystal-model" aria-label="Mạng tinh thể, kéo để xoay"></canvas><p id="crystal-info"></p><p class="muted">Mảnh mạng minh họa. Que nối ở NaCl đánh dấu các ion gần nhất. Kích thước và khoảng cách chỉ mang tính sơ đồ.</p>')
  +panel('Đồng phân và chuyển hóa hữu cơ',organic.map(([name,formula,structure,group,a,b])=>'<details><summary>'+name+' · '+formula+'</summary><p>'+structure+' · '+group+'</p><div class="row"><button data-reference-smiles="'+a+'">Mở chất thứ nhất ở 3D</button><button data-reference-smiles="'+b+'">Mở chất thứ hai ở 3D</button></div></details>').join('')+'<p><b>Chuỗi minh họa:</b> Ethanol → ethanal → axit acetic (oxi hóa từng bước); axit acetic + ethanol ⇌ ethyl acetate + nước (este hóa có xúc tác axit).</p>')
  +panel('Tình huống dung dịch và điện hóa',scenarios.map(([name,input,output,route])=>'<details><summary>'+name+'</summary><p>'+input+'</p><p><b>Kết quả mẫu:</b> '+output+'</p><a class="all-tools-link" href="#'+route+'">Mở công cụ tính ↗</a></details>').join('')));
  function filterIons(){
    const query=normalize($('ion-search').value.trim());
    const matching=ions.filter(row=>normalize(row.join(' ')).includes(query));
    $('ion-reference').innerHTML=matching.length?table(['Ion','Thuốc thử / điều kiện','Hiện tượng','Phương trình ion','Lưu ý'],matching.map(row=>row.map(esc))):'<p>Không tìm thấy dữ liệu phù hợp.</p>';
  }
  $('ion-search').oninput=filterIons;
  filterIons();
  const view=modelView($('crystal-model'),crystal(0));
  function showCrystal(){
    const index=Number($('crystal-choice').value);
    view.setModel(crystal(index));
    view.setOptions({labels:index===0});
    $('crystal-info').textContent=crystals[index][1];
  }
  $('crystal-choice').onchange=showCrystal;
  $('crystal-reset').onclick=()=>view.reset();
  showCrystal();
  document.querySelectorAll('[data-reference-smiles]').forEach(button=>button.onclick=()=>{
    try{sessionStorage.setItem('gdvn-structure-smiles',button.dataset.referenceSmiles);location.hash='molecule';}
    catch{button.textContent='SMILES: '+button.dataset.referenceSmiles;}
  });
  return ()=>view.dispose();
}
