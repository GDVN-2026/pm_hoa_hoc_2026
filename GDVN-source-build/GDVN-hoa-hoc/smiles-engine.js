/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {Molecule,ConformerGenerator,Resources} from './vendor/openchemlib.js';
import resources from './vendor/ocl-resources.js';
let registered=false;
export function smilesModel(input,seed=42){
  const smiles=String(input).trim();
  if(!smiles||smiles.length>1000)throw Error('Nhập SMILES từ 1 đến 1000 ký tự.');
  let mol;
  try{mol=Molecule.fromSmiles(smiles);}catch{throw Error('SMILES không hợp lệ. Kiểm tra ký hiệu nguyên tử, nhánh và số vòng.');}
  if(mol.getAllAtoms()<1||mol.getAllAtoms()>80)throw Error('Hỗ trợ phân tử có 1–80 nguyên tử trước khi thêm H.');
  const formula=mol.getMolecularFormula();
  const info={formula:formula.formula,mass:formula.relativeWeight,smiles:mol.toSmiles()};
  const svg=mol.toSVG(700,300,'gdvn-molecule');
  if(!registered){Resources.register(resources);registered=true;}
  const generator=new ConformerGenerator(seed);
  let conformer;
  try{conformer=generator.getOneConformerAsMolecule(mol);}catch{throw Error('Không dựng được cấu dạng 3D cho phân tử này.');}
  if(!conformer)throw Error('Không tìm được cấu dạng 3D. Thử SMILES phân tử nhỏ hơn hoặc một cấu tử riêng.');
  const atoms=Array.from({length:mol.getAllAtoms()},(_,i)=>[mol.getAtomLabel(i),mol.getAtomX(i),mol.getAtomY(i),mol.getAtomZ(i)]);
  const center=[1,2,3].map(k=>atoms.reduce((sum,a)=>sum+a[k],0)/atoms.length);
  atoms.forEach(a=>center.forEach((c,k)=>a[k+1]-=c));
  if(atoms.some(a=>a.slice(1).some(x=>!Number.isFinite(x))))throw Error('Tọa độ 3D không hợp lệ.');
  const bonds=Array.from({length:mol.getAllBonds()},(_,i)=>[mol.getBondAtom(0,i),mol.getBondAtom(1,i),Math.max(1,mol.getBondOrder(i))]);
  return {...info,atoms,bonds,svg,molfile:mol.toMolfile()};
}
export function modelXYZ(model){
  return model.atoms.length+'\nGDVN '+(model.formula||'model')+'; coordinates in angstrom\n'+model.atoms.map(([s,...coords])=>s+' '+coords.map(v=>v.toFixed(6)).join(' ')).join('\n')+'\n';
}
