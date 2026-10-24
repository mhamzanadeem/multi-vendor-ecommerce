const assert = require('node:assert/strict');
async function main() {
  const api = new URL(process.env.SMOKE_API_URL);
  const frontend = new URL(process.env.SMOKE_FRONTEND_URL);
  const get = url => fetch(url, { signal: AbortSignal.timeout(15000) });
  const response = await get(new URL('/health/ready', api));
  assert.equal(response.status, 200, 'API must be database-ready');
  const health = await response.json();
  assert.equal(health.ready, true);
  assert.ok(process.env.EXPECTED_REVISION, 'EXPECTED_REVISION is required');
  assert.equal(health.revision, process.env.EXPECTED_REVISION, 'deployed API must match tested revision');
  const page = await get(frontend);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /<html/i);
  const products = await get(new URL('/api/v2/product/get-all-products', api));
  assert.equal(products.status, 200);
  assert.ok(Array.isArray((await products.json()).products));
  const denied = await fetch(new URL('/api/v2/coupon/delete-coupon/000000000000000000000001', api), {
    method: 'DELETE', signal: AbortSignal.timeout(15000) });
  assert.equal(denied.status, 401);
  console.log('Readiness, API revision, frontend HTML, product list and anonymous denial passed.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
