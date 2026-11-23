# Nghiên cứu danh mục kiến thức GDVN Hóa học

Ngày 13/11/2026. Đối tượng nghiên cứu là bản Markdown người dùng gửi và bản web GDVN Hóa học 1.4.0. Phạm vi chương trình gồm mạch Chất và sự biến đổi của chất trong KHTN 6–9 và môn Hóa học 10–12. Đối chiếu theo chương trình môn học, chưa gắn với bộ sách cụ thể.

## Kết luận

**Cần chỉnh trước khi dùng làm danh mục hiện trạng hoặc tài liệu công bố.** Tài liệu có giá trị làm đề cương phát triển liên thông. Cần đánh dấu trạng thái từng dòng: **Đang hiển thị**, **Có trong nguồn**, **Đề xuất bổ sung**, **Chưa xác minh**. Mỗi dòng triển khai nên có mục web, lớp, yêu cầu cần đạt, nguồn, hoạt động và minh chứng.

## Đối chiếu tài liệu với web hiện tại

| Vị trí trong tài liệu | Hiện trạng đã đối chiếu | Kết luận và cách sửa |
| --- | --- | --- |
| Sổ tay lý giải, dòng 198–236 | Web có 40 mục tra cứu gắn nhãn lớp 10–12 và 10 công thức | **Cần chỉnh.** Các mục lớp 6–9 và bảng mở rộng 16 công thức là đề xuất nội dung. |
| Đo & điều chỉnh dung dịch, dòng 111–115 | Có pH, chuẩn độ hai chiều, đệm, pha loãng mol | **Cần chỉnh.** Độ tan, nồng độ phần trăm và chức năng pha chế theo các đại lượng đó cần ghi là đề xuất. |
| Lời giải từng bước, dòng 159–165 và Phương trình & cân bằng, dòng 95–99 | Lời giải có 5 dạng: khối lượng → mol, mol → nồng độ, pha loãng, pH và chất giới hạn. Tính tỉ lượng hỗ trợ mol/g | **Cần chỉnh.** Tách lập công thức theo hóa trị, độ tan, nồng độ phần trăm và đổi thể tích khí thành hạng mục bổ sung. |
| Tách hỗn hợp, dòng 143–149 | Hộp chọn có 5 phương pháp: chưng cất, chiết, kết tinh lại, thăng hoa, sắc ký. Lọc và cô cạn có sơ đồ tại Thiết kế bố trí | **Cần chỉnh.** Ghi đúng vị trí của lọc và cô cạn. Tách bằng nam châm cần xác minh hoạt động cụ thể. |
| Góc thử nghiệm và Phụ lục 1A/1B | Web có 140 mục. Nhận biết qua màu có 2 lựa chọn là iodine với hồ tinh bột và chlorine ẩm với giấy màu | **Cần chỉnh.** Đánh dấu giấy quỳ, giấy pH, phenolphthalein và các dòng bổ sung ở 1B theo từng mục đối chiếu. Một số phương trình 1B có thể trùng thư viện gốc, cần khớp theo phương trình cân bằng và hiện tượng trước khi nhập. |
| Dòng electron & pin, dòng 117–123 | Có bảng 10 cặp thế khử, tính pin và Nernst | **Cần chỉnh.** Dãy hoạt động THCS là nội dung dạy học riêng. Ghi rõ phép tính chuẩn và phép tính tại điều kiện đang xét. |
| Năng lượng & trạng thái, dòng 137–141 | Có enthalpy, cân bằng A ⇌ B và tỉ số hằng số tốc độ theo nhiệt độ | **Cần chỉnh.** Các mô phỏng về nồng độ, áp suất, diện tích tiếp xúc và xúc tác cần ghi theo trạng thái từng mục. |
| Nội dung còn trong mã nguồn, dòng 240–308 | Có 8 bài, 24 câu luyện tập, 15 câu bộ cũ và máy tính/CAS, các tuyến tương ứng chưa được đăng ký | **Đạt về trạng thái.** Giữ ghi chú này. |
| Phụ lục 3, dòng 629–692 | Danh sách trộn nội dung thiết bị, hóa chất, đề xuất mô phỏng và mô tả hoạt động | **CHƯA XÁC MINH theo từng dòng.** Khi gắn căn cứ thiết bị, ghi cấp, môn, mục/STT, tên chính thức và phiên bản văn bản. Mô phỏng được ghi là học liệu hỗ trợ. |

