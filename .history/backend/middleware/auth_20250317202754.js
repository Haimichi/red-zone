const jwt = require('jsonwebtoken');
const config = require('../config/env');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Gắn thông tin user (id, role) vào request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};