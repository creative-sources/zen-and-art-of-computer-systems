import {cacheNames, setCacheNameDetails} from 'workbox-core';
import {clientsClaim} from 'workbox-core';

let version = '1.0.0';
let isOnline = navigator.onLine ? 'online' : 'offline';
let isLoggedIn = false;

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
clientsClaim();

main().catch((error) => {
  console.error(error);
});
async function main() {
  console.log(`Service Worker (v${version}) is initializing...`);
}

setCacheNameDetails({
  prefix: 'zen-cache',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('/assets/').then(function (cache) {
      cache.addAll();
      return cache.addAll(['index.js']);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(
      (async function () {
        // Optional: Normalize the incoming URL by removing query parameters.
        // Instead of https://example.com/page?key=value,
        // use https://example.com/page when reading and writing to the cache.
        // For static HTML documents, it's unlikely your query parameters will
        // affect the HTML returned. But if you do use query parameters that
        // uniquely determine your HTML, modify this code to retain them.
        const normalizedUrl = new URL(event.request.url);
        normalizedUrl.search = '';

        // Create promises for both the network response,
        // and a copy of the response that can be used in the cache.
        const fetchResponseP = fetch(normalizedUrl);
        const fetchResponseCloneP = fetchResponseP.then((r) => r.clone());

        // event.waitUntil() ensures that the service worker is kept alive
        // long enough to complete the cache update.
        event.waitUntil(
          (async function () {
            const cache = await caches.open('my-cache-name');
            await cache.put(normalizedUrl, await fetchResponseCloneP);
          })()
        );

        // Prefer the cached response, falling back to the fetch response.
        return (await caches.match(normalizedUrl)) || fetchResponseP;
      })()
    );
  }
});

self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('Hello world!', {
      body: 'This notification was generated from a push!',
    })
  );
});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://www.google.com'));
});

self.addEventListener('message', function (event) {
  if (event.data.statusUpdateRequest) {
    onMessage(event);
  }
  console.log('[Service Worker 1] Received message:', event.data);
});

function onMessage({data}) {
  console.log(data);
  console.log(
    `Service Worker (v${version}) status update... isOnline:${isOnline}, isLoggedIn:${isLoggedIn}`
  );
}
