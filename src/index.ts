import '@fontsource/fira-code';
const splash: HTMLElement = document.getElementById('simg');

const loadImage = () =>
  fetch('https://picsum.photos/1920/1080')
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      splash.style.backgroundImage = `url(${url})`;
    });

(function Home() {
  let worker: Worker;
  let isOnline = (navigator.onLine ? 'online' : 'offline') as 'online' | 'offline';
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      console.log('DOM loaded');
      loadImage();
      apiCalls();
    },
    false
  );

  const apiCalls = async () => {
    const res = await fetch('https://api.github.com/users/macizomedia');
    const data = await res.json();
    console.log(data);
  };

  async function addToCache(urls: RequestInfo[]) {
    const cache = await caches.open('/assets/');
    return cache.addAll(urls);
  }

  // Call addToCache whenever you'd like. E.g. to add to cache after a page load:
  window.addEventListener('load', () => {
    addToCache(['/assets/images', '/assets/sass']);
  });

  setTimeout(() => {
    self.postMessage({statusUpdateRequest: true});
  }, 200);

  /* ---------------- The code that Works! ----------------- */
  worker = new Worker(new URL('worker.js', import.meta.url), {type: 'module'});

  worker.addEventListener('message', (e) => {
    console.log('[WEB-worker]', e.data);
    worker.postMessage(`user is ${isOnline}`);
  });
})();
