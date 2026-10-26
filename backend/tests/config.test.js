const { test } = require('node:test');
const assert = require('node:assert/strict');
const { testDatabaseUrl } = require('../../scripts/test-database');

test('database isolation rejects absent, production, and non-MongoDB URLs', () => {
  for (const value of [undefined, 'mongodb://localhost/production', 'https://localhost/guardian_test']) {
    assert.throws(() => testDatabaseUrl(value));
  }
  assert.equal(testDatabaseUrl('mongodb+srv://example.test/multi-vendor-ecommerce'), 'mongodb+srv://example.test/multi-vendor-ecommerce');
  assert.equal(testDatabaseUrl('mongodb://localhost:27017/guardian_test'), 'mongodb://localhost:27017/guardian_test');
});
