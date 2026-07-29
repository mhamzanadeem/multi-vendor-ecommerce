
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    })
    .catch((error) => console.error("MongoDB connection error:", error));
};

module.exports = connectDatabase;
