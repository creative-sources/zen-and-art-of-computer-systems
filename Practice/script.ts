import {fromEvent, interval, merge, NEVER, Subscription} from 'rxjs';
import {setCount, startButton, stopButton} from './utils';

const start$ = fromEvent(startButton, 'click');
const stop$ = fromEvent(stopButton, 'click');

let interval$;

start$.subscribe(() => {
  interval$ = interval(1000);
  interval$.subscribe((value) => {
    console.log(value);
  });
});
    