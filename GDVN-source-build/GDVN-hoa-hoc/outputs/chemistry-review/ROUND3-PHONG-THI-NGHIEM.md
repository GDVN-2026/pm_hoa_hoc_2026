# Vòng 3 — sửa phòng thí nghiệm trên bản HTML chuẩn
Ngày 06/11/2026.

## Nguồn chuẩn và skill
Tệp người dùng chỉ định: files/gdvn.html. Trước sửa, SHA256 trùng dist/gdvn.html: 26E1C8DC8A32CA2F8987ED3A2931B66B5A9CB87C033362C4ED16A41A64F1212F.
Sửa mã trong files/GDVN-source-build/GDVN-hoa-hoc rồi build cập nhật chính tệp trên. Bản trước lưu tại round3-before/.

Áp dụng hoa-hoc-gdpt-vn, tester-vn và web-design-guidelines. Không tìm thấy skill riêng tên full-stack trong danh mục hoặc thư mục skill đã cài; ứng dụng hiện dùng JavaScript module và bản đóng gói HTML, không có backend riêng để sửa trong phạm vi này.

## Lỗi và thay đổi
- LAB-EMPTY: lọc về 0 kết quả vẫn cho bấm điền lượng, dẫn tới truy cập input đã bị xóa; bảng định lượng và phạm vi của thí nghiệm trước vẫn còn. Sửa vô hiệu hóa các nút phụ thuộc thí nghiệm, xóa dữ liệu cũ, ẩn phạm vi cũ, hướng dẫn giảm bộ lọc; tự phục hồi khi chọn được thí nghiệm.
- LAB-PLAYBACK: thêm Tạm dừng/Tiếp tục, giữ bước và thời gian còn lại; dừng CSS animation trong cảnh. Reset, đổi đầu vào, đổi bộ lọc hoặc chuyển trang hủy lịch cũ. Cảnh kết quả có hoạt ảnh lặp cũng có thể tạm dừng. Các transition ngắn không được coi là mô phỏng động học.
- LAB-EXPORT: tệp TXT chứa lượng đầu vào và đơn vị; chỉ ghi kết quả khi còn hợp lệ. Ghi rõ giả định phản ứng hoàn toàn theo một phương trình, giới hạn cân bằng/độ tan/phản ứng phụ/hiệu suất và tính minh họa của thời gian.
- UI: aria-pressed cho nút tạm dừng, văn bản trạng thái; ẩn phần dụng cụ khi không có kết quả; tắt hoạt ảnh/transition của cảnh khi prefers-reduced-motion.
- SW tăng v42; không thay hóa chất, phương trình hoặc thêm dữ liệu phản ứng chưa thẩm định.

## Kiểm tra
Kết quả cuối: simulation-tests.cjs đạt 462/462, không có lỗi JSDOM chưa xử lý; ui-tests.cjs trên HTML build cuối đạt, exit 0. Chi tiết tương tác: round3-regression/deep-results.json.
Hai bản files/gdvn.html và dist/gdvn.html sau build khớp SHA256: 3DD555AE401F9BEE550AA432EC3AA4F9D5599BAAB00A88755CFA9306F9C2F407 (4.455.429 byte).
Các kết quả hoàn tất ghi bên dưới. Kiểm tra tự động sử dụng JSDOM, canvas/ResizeObserver giả lập và Node worker; không xác nhận hình ảnh thực hoặc độ mượt bằng số FPS.
5 ca mới: lọc trống rồi phục hồi; tạm dừng/tiếp tục giữ bước; reset khi đang dừng; đổi lượng khi đang dừng; TXT có dữ kiện/giới hạn và bỏ kết quả cũ.
Bộ đối chứng chuyên môn 33 assertion và hóa lý 97 kiểm tra đạt lại trong vòng này.

## Căn cứ UI
Hướng dẫn UI đã đọc: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md (trạng thái trống, chuyển động có thể ngắt, giảm chuyển động, điều khiển truy cập được).
Phạm vi chuyên môn và những phần chưa đối chiếu chương trình tiếp tục theo THAM-DINH-HOA-HOC-GDPT.md và ROUND2-DIEN-HOA-NHIET-HOA.md. Không suy số test thành tỷ lệ đáp ứng chương trình.

## Giới hạn
Công cụ quan sát trình duyệt vẫn bị chặn quyền từ lượt trước. Không dùng đường vòng truy cập. Chưa kết luận hình ảnh, chuyển động 3D thực, cảm ứng, FPS hoặc ngoại tuyến. Không đổi cài đặt quyền của người dùng.

