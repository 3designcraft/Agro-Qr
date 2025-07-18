const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/415aa3a79af792f5bd9913d64f10fbd3.loader.js",
    "Build/f29e2aaf3e6b2c4984ed7ae2b8a2fd53.framework.js",
    "Build/25ec647aca562f0c2f44426004a43c98.data",
    "Build/2578c17cefddbafa1b87d094254e8e24.wasm",
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
