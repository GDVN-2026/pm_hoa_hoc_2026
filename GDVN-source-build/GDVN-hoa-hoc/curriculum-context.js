/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Curriculum guidance, not certification. */
const contexts={
 atom:['Lớp 10 · Cấu tạo nguyên tử','Chương trình mô tả AO s, p và so sánh mô hình Bohr với mô hình hiện đại. Các orbital d và lưới xác suất ở đây là phần mở rộng; đám mây không phải quỹ đạo chuyển động.','11'],
 config:['Lớp 10 · Cấu trúc lớp vỏ electron','Yêu cầu viết cấu hình lớp, phân lớp và ô orbital cho 20 nguyên tố đầu. Tra cứu các nguyên tố tiếp theo là mở rộng, không phải cùng mức yêu cầu.','11–12'],
 bond:['Chuyên đề 10.1 · Cơ sở hóa học','VSEPR và lai hóa sp, sp², sp³ cho một số phân tử đơn giản thuộc chuyên đề. Các hình học mở rộng không tự là nội dung bắt buộc của môn học cốt lõi.','17'],
 solution:['Lớp 11 · Cân bằng trong dung dịch nước','Liên hệ pH, chất chỉ thị và nguyên tắc chuẩn độ. Hoạt ảnh/đồ thị hỗ trợ học; không tự chứng minh học sinh đã thực hiện được thí nghiệm chuẩn độ.','21'],
 electro:['Lớp 12 · Pin điện và điện phân','Đối chiếu cặp oxi hóa–khử, thế điện cực, chiều phản ứng và sức điện động. Phép tính nhiệt động không dự đoán tốc độ phản ứng thực.','38'],
 electrolysis:['Lớp 12 · Pin điện và điện phân','Phân biệt dung dịch và nóng chảy, sản phẩm hai cực, mạ và tinh luyện. Mô phỏng không phải video thực nghiệm hay chứng nhận hoàn thành kỹ năng thực hành.','38']
};
export function curriculumContext(id){
 const context=contexts[id];if(!context)return;
 const box=document.createElement('aside');box.className='curriculum-context';box.setAttribute('aria-label','Liên hệ chương trình');
 const title=document.createElement('strong');title.textContent=context[0];const text=document.createElement('p');text.textContent=context[1];
 const note=document.createElement('small');note.textContent='Đối chiếu phụ lục môn Hóa học ban hành năm 2018, trang '+context[2]+'. Đây là liên hệ nội dung trong phạm vi đã đọc, không phải chứng nhận đáp ứng toàn bộ chương trình hiện hành.';
 const link=document.createElement('a');link.href='https://vbpl.moj.gov.vn/bogiaoducdaotao/Pages/vbpq-toanvan.aspx?ItemID=146721';link.target='_blank';link.rel='noopener noreferrer';link.textContent='Tra cứu văn bản chương trình ↗';
 box.append(title,text,note,link);document.getElementById('content').append(box);
}
