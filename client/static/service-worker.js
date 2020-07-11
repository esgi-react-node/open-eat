const CACHE_NAME = "0.0.0";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/robots.txt",
    "/restaurants",
    "/order",
    "/orders",
    "/comments",
    "/comment",
    "/cloud_off-24px.svg",
    "/icon-192x192.png",
    "/icon-192x192.webp",
    "/icon-512x512.png",
    "/icon-trash.svg",
    "/manifest.json",
    "/pates.jpg",
    "/pizza.jpg",
    "/main.css",
    "/app.js",
    "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-auth.min.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js"
];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        console.log(`Successfully opened cache named "${CACHE_NAME}".`);

        return cache.addAll(FILES_TO_CACHE).then(() => {
            console.log("Successfully cached files.");
        }).catch(error => {
            console.log("Failed to cache files.");
            console.log(error);
        });
    }).catch(error => {
        console.log(`Failed to open cache named "${CACHE_NAME}".`);
        console.log(error);
    }));
});

self.addEventListener("fetch", event => {
    event.respondWith(fetch(event.request).catch(() => {
        return caches.match(event.request);
    }));
});

self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(cacheNames => {
        const cacheNamesToDelete = cacheNames.filter(cacheName => cacheName !== CACHE_NAME);
        const cacheNamesDeleted = cacheNamesToDelete.map(cacheName => caches.delete(cacheName));

        Promise.all(cacheNamesDeleted);
    }));
});
