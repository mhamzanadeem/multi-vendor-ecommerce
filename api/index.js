let app;

try {
  app = require("../backend/server");
} catch (err) {
  console.error("Failed to load Express app:", err.message);
}

module.exports = (req, res) => {
  const origin = req.headers.origin;

  console.log("Request:", req.method, req.url, "Origin:", origin);

  if (req.method === "OPTIONS") {
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    };
    console.log("OPTIONS responding with headers:", JSON.stringify(corsHeaders));
    res.writeHead(200, corsHeaders);
    return res.end();
  }

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (!app) {
    return res.status(500).json({ error: "Server failed to initialize" });
  }

  return app(req, res);
};
