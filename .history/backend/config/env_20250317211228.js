// require('dotenv').config();

// module.exports = {
//   mongoURI: process.env.MONGO_URI,
//   jwtSecret: process.env.JWT_SECRET,
//   redisURL: process.env.REDIS_URL,
//   port: process.env.PORT,
//   googleClientId: process.env.GOOGLE_CLIENT_ID,
//   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
// };

const dotenv = require('dotenv');
const path = require('path');

// Tải cấu hình từ file .env tương ứng với môi trường
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

module.exports = {
  env: environment,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  redisURL: process.env.REDIS_URL,
  port: process.env.PORT,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};