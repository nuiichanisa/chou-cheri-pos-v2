const CACHE_NAME = "chou-pos-v1";

const APP_SHELL = [
  "/",
  "/manifest.json",
  "/logo.png",
  "/logo-header.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) return cached;

      try {
        const response = await fetch(event.request);

        // cache เฉพาะไฟล์จากเว็บเรา
        if (event.request.url.startsWith(self.location.origin)) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }

        return response;
      } catch {
        // ถ้าเป็นการเข้าเว็บตอนออฟไลน์
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }

        return new Response("", {
          status: 503,
          statusText: "Offline",
        });
      }
    })
  );
});