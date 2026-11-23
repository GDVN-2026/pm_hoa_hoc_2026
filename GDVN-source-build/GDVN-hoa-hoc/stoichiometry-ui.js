/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {limitingReagent} from './stoichiometry.js';
import {escapeHTML as esc,pretty} from './chemistry.js';
import {$,panel,result,table,safe} from './modules.js';
export function setupLimitingReagent() {
  $('content').insertAdjacentHTML('beforeend',panel('Chất giới hạn & chất dư','<p>Nhập lượng ban đầu của từng chất ở vế trái của phương trình đã cân bằng. Dùng cho phản ứng theo tỉ lượng, giả định phản ứng hoàn toàn.</p><div id="limiting-inputs"></div><div class="row"><label>Hiệu suất thu sản phẩm (%)<input id="limiting-yield" type="number" min="0" max="100" value="100"></label><button id="limiting-calculate" class="primary">Tính chất giới hạn</button></div>'+result('limiting-result')));
  let current;
  const update = balanced => {
    current=balanced;
    $('limiting-inputs').innerHTML=balanced ? balanced.all.slice(0,balanced.split).map((f,i)=>'<div class="row"><label>'+esc(f)+' — lượng ban đầu<input type="number" min="0" step="any" value="1" data-reactant="'+i+'"></label><label>Đơn vị<select data-reactant-unit="'+i+'"><option value="mol">mol</option><option value="g">g</option></select></label></div>').join('') : '';
    $('limiting-result').textContent=balanced?'Nhập lượng chất rồi bấm Tính chất giới hạn.':'Hãy cân bằng lại phương trình hiện tại.';
  };

  $('equation-input').addEventListener('input',()=>update(null));
  $('limiting-inputs').addEventListener('input',()=>{$('limiting-result').textContent='Dữ liệu đã đổi. Hãy tính lại.';});
  $('limiting-yield').addEventListener('input',()=>{$('limiting-result').textContent='Hiệu suất đã đổi. Hãy tính lại.';});
  $('limiting-calculate').onclick=()=>safe(()=>{
    if(!current)throw Error('Hãy cân bằng phương trình trước.');
    const inputs=current.all.slice(0,current.split).map((_,i)=>{const input=document.querySelector('[data-reactant="'+i+'"]');if(input.value.trim()==='')throw Error('Điền lượng cho tất cả chất phản ứng.');return {amount:Number(input.value),unit:document.querySelector('[data-reactant-unit="'+i+'"]').value};});
    if(!$('limiting-yield').value.trim())throw Error('Nhập hiệu suất thu sản phẩm.');
    const calculated=limitingReagent(current,inputs,Number($('limiting-yield').value));
    const val=n=>n===null?'—':pretty(n);
    $('limiting-result').innerHTML='<p><b>Chất giới hạn: '+calculated.limiting.map(i=>esc(current.all[i])).join(', ')+'</b></p>'+table(['Chất','Ban đầu (mol)','Phản ứng (mol)','Dư lý thuyết (mol)','Sản phẩm thu (mol)','Khối lượng thu (g)'],calculated.rows.map(r=>[esc(r.formula),val(r.initial),val(r.consumed),val(r.remaining),val(r.product),val(r.mass)]))+'<p class="muted">Lượng dư tính theo phản ứng hoàn toàn. Hiệu suất chỉ điều chỉnh lượng sản phẩm thu được; không dùng để suy ra lượng chất phản ứng còn lại.</p>';
  },'limiting-result');
  return update;
}

