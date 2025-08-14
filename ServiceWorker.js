const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/a795702430f466a5b27c24a084864d0a.loader.js",
    "Build/9318b5ce71803d98e0c6402291a13be6.framework.js",
    "Build/999f22f2b7bf839ee8e5894309acb5c1.data",
    "Build/749714098ca1f1f479f5664f271751cb.wasm",
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
