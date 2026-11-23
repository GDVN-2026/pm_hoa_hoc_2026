/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import assert from 'node:assert/strict';
import {structureTemplates,structureInfo,validateStructure} from './structure-model.js';
import {structureToSmiles} from './structure-engine.js';
import {smilesModel} from './smiles-engine.js';
for(const [id,formula]of [['methane','CH4'],['ethene','C2H4'],['ethyne','C2H2'],['ethanol','C2H6O'],['acetic','C2H4O2'],['acetone','C3H6O'],['benzene','C6H6'],['cyclohexane','C6H12'],['water','H2O'],['co2','CO2']]){
 const graph=structureTemplates.find(t=>t.id===id).graph;assert.equal(structureInfo(graph).formula,formula);assert.deepEqual(structureInfo(graph).invalid,[]);assert.ok(structureToSmiles(graph).smiles);assert.equal(smilesModel(structureToSmiles(graph).smiles).formula,formula);
}
assert.throws(()=>validateStructure({atoms:[{symbol:'Qq',x:10,y:10}],bonds:[]}));
assert.throws(()=>validateStructure({atoms:[{symbol:'C',x:10,y:10}],bonds:[[0,0,1]]}));
assert.equal(structureInfo({atoms:[{symbol:'C',x:10,y:10},{symbol:'C',x:100,y:100}],bonds:[]}).components,2);
const invalid={atoms:[{symbol:'O',x:10,y:10},{symbol:'C',x:100,y:10}],bonds:[[0,1,3]]};assert.ok(structureInfo(invalid).invalid.includes(0));assert.throws(()=>structureToSmiles(invalid));
console.log('PASS: structure templates/formulas, graph validation, valence errors and drawing → SMILES → 3D formula consistency.');
