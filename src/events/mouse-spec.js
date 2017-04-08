import test from 'ava';
import jsDom from 'jsdom';

import mouseMove from './mouse';

let ele;
let observable;

test.beforeEach(() => {
  ele = jsDom.jsdom('<div></div>');
  observable = mouseMove(ele);
});

test.cb('observable creation fom events', t => {
  observable.subscribe(m => {
    t.pass();
    t.end();
  });

  const event = new ele.defaultView.Event('mousemove');
  ele.dispatchEvent(event);
});
