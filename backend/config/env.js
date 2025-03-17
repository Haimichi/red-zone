require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  redisURL: process.env.REDIS_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }
};