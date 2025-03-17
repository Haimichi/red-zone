const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

const app = express();

// Kết nối MongoDB
connectDB();

// Middleware
app.use(helmet()); // Bảo mật header
app.use(express.json()); // Parse JSON body
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Giới hạn 100 yêu cầu mỗi IP
  })
);

// Routes (sẽ thêm sau)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/fixtures', require('./routes/fixtureRoutes'));
app.use('/api/tactical', require('./routes/tacticalRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

module.exports = app;