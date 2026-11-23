# Kế hoạch kiểm thử GDVN Hóa học

Bản 1.6.0-pilot2. Đối tượng là tệp HTML mở nhanh dùng để giảng. Chrome headless qua Playwright ở 1366×768 và 390×844, cùng các bộ kiểm thử Node/JSDOM. Tiêu chí gồm mở đủ công cụ, tìm nội dung, thực hiện phép tính và mô phỏng mẫu, lưu bảng viết và rà yêu cầu bỏ tính điểm. Video và ngân hàng câu hỏi không phải tiêu chí bắt buộc để dạy. Lượt này không sửa ứng dụng.

| Nhóm yêu cầu | Ca truy vết |
| --- | --- |
| Điều hướng và tìm kiếm | NAV-24, SEARCH |
| Công cụ giảng dạy | PERIODIC-7, EQUATION, SOLUTION-8, SOLUTION-11, LAB, MOLECULE-CANVAS |
| Lưu bản vẽ | BOARD-PERSIST |
| Bỏ tính điểm | SCOPE-09 |
| Hồi quy | JS-ERROR, các script npm test |
