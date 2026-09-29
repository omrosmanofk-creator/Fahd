const CACHE_NAME = 'ofk-academy-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/courses.html',
  '/about.html',
  '/contact.html',
  '/verify.html',
  '/login.html',
  '/manifest.json'
];

// تثبيت الخدمة التخزينية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات وتحديثها ديناميكياً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // العودة للنسخة المخزنة أو جلبها من الشبكة
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
