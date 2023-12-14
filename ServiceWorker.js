const cacheName = "Fortuna-ProtoCars-0.12";
const contentToCache = [
    "Build/protocarsui.loader.js",
    "Build/75630e1e16af4000b432fbe51145e931.js.unityweb",
    "Build/31ca7acb7621012d55d0e7221303dd4a.data.unityweb",
    "Build/fb6ed37cbe68c7864efed50dfd7a50e5.wasm.unityweb",
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
