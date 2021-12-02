import {store$} from './store';

import vdom from './vdom';

import {delay, flatMap, forkJoin, fromEvent, map, mapTo, mergeMap, pluck, tap} from 'rxjs';
/* const splash: HTMLElement = document.getElementById('simg');

const loadImage = () =>
  fetch('https://picsum.photos/1920/1080')
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      splash.style.backgroundImage = `url(${url})`;
    }); */

(function Home() {
  let root$ = vdom.observer();
  let log = (...args: any[]) => console.log(...args);

  let worker: Worker;
  let isOnline = (navigator.onLine ? 'online' : 'offline') as 'online' | 'offline';
  /* navigator.serviceWorker.addEventListener(
    'message',
    (e) => {
      console.log(e);
    },
    false
  ); */

  self.postMessage({statusUpdateRequest: true}); // request status update

  const updateContent = (elem: HTMLElement) => (newContent: any) => {
    elem.innerHTML += newContent;
  };

  const toggleClass = (el: HTMLElement) => (className: string) => {
    el.classList.toggle(className);
  };

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      store$.subscribe((value) => {
        value;
      });
      root$
        .pipe(
          pluck('elems'),
          tap((el: HTMLElement) => updateContent(el)('Hello')),
          delay(1000),
          tap((el: HTMLElement) => toggleClass(el)('online')),
          tap((el: HTMLElement) => updateContent(el)('World')),
          tap(log)
        )
        .subscribe();
    },
    false
  );

  /* function onSWMessage(evt: {ports?: any; data?: any}) {
    var {data} = evt;
    if (data.statusUpdateRequest) {
      console.log('Status update requested from service worker, responding...');
    }
    sendStatusUpdate(evt.ports && evt.ports[0]);
  }

  function sendStatusUpdate(target?: undefined) {
    sendSWMessage(
      {
        statusUpdate: {
          isOnline: 'online',
          isLoggedIn: undefined,
        },
      },
      target
    );
  }

  function sendSWMessage(
    msg: {statusUpdate: {isOnline: 'online' | 'offline'; isLoggedIn?: any}},
    target: {postMessage: (arg0: any) => void}
  ) {
    if (target) {
      target.postMessage(msg);
    } else if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  } */

  /* 
  const apiCalls = async () => {
    const res = await fetch('https://api.github.com/users/macizomedia');
    const data = await res.json();
    rates.appendChild(document.createTextNode(data.login));
  }; */
  /* ---------------- The code that Works! ----------------- */
  worker = new Worker(new URL('worker.js', import.meta.url), {type: 'module'});

  worker.addEventListener('message', (e) => {
    console.log('[WEB-worker]', e.data);
    worker.postMessage(`user is ${isOnline}`);
  });
})();
