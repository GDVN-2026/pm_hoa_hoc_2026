/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {escapeHTML as esc} from './chemistry.js';
export const $=id=>document.getElementById(id);
export const opt=items=>items.map((x,i)=>'<option value="'+i+'">'+esc(x)+'</option>').join('');
export const panel=(title,body)=>'<section class="panel"><h2>'+title+'</h2>'+body+'</section>';
export const result=(id='result')=>'<div class="result" id="'+id+'" role="status" aria-live="polite"></div>';
export const number=(id,label,value,step='any')=>'<label>'+label+'<input id="'+id+'" type="number" value="'+value+'" step="'+step+'"></label>';
export function safe(fn,id='result'){try{fn();$(id)?.classList.remove('error');}catch(e){if($(id)){$(id).classList.add('error');$(id).textContent=e.message;}}}
export function positive(id,allowZero=false){const n=Number($(id).value);if(!$(id).value.trim()||!Number.isFinite(n)||(allowZero?n<0:n<=0))throw Error('Hãy nhập giá trị '+(allowZero?'không âm.':'dương.'));return n;}
export const set=html=>$('content').insertAdjacentHTML('beforeend',html);
export function table(headers,rows){return '<div class="table-wrap"><table><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';}
export function textSVG(text){return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="160"><rect width="1200" height="160" fill="white"/><rect width="8" height="160" fill="#145bc8"/><text x="35" y="38" fill="#da3547" font-family="sans-serif" font-size="18">GDVN · HÓA HỌC</text><text x="35" y="100" fill="#162a48" font-family="sans-serif" font-size="'+Math.min(32,1080/(text.length*.62))+'">'+esc(text)+'</text></svg>';}
export function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('show'),3000);}
