/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Scoped electrochemistry/thermochemistry. */
import {balanceEquation} from './chemistry.js';
const R=8.314462618,F=96485.33212;
const gcd=(a,b)=>b?gcd(b,a%b):a;
const finite=(value,label)=>{if(!Number.isFinite(value))throw Error(label+' phải hữu hạn.');return value;};
function electrode(row){if(!Array.isArray(row)||typeof row[1]!=='string'||!Number.isInteger(row[2])||row[2]<1||!Number.isFinite(row[3]))throw Error('Dữ liệu điện cực không hợp lệ.');return row;}
const ion=row=>row[1]==='H'?'H^+':row[1]+(row[2]===1?'^+':'^'+row[2]+'+');
const reduced=row=>row[1]==='H'?'H2':row[1];
export function standardCell(a,b){
 electrode(a);electrode(b);if(a[1]===b[1])throw Error('Mô hình này cần hai cặp khác nhau; chưa xét pin nồng độ.');
 const [cathode,anode]=a[3]>b[3]?[a,b]:[b,a],n=a[2]*b[2]/gcd(a[2],b[2]);
 const equation=balanceEquation(reduced(anode)+' + '+ion(cathode)+' -> '+ion(anode)+' + '+reduced(cathode));
 const activity=(term,power)=>{const base=term==='H2'?'(p(H2)/p°)':term.includes('^')?'a('+term+')':null;return base?(power===1?base:base+'^'+power):null;};
 const side=(from,to)=>equation.all.slice(from,to).map((term,i)=>activity(term,equation.coefficients[from+i])).filter(Boolean).join(' × ')||'1';
 return {anode,cathode,n,e0:cathode[3]-anode[3],equation:equation.text,qExpression:side(equation.split,equation.all.length)+' / ('+side(0,equation.split)+')'};
}
export function nernstCell(a,b,t,q){
 const cell=standardCell(a,b);if(!Number.isFinite(t)||t<=0||!Number.isFinite(q)||q<=0)throw Error('T và Q phải là số dương hữu hạn.');
 const e=finite(cell.e0-R*t/(cell.n*F)*Math.log(q),'Sức điện động'),dg=finite(-cell.n*F*e/1000,'ΔG');return {...cell,e,dg};
}
export function faradayMass({M,z,current,minutes,efficiency=100}){
 if(![M,z,current,minutes,efficiency].every(Number.isFinite)||M<=0||!Number.isInteger(z)||z<=0||current<0||minutes<0||efficiency<0||efficiency>100)throw Error('M, z phải dương; z nguyên; I, thời gian không âm; hiệu suất 0–100%.');
 const charge=finite(current*minutes*60,'Điện lượng'),electrons=charge/F,mass=finite(M*electrons/z*efficiency/100,'Khối lượng');return {charge,electrons,mass};
}
export function enthalpyDelta(left,right){
 function sum(text){if(typeof text!=='string'||!text.trim())throw Error('Nhập dữ liệu cho cả hai vế.');return text.trim().split(/\r?\n/).reduce((total,line)=>{const parts=line.split(',');if(parts.length!==2||parts.some(p=>!p.trim()))throw Error('Mỗi dòng cần hệ số và enthalpy đầy đủ; không bỏ trống số liệu.');const [coefficient,h]=parts.map(Number);if(!Number.isFinite(coefficient)||coefficient<=0||!Number.isFinite(h))throw Error('Hệ số phải dương, enthalpy phải hữu hạn.');return finite(total+coefficient*h,'Tổng enthalpy');},0);}
 return finite(sum(right)-sum(left),'ΔrH°');
}
export function simpleEquilibrium(a,k){if(!Number.isFinite(a)||a<=0||!Number.isFinite(k)||k<=0)throw Error('Nồng độ và Kc phải dương hữu hạn.');const reactant=a/(1+k),product=a*(k/(1+k));return {reactant,product};}
