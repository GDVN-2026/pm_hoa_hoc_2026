/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {$,set,panel} from './ui-kit.js';
import {escapeHTML as esc} from './chemistry.js';
import {lessons,pilotLessons} from './teaching-core.js';
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const write=(key,data)=>{try{localStorage.setItem(key,JSON.stringify(data));return true;}catch{return false;}};
const allLessons=[...pilotLessons,...lessons];
const options=allLessons.map(l=>'<option value="'+l.id+'">'+(l.grade?'Lớp '+l.grade+' · ':'')+esc(l.title)+'</option>').join('');
const p01Table='<table class="p01-data-table"><caption>Dữ liệu giả định minh họa chuyển thể</caption><tbody>'+
  [['Thời gian (phút)',0,1,2,3,4,5,6,7,8],['Nước đá tinh khiết (°C)',-10,-5,0,0,0,15,35,55,75],['Sáp paraffin thương mại (°C)',25,34,43,49,53,57,61,68,76]].map(([label,...values])=>'<tr><th scope="row">'+label+'</th>'+values.map(value=>'<td>'+value+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
function lessonsPage(){
set(panel('Một tiết học, từng bước rõ ràng','<label>Chủ đề<select id="lesson-select">'+options+'</select></label><div id="lesson-view"></div>'));
let step=0;
function render(){const lesson=allLessons.find(l=>l.id===$('lesson-select').value),raw=read('gdvn-lessons-completed',[]),done=Array.isArray(raw)?raw:[];const stages=[['Mục tiêu',lesson.goal],['Kiến thức',lesson.pilot?lesson.answer:lesson.explain],['Minh họa bằng công cụ',lesson.activity],['Phạm vi',lesson.limit]];
$('lesson-view').innerHTML='<div class="lesson-header"><h3>'+esc(lesson.title)+'</h3><span class="pill">'+(done.includes(lesson.id)?'Đã học ✓':'Chưa đánh dấu')+'</span></div><nav class="lesson-stages" aria-label="Các bước bài học">'+stages.map(([title],i)=>'<button data-lesson-step="'+i+'" aria-pressed="'+(i===step)+'">'+(i+1)+'. '+title+'</button>').join('')+'</nav><article class="lesson-stage"><span class="eyebrow">BƯỚC '+(step+1)+' / '+stages.length+'</span><h2>'+stages[step][0]+'</h2><p>'+esc(stages[step][1])+'</p>'+(step===2?'<a class="all-tools-link" href="#'+lesson.tool+(lesson.grade?'?grade='+lesson.grade:'')+'">Mở công cụ thực hành ↗</a><p class="muted">Dùng nút Quay lại để trở về bài học.</p>':'')+'</article><div class="row"><button id="lesson-prev" '+(!step?'disabled':'')+'>← Bước trước</button><button id="lesson-next" '+(step===3?'disabled':'')+'>Bước tiếp →</button><button id="lesson-done" class="primary">Đánh dấu đã học</button><button id="lesson-print">In tài liệu kiến thức</button></div><p class="muted">Phạm vi mô hình: '+esc(lesson.limit)+'</p><span id="lesson-status" role="status"></span>';
if(lesson.id==='pilot-01'&&(step===1||step===2))$('lesson-view').querySelector('article').insertAdjacentHTML('beforeend','<div class="table-wrap">'+p01Table+'</div>');
$('lesson-prev').onclick=()=>{step--;savePosition();render();};$('lesson-next').onclick=()=>{step++;savePosition();render();};document.querySelectorAll('[data-lesson-step]').forEach(button=>button.onclick=()=>{step=Number(button.dataset.lessonStep);savePosition();render();});$('lesson-done').onclick=()=>{if(write('gdvn-lessons-completed',[...new Set([...done,lesson.id])])){render();$('lesson-status').textContent='Đã lưu tiến độ trên máy.';}else $('lesson-status').textContent='Chưa lưu được. Trình duyệt có thể đã chặn bộ nhớ.';};$('lesson-print').onclick=()=>window.print();
}
function savePosition(){try{sessionStorage.setItem('gdvn-lesson-position',JSON.stringify({id:$('lesson-select').value,step}));}catch{}}
try{const position=JSON.parse(sessionStorage.getItem('gdvn-lesson-position'));if(position&&allLessons.some(l=>l.id===position.id)){$('lesson-select').value=position.id;step=Number.isInteger(position.step)&&position.step>=0&&position.step<4?position.step:0;}}catch{}
$('lesson-select').onchange=()=>{step=0;savePosition();render();};render();
// Print the reference content independently of the current section.
const sheet=document.createElement('section');
sheet.className='lesson-print-sheet';
$('content').append(sheet);
const beforePrint=()=>{
  const lesson=allLessons.find(item=>item.id===$('lesson-select').value);
  sheet.innerHTML='<h1>GDVN · '+esc(lesson.title)+'</h1><h2>Mục tiêu</h2><p>'+esc(lesson.goal)+'</p>'+
    '<h2>Minh họa</h2><p>'+esc(lesson.answer)+'</p>'+(lesson.id==='pilot-01'?p01Table:'')+
    '<h2>Phạm vi</h2><p>'+esc(lesson.limit)+'</p><p>Biên soạn: Nguyễn Thanh Vy · GDVN</p>';
};
window.addEventListener('beforeprint',beforePrint);
beforePrint();
return ()=>window.removeEventListener('beforeprint',beforePrint);
}
export const teachingHandlers={lessons:lessonsPage};
