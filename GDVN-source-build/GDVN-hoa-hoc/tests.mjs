/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import assert from 'node:assert/strict';
import {balanceEquation,parseFormula,molarMass,electronConfig,solutionPH,calculate} from './chemistry.js';
import {elements,reactions} from './data.js';
assert.equal(elements.length,118);
assert.deepEqual(parseFormula('Ca3(PO4)2').atoms,{Ca:3,P:2,O:8});
assert.deepEqual(parseFormula('CuSO4·5H2O').atoms,{Cu:1,S:1,O:9,H:10});
assert.throws(()=>parseFormula('Ca(OH'));
assert.throws(()=>parseFormula('Qq2'));
assert.ok(Math.abs(molarMass('H2O')-18.015)<.00001);
for(const [equation,expected] of [
 ['Fe + O2 -> Fe2O3',[4,3,2]],
 ['KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O',[2,16,2,2,5,8]],
 ['Fe^3+ + e^- -> Fe^2+',[1,1,1]],
 ['Cr2O7^2- + Fe^2+ + H^+ -> Cr^3+ + Fe^3+ + H2O',[1,6,14,2,6,7]],
 ['C2H5OH + O2 -> CO2 + H2O',[1,3,2,3]],
])assert.deepEqual(balanceEquation(equation).coefficients,expected);
for(const reaction of reactions)assert.ok(balanceEquation(reaction.equation).coefficients.every(x=>x>0),reaction.name);
for(let z=1;z<=118;z++)assert.equal(electronConfig(z).reduce((sum,[,n])=>sum+n,0),z,'Z='+z);
assert.equal(Object.fromEntries(electronConfig(24))['3d'],5);
assert.equal(Object.fromEntries(electronConfig(26,2))['4s'],undefined);
assert.ok(Math.abs(solutionPH('strong-acid',.001)-3)<.0001);
assert.ok(Math.abs(solutionPH('strong-acid',0)-7)<.0001);
assert.ok(Math.abs(solutionPH('weak-acid',.1,1.8e-5)-2.875)<.003);
assert.equal(calculate('2^3^2'),512);
assert.equal(calculate('-2^2'),-4);
assert.equal(calculate('5!'),120);
assert.ok(Math.abs(calculate('sin(30)')-.5)<1e-12);
assert.throws(()=>calculate('alert(1)'));
assert.throws(()=>calculate('1/0'));
console.log('PASS: formula parser, all 30 reactions, ionic balancing, 118 electron configurations, pH, calculator.');

import {limitingReagent} from './stoichiometry.js';
const water=balanceEquation('H2 + O2 -> H2O');
const mixture=limitingReagent(water,[{amount:3,unit:'mol'},{amount:2,unit:'mol'}],80);
assert.deepEqual(mixture.limiting,[0]);
assert.equal(mixture.rows[1].remaining,.5);
assert.ok(Math.abs(mixture.rows[2].product-2.4)<1e-12);
const equalMixture=limitingReagent(water,[{amount:2,unit:'mol'},{amount:1,unit:'mol'}]);
assert.deepEqual(equalMixture.limiting,[0,1]);
const iron=balanceEquation('Fe + O2 -> Fe2O3');
assert.ok(Math.abs(limitingReagent(iron,[{amount:55.845,unit:'g'},{amount:1,unit:'mol'}]).rows[2].product-.5)<1e-12);
assert.equal(limitingReagent(water,[{amount:0,unit:'mol'},{amount:1,unit:'mol'}]).rows[2].product,0);
assert.throws(()=>limitingReagent(water,[{amount:-1,unit:'mol'},{amount:1,unit:'mol'}]));
assert.throws(()=>limitingReagent(water,[{amount:1,unit:'mol'},{amount:1,unit:'mol'}],101));
assert.throws(()=>limitingReagent(water,[{amount:NaN,unit:'mol'},{amount:1,unit:'mol'}]));
console.log('PASS: limiting reagent, excess, co-limiting amounts, gram conversion, yield and invalid inputs.');
