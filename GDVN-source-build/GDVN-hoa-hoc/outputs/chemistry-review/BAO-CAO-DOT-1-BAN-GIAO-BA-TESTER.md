# Đợt 1 GDVN Hóa học — Hồ sơ nội dung và bàn giao BA/Tester

Ngày 13/11/2026 · Đích triển khai theo kế hoạch là 1.5.0-pilot1. Đã tích hợp 10 bài pilot vào bản web và kiểm thử tự động. Phiên bản package hiện vẫn là 1.4.0.

## 10 bài mẫu để duyệt

| Mã · lớp | Mục tiêu và hoạt động | Câu kiểm tra, đáp án và điểm |
| --- | --- | --- |
| P01 · 6 | Dùng dữ liệu mô phỏng để nhận biết chuyển thể. Trong mô hình tách hỗn hợp, chọn lọc trước, rồi chưng cất để thu nước và giữ dung dịch muối còn lại để kết tinh. | **5 đ:** Ở áp suất thường, dự đoán đoạn gần 0 °C khi nước đá tinh khiết nóng chảy (2,5), giải thích nhiệt cung cấp làm chuyển thể trong mô hình lí tưởng (2,5). **5 đ:** Với cát, nước và muối tan, chọn lọc để giữ cát (2), chưng cất để thu nước ngưng tụ (2), kết tinh muối từ phần dung dịch còn lại (1). |
| P02 · 7 | Dùng bảng 20 nguyên tố đầu để tra ký hiệu và khối lượng dùng trong bài tập. Lập công thức từ hóa trị, rồi suy ra công thức phân tử từ thành phần. | **4 đ:** Fe(III) và sulfate hóa trị II, viết 3x = 2y và tỉ lệ 2:3 (2), viết Fe₂(SO₄)₃ và tính khối lượng đơn vị công thức ≈ 400 u theo số liệu làm tròn (2). **6 đ:** Với C 40,0%, H 6,67%, O 53,33% và khối lượng phân tử 180 u, tìm 1:2:1 (2,5), CH₂O (1,5), hệ số 6 và C₆H₁₂O₆ (2). |
| P03 · 8 | Đổi mol và thể tích khí theo hai chiều, so sánh tỉ khối ở cùng nhiệt độ và áp suất. | **5 đ:** Nêu V = 24,79n ở 25 °C, 1 bar trong mô hình khí lí tưởng (2), tính 0,500 mol ứng với 12,395 L trước làm tròn (3). **5 đ:** SO₂ so với O₂ bằng 64/32 = 2 (2,5), so với không khí bằng 64/29 ≈ 2,21 (2,5). Tỉ khối không có đơn vị. |
| P04 · 8 | Phân biệt nồng độ phần trăm theo khối lượng với nồng độ mol. Đọc số đo pH. | **6 đ:** Pha 200 g dung dịch NaCl 15% cần 30 g NaCl và 170 g nước (3). Nêu cân chất tan, cân nước rồi hòa tan hoàn toàn (3). **4 đ:** Ở 25 °C, pH 2,5/7,0/11,2 lần lượt là acid/trung tính/base (2). Quỳ tím đỏ ở mẫu acid và xanh ở mẫu base (2). |
| P05 · 9 | Đọc dữ liệu quan sát đã cho để so sánh hoạt động hóa học. Dùng bảng tuần hoàn để nhận diện nguyên tố, dùng bằng chứng phản ứng để lập thứ tự. | **10 đ:** Với dữ liệu Fe giải phóng H₂ trong HCl loãng, Cu không cho H₂ trong cùng điều kiện, Fe đẩy Cu²⁺ và Cu đẩy Ag⁺, suy ra Fe > (H) > Cu > Ag (3). Giải thích theo từng đối chứng (3). Viết ba phương trình ion cân bằng tương ứng (4). Thảo luận riêng Na với nước như ví dụ quan sát do giáo viên cung cấp. |
| P06 · 10 | Viết cấu hình lớp, phân lớp và ô orbital cho nguyên tố trong 20 nguyên tố đầu. Biểu diễn công thức Lewis. | **5 đ:** Viết Na là 1s² 2s² 2p⁶ 3s¹ (2), phân bố 2–8–1 (1), vẽ ô 3s có một electron và giải thích (2). **5 đ:** NH₃ có 3 liên kết đơn và 1 cặp riêng trên N (2,5). CO₂ có hai liên kết đôi, mỗi O có 2 cặp riêng (2,5). Fe và ion Fe là bài mở rộng. |
| P07 · 10 | Dùng dữ liệu nhiệt độ sôi để giải thích tương tác giữa phân tử. So sánh xu hướng trong chu kỳ 3. | **5 đ:** Nêu nhiệt độ sôi thường của H₂O cao hơn H₂S ở cùng áp suất (1), giải thích H₂O tạo mạng liên kết hydrogen liên phân tử (3), H₂S vẫn có tương tác lưỡng cực và phân tán (1). **5 đ:** Độ âm điện Na < Mg < Al và tính kim loại Al < Mg < Na (2,5). NaOH, Mg(OH)₂ và Al(OH)₃ lần lượt minh họa hydroxide base, hydroxide base ít tan và hydroxide lưỡng tính (2,5). |
| P08 · 11 | So sánh Qc và Kc của một hệ đồng thể giả định. Dùng dữ liệu chuẩn độ base mạnh bằng acid mạnh. | **5 đ:** Với A ⇌ B, Kc = 4 và [A] = 0,5 M, [B] = 2,0 M, Qc = 4 (2,5), hệ đang ở cân bằng theo mô hình (2,5). Biến thể [B] = 1,0 hoặc 3,0 M cho chiều thuận hoặc nghịch. **5 đ:** 10,00 mL NaOH được chuẩn độ bằng HCl 0,100 M. Dùng 12,50 mL tại điểm kết thúc làm xấp xỉ điểm tương đương, suy ra 0,125 M (3). Với phenolphthalein, dung dịch trong bình chuyển từ hồng nhạt sang mất màu khi thêm acid đến điểm kết thúc theo quy ước của bài (2). |
| P09 · 12 | Phân biệt dấu điện cực giữa pin và bình điện phân. Đọc bán phản ứng và tính khối lượng từ điện lượng. | **5 đ:** Pin Zn/Cu có Zn là anot âm, Cu là catot dương, electron đi Zn → Cu ở mạch ngoài (2). Viết Zn + Cu²⁺ → Zn²⁺ + Cu (1,5). Tính E° = 1,10 V với số liệu đề cho (1,5). **5 đ:** Điện phân CuSO₄ với điện cực trơ trong mô hình đã cho, nêu Cu bám catot và O₂ ở anot với bán phản ứng cân bằng (2), tính 1,28 g Cu từ I = 2,0 A, t = 1930 s, F = 96500 C/mol và M = 64 g/mol, hiệu suất dòng 100% (3). |
| P10 · 12 | Phân biệt đường khử và nhận diện các cấp cấu tạo từ amino acid đến protein. | **5 đ:** Glucose và fructose cho phản ứng Tollens trong điều kiện bài xét, saccharose chưa thủy phân thì không (2). Giải thích dạng mạch hở của glucose, fructose chuyển hóa qua enediol thành aldose trong môi trường kiềm, saccharose có cả hai carbon anomer tham gia liên kết glycoside (3). **5 đ:** Viết H₃N⁺–CH₂–COO⁻ của glycine (2). Giải thích màu tím biuret do ion Cu²⁺ tạo phức với các liên kết peptide trong môi trường kiềm (3). |

