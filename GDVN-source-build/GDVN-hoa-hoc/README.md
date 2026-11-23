<!-- GDVN application documentation | Author: Nguyễn Thanh Vy -->
# GDVN Hóa học

## Cập nhật mô phỏng 06/11/2026

Lượt thẩm định chuyên môn: kiểm miền bazơ/CO₂ dư và trung hòa H₂SO₄; chuẩn độ hai chiều; sửa kiểm tra pH và nhãn anot; thêm liên hệ chương trình. Xem [báo cáo thẩm định](outputs/chemistry-review/THAM-DINH-HOA-HOC-GDPT.md). Chạy `npm run test:chemistry-review` và `npm run test:simulation`. Đây là rà soát trong phạm vi đã nêu, không phải chứng nhận toàn bộ chương trình.

Đã sửa dữ kiện/kết quả cũ, phép đo phân tử hai nguyên tử và tác vụ SMILES; thêm tiến trình thí nghiệm, tốc độ trình diễn, bảng lượng lý thuyết, điều khiển 3D bằng bàn phím. Xem [NANG-CAP-MO-PHONG.md](NANG-CAP-MO-PHONG.md) để biết phạm vi, giả thiết và kết quả kiểm thử. Chạy `npm run test:simulation` cho bộ hồi quy mô phỏng/3D.

Ứng dụng được viết bằng HTML, CSS và JavaScript, với giao diện xanh dương và đỏ. Các tệp mã nguồn có thể chỉnh sửa trực tiếp, không cần build hoặc cài thư viện.

## Chạy trên máy

Cần Node.js 20 trở lên. Mở terminal trong thư mục này và chạy:

    node server.cjs

Mở http://127.0.0.1:8771/ . Dừng bằng Ctrl+C.

Có thể đưa các tệp HTML, CSS và JavaScript lên một dịch vụ hosting tĩnh. Công cụ chạy trong trình duyệt. Bảng viết và điểm ôn tập được lưu ở bộ nhớ trình duyệt trên thiết bị.

## Nội dung hiện có

- 118 nguyên tố, cấu hình electron, ion và mô hình lớp electron.
- 12 mô hình phân tử có sẵn và mô hình từ SMILES, 12 kiểu VSEPR, 5 phức chất.
- Cân bằng phương trình bằng đại số, kể cả ion và electron, kiểm tra bảo toàn.
- Khối lượng mol, thành phần phần trăm và tính tỉ lượng.
- 30 thí nghiệm định tính, ghép cặp chất theo thư viện, 15 phản ứng ion.
- Pin điện hóa, Nernst, Faraday, mạ điện, 5 hệ điện phân.
- Axit/bazơ mạnh và yếu, đệm, pha loãng, chuẩn độ HCl–NaOH.
- Enthalpy phản ứng, cân bằng A ⇌ B, hệ thức Arrhenius.
- 5 phương pháp tách chất, hiệu quả chiết và Rf.
- 10 cơ chế hữu cơ diễn giải từng bước.
- 32 khái niệm, bảng công thức, 15 câu trắc nghiệm.
- Bảng viết có lưu tự động, hoàn tác, hình cơ bản và PNG.
- Sơ đồ dụng cụ kéo thả và SVG.
- Vẽ cấu tạo, liên kết đơn/đôi/ba, kiểm tra hóa trị và công thức dự kiến.
- Máy tính biểu thức, lượng giác, logarithm, giai thừa, phương trình bậc hai.
- Soạn bài và xuất DOCX, HTML, SVG, Typst, in PDF qua trình duyệt.

## Mức độ hoàn thiện

Bản này chưa tương đương toàn bộ trang tham khảo. Đã có orbital s/p/d hệ một electron và CAS; còn thiếu orbital f, đại phân tử/động học, GIF, nhập PDF, kiểm chứng cài PWA và độ phủ dữ liệu. Xem DOI-CHIEU-CHUC-NANG.md để biết đánh giá hiện tại.

