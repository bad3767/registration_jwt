const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
  message:
    "You are hitting this endpoint too frequently. Please try again after a while.",
});
