// Offline geometry preview; not a browser screenshot or UI verification.
import {apparatusModel,projectLabPoint} from './lab-3d.js';
import {writeFileSync,mkdirSync} from 'node:fs';
const out='outputs/chemistry-review/round4-design';mkdirSync(out,{recursive:true});
for(const [id,kind,variant] of [['lime','furnace','lime-kiln'],['precipitate','dropper',''],['oxygen','oxygen','']]){
 const model=apparatusModel(kind,variant,'reacting',id==='precipitate'?'precipitate':'gas',1.4,{liquid:'#65bbd5',deposit:'#56a9ce'});
 const faces=model.faces.map(f=>({...f,projected:f.points.map(p=>projectLabPoint(p,960,720))}));
 faces.sort((a,b)=>a.projected.reduce((s,p)=>s+p[2],0)/a.points.length-b.projected.reduce((s,p)=>s+p[2],0)/b.points.length);
 writeFileSync(out+'/'+id+'.json',JSON.stringify({faces,labels:model.labels.map(l=>({...l,screen:projectLabPoint(l.point,960,720)}))}));
}
console.log('Exported offline model geometry previews.');
