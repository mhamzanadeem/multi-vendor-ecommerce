const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

    // Payload too large (body-parser / express.json limit hit)
  if (err.type === "entity.too.large" || err.statusCode === 413) {
    const limitKb = Math.round((err.limit || 0) / 1024);
    const receivedKb = Math.round((err.length || 0) / 1024);
    console.log("[DEBUG] 413 Payload Too Large:", {
      message: err.message,
      limitBytes: err.limit,
      receivedBytes: err.length,
      receivedKb,
      limitKb,
      contentLengthHeader: req.headers["content-length"] || "unknown",
      url: req.originalUrl,
      method: req.method,
      time: new Date().toISOString(),
    });
    err.message = `[413 DEBUG] Payload too large! Body parser only accepts ${limitKb} KB but request was ${receivedKb} KB. Content-Length header: ${
      req.headers["content-length"] || "unknown"
    }. Check the uploaded avatar image size.`;
    err.statusCode = 413;
  }
  
  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again letter`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is expired please try again letter!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
