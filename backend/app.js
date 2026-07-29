const express  = require("express")
const app = express();
const ErrorHandler = require("./utils/ErrorHandler")
const cookieParser = require("cookie-parser")

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const user = require("./controller/user")

app.use("/api/v2/user" , user)

app.use(ErrorHandler);

module.exports = app;
