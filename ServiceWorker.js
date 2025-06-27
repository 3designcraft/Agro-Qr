const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/99937965e867007532deae5bccb7c6b3.loader.js",
    "Build/cce9aac2cb91aee79597deb905e7c32e.framework.js",
    "Build/28a3e6e628978f3197c6cf280a1ac959.data",
    "Build/8143d7b3240268b98f713a2abded2b1d.wasm",
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
