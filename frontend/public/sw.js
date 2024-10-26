// add caching to show offline page

const CACHE_NAME = "offline-cache-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([OFFLINE_URL]);
        })
    );
});

self.addEventListener("activate", (event) => {
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
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
});

self.addEventListener("push", function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || "/favicon-48x48.png",
            badge: "/favicon-48x48.png",
            vibrate: [100, 50, 100],
            data: {
                url: data.url || "https://hoppla.ge",
            },
        };
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    // event.waitUntil(clients.openWindow(event.notification.data.url));
    event.waitUntil(
        clients
            .matchAll({
                type: "window",
                includeUncontrolled: true,
            })
            .then(function (clientList) {
                let webUrl = event.notification.data.url;
                if (webUrl) {
                    let client = null;

                    for (let i = 0; i < clientList.length; i++) {
                        let item = clientList[i];

                        if (item.url) {
                            client = item;
                            break;
                        }
                    }

                    if (client && "navigate" in client) {
                        client.focus();
                        event.notification.close();
                        return client.navigate(webUrl);
                    } else {
                        event.notification.close();
                        return clients.openWindow(webUrl);
                    }
                }
            })
    );
});

