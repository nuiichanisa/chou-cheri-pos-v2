const CACHE = "chou-cheri-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([
        "/",
        "/manifest.json",
        "/favicon.ico",
        "/apple-touch-icon.png",
        "/icon-192.png",
        "/icon-512.png",
        "/logo.png",
        "/logo-header.png",
      ])
    )
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // อย่าไปยุ่งกับ Next.js internals
  if (url.pathname.startsWith("/_next/")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) return cached;

      try {
        const response = await fetch(event.request);

        if (
          response.ok &&
          url.origin === self.location.origin
        ) {
          const cache = await caches.open(CACHE);
          cache.put(event.request, response.clone());
        }

        return response;
      } catch {
        return cached;
      }
    })
  );
});