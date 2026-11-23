/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Reference cases and numerical boundaries. */
import assert from 'node:assert/strict';
import {potentials} from './data.js';
import {standardCell,nernstCell,faradayMass,enthalpyDelta,simpleEquilibrium} from './physical-chemistry.js';
let checks=0;const near=(a,b,tol=1e-10)=>{assert.ok(Math.abs(a-b)<tol,a+' vs '+b);checks++;};
const pair=symbol=>potentials.find(p=>p[1]===symbol);
for(const [a,b,n,e0]of [['Zn','Cu',2,1.103],['Al','Cu',6,2.002],['Cu','Ag',2,.460],['Al','Ag',3,2.462],['Fe','H',2,.440]]){
 const r=standardCell(pair(a),pair(b));assert.equal(r.n,n);checks++;near(r.e0,e0);assert.ok(r.equation.includes('→'));checks++;
 const reversed=standardCell(pair(b),pair(a));assert.equal(reversed.equation,r.equation);checks++;near(reversed.e0,r.e0);
}
assert.ok(standardCell(pair('Al'),pair('Cu')).qExpression.includes('^3'));checks++;
assert.ok(standardCell(pair('Zn'),pair('H')).qExpression.includes('p(H2)/p°'));checks++;
const zncu=nernstCell(pair('Zn'),pair('Cu'),298.15,1);near(zncu.e,1.103);near(zncu.dg,-212.84664265672,1e-7);
assert.ok(nernstCell(pair('Zn'),pair('Cu'),298.15,1e100).e<0);checks++;
assert.throws(()=>standardCell(pair('Cu'),pair('Cu')));checks++;
assert.throws(()=>nernstCell(pair('Zn'),pair('Cu'),0,1));checks++;
assert.throws(()=>nernstCell(pair('Zn'),pair('Cu'),298,0));checks++;
for(const [efficiency,mass]of [[100,63.546],[50,31.773],[0,0]])near(faradayMass({M:63.546,z:2,current:1,minutes:2*96485.33212/60,efficiency}).mass,mass);
near(faradayMass({M:63.546,z:2,current:0,minutes:30}).mass,0);
assert.throws(()=>faradayMass({M:63.546,z:2,current:1,minutes:30,efficiency:101}));checks++;
assert.throws(()=>faradayMass({M:63.546,z:2,current:1e308,minutes:30}));checks++;
near(enthalpyDelta('1, -74.8\n2, 0','1, -393.5\n2, -285.8'),-890.3);
for(const bad of ['1,','1, ','','1, NaN','0, -20','1, -20, 0']){assert.throws(()=>enthalpyDelta(bad,'1, 0'));checks++;}
near(enthalpyDelta('1, 0','1, 0'),0);
const eq=simpleEquilibrium(1,4);near(eq.reactant,.2);near(eq.product,.8);near(eq.product/eq.reactant,4);
assert.ok(simpleEquilibrium(1,1e308).reactant>0);checks++;
near(simpleEquilibrium(1e308,1e308).reactant,1);
for(let i=0;i<potentials.length;i++)for(let j=i+1;j<potentials.length;j++){const r=nernstCell(potentials[i],potentials[j],298.15,1);assert.ok([r.e,r.dg,r.n].every(Number.isFinite));checks++;}
console.log('PASS: '+checks+' physical chemistry checks: reference cells/electron counts, Q, Faraday, missing enthalpy, stable equilibrium, 45 electrode pairs.');
