import {interval} from 'rxjs';
import './custom.scss';

const $ = document;
const startTime = Date.now();
const tick$ = interval(1000);

tick$.subscribe(
  () => ($.querySelector('#root')!.innerHTML = `<h1>${JSON.stringify(Date.now() - startTime)}</h1>`)
);
function* fibonacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

