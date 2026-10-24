const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
let server, base;
before(async () => {
  process.env.PAYMENTS_ENABLED = 'false';
  process.env.APP_REVISION = 'readiness-test-revision';
  server = require('../app').listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { if (server) await new Promise(resolve => server.close(resolve)); });
test('readiness fails closed when MongoDB is disconnected and reports revision', async () => {
  const response = await fetch(`${base}/health/ready`);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ready: false, revision: 'readiness-test-revision' });
});
test('disabled payments reject requests without initializing Stripe', async () => {
  const response = await fetch(`${base}/api/v2/payment/process`, { method: 'POST',
    headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: 100 }) });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
});
