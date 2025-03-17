const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 yêu cầu mỗi IP
  message: { message: 'Too many requests from this IP, please try again later.' },
});

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Giới hạn 5 yêu cầu mỗi IP trong 15 phút
  message: { 
    message: 'Quá nhiều yêu cầu đăng nhập, vui lòng thử lại sau 15 phút.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});