P01, P04, P05, P08 và P09 dùng hoạt động web hoặc bộ dữ liệu để chuẩn bị bài và kiểm tra lập luận. Minh chứng kỹ năng thao tác tại trường cần quan sát riêng. P05 và P10 dùng câu hỏi phân tích hiện tượng, dành phần tổ chức thực hành cho giáo viên.

## Hiệu đính thuật ngữ

- **Chất xúc tác:** Làm tăng tốc độ phản ứng và được tái tạo trong chu trình xúc tác. Trong mô hình phổ thông, có thể giải thích bằng cơ chế có rào cản năng lượng hữu hiệu thấp hơn. Ở cùng điều kiện, chất xúc tác không đổi hằng số cân bằng hay biến thiên enthalpy của phản ứng tổng. [IUPAC Gold Book](https://goldbook.iupac.org/terms/view/C00876).
- **Amino acid:** Có nhóm amino và carboxyl. Glycine chủ yếu ở dạng ion lưỡng cực trong nước gần pH trung tính. Tỉ lệ các dạng proton hóa phụ thuộc pH và cấu trúc, kể cả nhóm chức ở mạch bên. [IUPAC Gold Book](https://goldbook.iupac.org/terms/view/Z06752).

## Vấn đề chuyển BA/Tester đợt 2

| Mã | Khó khăn hoặc điểm cần giải thích | Việc cần chốt |
| --- | --- | --- |
| BA-01 · K09/QA-05 | Kế hoạch khóa Tc ở [98]. CIAAW trình bày Tc-97 và Tc-98 với chu kỳ bán rã xấp xỉ nhau, còn bảng thành phần đồng vị của CIAAW ghi [97]. Số khối trong ngoặc là của đồng vị tham chiếu. | Chọn một bảng và phiên bản làm chuẩn, chốt kỳ vọng của ca Tc, quy ước hiển thị và quy tắc riêng cho khối lượng dùng trong phép tính. Phân loại theo việc có nguyên tử khối chuẩn, vì có nguyên tố không có đồng vị bền vẫn có giá trị chuẩn. |
| BA-02 · K09/QA-05 | Không thể điền mặc định độ âm điện hoặc oxide/hydroxide cao nhất cho tất cả 118 dòng. Một số giá trị phụ thuộc quy ước, nguồn hoặc bằng chứng về hợp chất. | Chốt cách hiển thị “không áp dụng” và “chưa có dữ liệu xác minh”, nguồn cho từng trường và quy ước minh họa theo nhóm. |
| BA-03 · F03 | Kế hoạch gắn quy luật biến đổi tính kim loại trong chu kỳ vào lớp 9. Hồ sơ chọn tra cứu kim loại và phi kim cho lớp 9, giải thích xu hướng tuần hoàn ở lớp 10. | Chốt nhãn “vận dụng” nếu dùng phần xu hướng trong bài lớp 9. Phân biệt phần nồng độ/pH lớp 8 với chuẩn độ lớp 11 khi nghiệm thu cùng một trang. |
| BA-04 · P01/P04/P05 | Đường nóng chảy của sáp thương mại phụ thuộc mẫu. 170 mL nước chỉ xấp xỉ 170 g. Dữ kiện Na với nước và Fe với acid chưa phải một phép so sánh Na/Fe trong cùng môi trường. | Duyệt câu hỏi dùng dữ liệu có điều kiện, chấm theo khối lượng nước và xác định phạm vi dãy được suy ra trực tiếp từ dữ liệu. |
| BA-05 · P06/P07/P08 | Fe nằm ngoài 20 nguyên tố đầu. Độ tan của Mg(OH)₂ cần tách khỏi cách gọi độ mạnh của base. Bài Qc ban đầu ghi pha lỏng nhưng chưa xác định hỗn hợp hay pha tinh khiết. Chiều thêm chuẩn trong kế hoạch khác chiều thực hành nêu trong chương trình. | Duyệt cách đặt bài mở rộng, hệ cân bằng đồng thể giả định, chiều chuẩn độ và quy ước chấm dấu hiệu chỉ thị. |
| BA-06 · PED-01/03/04 | Chưa có bảng duyệt toàn bộ danh pháp và chưa xác minh từng mã thiết bị hợp nhất. Rubric hiện là đề xuất, chưa có đánh giá giáo viên hoặc minh chứng thực hành thật. | Xác định người duyệt chuyên môn, phạm vi thuật ngữ, mã mục phụ lục, minh chứng cho từng bài và phần thực hành tại trường. |

## Trạng thái triển khai và nghiệm thu

- **Đã đưa lên web:** 10 bài pilot, có nhãn lớp 6–12, câu kiểm tra và đáp án/thang điểm ở bước Ghi nhớ. Tổng cộng giao diện có 18 bài. Bổ sung bốn dạng tính gồm mol → thể tích, thể tích → mol, tỉ khối và pha theo C%. Đã cập nhật hai định nghĩa ở Sổ tay.
- **Đã chạy và đạt:** build HTML, bộ dạy học, 33 phép kiểm hóa học, và bộ giao diện JSDOM. Bộ giao diện mở đủ 10 bài pilot, kiểm tra phần đáp án, xác nhận bài mẫu cho 12,395 L ở 25 °C và 1 bar. Bộ dạy học hiện có kiểm 8 bài và 24 câu gốc.
- **Còn thiếu để nghiệm thu:** công cụ lập công thức hai chiều, bài tương tác Lewis và Qc/Kc theo đặc tả, dữ liệu bảng tuần hoàn K09, và kiểm chứng trên trình duyệt thật. QA-05 và phần lập công thức của QA-07 còn mở. PED-01 đến PED-04 chưa có chữ ký duyệt chuyên môn.
- **Chuyển BA/Tester đợt 2:** ngoài BA-01 đến BA-06, chốt yêu cầu chấm bài tự luận trên web hay chỉ đối chiếu thang điểm, và xác định bài nào cần tương tác riêng ngoài liên kết tới công cụ hiện có. Phiếu in chưa được nghiệm thu với bộ câu hỏi pilot.


## Căn cứ

- [Chương trình GDPT 2018, phụ lục KHTN và Hóa học](https://quanlysangkien.bacgiang.gov.vn/sites/default/files/thong-tu-32-2018-tt-bgddt-ban-hanh-chuong-trinh-giao-duc-pho-thong-moi.pdf).
- [Danh mục thiết bị THCS](https://congbao.chinhphu.vn/tai-ve-van-ban-so-38-2021-tt-bgddt-36661-39582?format=pdf) và [phụ lục thiết bị môn Hóa học THPT](https://vbpl.vn/FileData/TW/Lists/vbpq/Attachments/167583/VanBanGoc_VBHN%209.%20Dm%E1%BB%A5c%20TBDH%20m%C3%B4n%20H%C3%B3a%20h%E1%BB%8Dc_THPT.pdf).
- [CIAAW, đồng vị phóng xạ](https://www.ciaaw.org/radioactive-elements.htm) và [thành phần đồng vị](https://ciaaw.org/isotopic-abundances.htm).
- [OpenStax, cân bằng](https://openstax.org/books/chemistry/pages/13-summary) và [chuẩn độ](https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations).
