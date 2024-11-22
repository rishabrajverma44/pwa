const CACHE_VERSION = "v2";
const CACHE_NAME = `PWA-${CACHE_VERSION}`;
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
  event.respondWith(
    (async () => {
      const url = new URL(event.request.url);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return fetch(event.request);
      }

      try {
        const networkResponse = await fetch(event.request);

        const networkResponseClone = networkResponse.clone();

        if (event.request.method === "GET" && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponseClone);
        }

        return networkResponse;
      } catch (error) {
        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) {
          return cachedResponse;
        }

        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }

        return new Response(
          "Network request failed and no cached data available.",
          { status: 503 }
        );
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.destination === "image" ||
    event.request.destination === "document"
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            const networkResponseClone = networkResponse.clone();
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              const networkResponseClone = networkResponse.clone();
              if (networkResponse.status === 200) {
                cache.put(event.request, networkResponseClone);
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
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
  }
});
