/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {molarMass} from './chemistry.js';
export function limitingReagent(balanced, inputs, yieldPercent=100) {
  if (!balanced || inputs.length !== balanced.split) throw Error('Cần nhập lượng cho tất cả chất phản ứng.');
  if (!Number.isFinite(yieldPercent) || yieldPercent < 0 || yieldPercent > 100) throw Error('Hiệu suất phải từ 0 đến 100%.');
  const initial = inputs.map(({amount,unit},i) => {
    if (!Number.isFinite(amount) || amount < 0) throw Error('Lượng chất phải là số không âm.');
    if (!['mol','g'].includes(unit)) throw Error('Đơn vị phải là mol hoặc g.');
    const mass = molarMass(balanced.all[i]);
    if (unit === 'g' && mass === 0) throw Error('Electron cần nhập theo mol.');
    return unit === 'g' ? amount / mass : amount;
  });
  const ratios = initial.map((n,i) => n / balanced.coefficients[i]);
  const extent = Math.min(...ratios);
  const limiting = ratios.flatMap((r,i) => Math.abs(r-extent) <= 1e-10*Math.max(Math.abs(r),Math.abs(extent),Number.MIN_VALUE) ? [i] : []);
  const rows = balanced.all.map((formula,i) => {
    const theoretical = extent * balanced.coefficients[i];
    if (i < balanced.split) return {formula,initial:initial[i],consumed:theoretical,remaining:Math.max(0,initial[i]-theoretical),product:null,mass:null};
    const product = theoretical * yieldPercent / 100;
    return {formula,initial:null,consumed:null,remaining:null,product,mass:product*molarMass(formula)};
  });
  return {extent,limiting,rows};
}
