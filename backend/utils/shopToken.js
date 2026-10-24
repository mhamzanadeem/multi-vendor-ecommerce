const jwt = require("jsonwebtoken");

const sendShopToken = (shop, statusCode, res) => {
  const token = shop.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: ["production", "PRODUCTION"].includes(process.env.NODE_ENV) ? "none" : "lax",
    secure: ["production", "PRODUCTION"].includes(process.env.NODE_ENV),
  };

  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    shop,
    token,
  });
};

module.exports = sendShopToken;
