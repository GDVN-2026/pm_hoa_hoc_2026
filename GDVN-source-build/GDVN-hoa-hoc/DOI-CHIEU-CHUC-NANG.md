<!-- GDVN application documentation | Author: Nguyễn Thanh Vy -->
# Đối chiếu chức năng — cập nhật 05/11/2026

Nguồn: https://hoahoc-conictypst.pages.dev/#/home . Đã tải giao diện trang chủ bằng Chrome headless ngày 05/11/2026; đối chiếu mô tả tính năng và nhật ký v2.0 hiển thị công khai. Đây là khảo sát giao diện, chưa kiểm thử từng thao tác của bản gốc. Không sao chép mã nguồn hoặc kho dữ liệu của trang tham khảo. Các số lượng phía gốc dưới đây là số trang tự công bố, chưa kiểm đếm độc lập. Trang gốc có chỗ ghi 59 thí nghiệm nhưng thống kê tổng ghi 632, nên không quy đổi trực tiếp thành phần trăm tương đương.

| Phạm vi | GDVN hiện có | Còn thiếu / cần đối chiếu |
|---|---|---|
| Nguyên tố | 118 nguyên tố, tìm kiếm, lọc nhóm/chu kỳ/khối, chi tiết cấu hình, SVG bảng và orbital, chuyển thẻ vào bảng viết | Xu hướng tuần hoàn nâng cao, chuyển nhiều thẻ/nhóm tự căn lưới; dữ liệu vật lý mở rộng chưa đối chiếu |
| Nguyên tử | Hạt nhân/ion/số khối minh họa, Bohr; 14 orbital s/p/d hệ một electron, đám mây và đường phân bố xuyên tâm | Orbital f; bộ số lượng tử đầy đủ; mô phỏng nhiều electron chính xác hơn |
| Phân tử | 12 mẫu, nhập SMILES dựng 2D/3D, đo khoảng cách/góc, màu liên kết, PNG/XYZ/MOL | Tra tên tùy ý, GIF/WebM, dao động nhiệt, bung cấu trúc, lớp điện tích, ADN/protein/nano và mô phỏng va chạm |
| Liên kết / phối tử | VSEPR, mô hình liên kết có màu, lai hóa, một số phức mẫu | Cặp electron tự do 3D, toàn bộ dạng VSEPR, mạng tinh thể, liên kết kim loại/hydrogen nâng cao; trường tinh thể CFT và danh pháp phức đầy đủ |
| Phản ứng / điện / nhiệt | Cân bằng, tính lượng/chất giới hạn, Nernst/Faraday, nhiệt hóa và cân bằng | Toàn bộ hệ phản ứng, lời giải redox sư phạm từng bước, bảng ICE và các trường hợp nâng cao cần đối chiếu sâu |
| Thử nghiệm | 113 phương trình/biến thể chất, tìm/lọc/yêu thích, trộn cặp, tính lượng, nhật ký, hiệu ứng cốc | So với thống kê 632 mục của trang gốc, kho còn nhỏ; không đồng nhất 113 phương trình với 113 quy trình thực hành hoàn chỉnh |
| Dung dịch | pH, đệm, pha loãng, chuẩn độ HCl/NaOH | Hệ đa nấc/hỗn hợp, đường chuẩn độ và tương tác nâng cao |
| Hữu cơ | Bài diễn giải từng bước về tách chất và chuyển hóa | Mũi tên cong tương tác, SN1/SN2/E1/E2/SEAr chi tiết; sơ đồ thiết bị và tính toán tách chiết nâng cao |
| Kiến thức / tự kiểm tra | 32 khái niệm, 15 câu hỏi | Trang gốc công bố 206 khái niệm, 79 công thức, 197 chất/ion; chưa đối chiếu từng bản ghi |
| Thiết kế / bản vẽ | 34 dụng cụ, 11 mẫu bố trí + trang trắng, kéo/xoay/lớp, lưu JSON/SVG/PNG; vẽ cấu tạo chuyển 3D | Kho 346 mẫu được gốc công bố; cầu nối bảng viết cho các công cụ khác và cấu tạo ↔ SMILES đầy đủ |
| Bảng viết | Bút/tẩy/hình/chữ, hoàn tác/làm lại, tự lưu, PNG; mới có SVG, JSON chỉnh sửa, nhận thẻ nguyên tố | Chèn ảnh/PDF, nhiều loại bút, hình khối, chọn/biến đổi từng nét và cầu nối toàn bộ công cụ |
| Máy tính | Biểu thức và CAS: khai triển, nhân tử, đạo hàm, nguyên hàm, giải phương trình, giới hạn | Toàn bộ hành vi/phím của máy Casio và giới hạn bộ giải chưa đối chiếu |
| Ngoại tuyến | HTML độc lập; service worker cho bản chạy server | Cài PWA đa nền tảng, quy trình nâng cấp và khả năng offline đầy đủ chưa kiểm chứng |

## Phạm vi đã loại theo yêu cầu

Nhóm Xuất bản và chức năng so sánh nguyên tố đã được bỏ theo yêu cầu người dùng. Không đưa hai mục này vào danh sách cần khôi phục. Tên menu, bố cục và luồng 4 nhóm của GDVN là lựa chọn riêng, không coi sự khác nhau về nhãn là lỗi thiếu tính năng.

## Đã bổ sung trong lượt này

- Đổi Tổng hợp / Bảng tuần hoàn hóa học / Nhóm nguyên tố theo ghi chú.
- Xóa nút, chế độ chọn và cả bảng so sánh; các ô nguyên tố luôn mở chi tiết.
- SVG màu cho 21 icon menu con.
- Chuyển thẻ nguyên tố sang bảng viết bằng dữ liệu cục bộ, không gửi mạng; giữ các nét đang có.
- Xuất bảng viết thành SVG, lưu JSON có thể chỉnh sửa, nhập JSON với kiểm tra định dạng/kích thước và thông báo lỗi.
- Kiểm thử giao diện bản build qua: bộ lọc/chi tiết, không còn phần so sánh, icon SVG, cầu nối bảng viết, nhập JSON đúng/sai, tiến độ hành trình và các mô hình/công cụ hiện hữu. Kiểm tra ảnh Chrome desktop ở 1519 px.

Không xác nhận tỷ lệ tổng thể 50% hay 1:1 khi chưa có danh sách tiêu chí và kiểm thử tương ứng. Không cập nhật ZIP.

## Bổ sung độc lập theo nhu cầu dạy học

Đã thêm 8 bài học theo bước, 24 câu luyện tập mới (bên cạnh 15 câu quiz cũ), lời giải 5 dạng bài, phiếu học tập và chế độ trình chiếu. Xem DAY-HOC-CO-BAN.md. Tiêu chí giai đoạn này là chức năng dạy học nền tảng của GDVN, không phải sao chép phạm vi trang tham khảo.
