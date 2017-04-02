import test from 'ava';
import createObservable from './creation';

test('observable creation from array', t => {
  const testArray = [1, 3, 7, 11];
  const results = [];

  const source = createObservable(testArray);
  source.subscribe(x => {
    results.push(x);
  });

  t.deepEqual(results, testArray);
});
