# Kiểm thử thí nghiệm mô phỏng và 3D GDVN

Ngày: 06/11/2026 (Asia/Saigon). Source đúng: `files/GDVN-source-build/GDVN-hoa-hoc`, package 1.4.0. Áp dụng ba-vn, qa-vn, tester-vn. Không sửa mã sản phẩm hoặc chạy build cập nhật bản phát hành.

## Kết quả chính

**439 ca đạt, 6 ca thất bại trong bộ kiểm thử mở rộng**, quy về **3 nhóm lỗi**. Cả 6 ca lỗi được chạy xác nhận lại với thời gian mô phỏng nguyên bản, không tăng tốc, và vẫn thất bại. Không có lỗi JSDOM chưa xử lý trong lần chạy đầy đủ.

Ngoài bộ mở rộng, **5 bộ test lõi hiện có và 1 bộ UI hiện có đều đạt**, exit code 0: `tests.mjs`, `studio-lab-tests.mjs`, `structure-tests.mjs`, `advanced-tests.mjs`, `atomic-tests.mjs`, `ui-tests.cjs`. Không cộng số assertion của các suite này vào con số 439.

**Bị chặn:** kiểm tra bằng trình duyệt thật, hình ảnh và hiệu năng. Sau khi người dùng cho phép mở lại localhost:8771, công cụ vẫn trả về từ chối tại cổng cấp quyền origin. Không dùng trình duyệt hoặc đường điều khiển khác để vượt quyết định đó. Vì vậy chưa kết luận về vẻ đúng của cảnh, tốc độ khung hình, thao tác chuột/cảm ứng thật hoặc chất lượng PNG tải xuống.

## Phạm vi và cách kiểm thử

| Phạm vi | Thực chạy | Kết quả / giới hạn |
|---|---|---|
| Dữ liệu thí nghiệm | 140 phương trình duy nhất: cân bằng và dữ liệu mô tả | Suite lab đạt; cân bằng không chứng minh phản ứng thực sự diễn ra trong mọi điều kiện |
| Luồng mô phỏng | Lần lượt 140 phản ứng: chọn → sẵn sàng → chạy → hiện sản phẩm/hiện tượng → làm lại | 140/140 ca mở rộng đạt; kiểm tra trạng thái DOM và sự có mặt của nội dung, không thẩm định chuyên môn từng cảnh |
| Lượng bằng 0 | Quét 140 phản ứng, đặt chất đầu bằng 0 | Một ca tổng hợp bao phủ 140 trường hợp đạt, không sinh sản phẩm khi bắt đầu như vậy |
| Định lượng | 140 phản ứng × mol/g | 140 ca, mỗi ca kiểm tra cả hai đơn vị: đạt hiển thị chất giới hạn và không có NaN/Infinity/undefined; chưa phải đối chứng độc lập mọi con số |
| Dữ liệu sai/hủy | Âm, rỗng, làm lại, lọc không có kết quả, đổi cặp chất, đổi màu | Các ca tương ứng đạt; có lỗi riêng khi sửa lượng trong/sau phản ứng |
| Điện phân | 22 hệ × 6 lựa chọn anot = 132 tổ hợp | 30 tổ hợp cho chạy/reset; 102 tổ hợp chặn chạy và nêu chưa có mô hình. Cả 132 đạt hợp đồng UI này; không gọi 102 tổ hợp là đã mô phỏng thành công |
| Phân tử mẫu | 12 mẫu và đo hình học mặc định | 9 ca đạt, 3 ca đo H₂/O₂/N₂ thất bại |
| SMILES và worker | Ethanol, benzene, acetic acid, alanine; dữ liệu sai và phục hồi | Dựng/formula đạt; phát hiện kết quả cũ khi sửa SMILES đang chờ |
| Điều khiển 3D | Đổi kiểu, ẩn H/nhãn, màu, pointer xoay, wheel zoom, tự xoay, đặt lại | Handler chạy không lỗi và có lời gọi vẽ; canvas giả lập, chưa xác nhận góc/hình nhìn thấy |
| VSEPR / phức chất | Toàn bộ 12 lựa chọn VSEPR, 5 phức | Nội dung và lựa chọn đạt; chưa thẩm định hình học trực quan |
| Orbital | 14 orbital, chuẩn hóa/nút/đổi Z; worker UI 2pz/3dxy | Suite atomic và UI đạt; chưa xem ảnh đám mây trong phiên này |
| Cấu tạo → 3D | Mẫu cấu tạo, hóa trị sai, xuất SMILES/formula, thao tác vẽ trong UI | Suite structure và UI đạt; chưa thử pointer vật lý |

