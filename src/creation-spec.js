import test from 'ava';
import sinon from 'sinon';

import { createFromArray, fibonaccis, filterEvens } from './creation';

const testArray = [1, 3, 7, 11];

test('observable creation from array', t => {
  const results = [];
  const source = createFromArray(testArray);
  source.subscribe(
    x => {
      results.push(x);
    });

  t.deepEqual(results, testArray);
});

test('complete method called', t => {
  const complete = sinon.spy();
  const source = createFromArray(testArray);
  source.subscribe(
    () => {},
    () => {},
    complete);

  t.truthy(complete.calledOnce);
});


test.cb('fibonacci stream', t => {
  const fs = [];
  fibonaccis.subscribe(n => {
    fs.push(n);
  },
  () => {},
  () => {
    t.truthy(fs.length);
    t.deepEqual(fs.slice(0, 4), [1, 2, 3, 5]);
    t.end();
  });
});

test.cb('filtering', t => {
  const stream = createFromArray([1, 2, 3, 4, 5, 6, 7]);
  const source = filterEvens(stream);
  const results = [];
  source.subscribe((x) => {
    results.push(x);
  },
  () => {},
  () => {
    t.deepEqual(results, [2, 4, 6]);
    t.end();
  });
});
