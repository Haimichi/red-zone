const express = require('express');
const helmet = require('helmet');
const rateLimit = require('./middleware/rateLimit'); // Sửa từ '../' thành './'
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
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
  });

module.exports = app;