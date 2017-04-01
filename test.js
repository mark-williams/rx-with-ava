import test from 'ava';

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
