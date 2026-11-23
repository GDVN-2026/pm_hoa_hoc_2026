/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {molarMass} from './chemistry.js';
export const atomValences={C:4,O:2,N:3,H:1,S:2,F:1,Cl:1,Br:1};
export function validateStructure(input){
 if(!input||!Array.isArray(input.atoms)||!Array.isArray(input.bonds)||input.atoms.length>100||input.bonds.length>160)throw Error('Cấu trúc tối đa 100 nguyên tử và 160 liên kết.');
 const atoms=input.atoms.map(a=>{if(!a||!Object.hasOwn(atomValences,a.symbol)||!Number.isFinite(a.x)||!Number.isFinite(a.y)||a.x<0||a.x>1000||a.y<0||a.y>600)throw Error('Nguyên tử hoặc tọa độ không hợp lệ.');return {symbol:a.symbol,x:a.x,y:a.y};});
 const seen=new Set(),bonds=input.bonds.map(b=>{if(!Array.isArray(b)||b.length!==3||b.some(x=>!Number.isInteger(x))||b[0]<0||b[1]<0||b[0]>=atoms.length||b[1]>=atoms.length||b[0]===b[1]||b[2]<1||b[2]>3)throw Error('Liên kết không hợp lệ.');const key=[b[0],b[1]].sort((a,b)=>a-b).join('-');if(seen.has(key))throw Error('Hai nguyên tử có liên kết bị lặp.');seen.add(key);return [...b];});
 return {version:2,atoms,bonds};
}
export function structureInfo(input){
 const graph=validateStructure(input),counts={},invalid=[];
 graph.atoms.forEach((a,i)=>{counts[a.symbol]=(counts[a.symbol]||0)+1;const used=graph.bonds.reduce((sum,[x,y,n])=>sum+(x===i||y===i?n:0),0);if(used>atomValences[a.symbol])invalid.push(i);else if(a.symbol!=='H')counts.H=(counts.H||0)+atomValences[a.symbol]-used;});
 const symbols=Object.keys(counts).filter(s=>counts[s]>0).sort((a,b)=>{if(counts.C){if(a==='C')return -1;if(b==='C')return 1;if(a==='H')return -1;if(b==='H')return 1;}return a.localeCompare(b);});
 const formula=symbols.map(s=>s+(counts[s]===1?'':counts[s])).join('');
 let components=0;const visited=new Set();for(let i=0;i<graph.atoms.length;i++){if(visited.has(i))continue;components++;const queue=[i];visited.add(i);while(queue.length){const v=queue.pop();for(const[a,b]of graph.bonds){const next=a===v?b:b===v?a:-1;if(next>=0&&!visited.has(next)){visited.add(next);queue.push(next);}}}}
 return {formula,mass:formula?molarMass(formula):0,invalid,components};
}
const chain=(symbols,orders)=>({version:2,atoms:symbols.map((symbol,i)=>({symbol,x:350+i*85,y:300+(i%2)*45})),bonds:orders.map((n,i)=>[i,i+1,n])});
const ring=aromatic=>({version:2,atoms:Array.from({length:6},(_,i)=>({symbol:'C',x:500+105*Math.cos(i*Math.PI/3),y:300+105*Math.sin(i*Math.PI/3)})),bonds:Array.from({length:6},(_,i)=>[i,(i+1)%6,aromatic&&i%2===0?2:1])});
export const structureTemplates=[
{id:'blank',name:'Trang trắng',graph:{version:2,atoms:[],bonds:[]}},
{id:'methane',name:'Methane · CH4',graph:chain(['C'],[])},
{id:'ethane',name:'Ethane · C2H6',graph:chain(['C','C'],[1])},
{id:'ethene',name:'Ethene · C2H4',graph:chain(['C','C'],[2])},
{id:'ethyne',name:'Ethyne · C2H2',graph:chain(['C','C'],[3])},
{id:'ethanol',name:'Ethanol · C2H6O',graph:chain(['C','C','O'],[1,1])},
{id:'acetic',name:'Axit acetic · C2H4O2',graph:{version:2,atoms:[{symbol:'C',x:350,y:320},{symbol:'C',x:440,y:320},{symbol:'O',x:440,y:220},{symbol:'O',x:530,y:360}],bonds:[[0,1,1],[1,2,2],[1,3,1]]}},
{id:'acetone',name:'Acetone · C3H6O',graph:{version:2,atoms:[{symbol:'C',x:350,y:340},{symbol:'C',x:440,y:295},{symbol:'C',x:530,y:340},{symbol:'O',x:440,y:200}],bonds:[[0,1,1],[1,2,1],[1,3,2]]}},
{id:'benzene',name:'Benzene · C6H6',graph:ring(true)},
{id:'cyclohexane',name:'Cyclohexane · C6H12',graph:ring(false)},
{id:'water',name:'Nước · H2O',graph:chain(['O'],[])},
{id:'ammonia',name:'Ammonia · NH3',graph:chain(['N'],[])},
{id:'co2',name:'Carbon dioxide · CO2',graph:chain(['O','C','O'],[2,2])}
];
