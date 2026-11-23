/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import code from './engine-worker-code.js';
export function engineClient(){
  let worker=null,objectURL=null,pending=null,serial=0;
  function stop(reason='Đã hủy tác vụ.'){
    if(pending){clearTimeout(pending.timer);pending.reject(Error(reason));pending=null;}
    worker?.terminate();worker=null;
    if(objectURL)URL.revokeObjectURL(objectURL);objectURL=null;
  }
  function run(kind,payload){
    stop('Đã thay thế bằng tác vụ mới.');
    return new Promise((resolve,reject)=>{
      try{
        objectURL=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));
        worker=new Worker(objectURL);const id=++serial;
        const timer=setTimeout(()=>stop('Tác vụ vượt quá 15 giây. Hãy thử phân tử hoặc biểu thức đơn giản hơn.'),15000);
        pending={resolve,reject,timer};
        worker.onmessage=event=>{if(event.data.id!==id)return;const p=pending;pending=null;clearTimeout(p.timer);if(event.data.error)p.reject(Error(event.data.error));else p.resolve(event.data.result);stop();};
        worker.onerror=()=>stop('Không khởi tạo được bộ tính. Hãy mở bằng trình duyệt Chrome hoặc Edge.');
        worker.postMessage({id,kind,payload});
      }catch(error){stop(error.message);reject(error);}
    });
  }
  return {run,dispose:stop};
}
