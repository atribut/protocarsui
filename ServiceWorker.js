const cacheName = "Fortuna-ProtoCars-0.12";
const contentToCache = [
    "Build/protocarsui.loader.js",
    "Build/1ebe57935a9849af236cd0577c419731.js.unityweb",
    "Build/e074557658a945e800febfa9a5a57cf3.data.unityweb",
    "Build/f5c47e8d1fdae6e3f0894dcd8d302fc3.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
