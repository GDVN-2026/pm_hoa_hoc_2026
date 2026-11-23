# Thiết kế lại phòng thí nghiệm — 3D tương tác
Ngày 06/11/2026. Bản chuẩn: files/gdvn.html; nguồn: files/GDVN-source-build/GDVN-hoa-hoc.

## Thiết kế đã thực hiện
- Tăng không gian quan sát; bảng lượng chất chuyển xuống dưới tại chiều rộng ≤1100px.
- Nền phòng thí nghiệm sáng, thanh chọn 3D/Sơ đồ, tiêu đề cảnh, chú thích giới hạn tỉ lệ, điều khiển xoay/phóng to và bàn phím.
- Renderer Canvas từ mesh tọa độ XYZ với chiếu phối cảnh, sắp xếp chiều sâu, mặt có độ sáng và độ trong. Đây là renderer phần mềm; không dùng WebGL hoặc tài nguyên mạng.
- Hỗ trợ lò CaCO3, nhỏ giọt, mẫu rắn, ống nghiệm nung, thu oxygen qua nước và ammonia. Các cảnh chưa dựng 3D giữ sơ đồ chuyên biệt, không thay bằng mô hình sai dụng cụ.
- CaCO3: buồng lò cắt mở, thành lò có chiều sâu, mẫu rắn, nguồn cấp nhiệt, ống thoát CO2; đổi nhãn sang CaO khi hoàn tất. Dấu chuyển động khí chỉ minh họa; CO2 được ghi rõ không màu.
- Mẫu rắn ở cảnh tongs thay chiều cao theo phần chất đầu còn lại khi kết thúc. Không coi kích thước mô hình là số đo dụng cụ thật.
- Tạm dừng giữ trạng thái dựng hình; reset/đổi cảnh đặt lại góc nhìn; chuyển trang hủy RAF và ResizeObserver.
- Chế độ giảm chuyển động không tự chạy hoạt ảnh 3D; bàn phím vẫn thay đổi góc/thu phóng.
- Build nhúng cả JS/CSS vào HTML; SW v43 bổ sung module và stylesheet.

## Nghiên cứu và giới hạn
Tham khảo nguyên tắc tương tác/khám phá của PhET: https://phet.colorado.edu/en/research
Tham khảo cách gắn tính lượng chất với phòng thí nghiệm của ChemCollective: https://chemcollective.org/vlabs
Tra nguồn RSC về phân hủy carbonate: https://edu.rsc.org/experiments/thermal-decomposition-of-calcium-carbonate/704.article (kết quả tìm kiếm truy cập được; mở toàn trang bị 405, không tuyên bố đã đọc đầy đủ quy trình).
Không sao chép tài sản hình ảnh hoặc mã của các nguồn này. Không kết luận mô phỏng thay thế được kỹ năng thực hành.

## Kiểm tra và bằng chứng
- lab-3d-tests.mjs: 120 tổ hợp mesh/trạng thái, nhãn chất và pha; hình học hữu hạn, biên camera, phối cảnh gần/xa và mẫu rắn hết.
- Lượt hồi quy sau bổ sung điều khiển 3D: 466/466 PASS, round4-regression/deep-results.json.
- Kiểm tra studio-lab, 33 assertion chuyên môn và 97 đối chứng hóa lý đạt lại.
- Bản dựng hình học nguồn: round4-design/lime.png, precipitate.png, oxygen.png. Đây là ảnh render offline từ dữ liệu mesh, KHÔNG phải screenshot ứng dụng. Đã dùng để sửa hướng camera/che khuất và khung hình.
- Canvas/ResizeObserver được giả lập trong JSDOM, worker dùng Node. Chưa xác minh trực quan trong trình duyệt thật vì quyền công cụ vẫn bị chặn; không dùng đường vòng.
- Bản cuối: 4.469.153 byte; standalone và dist trùng SHA256 5F45B1A6B9A6B44D384F63860F8532B6B1443E5B56CB08110DC1ABEE731EA774.
- Kiểm lại bản cuối: 466/466 PASS tại round4-final/deep-results.json; ui-tests.cjs trên HTML cuối đạt, exit 0.
- Bản trước giữ tại round4-before/. Không tuyên bố đã dựng 3D cho mọi thí nghiệm hay kiểm FPS thực tế.

