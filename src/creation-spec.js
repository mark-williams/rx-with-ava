import test from 'ava';
import sinon from 'sinon';

import createObservable from './creation';

const testArray = [1, 3, 7, 11];
const results = [];

test('observable creation from array', t => {
  const complete = sinon.spy();
  const source = createObservable(testArray);
  source.subscribe(
    x => {
      results.push(x);
    },
    () => {},
    complete);

  t.deepEqual(results, testArray);
  t.truthy(complete.calledOnce);
});
