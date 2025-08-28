const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/a05add21feccf981fdba0e45e4beb5e3.loader.js",
    "Build/8ddac94908ebbbd9e6fe8f7c43b8033f.framework.js",
    "Build/698a04cc0a8e77a2452f892bf5d4ab26.data",
    "Build/25ba5da263e452e590d8ebea97d186be.wasm",
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
