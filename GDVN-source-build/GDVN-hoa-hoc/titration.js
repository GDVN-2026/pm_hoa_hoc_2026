/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Ideal strong monoprotic titration at 25 °C. */
import {solutionPH} from './chemistry.js';
export function strongTitration({initialKind='base',c0,v0,cAdded}){
 if(!['acid','base'].includes(initialKind))throw Error('Chọn acid hoặc base ban đầu.');
 if(![c0,v0,cAdded].every(x=>Number.isFinite(x)&&x>0))throw Error('Nồng độ và thể tích phải là số dương hữu hạn.');
 if(c0>10||cAdded>10)throw Error('Ngoài miền nồng độ 0–10 mol/L của mô hình lý tưởng.');
 const equivalence=c0*v0/cAdded;
 if(!Number.isFinite(equivalence)||equivalence<=0)throw Error('Tỉ lệ dữ kiện vượt khả năng tính toán.');
 const pHAt=volume=>{
  const net=(c0*v0-cAdded*volume)/(v0+volume);
  const acidSide=initialKind==='acid'?net>=0:net<0;
  return solutionPH(acidSide?'strong-acid':'strong-base',Math.abs(net));
 };
 const points=Array.from({length:301},(_,i)=>{const volume=equivalence*2*i/300;return [volume,pHAt(volume)];});
 return {equivalence,points,pHAt};
}