Mã nguồn được bundle **vào bộ nhớ và tệp thử riêng**, không gọi build.mjs vì script đó sửa worker và hai HTML phát hành. UI suite sẵn có chạy trên `dist/gdvn.html`; bộ mở rộng chạy bundle mới từ app.js, dùng engine-worker-code.js hiện có. Worker được thực thi bằng node:worker_threads với lớp chuyển tiếp message; canvas, ResizeObserver, kích thước khung và tải tệp được giả lập. Timer cảnh 3.000/2.400/4.200/4.500 ms được tăng tốc trong lượt quét; 6 ca lỗi xác nhận lại dùng thời gian gốc.

## Lỗi tái hiện

Các kỳ vọng về vô hiệu hóa dữ liệu cũ dưới đây là tiêu chí QA đề xuất nhằm tránh nhầm đầu vào/kết quả, chưa phải đặc tả nghiệp vụ đã ký duyệt. Bằng chứng hành vi hiện tại đã được thực thi bằng JSDOM.

### BUG-SIM-001 — Cảnh và hiện tượng không được vô hiệu khi sửa lượng chất

- Tác động: có thể khiến người học đối chiếu hiện tượng với lượng chất hiện tại sai. Severity: Major; priority đề xuất P1.
- Liên quan: LAB-AMOUNT-CHANGE-INVALIDATES-SIMULATION, LAB-EDIT-DURING-REACTION.
- Điều kiện: trang `#lab`, thí nghiệm CuSO4 + NaOH, lượng mặc định dương.
- Cách 1: bấm Cho phản ứng, đợi xong, đổi lượng CuSO4 về 0.
- Cách 2: bấm Cho phản ứng rồi đổi ngay lượng CuSO4 về 0, chờ hết thời gian cảnh.
- Actual cả hai: lượng đầu vào là `0` nhưng stage vẫn `reacting`, kết quả ghi “Kết tủa xanh lam xuất hiện”, sản phẩm Cu(OH)2 và Na2SO4.
- Expected đề xuất: hủy/vô hiệu kết quả khi sửa, yêu cầu chạy lại; hoặc khóa đầu vào và ghi rõ đây là ảnh chụp bộ dữ kiện đã chạy.
- Tần suất: mỗi biến thể tái hiện ở lần quét và lần xác nhận thời gian gốc (2/2).
- Nguyên nhân từ mã: `lab-amounts.oninput` chỉ xóa lastQuantity và bảng định lượng; không hủy timer/cảnh hay kết quả định tính. showReaction dùng phần lớn mô tả cố định; riêng đá vôi có xử lý bổ sung lượng nhập.

### BUG-3D-002 — Không đo được khoảng cách H₂/O₂/N₂ ở lựa chọn mặc định

- Tác động: mất chức năng đo khoảng cách cho phân tử hai nguyên tử. Severity: Moderate; priority đề xuất P2.
- Liên quan: MODEL-LIBRARY-4, MODEL-LIBRARY-5, MODEL-LIBRARY-6.
- Bước: mở `#molecule`, chọn Hydrogen/Oxygen/Nitrogen, giữ A/B/C mặc định và bấm Đo khoảng cách & góc ABC.
- Actual: “Không đo được góc với các điểm trùng nhau.” Không trả khoảng cách AB dù A và B khác nhau.
- Expected: trả khoảng cách AB; giải thích không có góc ba nguyên tử. Theo tọa độ mẫu hiện có: H₂ 1 Å; O₂/N₂ 1,2 Å. Đây là giá trị từ tọa độ minh họa của ứng dụng, không phải xác nhận độ dài liên kết thực nghiệm.
- Tần suất: 3/3 mẫu; mỗi mẫu tái hiện ở quét và xác nhận (2/2).
- Nguyên nhân từ mã: C mặc định trùng B khi chỉ có hai nguyên tử; xử lý kiểm tra bc≈0 ném lỗi trước nhánh cho phép chỉ đo AB khi không đủ ba nguyên tử khác nhau.

### BUG-3D-003 — Kết quả worker không khớp ô SMILES đã sửa

- Tác động: gây nhầm chất đang được dựng/hiển thị. Severity: Moderate; priority đề xuất P2.
- Liên quan: MODEL-INPUT-CHANGE-IN-FLIGHT.
- Bước: nhập CCO → bấm Dựng mô hình 3D → ngay khi đang chờ đổi ô nhập thành c1ccccc1 → chờ kết quả.
- Actual: ô nhập là `c1ccccc1`, kết quả là `C2H6O`, nhãn `CCO`, 9 nguyên tử. Không có cảnh báo dữ kiện đã đổi.
- Expected đề xuất: hủy/vô hiệu tác vụ khi sửa đầu vào; hoặc giữ rõ SMILES đã gửi gắn với kết quả và chỉ báo cần dựng lại.
- Tần suất: lần quét và lần xác nhận (2/2).
- Nguyên nhân từ mã: bộ đếm request chỉ thay khi generate/chọn mẫu/rời trang; ô smiles-input không có oninput để vô hiệu dữ kiện hay kiểm tra fingerprint trước display.

