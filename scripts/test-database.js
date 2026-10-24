const { URL } = require('node:url');

function testDatabaseUrl(value) {
  if (!value) throw new Error('TEST_DB_URL is required; use a disposable database named guardian_test.');
  const url = new URL(value);
  if (!['mongodb:', 'mongodb+srv:'].includes(url.protocol) || url.pathname !== '/guardian_test') {
    throw new Error('Tests only accept a MongoDB database named guardian_test. Never use production credentials.');
  }
  return value;
}
module.exports = { testDatabaseUrl };
