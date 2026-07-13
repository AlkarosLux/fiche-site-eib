const CACHE='fiche-site-eib-v8';
const ASSETS=['./','./index.html','./styles.css','./fix-v5.css','./app.js?v=7','./docx-lib.js?v=4','./manifest.webmanifest?v=8','./icon.svg','./icon-180.png?v=8','./icon-192.png?v=8','./icon-512.png?v=8'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match('./index.html'))))});
