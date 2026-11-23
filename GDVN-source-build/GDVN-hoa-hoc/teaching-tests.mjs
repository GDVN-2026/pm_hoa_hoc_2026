/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import assert from 'node:assert/strict';
import {lessons,questions,selectQuestions,solveTeaching} from './teaching-core.js';
assert.equal(lessons.length,8);assert.equal(new Set(lessons.map(l=>l.id)).size,8);
for(const l of lessons)for(const key of ['goal','tool','predict','activity','explain','check','answer','limit'])assert.ok(l[key]);
assert.equal(questions.length,24);assert.equal(new Set(questions.map(q=>q.id)).size,24);
for(const q of questions){assert.ok(lessons.some(l=>l.id===q.topic));assert.equal(q.answers.length,4);assert.equal(new Set(q.answers).size,4);assert.ok(q.correct>=0&&q.correct<4);assert.ok(q.explanation);}
assert.equal(selectQuestions('atom',10).length,3);assert.equal(selectQuestions('all',10).length,10);assert.equal(selectQuestions('all',100).length,24);assert.equal(selectQuestions('missing').length,0);
for(let i=0;i<10;i++)assert.equal(new Set(selectQuestions('all',24).map(q=>q.id)).size,24);
assert.ok(solveTeaching('mol',{formula:'H2O',mass:18.015}).at(-1).includes('1 mol'));
assert.ok(solveTeaching('concentration',{moles:0.2,volume:500}).at(-1).includes('0,4 mol/L'));
assert.ok(solveTeaching('dilution',{c1:1,c2:0.1,v2:100}).at(-1).includes('10 mL'));
assert.ok(solveTeaching('ph',{c:0.001}).at(-1).includes('3'));
assert.ok(solveTeaching('ph',{c:1e-10}).at(-1).includes('6,999')); // Water dominates, not pH 10.
let steps=solveTeaching('limiting',{equation:'H2 + O2 -> H2O',a:4.032,b:64});assert.ok(steps[2].includes('H2 là chất giới hạn'));assert.ok(steps[3].includes('2 mol'));assert.ok(steps[4].includes('O2: 1'));
steps=solveTeaching('limiting',{equation:'H2 + O2 -> H2O',a:4.032,b:31.998});assert.ok(steps[2].includes('vừa đủ'));
for(const [type,data] of [['mol',{formula:'XYZ',mass:1}],['mol',{formula:'H2O',mass:0}],['concentration',{moles:1,volume:-1}],['dilution',{c1:0.1,c2:1,v2:100}],['ph',{c:1}],['ph',{c:NaN}],['limiting',{equation:'CaCO3 -> CaO + CO2',a:1,b:1}]])assert.throws(()=>solveTeaching(type,data));
console.log('PASS: 8 original lessons, 24 question integrity/sampling, units, dilution restrictions, water-corrected pH, limiting/excess and invalid inputs.');
