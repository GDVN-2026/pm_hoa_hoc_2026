# Kiểm thử toàn hệ thống GDVN Hóa học

Bản 1.6.0-pilot2 · SHA-256 AF5DFD7F9D29D17411673E84E1D184B02E2EEE202B6FA5BBFA28EF4D3982B9D8. Hai bản HTML mở nhanh và dist trùng nhau.

**Bao phủ 24/24 trang chức năng và Tổng hợp**, mỗi trang có ít nhất một thao tác trên Chrome headless tại 1366×768 và 390×844. Đạt 50/50 lượt theo ma trận dưới đây sau khi kiểm lại Studio bằng đúng luồng mở khối thu gọn. Con số này là độ phủ theo trang, chưa phải độ phủ từng nhánh mã, từng bộ dữ liệu hoặc mọi thao tác.

| Tuyến | Mã nguồn liên quan | Ca đã chạy | Desktop | 390 px |
| --- | --- | --- | --- | --- |
| [home](../../../../gdvn.html#home) | dashboard.js · navigation.js | Tìm do tan và thấy Đo & điều chỉnh dung dịch | PASS | PASS |
| [periodic](../../../../gdvn.html#periodic) | atomic-ui.js · periodic-data.js · data.js | Bấm lọc 20 nguyên tố đầu | PASS | PASS |
| [atom](../../../../gdvn.html#atom) | atomic-ui.js · quantum.js · cloud-view.js | Chọn Na và đọc kết quả chứa số hiệu 11 | PASS | PASS |
| [config](../../../../gdvn.html#config) | modules.js · chemistry.js | Tính cấu hình Na, xác nhận 11 electron | PASS | PASS |
| [molecule](../../../../gdvn.html#molecule) | advanced-ui.js · engine-client.js · engine-worker.js · smiles-engine.js | Dựng ethanol từ CCO, xác nhận C2H6O | PASS | PASS |
| [bond](../../../../gdvn.html#bond) | modules.js · pilot-tools.js | Điền cặp electron cho NH₃, nhận phản hồi đạt octet | PASS | PASS |
| [complex](../../../../gdvn.html#complex) | modules.js · visuals.js | Chọn phức bạc, kiểm số phối trí 2 | PASS | PASS |
| [structure](../../../../gdvn.html#structure) | structure-ui.js · structure-model.js · structure-engine.js | Nạp ethanol và kiểm công thức C₂H₆O | PASS | PASS |
| [equation](../../../../gdvn.html#equation) | reactions-ui.js · chemistry.js · stoichiometry.js · stoichiometry-ui.js · pilot-tools.js | Lập Fe₂(SO₄)₃, nhập phương trình sai và kiểm báo lỗi | PASS | PASS |
| [ionic](../../../../gdvn.html#ionic) | reactions-ui.js | Tra cặp ion mặc định tạo AgCl | PASS | PASS |
| [solution](../../../../gdvn.html#solution) | reactions-ui.js · titration.js · chemistry.js | Tính pha chế 30 g và 170 g, thêm giọt chuẩn đến 25,05 mL | PASS | PASS |
| [thermo](../../../../gdvn.html#thermo) | reactions-ui.js · physical-chemistry.js · pilot-tools.js | Thử ba trường hợp Qc nhỏ hơn, bằng và lớn hơn Kc | PASS | PASS |
| [tutor](../../../../gdvn.html#tutor) | teaching-core.js · teaching-ui.js | Mở lời giải đầy đủ, kiểm 12,395 L | PASS | PASS |
| [electro](../../../../gdvn.html#electro) | reactions-ui.js · physical-chemistry.js | Chọn Zn/Cu, kiểm 1,103 V theo dữ liệu web | PASS | PASS |
| [electrolysis](../../../../gdvn.html#electrolysis) | reactions-ui.js · physical-chemistry.js | Bật điện phân và kiểm trạng thái có cập nhật | PASS | PASS |
| [mechanism](../../../../gdvn.html#mechanism) | learning-ui.js | Chuyển từ bước 1 sang bước 2 | PASS | PASS |
| [reference](../../../../gdvn.html#reference) | reference-ui.js · visuals.js | Chọn graphite và tìm hai dòng kết tủa trắng | PASS | PASS |
| [lab](../../../../gdvn.html#lab) | lab-ui.js · lab-data.js · lab-scenes.js · lab-3d.js · lab-domain.js · lab-preparation.js | Tra AgNO₃/KI, chạy đến hiện tượng có AgI | PASS | PASS |
| [separation](../../../../gdvn.html#separation) | learning-ui.js | Chọn lọc rồi chưng cất, kiểm phản hồi ngưng tụ | PASS | PASS |
| [studio](../../../../gdvn.html#studio) | studio-ui.js · studio-library.js | Mở khối thu gọn, nạp mẫu chưng cất, thấy 9 đối tượng | PASS | PASS |
| [board](../../../../gdvn.html#board) | drawing-ui.js | Vẽ và tải lại, kiểm dữ liệu nét trong bộ nhớ | PASS | PASS |
| [knowledge](../../../../gdvn.html#knowledge) | learning-ui.js · curriculum-topics.js · curriculum-context.js | Chọn lớp 9, thấy bài ghép dãy hoạt động | PASS | PASS |
| [lessons](../../../../gdvn.html#lessons) | teaching-ui.js · teaching-core.js | Mở P01 ở Ghi nhớ, thấy bảng dữ liệu giả định | PASS | PASS |
| [practice](../../../../gdvn.html#practice) | teaching-ui.js · teaching-core.js | Chọn đáp án và thấy giải thích | PASS | PASS |
| [quiz](../../../../gdvn.html#quiz) | learning-ui.js · data.js | Chọn đáp án và thấy phản hồi | PASS | PASS |

## Hạ tầng và dữ liệu

- Kiểm kê mã nguồn ứng dụng, điểm định tuyến, máy chủ tĩnh, Service Worker và các mô-đun liên quan ở bảng. Chưa rà từng dòng hoặc đo line/branch coverage.
- Bản mở nhanh được thử qua file://. Bản source được mở qua máy chủ localhost để thử Service Worker.
- Kiểm riêng ngoại tuyến: tải lại trang Tổng hợp sau khi Service Worker nắm quyền đạt. Tải lại trực tiếp ở #periodic sau ngắt mạng thất bại, cache gốc có tồn tại. Chưa xác định nguyên nhân.
- Kế thừa kết quả cùng bản dựng từ lượt QA trước: 10/10 bộ kiểm thử tự động, 466/466 ca mô phỏng. Bằng chứng ở báo cáo QA chức năng trước.
- Các thao tác trên viewport 390 px thực hiện bằng tự động hóa Chrome, không đại diện kiểm thiết bị vật lý hoặc toàn bộ tương tác cảm ứng.

## Lỗi và lệch yêu cầu

| Mã | Mức độ đề xuất | Tái hiện, kỳ vọng và thực tế |
| --- | --- | --- |
| QA-OFF-01 | Cao nếu phát hành chế độ PWA offline | Mở localhost, chờ Service Worker kiểm soát, vào #periodic, ngắt mạng rồi tải lại. Mong đợi trang công cụ tải được từ cache. Thực tế Chrome báo net::ERR_INTERNET_DISCONNECTED, dù cache gdvn-local-v53 chứa tài nguyên gốc. Tái hiện trên hai phiên localhost độc lập. Bản file:// là luồng phân phối riêng. |
| QA-BUG-01 | Trung bình | Theo lượt QA trước trên cùng bản dựng, trang Bài học có hướng dẫn vẫn hiện tùy chọn in kèm thang điểm ở cả hai kích thước. Yêu cầu phạm vi mới là phiếu chỉ có đề và tùy chọn kèm lời giải. |

## Chưa kiểm hết

- Các chức năng con, trường hợp sai và biên cho từng nút; các luồng xuất SVG/PNG/JSON và in PDF; bàn phím, thiết bị cảm ứng thật, nâng phiên bản cache. Một số đã có kiểm thử tự động riêng, chưa có kiểm đủ trên Chrome ở lượt này.
- Chưa xác minh từng mô hình 3D, điều kiện và hiện tượng của từng phản ứng hoặc đủ nội dung từng lớp theo chương trình. Đây là phạm vi thẩm định chuyên môn.
- Không có số liệu chứng minh bảo đảm 100% toàn hệ thống. Khuyến nghị xử lý lệch phạm vi điểm số, và xử lý lỗi offline nếu phát hành bản PWA có cam kết ngoại tuyến. Lượt này không sửa mã ứng dụng.

## Kiểm thử sâu trên bản 1.6.0-pilot2

Bản mở nhanh và bản dist có cùng SHA-256 như đầu báo cáo. Kiểm cú pháp bằng `node --check` đạt **63/63 tệp JavaScript, MJS và CJS cấp gốc**. Kết quả này không đo khả năng chạy mọi nhánh mã. Kiểm thử tự động lớp tính toán và mô hình đạt **9/9 bộ chạy trực tiếp**, gồm bộ hình học 3D 120 ca. Bộ mô phỏng độc lập đạt **466/466 ca**. Các bộ có thể dùng chung dữ liệu nên không cộng thành một tổng.

Đo độ phủ bằng Node trên các bộ tương ứng, chưa gộp các lượt:

| Mô-đun | Dòng | Nhánh | Phạm vi |
| --- | ---: | ---: | --- |
| chemistry.js | 97,90% | 80,33% | Bộ kiểm thử lõi |
| teaching-core.js | 93,06% | 86,49% | Bộ kiểm thử công cụ giảng dạy |
| physical-chemistry.js | 100% | 94,55% | Bộ kiểm thử hóa lý |
| lab-3d.js | 62,65% | — | Bộ kiểm thử hình học 3D |

### Lỗi và yêu cầu cần xử lý

| Mã | Khu vực | Cách tái hiện và tiêu chí nghiệm thu |
| --- | --- | --- |
| QA-EQ-01 | Phương trình · `reactions-ui.js:19–20` | Cân bằng `Fe^3+ + e^- -> Fe^2+`, rồi nhập `$$` và bấm Cân bằng. Giao diện còn hai dòng bảo toàn từ phép trước. Khi nhập sai, chỉ hiện lỗi và xóa mọi bảng, kết quả và đầu ra của phép trước. |
| QA-BRD-01 | Bảng viết · `drawing-ui.js:13, 44` | Nhập tệp hợp lệ có 500 nét, rồi thêm một tệp hợp lệ có 1 nét. Bản xuất ngay có 501 nét. Tải lại, bản xuất còn 500 nét. Khi có giới hạn tổng, thông báo trước khi nhận thêm và bảo toàn toàn bộ nét đã nhận. |
| QA-NAV-01 | Điều hướng · `index.html` | Từ Dòng electron & pin, bấm Không gian hóa học. Nhãn là DIV và địa chỉ giữ ở #electro. Đổi thành liên kết Tổng hợp, hỗ trợ chuột và Enter. |
| QA-BUG-01 | Phiếu học · `teaching-ui.js:226, 270` | Bật tùy chọn kèm lời giải và tạo phiếu. Giao diện và bản in có mục Đáp án và thang điểm. Phiếu dành cho giảng dạy chỉ cần tùy chọn in lời giải. |
| QA-OFF-01 | PWA · `sw.js:11–15` | Cài Service Worker, ngắt mạng, mở #periodic rồi tải lại. Chrome báo ERR_INTERNET_DISCONNECTED. Trang gốc và chuyển tuyến nội bộ khi ngoại tuyến đều chạy. Chưa xác minh nguyên nhân trực tiếp. |
| QA-BRD-02 | Bảng viết · `drawing-ui.js:44` | Nhập JSON thiếu dấu đóng. Nét đang có được giữ, nhưng trình duyệt trả thông báo kỹ thuật tiếng Anh. Hiện thông báo tiếng Việt cho người dùng. |

### Đối chiếu các góp ý của giáo viên

| Góp ý | Hiện trạng | Tiêu chí chỉnh sửa |
| --- | --- | --- |
| Không gian hóa học | Nhãn không dẫn về Tổng hợp | Xem QA-NAV-01. |
| Bỏ 3D tương tác tại Góc thử nghiệm | Nút 3D vẫn hiện | Bỏ lựa chọn 3D tại tuyến Lab. |
| Đổi Sơ đồ thành Mô phỏng thí nghiệm | Vẫn hiện Sơ đồ | Dùng Mô phỏng thí nghiệm làm tên chế độ hoặc tiêu đề vùng trình diễn. |
| Nhận biết qua màu sắc | Nằm thành mục riêng ngay sau tra cặp chất | Đề xuất đặt cạnh nội dung Nhận biết chất, với liên kết từ thí nghiệm liên quan. |
| Cặp chất thiếu dữ liệu | AgNO₃/KI và thứ tự đảo đều tìm thấy. Cặp ethanol/phức bạc trả về thiếu dữ liệu và khóa nút mở thí nghiệm. `lab-ui.js:373` đối chiếu danh mục và có một nhánh kết luận riêng theo điều kiện | Phân biệt rõ có thí nghiệm, có kết luận kèm điều kiện và chưa đủ dữ liệu. |
| Ví dụ nhập phương trình | Có mẫu mặc định và ghi chú mẫu ion. Bốn dạng thường, ngoặc, hydrate, ion đều chạy | Thêm ví dụ điền được cho từng dạng. |
| Mạng tinh thể có ba mẫu | NaCl, kim cương và graphite đều đổi nội dung và đặt lại góc nhìn được. Danh sách lấy từ tập mẫu trong `reference-ui.js` | Gọi rõ là ba mẫu minh họa. Chốt thêm mẫu chỉ khi cần cho bài giảng. |
| Zoom, kéo, mở rộng bảng và phím tắt | Mã bảng vẽ đặt kích thước 1200×650 và chỉ xử lý con trỏ để vẽ. Có nút hoàn tác và làm lại | Bổ sung zoom quanh con trỏ, chế độ kéo, không gian viết ngoài khung và phím tắt theo yêu cầu. |
| Bỏ tính điểm | Phiếu in còn thang điểm | Xem QA-BUG-01. Rà lại điều hướng ôn tập theo phạm vi web chỉ dùng để giảng. |

### Ma trận thao tác bổ sung trên Chrome

Cột PASS của ca kiểm kê giao diện xác nhận đã thu được đúng trạng thái hiện tại. Mức đáp ứng yêu cầu được ghi ở bảng đối chiếu phía trên.

| Ca kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| Mở equation | PASS | — |
| Cân bằng thường | PASS | 4Fe + 3O2 → 2Fe2O3 |
| Cân bằng ngoặc | PASS | Ca(OH)2 + 2HCl → CaCl2 + 2H2O |
| Cân bằng hydrate | PASS | CuSO4·5H2O → CuSO4 + 5H2O |
| Cân bằng ion | PASS | Fe^3+ + e^- → Fe^2+ |
| Phương trình xuất SVG | PASS | GDVN-phuong-trinh.svg 367 bytes |
| Cân bằng xóa kết quả khi nhập sai | FAIL | Expected values to be strictly equal: 2 !== 0  |
| Mở board | PASS | — |
| Bảng vẽ và hoàn tác/làm lại | PASS | — |
| Bảng vẽ xuất JSON | PASS | GDVN-ban-ve.json · 1 nét |
| Bảng vẽ xuất SVG | PASS | GDVN-trang-ghi.svg 534 bytes |
| Bảng vẽ xuất PNG | PASS | GDVN-bang-viet.png 1200×650 |
| Bảng vẽ nhập JSON theo hành vi ghép hiện tại | PASS | Thêm nét vào bảng hiện tại, 1 → 2 |
| Bảng vẽ dữ liệu JSON hỏng không ghi đè | PASS | Expected property name or '}' in JSON at position 1 (line 1 column 2) |
| Mở studio | PASS | — |
| Studio nạp mẫu chưng cất | PASS | — |
| Studio xuất JSON | PASS | GDVN-so-do.json · 1917 bytes |
| Studio xuất SVG | PASS | GDVN-so-do.svg 3001 bytes |
| Studio xuất PNG | PASS | GDVN-so-do.png 2400×1440 |
| Studio nhập lại JSON | PASS | — |
| Mở lab | PASS | — |
| Lab lọc không có mục và khôi phục | PASS | 140 / 140 mục |
| Lab cặp AgNO3–KI và đảo thứ tự | PASS | — |
| Lab cặp ngoài dữ liệu và vô hiệu mở | PASS | Chưa có dữ liệu để kết luận cho cặp này. Có thể thử AgNO₃ và KI để quan sát kết tủa. |
| Lab chạy, tạm dừng, tiếp tục và ghi nhật ký | PASS | Thời gianThí nghiệmHiện tượng17:12:09AgNO3 + KIKết tủa bạc halide màu vàng. |
| Lab tải ghi chép TXT | PASS | GDVN-thi-nghiem.txt · 770 bytes |
| Mở lessons | PASS | — |
| In phiếu mặc định không hiện thang điểm | PASS | 50068 bytes |
| Phiếu bật lời giải phải bỏ thang điểm | FAIL | The input was expected to not match the regular expression /Đáp án và thang điểm/. Input: 'GDVN · Tách chất và sự chuyển thểHọ tên: ____________________ Lớp: ______ Ngày: ______Mục tiêuTách chất và sự chuyển thểDự đoánGiải thích đoạn gần 0 °C khi nước đá tinh khiết nóng chảy và cách thu riêng cát, nước, muối.........................................................................................Hoạt độngDùng dữ liệu |
| GET / | PASS | 200 |
| HEAD /app.js | PASS | 200 |
| GET /manifest.webmanifest | PASS | 200 |
| GET /qa-missing.html | PASS | 404 |
| POST / | PASS | 405 |
| PWA cài Service Worker và mở ngoại tuyến trang gốc | PASS | ["gdvn-local-v53"] |
| PWA đổi tuyến nội bộ khi ngoại tuyến | PASS | http://127.0.0.1:18874/#periodic |
| PWA tải lại tuyến #periodic ngoại tuyến | FAIL | page.reload: net::ERR_INTERNET_DISCONNECTED Call log: [2m  - waiting for navigation until "load"[22m  |
| Mở electro | PASS | — |
| Thanh Không gian hóa học về Tổng hợp | FAIL | Phần tử DIV · file:///I:/My%20Drive/VyIT/H%C3%B3a%20h%E1%BB%8Dc%20tr%E1%BB%B1c%20quan/files/gdvn.html#electro |
| Ctrl+K và Esc chế độ trình chiếu | PASS | — |
| Mở reference | PASS | — |
| Tinh thể lần lượt mở từng mẫu | PASS | ["NaCl","Kim cương","Graphite"] |
| Mở lab | PASS | — |
| Kiểm trạng thái giao diện theo góp ý Lab | PASS | {"mode3d":"3D tương tác","mode2d":"Sơ đồ","colorSection":1} |
| Mở board | PASS | — |
| Bảng mở tệp hợp lệ vượt tổng 500 nét rồi tải lại | FAIL | Số nét trước tải lại 501, sau 500 |

### Kết luận nghiệm thu

Chưa chốt đạt toàn hệ thống. Ưu tiên sửa kết quả cũ của phương trình, mất nét của bảng viết và mục thang điểm trước lượt nghiệm thu tiếp theo. Lỗi tải lại ngoại tuyến cần xử lý nếu phát hành chế độ PWA. Các ca chi tiết trên dùng Chrome desktop. Ma trận đầu báo cáo có lượt kiểm ở 390 px, còn thiết bị cảm ứng thật, khả năng truy cập bằng công nghệ hỗ trợ, toàn bộ nhánh điều khiển và đối chiếu từng yêu cầu kiến thức với văn bản chương trình vẫn chưa kiểm đủ. Lượt này chỉ cập nhật báo cáo QA.
