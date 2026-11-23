/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {structureToSmiles} from './structure-engine.js';
import {orbitalCloud} from './quantum.js';
import {smilesModel} from './smiles-engine.js';
import {symbolic} from './cas-engine.js';
self.onmessage=event=>{
  const {id,kind,payload}=event.data;
  try{const result=kind==='smiles'?smilesModel(payload.smiles,payload.seed):kind==='cas'?symbolic(payload):kind==='orbital'?orbitalCloud(payload):kind==='structure'?structureToSmiles(payload):(()=>{throw Error('Tác vụ không hợp lệ.');})();self.postMessage({id,result});}
  catch(error){self.postMessage({id,error:error.message||'Không xử lý được dữ liệu.'});}
};
