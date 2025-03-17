const mongoose = require('mongoose');

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log lỗi
  console.error(err);

  // Lỗi MongoDB - ID không hợp lệ
  if (err instanceof mongoose.Error.CastError) {
    error.message = 'ID không hợp lệ';
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }

  // Lỗi validation MongoDB
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: messages
    });
  }

  // Lỗi trùng lặp (unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `${field} đã tồn tại`;
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }

  // Xử lý các lỗi JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Token không hợp lệ'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token đã hết hạn'
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Lỗi server'
  });
};