let app;

try {
  app = require("../backend/server");
  console.log("Express app loaded successfully");
} catch (err) {
  console.error("Failed to load Express app:", err.message);
  console.error(err.stack);
}

module.exports = (req, res) => {
  const origin = req.headers.origin;

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    console.log("OPTIONS preflight handled for:", req.path);
    return res.status(200).end();
  }

  if (!app) {
    console.error("App not loaded, returning 500");
    return res.status(500).json({ error: "Server failed to initialize" });
  }

  try {
    return app(req, res);
  } catch (err) {
    console.error("Unhandled error in request:", err.message);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
