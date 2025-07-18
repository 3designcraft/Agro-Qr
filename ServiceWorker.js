const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/68e7ad9737e5039eca74208dd813e304.loader.js",
    "Build/f29e2aaf3e6b2c4984ed7ae2b8a2fd53.framework.js",
    "Build/d0f796dee89847496c44bb7827fe41fe.data",
    "Build/c32f1ccbed899850de07fe8d9a7e0e71.wasm",
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
