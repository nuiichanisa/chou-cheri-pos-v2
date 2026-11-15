
const CACHE_NAME = "chou-pos-v3";

const APP_SHELL = [
  "/",
  "/manifest.json",
  "/logo.png",
  "/logo-header.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

// ติดตั้ง Service Worker และเตรียมไฟล์สำหรับ Offline
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

// เปิดใช้งานเวอร์ชันใหม่และลบ Cache เก่า
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      await Promise.all(
        cacheNames
          .filter(
            (name) =>
              name.startsWith("chou-pos-") && name !== CACHE_NAME
          )
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();
    })
  );
});

// ดึงข้อมูลใหม่จาก Network และใช้ Cache เมื่อ Offline
async function networkFirst(request, fallbackUrl = null) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response.ok && response.type === "basic") {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await caches.match(request);

    if (cached) return cached;

    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl);
      if (fallback) return fallback;
    }

    return new Response("", {
      status: 503,
      statusText: "Offline",
    });
  }
}

// ไฟล์ Next.js แบบ Hash ไม่เปลี่ยนชื่อเมื่อเนื้อหาเดิม
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) return cached;

  try {
    const response = await fetch(request);

    if (response.ok && response.type === "basic") {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return new Response("", {
      status: 503,
      statusText: "Offline",
    });
  }
}

// จัดการ Request
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // ไม่ยุ่งกับเว็บไซต์ภายนอก
  if (url.origin !== self.location.origin) return;

  // ไม่ Cache API และข้อมูล Dynamic ของ Next.js
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/data/") ||
    url.pathname.startsWith("/_next/image") ||
    url.searchParams.has("_rsc") ||
    request.headers.has("RSC")
  ) {
    return;
  }

  // หน้าเว็บ: Network-first
  if (request.mode === "navigate") {
    event.respondWith(
      networkFirst(request, "/")
    );
    return;
  }

  // Next.js Build Assets แบบ Hash: Cache-first
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // รูปสินค้า: Network-first เพื่อรับรูปเวอร์ชันล่าสุด
  if (url.pathname.startsWith("/products/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // ไฟล์ Static ที่จำเป็นต่อ POS
  if (
    url.pathname === "/manifest.json" ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff2")
  ) {
    event.respondWith(networkFirst(request));
  }
});
