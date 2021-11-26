import {fromEvent, interval, merge, NEVER} from 'rxjs';
import {setCount, startButton, stopButton} from './utils';


const start$ = fromEvent(startButton, 'click');
const stop$ = fromEvent(stopButton, 'click');