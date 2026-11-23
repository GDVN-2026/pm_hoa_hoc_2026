/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
export const preparationGroups={
  'Khí và phi kim':{O2:'Oxygen',H2:'Hydrogen',CO2:'Carbon dioxide',NH3:'Ammonia',Cl2:'Chlorine',SO2:'Sulfur dioxide'},
  'Kim loại':{Fe:'Sắt',Al:'Nhôm',Cu:'Đồng',Na:'Natri'},
  'Oxide, hydroxide và muối':{CaO:'Calcium oxide','Ca(OH)2':'Calcium hydroxide',CaCO3:'Calcium carbonate','Cu(OH)2':'Copper(II) hydroxide','Al(OH)3':'Aluminium hydroxide','Fe(OH)3':'Iron(III) hydroxide',AgCl:'Silver chloride',BaSO4:'Barium sulfate',NaClO:'Sodium hypochlorite'},
  'Hữu cơ và axit':{C2H4:'Ethene',C4H8O2:'Ethyl acetate',C2H6O:'Ethanol',H2SO4:'Sulfuric acid'}
};
const rows=[
 ['Luyện sắt từ oxide','Fe2O3 + CO -> Fe + CO2','furnace','Lò luyện, dòng khí CO','Phương trình tổng quát của bước khử oxide bằng CO ở nhiệt độ cao. Lò cao thực tế có nhiều giai đoạn và tạo gang.'],
 ['Điện phân để sản xuất nhôm','Al2O3 + C -> Al + CO2','molten','Bể Hall–Héroult, điện cực carbon','Alumina hòa tan trong cryolite nóng chảy. Nhôm sinh ra ở cathode, anode carbon bị tiêu hao. Phương trình giản lược với CO₂ là sản phẩm anode chính.'],
 ['Điện phân NaCl nóng chảy','NaCl -> Na + Cl2','molten','Bể điện phân, hai khoang thu sản phẩm','Chỉ mô tả muối nóng chảy. Na hình thành ở cathode, Cl₂ ở anode. Sơ đồ công nghiệp tách riêng sản phẩm.'],
 ['Tạo chlorine từ nước muối','NaCl + H2O -> Cl2 + H2 + NaOH','cell','Bể điện phân có màng ngăn','Điện phân nước muối đậm đặc, ngăn sản phẩm hai điện cực trộn lại. Cl₂ ở anode và H₂ ở cathode.'],
 ['Điện phân nước','H2O -> H2 + O2','cell','Bộ điện phân nước, hai ống thu khí','Dùng môi trường điện ly thích hợp và điện cực phù hợp. H₂ và O₂ thu riêng, tỉ lệ mol 2 : 1.'],
 ['Nung đá vôi','CaCO3 -> CaO + CO2','furnace','Lò nung đá vôi','Nhiệt phân ở nhiệt độ cao. Chất rắn còn lại là CaO và CO₂ thoát ra.'],
 ['Tôi vôi','CaO + H2O -> Ca(OH)2','tongs','Dụng cụ đưa chất rắn vào bình phản ứng','CaO phản ứng với nước và tỏa nhiệt, tạo calcium hydroxide.'],
 ['Tạo nước Javel','Cl2 + NaOH -> NaCl + NaClO + H2O','inlet','Bình hấp thụ khí','Sơ đồ phản ứng của chlorine với dung dịch NaOH loãng, lạnh. Điều kiện nóng và đậm đặc cho sản phẩm khác.'],
 ['Tổng hợp ammonia','N2 + H2 -> NH3','reactor','Thiết bị tổng hợp Haber–Bosch','Phản ứng thuận nghịch, xúc tác sắt, nhiệt độ và áp suất cao trong thiết bị công nghiệp. Phương trình biểu diễn chiều tạo NH₃.'],
 ['Sản xuất sulfuric acid','SO3 + H2O -> H2SO4','reactor','Tháp hấp thụ và pha loãng','Phương trình tổng quát. Trong quy trình tiếp xúc, SO₂ được oxi hóa thành SO₃, SO₃ hấp thụ vào H₂SO₄ tạo oleum rồi pha loãng.'],
 ['Tạo ethene từ ethanol','C2H6O -> C2H4 + H2O','heated','Bình phản ứng gia nhiệt và ống dẫn khí','Tách nước ethanol với xúc tác axit ở điều kiện phù hợp. Sơ đồ biểu diễn chiều tạo ethene.'],
 ['Tạo ethyl acetate','C2H4O2 + C2H6O -> C4H8O2 + H2O','reflux','Bình gia nhiệt và sinh hàn hồi lưu','Axit acetic và ethanol tạo ethyl acetate trong phản ứng thuận nghịch, có xúc tác axit và gia nhiệt.'],
 ['Lên men tạo ethanol','C6H12O6 -> C2H6O + CO2','reactor','Bình lên men có đường thoát CO₂','Nấm men chuyển hóa glucose trong điều kiện ít oxygen thích hợp. Ethanol có trong dịch lên men và CO₂ thoát ra.']
];
const observations=[
 'Gang lỏng đọng ở đáy lò, xỉ nổi phía trên và đi ra qua cửa riêng.',
 'Nhôm lỏng tích tụ dưới lớp điện ly. CO₂ thoát ở anode carbon.',
 'Natri lỏng và chlorine được thu ở hai khoang riêng.',
 'Bọt hydrogen ở cathode và chlorine ở anode. Dung dịch phía cathode chứa NaOH.',
 'Hai phía điện cực có bọt khí. Thể tích hydrogen gấp đôi oxygen ở cùng điều kiện.',
 'Đá vôi biến thành vôi sống rắn và giải phóng CO₂.',
 'Vôi hút nước, tỏa nhiệt và tạo calcium hydroxide trắng.',
 'Khí chlorine đi vào dung dịch kiềm. Dòng sản phẩm chứa hypochlorite và chloride.',
 'Dòng khí sau thiết bị có ammonia. Khi làm lạnh trong quy trình công nghiệp, ammonia được tách ra.',
 'Thu dung dịch sulfuric acid sau bước pha loãng oleum.',
 'Ethene thoát qua đường dẫn khí, nước là sản phẩm tách khỏi ethanol.',
 'Hơi ngưng tụ trong sinh hàn và chảy trở lại bình. Hỗn hợp sau phản ứng có ethyl acetate.',
 'Bọt CO₂ thoát khỏi dịch lên men. Ethanol vẫn hòa trong dịch.'
];
export const preparationReactions=rows.map(([name,equation,apparatus,equipment,condition],index)=>({
  name,equation,apparatus,equipment,condition,observation:observations[index],
  type:'Điều chế và sản xuất',color:'#d8edfb',deposit:''
}));

