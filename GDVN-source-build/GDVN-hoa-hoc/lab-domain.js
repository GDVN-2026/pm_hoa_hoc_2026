/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Scope checks, not an equilibrium solver. */
export const chemistrySources={
 amphoteric:{title:'University of Washington · Hydroxide lưỡng tính',url:'https://chem.washington.edu/lecture-demos/amphoteric-nature-aluminum-hydroxide'},
 hydroxides:{title:'OpenStax · Hydroxide và bazơ dư',url:'https://openstax.org/books/chemistry-2e/pages/18-9-occurrence-preparation-and-compounds-of-oxygen'},
 lime:{title:'UW–Madison · CO₂ và nước vôi',url:'https://demolab.chem.wisc.edu/aqueous-equilibrium-and-precipitation-reactions-reactions-between-carbon-dioxide-and-limewater/'},
 equilibrium:{title:'OpenStax · Kết tủa và hòa tan',url:'https://openstax.org/books/chemistry-2e/pages/15-1-precipitation-and-dissolution'},
 acid:{title:'OpenStax · Phản ứng acid–base',url:'https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions'},
 carbonate:{title:'UC Davis · Hệ carbonate và hai điểm tương đương',url:'https://chemistry.ucdavis.edu/sites/g/files/dgvnsk196/files/inline-files/Chem%202B%20Lab%20Manual%202018%20Summer.pdf'}
};
export function labDomain(balanced,quantity){
 const reactants=quantity.rows.slice(0,balanced.split),products=quantity.rows.slice(balanced.split);
 const active=products.some(r=>r.product>0);
 const excess=r=>r&&r.remaining>Math.max(r.initial,Number.MIN_VALUE)*1e-10;
 const hydroxide=reactants.find(r=>['NaOH','KOH'].includes(r.formula));
 const amphoteric=products.find(r=>['Al(OH)3','Zn(OH)2'].includes(r.formula));
 if(active&&amphoteric&&excess(hydroxide))return {blocked:true,code:'AMPHOTERIC-EXCESS',source:amphoteric.formula==='Al(OH)3'?'amphoteric':'hydroxides',message:amphoteric.formula+' có thể tan tiếp trong bazơ mạnh dư. Mô hình một phương trình tạo kết tủa không xác định được thành phần cuối của hệ này.',next:'Giảm bazơ về tỉ lệ phương trình để xem giai đoạn tạo kết tủa. Trường hợp bazơ dư cần xét tạo phức hydroxide và cân bằng; không dùng bảng tỉ lượng một bước như kết quả cuối.'};
 const co2=reactants.find(r=>r.formula==='CO2');
 if(active&&excess(co2)&&reactants.some(r=>r.formula==='Ca(OH)2'))return {blocked:true,code:'CO2-EXCESS',source:'lime',message:'CO₂ dư có thể làm CaCO₃ tan tiếp và giảm độ đục. Cảnh tạo kết tủa một bước không còn mô tả đầy đủ hệ.',next:'Xem giai đoạn CO₂ vừa đủ bằng tỉ lệ phương trình. Muốn dự đoán sau khi dẫn dư cần mô hình carbonate/hydrogencarbonate và điều kiện hòa tan khí.'};
 if(active&&hydroxide&&excess(reactants.find(r=>r.formula==='H2SO4'))&&products.some(r=>/^(Na|K)2SO4$/.test(r.formula)))return {blocked:true,code:'PARTIAL-NEUTRALIZATION',source:'acid',message:'Bazơ chưa đủ để trung hòa hoàn toàn hai proton theo phương trình tạo sulfate đã chọn.',next:'Hệ có thể chứa acid và hydrogensulfate. Web chưa giải cân bằng acid nhiều nấc; không coi lượng sulfate của một phương trình là thành phần cuối. Chọn tỉ lệ đủ bazơ để khảo sát trung hòa hoàn toàn.'};
 const solubleCarbonate=reactants.find(r=>['Na2CO3','K2CO3'].includes(r.formula));
 const acid=reactants.find(r=>['HCl','HNO3','CH3COOH'].includes(r.formula));
 if(active&&acid&&excess(solubleCarbonate)&&products.some(r=>r.formula==='CO2'))return {blocked:true,code:'CARBONATE-ACID-DEFICIT',source:'carbonate',message:'Axit chưa đủ để chuyển hết carbonate thành CO₂ theo phương trình tổng. Khi thêm axit vào dung dịch carbonate, hydrogencarbonate có thể hình thành ở nấc đầu.',next:'Chọn Điền theo tỉ lệ phương trình để xem trường hợp đủ axit. Phương trình tổng chỉ minh họa quá trình đến CO₂, nên cảnh và bảng lượng chất không dự đoán thành phần cuối khi thiếu axit.'};
 return {blocked:false,code:'SINGLE-EQUATION',source:'equilibrium',message:'Mô hình tỉ lượng theo một phương trình, giả định phản ứng hoàn toàn và điều kiện mô tả được đáp ứng.',next:'Không có thể tích, nồng độ và hằng số cân bằng đầy đủ để kiểm chứng mọi điều kiện thực nghiệm. Bọt, màu và thời gian chỉ minh họa.'};
}
