# Kết quả kiểm thử chức năng GDVN Hóa học

Bản 1.6.0-pilot2 · SHA-256 AF5DFD7F9D29D17411673E84E1D184B02E2EEE202B6FA5BBFA28EF4D3982B9D8. Bản HTML mở nhanh trùng bản dist.

- **Chrome:** 20/22 lượt kiểm đạt ở 1366×768 và 390×844. Mở được đủ 24 chức năng, tìm độ tan, lọc 20 nguyên tố lớp 7, cân bằng phương trình mẫu, pha chế, chuẩn độ, chạy mô phỏng, kiểm Canvas phân tử có điểm ảnh và lưu nét bảng viết qua tải lại. Không ghi nhận lỗi JavaScript trong các luồng đã chạy.
- **Không đạt:** Hai lượt kiểm SCOPE-09 trên hai kích thước đều tái hiện cùng một vấn đề là tùy chọn in còn chữ “thang điểm”.
- **Kiểm thử có sẵn:** 10/10 bộ đạt sau khi cung cấp esbuild từ thư mục phụ thuộc tạm cho bộ mô phỏng. Bộ mô phỏng đạt 466/466 ca.
- **Chưa kiểm:** Trình duyệt trên điện thoại thật và thao tác cảm ứng, bố cục PDF A4, nâng cấp cache ngoại tuyến, độ chính xác hình học từng mô hình và toàn bộ góp ý BA chưa triển khai.

Các kết quả xác nhận chức năng trong phạm vi ca đã chạy. Việc xác nhận đủ kiến thức theo lớp cần hồ sơ thẩm định riêng. Mã ứng dụng chưa sửa trong lượt kiểm.

[Kế hoạch](./test-plan.md) · [Ca kiểm](./test-cases.md) · [Lỗi](./bugs.md)
