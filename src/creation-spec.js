import test from 'ava';
import sinon from 'sinon';

import createObservable from './creation';

const testArray = [1, 3, 7, 11];

test('observable creation from array', t => {
  const results = [];
  const source = createObservable(testArray);
  source.subscribe(
    x => {
      results.push(x);
    });

  t.deepEqual(results, testArray);
});

test('complete method called', t => {
  const complete = sinon.spy();
  const source = createObservable(testArray);
  source.subscribe(
    () => {},
    () => {},
    complete);

  t.truthy(complete.calledOnce);
});
