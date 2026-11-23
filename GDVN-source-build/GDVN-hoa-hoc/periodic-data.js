/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {elements} from './data.js';
import {electronConfig,escapeHTML} from './chemistry.js';
export const families={alkali:'Kim loại kiềm',earth:'Kim loại kiềm thổ',transition:'Kim loại chuyển tiếp',post:'Kim loại sau chuyển tiếp',metalloid:'Á kim',nonmetal:'Phi kim',halogen:'Halogen',noble:'Khí hiếm',lanthanide:'Họ lanthanide',actinide:'Họ actinide'};
export const familyColors={alkali:'#ffd7db',earth:'#ffe4c2',transition:'#d3eaff',post:'#d8e3ff',metalloid:'#c9f0e2',nonmetal:'#c4f1fa',halogen:'#eee0ff',noble:'#f7dafa',lanthanide:'#fbe6af',actinide:'#ffdfc6'};
export const positions=[];let z=1;
for(let period=1;period<=7;period++){
  const groups=period===1?[1,18]:period<4?[1,2,13,14,15,16,17,18]:Array.from({length:18},(_,i)=>i+1);
  for(const group of groups){if(period>=6&&group===3){for(let k=0;k<15;k++)positions.push({z:z++,row:period+3,col:k+3,period,group:null});}else positions.push({z:z++,row:period,col:group,period,group});}
}
function family(z){
 if(z>=57&&z<=71)return 'lanthanide';if(z>=89&&z<=103)return 'actinide';
 if([3,11,19,37,55,87].includes(z))return 'alkali';if([4,12,20,38,56,88].includes(z))return 'earth';
 if([2,10,18,36,54,86,118].includes(z))return 'noble';if([9,17,35,53,85,117].includes(z))return 'halogen';
 if([5,14,32,33,51,52].includes(z))return 'metalloid';if([1,6,7,8,15,16,34].includes(z))return 'nonmetal';
 if([13,31,49,50,81,82,83,84,113,114,115,116].includes(z))return 'post';return 'transition';
}
export const periodicElements=elements.map(e=>{const p=positions.find(p=>p.z===e.z),cfg=electronConfig(e.z),shells=[];for(const[o,n]of cfg)shells[+o[0]-1]=(shells[+o[0]-1]||0)+n;return {...e,...p,family:family(e.z),block:p.group===null?'f':e.z===2||p.group<=2?'s':p.group>=13?'p':'d',shells,config:cfg.map(([o,n])=>o+n).join(' ')};});
export function orbitalSVG(z,charge=0){
 const cfg=electronConfig(z,charge),e=elements[z-1],rows=cfg.map(([o,n],i)=>{
 const count={s:1,p:3,d:5,f:7}[o[1]],y=100+i*45;
 return '<text x="30" y="'+(y+25)+'" font-size="20">'+o+'</text>'+Array.from({length:count},(_,j)=>'<rect x="'+(100+j*55)+'" y="'+y+'" width="48" height="34" rx="4" fill="#edf6ff" stroke="#187ad8"/><text x="'+(124+j*55)+'" y="'+(y+25)+'" text-anchor="middle" font-size="23">'+(j<n?'↑':'')+(j<n-count?'↓':'')+'</text>').join('');
 }).join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" width="620" height="'+(cfg.length*45+135)+'" viewBox="0 0 620 '+(cfg.length*45+135)+'"><rect width="100%" height="100%" fill="white"/><g fill="#123d70" font-family="Arial,sans-serif"><text x="30" y="38" font-size="25" font-weight="bold">GDVN · '+e.symbol+' · Z = '+z+'</text><text x="30" y="70" font-size="17">Điện tích: '+charge+' · '+(z-charge)+' electron</text>'+rows+'</g></svg>';
}
export function periodicSVG(items=periodicElements){
 return '<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="880" viewBox="0 0 1320 880"><rect width="100%" height="100%" fill="white"/><g font-family="Arial,sans-serif" fill="#123d70"><text x="28" y="38" font-size="27" font-weight="bold">GDVN · Bảng tuần hoàn nguyên tố hóa học</text>'+items.map(e=>{const x=24+(e.col-1)*71,y=65+(e.row-1)*71;return '<g><rect x="'+x+'" y="'+y+'" width="65" height="65" rx="6" fill="'+familyColors[e.family]+'" stroke="#94b8d8"/><text x="'+(x+7)+'" y="'+(y+16)+'" font-size="11">'+e.z+'</text><text x="'+(x+33)+'" y="'+(y+39)+'" font-size="24" text-anchor="middle" font-weight="bold">'+e.symbol+'</text><text x="'+(x+33)+'" y="'+(y+56)+'" font-size="10" text-anchor="middle">'+e.mass+'</text></g>';}).join('')+Object.entries(families).map(([id,name],i)=>{const x=28+(i%5)*253,y=815+Math.floor(i/5)*29;return '<rect x="'+x+'" y="'+(y-12)+'" width="16" height="16" rx="3" fill="'+familyColors[id]+'"/><text x="'+(x+24)+'" y="'+y+'" font-size="13">'+escapeHTML(name)+'</text>';}).join('')+'</g></svg>';
}
