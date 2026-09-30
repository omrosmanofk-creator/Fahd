const CACHE_NAME = 'ofk-academy-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/courses.html',
  '/verify.html',
  '/login.html',
  '/about.html',
  '/contact.html',
  '/manifest.json'
];

// تثبيت الـ Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل الـ Service Worker وتطهير الكاش القديم إن وجد
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// اعتراض الطلبات لجلب الملفات من الكاش أو الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // العثور على الملف في الكاش أو طلبه من الشبكة
        return response || fetch(event.request);
      })
  );
});
