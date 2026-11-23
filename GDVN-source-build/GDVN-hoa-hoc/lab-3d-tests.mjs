import assert from 'node:assert/strict';
import {apparatusModel,supportsLab3D,projectLabPoint} from './lab-3d.js';
let cases=0;
for(const [kind,variant] of [['furnace','lime-kiln'],['dropper',''],['tongs',''],['dry',''],['oxygen',''],['ammonia','']]){
 assert.equal(supportsLab3D(kind,variant),true);
 for(const state of ['ready','materials','dosing','process','reacting'])for(const effect of ['none','gas','precipitate','coating']){
  const m=apparatusModel(kind,variant,state,effect,1.7);assert.ok(m.faces.length>40);
  for(const f of m.faces){assert.ok(f.points.length>=3);assert.ok(f.points.every(p=>p.length===3&&p.every(Number.isFinite)));assert.ok(f.alpha>0&&f.alpha<=1);}
  assert.ok(m.faces.some(f=>f.points.some(p=>p[2]!==0)));assert.ok(m.labels.length>0);cases++;
 }
}
assert.equal(supportsLab3D('blast',''),false);assert.equal(supportsLab3D('cell','brine'),false);
const lime=state=>apparatusModel('furnace','lime-kiln',state,'gas');
assert.ok(lime('ready').labels.some(l=>l.text==='CaCO₃ · rắn'));
assert.ok(lime('reacting').labels.some(l=>l.text==='CaO · rắn'));
assert.ok(lime('reacting').labels.some(l=>l.text==='CO₂ · khí không màu'));
assert.ok(!lime('ready').labels.some(l=>l.text==='CaO · rắn'));
assert.ok(apparatusModel('tongs','','reacting','gas',0,{solidFraction:0}).faces.length<apparatusModel('tongs','','reacting','gas',0,{solidFraction:1}).faces.length);
const near=projectLabPoint([1,1.2,1],640,480,0,0),far=projectLabPoint([1,1.2,-1],640,480,0,0);
assert.ok(near[0]-320>far[0]-320);assert.ok(near[2]>far[2]);
for(const yaw of [-Math.PI,0,Math.PI])for(const pitch of [-.25,.85])for(const f of lime('reacting').faces)for(const p of f.points)assert.ok(projectLabPoint(p,320,410,yaw,pitch,1.65).every(Number.isFinite));
console.log('PASS: '+cases+' 3D mesh/state cases; finite volumetric geometry, scope fallback and lime phase labels.');
