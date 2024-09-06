importScripts('image-list.js');

const cacheName = 'image-cache-v1';

// Cache all the gallery image URLs during installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      const imageUrls = Gallery.images.map((image) => image.url); // Get image URLs
      return cache.addAll(imageUrls);
    })
  );
});

// Fetch from cache first, then fallback to the network if not cached
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
