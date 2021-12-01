if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    new URL('sw.js', window.location).href,
    {type: 'module'},
    {updateViaCache: false, scope: './src'}
  );
}
