/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {pathToFileURL,fileURLToPath} from 'node:url';
import path from 'node:path';
import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
process.chdir(path.dirname(fileURLToPath(import.meta.url)));
const {build}=await import(process.env.GDVN_ESBUILD ? pathToFileURL(process.env.GDVN_ESBUILD).href : 'esbuild');
const authorBanner="/*! GDVN application code | Author: Nguyễn Thanh Vy | Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved. | Third-party libraries retain their own licenses. */\n";
const worker=authorBanner+(await build({entryPoints:['engine-worker.js'],bundle:true,minify:true,format:'iife',target:'es2020',write:false,legalComments:'inline',define:{'import.meta.url':'"https://gdvn.invalid/vendor/openchemlib.js"','import.meta.dirname':'""','import.meta.filename':'""'},logOverride:{'equals-negative-zero':'silent'}})).outputFiles[0].text;
writeFileSync('engine-worker-code.js',authorBanner+'export default '+JSON.stringify(worker)+';');
const js=authorBanner+(await build({entryPoints:['app.js'],bundle:true,minify:true,format:'iife',target:'es2020',write:false})).outputFiles[0].text;
const notices=['vendor/OPEN-CHEM-LIB-LICENSE.txt','vendor/NERDAMER-LICENSE.txt'].map(file=>readFileSync(file,'utf8')).join('\n\n');
const css=readFileSync('style.css','utf8')+'\n'+readFileSync('sky-theme.css','utf8')+'\n'+readFileSync('lab-redesign.css','utf8');
const icon='data:image/x-icon;base64,'+readFileSync('logo.ico').toString('base64');
let html=readFileSync('index.html','utf8')
  .replace(/\s*<link rel="stylesheet" href="(?:style|sky-theme|lab-redesign).css">/g,'')
  .replace(/<link rel="manifest" href="manifest.webmanifest">/,'')
  .replaceAll('href="logo.ico"','href="'+icon+'"').replaceAll('src="logo.ico"','src="'+icon+'"')
  .replace(/\s*<script type="module" src="app.js"><\/script>/,'');
html=html.replace('<html lang="vi">',()=> '<html lang="vi">\n<!-- Third-party library licenses\n'+notices.replace(/--/g,'—')+'\n-->');
html=html.replace('</head>',()=>'<style>'+css+'</style></head>')
  .replace('</body>',()=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script></body>');
mkdirSync('dist',{recursive:true});
writeFileSync('dist/gdvn.html',html);
const output=path.basename(path.dirname(process.cwd()))==='GDVN-source-build'?'../../gdvn.html':'gdvn.html';
copyFileSync('dist/gdvn.html',output);
console.log('Đã build dist/gdvn.html và cập nhật '+output+': '+Buffer.byteLength(html)+' bytes');
