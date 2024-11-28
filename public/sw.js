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
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
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
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        if (event.request.method === "GET" && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        console.error(
          "Fetch failed, serving cached content if available:",
          error
        );
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        if (event.request.destination === "document") {
          return caches.match("/offline.html");
        }

        return new Response("Network error and no cache available.", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }
    })()
  );
});

// self.addEventListener("sync", (event) => {
//   if (event.tag === "sync-data") {
//     event.waitUntil(syncData());
//   }
// });

// const saveFarmersToStorage = (farmers) => {
//   localStorage.setItem("farmer", JSON.stringify(farmers));
// };
// const getFarmersFromStorage = async () => {
//   const storedFarmers = localStorage.getItem("farmer");
//   return storedFarmers ? JSON.parse(storedFarmers) : [];
// };

// const syncDataOneByOne = async () => {
//   const allFarmers = await getFarmersFromStorage();
//   const unsyncedFarmers = allFarmers.filter((farmer) => farmer.synced === 0);

//   for (let i = 0; i < unsyncedFarmers.length; i++) {
//     const farmer = unsyncedFarmers[i];
//     const { synced, ...farmerData } = farmer;
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       const response = await axios.post(
//         "http://traningl.indevconsultancy.in/pwa-blog-api/farmer_insert.php",
//         farmerData
//       );
//       console.log(response);
//       console.log(
//         `${i + 1} synced successfully out of ${unsyncedFarmers.length} name: ${
//           unsyncedFarmers.name
//         } `
//       );
//     } catch (error) {
//       console.error(`Failed to sync farmer ${farmer.farmerName}`, error);
//     }
//   }
//   saveFarmersToStorage(allFarmers);
//   setLoading(false);
// };

// async function syncData() {
//   try {
//     await syncDataOneByOne();
//     console.log(response);
//     console.log("Background sync complete!");
//   } catch (error) {
//     console.error("Background sync failed:", error);
//   }
// }
