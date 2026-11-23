# Nâng cấp mô phỏng và tương tác 3D — 06/11/2026

Áp dụng BA/QA/Tester trên source GDVN-hoa-hoc. Không sử dụng ChemQuest thay thế.

## Thay đổi

- Sửa lượng hoặc đơn vị: hủy timer, bỏ hiện tượng/kết quả cũ, trở lại chuẩn bị và yêu cầu chạy lại. Hủy cả đường chú thích để tránh nhãn cũ còn trên cảnh.
- Đưa nhập lượng cạnh cảnh và kết quả. Có nút điền số mol theo hệ số phương trình, thanh bốn bước, chọn tốc độ trình diễn 0,5×/1×/2×. Thay tốc độ yêu cầu chạy lại.
- Hoàn tất mô phỏng có bảng sản phẩm lý thuyết, lượng dư và chất giới hạn gắn với bộ dữ kiện đã chạy. Thay lượng làm bảng này biến mất. Lượng bằng 0 không tạo sản phẩm.
- Sửa đo khoảng cách cho H2/O2/N2: trả khoảng cách AB dù không có nguyên tử thứ ba để xác định góc.
- Sửa SMILES khi worker đang chạy: hủy tác vụ và bỏ quyền cập nhật kết quả cũ; nhắc dựng lại. Chọn SMILES mẫu cũng vô hiệu kết quả cũ. Mô hình trước được giữ cùng thông báo rõ để người học không nhầm.
- Đổi hệ/anot điện phân dừng mô phỏng, yêu cầu bật nguồn lại.
- Canvas mô hình nhận focus; phím mũi tên xoay, +/− phóng to/thu nhỏ, 0 đặt lại. Hỗ trợ kéo cảm ứng bằng touch-action. Chỉ đổi kích thước bộ đệm khi khung thay đổi, thiết lập lại ma trận vẽ mỗi khung để tránh tích lũy scale.
- Bổ sung màu nền/viền, trạng thái tiến trình, focus bàn phím, bố trí hẹp và dark mode cho các thành phần mới.

## Phạm vi khoa học

Mô phỏng định tính kết hợp phép tính tỉ lượng theo phương trình cân bằng và giả thiết phản ứng hoàn toàn. Số lượng sản phẩm được ghi là **lý thuyết**; không suy diễn nó là sản lượng thực nghiệm. Hoạt ảnh, màu và thời gian trình diễn không phải mô phỏng động học, nhiệt động hoặc cân bằng kết tủa đầy đủ.

Nguồn đối chiếu: [OpenStax — Reaction Yields](https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields) cho chất giới hạn và sản lượng lý thuyết; [OpenStax — Precipitation and Dissolution](https://openstax.org/books/chemistry-2e/pages/15-1-precipitation-and-dissolution) cho điều kiện tích ion/tích số tan. Chưa có thể tích/nồng độ/Ksp đầy đủ để quyết định lượng kết tủa thực trong mọi dung dịch; không thay công thức tỉ lượng bằng một khẳng định cân bằng hóa học.

Không mở khóa 102 tổ hợp điện phân chưa có dữ liệu. Không thay kho phản ứng bằng các phương trình cân bằng nhưng thiếu cơ sở xảy ra. Không tuyên bố đã thẩm định chuyên môn độc lập toàn bộ 140 mục hoặc đạt mọi kiến thức hóa học.

## Tiêu chí nghiệm thu và kiểm thử

| Tiêu chí | Ca hồi quy |
|---|---|
| Đổi lượng hủy kết quả/cảnh trong và sau lần chạy | LAB-AMOUNT-CHANGE-INVALIDATES-SIMULATION, LAB-EDIT-DURING-REACTION |
| Đo AB của phân tử hai nguyên tử | MODEL-LIBRARY-4/5/6 |
| Không hiển thị kết quả worker của SMILES cũ sau khi nhập khác | MODEL-INPUT-CHANGE-IN-FLIGHT |
| Tiến trình và bảng lượng gắn đúng dữ kiện | LAB-NEW-PROGRESS-SNAPSHOT |
| Đổi tốc độ/hệ điện phân cần chạy lại | LAB-SPEED-INVALIDATES-RUN, ELECTRO-CHANGE-REQUIRES-RESTART |
| Bàn phím gọi cập nhật mô hình | MODEL-KEYBOARD-CONTROLS |

`npm run test:simulation` chạy bộ 449 ca, gồm quét 140 cảnh, 140 ca định lượng (mỗi ca mol và g), 132 tổ hợp điện phân và các tình huống lỗi/tương tác. Một số ca chứa nhiều dữ liệu; 449 không phải số chức năng độc lập hay tỷ lệ phủ toàn sản phẩm. Runner trả exit code 1 nếu có FAIL; JSON kết quả nằm trong `outputs/testing/simulation-regression/deep-results.json`.

Môi trường kiểm tra: Windows, Node v20.17.0, jsdom 26.1.0, esbuild 0.25.12. Có thể đặt GDVN_JSDOM và GDVN_ESBUILD trỏ runtime ngoài source khi dependency trên Drive chưa cài đầy đủ. Lượt này dùng runtime trên ổ C vì npm ci trước đó gặp lỗi ghi trên ổ Drive; không thay lockfile hoặc thêm dependency runtime cho ứng dụng.

Các suite lõi tests/studio-lab/structure/advanced/atomic đạt sau sửa; bộ UI trên HTML build cuối đạt; bộ mở rộng 449/449 đạt. Sáu ca lỗi cũ xác nhận lại với thời gian mô phỏng gốc đạt 6/6; kết quả ở outputs/testing/simulation-confirmation/focused-results.json. Canvas được giả lập, worker dùng worker_threads trong test. Đây không phải kiểm thử hình ảnh, cảm ứng vật lý hoặc đo FPS. Kiểm tra trình duyệt thật còn bị chặn quyền truy cập origin, chưa dùng cách khác để vượt chặn.

Đã build lại dist/gdvn.html và ../../gdvn.html, hai tệp có SHA256 giống nhau. Không tạo ZIP.
