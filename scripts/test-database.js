const { URL } = require('node:url');

function testDatabaseUrl(value) {
  if (!value) throw new Error('TEST_DB_URL is required; configure your Atlas connection as a CI variable.');
  const url = new URL(value);
  if (!['mongodb:', 'mongodb+srv:'].includes(url.protocol) || !['/guardian_test', '/multi-vendor-ecommerce'].includes(url.pathname)) {
    throw new Error('Tests only accept guardian_test or the authorized multi-vendor-ecommerce database.');
  }
  return value;
}
module.exports = { testDatabaseUrl };
