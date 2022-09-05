let coreAssets = [
  '/offline.html',
  '/script.js',
  '/style.css',
  '/index.html',
  '/dark.css',
  '/dark-mode.css',
  '/feedback.js',
  '/helperScripts.js',
  '/index.html',
  '/dark.css',
  
];

// On install, cache some stuff
self.addEventListener('install', function (event) {

  // Cache core assets
  event.waitUntil(caches.open('app4').then(function (cache) {
    for (let asset of coreAssets) {
      cache.add(new Request(asset));
    }
    return cache;
  }));

});

// Listen for request events
self.addEventListener('fetch', (event) => {

  try{
    // Get the request
    let request = event.request;
  
    // Bug fix
    // https://stackoverflow.com/a/49719964
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    //Google analytics
    if (request.url.includes("google-analytics")) return
    // Handle post requests
    if (request.method.toUpperCase() === 'POST') return event.respondWith(handlePostRequest(event));
  
  
    
    // image
    // Offline-first
    if (request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('image')){
      // Handle CSS and JavaScript files...
      // Check the cache first
      // If it's not found, send the request to the network
      event.respondWith(
        caches.match(request).then(function (response) {
          return response || fetch(request).then(function (response) {
            
            let copy = response.clone();
  					event.waitUntil(caches.open('app1').then(function (cache) {
  						return cache.put(request, copy);
  					}));
            return response;
          });
        })
      );
    }
    // Network-first
    else {
      // Handle HTML and json files...
      
      // Send the request to the network first
      // If it's not found, look in the cache
      event.respondWith(
        fetch(request).then(function (response) {
          // Create a copy of the response and save it to the cache
  				let copy = response.clone();
  				event.waitUntil(caches.open('app4').then(function (cache) {
  					return cache.put(request, copy);
  				}));
          
          return response;
          
        }).catch(function (error) {
          
          return caches.match(request).then(function (response) {
            
            return response;
          });
        })
      );
      return
    }
  } catch (e) {
    return event.respondWith(new Response('Error thrown ' + e.message));
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

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert bytes to hex string
  return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}


async function handlePostRequest(event) {
  const request = event.request;
  const body = await request.clone().text();

  // Hash the request body to use it as a part of the cache key
  const hash = await sha256(body);
  const cacheUrl = new URL(request.url);

  // Store the URL in cache by prepending the body's hash
  cacheUrl.pathname = '/posts' + cacheUrl.pathname + hash;

  // Convert to a GET to be able to cache
  const cacheKey = new Request(cacheUrl.toString(), {
    headers: request.headers,
    method: 'GET',
  });

  const cache = caches.default;

  let response
  if (cache) {
    response = await cache.match(cacheKey);
  }
  // Find the cache key in the cache
  

  // Otherwise, fetch response to POST request from origin
  if (!response && cache) {
    response = await fetch(request);
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }
  return response;
}
    

