/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
// Chỉ lùi trong lịch sử các màn hình của GDVN; mở trực tiếp thì về Tổng quan.
export function setupBackNavigation(button){
 const key='gdvnRoute',base=location.pathname+location.search;
 let marker=history.state?.[key],cursor=marker?.base===base?marker.step:0,session=marker?.base===base?marker.session:Date.now().toString(36)+Math.random().toString(36).slice(2),last=location.hash||'#home';
 function write(){try{history.replaceState({...history.state,[key]:{base,session,step:cursor,hash:location.hash||'#home'}},'');}catch{}}
 function update(){button.disabled=cursor===0&&(!location.hash||location.hash==='#home');button.title=cursor>0?'Quay lại màn hình vừa xem':'Về trang tổng quan';}
 if(marker?.base!==base)write();update();
 window.addEventListener('hashchange',()=>{if(location.hash==='#content')return;const next=location.hash||'#home',state=history.state?.[key];if(next===last){update();return;}if(state?.session===session&&state.base===base&&state.hash===next)cursor=state.step;else{cursor++;write();}last=next;update();});
 button.onclick=()=>{if(cursor>0)history.back();else if(location.hash!=='#home')location.hash='home';};
}
