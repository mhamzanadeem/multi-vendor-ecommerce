const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: ["production", "PRODUCTION"].includes(process.env.NODE_ENV) ? "none" : "lax",
    secure: ["production", "PRODUCTION"].includes(process.env.NODE_ENV),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
