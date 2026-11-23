<!-- GDVN application documentation | Author: Nguyễn Thanh Vy -->
# Bộ công cụ dạy học cơ bản — 05/11/2026

Các mô-đun mới được tự xây cho nhu cầu GDVN, không lấy mã hoặc nội dung từ trang tham khảo. Mã: teaching-core.js, teaching-ui.js. Tác giả: Nguyễn Thanh Vy.

## Sử dụng

- #lessons: 8 chủ đề nguyên tử/ion, hình dạng/liên kết, mol, phản ứng/chất giới hạn, dung dịch, pH, pin điện hóa, tách hỗn hợp. Mỗi bài có 5 bước: mục tiêu → dự đoán → khám phá → giải thích → tự kiểm tra. Ẩn/hiện gợi ý đáp án, mở công cụ liên quan, nhớ bước khi quay lại, đánh dấu tiến độ. In phiếu học tập dành cho học sinh, không in đáp án.
- #practice: 24 câu mới, 3 câu/chủ đề; xáo trộn không lặp trong lượt. Chọn tối đa 5/10/24 câu, giới hạn theo số thực có; phản hồi từng câu; xem lại lời giải; làm lại câu sai; lưu 20 lượt gần nhất trên máy. Tính năng quiz cũ vẫn giữ riêng.
- #tutor: 5 dạng bài, lần lượt hiện bước hoặc toàn bộ. Đổi khối lượng sang mol; tính nồng độ từ mol và mL; pha loãng; pH axit mạnh một nấc; hai chất phản ứng tìm giới hạn/dư và lượng sản phẩm. Dữ kiện đổi sẽ vô hiệu lời giải hiển thị cũ. Không chấp nhận dữ kiện rỗng/không dương, pha đậm bằng thao tác pha loãng, hoặc phương trình không phù hợp.
- Nút Trình chiếu ở thanh trên: ẩn menu và tăng chữ, mở rộng vùng bài học. Thoát bằng nút nổi hoặc Esc. Đây là chế độ tập trung trong trang, không bắt buộc fullscreen trình duyệt.

## Giả thiết và giới hạn

- Mol sử dụng khối lượng nguyên tử trong dữ liệu tích hợp; ví dụ làm tròn có thể chênh số liệu sách.
- Pha loãng giả sử không có phản ứng/thất thoát. Thêm dung môi tới thể tích cuối, không mặc định cộng thể tích.
- pH: 25 °C, axit mạnh một nấc, nồng độ lý tưởng C ≤ 0,1 M. Tính sự tự ion hóa của nước, không dùng pH = −log C ở giới hạn cực loãng. Chưa mô hình hóa hoạt độ.
- Tỉ lượng: đúng hai chất phản ứng, phương trình cân bằng được, phản ứng hoàn toàn theo phương trình và không có phản ứng phụ. Kết quả sản phẩm là lý thuyết.
- Nội dung phục vụ bài giảng nền tảng; không tuyên bố phủ toàn bộ chương trình hoặc đã được thẩm định chuyên môn độc lập.
- Tiến độ/kết quả nằm trong trình duyệt, chưa có tài khoản, giao bài từ xa hoặc quản lý lớp.

## Kiểm tra

npm run test:teaching kiểm tra cấu trúc bài học/câu hỏi, chọn đề không lặp, đơn vị, pha loãng, pH cực loãng, chất giới hạn/vừa đủ/dư và dữ kiện sai.

npm run test:ui kiểm tra bản HTML build: bài học, nhớ bước/đánh dấu, phiếu in không chứa đáp án, luyện tập/chấm/giải thích/làm lại sai/lịch sử, lời giải/đổi dữ kiện, trình chiếu/Esc và các chức năng hiện hữu.

Đã xem ảnh Chrome desktop, chế độ trình chiếu và màn hình hẹp 500 px. Không cập nhật ZIP.
