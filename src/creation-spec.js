import test from 'ava';
import sinon from 'sinon';

import { createFromArray, fibonaccis } from './creation';

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
    t.end();
  });
});

