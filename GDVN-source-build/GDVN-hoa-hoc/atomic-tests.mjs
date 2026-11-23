/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import assert from 'node:assert/strict';
import {radial,wavefunction,orbitalCloud,orbitalTypes} from './quantum.js';
import {periodicElements,positions,orbitalSVG,periodicSVG} from './periodic-data.js';
assert.equal(periodicElements.length,118);assert.equal(new Set(positions.map(e=>e.row+','+e.col)).size,118);
for(const e of periodicElements)assert.equal(e.shells.reduce((a,b)=>a+b,0),e.z);
for(const[symbol,group,period,block]of [['H',1,1,'s'],['He',18,1,'s'],['Fe',8,4,'d'],['Br',17,4,'p'],['Ce',null,6,'f'],['U',null,7,'f'],['Og',18,7,'p']]){const e=periodicElements.find(e=>e.symbol===symbol);assert.equal(e.group,group);assert.equal(e.period,period);assert.equal(e.block,block);}
assert.ok(Math.abs(wavefunction('1s',0,0,0)-1/Math.sqrt(Math.PI))<1e-12);
assert.equal(radial(2,0,2),0);assert.equal(wavefunction('2pz',1,1,0),0);
assert.equal(wavefunction('3dxy',0,1,1),0);
assert.ok(wavefunction('2pz',0,0,1)*wavefunction('2pz',0,0,-1)<0);
for(const [type,n,l]of orbitalTypes){const model=orbitalCloud({type,count:1000});assert.equal(model.points.length,1000);assert.equal(model.radialNodes,n-l-1);assert.equal(model.angularNodes,l);assert.ok(Math.abs(model.gridProbability-1)<.015,type);assert.ok(model.points.every(p=>p.every(Number.isFinite)));}
assert.throws(()=>orbitalCloud({charge:0}));assert.throws(()=>orbitalCloud({count:50000}));assert.throws(()=>orbitalCloud({type:'4f'}));
const h=orbitalCloud({type:'1s',count:1000}),he=orbitalCloud({type:'1s',charge:2,count:1000});assert.equal(he.energy,4*h.energy);assert.equal(he.extent,h.extent/2);
assert.ok(periodicSVG().includes('Og'));assert.ok(orbitalSVG(26,2).includes('24 electron'));
console.log('PASS: 118 positions/groups/shells, SVG exports, hydrogen 1s normalization, radial/angular nodes, all 14 orbitals and hydrogenic Z scaling.');
