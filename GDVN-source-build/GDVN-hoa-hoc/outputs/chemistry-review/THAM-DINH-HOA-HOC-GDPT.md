# Thẩm định chuyên môn và điều chỉnh GDVN

Ngày 06/11/2026, Asia/Saigon. Source: GDVN-source-build/GDVN-hoa-hoc. Sử dụng hoa-hoc-gdpt-vn, phối hợp BA/QA/Tester; không thay source bằng ChemQuest.

## Kết luận trong phạm vi đã làm

Đã rà soát tập trung mô phỏng phản ứng, điện phân, pH/chuẩn độ và cách trình bày phạm vi nguyên tử/3D. Đã sửa các điểm có căn cứ rõ và bổ sung hàng rào khoa học khi mô hình một phương trình không đủ. Bộ tương tác đạt **453/453 ca**, bộ kiểm chuyên môn mới đạt **33 assertion**, các suite lõi/advanced/atomic/structure/studio-lab/teaching đều đạt. Không quy số ca test thành tỷ lệ đúng kiến thức hay đáp ứng chương trình.

Đây là thẩm định hỗ trợ trong phạm vi nêu trên, **chưa phải chứng nhận toàn bộ web đúng mọi kiến thức hoặc đáp ứng toàn bộ chương trình đang áp dụng**. Chưa có đánh giá chuyên gia độc lập, chưa đối chứng mọi dữ liệu của 140 phản ứng với nguồn thực nghiệm riêng, chưa mở được trình duyệt thật vì cổng quyền origin đã từ chối ở lượt trước. Không dùng cách điều khiển khác để vượt chặn.

## Các điều chỉnh chuyên môn và IT

| ID | Vấn đề và tác động | Đã thay đổi | Kiểm chứng |
|---|---|---|---|
| CHEM-F001 | Al(OH)3/Zn(OH)2 có thể tan tiếp khi hydroxide dư; cảnh kết tủa cố định dễ sai | Kiểm lượng/đơn vị theo tỉ lượng; nếu vượt giai đoạn tạo kết tủa, chặn cảnh và bảng định lượng một bước, giải thích cần mô hình phức/cân bằng. Có đường đưa lượng về hệ số để xem lại giai đoạn đang hỗ trợ | Biên Al: 1:3 không bị chặn, 1:4 bị chặn; Zn 1:2/1:4; mol/g và trường hợp lượng 0. UI chặn/phục hồi đạt |
| CHEM-F002 | CO2 dư có thể làm kết tủa nước vôi tan tiếp | Không tiếp tục phát cảnh tạo CaCO3 một bước khi lượng CO2 dư theo phương trình; giải thích carbonate/hydrogencarbonate và giới hạn | 1:1 cho chạy, 2:1 nhận diện ngoài phạm vi |
| CHEM-F003 | H2SO4 thiếu bazơ không được mô tả thành hệ cuối chỉ từ phương trình tạo sulfate | Nhận diện trung hòa chưa hoàn toàn, không trình bày bảng sulfate một bước như thành phần cuối | Tỉ lệ acid:bazơ 1:1 bị chặn, 1:2 không chặn trong miền giả thiết |
| CHEM-F004 | Hàm pH trước đây chấp nhận loại không có trong mô hình hoặc Ka vô hạn; UI bắt nhập Ka cả khi tính acid mạnh | Kiểm loại/Ka hữu hạn; Ka chỉ có ý nghĩa với chất yếu; sửa dữ kiện vô hiệu kết quả; nồng độ lớn có nhắc giới hạn hoạt độ | pH nước, cực loãng, dữ liệu sai và UI strong/weak đạt |
| CHEM-F005 | Web chỉ có HCl trong bình, NaOH trên burette; phụ lục lớp 11 có chiều chuẩn độ ngược | Thêm cả hai chiều; mặc định NaOH trong bình/HCl trên burette; nhãn C,V trung tính đúng vai trò. Dữ kiện hoặc chiều đổi làm đồ thị cũ ẩn; lỗi không để lại đồ thị hợp lệ giả | Hai chiều: đầu, tương đương 25 mL/pH7, cuối 50 mL và dữ liệu sai đối chứng độc lập; UI đổi chiều/ẩn đường cong đạt |
| CHEM-F006 | Nhãn anot mặc định dùng chung dễ gây nhầm điện cực trơ với Cu tan hoặc carbon tiêu hao | Nhãn theo hệ: điện cực trơ/Cu/carbon. Không mở 102 tổ hợp chưa hỗ trợ | 22×6 tổ hợp vẫn kiểm hợp đồng hỗ trợ/chặn; nhãn Cu/carbon đạt |
| CHEM-F007 | Toàn bộ công cụ dễ bị hiểu là cùng mức yêu cầu học tập | Thêm liên hệ chương trình trên các màn hình đã đối chiếu; tách cốt lõi, chuyên đề và mở rộng; không gán lớp cho từng phản ứng chưa xác minh | UI nhận đúng chuyên đề 10.1 và phạm vi 20 nguyên tố đầu |

