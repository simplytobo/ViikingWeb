




/* const cacheName = 'MyFancyCacheName_v4';
const precachedAssets = [
  '/offline.html',
  '/style.css'
]
self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
    }));
  } else {
    return;
  }
}); */
/* self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
}); */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});


 self.addEventListener("install", function(event) {

  event.waitUntil(
    caches.open("sw-cache").then(function(cache) {
      //return cache.add("index.html");
      //return cache.add("offline.html");
      // return cache.addAll(precachedAssets);
    })
  );
});

self.addEventListener("push", event => {
  console.log("Push received!");
  self.registration.showNotification("Hello world!");
});

self.addEventListener("notificationclose", function(event) {
  var notification = event.notification;
  if (notification.data) {
    var primaryKey = notification.data.primaryKey;
    if (primaryKey) {
      console.log("Closed notification: " + primaryKey);
    }
  } else {
    console.log("Closed");
  }
});

self.addEventListener("notificationclick", function(event) {
  var notification = event.notification;
  var action = event.action;
  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow("https://www.youtube.com/");
    console.log("Video");
    self.clients.matchAll().then(function(clients) {
      console.log("Explore");
      clients.forEach(function(client) {
        client.postMessage({message: "Hello from SW!!!"});        
      });
    });
  }
});


    

