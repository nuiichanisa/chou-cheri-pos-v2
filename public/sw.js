const VERSION = "v4";

const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

const APP_SHELL = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/logo.png",
  "/logo-header.png",

  "/products/Brownies M.png",
  "/products/Brownies S.png",
  "/products/Cookies pcs.png",
  "/products/Cookies Set.png",
  "/products/Foccacia.png",
  "/products/Scone pcs.png",
  "/products/Scone Set.png",
  "/products/Shiopan Truffle.png",
  "/products/Shiopan.png",
  "/products/Smoked Frank Braid.png",
  "/products/Strawberry Jam.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(
            (key) =>
              key !== STATIC_CACHE &&
              key !== RUNTIME_CACHE
          )
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  // ========= HTML =========
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ========= NEXT STATIC =========
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // ========= Images =========
  if (
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".ico")
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // ========= CSS =========
  if (url.pathname.endsWith(".css")) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // ========= JS =========
  if (url.pathname.endsWith(".js")) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(networkFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }

  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    return caches.match("/");
  }
}