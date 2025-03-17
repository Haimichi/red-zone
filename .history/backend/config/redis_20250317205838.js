const redis = require('redis');
const config = require('./env');

const redisClient = redis.createClient({
  url: config.redisURL,
});

redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('error', (err) => console.error('Redis error:', err));

// Kết nối Redis khi module được import
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Redis connection error:', error.message);
  }
};

connectRedis();

module.exports = redisClient;