const rateLimit = require('express-rate-limit');

// Rate limit chung cho API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 yêu cầu mỗi IP
  message: { message: 'Quá nhiều yêu cầu, vui lòng thử lại sau.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit riêng cho authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { 
    message: 'Quá nhiều yêu cầu đăng nhập, vui lòng thử lại sau 15 phút.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  authLimiter
};