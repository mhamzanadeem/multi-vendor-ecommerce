const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { once } = require('node:events');
const { randomUUID } = require('node:crypto');
const runId = randomUUID();
const shopIds = [];
const couponIds = [];
async function cleanupFixtures() {
  if (mongoose.connection.readyState !== 1) return;
  await Coupon.deleteMany({ _id: { $in: couponIds } });
  await Shop.deleteMany({ _id: { $in: shopIds } });
}
const { testDatabaseUrl } = require('../../scripts/test-database');
const Shop = require('../model/shop');
const Coupon = require('../model/coupounCode');
let server, base, sellerA, sellerB, coupon;
const password = 'Fictional-demo-only-42';

before(async () => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET_KEY = 'isolated-test-signing-key-not-for-deployment';
  process.env.JWT_EXPIRES = '1h';
  process.env.PAYMENTS_ENABLED = 'false';
  await mongoose.connect(testDatabaseUrl(process.env.TEST_DB_URL), { serverSelectionTimeoutMS: 15000, autoIndex: false });
  server = require('../app').listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}/api/v2`;
});
after(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
  await cleanupFixtures();
  await mongoose.disconnect();
});
beforeEach(async () => {
  await cleanupFixtures();
  const make = async label => {
    const id = new mongoose.Types.ObjectId();
    shopIds.push(id);
    return Shop.create({ _id: id, name: `Acceptance ${label}`, email: `acceptance-${runId}-${label}@example.test`, password,
    address: 'Fictional demo street', phoneNumber: 1000000000, zipCode: 10000,
    avatar: { public_id: 'demo', url: 'https://example.test/demo.svg' } });
  };
  sellerA = await make('a'); sellerB = await make('b');
  const couponId = new mongoose.Types.ObjectId();
  couponIds.push(couponId);
  coupon = await Coupon.create({ _id: couponId, name: `GUARDIAN_ACCEPTANCE_${runId}`,  value: 10, shopId: String(sellerB._id) });
});
async function login(seller) {
  const response = await fetch(`${base}/shop/login-shop`, { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: seller.email, password }) });
  assert.equal(response.status, 201, 'real seller login must succeed');
  const cookie = response.headers.get('set-cookie');
  assert.ok(cookie?.startsWith('seller_token='));
  return cookie.split(';')[0];
}
async function remove(id, cookie) {
  return fetch(`${base}/coupon/delete-coupon/${id}`, { method: 'DELETE', headers: cookie ? { cookie } : {} });
}
test('Seller A cannot delete Seller B coupon; stored document remains unchanged', async () => {
  const original = (await Coupon.findById(coupon._id)).toObject();
  const response = await remove(coupon._id, await login(sellerA));
  assert.ok([403, 404].includes(response.status), `ownership denial expected; received ${response.status}`);
  assert.deepEqual((await Coupon.findById(coupon._id))?.toObject(), original);
});
test('owner can delete their own coupon', async () => {
  const response = await remove(coupon._id, await login(sellerB));
  assert.ok(response.ok);
  assert.equal(await Coupon.findById(coupon._id), null);
});
test('anonymous deletion is denied without mutation', async () => {
  assert.equal((await remove(coupon._id)).status, 401);
  assert.ok(await Coupon.findById(coupon._id));
});
test('missing and malformed IDs produce controlled client errors', async () => {
  const cookie = await login(sellerB);
  for (const id of [new mongoose.Types.ObjectId(), 'invalid-id']) {
    assert.ok([400, 404].includes((await remove(id, cookie)).status));
  }
});
