# Rà soát và tái cấu trúc mã GDVN

Ngày 05/11/2026. Source sử dụng trở lại: `GDVN-source-build/GDVN-hoa-hoc`, máy chủ cổng 8771. ChemQuest ở cổng 8773 là một dự án khác và không được dùng thay cho bản này.

## Việc đã làm

- Tách danh mục công cụ vào `tool-catalog.js` và thành phần giao diện dùng chung vào `ui-kit.js`.
- Bỏ các màn hình nguyên tử, bảng tuần hoàn và phân tử đơn giản đã bị thay thế, tránh hai triển khai song song.
- Giữ tính năng, dữ liệu người dùng, thông tin tác giả GDVN và giấy phép thư viện.
- Tìm tên tác giả/đường dẫn website tham khảo trong mã JS/CSS/HTML của ứng dụng, ngoài vendor và bản gộp: không thấy các chuỗi đã kiểm tra.
- Kiểm tra hồi quy HTML sau build đạt, gồm bộ vẽ, xưởng thiết kế, thí nghiệm, cấu tạo sang 3D, bảng tuần hoàn, orbital, CAS, VSEPR và phức chất.

## Phạm vi kết luận

Việc không có chuỗi tên/URL, không có tệp trùng hash hoặc thay đổi cấu trúc code không chứng minh nguồn hoàn toàn độc lập và không bảo đảm về sở hữu trí tuệ. Tài liệu khảo sát trước đó và giấy phép được giữ lại, không xóa để che lịch sử. Nếu một thành phần được xác định là mã/tài nguyên bên ngoài chưa có quyền phù hợp, cần loại bỏ hoặc thay thế bằng triển khai được tạo độc lập.

Báo cáo này không phải hướng dẫn làm mã sao chép khó truy vết. Không cập nhật ZIP.
