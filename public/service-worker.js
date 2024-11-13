const CACHE_NAME = "my-cache";
const CACHE_ASSETS = [
  "/", // Homepage
  "/index.html", // HTML file
  "/styles.css", // CSS file
  "/main.js", // JS file
  "/logo.png", // Example image, add your assets here
];

// Install event: Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Activate event: Remove old caches if any
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve assets from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the resource is cached, return it; otherwise, fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
