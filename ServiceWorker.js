const cacheName = "Fortuna-ProtoCars-0.12";
const contentToCache = [
    "Build/protocarsui.loader.js",
    "Build/a10611fdfb11636e5bd97db70124f858.js.unityweb",
    "Build/a490bbf38396e06aa489d62360805848.data.unityweb",
    "Build/07e0a6edf5cb42bcfe51e2b3ad96bc04.wasm.unityweb",
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
