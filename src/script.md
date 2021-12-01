import {
  fromEvent,
  interval,
  merge,
  NEVER,
  skipUntil,
  scan,
  takeUntil,
  mapTo,
  startWith,
  map,
  from,
  pluck,
  tap,
  switchMap,
  reduce,
  mergeMap,
  retry,
  catchError,
  of,
  exhaustMap,
  timer,
} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
/* import {
  setCount,
  startButton,
  stopButton,
  setDescription,
  setTitle,
  setImage,
  setResult,
  fetchButton,
  setBpi,
  clearButton,
  clearResult,
} from './utils';
 */
/* 
const start$ = fromEvent(startButton, 'click');
const stop$ = fromEvent(stopButton, 'click');

const counter$ = interval(1000).pipe(
  skipUntil(start$),
  scan((total) => total + 1, 0),
  takeUntil(stop$)
);

counter$.subscribe(setCount);

 */
/* 
const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const stop$ = fromEvent(stopButton, 'click').pipe(mapTo(false));

const isRunning$ = merge(start$, stop$).pipe(startWith(false));

isRunning$.subscribe((isRunning) => {
  if (isRunning) {
    const counter$ = interval(1000).pipe(
      scan((total) => total + 1, 0),
      takeUntil(stop$)
    );
    counter$.subscribe(setCount);
  }
});
 */
/* Fetch Api and Pluck Item */
/* 
const nasa = 'https://api.nasa.gov/planetary/apod?api_key=NLs7EzkbvMJbHIUlycRaJmYDmnwrk0ZDmGWRKQAp';

const nasa$ = fetch(nasa).then((res) => res.json());

const image$ = from(nasa$).pipe(pluck('url'));
const title$ = from(nasa$).pipe(pluck('title'));
const description$ = from(nasa$).pipe(pluck('explanation'));

title$.subscribe(setTitle);
description$.subscribe(setDescription);
image$.subscribe(setImage); 
 */
/* Two Way to handle promise like Fetch */
/* 
const coinRates = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const coin$ = fromFetch(coinRates).pipe(map((res) => res.json()));

const bpi$ = from(coin$).pipe(
  switchMap(async (x) => {
    return x;
  }),
  pluck('bpi'),
  pluck('USD'),
  pluck('rate')
);

bpi$.subscribe(setBpi);
 */
/* Using Merged Map with Retry */
/* 
const fetchData = () => {
  return fromFetch(coinRates).pipe(
    mergeMap((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('opps wtf!?');
      }
    }),
    tap((value) => console.log(value)),
    retry(4),
    catchError((error) => {
      console.warn(error);
      return of({error: error.message});
    })
  );
};
 */
/* const fetch$ = fromEvent(fetchButton, 'click').pipe(exhaustMap(fetchData)); */
/* 
const fetch$ = fromEvent(fetchButton, 'click').pipe(mapTo(true));
const clear$ = fromEvent(clearButton, 'click').pipe(mapTo(false));

const fetchStream$ = merge(fetch$, clear$).pipe(
  switchMap((shouldFetch) => {
    tap(() => clearResult())
    if (shouldFetch) {
      return timer(0, 5000).pipe(
        exhaustMap(fetchData),
      );
    } else {
      return NEVER;
    }
  })
);

fetchStream$.subscribe(({bpi, error}) => {
  if (error) {
    return;
  }
  setResult({bpi});
});
 */
/* Search with Rxjs */

let bipEvent: any = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  bipEvent = event;
});

document.querySelector('#btnInstall').addEventListener('click', (e) => {
  if (bipEvent) {
    bipEvent.prompt();
  } else {
    alert('your shit aint working!');
  }
});
