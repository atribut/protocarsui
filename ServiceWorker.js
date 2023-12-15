const cacheName = "Fortuna-ProtoCars-0.12";
const contentToCache = [
    "Build/protocarsui.loader.js",
    "Build/b4757a1acc5cadf591931c7bb67a0518.js.unityweb",
    "Build/221c1f4ad00c9760dc3fc99024f6318f.data.unityweb",
    "Build/c50fff1cb035d77d8b5c92e8f61d9d47.wasm.unityweb",
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
