import test from 'ava';
import mult from './mult';

test('multiplier', t => {
  t.is(mult(3, 4), 12);
});

test('foo', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});

test(t => {
  const value = 'hello';
  t.truthy(value, 'False is not truthy');
});