Nguồn hiện trạng: [danh mục web](./DANH-MUC-KIEN-THUC-GDVN-HOA-HOC.md), [định tuyến](./GDVN-source-build/GDVN-hoa-hoc/tool-catalog.js), [màn hình phản ứng](./GDVN-source-build/GDVN-hoa-hoc/reactions-ui.js), [dữ liệu thí nghiệm](./GDVN-source-build/GDVN-hoa-hoc/lab-data.js) và [màn hình ôn luyện](./GDVN-source-build/GDVN-hoa-hoc/learning-ui.js).

## Điểm khoa học và thuật ngữ cần chỉnh

1. **Bảng tuần hoàn và CIAAW**. Dùng nhóm 1–18 theo IUPAC, có thể kèm cách gọi nhóm A/B khi dẫn tài liệu học. Phân biệt nguyên tử khối chuẩn (có thể là khoảng), số liệu làm tròn dùng trong bài tập và số khối đồng vị trong ngoặc vuông. Chưa xác minh đủ 118 dòng của bảng đính kèm theo bản CIAAW 2024. [IUPAC](https://iupac.org/what-we-do/periodic-table-of-elements/) · [CIAAW 2024](https://ciaaw.org/atomic-weights.htm).
2. **Công thức số 6**. Ghi từng cặp đơn vị: Pa và m³ với R ≈ 8,314 J/(mol·K), hoặc bar và L với R ≈ 0,08314 L·bar/(mol·K). Công thức số 4 cần nói rõ 24,79 L/mol là xấp xỉ của khí lý tưởng ở 25 °C và 1 bar.
3. **Công thức số 7 và 8**. Độ tan theo g/100 g nước cần ghi dung dịch bão hòa tại nhiệt độ xác định. Trong công thức đổi nồng độ, nêu rõ C% được nhập dưới dạng số phần trăm, ví dụ 5 ứng với 5%. Nếu dùng phần khối lượng 0,05, hệ số với khối lượng riêng g/mL là 1000.
4. **Công thức số 11**. Hiệu suất thu sản phẩm bằng lượng sản phẩm thực tế chia lượng lý thuyết, cùng đơn vị. Tỉ số số mol chất đã phản ứng trên số mol ban đầu là độ chuyển hóa của chất đó. Phản ứng có thể chuyển hóa hết nhưng sản phẩm thu được thấp do hao hụt. [OpenStax](https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields).
5. **Công thức số 13 và 14**. Ký hiệu M cho khối lượng mol và z cho số electron theo bán phản ứng. Q trong Faraday là điện lượng, còn Q trong Nernst là thương số phản ứng. Khi có hiệu suất dòng η, dùng η dưới dạng phần số để tính lượng thu. [OpenStax về điện phân](https://openstax.org/books/chemistry/pages/17-7-electrolysis) · [OpenStax về thế điện cực](https://openstax.org/books/chemistry-2e/pages/17-3-electrode-and-cell-potentials).
6. **Phức chất và kiểm tra hữu cơ**. Tách năng lượng photon hc/λ khỏi năng lượng mol Nₐhc/λ. Chỉ diễn giải giá trị này là độ tách trường tinh thể khi bước sóng được gán cho chuyển mức thích hợp. Trong phụ lục, đổi nhãn “tính base yếu của aniline” ở minh chứng tạo kết tủa với nước bromine thành “phản ứng thế trên vòng thơm”. Công thức acetylide bạc trong ví dụ acetylene cần giữ đúng phạm vi chất mẫu khi mô tả alk-1-yne.
7. **Danh pháp**. Duy trì bảng tên hiển thị, tên dùng trong chương trình, tên hệ thống hoặc tên giữ lại, và từ đồng nghĩa phục vụ tìm kiếm. Dùng Red Book cho vô cơ, Blue Book cho hữu cơ, Gold Book cho thuật ngữ. Ghi rõ phiên bản dữ liệu của bảng tuần hoàn và nguyên tử khối. [IUPAC Color Books](https://iupac.org/what-we-do/books/color-books/).

## Ma trận mục tiêu, nội dung, hoạt động và minh chứng

| Lớp / mục tiêu | Mục web và nội dung | Hoạt động | Minh chứng và trạng thái |
| --- | --- | --- | --- |
| 6 · Chọn phương pháp tách | Tách hỗn hợp, Thiết kế bố trí | Chọn giữa lọc, cô cạn, chiết cho hỗn hợp mẫu | Giải thích tính chất dùng để tách. Lọc/cô cạn có sơ đồ, cần bổ sung hoạt động trong Tách hỗn hợp. |
| 7 · Đọc bảng tuần hoàn và nhận biết nguyên tố | Bảng tuần hoàn, Khám phá vi mô | Bật chế độ 20 nguyên tố, tìm ô, nhóm, chu kỳ | Ghi đúng tên, ký hiệu và vị trí. Tách khỏi yêu cầu viết cấu hình theo ô orbital của lớp 10. |
| 8 · Tính theo phương trình và nồng độ | Phương trình & cân bằng, Lời giải từng bước | Cân bằng, đổi g sang mol và giải bài nồng độ | Lời giải có đơn vị, tỉ lệ và kết quả. Độ tan, C% và thể tích khí là phần bổ sung. |
| 9 · Liên hệ cấu tạo và tính chất hữu cơ | Phác thảo phân tử, Thư viện minh họa | Phân biệt methane, ethene, ethanol và acetic acid qua công thức/cấu tạo | Học sinh chỉ ra nhóm chất và dẫn chứng từ mô hình. Chưa xác minh độ phủ toàn bộ mạch lớp 9. |
| 10 · Viết cấu hình và giải thích liên kết | Cấu hình electron, Kiến trúc liên kết | Đọc ô orbital, so sánh hình học ở chuyên đề | Viết cấu hình theo Z, giải thích hình học. Gắn nhãn chuyên đề/mở rộng cho VSEPR nâng cao, orbital d và lưới xác suất. |
| 11 · Giải thích pH và chuẩn độ | Đo & điều chỉnh dung dịch | Chọn NaOH trong bình và HCl trên burette, đọc điểm tương đương | Nêu thể tích tương đương và phân biệt tín hiệu chỉ thị. Kỹ năng thao tác cần quan sát thực hành riêng. |
| 12 · Phân biệt pin và điện phân | Dòng electron & pin, Điện năng tạo chất | Đối chiếu vai trò điện cực, bán phản ứng và phép tính điện lượng | Xác định đúng dấu điện cực theo loại hệ và sản phẩm trong trường hợp mô hình đã chọn. |

Nguồn chương trình: [Phụ lục Chương trình GDPT 2018](https://quanlysangkien.bacgiang.gov.vn/sites/default/files/thong-tu-32-2018-tt-bgddt-ban-hanh-chuong-trinh-giao-duc-pho-thong-moi.pdf). Đối chiếu đã đọc các yêu cầu về tách hỗn hợp lớp 6, nguyên tố lớp 7, cấu hình lớp 10 và chuẩn độ lớp 11. Thông tư 17/2025 sửa nội dung các môn Lịch sử, Địa lí và Giáo dục công dân trong phạm vi văn bản đã đọc. [Công báo](https://congbao.chinhphu.vn/tai-ve-van-ban-so-17-2025-tt-bgddt-46255-59050?format=pdf).

Căn cứ thiết bị: [Danh mục hợp nhất THCS](https://moet.gov.vn/content/vanban/Lists/VBPQ/Attachments/1538/vbhn-262023-382021-tt-bgddt-3348472.pdf) và [Danh mục hợp nhất THPT](https://vbpl.vn/FileData/TW/Lists/vbpq/Attachments/167583/VanBanGoc_06-VBHN%20thong%20tu%2026.2023-39.2021-tt-bgddt.pdf). Thông tư 38/39 điều chỉnh danh mục thiết bị theo cấp, Thông tư 26/2023 sửa đổi một số mục. Khi khẳng định một thiết bị số thay thế được thiết bị thực, cần dẫn đúng điều khoản cho mục đó và kiểm tra phạm vi áp dụng.

## Trước khi công bố

- **Cần chỉnh trước:** đánh dấu hiện trạng, sửa công thức và thuật ngữ ở các mục trên, rồi đưa nội dung bổ sung vào danh sách phát triển có tiêu chí kiểm tra.
- **CHƯA XÁC MINH:** đủ 118 dòng dữ liệu CIAAW, từng dòng phụ lục 1B và 3, toàn bộ câu trả lời, hình ảnh và hành vi mô phỏng. Giáo viên bộ môn cần duyệt nội dung và minh chứng trước khi phát hành học liệu cho học sinh.
- **Câu hỏi mở:** GDVN sẽ phục vụ ôn tập KHTN 6–9 như một phân hệ độc lập hay dùng chung mục chức năng với Hóa học 10–12 và lọc theo lớp?

Lượt này nghiên cứu tài liệu và lập báo cáo. Bản đính kèm và mã web chưa được sửa.
