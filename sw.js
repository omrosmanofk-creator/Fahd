self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('ofk-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/student-portal.html',
        '/instructor-portal.html',
        '/admin-portal.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
