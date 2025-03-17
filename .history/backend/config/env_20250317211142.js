const dotenv = require('dotenv');
const path = require('path');

// Tải cấu hình từ file .env tương ứng với môi trường
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

module.exports = {
  env: environment,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/man_united',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret_dev_only',
  redisURL: process.env.REDIS_URL || 'redis://localhost:6379',
  port: process.env.PORT || 5000,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};