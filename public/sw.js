let cacheData = "appV1";

// Install event - Caching app assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
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
      ]);
    })
  );
});

// Service Worker installation
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Sync event listener to sync data from localStorage to API
self.addEventListener("sync", (event) => {
  if (event.tag === "syncData") {
    event.waitUntil(
      // Use postMessage to send a message to the main thread
      clients.matchAll().then((clientList) => {
        clientList.forEach((client) => {
          client.postMessage({
            type: "syncData",
            data: localStorage.getItem("syncData"),
          });
        });
      })
    );
  }
});

// Listening to messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data.type === "syncData") {
    const data = event.data.data;
    if (data) {
      fetch("https://your-api-endpoint.com/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer your-token-here`, // Add your token if necessary
        },
        body: JSON.stringify(JSON.parse(data)), // Send data as JSON
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Data synced successfully:", result);
          localStorage.removeItem("syncData"); // Remove the synced data from localStorage
        })
        .catch((error) => {
          console.error("Sync failed:", error);
        });
    }
  }
});
