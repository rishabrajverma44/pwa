let cacheData = "appV1";

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
