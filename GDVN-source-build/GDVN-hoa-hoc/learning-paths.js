/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {routes} from './tool-catalog.js';
export const journeys=[
{id:'matter',title:'Vì sao chất có hình dạng?',description:'Từ nguyên tố đến electron, mô hình phân tử và hướng liên kết.',steps:['periodic','config','molecule','bond']},
{id:'evidence',title:'Điều gì xảy ra khi trộn chất?',description:'Dự đoán bằng ion, thử mô phỏng rồi kiểm tra lượng chất.',steps:['ionic','lab','equation','solution']},
{id:'create',title:'Biến ý tưởng thành mô hình',description:'Phác thảo phân tử, xem không gian và trình bày ý tưởng.',steps:['structure','molecule','studio','board']},
{id:'review',title:'Từ khái niệm đến minh họa',description:'Đọc bài học, tra cứu mẫu và xem cách tính.',steps:['knowledge','reference']}
];
const key='gdvn-journey-progress-v1';
export function readProgress(){try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{return {};}}
export function mountJourney(routeID){
const path=new URLSearchParams(location.hash.split('?')[1]||'').get('path');
const journey=journeys.find(item=>item.id===path&&item.steps.includes(routeID));if(!journey)return;
const progress=readProgress(),done=Array.isArray(progress[path])?progress[path]:[],index=journey.steps.indexOf(routeID);
const panel=document.createElement('section');panel.className='journey-guide';panel.setAttribute('aria-label','Các bước của hành trình');
panel.innerHTML='<div><span class="eyebrow">HÀNH TRÌNH · BƯỚC '+(index+1)+' / '+journey.steps.length+'</span><h2>'+journey.title+'</h2><p>Tự đánh dấu khi bạn đã khám phá xong bước này. Tiến độ được lưu trên máy.</p></div><nav aria-label="Chuyển bước">'+journey.steps.map((id,i)=>'<a href="#'+id+'?path='+path+'" '+(id===routeID?'aria-current="step"':'')+'>'+(done.includes(id)?'✓':i+1)+'. '+routes.find(route=>route[0]===id)[2]+'</a>').join('')+'</nav><button id="journey-complete" class="primary">'+(done.includes(routeID)?'Đã khám phá ✓':'Đánh dấu đã khám phá')+'</button><a class="journey-next" href="'+(index+1<journey.steps.length?'#'+journey.steps[index+1]+'?path='+path:'#home')+'">'+(index+1<journey.steps.length?'Bước tiếp theo →':'Về các hành trình →')+'</a><span id="journey-status" role="status"></span>';
document.getElementById('content').prepend(panel);
panel.querySelector('button').onclick=()=>{const state=readProgress();state[path]=[...new Set([...(Array.isArray(state[path])?state[path]:[]),routeID])];try{localStorage.setItem(key,JSON.stringify(state));panel.querySelector('button').textContent='Đã khám phá ✓';panel.querySelector('nav a[aria-current]').textContent='✓. '+routes.find(route=>route[0]===routeID)[2];panel.querySelector('[role="status"]').textContent='Đã lưu tiến độ.';}catch{panel.querySelector('[role="status"]').textContent='Trình duyệt chưa cho phép lưu tiến độ.';}};
}
