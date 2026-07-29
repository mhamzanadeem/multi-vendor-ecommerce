const express  = require("express")
const app = express();
const ErrorHandler = require("./utils/ErrorHandler")
const cookieParser = require("cookie-parser")

const clientURL = process.env.CLIENT_URL || "http://localhost:5173";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", clientURL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const user = require("./controller/user")

app.use("/api/v2/user" , user)

app.use(ErrorHandler);

module.exports = app;