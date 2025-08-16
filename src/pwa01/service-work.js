const CACHE_NAME = `temperature-converter-v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll([
        "/src/pwa01/",
        "/src/pwa01/index.js",
        "/src/pwa01/index.html",
        "/src/pwa01/css/index.css",
        "/src/pwa01/images/pwa.png",
      ]);
    })()
  );
});

self.addEventListener("activate", async () => {
  // Remove old caches.
  const cacheNames = await caches.keys();
  cacheNames.forEach((name) => {
    if (name !== CACHE_NAME) {
      caches.delete(name);
    }
  });
  // Activate the service worker immediately.
  await self.clients.claim();
  // Claim clients immediately.
  //   event.waitUntil(
  //     (async () => {
  //       // Remove old caches.
  //       const cacheNames = await caches.keys();
  //       await Promise.all(
  //         cacheNames
  //           .filter((name) => name !== CACHE_NAME)
  //           .map((name) => caches.delete(name))
  //       );
  //     })()
  //   );
});

self.addEventListener("fetch", (event) => {
  //   const req = event.request;
  // 给浏览器响应
  event.respondWith(newWorkFirst(event));
});

async function newWorkFirst(event) {
  try {
    // If the resource was not in the cache, try the network.
    const fetchResponse = await fetch(event.request);

    // Save the resource in the cache and return it.
    // try {
    //   cache.put(event.request, fetchResponse.clone());
    // } catch (e) {
    //   console.error("Failed to cache the response:", e);
    // }
    return fetchResponse;
  } catch (e) {
    console.log("Network request failed, trying cache:", e);
    // The network failed.
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
}
