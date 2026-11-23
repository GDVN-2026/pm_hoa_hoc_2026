# Báo cáo triển khai đợt 2 — GDVN Hóa học 1.6.0-pilot2

Ngày 13/11/2026. Mã nguồn được cập nhật trên ổ Google Drive I:. Bản mở nhanh được build từ nguồn. Trạng thái nghiệm thu đợt 2: còn tiêu chí mở.

## Phần đã triển khai

| Gói | Kết quả |
| --- | --- |
| 1 · Dữ liệu và phân tầng | Bổ sung 34 số khối tham chiếu theo danh sách kế hoạch, Tc [97], dữ liệu mẫu Cl và nhãn chưa xác minh cho trường thiếu. Trang dung dịch chọn chế độ lớp 8/11 theo đường dẫn. Phiếu in bài học có tùy chọn kèm đáp án, mặc định tắt. |
| 2 · Công cụ tương tác | Lập công thức từ hóa trị và từ thành phần/khối lượng tại Phương trình & cân bằng và Lời giải từng bước. Bài Lewis cho 6 phân tử, kiểm ngân sách electron và octet/duet. Bộ tính Qc/Kc có thước logarit cho hệ đồng thể với nồng độ dương. |
| 3 · Hướng dẫn | Đã kiểm đếm 24/24 chức năng có hướng dẫn tại chỗ. |
| 4 · Hoạt động theo lớp | Các công cụ mới hỗ trợ bài lớp 7, 10 và 11. Chưa phủ đủ 34 hoạt động riêng theo kế hoạch. Danh mục hiện có 38 chủ đề sau lần bổ sung liên kết của đợt 1. |

## Kết quả kiểm thử

- Build và đối chiếu SHA-256 bản mở nhanh với bản dist đạt. Bộ kiểm thử cơ bản, nguyên tử, dạy học, 33 phép kiểm hóa học và 97 phép kiểm hóa lý đã đạt trong lượt chạy.
- JSDOM trên bản cuối đạt. QA-07 xác nhận Fe₂(SO₄)₃, C₆H₁₂O₆ và 12,395 L. QA-08 xác nhận NH₃, CO₂ và ba chiều Qc/Kc. QA-09 có bằng chứng kiểm đếm từ mã nguồn.
- Chrome headless không trả DOM dùng được trong lần chạy. QA trình duyệt thật cho desktop/mobile, Canvas/3D và Print Preview chưa được xác nhận. QA-05, QA-10, QA-11 và QA-12 chưa nghiệm thu trọn tiêu chí.

## Bàn giao BA/Tester

1. K09: Đối chiếu 84 nguyên tử khối còn lại với phiên bản CIAAW đã chọn. Chốt nguồn theo trường cho độ âm điện, cấu hình hóa trị và oxide/hydroxide. Bổ sung cảnh báo số khối trong phép tính mol. Tránh biến trường thiếu thành giá trị suy đoán.
2. BA-03: Chế độ lớp 8 hiện có C% và độ tan. Cần thêm đọc thang pH và C_M vào chế độ này. Chế độ lớp 11 cần minh họa màu chỉ thị theo thể tích, phân biệt khoảng đổi màu với điểm kết thúc quan sát.
3. BA-04 đến BA-06: Rà sáu bài pilot theo yêu cầu chi tiết, bổ sung bảng dữ liệu P01, chấm tự động và checkbox rubric. Hiện tùy chọn in áp dụng cho bài học. Cần duyệt bố cục A4 và quyết định phiếu in từ công cụ nào thực sự cần trong giờ dạy.
4. K01–K06: Lập ánh xạ từ 34 chủ đề gốc tới hoạt động và câu hỏi. Bổ sung các ca chuyển thể, nhãn NPK, hoạt động kim loại và nhóm chức còn thiếu. Chốt danh mục 34 chủ đề cần nghiệm thu vì web hiện có 38 mục.
5. Tester: Chạy QA-05, QA-07 đến QA-12 trên Chrome/Edge ở 1366×768 và 390×844. Lưu ảnh kiểm tra phiếu P04/P08 và luồng mobile, xác minh cơ chế cập nhật bản lưu ngoại tuyến.

Tiếp tục các khoảng trống có tác động trực tiếp tới giảng dạy trước khi bổ sung tính năng. Chưa đủ bằng chứng để đề xuất dừng phát triển theo phạm vi kiến thức GDPT 2018 và học liệu đối chiếu Thông tư 38/39.