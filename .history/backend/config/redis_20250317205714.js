const redis = require('redis');
const config = require('./env');

const redisClient = redis.createClient({
  url: config.redisURL,
});

redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('error', (err) => console.error('Redis error:', err));

module.exports = redisClient;