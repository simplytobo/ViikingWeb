
  


/* function displayNotification() {
   let date = new Date("03/23/2022 12:30");
  let date2 = new Date("03/23/2022 12:15");
  if (Notification.permission == 'granted') {
  console.log(date);
      navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'SÖÖMA!',
        icon: 'images/e-viikinglogo.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: date,
          primaryKey: 1
        }
      };
      reg.showNotification('SÖÖMA!', options);
    });
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'SÖÖMA!',
        icon: 'images/e-viikinglogo.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: date2,
          primaryKey: 1
        }
      };
      reg.showNotification('SÖÖMA!', options);
    });
  }
}
displayNotification() */