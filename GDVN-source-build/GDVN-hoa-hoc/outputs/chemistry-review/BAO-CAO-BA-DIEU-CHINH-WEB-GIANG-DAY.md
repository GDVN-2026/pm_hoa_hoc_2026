# Báo cáo BA — Điều chỉnh GDVN Hóa học phục vụ giảng dạy

**Phạm vi:** Bản hiện hành 1.6.0-pilot2, KHTN lớp 6–9 và Hóa học lớp 10–12. Người dùng chính là giáo viên trình chiếu và học sinh thao tác để hiểu bài. Nguồn yêu cầu gồm tám bình luận có ảnh và yêu cầu bỏ tính điểm. Đã đối chiếu vị trí trong mã nguồn. **Trạng thái: Đặc tả bàn giao, chưa sửa web. Toàn bộ ca nghiệm thu dưới đây chưa chạy.**

Ưu tiên đề xuất: xử lý FR-09 trước, tiếp theo FR-01 đến FR-06. FR-07 cần chốt mẫu khoa học. FR-08 cần kiểm tra lưu và xuất trước khi bàn giao vì ảnh hưởng bản vẽ đã có.

## FR-01 · Liên kết Không gian hóa học — Bình luận 1

**Hiện trạng.** Ở `#electro`, nhãn trên thanh đầu trang trông giống nút, nhưng trong `index.html` là khối `workspace-tag`. Ảnh và mã cho biết điểm được góp ý là thanh đầu trang. Chức năng tính pin chưa được báo lỗi trong bình luận này.

**Cách sửa.** Đổi khối này thành liên kết có đích `#home`, giữ biểu tượng và tên hiện tại. Dùng điều hướng hash hiện có. Khi đi từ kết quả tìm kiếm, xóa truy vấn theo luồng điều hướng sẵn có để Tổng hợp mở bình thường. Nút Quay lại tiếp tục đi theo lịch sử.

**UAT-01.** Từ `#electro` và một trang khác, bấm liên kết hoặc dùng Tab rồi Enter. Kết quả là Tổng hợp hiển thị danh mục. Quay lại trở về trang trước. Kiểm tra cả khi thanh trên thu gọn ở màn hình nhỏ.

## FR-02 và FR-03 · Mô phỏng thí nghiệm — Bình luận 2–3

**Hiện trạng.** `lab-ui.js` có hai nút `lab-mode-3d` và `lab-mode-2d`, cùng trạng thái ưu tiên hiển thị.

**Cách sửa.**

1. Dùng luồng Sơ đồ hiện tại làm cảnh mặc định của mọi thí nghiệm trong `#lab`. Đổi nhãn vùng cảnh thành **Mô phỏng thí nghiệm**.
2. Bỏ bộ chuyển 3D/Sơ đồ và chỉ dẫn xoay, zoom dành cho 3D. Dọn khởi tạo, sự kiện và hủy trình dựng 3D ở trang này để tránh gọi tới nút đã xóa.
3. Nối lại chọn thí nghiệm, Cho phản ứng, Tạm dừng, Làm lại, tốc độ và tiến trình với cảnh mặc định. Các công cụ phân tử và tinh thể nằm ngoài phạm vi bỏ 3D.

**UAT-02/03.** Mở Góc thử nghiệm, thấy ngay cảnh với nhãn mới. Thử một phản ứng kết tủa và một mục có cảnh dụng cụ. Bắt đầu, tạm dừng, tiếp tục, làm lại và đổi thí nghiệm. Kết quả, tiến trình và hiện tượng theo đúng mục đang chọn. Rời trang rồi quay lại để phát hiện bộ hẹn giờ cũ còn chạy.

## FR-04 · Đặt hiện tượng đổi màu đúng bài — Bình luận 4

**Hiện trạng.** Khối Nhận biết qua màu sắc ở `#lab` có bộ chọn và thao tác riêng, nằm sau tra cặp chất.

**Cách sửa đề xuất.** Chuyển iodine–hồ tinh bột vào Thư viện minh họa, mục tinh bột, và liên kết từ Sổ tay. Chuyển chlorine làm mất màu vào mục Halogen, dưới dạng quan sát hiện tượng và nhận diện nguy cơ. Dùng lại phần minh họa phù hợp, chuyển sự kiện theo vị trí mới và dọn bộ chọn cũ trong `lab-ui.js`. Giáo viên duyệt cách diễn giải màu và phạm vi trình chiếu.

**UAT-04.** Mở hai chủ đề, tìm và đọc được ví dụ đúng bài. Mở Góc thử nghiệm, khối riêng đã được dời và các chức năng tra cặp, nhật ký vẫn chạy.

