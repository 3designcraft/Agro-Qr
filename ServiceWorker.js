const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/cdd573b4b3a7b1ba378c1f96d8e51313.loader.js",
    "Build/8ddac94908ebbbd9e6fe8f7c43b8033f.framework.js",
    "Build/0d41d25965df58198554cc887b23ad4d.data",
    "Build/2be85c144e7d8537f561919b49b209c6.wasm",
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
