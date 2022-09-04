this.addEventListener('activate', function(event) {
  var cachesToKeep = ['v7.2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cachesToKeep.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v7.2');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open('v7.2');

  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
/*   const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  } */

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

/* self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
}); */

self.addEventListener('install', (event) => {
  self.skipWaiting();
/*   event.waitUntil(
    addResourcesToCache([
      '/index.html',
      '/style.css',
      '/offline.html',
    ])
  ); */
});

self.addEventListener('fetch', (event) => {
    /* if(event.request.clone().method === 'GET'){ 
      event.respondWith(
    cacheFirst({
      request: event.request,
      //preloadResponsePromise: event.preloadResponse,
      fallbackUrl: '/offline.html',
    })
  );
  } */
  if(event.request.clone().method === 'GET'){
    event.respondWith(
      // Try the cache
      
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {
          if (response.status === 404) {
            return caches.match('/offline.html');
          }
          putInCache(event.request, response.clone());
          return response
        });
      }).catch(function() {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
      })
    );
  }
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


    

