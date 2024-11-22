const CACHE_NAME = "app-v1";
const CACHE_ASSETS = [
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/static/css/main.chunk.css",
  "/bootstrap.min.css",
  "/index.html",
  "/",
  "/images/BG.png",
  "/images/soil.jpg",
  "/Document",
  "/video",
  "/ListFarmer",
  "/images/art.jpg",
  "/FarmerDetails",
  "/AddFromNew",
  "/images/pdf_image.png",
  "/images/svgviewer-png-output.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets during install...");
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (event.request.url.endsWith("/static/js/main.chunk.js")) {
      self.registration.showNotification("Internet Alert", {
        body: "Internet is not working",
      });
    }
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request.clone()).catch(() => {
            if (event.request.destination === "document") {
              return caches.match("/index.html");
            }
          })
        );
      })
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            //cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request))
    );
  }
});
