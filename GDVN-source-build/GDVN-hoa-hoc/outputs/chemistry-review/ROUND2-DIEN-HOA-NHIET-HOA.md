# Thẩm định vòng 2: điện hóa, Faraday, nhiệt hóa và cân bằng
Ngày: 06/11/2026. Nguồn sửa: files/GDVN-source-build/GDVN-hoa-hoc. Tệp sử dụng: files/gdvn.html.

## Thay đổi và phạm vi
- Nernst: xác định anode/cathode theo thế khử chuẩn, cân bằng phản ứng để lấy n tối giản; sinh biểu thức Q theo hoạt độ, áp suất tương đối của H2, bỏ chất rắn tinh khiết. Hiển thị chiều thuận/nghịch theo dấu E. Không nhân thế điện cực với hệ số. Chặn hai cặp giống nhau vì chưa xét pin nồng độ. Dùng E° tham chiếu 25 °C ở nhiệt độ khác là xấp xỉ đã ghi trên giao diện.
- Faraday: kiểm tra dữ liệu hữu hạn, z nguyên dương, hiệu suất 0–100%; I hoặc thời gian bằng 0 cho khối lượng 0. Sửa kết quả cũ còn lưu khi thay dữ liệu, kể cả diện tích và khối lượng riêng.
- Nhiệt hóa: không còn hiểu số liệu trống là 0; yêu cầu hệ số dương và enthalpy đầy đủ. Ghi rõ ví dụ CH4(g) + 2O2(g) → CO2(g) + 2H2O(l), khoảng 298 K, ΔrH° xấp xỉ −890,3 kJ cho phương trình như viết. Trạng thái pha ảnh hưởng số liệu. Công cụ nhập danh sách không tự xác nhận bảo toàn nguyên tố.
- Cân bằng A ⇌ B: thay phép trừ dễ mất chữ số bằng công thức ổn định; dùng ký hiệu khoa học cho nồng độ rất nhỏ hoặc lớn. Xóa kết quả cũ khi thay đầu vào.
- Mã tính tách vào physical-chemistry.js; SW v41 đưa module mới vào bộ nhớ đệm.

## Bằng chứng
- 8 suite lõi đạt, chi tiết round2-core-results.json; gồm 33 assertion chuyên môn vòng trước và 97 kiểm tra hóa lý mới.
- ui-tests.cjs trên HTML build cuối đạt (exit 0): giải từng bước, vẽ cấu trúc/3D, studio, phòng thí nghiệm, bảng tuần hoàn, orbital, worker SMILES, đo đạc và dọn dữ liệu cũ khi chuyển trang. Đây là kiểm tra DOM với canvas giả lập.
- 97 kiểm tra mới: các pin Zn/Cu, Al/Cu, Cu/Ag, Al/Ag, Fe/H; n, E°, ΔG, Q; 45 cặp điện cực; Faraday đối chứng một mol Cu, 50%, 0%; thiếu enthalpy; cân bằng cực trị và dữ liệu không hợp lệ.
- Kiểm thử tương tác simulation-tests.cjs: 457 PASS, 0 FAIL, round2-regression/deep-results.json. JSDOM giả lập canvas/ResizeObserver, worker chạy Node, không phải quan sát trình duyệt thật.
- Lượt đầu sau sửa công thức đạt 456/457: UI vẫn làm tròn 1e−308 thành 0. Giữ kết quả tại round2-regression/first-run.json; đã sửa định dạng và chạy lại toàn bộ 457 ca.
- Một giá trị ΔG kỳ vọng gõ sai trong quá trình viết test đã được tính lại bằng −nFE; không ghi nhận đó là lỗi sản phẩm.
- Bản trước lưu round2-before/. Hai HTML cuối cùng khớp SHA256: 26E1C8DC8A32CA2F8987ED3A2931B66B5A9CB87C033362C4ED16A41A64F1212F.

## Cơ sở chuyên môn
- OpenStax Chemistry 2e, mục 17.4: liên hệ E, ΔG, Q, n và phương trình Nernst: https://openstax.org/books/chemistry-2e/pages/17-4-potential-free-energy-and-equilibrium
- NIST Chemistry WebBook, nước: enthalpy tạo thành nước lỏng khác nước hơi; dữ liệu nước lỏng −285,830 kJ/mol: https://webbook.nist.gov/cgi/cbook.cgi?Name=water&cTC=on
- Đối chiếu chương trình, văn bản, trang PDF và những phần chưa xác minh tiếp tục theo THAM-DINH-HOA-HOC-GDPT.md. Không bổ sung tuyên bố đã đáp ứng toàn bộ chương trình hiện hành chỉ từ các kiểm tra này.

## Chưa kết luận
Công cụ quan sát trình duyệt vẫn bị chặn bởi quyền đã lưu hoặc chính sách; không dùng đường vòng để vượt chặn. Chưa xác nhận hình ảnh, chuyển động 3D thực, FPS, cảm ứng và ngoại tuyến trên thiết bị. Các kiểm tra số học và DOM không thay thế phần này. Chưa thẩm định từng hiện tượng trong toàn bộ 140 phản ứng; chưa giải đầy đủ hoạt độ, tạo phức, Ksp và acid nhiều nấc.

