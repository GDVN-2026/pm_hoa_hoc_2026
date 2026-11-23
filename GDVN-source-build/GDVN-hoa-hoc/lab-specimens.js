/** Appearance in the selected reaction, independent of the pure substance's usual state. */
const gas={
 H2:'Hydrogen',O2:'Oxygen',N2:'Nitrogen',CO:'Carbon monoxide',CO2:'Carbon dioxide',
 CH4:'Methane',C2H4:'Ethene',NH3:'Ammonia',SO2:'Sulfur dioxide',SO3:'Sulfur trioxide',
 Cl2:'Chlorine',NO2:'Nitrogen dioxide'
};
const metals={Ag:'Bạc',Al:'Nhôm',Cu:'Đồng',Fe:'Sắt',Mg:'Magnesium',Na:'Natri',Zn:'Kẽm'};
const solidColors={
 C:'#3b3c3d',CuO:'#242729',Cu2O:'#a8442f',Fe2O3:'#a24f39',MnO2:'#363031',
 KMnO4:'#593568',K2MnO4:'#427356',AgCl:'#f1eee7',AgBr:'#f1dfaa',AgI:'#e4bb45',
 Ag3PO4:'#eab843',PbI2:'#eac23d',PbBr2:'#f4ecd6','Cu(OH)2':'#2797d1',
 'Fe(OH)2':'#91a897','Fe(OH)3':'#a74a2f','Ni(OH)2':'#6e9b74',
 'Al(OH)3':'#f2f1eb','Mg(OH)2':'#f4f2eb','Zn(OH)2':'#f5f4ed','Mn(OH)2':'#e3dfd4'
};
const solutionColors={
 CuSO4:'#54b3d8','Cu(NO3)2':'#57b5dc',CuCl2:'#5aaea7',
 FeCl3:'#d6a94c','Fe(NO3)3':'#d9a849',FeCl2:'#a8bc9e',FeSO4:'#a8bf9d',NiSO4:'#75ac8d'
};
const visibleColors={
 CuSO4:'xanh lam', 'Cu(NO3)2':'xanh lam', CuCl2:'xanh lam đến xanh lục',
 FeCl3:'vàng đến nâu vàng','Fe(NO3)3':'vàng nhạt',FeCl2:'xanh lục nhạt',FeSO4:'xanh lục nhạt',
 NiSO4:'xanh lục','Cu(OH)2':'xanh lam','Fe(OH)2':'lục nhạt','Fe(OH)3':'nâu đỏ',
 'Ni(OH)2':'xanh lục','Mn(OH)2':'nhạt màu','Al(OH)3':'keo trắng',
 AgCl:'trắng',AgBr:'trắng kem',AgI:'vàng',Ag3PO4:'vàng',PbI2:'vàng',PbBr2:'trắng ngà',
 Cu2O:'đỏ gạch',CuO:'đen',CaCO3:'trắng',MgO:'trắng'
};
const names={
 H2O:'Nước',H2O2:'Hydrogen peroxide',HCl:'Hydrochloric acid',HNO3:'Nitric acid',H2SO4:'Sulfuric acid',
 HBr:'Hydrobromic acid',NaOH:'Natri hydroxide',KOH:'Kali hydroxide',NaCl:'Natri chloride',
 CaCO3:'Calcium carbonate',CaO:'Vôi sống',MgO:'Magnesium oxide',MgCO3:'Magnesium carbonate',
 Al2O3:'Aluminium oxide',Fe2O3:'Iron(III) oxide',CuO:'Copper(II) oxide',Cu2O:'Copper(I) oxide',
 MnO2:'Manganese dioxide',KMnO4:'Kali permanganate',K2MnO4:'Kali manganate',KClO3:'Kali chlorate',
 C:'Carbon',Br2:'Bromine',I2:'Iodine',C2H5OH:'Ethanol',C2H6O:'Ethanol',
 CH3COOH:'Acetic acid',C2H4O2:'Acetic acid',CH3CHO:'Ethanal',CH3NH2:'Methylamine',
 CH3NH3Cl:'Methylammonium chloride',C6H12O6:'Glucose',C6H7N:'Aniline',C6H4Br3N:'2,4,6-tribromoaniline',
 C57H110O6:'Tristearin',C18H35O2Na:'Natri stearate',C3H8O3:'Glycerol',C4H8O2:'Ethyl acetate',
 'Ag(NH3)2^+':'Ion diamminesilver(I)','OH^-':'Ion hydroxide','CH3COO^-':'Ion acetate','C6H11O7^-':'Ion gluconate',
 CH3COONa:'Natri acetate',CH3COOK:'Kali acetate',NaClO:'Natri hypochlorite','NaAl(OH)4':'Natri tetrahydroxoaluminate'
};
const ions={
 Ag:'Bạc',Al:'Aluminium',Ba:'Barium',Ca:'Calcium',Cu:'Copper(II)',Fe:'Iron',K:'Kali',Mg:'Magnesium',
 Mn:'Manganese(II)',Na:'Natri',Ni:'Nickel(II)',NH4:'Ammonium',Pb:'Lead(II)',Sr:'Strontium',Zn:'Kẽm'
};
const groups={Br:'bromide',Cl:'chloride',I:'iodide',CO3:'carbonate',HCO3:'hydrogencarbonate',
 NO3:'nitrate',OH:'hydroxide',PO4:'phosphate',SO3:'sulfite',SO4:'sulfate'};
