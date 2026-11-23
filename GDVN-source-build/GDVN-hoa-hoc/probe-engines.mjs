/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {smilesModel} from './smiles-engine.js';
for(const input of ['CCO','c1ccccc1','CC(=O)O','O','[NH4+]']){
 try{const m=smilesModel(input);console.log(input,m.formula,m.mass,m.atoms.length,m.bonds.length,m.atoms[0]);}catch(e){console.error(input,e.message);process.exitCode=1;}
}
import {symbolic} from './cas-engine.js';
for(const operation of ['factor','expand','diff','integrate','solve'])console.log(operation,symbolic({operation,expression:operation==='solve'?'x^2-5*x+6=0':'x^2+2*x+1'}));