## FR-05 · Tra cặp chất theo dữ liệu thư viện — Bình luận 5

**Hiện trạng.** Hai hộp chọn cho phép ghép độc lập. `matchReaction` trong `lab-data.js` tìm mục tương ứng. Cặp ethanol và ion phức bạc trong ảnh trả thông báo thiếu dữ liệu thư viện. Phản hồi này chưa đủ để kết luận về phản ứng thực tế.

**Cách sửa.** Tạo danh sách đối tác từ các bản ghi có thể tra bằng cơ chế hiện có. Lọc hộp thứ hai theo chất thứ nhất. Dùng cùng quy tắc chuẩn hóa với hàm tra và hỗ trợ đảo thứ tự. Khi đổi chất đầu, giữ chất thứ hai nếu vẫn hợp lệ, nếu không thì đặt về ô chọn. Xóa kết quả trước và khóa nút mở thí nghiệm cho đến khi có mục tương ứng. Nếu một cặp có nhiều điều kiện hoặc mục minh họa, hiển thị các mục có tên và điều kiện để người dùng chọn. Nếu cặp cũ hoặc không hợp lệ được đưa vào, báo **Thư viện chưa có mục mô phỏng cho cặp này**.

**UAT-05.** AgNO₃ và KI có thể tra ở cả hai thứ tự. Đổi chất đầu sang chất có đối tác khác, kết quả cũ biến mất và hộp chọn chỉ còn các đối tác có mục. Mỗi lựa chọn hiển thị phải dẫn tới bản ghi tra được. Không suy diễn cho cặp thiếu dữ liệu.

## FR-06 · Mẫu cú pháp ngay dưới ô cân bằng — Bình luận 6

**Cách sửa.** Trong `reactions-ui.js`, đặt nhóm **Dùng ví dụ** dưới `equation-input`. Khi chọn, điền chuỗi và đưa con trỏ về ô nhập để sửa hoặc bấm Cân bằng. Khi nội dung thay đổi, bỏ trạng thái kết quả cũ theo luồng hiện hành. Nêu cách viết `->`, dùng khoảng trắng quanh dấu cộng ngăn chất, và phân biệt dấu cộng trong điện tích.

| Loại | Chuỗi mẫu |
| --- | --- |
| Phân tử | `Fe + O2 -> Fe2O3` |
| Có nhóm trong ngoặc | `Ca(OH)2 + HCl -> CaCl2 + H2O` |
| Muối ngậm nước | `CuSO4·5H2O -> CuSO4 + H2O` |
| Phương trình ion | `Ag^+ + Cl^- -> AgCl` |
| Bán phản ứng | `Fe^3+ + e^- -> Fe^2+` |

**UAT-06.** Bấm và cân bằng từng mẫu với bộ phân tích thật. Đối chiếu bảo toàn nguyên tử và, nếu có, điện tích. Nhập sai mũi tên hoặc điện tích để kiểm thông báo hướng dẫn. Cú pháp trong bảng là mẫu bàn giao cần chạy kiểm trước phát hành.

## FR-07 · Giải thích và mở rộng mẫu tinh thể — Bình luận 7

**Hiện trạng.** `reference-ui.js` có ba mẫu là NaCl, kim cương và graphite. Ba mẫu minh họa mạng ion, mạng cộng hóa trị không gian và mạng lớp.

**Cách sửa đề xuất.** Đặt tên **Mẫu mạng tinh thể minh họa**. Với từng mẫu, ghi loại mạng, đặc điểm quan sát và giới hạn về tỉ lệ. Đề xuất thêm **đồng với mạng lập phương tâm mặt** sau khi giáo viên duyệt. Chuẩn bị dữ liệu có tám vị trí đỉnh và sáu tâm mặt của một ô quy ước. Giải thích đóng góp của các vị trí dùng chung nếu bài cần đếm số nguyên tử trong ô. Nếu có đường nối, chú thích đó là hướng quan sát hình học.

**UAT-07.** Chọn từng mẫu, tên, loại mạng và mô hình thay đổi đồng bộ. Xoay, thu phóng và đặt lại góc nhìn được. Đối chiếu số vị trí và chú thích của mẫu đồng trước khi đưa vào dạy.

## FR-08 · Thu phóng và mở rộng bảng viết — Bình luận 8

