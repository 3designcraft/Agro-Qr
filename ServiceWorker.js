const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/f0f08b491fc429006e5a31d60981f8b9.loader.js",
    "Build/55fb92abbd018ffd4e20b0ec39f76395.framework.js",
    "Build/e9602a268f014456220f4abd839328d3.data",
    "Build/d727dd72ac0053067a5aa01ee5483bd7.wasm",
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