const solids=new Set(['Fe','Al','Zn','Mg','Cu','CaCO3','MgCO3','CaO','CuO','Al(OH)3']);
export function apparatusFor(reaction,reactants){
  if(reaction.type==='Cháy')return ['burner','Vùng cháy và nguồn oxygen'];
  if(reactants.includes('Cl2')||reactants.includes('CO2'))return reaction.apparatus?[reaction.apparatus,reaction.equipment]:['gas','Bình phản ứng có đường dẫn khí'];
  if(reaction.apparatus)return [reaction.apparatus,reaction.equipment];
  if(reaction.equation.startsWith('H2O2'))return ['gas','Bình xúc tác và ống thu oxygen'];
  if(reaction.equation.startsWith('Al + Fe2O3'))return ['thermite','Sơ đồ chén chịu nhiệt cho phản ứng nhiệt nhôm'];
  if(reactants.includes('NH4Cl')||reactants.some(s=>s.startsWith('NH4')||s.startsWith('(NH4)'))) {
    if(reactants.some(s=>s==='NaOH'||s==='KOH'))return ['ammonia','Ống nghiệm làm ấm và giấy chỉ thị ẩm'];
  }
  if(reaction.type==='Nhiệt phân'){
    if(reactants.includes('KMnO4')||reactants.includes('KClO3'))return ['oxygen','Ống nghiệm chịu nhiệt, giá kẹp và bình thu O₂ qua nước'];
    return ['dry','Ống nghiệm chứa chất rắn và nguồn nhiệt'];
  }
  if(reactants.some(s=>solids.has(s)))return ['tongs','Kẹp đưa mẫu rắn vào cốc'];
  if(reaction.type==='Khí')return ['gas','Bình phản ứng và ống dẫn khí'];
  return ['dropper','Ống nhỏ giọt và cốc phản ứng'];
}

const gasProducts=new Set(['H2','O2','CO2','NH3','Cl2','SO2','NO2']);
export function reactionEffect(reaction,products,apparatus){
  if(apparatus==='silver-mirror')return 'color';
  if(apparatus==='tongs'&&reaction.type==='Oxi hóa – khử'&&products.some(p=>p==='Cu'||p==='Ag'))return 'coating';
  if(reaction.type==='Cháy'||['furnace','thermite'].includes(apparatus)&&!products.some(p=>gasProducts.has(p)))return 'heat';
  if(reaction.equation.startsWith('CaCO3 + CO2')||reaction.equation.startsWith('Al(OH)3 + NaOH'))return 'dissolve';
  if(reaction.equation.startsWith('CaO + H2O'))return 'slake';
  if(reaction.type==='Trung hòa')return 'neutral';
  if(reaction.type==='Kết tủa')return 'precipitate';
  if(products.some(p=>gasProducts.has(p)))return 'gas';
  return 'color';
}
