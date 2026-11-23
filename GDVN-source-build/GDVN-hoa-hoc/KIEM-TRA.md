<!-- GDVN application documentation | Author: Nguyễn Thanh Vy -->
# Ghi nhận kiểm tra — 05/11/2026

Đạt:
- Phân tích công thức, ngoặc, hydrate, cân bằng ion và 30 phản ứng mẫu.
- Tổng electron 118 nguyên tố, một số ngoại lệ cấu hình, pH và biểu thức máy tính.
- Chất giới hạn, đồng giới hạn, chất dư, đổi gram sang mol, hiệu suất và dữ liệu sai.
- Build HTML độc lập thành công; hai tệp `dist/gdvn.html` và `../../gdvn.html` cùng nội dung.

Giới hạn xác minh:
- Công cụ trình duyệt không khởi tạo được trong phiên này; chưa xác minh trực quan bố cục mới.
- Service worker có danh sách tài nguyên ngoại tuyến; chưa xác minh ngoại tuyến và thao tác cài ứng dụng bằng trình duyệt.
- Không có xác nhận tương đương 1:1 với toàn bộ trang tham khảo.

Kiểm tra tương tác HTML đã gộp bằng JSDOM đạt: 23 mục điều hướng (gồm trang tổng quan), cân bằng Fe/O2, chất giới hạn H2/O2 ở hiệu suất 80%, chặn kết quả cũ khi đổi phương trình, báo lỗi phương trình sai, đổi sáng/tối và tìm kiếm rỗng. Kiểm tra này không thay thế kiểm tra hình ảnh bằng trình duyệt.

## Kiểm tra phiên bản 1.1

- Đạt `npm test`: các bộ tính hóa học cũ và chất giới hạn.
- Đạt `npm run test:advanced`: công thức phân tử từ SMILES, tọa độ hữu hạn, khoảng cách liên kết, xuất XYZ, từ chối cấu trúc sai/quá lớn; đạo hàm, nguyên hàm, nhân tử, nghiệm và giới hạn; worker đã bundle.
- Đạt `npm run test:ui` trong JSDOM dùng worker_threads: nhập ethanol và nhận C2H6O; đổi kiểu hiển thị, đo hình học, hiện cấu tạo 2D và bật xuất MOL; báo lỗi SMILES sai; giải x^2-5*x+6=0 ra [2,3]; vô hiệu hóa kết quả cũ; dọn worker khi rời trang.
- Đã sửa lỗi String.replace diễn giải ký tự `$` trong mã thư viện làm hỏng worker khi gộp HTML. Bộ kiểm tra tương tác chạy trực tiếp trên HTML đã xuất để bắt lỗi loại này.
- Chưa kiểm tra bố cục trực quan bằng trình duyệt tự động; các thao tác xuất tệp và khả năng cài ứng dụng cần kiểm tra thêm trong trình duyệt thật.

## Kiểm tra phiên bản 1.2

- Kiểm tra bằng ảnh Chrome headless ở desktop 1440 px, viewport mobile 390 px và trang bảng tuần hoàn: bố cục mới, logo và công cụ hiển thị.
- Đạt kiểm tra 7 nhóm điều hướng, 22 công cụ, lọc nhóm Phản ứng, trạng thái menu mobile, Escape và tìm kiếm không có kết quả.
- Các kiểm tra tương tác SMILES 3D và CAS vẫn đạt sau khi đổi khung trang.
- Đã phát hiện cổng 8770 trỏ bản cũ và chuyển bản xem trước đúng source sang 8771.

## Giao diện Sky

Đạt kiểm tra điều hướng 6 nhóm, 21 công cụ sau khi bỏ Xuất bản; lọc nhóm và tìm kiếm; tương tác SMILES/CAS. Đã xem ảnh Chrome desktop 1586 px và viewport mobile 390 px. Chữ và panel không bị cắt trong các ảnh đã kiểm tra.

## Kiểm tra 1.3

- Đạt kiểm tra 118 vị trí duy nhất, nhóm/chu kỳ/khối điển hình và tổng electron của tất cả nguyên tố.
- Đạt chuẩn hóa hàm sóng 1s, nút 2s, nút góc p/d, 14 orbital trên lưới 48³, quy luật co kích thước theo Z và năng lượng theo Z².
- Tích phân mật độ 14 orbital trên miền hữu hạn sai khác dưới 1,5% so với 1 trong cấu hình kiểm tra.
- Đạt tương tác lọc khí hiếm, chọn so sánh, chuyển cấu hình theo nguyên tố, nhập A không hợp lệ, tạo orbital 2pz/3dxy trong worker đã bundle.
- Kiểm tra Chrome thật xác nhận worker 2pz hoàn tất, hiển thị đám mây và đường cong. Chụp với đồng hồ ảo có thể gây timeout giả cho worker; kiểm tra xác nhận sử dụng thời gian thực.
- Các kiểm tra hóa học cũ và SMILES/CAS vẫn đạt. Source ZIP giữ nguyên.

## Kiểm tra 1.4

Đạt kiểm tra 34 dụng cụ, 12 mục mẫu (gồm trang trắng), JSON roundtrip và dữ liệu sai; 113 phương trình cân bằng, không trùng phương trình chuẩn hóa; tra cặp AgNO3/KI và CaCO3/HCl. Đạt kiểm tra sửa/xoay/nhân bản/undo/redo/lưu xưởng vẽ; tìm/lọc/trộn/tính lượng trong phòng thí nghiệm; cấu tạo → SMILES → 3D khớp công thức của các mẫu. JSDOM kiểm tra logic handler kéo; Chrome kiểm tra dispatch PointerEvent thực vào DOM, không giả lập pointer capture vật lý. Chrome đã raster hóa SVG và cho ra chữ ký PNG hợp lệ. Ảnh desktop của xưởng vẽ, phòng thí nghiệm và cấu tạo được xem để kiểm tra bố cục. Chưa kiểm tra dùng tay trên thiết bị cảm ứng hay chứng minh tỷ lệ tổng 50%.
