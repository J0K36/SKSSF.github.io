const staticCacheName = 'site-static-v4';
const assets = [
  '/',
  '/index.html',
  '/assets/js/app.js',
  '/assets/js/bs-init.js',
  '/assets/js/jquery.min.js',
  '/assets/bootstrap/js/bootstrap.min.js',
  '/assets/css/styles.css',
  '/assets/bootstrap/css/bootstrap.min.css',
  '/assets/img/image--000.webp',
  '/assets/img/image--001.webp',
  '/assets/img/image--002.webp',
  '/assets/img/image--003.webp',
  '/assets/img/image--004.webp',
  '/assets/img/image--005.webp',
  '/assets/img/image--006.webp',
  '/assets/img/image--007.webp',
  '/assets/img/image--008.webp',
  '/assets/img/majlisunnoor icon.webp',
  '/assets/img/majlisunnoor_icon_192x192.webp',
  'https://fonts.googleapis.com/css?family=Alex+Brush',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css',
];


// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});


// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});


// fetch events
self.addEventListener('fetch', evt => {
	
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
     })
    );
});


