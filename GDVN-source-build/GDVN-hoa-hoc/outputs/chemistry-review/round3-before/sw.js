/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
const CACHE='gdvn-local-v41';
const FILES=['./physical-chemistry.js','./lab-domain.js','./titration.js','./curriculum-context.js','./lab-preparation.js','./lab-scenes.js','./reference-ui.js','./teaching-core.js','./teaching-ui.js','./learning-paths.js','./ui-kit.js','./tool-catalog.js','./navigation.js','./structure-model.js','./structure-ui.js','./studio-library.js','./studio-ui.js','./lab-data.js','./lab-ui.js','./atomic-ui.js','./quantum.js','./cloud-view.js','./periodic-data.js','./icons.js','./sky-theme.css','./dashboard.js','./logo.ico','./advanced-ui.js','./engine-client.js','./engine-worker-code.js','./','./index.html','./style.css','./app.js','./modules.js','./reactions-ui.js','./learning-ui.js','./drawing-ui.js','./visuals.js','./chemistry.js','./data.js','./docx-export.js','./stoichiometry.js','./stoichiometry-ui.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gdvn-local-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!FILES.some(file=>new URL(file,self.registration.scope).href===url.href))return;
  event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}return response;}).catch(()=>caches.match(event.request)));
});


