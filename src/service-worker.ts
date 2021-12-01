/// <reference lib="webworker"/>
declare const self: ServiceWorkerGlobalScope;

import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

registerRoute(
  ({url}) => url.origin === self.location.origin &&
             url.pathname.startsWith('/assets/'),
  new StaleWhileRevalidate()
);





