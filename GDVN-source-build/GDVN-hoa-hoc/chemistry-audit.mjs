/** GDVN · Nguyễn Thanh Vy · Copyright © 2026. Traceable inventory, not certification. */
import {writeFile,mkdir,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {labReactions} from './lab-data.js';
import {balanceEquation} from './chemistry.js';
import {limitingReagent} from './stoichiometry.js';
import {labDomain} from './lab-domain.js';
const root=path.dirname(fileURLToPath(import.meta.url)),out=path.join(root,'outputs/chemistry-review');
const inventory=labReactions.map((r,i)=>{
 const b=balanceEquation(r.equation),q=limitingReagent(b,Array.from({length:b.split},()=>({amount:1,unit:'mol'})));
 return {id:'CHEM-'+String(i+1).padStart(3,'0'),runtimeId:r.id,name:r.name,equation:b.text,condition:r.condition,observation:r.observation,
  algebra:'Hệ số dương; đã qua suite cân bằng',defaultScope:labDomain(b,q),curriculumMapping:null,
  scientificReview:'Không suy thẩm định từng hiện tượng/điều kiện từ kết quả test. Xem báo cáo cho phạm vi đã đối chứng.'};
});
const hashes={};for(const file of ['lab-data.js','lab-domain.js','lab-ui.js','chemistry.js','titration.js','curriculum-context.js','reactions-ui.js'])hashes[file]=createHash('sha256').update(await readFile(path.join(root,file))).digest('hex');
await mkdir(out,{recursive:true});await writeFile(path.join(out,'inventory.json'),JSON.stringify({checkedAt:new Date().toISOString(),scope:'GDVN-hoa-hoc; không phải chứng nhận toàn bộ chương trình',hashes,inventory},null,2));
console.log('Wrote inventory for '+inventory.length+' reactions; curriculum mapping intentionally unconfirmed per reaction.');
