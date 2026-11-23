/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import nerdamer from './vendor/nerdamer.js';
export function symbolic({operation,expression,variable='x',point='0'}){
  const value=String(expression).trim(),v=String(variable).trim();
  if(!value||value.length>400)throw Error('Biểu thức cần từ 1 đến 400 ký tự.');
  if(!/^[a-zA-Z]$/.test(v))throw Error('Biến phải là một chữ cái, ví dụ x.');
  if(!/^[\w\s+\-*/^().,=\[\]!]+$/.test(value))throw Error('Biểu thức chứa ký tự không hỗ trợ.');
  const permitted={simplify:'simplify',expand:'expand',factor:'factor',diff:'diff',integrate:'integrate',solve:'solve',limit:'limit'};
  if(!Object.hasOwn(permitted,operation))throw Error('Chọn phép toán hợp lệ.');
  let query;
  if(['simplify','expand','factor'].includes(operation))query=operation+'('+value+')';
  else if(operation==='limit'){
    if(!/^(?:-?\d+(?:\.\d+)?|-?pi|-?Infinity)$/.test(point))throw Error('Điểm giới hạn cần là số, pi hoặc Infinity.');
    query='limit('+value+','+v+','+point+')';
  }else query=operation+'('+value+','+v+')';
  nerdamer.clear();
  let result;
  try{result=nerdamer(query);}catch{throw Error('Không xử lý được biểu thức. Kiểm tra cú pháp hoặc đổi phép toán.');}
  return {text:result.toString(),latex:result.toTeX(),incomplete:operation==='integrate'&&result.hasIntegral?.()||false};
}
