# GDVN Hóa học · Rà soát hồi quy vòng 2

Bản 1.6.0-pilot2. Bản mở nhanh và dist cùng SHA-256 AF5DFD7F9D29D17411673E84E1D184B02E2EEE202B6FA5BBFA28EF4D3982B9D8, trùng với vòng trước.

Chrome desktop chạy lại 46 ca, đạt 41 và tái hiện cả 5 ca lỗi. Chrome giả lập cảm ứng 390×844 chạy thêm 5 ca, đạt 3 và ghi nhận 2 ca lỗi, trong đó có 1 lỗi trùng với desktop. Tổng 44/51 ca đạt, 6 vấn đề riêng biệt tái hiện qua các ca lỗi.

| Mã | Mức độ | Kết quả và tiêu chí sửa |
| --- | --- | --- |
| QA-BRD-01 | Cao | Nhập 500 nét rồi nhập thêm 1 nét, xuất được 501 nét nhưng tải lại chỉ còn 500. [drawing-ui.js](../../../drawing-ui.js) dòng 13 cắt danh sách khi đọc và dòng 44 chỉ kiểm giới hạn từng tệp. Áp dụng giới hạn trước khi nhận và giữ nguyên toàn bộ dữ liệu đã nhận. |
| QA-EQ-01 | Trung bình | Cân bằng ion sắt rồi nhập phương trình sai. Desktop và 390 px đều còn hai dòng của bảng bảo toàn cũ. [reactions-ui.js](../../../reactions-ui.js) dòng 19–20 cần xóa bảng khi bắt đầu tính lại hoặc khi đầu vào thay đổi. |
| QA-BRD-03 · mới | Trung bình | Tại 390 px, nhập hai nét, bấm Xóa bảng. Hoàn tác bị khóa, Làm lại mở và khôi phục từng nét, 0 → 1 → 2. [drawing-ui.js](../../../drawing-ui.js) dòng 36 và 42 đặt các nét đã xóa vào ngăn làm lại. Hoàn tác một lần phải phục hồi toàn bộ bảng, làm lại một lần phải xóa lại cả bảng. |
| QA-NAV-01 | Trung bình | Nhãn Không gian hóa học là DIV, bấm từ #electro không đổi tuyến. [index.html](../../../index.html) dòng 27 cần liên kết về Tổng hợp và nhận Enter. |
| QA-BUG-01 | Trung bình | Bật in lời giải vẫn hiện thang điểm. [teaching-ui.js](../../../teaching-ui.js) dòng 226 và 270 cần bỏ thang điểm khỏi tùy chọn và nội dung in. |
| QA-OFF-01 | Cao nếu phát hành PWA offline | Trang gốc và chuyển tuyến nội bộ chạy khi ngắt mạng. Tải lại ở #periodic báo ERR_INTERNET_DISCONNECTED. [sw.js](../../../sw.js) dòng 14 đối chiếu URL chính xác theo danh sách cache. Nguyên nhân trực tiếp chưa được xác minh. |

Các luồng vẫn đạt gồm bốn cú pháp phương trình hợp lệ, xuất SVG phương trình, nhập và xuất tệp Studio, xuất bảng PNG/SVG/JSON, tra cặp chất có và ngoài danh mục, chạy và tạm dừng mô phỏng, tải ghi chép TXT, cùng kiểm tra GET/HEAD, manifest, 404 và 405. JSON hỏng trên bảng vẫn giữ dữ liệu và báo lỗi kỹ thuật tiếng Anh như vòng trước.

Chưa duyệt nghiệm thu chức năng do lỗi có thể làm mất nét và lỗi hiển thị kết quả cũ. Lượt này giữ phạm vi hồi quy chức năng và rà mã liên quan. Kiểm tra 390 px là giả lập trên Chrome. Lượt này chỉ thêm báo cáo QA.

[Ma trận chi tiết vòng trước](test-report-toan-he-thong.md)
