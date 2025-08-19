const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/8542ae01798e8cefa7268e8b661a3677.loader.js",
    "Build/8ddac94908ebbbd9e6fe8f7c43b8033f.framework.js",
    "Build/fcc9bba85f4653623cc35d7bd9288eeb.data",
    "Build/5fe3c8584b7cb5de5702eee995b6cefc.wasm",
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
