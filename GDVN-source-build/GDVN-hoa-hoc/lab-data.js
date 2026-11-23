/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {preparationReactions} from './lab-preparation.js';
import {reactions} from './data.js';
import {balanceEquation} from './chemistry.js';
const extra=[];
function add(a,b,products,observation,type='Kết tủa',color='#d8edfb',deposit='#f7f7ef',condition='Các dung dịch đủ nồng độ để tạo hiện tượng quan sát được.'){extra.push({name:a+' + '+b,equation:a+' + '+b+' -> '+products,observation,type,color,deposit,condition});}
for(const [salt,hydroxide,anion,valence,shade,observation]of [
['Cu(NO3)2','Cu(OH)2','NO3',2,'#399ed6','Kết tủa xanh lam.'],['MgCl2','Mg(OH)2','Cl',2,'#f4f6ef','Kết tủa trắng.'],['MgSO4','Mg(OH)2','SO4',2,'#f4f6ef','Kết tủa trắng.'],['FeCl2','Fe(OH)2','Cl',2,'#9bb59e','Kết tủa trắng xanh, có thể chuyển nâu khi tiếp xúc không khí.'],['Fe(NO3)3','Fe(OH)3','NO3',3,'#ad5b36','Kết tủa nâu đỏ.'],['Al(NO3)3','Al(OH)3','NO3',3,'#f4f4f0','Kết tủa keo trắng khi hydroxide không dư.'],['ZnSO4','Zn(OH)2','SO4',2,'#f4f4f0','Kết tủa trắng khi hydroxide không dư.'],['Zn(NO3)2','Zn(OH)2','NO3',2,'#f4f4f0','Kết tủa trắng khi hydroxide không dư.'],['NiSO4','Ni(OH)2','SO4',2,'#78b68a','Kết tủa xanh lục.'],['MnCl2','Mn(OH)2','Cl',2,'#e7e7de','Kết tủa nhạt màu, sẫm dần do bị oxi hóa ngoài không khí.']]){
 for(const alkali of ['Na','K'])add(salt,alkali+'OH',hydroxide+' + '+alkali+(anion==='SO4'?'2':'')+anion,observation,'Kết tủa','#d8edfb',shade,'Dung dịch loãng, lượng bazơ thích hợp. Al(OH)3 và Zn(OH)2 có thể tan khi bazơ mạnh dư.');
}
for(const [salt,metal,anion]of [['CaCl2','Ca','Cl'],['Ca(NO3)2','Ca','NO3'],['BaCl2','Ba','Cl'],['Ba(NO3)2','Ba','NO3'],['SrCl2','Sr','Cl'],['Sr(NO3)2','Sr','NO3']])for(const alkali of ['Na','K'])add(salt,alkali+'2CO3',metal+'CO3 + '+alkali+anion,'Kết tủa carbonate màu trắng.');
for(const [salt,metal,anion]of [['BaCl2','Ba','Cl'],['Ba(NO3)2','Ba','NO3'],['SrCl2','Sr','Cl']])for(const [sulfate,cation]of [['Na2SO4','Na'],['K2SO4','K'],['(NH4)2SO4','NH4']])add(salt,sulfate,metal+'SO4 + '+cation+anion,'Kết tủa sulfate màu trắng.','Kết tủa','#d8edfb','#f5f5ef','Dung dịch đủ nồng độ; sulfate ít tan tạo kết tủa khi vượt tích số tan.');
for(const [halide,shade,description]of [['Cl','#f4f4ed','trắng'],['Br','#f2e7b4','vàng nhạt'],['I','#f3d855','vàng']])for(const alkali of ['Na','K'])add('AgNO3',alkali+halide,'Ag'+halide+' + '+alkali+'NO3','Kết tủa bạc halide màu '+description+'.','Kết tủa','#d8edfb',shade);
for(const alkali of ['Na','K'])add('AgNO3',alkali+'3PO4','Ag3PO4 + '+alkali+'NO3','Kết tủa silver phosphate màu vàng.','Kết tủa','#d8edfb','#ebce45','Dung dịch phosphate, không có axit mạnh hoặc phối tử hòa tan bạc.');
for(const [salt,product,byproduct,shade,description]of [['KI','PbI2','KNO3','#f2d83f','vàng'],['KBr','PbBr2','KNO3','#ece4cf','trắng ngà'],['NaCl','PbCl2','NaNO3','#f3f4ed','trắng'],['Na2SO4','PbSO4','NaNO3','#f3f4ed','trắng']])add('Pb(NO3)2',salt,product+' + '+byproduct,'Kết tủa màu '+description+'.','Kết tủa','#d8edfb',shade,'Dung dịch đủ nồng độ ở nhiệt độ thường; độ tan phụ thuộc nhiệt độ.');
for(const [carbonate,metal,hydrogen]of [['Na2CO3','Na',false],['K2CO3','K',false],['NaHCO3','Na',true],['KHCO3','K',true],['CaCO3','Ca',false],['MgCO3','Mg',false]])for(const [acid,anion]of [['HCl','Cl'],['HNO3','NO3']]){const divalent=metal==='Ca'||metal==='Mg';add(carbonate,acid,metal+(divalent?(anion==='NO3'?'(NO3)2':'Cl2'):anion)+' + CO2 + H2O','Carbonate/hydrogencarbonate phản ứng với axit, giải phóng CO2.','Khí','#d8edfb','', 'Axit loãng; phản ứng mô phỏng với carbonate được chỉ định.');}
for(const [salt,anion,count]of [['NH4Cl','Cl',1],['NH4NO3','NO3',1],['(NH4)2SO4','SO4',2]])for(const alkali of ['Na','K'])add(salt,alkali+'OH',alkali+(count===2?'2':'')+anion+' + NH3 + H2O','Giải phóng ammonia khi làm ấm; giấy quỳ ẩm chuyển xanh.','Khí','#d8edfb','','Dung dịch ammonium và bazơ mạnh; hiện tượng khí rõ hơn khi làm ấm.');
for(const metal of ['Zn','Mg'])for(const [salt,product]of [['CuSO4','SO4'],['CuCl2','Cl2']])add(metal,salt,metal+product+' + Cu','Đồng đỏ nâu bám lên kim loại; màu xanh của dung dịch giảm.','Oxi hóa – khử','#cfe8e1','#ac603f','Kim loại tiếp xúc dung dịch muối đồng(II), không có lớp phủ cản trở đáng kể.');
for(const [metal,salt]of [['Fe','FeCl2'],['Al','AlCl3']])add(metal,'HCl',salt+' + H2','Kim loại tan và giải phóng hydrogen.','Khí','#d8edfb','','HCl loãng; Al có thể có giai đoạn cảm ứng do lớp oxide.');
for(const metal of ['Fe','Mg','Zn'])add(metal,'H2SO4',metal+'SO4 + H2','Kim loại tan dần, khí hydrogen thoát ra.','Khí','#d8edfb','','H2SO4 loãng; không áp dụng cho axit sulfuric đặc.');
for(const [acid,salt]of [['HCl','Cl'],['HNO3','NO3'],['CH3COOH','CH3COO']])for(const alkali of ['Na','K'])add(acid,alkali+'OH',(salt==='CH3COO'?salt+alkali:alkali+salt)+' + H2O','Trung hòa axit – bazơ; hiện tượng màu phụ thuộc chất chỉ thị, dung dịch có thể ấm lên.','Trung hòa','#d8edfb','','Dung dịch axit và bazơ, không tự tạo màu khi không có chỉ thị.');
add('H2SO4','NaOH','Na2SO4 + H2O','Trung hòa axit sulfuric bằng sodium hydroxide.','Trung hòa','#d8edfb','','Dung dịch loãng.');
for(const [equation,observation]of [['MgCO3 -> MgO + CO2','Carbonate phân hủy, giải phóng CO2.'],['NaHCO3 -> Na2CO3 + CO2 + H2O','Hydrogencarbonate phân hủy, giải phóng CO2 và hơi nước.'],['Ca(OH)2 -> CaO + H2O','Calcium hydroxide phân hủy khi nung.'],['H2O2 -> H2O + O2','Hydrogen peroxide phân hủy, giải phóng oxygen.']])extra.push({name:equation.split(' -> ')[0]+' phân hủy',equation,observation,type:equation.startsWith('H2O2')?'Khí':'Nhiệt phân',color:'#d8edfb',deposit:'',condition:equation.startsWith('H2O2')?'Có xúc tác thích hợp làm phản ứng nhanh hơn.':'Nhiệt độ phù hợp cho phản ứng phân hủy.'});
add('CH3COOH','NaHCO3','CH3COONa + CO2 + H2O','Sủi bọt do tạo CO₂.','Khí','#d8edfb','','Axit acetic tiếp xúc với hydrogencarbonate; tốc độ phụ thuộc nồng độ và cách trộn.');
add('CH3COOH','Na2CO3','CH3COONa + CO2 + H2O','Có CO₂ thoát ra khi đủ axit.','Khí','#d8edfb','','Dung dịch loãng, có đủ axit để chuyển carbonate thành CO₂.');
add('Ba(NO3)2','MgSO4','BaSO4 + Mg(NO3)2','Kết tủa BaSO₄ màu trắng.','Kết tủa','#d8edfb','#f5f5ef','Dung dịch có tích ion Ba²⁺ và SO₄²⁻ vượt tích số tan.');
add('Cu','HNO3','Cu(NO3)2 + NO2 + H2O','Đồng tan dần, dung dịch chuyển xanh và khí NO₂ nâu đỏ xuất hiện.','Khí','#65b9df','','HNO₃ đặc. Cảnh định tính, khí NO₂ được minh họa trong thiết bị xử lý khí.');
extra.push({name:'Magnesium cháy trong oxygen',equation:'Mg + O2 -> MgO',type:'Cháy',condition:'Magnesium cháy trong oxygen. Phương trình mô tả sản phẩm oxide, không mô phỏng phản ứng phụ trong không khí.',observation:'Phát ánh sáng trắng mạnh, còn lại magnesium oxide trắng.',color:'#e5eff7',deposit:''});
extra.push({name:'CO₂ dư trong nước vôi đã vẩn đục',equation:'CaCO3 + CO2 + H2O -> Ca(HCO3)2',type:'Axit – bazơ',apparatus:'inlet',equipment:'Ống dẫn CO₂ vào cốc đang chứa kết tủa CaCO₃',condition:'Tiếp tục dẫn CO₂ sau khi nước vôi đã đục. Phương trình biểu diễn quá trình hòa tan carbonate trong môi trường có CO₂ dư.',observation:'Vẩn đục trắng giảm dần khi kết tủa chuyển thành các ion hòa tan.',color:'#d9f0fb',deposit:''});
extra.push({name:'Nhôm tác dụng với kiềm',equation:'Al + NaOH + H2O -> NaAl(OH)4 + H2',type:'Khí',apparatus:'tongs',equipment:'Kẹp mẫu nhôm và cốc dung dịch kiềm',condition:'Dung dịch NaOH dư. Lớp oxide bề mặt có thể làm phản ứng khởi đầu chậm.',observation:'Nhôm tan dần, bọt hydrogen xuất hiện trên bề mặt kim loại.',color:'#d8edfb',deposit:''});
const curriculumExamples=[
 ['Chlorine đẩy bromine khỏi bromide','Cl2 + KBr -> KCl + Br2','Dung dịch xuất hiện màu vàng cam đến nâu do bromine.','Dùng nước chlorine và dung dịch bromide. Màu phụ thuộc nồng độ.','#c78b48','dropper','Ống nhỏ giọt nước chlorine và cốc bromide'],
 ['Bromine đẩy iodine khỏi iodide','Br2 + KI -> KBr + I2','Dung dịch chuyển nâu khi iodine được giải phóng trong môi trường iodide.','Hai dung dịch tiếp xúc. Mức đổi màu phụ thuộc lượng thuốc thử.','#9e623d','dropper','Ống nhỏ giọt và cốc'],
 ['Ethanal với thuốc thử Tollens','CH3CHO + Ag(NH3)2^+ + OH^- -> CH3COO^- + Ag + NH3 + H2O','Bạc bám trên thành ống sạch. Ethanal bị oxi hóa thành acetate.','Thuốc thử Tollens trong môi trường bazơ, làm ấm bằng bể nước. Phương trình ion rút gọn.','#d9edf2','silver-mirror','Ống nghiệm trong bể nước ấm'],
 ['Glucose với thuốc thử Tollens','C6H12O6 + Ag(NH3)2^+ + OH^- -> C6H11O7^- + Ag + NH3 + H2O','Lớp bạc hiện trên thành ống. Glucose bị oxi hóa thành gluconate.','Làm ấm bằng bể nước. Phương trình ion rút gọn mô tả phản ứng của dạng mạch hở.','#d9edf2','silver-mirror','Ống nghiệm trong bể nước ấm'],
 ['Glucose khử copper(II) khi đun','C6H12O6 + Cu(OH)2 + OH^- -> C6H11O7^- + Cu2O + H2O','Chất rắn copper(I) oxide đỏ gạch xuất hiện khi đun trong môi trường kiềm.','Mô hình gộp quá trình oxi hóa glucose và khử copper(II). Chọn cảnh này cho bước đun nóng.','#e6e9e9','copper-test','Ống nghiệm gia nhiệt trong bể nước'],
 ['Xà phòng hóa chất béo','C57H110O6 + NaOH -> C3H8O3 + C18H35O2Na','Chất béo bị thủy phân trong kiềm, tạo glycerol và muối sodium stearate.','Dùng tristearin làm chất béo đại diện. Gia nhiệt, có đủ NaOH; thành phần xà phòng thực tế phụ thuộc chất béo.','#efe0b6','soap-bath','Bình gia nhiệt minh họa bằng bể nước'],
 ['Methylamine tác dụng với HCl','CH3NH2 + HCl -> CH3NH3Cl','Axit proton hóa methylamine thành ion methylammonium. Hai dung dịch loãng có thể vẫn trong.','Mô phỏng trong dung dịch, không có chỉ thị màu.','#d1eff9','dropper','Ống nhỏ giọt và cốc'],
 ['Aniline tác dụng với nước bromine','C6H7N + Br2 -> C6H4Br3N + HBr','Màu bromine nhạt dần và kết tủa trắng 2,4,6-tribromoaniline xuất hiện.','Mô phỏng phản ứng thế trên vòng thơm. Có đủ bromine cho sản phẩm thế ba.','#e7eef1','dropper','Ống nhỏ giọt và cốc']
];
for(const [name,equation,observation,condition,color,apparatus,equipment] of curriculumExamples){
  extra.push({name,equation,observation,condition,color,apparatus,equipment,pairRestricted:true,
    type:name.startsWith('Aniline')?'Kết tủa':name.startsWith('Methylamine')?'Trung hòa':'Tính chất hóa học',
    deposit:name.startsWith('Aniline')?'#f6f3e8':''});
}
const overrides={
  'CaCO3 nung nóng':{
    apparatus:'furnace',equipment:'Mặt cắt lò nung đá vôi, có đường thoát CO₂',
    condition:'Cần nung mạnh. Mức phân hủy phụ thuộc nhiệt độ và áp suất riêng phần CO₂.',
    observation:'Đá vôi có thể vụn dần. CaO rắn còn lại, CO₂ không màu thoát ra. Có thể nhận biết CO₂ bằng nước vôi trong ở bước thử riêng.'
  },
  'H2O2 phân hủy':{type:'Khí',condition:'Dung dịch H₂O₂ phân hủy với xúc tác MnO₂ ở nhiệt độ phòng. MnO₂ không nằm trong phương trình tổng.'},
  'KClO3 nung nóng':{condition:'Mô phỏng KClO₃ rắn phân hủy khi gia nhiệt với xúc tác MnO₂. Khí O₂ được thu riêng.'},
  'CaCO3 + HCl':{condition:'Đá vôi tiếp xúc HCl loãng. CO₂ thoát ra, CaCl₂ nằm trong dung dịch.'},
  'Fe + CuSO4':{condition:'Mẫu sắt sạch tiếp xúc dung dịch CuSO₄. Màu cuối phụ thuộc lượng Cu²⁺ còn dư.'},
  'Cu + HNO3':{name:'Đồng với HNO₃ đặc',apparatus:'nitrogen-oxide',equipment:'Bình phản ứng nối bộ xử lý khí',pairRestricted:true},
  'Cu + AgNO3':{condition:'Mẫu đồng tiếp xúc dung dịch AgNO₃. Ag bám trên bề mặt, Cu²⁺ đi vào dung dịch.'},
  'CO2 + Ca(OH)2':{condition:'Dẫn lượng CO₂ vừa đủ vào nước vôi trong. CO₂ dư có thể làm độ đục giảm.',apparatus:'inlet',equipment:'Ống dẫn CO₂ vào nước vôi trong'},
  'Cl2 + KI':{condition:'Chlorine tiếp xúc dung dịch KI. Iodine sinh ra tạo màu nâu trong môi trường có iodide.',apparatus:'inlet',equipment:'Ống dẫn chlorine vào dung dịch iodide'},
  'Al(OH)3 + NaOH':{equation:'Al(OH)3 + NaOH -> NaAl(OH)4',apparatus:'dropper',equipment:'Ống nhỏ giọt và cốc chứa kết tủa keo',condition:'Dung dịch NaOH dư. Biểu diễn aluminate trong nước dưới dạng [Al(OH)₄]⁻.',observation:'Kết tủa keo trắng tan dần trong bazơ mạnh dư.'}
};
const conditions={
  'Kết tủa':'Trộn dung dịch chứa các ion tương ứng. Kết tủa xuất hiện khi tích ion vượt tích số tan. Với Al(OH)₃, tránh dư bazơ mạnh trong cảnh tạo kết tủa.',
  'Trung hòa':'Dung dịch axit và bazơ. Phương trình mô tả tỉ lệ trung hòa đã ghi. Có thể ấm lên, màu chỉ thay đổi nếu có chỉ thị phù hợp.',
  'Cháy':'Có nguồn mồi và đủ oxygen. Phương trình mô tả cháy hoàn toàn, thời lượng trong cảnh chỉ để minh họa.',
  'Khí':'Chất phản ứng ở điều kiện ghi trong tên và phương trình. Bọt hoặc dòng khí thể hiện sản phẩm khí, không dùng màu để nhận biết khí không màu.',
  'Nhiệt phân':'Chất rắn được gia nhiệt trong dụng cụ chịu nhiệt phù hợp. Cảnh chỉ biểu diễn sản phẩm của phương trình đã chọn.'
};
const seen=new Set();
export const labReactions=[...reactions,...extra,...preparationReactions]
  .map(r=>({...r,...overrides[r.name]}))
  .filter(reaction=>{
    const text=balanceEquation(reaction.equation).text;
    if(seen.has(text))return false;
    seen.add(text);
    return true;
  })
  .map((r,i)=>({...r,id:'rx-'+i,condition:r.condition||
    (r.equation.startsWith('KMnO4 ->')?'Gia nhiệt KMnO₄ rắn trong ống chịu nhiệt. O₂ được dẫn sang bình thu qua nước.':
      conditions[r.type]||'Hiện tượng phụ thuộc trạng thái chất, nồng độ và môi trường phản ứng.')}));
export const reactionPartners=new Map();
for(const reaction of labReactions){
  if(reaction.pairRestricted||reaction.type==='Điều chế và sản xuất'||reaction.apparatus==='furnace'||reaction.type==='Cháy'||reaction.equation.startsWith('Al + Fe2O3'))continue;
  const {all,split}=balanceEquation(reaction.equation);
  const [a,b]=all;
  if(split!==2||a===b)continue;
  for(const [first,second] of [[a,b],[b,a]]){
    if(!reactionPartners.has(first))reactionPartners.set(first,new Map());
    const partners=reactionPartners.get(first);
    if(!partners.has(second))partners.set(second,[]);
    partners.get(second).push(reaction);
  }
}
export function matchReaction(a,b){
  return reactionPartners.get(a)?.get(b)?.[0];
}