Tệp chính: lab-domain.js (kiểm phạm vi), lab-ui.js (cảnh/bảng lượng/căn cứ), titration.js (mô hình chuẩn độ), chemistry.js, reactions-ui.js, curriculum-context.js, app.js, sky-theme.css. Service worker thêm các mô-đun mới và tăng phiên bản cache. Đã build lại dist/gdvn.html và ../../gdvn.html; không tạo ZIP.

“Chặn ngoài phạm vi” là cải thiện tính trung thực của sản phẩm, không có nghĩa đã xây dựng bộ giải cân bằng nhiều phản ứng. Các ca phù hợp giả thiết vẫn dùng tỉ lượng lý thuyết. Không lấy màu/bọt/thời gian hoạt ảnh làm phép đo.

## Đối chiếu chương trình đã đọc

Nguồn nội dung: phụ lục môn Hóa học ban hành kèm TT32/2018, bản PDF 56 trang do VTC lưu bản sao; đối chiếu trang bìa và xem trực quan trang 21, trích xuất có vị trí trang. Mốc dưới đây là đối chiếu nội dung bản 2018, không khẳng định đã kiểm hết chuỗi hiệu lực đến 2026.

| CT-ID | Phụ lục, vị trí | Phạm vi nội dung (diễn giải) | Màn hình / kết luận |
|---|---|---|---|
| CT-001 | Lớp 10, Cấu tạo nguyên tử, tr.11 | AO s/p; phân biệt Bohr và mô hình hiện đại | atom hỗ trợ quan sát; orbital d là mở rộng |
| CT-002 | Lớp 10, Cấu trúc electron, tr.11–12 | Cấu hình lớp/phân lớp/ô orbital cho 20 nguyên tố đầu | config hỗ trợ; phần sau 20 nguyên tố không gán cùng mức |
| CT-003 | Chuyên đề 10.1, tr.17 | Lewis, VSEPR và lai hóa đơn giản | bond thuộc chuyên đề; không gộp thành bắt buộc cốt lõi |
| CT-004 | Lớp 11, Cân bằng dung dịch, tr.21 | pH, chỉ thị và chuẩn độ NaOH bằng HCl | solution bổ sung chiều tương ứng; đồ thị chưa chứng minh kỹ năng thực hành |
| CT-005 | Lớp 12, Pin và điện phân, tr.38 | Nguyên tắc điện phân, các ứng dụng và thí nghiệm/video nêu trong chương trình | electro/electrolysis hỗ trợ một phần; cảnh không phải video thực nghiệm |

Các bảng này không khẳng định mọi tính năng đã đạt đầy đủ động từ yêu cầu cần đạt. THCS/KHTN chưa được ánh xạ trong lượt này; chưa lựa chọn bộ SGK hoặc chương trình trường chuyên thay người dùng.

## Sổ căn cứ