Các mô hình là minh họa sư phạm. Nernst cần người dùng nhập Q và n phù hợp với phương trình tổng. Cân bằng phương trình chỉ trả về khi hệ có một nghiệm độc lập với hệ số nguyên dương. Tính theo phản ứng giả định các chất khác đủ hoặc dư. Dữ liệu khoa học làm tròn và có giới hạn mô hình được ghi ở từng công cụ.

## Kiểm tra

Chạy:

    node tests.mjs

Bộ kiểm tra bao gồm phân tích công thức có ngoặc và hydrate, cân bằng ion, toàn bộ 30 phản ứng, tổng electron của 118 nguyên tố, một số ngoại lệ, pH và bộ tính biểu thức.

Đã mở toàn bộ 22 trang công cụ trong trình duyệt và kiểm tra lỗi JavaScript. Đã thử cân bằng KMnO4 với HCl và tạo vòng benzene để kiểm tra công thức C6H6.

## Bổ sung ngày 05/11/2026

- Tính chất giới hạn, lượng chất dư và lượng sản phẩm thu theo hiệu suất. Nhập từng chất phản ứng bằng mol hoặc gram, có kiểm tra dữ liệu đầu vào.
- Chạy ngoại tuyến qua service worker sau lần tải đầy đủ đầu tiên từ máy chủ localhost. Manifest hỗ trợ chế độ ứng dụng; khả năng hiện nút cài đặt tùy trình duyệt.
- `npm run build` cập nhật đồng thời `dist/gdvn.html` và tệp `gdvn.html` ở thư mục chia sẻ gốc.
- Bản `gdvn.html` chứa toàn bộ JavaScript, CSS và biểu tượng, có thể mở bằng cách bấm đúp, không cần cài Node.js.

Source được giữ nguyên theo từng tệp để chỉnh sửa; tệp HTML gộp chỉ là bản chạy xuất ra từ source. Không sửa riêng bản gộp vì lần build sau sẽ thay thế nó.

## Phiên bản 1.1 — phân tử và đại số

Trong **Phân tử 3D**:
- Nhập SMILES tùy ý, ví dụ `CCO`, `c1ccccc1` hoặc `CC(=O)O`; dựng một cấu dạng 3D trong worker, có giới hạn thời gian 15 giây.
- Xem cấu tạo 2D, đổi giữa cầu/que, lấp đầy không gian và khung liên kết; hiện/ẩn hydrogen và nhãn.
- Đo khoảng cách và góc; xuất XYZ, MOL cho cấu dạng được sinh, PNG cho mô hình đang xem.

Trong **Máy tính khoa học**, phần **Đại số ký hiệu CAS** hỗ trợ rút gọn, khai triển, phân tích nhân tử, đạo hàm, nguyên hàm, giải phương trình, giới hạn và chép LaTeX. CAS dùng radian, có lịch sử 10 kết quả trong phiên. Nếu không giải được đầy đủ, kết quả có thể còn ký hiệu tích phân hoặc phương trình chưa giải; kiểm tra điều kiện xác định khi sử dụng nghiệm.

Chạy `npm run test:advanced` để kiểm tra phần mới. Xem `DOI-CHIEU-CHUC-NANG.md` để biết các khoảng trống còn lại; xem `THIRD-PARTY.md` cho thư viện và giấy phép. Bản này chưa đạt toàn bộ chức năng 1:1.

## Phiên bản 1.2 — bố cục riêng của GDVN

- Header ngang với logo do người dùng cung cấp (`logo.ico`), tìm kiếm và đổi sáng/tối.
- 7 nhóm chức năng trên thanh điều hướng; vẫn giữ đủ 22 công cụ.
- Trang tổng quan mới: giới thiệu không gian học tập, lối vào nhanh, bản đồ công cụ theo nhóm và bộ lọc.
- Trang công cụ có đường dẫn điều hướng và cách bố trí mới, hỗ trợ màn hình nhỏ.
- Mã trang tổng quan ở `dashboard.js`, bộ khung ở `index.html`, điều hướng ở `app.js`, trình bày ở `style.css`.
- Cổng mặc định hiện tại là 8771. Cổng 8770 trong phiên trước chạy một bản cũ ở thư mục khác.
- Source ZIP không tự cập nhật; người dùng tự đóng gói khi cần.

