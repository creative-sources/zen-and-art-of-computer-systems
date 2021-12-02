import '@fontsource/fira-code';
import vdom from './vdom';
import {updateContent, toggleClass} from './utils/tools';
import {pluck, tap, delay} from 'rxjs';

let log = (...args: any[]) => console.log(...args);

(function Home() {
  self.postMessage({statusUpdateRequest: true});

  let worker: Worker;
  let isOnline = (navigator.onLine ? 'online' : 'offline') as 'online' | 'offline';

  let root$ = vdom.observer();

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      root$
        .pipe(
          pluck('elems'),
          tap((el: HTMLElement) => updateContent(el)('Hello')),
          delay(5000),
          tap((el: HTMLElement) => toggleClass(el)('online')),
          tap((el: HTMLElement) => updateContent(el)('World')),
          tap(log)
        )
        .subscribe();
    },
    false
  );

  /* ---------------- The code that Works! ----------------- */
  worker = new Worker(new URL('worker.js', import.meta.url), {type: 'module'});

  worker.addEventListener('message', (e) => {
    console.log('[WEB-worker]', e.data);
    worker.postMessage(`user is ${isOnline}`);
  });
})();
