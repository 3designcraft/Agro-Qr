const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/99937965e867007532deae5bccb7c6b3.loader.js",
    "Build/cce9aac2cb91aee79597deb905e7c32e.framework.js",
    "Build/ec8da9c2ad07f7caf21e2b74e9f5a12e.data",
    "Build/cefec8d695b502de59c530c52ada6987.wasm",
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
