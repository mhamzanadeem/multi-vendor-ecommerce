const dns = require("node:dns");
// Preserve the Atlas DNS workaround used by this application. Override with a
// comma-separated list, or 'system' when the environment's resolver supports SRV.
const dnsServers = process.env.DNS_SERVERS || "1.1.1.1,8.8.8.8";
if (dnsServers !== "system") {
  dns.setServers(dnsServers.split(",").map(server => server.trim()).filter(Boolean));
}
const mongoose = require("mongoose");

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DB_URL).then((mongoose) => {
      console.log(`mongod connected with server: ${mongoose.connection.host}`);
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDatabase;
