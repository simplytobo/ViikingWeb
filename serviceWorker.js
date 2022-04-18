const deleteCache = async key => {
  await caches.delete(key)
}

const deleteOldCaches = async () => {
   const cacheKeepList = ['v4'];
   const keyList = await caches.keys()
   const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
   await Promise.all(cachesToDelete.map(deleteCache));
}

self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches());
});

const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v4');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open('v4');

  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

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

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      '/index.html',
      '/style.css',
      '/offline.html',
      '/images/viking-logo-Transparent.png'
    ])
  );
});

self.addEventListener('fetch', (event) => {
    if((event.request.url.indexOf('http') === 0)){ 
      console.log('hey ffrom');
      event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: '/offline.html',
    })
  );
  }

});



/* self.addEventListener('fetch', function(event) {
  console.info("hey form service;")
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
}); */

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


    