function chemicalName(f){
 if(names[f]||gas[f]||metals[f])return names[f]||gas[f]||metals[f];
 const m=f.match(/^(\(NH4\)|NH4|Ag|Al|Ba|Ca|Cu|Fe|K|Mg|Mn|Na|Ni|Pb|Sr|Zn)\d*(?:\(([A-Z][A-Za-z0-9]+)\)\d*|(Br|Cl|I)\d*|([A-Z][A-Za-z0-9]*))$/);
 if(!m)return f;
 const [,symbol,polyatomic,halide,single]=m;
 const group=groups[polyatomic||halide||single];
 const cation=symbol==='Fe'?(f.includes('(NO3)3')||f.includes('(OH)3')||f==='FeCl3'?'Iron(III)':'Iron(II)'):ions[symbol.replace(/[()]/g,'')];
 return group?cation+' '+group:f;
}
function sample(kind,description,color){
 return {kind,description,color};
}
export function labSpecimen(f,reaction,product){
 const eq=reaction.equation;
 const chloralkali=eq.startsWith('NaCl + H2O');
 const moltenSalt=eq.startsWith('NaCl ->');
 const hall=eq.startsWith('Al2O3 + C');
 const thermal=reaction.type==='Nhiệt phân'||['furnace','blast'].includes(reaction.apparatus);
 const tollens=reaction.apparatus==='silver-mirror';
 const isPrecipitate=product&&reaction.type==='Kết tủa'&&f===eq.split(' -> ')[1].split(' + ')[0];
 let view;
 if(f==='Na'&&moltenSalt||f==='Al'&&hall||f==='Fe'&&product&&eq.startsWith('Al + Fe2O3')) view=sample('melt','Kim loại lỏng trong cảnh','#a5adb4');
 else if(f==='Fe'&&product&&eq.startsWith('Fe2O3 + CO')) view=sample('melt','Sắt trong gang lỏng','#a5adb4');
 else if(f==='Al2O3'&&hall) view=sample('melt','Alumina hòa trong cryolite nóng chảy','#d6c6aa');
 else if(f==='NaCl'&&moltenSalt) view=sample('melt','Muối nóng chảy','#d6c6aa');
 else if(f==='H2O'&&product&&(reaction.type==='Cháy'||thermal)) view=sample('gas','Hơi nước','#edf4f5');
 else if(f==='I2'||f==='Br2'||f==='Cl2'&&!product&&reaction.apparatus==='dropper'){
   view=sample('liquid',f==='I2'?'Màu nâu trong hỗn hợp iodide':f==='Br2'?'Màu vàng cam đến nâu trong nước':'Nước chlorine, vàng lục nhạt',f==='I2'?'#8d5432':f==='Br2'?'#ba792e':'#c3ce74');
 }else if(gas[f]&&!(f==='NH3'&&tollens)){
   const color={Cl2:'#c1cc71',NO2:'#ba672e'}[f];
   view=sample('gas',color?(f==='Cl2'?'Khí vàng lục':'Khí nâu đỏ'):'Khí không màu',color||'#edf4f5');
 }else if(metals[f]){
   const deposited=product&&(f==='Ag'||f==='Cu');
   view=sample('metal',deposited?(tollens?'Lớp bạc bám thành ống':'Kim loại bám trên mẫu'):'Mẫu kim loại rắn',f==='Cu'?'#b55e39':'#a8afb5');
 }else if(isPrecipitate||f==='Cu2O'){
   const color=solidColors[f]||reaction.deposit||'#f4f2eb';
   view=sample('precipitate',visibleColors[f]?'Kết tủa '+visibleColors[f]:'Kết tủa trong hỗn hợp',color);
 }else if(f==='Al(OH)3'&&!product&&eq.startsWith('Al(OH)3')||f==='CaCO3'&&!product&&eq.startsWith('CaCO3 + CO2')){
   view=sample('precipitate','Kết tủa có sẵn trong hỗn hợp',solidColors[f]||'#f4f2eb');
 }else if(f==='C'||f==='Al2O3'||f==='Fe2O3'||f==='CuO'||f==='CaO'||f==='MgO'||f==='MnO2'||f==='CaCO3'||f==='MgCO3'||thermal||
          (f==='Cu(OH)2'&&!product)||(f==='Ca(OH)2'&&product)){
   view=sample('solid',visibleColors[f]?'Chất rắn '+visibleColors[f]:'Chất rắn trong cảnh',solidColors[f]||'#eeeae0');
 }else if(f.includes('^')||f==='NH3'&&tollens){
   view=sample('solution','Thành phần hòa tan trong hỗn hợp','#dbe7e9');
 }else if((f==='C2H6O'&&eq.startsWith('C6H12O6 ->'))||f==='C3H8O3'){
   view=sample('solution','Hòa trong hỗn hợp sản phẩm','#dfebec');
 }else if(['C2H5OH','C2H6O','C4H8O2','H2O'].includes(f)){
   view=sample('liquid',product?'Trong hỗn hợp sản phẩm':'Chất lỏng không màu','#e4eded');
 }else if(f==='C57H110O6'){
   view=sample('solid','Chất béo rắn trước khi gia nhiệt','#eee1b6');
 }else {
   const color=solutionColors[f];
   const description=f==='NaCl'&&chloralkali?'Dung dịch nước muối':color?'Dung dịch '+visibleColors[f]:'Hòa trong dung dịch';
   view=sample('solution',description,color||'#dfebec');
 }
 return {...view,name:chemicalName(f)};
}

