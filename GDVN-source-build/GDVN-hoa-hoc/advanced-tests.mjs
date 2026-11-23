/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import assert from 'node:assert/strict';
import {smilesModel,modelXYZ} from './smiles-engine.js';
import {symbolic} from './cas-engine.js';
import {Worker} from 'node:worker_threads';
import workerCode from './engine-worker-code.js';
const formulas={CCO:'C2H6O','c1ccccc1':'C6H6','CC(=O)O':'C2H4O2',O:'H2O'};
for(const [smiles,expected] of Object.entries(formulas)){
  const model=smilesModel(smiles);
  assert.equal(model.formula,expected);
  assert.ok(model.atoms.every(a=>a.slice(1).every(Number.isFinite)));
  assert.ok(model.bonds.every(b=>b[0]<model.atoms.length&&b[1]<model.atoms.length));
  assert.equal(Number(modelXYZ(model).split('\n')[0]),model.atoms.length);
  for(const bond of model.bonds){const a=model.atoms[bond[0]],b=model.atoms[bond[1]];const distance=Math.hypot(...a.slice(1).map((x,i)=>x-b[i+1]));assert.ok(distance>.5&&distance<2.5,'bond distance '+distance);}
}
assert.throws(()=>smilesModel('invalid'));assert.throws(()=>smilesModel('C'.repeat(81)));
assert.equal(symbolic({operation:'solve',expression:'x^2-5*x+6=0'}).text,'[2,3]');
assert.equal(symbolic({operation:'diff',expression:'x^3'}).text,'3*x^2');
assert.equal(symbolic({operation:'factor',expression:'x^2+2*x+1'}).text,'(1+x)^2');
assert.equal(symbolic({operation:'integrate',expression:'2*x'}).text,'x^2');
assert.equal(symbolic({operation:'limit',expression:'sin(x)/x',point:'0'}).text,'1');
assert.throws(()=>symbolic({operation:'solve',expression:'x',variable:'x,y'}));
const bootstrap="const {parentPort}=require('node:worker_threads');globalThis.self=globalThis;self.postMessage=value=>parentPort.postMessage(value);parentPort.on('message',data=>self.onmessage({data}));";
async function work(kind,payload){
  const worker=new Worker(bootstrap+workerCode,{eval:true});
  try{return await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{reject(Error('worker timeout'));},12000);worker.on('error',e=>{clearTimeout(timer);reject(e);});worker.on('message',message=>{clearTimeout(timer);message.error?reject(Error(message.error)):resolve(message.result);});worker.postMessage({id:1,kind,payload});});}finally{await worker.terminate();}
}
assert.equal((await work('smiles',{smiles:'CCO'})).formula,'C2H6O');
assert.equal((await work('cas',{operation:'solve',expression:'x^2-5*x+6=0'})).text,'[2,3]');
console.log('PASS: SMILES formula, coordinates, bond distances, XYZ, invalid structures, symbolic algebra/calculus and compiled workers.');
