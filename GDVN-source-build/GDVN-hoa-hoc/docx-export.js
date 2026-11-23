/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {escapeHTML} from './chemistry.js';
function crc32(bytes){
  let crc=0xffffffff;
  for(const byte of bytes){crc^=byte;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}
  return (crc^0xffffffff)>>>0;
}
export function createDocx(title,body){
  const xml=escapeHTML;
  const paragraph=(text,heading=false)=>'<w:p>'+(heading?'<w:pPr><w:spacing w:after="240"/></w:pPr>':'')+'<w:r><w:rPr>'+(heading?'<w:b/><w:color w:val="145BC8"/><w:sz w:val="36"/>':'<w:sz w:val="24"/>')+'</w:rPr><w:t xml:space="preserve">'+xml(text)+'</w:t></w:r></w:p>';
  const files={
    '[Content_Types].xml':'<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
    '_rels/.rels':'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    'word/document.xml':'<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paragraph('GDVN · HÓA HỌC')+paragraph(title,true)+body.split('\n').map(t=>paragraph(t)).join('')+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>'
  };
  const encoder=new TextEncoder(),local=[],central=[];let offset=0;
  for(const [name,text]of Object.entries(files)){
    const nameBytes=encoder.encode(name),data=encoder.encode(text),crc=crc32(data);
    const header=new Uint8Array(30+nameBytes.length),view=new DataView(header.buffer);
    view.setUint32(0,0x04034b50,true);view.setUint16(4,20,true);view.setUint16(6,0x800,true);view.setUint32(14,crc,true);view.setUint32(18,data.length,true);view.setUint32(22,data.length,true);view.setUint16(26,nameBytes.length,true);header.set(nameBytes,30);local.push(header,data);
    const entry=new Uint8Array(46+nameBytes.length),cv=new DataView(entry.buffer);
    cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x800,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,nameBytes.length,true);cv.setUint32(42,offset,true);entry.set(nameBytes,46);central.push(entry);offset+=header.length+data.length;
  }
  const end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,central.length,true);ev.setUint16(10,central.length,true);ev.setUint32(12,central.reduce((sum,b)=>sum+b.length,0),true);ev.setUint32(16,offset,true);
  return new Blob([...local,...central,end],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}
