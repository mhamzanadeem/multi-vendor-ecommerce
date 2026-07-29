if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

const app = require("./app");

const connectDatabase = require("./db/Database");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

connectDatabase();

if (!process.env.VERCEL) {
  const server = app.listen(process.env.PORT || 8000, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 8000}`
    );
  });

  process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
    server.close(() => {
      process.exit(1);
    });
  });
}

module.exports = app;
