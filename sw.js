const CACHE_NAME = 'zoolingo-v7-content-update';

// Initial assets to cache immediately
const PRE_CACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg'
];

self.addEventListener('install', (event) => {
  // Force this new service worker to become the active one
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRE_CACHE_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Take control of all pages immediately
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('Deleting old cache:', cache);
              return caches.delete(cache);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // STRATEGY: Stale-While-Revalidate for local, Cache-First for external libs
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. If found in cache, return it immediately (fastest)
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. If not in cache, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Validation: Must be a valid response
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // 3. Cache Logic
        const isSameOrigin = url.origin === self.location.origin;
        const isExternalDependency = 
            url.hostname === 'esm.sh' ||
            url.hostname === 'cdn.tailwindcss.com';

        // Cache local files and specific external libraries
        if (isSameOrigin || isExternalDependency) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            try {
              cache.put(event.request, responseToCache);
            } catch (err) {
              console.warn('Cache put error:', err);
            }
          });
        }

        return networkResponse;
      }).catch((error) => {
        console.log('Fetch failed (offline):', event.request.url);
      });
    })
  );
});