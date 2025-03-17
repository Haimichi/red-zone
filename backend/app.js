const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { apiLimiter } = require('./middleware/rateLimit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Kết nối database
connectDB();

// Middleware cơ bản
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', apiLimiter);

// Routes
const newsRoutes = require('./routes/newsRoutes');
const fixtureRoutes = require('./routes/fixtureRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use('/api/news', newsRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/team', teamRoutes);

// Xử lý route không tồn tại
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' });
});

// Error Handler (luôn để cuối cùng)
app.use(errorHandler);

module.exports = app;