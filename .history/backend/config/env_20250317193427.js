require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/default_db',
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  redisURL: process.env.REDIS_URL || 'redis://localhost:6379',
  port: process.env.PORT || 5000,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};