## Giao diện Sky theo ảnh mẫu

- Áp dụng phong cách xanh da trời sáng, sidebar kính bo tròn, thẻ công cụ pastel và nút đỏ.
- Chữ nền 16 px; tiêu đề công cụ khoảng 18 px, hỗ trợ mobile 390 px.
- Bỏ nhóm Xuất bản và công cụ xuất bài học theo yêu cầu: còn 6 nhóm, 21 công cụ.
- `sky-theme.css` là lớp giao diện mới, được nạp sau `style.css` và được nhúng khi build HTML độc lập.
- Đã kiểm tra ảnh Chrome desktop/mobile và kiểm tra tương tác SMILES/CAS sau thay đổi.
- Không cập nhật ZIP source.

## Aurora Glass

Tăng chữ nền lên 17 px; tăng cỡ chữ và độ đậm cho tiêu đề, menu, thẻ và biểu thức. Logo gốc được giữ nguyên, thêm đế kính và vòng sáng chuyển màu. Icon công cụ và nhóm dùng SVG khoa học ở `icons.js`. Bổ sung phản chiếu kính, bóng trong, chuyển màu chậm và vệt sáng khi hover. Chế độ giảm chuyển động được tôn trọng. Đã kiểm tra ảnh desktop trang cấu hình electron và viewport mobile 390 px; không cập nhật ZIP.

## Phiên bản 1.3 — bảng tuần hoàn & orbital

- Bảng tuần hoàn: màu theo họ, lọc họ/chu kỳ/khối, xem 20 nguyên tố đầu, chọn tối đa 6 nguyên tố để so sánh và lưu danh sách trên trình duyệt; tải SVG bảng theo bộ lọc, SVG ô orbital, CSV so sánh.
- Thông tin nguyên tố gồm nhóm, chu kỳ, khối, cấu hình và lớp electron; không thêm số liệu nhiệt độ/khối lượng riêng chưa được kiểm chứng.
- Nguyên tử: nhập số khối A, điện tích ion, xem số proton/neutron/electron, cấu hình, mô hình lớp electron và tải PNG.
- 14 orbital hydrogenic: 1s, 2s, 2p theo trục, 3s, 3p theo trục và 5 orbital 3d thực; xoay, phóng to, mặt cắt, màu pha, số nút, năng lượng và đường cong P(r).
- Đây là mô hình một electron; không dùng như nghiệm chính xác cho nguyên tử nhiều electron. Giá trị A mặc định là minh họa, không phải dữ liệu đồng vị đã xác nhận.
- Bộ tính nằm trong `quantum.js`, mô hình xoay trong `cloud-view.js`, giao diện trong `atomic-ui.js`, phân nhóm và xuất SVG trong `periodic-data.js`.
- Chạy `npm run test:atomic` cho các phép kiểm tra riêng. Đã kiểm tra tương tác HTML và worker bằng JSDOM và xác minh orbital 2pz chạy thật trong Chrome.
- Cơ sở công thức: https://books.physics.oregonstate.edu/GMM/hydroform.html ; https://www.ocw.mit.edu/courses/6-974-fundamentals-of-photonics-quantum-electronics-spring-2006/8a3eb732190cc7fc2520fa122bed8dcd_hydrogen_atom.pdf .

## Phiên bản 1.4 — xưởng vẽ, cấu tạo và thí nghiệm

