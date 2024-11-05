let CACHE_NAME = 'metachat_v1';
let CACHE_URLS = [
    './offline.html',
    './assets/image/back.png',
    './assets/image/close.png',
    './assets/image/cross.png',
    './assets/image/emoji.png',
    './assets/image/loading.gif',
    './assets/image/next.png',
    './assets/image/pause.png',
    './assets/image/play.png',
    './assets/image/record.png',
    './assets/image/profile.png',
    './assets/image/send.png',
    './assets/image/top.png',
    './assets/image/user.png',
    './assets/image/stop.png',
    './assets/image/download.png',
    './assets/image/down-icon.png',
    './assets/image/chat-icon.png',
    './assets/image/Chat-GPT.png',
    './assets/image/more_vert.png',
    './assets/image/microphone.png',
    './assets/image/attachment.png',
    './assets/icon/logo_16.png',
    './assets/icon/logo_32.png',
    './assets/icon/logo_48.png',
    './assets/icon/logo_128.png',
    './assets/icon/logo_192.png',
    './assets/icon/logo_256.png',
    './assets/icon/logo_384.png',
    './assets/icon/logo_512.png',
    './assets/css/bootstrap.min.css',
    './assets/css/style.css',
    './assets/js/axios.min.js',
    './assets/js/socket.io.js',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(CACHE_URLS);
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (!(event.request.url.indexOf('http') === 0)) return;

    event.respondWith(caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function (result) {
                        return result;
                    })
                    .catch(function (error) {
                        return caches.open(CACHE_NAME)
                            .then(function (cache) {
                                return cache.match('./offline.html');
                            });
                    });
            }
        }));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
