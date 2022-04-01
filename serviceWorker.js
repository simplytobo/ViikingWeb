

self.addEventListener("fetch", function(event) {  
  console.log("Hey")
  if (event.request.url.includes("google-analytics.com")) return;
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }) 
  ); 
});
  
 self.addEventListener("install", function(event) {

  event.waitUntil(
    caches.open("sw-cache").then(function(cache) {
      return //cache.add("index.html");
      //return cache.add("offline.html");
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


    

