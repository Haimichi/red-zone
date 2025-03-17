const express = require('express');
const helmet = require('helmet');
const rateLimit = require('./middleware/rateLimit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(helmet());
app.use(express.json());
app.use(rateLimit);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/fixtures', require('./routes/fixtureRoutes'));
app.use('/api/tactical', require('./routes/tacticalRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler); // Thêm middleware xử lý lỗi

module.exports = app;