**Cách sửa đề xuất.** Tách tọa độ nét vẽ khỏi tọa độ màn hình trong `drawing-ui.js`. Dùng chung phép đổi từ con trỏ sang tọa độ bảng cho bút, tẩy, hình và chữ. Khi cuộn, giữ điểm dưới con trỏ cố định. Dùng Space+kéo, nút giữa hoặc nút **Bàn tay** để di chuyển vùng nhìn. Khi đang vẽ gần lề, dịch vùng nhìn theo hướng vẽ để tạo thêm không gian và tiếp tục ghi nét ngoài khung ban đầu. Giới hạn mức zoom để vẫn tìm lại được nội dung. Nút **Đặt lại góc nhìn** đưa về vùng ban đầu. Khi xuất ảnh hoặc SVG, tính khung từ toàn bộ nội dung. Bản lưu cũ đọc theo tọa độ gốc, dữ liệu vùng nhìn nếu có được lưu riêng.

**Phím tắt.** Ctrl/Cmd+Z hoàn tác, Ctrl/Cmd+Shift+Z làm lại, +/− thu phóng, 0 đặt lại góc nhìn, Esc hủy thao tác đang thực hiện. Chỉ xử lý khi bảng đang được dùng và con trỏ nhập liệu không ở ô chữ, hộp chọn hoặc vùng soạn thảo.

**UAT-08.** Vẽ một nét, zoom tại con trỏ, kéo sang vùng khác rồi vẽ thêm. Nét bám đúng vị trí, việc kéo không tạo nét. Vẽ vượt lề, lưu, tải lại và xuất PNG/SVG. Ảnh xuất có cả nét ngoài khung cũ. Mở bản lưu cũ và thử phím tắt trong ô chữ. Kiểm tra thêm nút Bàn tay trên thiết bị cảm ứng.

## FR-09 · Bỏ tính điểm trên toàn web — Yêu cầu trực tiếp

| Vị trí | Cách sửa |
| --- | --- |
| Bài học có hướng dẫn | Bỏ nút tính điểm, ô nhập dành cho bộ chấm, checkbox cộng điểm và tổng điểm trong `teaching-ui.js`. Giữ đề bài và phần **Đáp án và lời giải**. Khi lời giải chứa ký hiệu điểm viết sẵn, biên tập bỏ các ký hiệu đó theo từng bài để giữ nguyên dữ kiện, công thức, số thứ tự và đơn vị. |
| Luyện tập và Kiểm tra kiến thức | Giữ câu hỏi, lựa chọn, phản hồi và giải thích. Bỏ số câu đúng dưới dạng tổng kết điểm, điểm cao nhất và lưu điểm trong `learning-ui.js` và `teaching-ui.js`. Đổi tiêu đề thành **Tự kiểm tra kiến thức**, giữ hash `#quiz` để liên kết cũ mở được. |
| Phiếu in | Tùy chọn **In kèm đáp án và lời giải** mặc định tắt. Bản giáo viên có lời giải, không có điểm hoặc thang điểm. Bản học sinh có đề và chỗ viết. |
| Dữ liệu trên máy | Dừng đọc và ghi các khóa tính điểm. Dữ liệu điểm cũ không còn xuất hiện trong web. Tiến độ đánh dấu đã học, bản vẽ và dữ liệu học khác tiếp tục dùng luồng lưu hiện có. |

**UAT-09.** Hoàn thành một bài pilot, một lượt luyện tập và một lượt tự kiểm tra. Thử lựa chọn đúng và sai, xác nhận có phản hồi và lời giải, không hiện hoặc lưu điểm mới. In thử hai chế độ. Kiểm lại phép tính pH, lượng chất và hiệu suất hóa học. Cập nhật kiểm thử cũ vốn đòi kết quả 10/10 để kiểm lời giải, phản hồi và hành vi in theo yêu cầu mới.

## Bàn giao và câu hỏi mở

- **Phạm vi triển khai:** ưu tiên các thay đổi phục vụ trực tiếp việc dạy và trình chiếu trong các góp ý trên. Bảng theo dõi nghiệm thu dùng mã FR và UAT tương ứng. Khi triển khai, ghi bản build, thao tác, kết quả và bằng chứng cho từng mã.
- **FR-01:** Đích Tổng hợp là đề xuất theo vị trí được đánh dấu. Nếu người góp ý muốn nói bộ tính pin, cần ghi riêng thao tác, dữ kiện và kết quả mong đợi.
- **FR-05:** Phạm vi là cặp có trong thư viện. Danh sách phản ứng cần thêm được lập từ các nhu cầu dạy cụ thể và có đối chiếu chuyên môn.
- **FR-07/08:** Xác nhận mẫu mạng kim loại và kiểm quy mô xuất ảnh với bảng dài. Bản xuất cần giữ đủ nội dung hoặc báo rõ giới hạn trước khi tạo tệp.
