const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 yêu cầu mỗi IP
  message: { message: 'Too many requests from this IP, please try again later.' },
});