/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {molarMass,balanceEquation} from './chemistry.js';
export const pilotLessons = [
  {
    "id": "pilot-01",
    "grade": 6,
    "title": "Tách chất và sự chuyển thể",
    "tool": "separation",
    "goal": "Tách chất và sự chuyển thể",
    "predict": "Giải thích đoạn gần 0 °C khi nước đá tinh khiết nóng chảy và cách thu riêng cát, nước, muối.",
    "activity": "Dùng dữ liệu mô phỏng để nhận biết chuyển thể. Trong mô hình tách hỗn hợp, chọn lọc trước, rồi chưng cất để thu nước và giữ dung dịch muối còn lại để kết tinh.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Giải thích đoạn gần 0 °C khi nước đá tinh khiết nóng chảy và cách thu riêng cát, nước, muối.",
    "answer": "Ở áp suất thường, dự đoán đoạn gần 0 °C khi nước đá tinh khiết nóng chảy, giải thích nhiệt cung cấp làm chuyển thể trong mô hình lí tưởng. Với cát, nước và muối tan, chọn lọc để giữ cát, chưng cất để thu nước ngưng tụ, kết tinh muối từ phần dung dịch còn lại.",
    "limit": "Dùng công cụ để phân tích mô hình và dữ kiện. Giáo viên đánh giá thao tác thực hành riêng.",
    "pilot": true
  },
  {
    "id": "pilot-02",
    "grade": 7,
    "title": "Bảng tuần hoàn và lập công thức",
    "tool": "equation",
    "goal": "Bảng tuần hoàn và lập công thức",
    "predict": "Lập công thức từ Fe(III) và sulfate(II). Tìm công thức phân tử với C 40%, H 6,67%, O 53,33% và khối lượng 180 u.",
    "activity": "Dùng bảng 20 nguyên tố đầu để tra ký hiệu và khối lượng dùng trong bài tập. Lập công thức từ hóa trị, rồi suy ra công thức phân tử từ thành phần.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Lập công thức từ Fe(III) và sulfate(II). Tìm công thức phân tử với C 40%, H 6,67%, O 53,33% và khối lượng 180 u.",
    "answer": "Fe(III) và sulfate hóa trị II, viết 3x = 2y và tỉ lệ 2:3, viết Fe₂(SO₄)₃ và tính khối lượng đơn vị công thức ≈ 400 u theo số liệu làm tròn. Với C 40,0%, H 6,67%, O 53,33% và khối lượng phân tử 180 u, tìm 1:2:1, CH₂O, hệ số 6 và C₆H₁₂O₆.",
    "limit": "Ghi giả thiết và đơn vị theo đề khi trình bày.",
    "pilot": true
  },
  {
    "id": "pilot-03",
    "grade": 8,
    "title": "Mol, thể tích khí và tỉ khối",
    "tool": "solution",
    "goal": "Mol, thể tích khí và tỉ khối",
    "predict": "Tính V của 0,500 mol CO₂ ở 25 °C và 1 bar. Tính tỉ khối SO₂ so với O₂ và không khí.",
    "activity": "Đổi mol và thể tích khí theo hai chiều, so sánh tỉ khối ở cùng nhiệt độ và áp suất.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Tính V của 0,500 mol CO₂ ở 25 °C và 1 bar. Tính tỉ khối SO₂ so với O₂ và không khí.",
    "answer": "Nêu V = 24,79n ở 25 °C, 1 bar trong mô hình khí lí tưởng, tính 0,500 mol ứng với 12,395 L trước làm tròn. SO₂ so với O₂ bằng 64/32 = 2, so với không khí bằng 64/29 ≈ 2,21. Tỉ khối không có đơn vị.",
    "limit": "Ghi giả thiết và đơn vị theo đề khi trình bày.",
    "pilot": true
  },
  {
    "id": "pilot-04",
    "grade": 8,
    "title": "Pha chế dung dịch và đọc pH",
    "tool": "solution",
    "goal": "Pha chế dung dịch và đọc pH",
    "predict": "Pha 200 g dung dịch NaCl 15% cần bao nhiêu chất tan và nước? Phân loại các mẫu có pH 2,5; 7,0; 11,2.",
    "activity": "Phân biệt nồng độ phần trăm theo khối lượng với nồng độ mol. Đọc số đo pH.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Pha 200 g dung dịch NaCl 15% cần bao nhiêu chất tan và nước? Phân loại các mẫu có pH 2,5; 7,0; 11,2.",
    "answer": "Pha 200 g dung dịch NaCl 15% cần 30 g NaCl và 170 g nước. Nêu cân chất tan, cân nước rồi hòa tan hoàn toàn. Ở 25 °C, pH 2,5/7,0/11,2 lần lượt là acid/trung tính/base. Quỳ tím đỏ ở mẫu acid và xanh ở mẫu base.",
    "limit": "Dùng công cụ để phân tích mô hình và dữ kiện. Giáo viên đánh giá thao tác thực hành riêng.",
    "pilot": true
  },
  {
    "id": "pilot-05",
    "grade": 9,
    "title": "Dãy hoạt động của kim loại",
    "tool": "lab",
    "goal": "Dãy hoạt động của kim loại",
    "predict": "Fe giải phóng hydrogen trong acid loãng, Cu không có hiện tượng đó. Fe đẩy Cu²⁺ và Cu đẩy Ag⁺. Sắp xếp Fe, H, Cu, Ag và viết các phương trình ion.",
    "activity": "Đọc dữ liệu quan sát đã cho để so sánh hoạt động hóa học. Dùng bảng tuần hoàn để nhận diện nguyên tố, dùng bằng chứng phản ứng để lập thứ tự.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Fe giải phóng hydrogen trong acid loãng, Cu không có hiện tượng đó. Fe đẩy Cu²⁺ và Cu đẩy Ag⁺. Sắp xếp Fe, H, Cu, Ag và viết các phương trình ion.",
    "answer": "Với dữ liệu Fe giải phóng H₂ trong HCl loãng, Cu không cho H₂ trong cùng điều kiện, Fe đẩy Cu²⁺ và Cu đẩy Ag⁺, suy ra Fe > (H) > Cu > Ag. Giải thích theo từng đối chứng. Viết Fe + 2H⁺ → Fe²⁺ + H₂, Fe + Cu²⁺ → Fe²⁺ + Cu và Cu + 2Ag⁺ → Cu²⁺ + 2Ag. Thảo luận riêng Na với nước như ví dụ quan sát do giáo viên cung cấp.",
    "limit": "Dùng công cụ để phân tích mô hình và dữ kiện. Giáo viên đánh giá thao tác thực hành riêng.",
    "pilot": true
  },
  {
    "id": "pilot-06",
    "grade": 10,
    "title": "Cấu hình electron và công thức Lewis",
    "tool": "config",
    "goal": "Cấu hình electron và công thức Lewis",
    "predict": "Viết cấu hình Na và vẽ Lewis của NH₃ và CO₂.",
    "activity": "Viết cấu hình lớp, phân lớp và ô orbital cho nguyên tố trong 20 nguyên tố đầu. Biểu diễn công thức Lewis.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Viết cấu hình Na và vẽ Lewis của NH₃ và CO₂.",
    "answer": "Viết Na là 1s² 2s² 2p⁶ 3s¹, phân bố 2–8–1, vẽ ô 3s có một electron và giải thích. NH₃ có 3 liên kết đơn và 1 cặp riêng trên N. CO₂ có hai liên kết đôi, mỗi O có 2 cặp riêng. Fe và ion Fe là bài mở rộng.",
    "limit": "Ghi giả thiết và đơn vị theo đề khi trình bày.",
    "pilot": true
  },
  {
    "id": "pilot-07",
    "grade": 10,
    "title": "Tương tác phân tử và xu hướng tuần hoàn",
    "tool": "periodic",
    "goal": "Tương tác phân tử và xu hướng tuần hoàn",
    "predict": "Giải thích vì sao H₂O có nhiệt độ sôi cao hơn H₂S. So sánh độ âm điện, tính kim loại và hydroxide của Na, Mg, Al.",
    "activity": "Dùng dữ liệu nhiệt độ sôi để giải thích tương tác giữa phân tử. So sánh xu hướng trong chu kỳ 3.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Giải thích vì sao H₂O có nhiệt độ sôi cao hơn H₂S. So sánh độ âm điện, tính kim loại và hydroxide của Na, Mg, Al.",
    "answer": "Nêu nhiệt độ sôi thường của H₂O cao hơn H₂S ở cùng áp suất, giải thích H₂O tạo mạng liên kết hydrogen liên phân tử, H₂S vẫn có tương tác lưỡng cực và phân tán. Độ âm điện Na < Mg < Al và tính kim loại Al < Mg < Na. NaOH, Mg(OH)₂ và Al(OH)₃ lần lượt minh họa hydroxide base, hydroxide base ít tan và hydroxide lưỡng tính.",
    "limit": "Ghi giả thiết và đơn vị theo đề khi trình bày.",
    "pilot": true
  },
  {
    "id": "pilot-08",
    "grade": 11,
    "title": "Cân bằng và chuẩn độ",
    "tool": "solution",
    "goal": "Cân bằng và chuẩn độ",
    "predict": "Với A ⇌ B, Kc = 4, [A] = 0,5 M và [B] = 2,0 M, tính Qc. Tính nồng độ 10,00 mL NaOH khi dùng 12,50 mL HCl 0,100 M tại điểm kết thúc.",
    "activity": "So sánh Qc và Kc của một hệ đồng thể giả định. Dùng dữ liệu chuẩn độ base mạnh bằng acid mạnh.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Với A ⇌ B, Kc = 4, [A] = 0,5 M và [B] = 2,0 M, tính Qc. Tính nồng độ 10,00 mL NaOH khi dùng 12,50 mL HCl 0,100 M tại điểm kết thúc.",
    "answer": "Với A ⇌ B, Kc = 4 và [A] = 0,5 M, [B] = 2,0 M, Qc = 4, hệ đang ở cân bằng theo mô hình. Biến thể [B] = 1,0 hoặc 3,0 M cho chiều thuận hoặc nghịch. 10,00 mL NaOH được chuẩn độ bằng HCl 0,100 M. Dùng 12,50 mL tại điểm kết thúc làm xấp xỉ điểm tương đương, suy ra 0,125 M. Với phenolphthalein, dung dịch trong bình chuyển từ hồng nhạt sang mất màu khi thêm acid đến điểm kết thúc theo quy ước của bài.",
    "limit": "Dùng công cụ để phân tích mô hình và dữ kiện. Giáo viên đánh giá thao tác thực hành riêng.",
    "pilot": true
  },
  {
    "id": "pilot-09",
    "grade": 12,
    "title": "Pin điện hóa và điện phân",
    "tool": "electro",
    "goal": "Pin điện hóa và điện phân",
    "predict": "Xác định điện cực, chiều electron và E° của pin Zn/Cu với thế khử −0,76 V và +0,34 V. Tính lượng Cu khi điện phân CuSO₄ bằng 2 A trong 1930 s, F = 96500, M = 64, hiệu suất dòng 100%.",
    "activity": "Phân biệt dấu điện cực giữa pin và bình điện phân. Đọc bán phản ứng và tính khối lượng từ điện lượng.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "Xác định điện cực, chiều electron và E° của pin Zn/Cu với thế khử −0,76 V và +0,34 V. Tính lượng Cu khi điện phân CuSO₄ bằng 2 A trong 1930 s, F = 96500, M = 64, hiệu suất dòng 100%.",
    "answer": "Pin Zn/Cu có Zn là anot âm, Cu là catot dương, electron đi Zn → Cu ở mạch ngoài. Viết Zn + Cu²⁺ → Zn²⁺ + Cu. Tính E° = 1,10 V với số liệu đề cho. Điện phân CuSO₄ với điện cực trơ trong mô hình đã cho, viết catot: Cu²⁺ + 2e⁻ → Cu; anot: 2H₂O → O₂ + 4H⁺ + 4e⁻, tính 1,28 g Cu từ I = 2,0 A, t = 1930 s, F = 96500 C/mol và M = 64 g/mol, hiệu suất dòng 100%.",
    "limit": "Dùng công cụ để phân tích mô hình và dữ kiện. Giáo viên đánh giá thao tác thực hành riêng.",
    "pilot": true
  },
  {
    "id": "pilot-10",
    "grade": 12,
    "title": "Carbohydrate và hợp chất chứa nitrogen",
    "tool": "reference",
    "goal": "Carbohydrate và hợp chất chứa nitrogen",
    "predict": "So sánh phản ứng Tollens của glucose, fructose, saccharose. Viết dạng ion lưỡng cực glycine và giải thích màu biuret.",
    "activity": "Phân biệt đường khử và nhận diện các cấp cấu tạo từ amino acid đến protein.",
    "explain": "Hoàn thành câu kiểm tra rồi mở đáp án và lời giải để đối chiếu.",
    "check": "So sánh phản ứng Tollens của glucose, fructose, saccharose. Viết dạng ion lưỡng cực glycine và giải thích màu biuret.",
    "answer": "Glucose và fructose cho phản ứng Tollens trong điều kiện bài xét, saccharose chưa thủy phân thì không. Giải thích dạng mạch hở của glucose, fructose chuyển hóa qua enediol thành aldose trong môi trường kiềm, saccharose có cả hai carbon anomer tham gia liên kết glycoside. Viết H₃N⁺–CH₂–COO⁻ của glycine. Giải thích màu tím biuret do ion Cu²⁺ tạo phức với các liên kết peptide trong môi trường kiềm.",
    "limit": "Ghi giả thiết và đơn vị theo đề khi trình bày.",
    "pilot": true
  }
];

