/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {escapeHTML as esc} from './chemistry.js';
const glass='#edf9ff',stroke='#1769ac';
const item=(name,group,shape)=>({name,group,shape});
export const apparatusLibrary={
beaker:item('Cốc thủy tinh','Thủy tinh','<path d="M-40-55v100q0 10 10 10h60q10 0 10-10V-55l10-5H-40z"/><path d="M-36 12h72v32q0 7-7 7h-58q-7 0-7-7z" fill="LIQUID" stroke="none"/><path d="M-36-28h13M-36-6h13M-36 16h13M-36 38h13"/>'),
flask:item('Bình tam giác','Thủy tinh','<path d="M-14-65h28v50l42 64q5 10-8 10h-96q-13 0-8-10l42-64z"/><path d="M-32 22h64l20 31H-52z" fill="LIQUID" stroke="none"/><path d="M-17-65h34"/>'),
roundflask:item('Bình cầu','Thủy tinh','<path d="M-13-70h26v44a48 48 0 1 1-26 0z"/><path d="M-43 24a44 44 0 0 0 86 0z" fill="LIQUID" stroke="none"/>'),
flatflask:item('Bình cầu đáy bằng','Thủy tinh','<path d="M-13-70h26v40q65 28 27 87h-80q-38-59 27-87z"/><path d="M-42 22h84l-6 30h-72z" fill="LIQUID" stroke="none"/>'),
tube:item('Ống nghiệm','Thủy tinh','<path d="M-17-65v102a17 17 0 0 0 34 0V-65z"/><path d="M-13 5v32a13 13 0 0 0 26 0V5z" fill="LIQUID" stroke="none"/>'),
measuring:item('Ống đong','Định lượng','<path d="M-17-65h34V52h21v9h-76v-9h21z"/><path d="M-13-8h26v58h-26z" fill="LIQUID" stroke="none"/><path d="M-15-48h12M-15-28h12M-15-8h12M-15 12h12M-15 32h12"/>'),
burette:item('Burette','Định lượng','<path d="M-9-70h18V35H-9zM-9 35h18v12l-9 18-3-18V35"/><path d="M-5-56H5v78H-5z" fill="LIQUID" stroke="none"/><path d="M-18 39h36M-16 33v12M-8-42h8M-8-25h8M-8-8h8M-8 9h8"/>'),
pipette:item('Pipette bầu','Định lượng','<path d="M-4-70h8v48q22 15 0 36v40l-4 13-4-13V14q-22-21 0-36z"/><path d="M-2-18q15 12 0 28z" fill="LIQUID" stroke="none"/>'),
dropper:item('Ống nhỏ giọt','Định lượng','<path d="M-11-35v-20a11 11 0 0 1 22 0v20z" fill="#5587b8"/><path d="M-6-35H6v72L0 55-6 37z"/><path d="M0 65q-9 12 0 16 9-4 0-16z" fill="LIQUID"/>'),
funnel:item('Phễu lọc','Tách chất','<path d="M-50-45H50L8 5v50H-8V5z"/><path d="M-40-40h80L0-5z" fill="#fff" stroke-dasharray="4 3"/>'),
sepfunnel:item('Phễu chiết','Tách chất','<path d="M-10-70h20v18q60 35 0 90v22h-20V38q-60-55 0-90z"/><path d="M-31-2h62Q15 25 7 33H-7Q-15 25-31-2z" fill="LIQUID" stroke="none"/><path d="M-21 48h42M0 60v15"/>'),
condenser:item('Sinh hàn thẳng','Tách chất','<path d="M-75-7H75V7H-75zM-52-20H52v40H-52z"/><path d="M-52-7H52V7H-52z" fill="#b7eaff"/><path d="M-38-20v-25h10v25M30 20v25h10V20"/>'),
thermometer:item('Nhiệt kế','Định lượng','<path d="M-6-57a6 6 0 0 1 12 0v91a15 15 0 1 1-12 0z"/><path d="M0-29v71" stroke="#eb3f56" stroke-width="6"/><circle cy="46" r="9" fill="#eb3f56" stroke="none"/>'),
stand:item('Giá đỡ & kẹp','Giá & nguồn nhiệt','<path d="M-40 62h80v8h-80z" fill="#7590a6"/><path d="M-20 62V-65M-20-20h67M35-30v20M47-30v20" fill="none" stroke-width="6"/>'),
tripod:item('Kiềng ba chân','Giá & nguồn nhiệt','<ellipse cy="-24" rx="42" ry="12" fill="none"/><path d="M-32-16l-16 76M32-16l16 76M0-12v70" stroke-width="5"/>'),
wiregauze:item('Lưới tản nhiệt','Giá & nguồn nhiệt','<path d="M-50-18H50V18H-50z" fill="#cbd9df"/><path d="M-40-18v36M-25-18v36M-10-18v36M5-18v36M20-18v36M35-18v36M-50-8H50M-50 3H50M-50 12H50" stroke-width="1"/>'),
burner:item('Đèn Bunsen','Giá & nguồn nhiệt','<ellipse cy="55" rx="35" ry="10" fill="#6a849c"/><path d="M-9 52V-8H9v60z" fill="#9db0bf"/><path d="M0-63q-31 45 0 53 31-8 0-53z" fill="#3abaff"/><path d="M0-38q-12 23 0 27 12-4 0-27z" fill="#d7f7ff"/>'),
spiritlamp:item('Đèn cồn','Giá & nguồn nhiệt','<path d="M-28 5h56l10 45q0 15-38 15t-38-15z"/><path d="M-11-8h22V8h-22z" fill="#7894a9"/><path d="M0-50q-24 30 0 39 24-9 0-39z" fill="#ffad3b"/>'),
hotplate:item('Bếp điện','Giá & nguồn nhiệt','<rect x="-52" y="-5" width="104" height="49" rx="9" fill="#aec4d8"/><ellipse cy="-6" rx="45" ry="12" fill="#4b657e"/><circle cx="25" cy="24" r="9" fill="#e6f6ff"/>'),
balance:item('Cân điện tử','Định lượng','<path d="M-38-10h76v13h-76z" fill="#b9d2e5"/><rect x="-52" y="10" width="104" height="48" rx="8" fill="#bed5e8"/><rect x="-30" y="23" width="60" height="22" rx="3" fill="#e5ffe7"/><text y="39" text-anchor="middle" font-size="14" fill="#153c67" stroke="none">0.00 g</text>'),
watchglass:item('Kính đồng hồ','Thủy tinh','<path d="M-55-4Q0 44 55-4Q0 12-55-4z"/>'),
evapdish:item('Chén cô cạn','Tách chất','<path d="M-50-15Q-42 50 0 50T50-15z" fill="#fff7e5"/><ellipse cy="-15" rx="50" ry="12" fill="LIQUID"/>'),
crucible:item('Chén nung','Thủy tinh','<path d="M-30-20h60L20 43h-40z" fill="#fff4dc"/><path d="M-37-25Q0-42 37-25z" fill="#fff4dc"/>'),
gasjar:item('Bình thu khí','Thủy tinh','<path d="M-31-60h62V60h-62z"/><path d="M-36-63h72"/><path d="M-25 20h50v35h-50z" fill="LIQUID" opacity=".4" stroke="none"/>'),
trough:item('Chậu nước','Thủy tinh','<path d="M-70-18v61q0 14 12 14H58q12 0 12-14V-18"/><path d="M-65 4H65v37q0 10-10 10H-55q-10 0-10-10z" fill="LIQUID" opacity=".65" stroke="none"/>'),
delivery:item('Ống dẫn khí','Kết nối','<path d="M-65 45V-30H65v75" fill="none" stroke-width="9"/><path d="M-65 45V-30H65v75" fill="none" stroke="#d6f6ff" stroke-width="4"/>'),
stopper:item('Nút cao su','Kết nối','<path d="M-30-15h60L22 24h-44z" fill="#a6b0bc"/><path d="M0-15v39" stroke="#e6f6ff"/>'),
electrode:item('Điện cực','Điện học','<rect x="-8" y="-50" width="16" height="105" rx="3" fill="#607a92"/><path d="M0-50v-23h45" fill="none" stroke="#ec4a59" stroke-width="4"/>'),
battery:item('Nguồn điện','Điện học','<rect x="-50" y="-25" width="100" height="67" rx="9" fill="#b4d2ed"/><circle cx="-25" cy="9" r="11" fill="#fc687b"/><circle cx="25" cy="9" r="11" fill="#5695db"/><path d="M-25 3v12M-31 9h12M19 9h12" stroke="white"/>'),
arrow:item('Mũi tên','Chú thích','<path d="M-58 0H58M42-14 58 0 42 14" fill="none" stroke="LIQUID" stroke-width="4"/>'),
label:item('Nhãn chữ','Chú thích','<text y="8" text-anchor="middle" fill="LIQUID" font-family="Arial,sans-serif" font-size="22" stroke="none">LABEL</text>'),
waterbath:item('Bể cách thủy','Giá & nguồn nhiệt','<rect x="-62" y="-20" width="124" height="78" rx="10" fill="#a4cadf"/><path d="M-56-15H56v42H-56z" fill="LIQUID"/><circle cx="34" cy="44" r="7" fill="#ee596d"/><path d="M-30-38q-10-8 0-17M0-38q-10-8 0-17M30-38q-10-8 0-17" fill="none"/>'),
magnet:item('Nam châm','Dụng cụ khác','<path d="M-35-40v50a35 35 0 0 0 70 0V-40H15v50a15 15 0 0 1-30 0V-40z" fill="#e85368"/><path d="M-35-40h20v20h-20zM15-40h20v20H15z" fill="#80b8e7"/>'),
filterpaper:item('Giấy lọc','Tách chất','<circle r="46" fill="#fffef2"/><path d="M-33-33 33 33M33-33-33 33" stroke-dasharray="5 4"/>')
};
export const apparatusKeys=Object.keys(apparatusLibrary);
export function apparatusMarkup(item){const entry=apparatusLibrary[item.type];if(!Object.hasOwn(apparatusLibrary,item.type))throw Error('Dụng cụ không hợp lệ.');return '<g fill="'+glass+'" stroke="'+stroke+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">'+entry.shape.replaceAll('LIQUID',item.color||'#36aef1').replaceAll('LABEL',esc(item.label||'Nhãn'))+'</g>';}
const node=(type,x,y,extra={})=>({type,x,y,scale:1,angle:0,flip:false,color:'#36aef1',label:'',...extra});
const label=(text,x,y)=>node('label',x,y,{label:text,color:'#164c7c'});
export const studioTemplates=[
{id:'blank',name:'Trang trắng',note:'Tự thêm dụng cụ từ thư viện.',items:[]},
{id:'neutral',name:'Trung hòa axit – bazơ',note:'Sơ đồ minh họa hai dung dịch được đưa vào cùng một cốc.',items:[node('beaker',260,330,{color:'#ff8b9b'}),node('beaker',510,330),node('arrow',690,330),node('beaker',890,330,{color:'#b4d8ee'}),label('Axit',260,440),label('Bazơ',510,440),label('Dung dịch sau phản ứng',890,440)]},
{id:'filtration',name:'Lọc kết tủa',note:'Giấy lọc nằm trong phễu, dung dịch lọc được hứng ở bình phía dưới.',items:[node('stand',420,310,{scale:1.7}),node('funnel',580,260,{scale:1.2}),node('flask',580,442),node('beaker',790,180,{angle:-35}),label('Hỗn hợp',850,110),label('Giấy lọc trong phễu',790,275),label('Dung dịch lọc',790,475)]},
{id:'distillation',name:'Chưng cất đơn giản',note:'Sơ đồ bố trí minh họa. Nước làm mát vào đầu thấp và ra đầu cao của sinh hàn; không dùng sơ đồ này để suy ra quy trình vận hành thực tế.',items:[node('hotplate',290,490),node('roundflask',290,375),node('thermometer',290,210),node('delivery',382,260,{scale:.8}),node('condenser',560,290,{scale:1.7,angle:17}),node('flask',815,440),label('Nước ra (đầu cao)',480,160),label('Nước vào (đầu thấp)',715,365),label('Dịch cất',850,540)]},
{id:'titration',name:'Chuẩn độ axit – bazơ',note:'Burette phía trên bình tam giác; các vị trí chỉ là hình minh họa.',items:[node('stand',420,330,{scale:2}),node('burette',600,250,{scale:1.7}),node('flask',600,487,{color:'#f5a1bf'}),label('Dung dịch chuẩn',850,200),label('Dung dịch cần chuẩn độ',850,490)]},
{id:'extraction',name:'Chiết lỏng – lỏng',note:'Phễu chiết đặt trên giá, bình hứng ở dưới khóa phễu.',items:[node('stand',420,320,{scale:1.8}),node('sepfunnel',600,270,{scale:1.6,color:'#f3bc6d'}),node('beaker',600,480),label('Phễu chiết',850,260),label('Bình hứng',850,490)]},
{id:'gas',name:'Thu khí qua nước',note:'Sơ đồ nguyên lý thu khí ít tan trong nước; không áp dụng cho mọi loại khí.',items:[node('flask',230,390),node('stopper',230,320,{scale:.55}),node('delivery',435,290,{scale:2.1}),node('trough',780,465,{scale:1.8}),node('gasjar',780,390,{angle:180}),label('Bình tạo khí',230,520),label('Nước',1000,485)]},
{id:'evaporation',name:'Cô cạn dung dịch',note:'Chén cô cạn trên kiềng và lưới tản nhiệt; hình minh họa bố trí.',items:[node('burner',570,490),node('tripod',570,385,{scale:1.35}),node('wiregauze',570,350,{scale:1.2}),node('evapdish',570,310,{color:'#67b7df'}),label('Chén cô cạn',850,300),label('Nguồn nhiệt',850,490)]},
{id:'electrolysis',name:'Sơ đồ điện phân',note:'Hai điện cực nối nguồn điện một chiều; hình chưa mô phỏng sản phẩm điện cực.',items:[node('battery',570,180),node('beaker',570,430,{scale:2}),node('electrode',530,350),node('electrode',610,350,{flip:true}),label('Dung dịch điện li',870,450),label('Nguồn DC',820,180)]},
{id:'waterbath',name:'Đun cách thủy',note:'Ống nghiệm đặt trong bể cách thủy.',items:[node('waterbath',580,425,{scale:2}),node('tube',550,290,{color:'#f7ba79'}),node('thermometer',645,290),label('Bể cách thủy',900,440)]},
{id:'heattube',name:'Đun ống nghiệm',note:'Sơ đồ minh họa dụng cụ và nguồn nhiệt, không phải hướng dẫn thao tác.',items:[node('stand',420,350,{scale:1.7}),node('tube',580,305,{angle:-28,color:'#e4b977'}),node('burner',625,455),label('Ống nghiệm',850,300),label('Nguồn nhiệt',850,455)]},
{id:'measure',name:'Đo thể tích & khối lượng',note:'Minh họa các dụng cụ đo; pipette, burette và ống đong có mục đích sử dụng khác nhau.',items:[node('balance',270,400,{scale:1.3}),node('measuring',550,350,{scale:1.5}),node('pipette',820,320,{scale:1.5}),label('Cân điện tử',270,530),label('Ống đong',550,530),label('Pipette bầu',820,530)]}
];
export function validateStudio(input){
 if(!input||input.version!==2||!Array.isArray(input.items)||input.items.length>150)throw Error('Tệp sơ đồ cần đúng định dạng GDVN v2, tối đa 150 mục.');
 const items=input.items.map((raw,index)=>{if(!raw||!Object.hasOwn(apparatusLibrary,raw.type))throw Error('Dụng cụ không được hỗ trợ.');for(const k of ['x','y','scale','angle'])if(!Number.isFinite(raw[k]))throw Error('Thông số sơ đồ không hợp lệ.');if(raw.x<0||raw.x>1200||raw.y<0||raw.y>720||raw.scale<.2||raw.scale>3||Math.abs(raw.angle)>3600)throw Error('Thông số nằm ngoài giới hạn.');return {id:'item-'+index,type:raw.type,x:raw.x,y:raw.y,scale:raw.scale,angle:raw.angle,flip:!!raw.flip,color:/^#[0-9a-f]{6}$/i.test(raw.color)?raw.color:'#36aef1',label:String(raw.label||'').slice(0,120)};});
 return {version:2,width:1200,height:720,title:String(input.title||'Sơ đồ thí nghiệm GDVN').slice(0,120),items};
}
export function templateScene(id){const template=studioTemplates.find(t=>t.id===id);if(!template)throw Error('Không tìm thấy mẫu.');return validateStudio({version:2,title:template.name,items:template.items});}
