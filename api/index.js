let app;

try {
  app = require("../backend/server");
} catch (err) {
  console.error("Failed to load Express app:", err.message);
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
    return res.status(200).end();
  }

  if (!app) {
    return res.status(500).json({ error: "Server failed to initialize" });
  }

  return app(req, res);
};
