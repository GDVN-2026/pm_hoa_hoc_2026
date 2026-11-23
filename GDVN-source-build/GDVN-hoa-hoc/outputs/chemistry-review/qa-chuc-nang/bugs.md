# Lỗi và việc còn mở

## QA-BUG-01 · Phiếu in còn tùy chọn thang điểm

- **Mức độ:** Trung bình, lệch phạm vi sử dụng đã chốt.
- **Điều kiện:** Bản 1.6.0-pilot2, Chrome ở 1366×768 và 390×844.
- **Tái hiện:** Mở Học theo lớp và ôn tập → Bài học có hướng dẫn → Tùy chọn phiếu in.
- **Mong đợi:** Tùy chọn in đề hoặc kèm đáp án và lời giải.
- **Thực tế:** Giao diện vẫn hiển thị tùy chọn in kèm đáp án và thang điểm.
- **Bằng chứng:** SCOPE-09 thất bại ở cả hai kích thước.
- **Kiểm lại sau sửa:** Kiểm bài học, luyện tập và phiếu in theo FR-09. Giữ lời giải và phản hồi tự học.

## Ca chưa chạy

Chưa kiểm Chrome với thao tác cảm ứng thật, chất lượng PDF A4, nâng cấp ngoại tuyến, hoặc các yêu cầu chỉnh sửa bảng viết và Góc thử nghiệm trong hồ sơ BA.
