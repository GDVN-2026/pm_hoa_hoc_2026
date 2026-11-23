/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
export const orbitalTypes=[['1s',1,0,'s'],['2s',2,0,'s'],['2px',2,1,'px'],['2py',2,1,'py'],['2pz',2,1,'pz'],['3s',3,0,'s'],['3px',3,1,'px'],['3py',3,1,'py'],['3pz',3,1,'pz'],['3dxy',3,2,'dxy'],['3dxz',3,2,'dxz'],['3dyz',3,2,'dyz'],['3dx2-y2',3,2,'dx2-y2'],['3dz2',3,2,'dz2']];
const factorial=n=>n<2?1:n*factorial(n-1);
export function radial(n,l,r,z=1){
 if(!Number.isInteger(n)||n<1||n>3||!Number.isInteger(l)||l<0||l>=n||!(r>=0)||!Number.isFinite(r)||!Number.isFinite(z)||z<=0)throw Error('Tham số orbital không hợp lệ.');
 const rho=2*z*r/n,k=n-l-1,alpha=2*l+1;
 const laguerre=k===0?1:k===1?1+alpha-rho:((alpha+2)*(alpha+1)-2*(alpha+2)*rho+rho*rho)/2;
 return Math.sqrt((2*z/n)**3*factorial(k)/(2*n*factorial(n+l)))*Math.exp(-rho/2)*rho**l*laguerre;
}
export function wavefunction(type,x,y,z,charge=1){
 const orbital=orbitalTypes.find(o=>o[0]===type);if(!orbital)throw Error('Orbital chưa hỗ trợ.');
 const [,n,l,shape]=orbital,r=Math.hypot(x,y,z),r2=r*r;if(r===0)return l===0?radial(n,l,0,charge)/Math.sqrt(4*Math.PI):0;
 const angular=shape==='s'?1/Math.sqrt(4*Math.PI):shape==='px'?Math.sqrt(3/(4*Math.PI))*x/r:shape==='py'?Math.sqrt(3/(4*Math.PI))*y/r:shape==='pz'?Math.sqrt(3/(4*Math.PI))*z/r:shape==='dz2'?Math.sqrt(5/(16*Math.PI))*(3*z*z-r2)/r2:shape==='dx2-y2'?Math.sqrt(15/(16*Math.PI))*(x*x-y*y)/r2:Math.sqrt(15/(4*Math.PI))*(shape==='dxy'?x*y:shape==='dxz'?x*z:y*z)/r2;
 return radial(n,l,r,charge)*angular;
}
export function orbitalCloud({type='2pz',charge=1,count=6500,seed=42}={}){
 if(!Number.isInteger(charge)||charge<1||charge>10)throw Error('Z của ion một electron phải từ 1 đến 10.');
 if(!Number.isInteger(count)||count<1000||count>12000)throw Error('Số điểm từ 1000 đến 12000.');
 const orbital=orbitalTypes.find(o=>o[0]===type);if(!orbital)throw Error('Orbital chưa hỗ trợ.');
 const [,n,l]=orbital,extent=4.5*n*n/charge,size=48,step=2*extent/size,cdf=new Float64Array(size**3);let total=0;
 for(let i=0;i<cdf.length;i++){const x=(i%size+.5)*step-extent,y=(Math.floor(i/size)%size+.5)*step-extent,z=(Math.floor(i/(size*size))+.5)*step-extent;const psi=wavefunction(type,x,y,z,charge);total+=psi*psi;cdf[i]=total;}
 let state=seed>>>0;const random=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
 const points=[];
 for(let p=0;p<count;p++){const target=random()*total;let lo=0,hi=cdf.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(cdf[mid]<target)lo=mid+1;else hi=mid;}const i=lo,x=(i%size+random())*step-extent,y=(Math.floor(i/size)%size+random())*step-extent,z=(Math.floor(i/(size*size))+random())*step-extent;points.push([x,y,z,wavefunction(type,x,y,z,charge)>=0?1:-1]);}
 const curve=Array.from({length:401},(_,i)=>{const r=extent*i/400;return [r,r*r*radial(n,l,r,charge)**2];});
 return {type,n,l,charge,extent,points,curve,radialNodes:n-l-1,angularNodes:l,energy:-13.605693*charge*charge/(n*n),gridProbability:total*step**3};
}
