/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {masses} from './data.js';
export function normalize(text){return text.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/g,'d');}
export function escapeHTML(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function formatFormula(text){return escapeHTML(text).replace(/(\d+)/g,'<sub>$1</sub>');}
export function parseFormula(input) {
  let source=input.trim().replace(/[₀-₉]/g,c=>'₀₁₂₃₄₅₆₇₈₉'.indexOf(c)).replace(/\s/g,'');
  if(!source||source.length>300)throw Error('Công thức trống hoặc quá dài.');
  let charge=0;
  const chargeMatch=source.match(/\^(\d*)([+-])$/);
  if(chargeMatch){charge=(Number(chargeMatch[1]||1))*(chargeMatch[2]==='+'?1:-1);source=source.slice(0,chargeMatch.index);}
  if(source==='e')return {atoms:{},charge:charge||-1};
  const atoms={};
  for(const part of source.split(/[·.]/)){
    let cursor=0;
    function number(){const m=part.slice(cursor).match(/^\d+/);if(!m)return 1;cursor+=m[0].length;const n=Number(m[0]);if(!Number.isSafeInteger(n)||n<1||n>100000)throw Error('Chỉ số nguyên tử không hợp lệ.');return n;}
    const multiplier=/^\d/.test(part)?number():1;
    function group(end=''){
      const counts={};
      while(cursor<part.length&&part[cursor]!==end){
        const character=part[cursor];
        if(character==='('||character==='['){
          cursor++;const close=character==='('?')':']';const inner=group(close);
          if(part[cursor]!==close)throw Error('Thiếu dấu đóng ngoặc.');
          cursor++;const factor=number();
          for(const [symbol,count]of Object.entries(inner))counts[symbol]=(counts[symbol]||0)+count*factor;
        }else{
          const match=part.slice(cursor).match(/^[A-Z][a-z]?/);
          if(!match||!masses[match[0]])throw Error('Ký hiệu nguyên tố không hợp lệ tại '+part.slice(cursor));
          cursor+=match[0].length;counts[match[0]]=(counts[match[0]]||0)+number();
        }
      }
      if(!Object.keys(counts).length)throw Error('Nhóm nguyên tử trống.');
      return counts;
    }
    const counts=group();
    if(cursor!==part.length)throw Error('Dấu ngoặc không khớp.');
    for(const[symbol,count]of Object.entries(counts))atoms[symbol]=(atoms[symbol]||0)+count*multiplier;
  }
  return {atoms,charge};
}
export function molarMass(formula){return Object.entries(parseFormula(formula).atoms).reduce((s,[el,n])=>s+masses[el]*n,0);}
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
function fraction(value,max=10000){let best=[Math.round(value),1],err=Math.abs(value-best[0]);for(let d=1;d<=max;d++){const n=Math.round(value*d),e=Math.abs(value-n/d);if(e<err){best=[n,d];err=e;}if(e<1e-9)break;}return best;}
export function balanceEquation(input){
  const sides=input.replace(/→|⇌|=/g,'->').split('->');
  if(sides.length!==2)throw Error('Dùng một dấu -> để ngăn hai vế.');
  // Ion charges must use ^, with spaces around the plus separating substances.
  const split=s=>s.trim().split(/\s+\+\s+|(?<!\^)\+(?!\s*(?:$|->))/).map(x=>x.trim()).filter(Boolean);
  const compounds=sides.map(s=>s.includes('^')?s.trim().split(/\s+\+\s+/):split(s));
  if(compounds.some(s=>!s.length))throw Error('Mỗi vế cần ít nhất một chất.');
  const all=compounds.flat().map(x=>x.replace(/^\d+\s*(?=[A-Z(\[])/,''));
  if(all.length>20)throw Error('Tối đa 20 chất trong một phương trình.');
  const parsed=all.map(parseFormula);
  const symbols=[...new Set(parsed.flatMap(p=>Object.keys(p.atoms)))];
  if(parsed.some(p=>p.charge))symbols.push('charge');
  const matrix=symbols.map(el=>parsed.map((p,j)=>(j<compounds[0].length?1:-1)*(el==='charge'?p.charge:p.atoms[el]||0)));
  let row=0;const pivots=[];
  for(let col=0;col<all.length&&row<matrix.length;col++){
    const found=matrix.findIndex((r,i)=>i>=row&&Math.abs(r[col])>1e-10);
    if(found<0)continue;
    [matrix[row],matrix[found]]=[matrix[found],matrix[row]];
    const div=matrix[row][col];matrix[row]=matrix[row].map(x=>x/div);
    for(let i=0;i<matrix.length;i++){if(i===row)continue;const factor=matrix[i][col];matrix[i]=matrix[i].map((x,j)=>x-factor*matrix[row][j]);}
    pivots.push(col);row++;
  }
  const free=all.map((_,i)=>i).filter(i=>!pivots.includes(i));
  if(free.length!==1)throw Error(free.length?'Phương trình có nhiều nghiệm độc lập. Hãy xác định rõ sản phẩm.':'Không thể cân bằng với các chất đã nhập.');
  const solution=all.map(()=>0);solution[free[0]]=1;
  for(let r=pivots.length-1;r>=0;r--)solution[pivots[r]]=-matrix[r].reduce((sum,v,j)=>j===pivots[r]?sum:sum+v*solution[j],0);
  const fractions=solution.map(x=>fraction(x));const lcm=fractions.reduce((m,[,d])=>m*d/gcd(m,d),1);
  let coefficients=fractions.map(([n,d])=>Math.round(n*lcm/d));
  if(coefficients.every(n=>n<0))coefficients=coefficients.map(n=>-n);
  if(coefficients.some(n=>n<=0||!Number.isSafeInteger(n)))throw Error('Các chất không tạo thành phương trình với hệ số dương.');
  const divisor=coefficients.reduce(gcd);coefficients=coefficients.map(n=>n/divisor);
  for(const symbol of symbols){
    const sum=parsed.reduce((s,p,i)=>s+(i<compounds[0].length?1:-1)*coefficients[i]*(symbol==='charge'?p.charge:p.atoms[symbol]||0),0);
    if(sum!==0)throw Error('Không tìm được hệ số nguyên chính xác.');
  }
  return {all,coefficients,split:compounds[0].length,symbols,parsed,text:all.map((c,i)=>(i===compounds[0].length?' → ':i?' + ':'')+(coefficients[i]===1?'':coefficients[i])+c).join('')};
}
const order=['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p','6s','4f','5d','6p','7s','5f','6d','7p'];
const exceptions={24:{'4s':1,'3d':5},29:{'4s':1,'3d':10},41:{'5s':1,'4d':4},42:{'5s':1,'4d':5},44:{'5s':1,'4d':7},45:{'5s':1,'4d':8},46:{'5s':0,'4d':10},47:{'5s':1,'4d':10},57:{'4f':0,'5d':1},58:{'4f':1,'5d':1},64:{'4f':7,'5d':1},78:{'6s':1,'5d':9},79:{'6s':1,'5d':10},89:{'5f':0,'6d':1},90:{'5f':0,'6d':2},91:{'5f':2,'6d':1},92:{'5f':3,'6d':1},93:{'5f':4,'6d':1},96:{'5f':7,'6d':1},103:{'6d':0,'7p':1}};
export function electronConfig(z,charge=0){
  if(!Number.isInteger(z)||z<1||z>118||!Number.isInteger(charge)||z-charge<0||z-charge>118)throw Error('Số electron không hợp lệ.');
  let left=z;const result={};
  for(const orbital of order){const cap={s:2,p:6,d:10,f:14}[orbital[1]];result[orbital]=Math.min(cap,left);left-=result[orbital];}
  Object.assign(result,exceptions[z]||{});
  if(charge>0){
    left=charge;
    const removal=[...order].sort((a,b)=>Number(b[0])-Number(a[0])||'spdf'.indexOf(b[1])-'spdf'.indexOf(a[1]));
    for(const orbital of removal){const n=Math.min(left,result[orbital]);result[orbital]-=n;left-=n;}
  } else if(charge<0){
    left=-charge;
    for(const orbital of order){const cap={s:2,p:6,d:10,f:14}[orbital[1]];const n=Math.min(left,cap-result[orbital]);result[orbital]+=n;left-=n;}
  }
  return Object.entries(result).filter(([,n])=>n>0).sort(([a],[b])=>Number(a[0])-Number(b[0])||'spdf'.indexOf(a[1])-'spdf'.indexOf(b[1]));
}
export function solutionPH(type,c,ka=1.8e-5){
  if(!['strong-acid','strong-base','weak-acid','weak-base'].includes(type))throw Error('Chọn đúng loại acid hoặc base trong mô hình.');
  if(!Number.isFinite(c)||c<0||c>10)throw Error('Nồng độ phải nằm trong khoảng 0–10 mol/L.');
  const kw=1e-14;
  if(type==='strong-acid')return -Math.log10((c+Math.hypot(c,2e-7))/2);
  if(type==='strong-base')return 14+Math.log10((c+Math.hypot(c,2e-7))/2);
  if(!Number.isFinite(ka)||!(ka>0))throw Error('Hằng số phân li phải hữu hạn và dương.');
  let lo=1e-14,hi=Math.max(1,c+1);
  for(let i=0;i<120;i++){const h=(lo+hi)/2;const value=h-kw/h-c*ka/(ka+h);if(value>0)hi=h;else lo=h;}
  const value=-Math.log10((lo+hi)/2);
  return type==='weak-base'?14-value:value;
}
export function calculate(expression,degrees=true){
  const source=expression.replace(/π/g,'pi').replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').trim();
  const tokens=source.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[a-z]+|[()+\-*/^%,!]/gi)||[];
  if(tokens.join('')!==source.replace(/\s/g,''))throw Error('Ký tự không hợp lệ.');
  if(tokens.length>200)throw Error('Biểu thức quá dài.');
  let index=0,depth=0;const angle=degrees?Math.PI/180:1;
  const funcs={sin:x=>Math.sin(x*angle),cos:x=>Math.cos(x*angle),tan:x=>Math.tan(x*angle),asin:x=>Math.asin(x)/angle,acos:x=>Math.acos(x)/angle,atan:x=>Math.atan(x)/angle,sqrt:Math.sqrt,ln:Math.log,log:Math.log10,abs:Math.abs,exp:Math.exp};
  function primary(){
    if(++depth>50)throw Error('Biểu thức lồng quá sâu.');
    const token=tokens[index++];let value;
    if(token==='('){value=expressionAt();if(tokens[index++]!==')')throw Error('Thiếu dấu ).');}
    else if(token==='pi')value=Math.PI;
    else if(token==='e')value=Math.E;
    else if(funcs[token]){if(tokens[index++]!=='(')throw Error('Hàm cần dấu ngoặc.');value=funcs[token](expressionAt());if(tokens[index++]!==')')throw Error('Thiếu dấu ).');}
    else if(token&&/^\d|^\./.test(token))value=Number(token);
    else throw Error('Thiếu số hoặc hàm không được hỗ trợ.');
    while(tokens[index]==='!'||tokens[index]==='%'){const op=tokens[index++];if(op==='%')value/=100;else{if(!Number.isInteger(value)||value<0||value>170)throw Error('Giai thừa cần số nguyên từ 0 đến 170.');let n=1;for(let i=2;i<=value;i++)n*=i;value=n;}}
    depth--;return value;
  }
  function power(){const a=primary();if(tokens[index]==='^'){index++;return a**unary();}return a;}
  function unary(){if(tokens[index]==='+'){index++;return unary();}if(tokens[index]==='-'){index++;return -unary();}return power();}
  function product(){let a=unary();while(['*','/'].includes(tokens[index])){const op=tokens[index++],b=unary();a=op==='*'?a*b:a/b;}return a;}
  function expressionAt(){let a=product();while(['+','-'].includes(tokens[index])){const op=tokens[index++],b=product();a=op==='+'?a+b:a-b;}return a;}
  const value=expressionAt();if(index!==tokens.length)throw Error('Hãy dùng dấu * cho phép nhân.');
  if(!Number.isFinite(value))throw Error('Kết quả không xác định trong tập số thực.');
  return value;
}
export const pretty = (n,digits=5)=>Number.isFinite(n)?Number(n.toPrecision(digits)).toLocaleString('vi-VN',{maximumFractionDigits:10}):'—';
