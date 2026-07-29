const express  = require("express")
const app = express();
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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});

module.exports = app;