- Xưởng vẽ: 34 loại dụng cụ; 11 sơ đồ bố trí mẫu và trang trắng. Tìm/lọc dụng cụ, kéo thả, hít lưới, xoay, lật, đổi màu/kích thước, nhân bản, sắp lớp, hoàn tác/làm lại và tự lưu. Nhập/xuất JSON v2, SVG và PNG 2400×1440.
- Vẽ cấu tạo: thay hộp chọn bằng nút nguyên tử/công cụ/liên kết. Bấm nền để đặt, kéo từ nguyên tử để nối thêm, bấm nét để đổi bậc. Có di chuyển, thay nguyên tử, xóa, 12 mẫu phân tử và trang trắng, hoàn tác/làm lại, tự lưu, nhập/xuất JSON/SVG và mở hình đang vẽ sang 3D qua SMILES. Có phóng to vùng vẽ; Escape thu gọn.
- Thư viện phản ứng: tăng từ 30 lên 113 phương trình/biến thể phân tử; nhiều mục thuộc cùng họ phản ứng, không phải 113 hiện tượng độc lập. Có điều kiện, hiện tượng, tìm/lọc, yêu thích, chọn cặp chất, tính lượng/chất giới hạn và nhật ký phiên. Số liệu lượng giả định phản ứng hoàn toàn, không thay mô hình cân bằng/độ tan.
- Nguồn kiểm chứng quy tắc kết tủa: https://openstax.org/books/chemistry-2e/pages/4-2-classifying-chemical-reactions . Cơ sở bố trí sinh hàn: https://chemtl.york.ac.uk/techniques/purification/distillation/mini-distillation . Các sơ đồ là minh họa, không phải hướng dẫn vận hành đầy đủ.
- Kiểm tra: `npm run test:studio-lab`, `npm run test:structure`, `npm run test:ui`. Chrome thật đã xác nhận PNG hợp lệ và nhận PointerEvent đặt/kéo/đổi liên kết (kiểm tra tổng hợp, không phải phiên dùng tay).
- Source mới: `studio-library.js`, `studio-ui.js`, `lab-data.js`, `lab-ui.js`, `structure-model.js`, `structure-ui.js`, `structure-engine.js`.
- Mốc 50% vẫn chưa được xác nhận bằng bộ tiêu chí đối chiếu toàn bộ trang gốc. Theo dõi chức năng cụ thể thay cho một tỷ lệ tổng chưa có phép đo. Không cập nhật ZIP.

## Điều hướng quay lại & mô phỏng cốc thủy tinh

- Nút Quay lại luôn nằm ở đầu không gian làm việc; lùi theo lịch sử màn hình GDVN, mở trực tiếp công cụ thì về Tổng quan. Trạng thái điều hướng được gắn với history của trang, hỗ trợ lùi/tiến của trình duyệt.
- Phòng thí nghiệm dùng cốc minh họa có chiều sâu: miệng elip, phản chiếu thành kính, đáy, bóng đổ, mặt dung dịch gợn, bọt khí nổi và lớp kết tủa lắng. Đây là hiệu ứng dựng bằng CSS, không phải cảnh 3D xoay hay mô phỏng động lực học chất lỏng.
- Đã kiểm tra lùi từ Phòng thí nghiệm về màn hình trước, trạng thái phản ứng/làm lại và xem ảnh Chrome sau phản ứng kết tủa. Source ZIP giữ nguyên.


## Tác giả source

Nguyễn Thanh Vy — Copyright © 2026. Thông báo áp dụng cho mã ứng dụng GDVN; thư viện bên thứ ba giữ giấy phép riêng. Xem `AUTHORSHIP.md` và `LICENSE`.

## Màu mô hình và ghi công source

Mô hình VSEPR đã có màu riêng cho từng hướng liên kết và đầu X, nhãn A/X1… cùng chú giải và tùy chọn bật/tắt màu. Màu chỉ phân biệt hướng trong minh họa, không biểu thị loại nguyên tố hay độ bền liên kết. Mô hình được phóng lớn hơn.

Tên Nguyễn Thanh Vy được ghi trong các tệp source GDVN, metadata HTML, package.json và banner build. Thông báo quyền sử dụng ở `LICENSE`, phạm vi ghi công ở `AUTHORSHIP.md`; giấy phép thư viện bên thứ ba được giữ nguyên. Đã kiểm tra 43 tệp mã và hai bản HTML xuất ra có thông tin tác giả.

## Bộ dạy học cơ bản

Đã thêm Bài học có hướng dẫn, Luyện tập theo chủ đề, Lời giải từng bước và chế độ Trình chiếu. Xem DAY-HOC-CO-BAN.md cho cách dùng, giả thiết và kiểm thử.
