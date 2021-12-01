import {filter, from, map, reduce, scan, takeWhile} from 'rxjs';

const {mapTo, of, take} = require('rxjs');

function* fibonacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const getResult = async (observable: {
  subscribe: (arg0: {
    next: (value: any) => number;
    error: (reason?: any) => void;
    complete: () => void;
  }) => any;
}) => {
  return new Promise((resolve, reject) => {
    const result: unknown[] = [];

    const subscription = observable.subscribe({
      next: (value: any) => result.push(value),
      error: reject,
      complete: () => {
        resolve(result);
        if (subscription) subscription.unsubscribe();
      },
    });
  });
};

describe('Basic test', () => {
  it('Should return "1,2,3"', async () => {
    const observable = of(1, 2, 3).pipe(map((x) => x));
    const result = await getResult(observable);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('basic Operator', () => {
  it('should take the first values and map to the word "AREPAS', async () => {
    const observable = of(1, 2, 3).pipe(take(2), mapTo('AREPAS'));
    return expect(getResult(observable)).resolves.toEqual(['AREPAS', 'AREPAS']);
  });

  it('should emit the square of every number', async () => {
    const observable$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      filter((x) => (x as number) % 2 === 0),
      map((x) => (x as number) * (x as number))
    );
    return expect(await getResult(observable$)).toEqual([4, 16, 36, 64, 100]);
  });

  it('should sum of the total of all of the Fibonacci numbers under 200', async () => {
    const observable$ = from(fibonacci()).pipe(
      takeWhile((x) => x < 200),
      reduce((acc, curr) => acc + curr, 0)
    );
    expect(await getResult(observable$)).toEqual([376]);
  });

  it('should merge each object emited into a single object, emitting each state', async () => {
    const observable$ = of({a: 1}, {b: 2}, {c: 3}).pipe(
      scan((acc, curr) => ({...acc, ...(curr as object)}), {})
    );
    expect(await getResult(observable$)).toEqual([{a: 1}, {a: 1, b: 2}, {a: 1, b: 2, c: 3}]);
  });
});
