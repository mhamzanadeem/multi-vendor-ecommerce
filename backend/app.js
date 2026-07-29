const express  = require("express")
const app = express();
const ErrorHandler = require("./utils/ErrorHandler")
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

const user = require("./controller/user")

app.use("/api/v2/user" , user)

app.use(ErrorHandler);

module.exports = app;