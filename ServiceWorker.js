const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/6d2cef5981ac75a3e9ef68cb0f67f768.loader.js",
    "Build/0d866769331db18ae1636222cb559db9.framework.js",
    "Build/4aef85ccb41e90dfab47556e8374cea2.data",
    "Build/07e8ac61fa8118bad2f6d2a2d13f613c.wasm",
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