## Những kết quả thất bại đã loại khỏi lỗi sản phẩm

- Lượt đầu ca đổi đơn vị chỉ phát change, thiếu input mà thao tác select thật phát ra. Sửa test để phát cả input/change: ca này đạt; không báo là lỗi sản phẩm.
- Lượt thứ hai regex tìm NaN khớp nhầm tên muối NaNO3. Sửa ranh giới từ: tất cả 140 ca định lượng đạt. Giữ JSON của các lượt đầu để truy vết.
- `ui-tests.cjs` ban đầu dừng vì thiếu jsdom: lỗi môi trường, không phải sản phẩm. Cài dependency ở Drive gặp lỗi ghi UNKNOWN/EBADF/EPERM; đã dừng tiến trình đó. Runtime test riêng trên ổ C cài thành công jsdom 26.1.0 và esbuild 0.25.12, sau đó UI suite đạt. node_modules trong source có thể đang ở trạng thái cài dở; chưa xóa hoặc cài lại tiếp trên Drive. Mã sản phẩm, package.json và lockfile không được chỉnh sửa chủ động.

## Bằng chứng và tái chạy

- `evidence/core-suite-results.json`: lệnh/exit code/output của 5 suite lõi.
- `evidence/deep-results.json`: kết quả đầy đủ 439 PASS/6 FAIL và snapshot DOM của lỗi.
- `evidence/focused-results.json`: xác nhận lại 6 ca lỗi, không tăng tốc timer.
- `evidence/deep-results-initial.json`, `deep-results-run2.json`: lịch sử trước chỉnh test harness.
- `evidence/source-test.html`: bundle thử của mã nguồn; không phải bản phát hành và không nhúng CSS.
- `test-runtime/deep-test.cjs`: bộ test mở rộng. Chạy `node` với đường dẫn tuyệt đối tới tệp này; thư viện thử đã được cài trong test-runtime/node_modules. Khi có FAIL, hãy xem JSON: runner thu thập lỗi để tiếp tục hết bộ nên exit code 0 không có nghĩa tất cả PASS.
- UI hiện có: vào source và đặt `GDVN_JSDOM` tới `test-runtime/node_modules/jsdom` trên ổ C, chạy `node ui-tests.cjs`.
- Xác nhận lỗi thời gian gốc: đặt `GDVN_FOCUS=LAB-AMOUNT-CHANGE|LAB-EDIT-DURING|MODEL-LIBRARY-[456]$|MODEL-INPUT-CHANGE` rồi chạy deep-test.cjs.

Môi trường Node.js v20.17.0 / Windows. Hash SHA256: lab-ui.js `F63ABD33B47C38C58B184A44A3A628297A927FACE6E9A5618EA8DDA56BB6ED59`; advanced-ui.js `B0742DF94F9053EE97287E85B9FD4CCBDF478B980F9E04D1D542EFBD360D92C4`; dist/gdvn.html `599E778578A190277D00E0E629B93680E00716637FDD3277E48F4CB4C1EFE52A`.

## Phần còn cần kiểm chứng

Blocked: hình ảnh cảnh 140 thí nghiệm, sự khớp vị trí nhãn/ống dẫn/điện cực, chiều hoạt ảnh nhìn thấy, lớp che khuất 3D, kích thước màn hình nhỏ, bàn phím/cảm ứng thật, FPS, PNG/SVG tải ra và Web Worker thật trong trình duyệt. Not run: đối chứng chuyên môn độc lập toàn bộ mô tả hóa học và mọi số liệu định lượng; xuất XYZ/MOL không có nút trong molecule UI đã đọc (hàm modelXYZ có được suite advanced kiểm tra). Chưa đo hoặc khẳng định tỷ lệ bao phủ toàn sản phẩm.

Ưu tiên tiếp theo: xử lý ba nhóm lỗi trên, chạy lại các ca lỗi và smoke liên quan; sau đó thực hiện kiểm tra trực quan khi công cụ trình duyệt có quyền truy cập. Các tổ hợp điện phân chưa hỗ trợ cần đặc tả điều kiện khoa học trước khi mở rộng mô hình.