export const lessons=[
{id:'atom',title:'Nguyên tử và ion',goal:'Xác định proton, neutron, electron; phân biệt nguyên tử với ion.',tool:'atom',predict:'Một nguyên tử mất hai electron thì hạt nhân có thay đổi không?',activity:'Chọn Na, đặt A = 23. So sánh điện tích 0 và +1; ghi số proton, neutron, electron.',explain:'Z = số proton; neutron = A − Z; electron = Z − q với q là điện tích tính theo đơn vị điện tích nguyên tố. Na và Na⁺ vẫn có 11 proton.',check:'Na⁺ có Z = 11, A = 23. Có bao nhiêu hạt mỗi loại?',answer:'11 proton, 12 neutron, 10 electron.',limit:'Quỹ đạo Bohr là mô hình minh họa; A phải là số khối của đồng vị đang xét.'},
{id:'bond',title:'Hình dạng và liên kết',goal:'Liên hệ miền electron và hình dạng phân tử đơn giản.',tool:'bond',predict:'Có hai liên kết quanh nguyên tử trung tâm thì phân tử luôn thẳng?',activity:'Đối chiếu AX₂ và AX₂E₂. Quan sát hướng liên kết và số cặp electron tự do được mô tả.',explain:'Trong VSEPR, cả miền liên kết và cặp electron tự do ảnh hưởng hình dạng. AX₂ không có cặp tự do có dạng thẳng; AX₂E₂ có dạng gấp khúc.',check:'Vì sao không suy ra H₂O thẳng chỉ từ công thức?',answer:'O có hai cặp electron tự do bên cạnh hai liên kết O–H; phân tử nước gấp khúc.',limit:'VSEPR là mô hình dự đoán; góc thực tế phụ thuộc chất, không phải mọi AX₂E₂ đều có cùng góc.'},
{id:'mol',title:'Từ khối lượng đến lượng chất',goal:'Dùng n = m/M, phân biệt g với mol.',tool:'solution',predict:'Cùng 10 g thì mọi chất có cùng số mol không?',activity:'Ở cùng khối lượng 10 g, H₂O có số mol lớn hơn CO₂ vì có khối lượng mol nhỏ hơn.',explain:'M là khối lượng mol, đơn vị g/mol. Cùng khối lượng m, chất có M lớn hơn có số mol nhỏ hơn.',check:'18 g chất có M = 18 g/mol tương ứng bao nhiêu mol?',answer:'n = 18/18 = 1 mol. Số liệu M ở ví dụ này được làm tròn.',limit:'Phân biệt khối lượng mol của chất với nguyên tử khối; công cụ tính theo dữ liệu nguyên tử khối tích hợp.'},
{id:'reaction',title:'Bảo toàn và chất giới hạn',goal:'Cân bằng nguyên tử, dùng hệ số mol để tìm chất hết trước.',tool:'equation',predict:'Chất có khối lượng nhỏ hơn có luôn hết trước không?',activity:'Với phương trình 2H₂ + O₂ → 2H₂O, so sánh lượng chất chia cho hệ số để tìm chất giới hạn.',explain:'Với aA + bB → sản phẩm, mức tiến triển tối đa là min(nA/a, nB/b). So sánh mol theo hệ số, không so sánh trực tiếp gam.',check:'2 mol H₂ và 2 mol O₂ tạo tối đa bao nhiêu mol H₂O?',answer:'H₂ giới hạn: min(2/2, 2/1) = 1 mol mức tiến triển; tạo 2 mol H₂O, dư 1 mol O₂.',limit:'Giả sử phản ứng xảy ra theo phương trình đã chọn, hoàn toàn và không có phản ứng phụ.'},
{id:'solution',title:'Nồng độ và pha loãng',goal:'Tính C = n/V và lượng dung dịch gốc cần lấy.',tool:'solution',predict:'Thêm nước thì số mol chất tan có tăng không?',activity:'Giữ nguyên lượng chất tan, tăng thể tích dung dịch gấp đôi. Đối chiếu nồng độ trước và sau.',explain:'Pha loãng không làm đổi số mol chất tan nếu không phản ứng hay thất thoát. C₁V₁ = C₂V₂; các thể tích dùng cùng đơn vị.',check:'Pha 100 mL dung dịch 0,1 M từ dung dịch 1 M cần bao nhiêu mL dung dịch gốc?',answer:'V₁ = 0,1 × 100 / 1 = 10 mL; thêm nước đến thể tích cuối 100 mL.',limit:'Thể tích cuối là thể tích dung dịch, không mặc định cộng chính xác thể tích nước với thể tích ban đầu.'},
{id:'acid',title:'pH của dung dịch đơn giản',goal:'Liên hệ nồng độ H⁺ với pH trong phạm vi mô hình.',tool:'solution',predict:'Pha loãng axit mạnh mười lần thì pH thay đổi thế nào?',activity:'Đối chiếu HCl 0,01 M và 0,001 M ở 25 °C trong mô hình axit mạnh.',explain:'Với axit mạnh một nấc và dung dịch loãng phù hợp, [H⁺] xấp xỉ C và pH xấp xỉ −log₁₀C. Pha loãng mười lần làm pH tăng khoảng 1.',check:'HCl 0,001 M có pH gần bằng bao nhiêu?',answer:'pH xấp xỉ 3 ở 25 °C, khi có thể bỏ qua hoạt độ và sự tự ion hóa của nước.',limit:'Không áp dụng trực tiếp công thức này cho axit yếu, dung dịch đậm đặc hoặc cực loãng.'},
{id:'electro',title:'Electron trong pin hóa học',goal:'Phân biệt oxi hóa/khử và chiều electron qua mạch ngoài.',tool:'electro',predict:'Electron chạy trong dây dẫn từ nơi nhận hay nơi nhường electron?',activity:'Chọn pin Zn/Cu. Xác định điện cực Zn bị oxi hóa và điện cực Cu²⁺ bị khử.',explain:'Anode xảy ra oxi hóa, cathode xảy ra khử. Trong pin galvanic Zn/Cu, electron đi ở mạch ngoài từ Zn sang Cu; cầu muối giúp duy trì trung hòa điện.',check:'Trong Zn → Zn²⁺ + 2e⁻, Zn bị oxi hóa hay khử?',answer:'Zn nhường electron nên bị oxi hóa.',limit:'Dấu điện cực phụ thuộc pin hay điện phân; định nghĩa anode/cathode theo oxi hóa/khử luôn giữ nguyên.'},
{id:'separate',title:'Chọn cách tách hỗn hợp',goal:'Chọn phương pháp dựa trên tính chất vật lý.',tool:'separation',predict:'Lọc có tách được muối đã hòa tan trong nước không?',activity:'So sánh cát–nước, muối–nước và hai chất lỏng khác độ bay hơi. Chọn phương pháp và giải thích.',explain:'Lọc giữ hạt rắn không tan; cô kết tinh có thể thu chất tan phù hợp; chưng cất thu cấu tử dựa trên độ bay hơi. Phải xét độ bền nhiệt và mục tiêu cần thu.',check:'Muốn thu nước từ nước muối trong mô hình đơn giản, chọn cách nào?',answer:'Chưng cất: hóa hơi nước rồi ngưng tụ; muối không bay hơi được giữ lại trong điều kiện phù hợp.',limit:'Mô phỏng dùng để học nguyên lý; không phải hướng dẫn tự tiến hành với hóa chất hoặc thiết bị thực.'}
];
// Independently authored questions. Indices refer to the displayed answer list.
const rows=[
['atom','Nguyên tử trung hòa có Z = 8 có bao nhiêu electron?',['8','16','4','0'],0,'Nguyên tử trung hòa có số electron bằng số proton, bằng Z.'],
['atom','Ion Na⁺ có Z = 11 có bao nhiêu electron?',['12','11','10','23'],2,'Na⁺ đã mất một electron: 11 − 1 = 10.'],
['atom','Đồng vị có A = 23, Z = 11 có bao nhiêu neutron?',['11','12','23','34'],1,'Số neutron bằng A − Z = 23 − 11 = 12.'],
['bond','AX₂ không có cặp electron tự do ở tâm có dạng gì?',['Thẳng','Gấp khúc','Tứ diện','Vuông phẳng'],0,'Hai miền liên kết trong mô hình VSEPR hướng ngược nhau.'],
['bond','Hình dạng phân tử H₂O là gì?',['Thẳng','Gấp khúc','Tam giác phẳng','Bát diện'],1,'O có hai liên kết và hai cặp electron tự do.'],
['bond','Trong mô hình VSEPR, liên kết đôi được tính là bao nhiêu miền electron?',['1','2','3','4'],0,'Liên kết bội được xem là một miền, dù có thể gây lực đẩy khác liên kết đơn.'],
['mol','Công thức đổi khối lượng sang số mol là gì?',['n = m/M','n = mM','n = M/m','n = m + M'],0,'m tính bằng g và M tính bằng g/mol thì n có đơn vị mol.'],
['mol','Với M = 44 g/mol, 22 g chất ứng với bao nhiêu mol?',['2','1','0,5','44'],2,'n = 22/44 = 0,5 mol.'],
['mol','Đơn vị thường dùng của khối lượng mol là gì?',['g','mol/L','g/mol','L/mol'],2,'Khối lượng của một mol chất có đơn vị g/mol.'],
['reaction','Hệ số tối giản của H₂ + O₂ → H₂O là gì?',['1 : 1 : 1','2 : 1 : 2','1 : 2 : 1','2 : 2 : 1'],1,'Hai vế đều có 4 H và 2 O với hệ số 2, 1, 2.'],
['reaction','2 mol H₂ và 2 mol O₂ phản ứng hoàn toàn theo 2H₂ + O₂ → 2H₂O. Chất nào giới hạn?',['H₂','O₂','Cả hai vừa đủ','Không xác định được'],0,'n/Hệ số: H₂ là 1; O₂ là 2. H₂ hết trước.'],
['reaction','Khi cân bằng phương trình, có được đổi chỉ số trong công thức chất không?',['Có, tùy ý','Chỉ đổi chỉ số O','Không, chỉ điều chỉnh hệ số','Chỉ đổi chỉ số H'],2,'Đổi chỉ số sẽ đổi chất; cân bằng bằng hệ số đặt trước công thức.'],
['solution','0,2 mol chất tan trong 0,5 L dung dịch có C bằng bao nhiêu?',['0,1 M','0,4 M','2,5 M','0,7 M'],1,'C = n/V = 0,2/0,5 = 0,4 mol/L.'],
['solution','Pha loãng không phản ứng, không thất thoát thì đại lượng nào giữ nguyên?',['Thể tích','Nồng độ','Số mol chất tan','Khối lượng riêng'],2,'Thêm dung môi không thêm hoặc bớt chất tan.'],
['solution','Pha 100 mL dung dịch 0,1 M từ dung dịch 1 M cần lấy bao nhiêu dung dịch gốc?',['1 mL','10 mL','100 mL','1000 mL'],1,'V₁ = C₂V₂/C₁ = 10 mL.'],
['acid','HCl 0,001 M có pH xấp xỉ bao nhiêu ở 25 °C trong mô hình loãng lý tưởng?',['1','2','3','11'],2,'pH ≈ −log₁₀(10⁻³) = 3.'],
['acid','Dung dịch trung tính ở 25 °C có đặc điểm nào?',['[H⁺] = [OH⁻]','Không chứa ion','Luôn có pH = 0','Chỉ chứa H⁺'],0,'Trung tính nghĩa là nồng độ H⁺ và OH⁻ bằng nhau.'],
['acid','Có thể dùng [H⁺] = C trực tiếp cho mọi axit yếu không?',['Luôn luôn','Không; cần xét cân bằng phân li','Chỉ cần đổi dấu C','Chỉ khi C lớn hơn 1'],1,'Axit yếu không phân li hoàn toàn; cần xét Ka và cân bằng.'],
['electro','Oxi hóa là quá trình nào?',['Nhận electron','Nhường electron','Nhận proton','Luôn tạo khí'],1,'Oxi hóa là nhường electron, làm tăng số oxi hóa.'],
['electro','Cathode là nơi xảy ra quá trình nào?',['Khử','Oxi hóa','Bay hơi','Kết tinh'],0,'Cathode luôn là nơi khử, ở cả pin và bình điện phân.'],
['electro','Trong pin Zn/Cu đang phát điện, electron ở mạch ngoài đi theo chiều nào?',['Cu → Zn','Zn → Cu','Qua cầu muối','Không chuyển động'],1,'Zn nhường electron ở anode; electron qua dây đến cathode Cu.'],
['separate','Cát không tan lẫn trong nước có thể tách bằng cách nào?',['Lọc','Chỉ thêm nước','Điện phân','Chuẩn độ'],0,'Hạt cát không tan có thể bị giữ trên vật liệu lọc phù hợp.'],
['separate','Muốn thu nước từ nước muối bằng phương pháp đơn giản, chọn gì?',['Lọc giấy','Chưng cất','Để nam châm gần','Chiết bằng chính nước'],1,'Nước hóa hơi rồi ngưng tụ, còn muối không bay hơi trong điều kiện phù hợp.'],
['separate','Chưng cất chủ yếu khai thác sự khác nhau về tính chất nào?',['Độ bay hơi','Màu sắc','Số neutron','Từ tính'],0,'Sự khác nhau về độ bay hơi cho phép làm giàu cấu tử trong pha hơi.']
];
export const questions=rows.map(([topic,prompt,answers,correct,explanation],i)=>({id:'gdvn-q'+(i+1),topic,prompt,answers,correct,explanation}));
export function selectQuestions(topic='all',count=10,random=Math.random){const pool=questions.filter(q=>topic==='all'||q.topic===topic);for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,Math.min(Math.max(1,count),pool.length));}
const positive=(n,label)=>{if(!Number.isFinite(n)||n<=0)throw Error(label+' phải là số dương.');return n;};
export function solveTeaching(type,input){
const f=n=>Number(n.toPrecision(7)).toLocaleString('vi-VN',{maximumFractionDigits:9});
if(type==='gas-volume'||type==='gas-moles'){
  const amount=positive(input.amount,'Giá trị đã biết');
  const toVolume=type==='gas-volume';
  return ['Khí lý tưởng ở 25 °C và 1 bar, Vₘ ≈ 24,79 L/mol.',
    toVolume?'V = n × Vₘ':'n = V / Vₘ',
    'Kết quả: '+f(toVolume?amount*24.79:amount/24.79)+(toVolume?' L':' mol')+'.'];
}
if(type==='gas-density'){
  const a=positive(input.a,'Khối lượng mol khí A'),b=positive(input.b,'Khối lượng mol khí đối chiếu');
  return ['So sánh hai khí ở cùng nhiệt độ và áp suất. Với không khí, dùng M ≈ 29 g/mol.','d = M(A) / M(đối chiếu) = '+f(a)+' / '+f(b)+' = '+f(a/b)+'. Tỉ khối không có đơn vị.'];
}
if(type==='mass-percent'){
  const mass=positive(input.mass,'Khối lượng dung dịch'),percent=positive(input.percent,'Nồng độ phần trăm');
  if(percent>=100)throw Error('Nồng độ phải nhỏ hơn 100%.');
  const solute=mass*percent/100;
  return ['Khối lượng chất tan = khối lượng dung dịch × C% / 100 = '+f(solute)+' g.','Khối lượng nước = khối lượng dung dịch − khối lượng chất tan = '+f(mass-solute)+' g.','Kiểm tra độ tan của chất ở nhiệt độ pha chế.'];
}
if(type==='mol'){const m=positive(input.mass,'Khối lượng'),M=molarMass(input.formula);return ['Xác định chất: '+input.formula+'; tính M = '+f(M)+' g/mol.','Đổi khối lượng: m = '+f(m)+' g.','Áp dụng n = m/M = '+f(m)+' / '+f(M)+'.','Kết quả: n = '+f(m/M)+' mol.'];}
if(type==='concentration'){const n=positive(input.moles,'Số mol'),ml=positive(input.volume,'Thể tích');return ['Dữ kiện: n = '+f(n)+' mol; V = '+f(ml)+' mL.','Đổi đơn vị: V = '+f(ml/1000)+' L.','Áp dụng C = n/V = '+f(n)+' / '+f(ml/1000)+'.','Kết quả: C = '+f(n/(ml/1000))+' mol/L.'];}
if(type==='dilution'){const c1=positive(input.c1,'Nồng độ gốc'),c2=positive(input.c2,'Nồng độ đích'),v2=positive(input.v2,'Thể tích cuối');if(c2>c1)throw Error('Pha loãng yêu cầu nồng độ đích không lớn hơn nồng độ gốc.');const v1=c2*v2/c1;return ['Không phản ứng, không thất thoát: n trước = n sau.','C₁V₁ = C₂V₂ ⇒ V₁ = C₂V₂/C₁.','V₁ = '+f(c2)+' × '+f(v2)+' / '+f(c1)+' = '+f(v1)+' mL.','Lấy '+f(v1)+' mL dung dịch gốc; thêm dung môi đến thể tích cuối '+f(v2)+' mL. Không mặc định cộng thể tích nước.'];}
if(type==='ph'){const c=positive(input.c,'Nồng độ');if(c>0.1)throw Error('Mô hình này giới hạn C ≤ 0,1 M; dung dịch đậm đặc cần xét hoạt độ.');const h=(c+Math.sqrt(c*c+4e-14))/2;return ['Giả thiết: axit mạnh một nấc, điện li hoàn toàn, mô hình nồng độ lý tưởng ở 25 °C.','Cân bằng điện tích: [H⁺] = C + [OH⁻]; Kw = 10⁻¹⁴.','Tính cả nước: [H⁺] = (C + √(C² + 4Kw))/2 = '+h.toExponential(6)+' mol/L.','pH = −log₁₀[H⁺] = '+f(-Math.log10(h))+'. Giá trị thực có thể khác do hoạt độ.'];}
if(type==='limiting'){const eq=balanceEquation(input.equation);if(eq.split!==2)throw Error('Bài hướng dẫn này cần đúng hai chất phản ứng.');const masses=[positive(input.a,'Khối lượng chất 1'),positive(input.b,'Khối lượng chất 2')],mol=masses.map((m,i)=>m/molarMass(eq.all[i])),extent=Math.min(...mol.map((n,i)=>n/eq.coefficients[i])),ratio=mol.map((n,i)=>n/eq.coefficients[i]);const tied=Math.abs(ratio[0]-ratio[1])<=1e-9*Math.max(...ratio);return ['Cân bằng: '+eq.text,'Đổi mol: '+eq.all.slice(0,2).map((name,i)=>name+': '+f(masses[i])+'/'+f(molarMass(name))+' = '+f(mol[i])+' mol').join('; '),'So sánh n/hệ số: '+ratio.map(f).join(' và ')+'. '+(tied?'Hai chất vừa đủ theo tỉ lệ.':eq.all[ratio[0]<ratio[1]?0:1]+' là chất giới hạn.')+' Mức tiến triển = '+f(extent)+' mol.','Sản phẩm lý thuyết: '+eq.all.slice(2).map((name,i)=>{const n=eq.coefficients[i+2]*extent;return name+': '+f(n)+' mol ≈ '+f(n*molarMass(name))+' g';}).join('; '),'Chất phản ứng còn lại: '+eq.all.slice(0,2).map((name,i)=>name+': '+f(Math.max(0,mol[i]-eq.coefficients[i]*extent))+' mol').join('; ')+'. Giả sử phản ứng hoàn toàn, không có phản ứng phụ.'];}
throw Error('Chưa hỗ trợ dạng bài này.');
}
