# Báo cáo thực hiện kế hoạch GDVN Hóa học 2.0.0

Ngày 13/11/2026 · Nguồn và HTML mở nhanh trên ổ Drive I:. Bản đã dựng hiện mang nhãn 1.6.0-pilot2. Chưa có căn cứ phát hành 2.0.0.

| Cổng | Kết quả thực tế | Việc bàn giao |
| --- | --- | --- |
| 01 · Bảng tuần hoàn | Có 34 số khối tham chiếu từ đợt trước. Bộ tính khối lượng mol tại Phương trình & cân bằng hiển thị cảnh báo danh định; Lời giải từng bước hiển thị cảnh báo cho dạng nhập công thức. Ca Tc [97] đạt ở JSDOM. | Đối chiếu từng dòng CIAAW và nguồn riêng cho độ âm điện, hóa trị, oxide và hydroxide. Phần dữ liệu các trường này vẫn thiếu. |
| 02 · Dung dịch | Lớp 8 có C%, độ tan của mẫu bão hòa, nồng độ mol, tính lượng pha theo khối lượng và đọc pH. JSDOM xác nhận 0,4 mol/L, 30 g chất tan và 170 g nước. Lớp 11 giữ mô hình chuẩn độ hiện có. | Thêm mô phỏng màu chỉ thị theo thể tích và định nghĩa rõ mốc quan sát. Quỳ tím trong bản này hiển thị vùng chuyển màu, thay cho việc gán màu đỏ/xanh ở mọi pH khác 7. |
| 03 · Danh mục | Đã kiểm đếm 34 mã chủ đề duy nhất theo lớp và 24 hướng dẫn. Các liên kết lớp 9–12 từ bốn mục bổ sung được nhập lại vào chủ đề hiện có. | Hoạt động riêng về chuyển thể, NPK, dãy kim loại và nhóm chức/polymer còn mở. Cần rà lại cách nhóm chủ đề chuẩn độ trong danh mục lớp 11. |
| 04 · Học liệu | Thêm hai mục đọc và câu tự kiểm về tiêu hóa tinh bột, sử dụng glucose và dự trữ tinh bột ở cây trong Thư viện minh họa. | Chưa có 5 mô hình 3D bổ sung hay 6 video được duyệt. Cần nguồn có quyền sử dụng, minh chứng từng mô hình và mục tiêu quan sát. Kiểm lại mã phụ lục của video thao tác cơ bản và các clip minh họa. |
| 05 · Chấm và in | Có checkbox tự chấm cho 10 bài pilot, lưu trong phiên học. JSDOM xác nhận từng bài cộng đủ 10 điểm. Giữ tùy chọn in kèm đáp án của bài học. | Chưa có chấm tự động các phần định lượng của bộ pilot, bảng P01, phiếu in từ 6 công cụ hoặc PDF A4 đã kiểm tra. Tiêu chí điểm đang lấy từ nội dung đáp án hiện tại, cần dữ liệu cấu trúc khi mở rộng ngân hàng. |
| 06 · Ma trận | Kế thừa ma trận mẫu hiện có. | Chưa gắn mã YCCĐ và căn cứ thiết bị cho từng dòng. Chốt phạm vi thiết bị THCS/THPT và tách minh chứng thực hành thật khỏi minh chứng trên web. |
| 07 · Kiểm thử | Dựng HTML. Bộ cơ bản, nguyên tử, dạy học, 33 phép kiểm hóa học, 97 phép kiểm hóa lý và JSDOM đạt trong lượt chạy. Bản cuối đã chạy JSDOM với các ca lớp 8/11, Tc và tự chấm. Đã đổi phiên bản cache service worker. | Chưa kiểm thử Chrome/Edge desktop/mobile, Canvas/3D, PDF và hành vi chuyển phiên bản offline trên trình duyệt thật. |
| 08 · Duyệt | Chưa có biên bản PED-01 đến PED-04. | Giáo viên bộ môn xác nhận danh pháp, đáp án, phạm vi cấp lớp và minh chứng thực hành. |

## Quyết định và câu hỏi cho kế hoạch tiếp theo

- Ưu tiên kiểm định nguồn dữ liệu nguyên tố, các hoạt động trực tiếp dùng trong tiết học và bộ minh chứng TT38/39. Xác nhận theo Chương trình GDPT 2018 cho kiến thức, đối chiếu Thông tư 38/39 cho thiết bị và học liệu.
- Chốt nguồn hợp lệ của mô hình và video, cách thể hiện các mục chưa có bằng chứng, cùng phạm vi phiếu in thực sự dùng trong giờ dạy.
- Chưa đề xuất dừng phát triển hoặc chuyển nhãn sang 2.0.0. Cần xử lý các khoảng trống giảng dạy và kiểm tra lại các cổng trước khi chốt phát hành.
