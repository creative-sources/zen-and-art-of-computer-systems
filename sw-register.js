const sw = 'service-worker.js'; // it is needed because parcel will not recognize this as a file and not precess in its manner

navigator.serviceWorker
  .register(sw)
  .then((registration) => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log(
              'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
            );
          } else {
            console.log('Content is cached for offline use.');
          }
        }
      };
    };
  })
  .catch((error) => {
    console.error('Error during service worker registration:', error);
  });
/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(new URL('src/service-worker.js', import.meta.url), {type: 'module'})
    .then(function (registration) {
      console.log('Service Worker Registered');
      messaging.useServiceWorker(registration);
    })
    .catch(function (err) {
      console.log('Service Worker Failed', err);
    });
}
 */
/* 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register(new URL('src/service-worker.js', import.meta.url), {type: 'module'})
      .then(
        function (registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        },
        function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        }
      );
  });
} */
/* 
const url = 'service-worker.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(new URL('service-worker.js', import.meta.url), {type: 'module'})
    .then(function (registration) {
      registration.addEventListener('updatefound', function () {
        // If updatefound is fired, it means that there's
        // a new service worker being installed.
        var installingWorker = registration.installing;
        console.log('A new service worker is being installed:', installingWorker);

        // You can listen for changes to the installing service worker's
        console.log(installingWorker.onstatechange);
      });
    })
    .catch(function (error) {
      console.log('Service worker registration failed:', error);
    });
} else {
  console.log('Service workers are not supported.');
}
 */
