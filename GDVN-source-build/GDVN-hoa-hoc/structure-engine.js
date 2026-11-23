/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {Molecule} from './vendor/openchemlib.js';
import {validateStructure,structureInfo} from './structure-model.js';
export function structureToSmiles(input){
 const graph=validateStructure(input),info=structureInfo(graph);if(!graph.atoms.length)throw Error('Chưa có nguyên tử.');if(info.invalid.length)throw Error('Sửa nguyên tử vượt hóa trị trước khi xem 3D.');if(info.components!==1)throw Error('Nối thành một phân tử trước khi xem 3D.');
 const molecule=new Molecule(graph.atoms.length,graph.bonds.length);
 for(const atom of graph.atoms){const index=molecule.addAtom(Molecule.getAtomicNoFromLabel(atom.symbol));molecule.setAtomX(index,atom.x/60);molecule.setAtomY(index,-atom.y/60);}
 for(const[a,b,n]of graph.bonds){const index=molecule.addBond(a,b);molecule.setBondType(index,[null,Molecule.cBondTypeSingle,Molecule.cBondTypeDouble,Molecule.cBondTypeTriple][n]);}
 molecule.ensureHelperArrays(Molecule.cHelperParities);
 return {smiles:molecule.toSmiles(),formula:info.formula};
}
