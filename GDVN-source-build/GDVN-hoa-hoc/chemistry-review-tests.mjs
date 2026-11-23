/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Independent scoped chemistry checks. */
import assert from 'node:assert/strict';
import {balanceEquation,solutionPH,molarMass} from './chemistry.js';
import {limitingReagent} from './stoichiometry.js';
import {labDomain} from './lab-domain.js';
import {strongTitration} from './titration.js';
let checks=0;
function scope(equation,amounts,unit='mol'){const b=balanceEquation(equation);return labDomain(b,limitingReagent(b,amounts.map(amount=>({amount,unit}))));}
for(const salt of ['AlCl3','Al(NO3)3']){
 const eq=salt+' + NaOH -> Al(OH)3 + '+(salt==='AlCl3'?'NaCl':'NaNO3');
 assert.equal(scope(eq,[1,3]).blocked,false);checks++;
 assert.equal(scope(eq,[1,4]).code,'AMPHOTERIC-EXCESS');checks++;
 assert.equal(scope(eq,[0,4]).blocked,false);checks++;
 assert.equal(scope(eq,[molarMass(salt),4*molarMass('NaOH')],'g').code,'AMPHOTERIC-EXCESS');checks++;
}
assert.equal(scope('ZnSO4 + KOH -> Zn(OH)2 + K2SO4',[1,2]).blocked,false);checks++;
assert.equal(scope('ZnSO4 + KOH -> Zn(OH)2 + K2SO4',[1,4]).code,'AMPHOTERIC-EXCESS');checks++;
assert.equal(scope('CO2 + Ca(OH)2 -> CaCO3 + H2O',[1,1]).blocked,false);checks++;
assert.equal(scope('CO2 + Ca(OH)2 -> CaCO3 + H2O',[2,1]).code,'CO2-EXCESS');checks++;
assert.equal(scope('H2SO4 + NaOH -> Na2SO4 + H2O',[1,1]).code,'PARTIAL-NEUTRALIZATION');checks++;
assert.equal(scope('H2SO4 + NaOH -> Na2SO4 + H2O',[1,2]).blocked,false);checks++;
assert.equal(scope('CuSO4 + NaOH -> Cu(OH)2 + Na2SO4',[1,4]).blocked,false);checks++;
for(const eq of ['Na2CO3 + HCl -> NaCl + CO2 + H2O','K2CO3 + HNO3 -> KNO3 + CO2 + H2O','CH3COOH + Na2CO3 -> CH3COONa + CO2 + H2O']){
 const b=balanceEquation(eq);
 assert.equal(scope(eq,[1,1]).code,'CARBONATE-ACID-DEFICIT');checks++;
 assert.equal(scope(eq,b.coefficients.slice(0,b.split)).blocked,false);checks++;
}
assert.equal(scope('CaCO3 + HCl -> CaCl2 + CO2 + H2O',[1,1]).blocked,false);checks++;
assert.throws(()=>solutionPH('not-a-type',.01));checks++;
assert.throws(()=>solutionPH('weak-acid',.01,Infinity));checks++;
assert.throws(()=>solutionPH('weak-base',.01,NaN));checks++;
assert.ok(Math.abs(solutionPH('strong-acid',0)-7)<1e-12);checks++;
assert.ok(Math.abs(solutionPH('strong-acid',1e-9)-6.997828536)<1e-8);checks++;
for(const initialKind of ['acid','base']){
 const r=strongTitration({initialKind,c0:.1,v0:25,cAdded:.1});
 assert.equal(r.equivalence,25);checks++;
 assert.ok(Math.abs(r.points[150][1]-7)<1e-12);checks++;
 assert.ok(Math.abs(r.points[0][1]-(initialKind==='acid'?1:13))<1e-9);checks++;
 const end=initialKind==='acid'?14+Math.log10(.1/3):-Math.log10(.1/3);
 assert.ok(Math.abs(r.points[300][1]-end)<1e-9);checks++;
 assert.ok(r.points.every(p=>p.every(Number.isFinite)));checks++;
}
for(const params of [{c0:0,v0:25,cAdded:.1},{c0:.1,v0:-1,cAdded:.1},{c0:.1,v0:25,cAdded:Infinity}]){assert.throws(()=>strongTitration(params));checks++;}
console.log('PASS: '+checks+' chemistry assertions (scope boundaries, mol/g, invalid pH, extreme dilution, titration directions/equivalence/endpoints).');