| VB/S-ID | Nguồn | Phần đã xác minh và giới hạn |
|---|---|---|
| VB-001 | [Hồ sơ TT32/2018](https://vbpl.moj.gov.vn/bogiaoducdaotao/Pages/vbpq-toanvan.aspx?ItemID=146721); [bản sao phụ lục Hóa học](https://cdn-i.vtcnews.vn/files/attach/2018/12/27/13-ct_hoa-hoc-2321.pdf) | Nội dung môn đã đọc theo trang ở trên. Bản sao phụ lục không tự xác nhận tình trạng hiệu lực; hồ sơ trước đó ghi hết hiệu lực một phần |
| VB-002 | [TT13/2022, PDF ký trên cổng Chính phủ](https://datafiles.chinhphu.vn/cpp/files/vbpq/2022/08/13-bgddt.signed.pdf) | Tệp 68 trang dạng scan; đã xem trang 1–2 về thay đổi kế hoạch chương trình tổng thể. Chưa thẩm định toàn bộ phụ lục của tệp |
| VB-003 | [Hồ sơ TT17/2025](https://congbao.chinhphu.vn/van-ban/thong-tu-so-17-2025-tt-bgddt-46255.htm); [tệp được cổng Chính phủ gắn](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/9/17-bgddt.pdf) | Đọc Điều 1 và xem trang 1 của tệp: phạm vi nêu các môn sử/địa/công dân, không dùng để tự suy sửa Hóa học. Tệp đính kèm có ô số/ngày trên đầu chưa điền đầy đủ, nên không coi tệp này đơn độc là bản ký đủ thông tin; metadata hiệu lực dựa hồ sơ chính thức |
| VB-004 | NQ88/2014, NQ51/2017 và TT20/2021 trong sổ nguồn của skill | Định hướng/lộ trình/quan hệ sửa đổi, không dùng như bằng chứng cho một thí nghiệm bắt buộc. Chưa đọc lại toàn văn các văn bản này trong lượt hiện tại |
| S-001 | [University of Washington](https://chem.washington.edu/lecture-demos/amphoteric-nature-aluminum-hydroxide) và [OpenStax 18.9](https://openstax.org/books/chemistry-2e/pages/18-9-occurrence-preparation-and-compounds-of-oxygen) | Hydroxide lưỡng tính và việc tan trong hydroxide dư. Áp dụng kiểm miền thay vì giả lập cân bằng chưa có |
| S-002 | [UW–Madison](https://demolab.chem.wisc.edu/aqueous-equilibrium-and-precipitation-reactions-reactions-between-carbon-dioxide-and-limewater/) | Minh họa hệ CO2/nước vôi và tính phụ thuộc cân bằng |
| S-003 | [OpenStax 15.1](https://openstax.org/books/chemistry-2e/pages/15-1-precipitation-and-dissolution) | Độ tan/Q/Ksp; không đồng nhất cân bằng phương trình với chắc chắn quan sát kết tủa |

Nguồn bổ sung cho acid nhiều proton: [OpenStax 14.5](https://openstax.org/books/chemistry-2e/pages/14-5-polyprotic-acids), dùng kiểm phạm vi thay vì giả định đã giải cân bằng nhiều nấc.

Tất cả nguồn kiểm tra ngày 06/11/2026. Không đưa kết quả tìm kiếm chưa đọc thành điều khoản pháp lý; chưa đủ cơ sở chứng nhận đáp ứng toàn bộ văn bản hiện hành. Nguồn khoa học không thay nguồn chương trình Việt Nam.

## Bằng chứng và tái chạy

- `regression/deep-results.json`: 453 PASS/0 FAIL, dữ liệu và phương pháp JSDOM/Node workers. Các trường hợp phải chặn được kiểm là chặn đúng, không gọi đó là đã mô phỏng thành công.
- `core-results.json`: kết quả các suite lõi và chuyên môn.
- `ui-result.txt`: UI suite trên HTML build cuối đạt, exit code 0; SHA256 hai HTML xuất ra giống nhau: 219EECBD38C254B99E576E055D4851F6FB9D83A35B4E917E082B34832C4DC285.
- `inventory.json`: 140 phản ứng với phương trình, điều kiện, trạng thái kiểm phạm vi và hash nguồn. Ánh xạ chương trình cho từng phản ứng để null vì chưa đủ xác minh, tránh gán lớp hàng loạt.
- `sources/`: bản tải và ảnh trang nguồn; vị trí in trên PDF trùng số trang PDF ở các trang Hóa học được nêu. Có thể tái kiểm sự khác nhau giữa nội dung chương trình và mức thực hiện của web.
- `node chemistry-review-tests.mjs`: 33 assertion; `npm run test:simulation`: tương tác; `node chemistry-audit.mjs`: xuất lại kiểm kê. Khi jsdom/esbuild trên Drive chưa đầy đủ, dùng GDVN_JSDOM/GDVN_ESBUILD trỏ runtime đã cài ở ổ C như các lần trước.

## Phần chưa kết luận

Chưa xác nhận màu/hình, hướng hạt nhìn thấy, bố trí dụng cụ, thao tác cảm ứng/bàn phím vật lý, FPS hoặc PWA ngoại tuyến bằng trình duyệt thật trong lượt này. Canvas/ResizeObserver trong test được giả lập, worker chạy qua node:worker_threads. Chưa giải Q/Ksp, tạo phức, cân bằng acid nhiều nấc và hiệu suất thực cho toàn bộ thư viện. Chưa có thẩm định riêng từng hiện tượng của 140 phản ứng hay kiểm đầy đủ yêu cầu cần đạt của mọi lớp.

Ưu tiên tiếp theo về chuyên môn là đối chứng từng phản ứng theo điều kiện và gắn nguồn/CT-ID khi đã đọc yêu cầu tương ứng; về kỹ thuật là kiểm hình ảnh trên desktop/mobile khi công cụ trình duyệt có quyền. Không dùng thêm số hiệu thông tư hoặc thêm hoạt ảnh để thay cho các bằng chứng còn thiếu này.
