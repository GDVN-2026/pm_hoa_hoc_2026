/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import assert from 'node:assert/strict';
import {apparatusKeys,apparatusLibrary,apparatusMarkup,studioTemplates,templateScene,validateStudio} from './studio-library.js';
import {labReactions,matchReaction} from './lab-data.js';
import {balanceEquation} from './chemistry.js';
assert.equal(apparatusKeys.length,34);assert.equal(studioTemplates.length,12);
for(const type of apparatusKeys){const markup=apparatusMarkup({type,color:'#123456',label:'<script>alert(1)</script>'});assert.ok(!markup.includes('LIQUID'));assert.ok(!markup.includes('<script>'));assert.ok(markup.includes('stroke'));}
for(const template of studioTemplates){const scene=templateScene(template.id);assert.ok(scene.items.every(item=>Object.hasOwn(apparatusLibrary,item.type)));assert.deepEqual(validateStudio(JSON.parse(JSON.stringify(scene))),scene);}
assert.throws(()=>validateStudio({version:2,items:[{type:'<script>',x:1,y:1,scale:1,angle:0}]}));
assert.throws(()=>validateStudio({version:2,items:[{type:'beaker',x:NaN,y:1,scale:1,angle:0}]}));
assert.throws(()=>validateStudio({version:2,items:[{type:'beaker',x:1,y:1,scale:999,angle:0}]}));
assert.equal(labReactions.length,140);
const equations=new Set();for(const reaction of labReactions){const b=balanceEquation(reaction.equation);assert.ok(b.coefficients.every(n=>n>0));assert.ok(reaction.condition.length>10);assert.ok(reaction.observation.length>5);assert.ok(!equations.has(b.text));equations.add(b.text);}
assert.ok(matchReaction('AgNO3','KI').equation.includes('AgI'));
assert.ok(matchReaction('HCl','CaCO3').equation.includes('CO2'));
assert.equal(matchReaction('NaCl','NaCl'),undefined);
assert.equal(matchReaction('not-a-reagent','KI'),undefined);
console.log('PASS: 34 apparatus, 12 validated templates, JSON roundtrip/invalid input, 140 unique balanced reactions and pair lookup.');
