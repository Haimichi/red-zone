const redis = require('redis');
const config = require('./env');

const redisClient = redis.createClient({
  url: config.redisURL
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

const connectRedis = async () => {
  try {
    if (!redisClient.isReady) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('Redis connection error:', error.message);
  }
};

// Kết nối Redis khi module được import
connectRedis();

module.exports = redisClient;