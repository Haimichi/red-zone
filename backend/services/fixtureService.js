const Fixture = require('../models/Fixture');
const redisClient = require('../config/redis');

exports.getFixtures = async ({ status }) => {
  try {
    if (redisClient.isReady) {
      const cacheKey = `fixtures_${status || 'all'}`;
      const cached = await redisClient.get(cacheKey);
      if (cached) return JSON.parse(cached);
    }

    const query = status ? { 'result.status': status } : {};
    const fixtures = await Fixture.find(query).sort({ date: 1 });
    
    if (redisClient.isReady) {
      await redisClient.setEx(`fixtures_${status || 'all'}`, 3600, JSON.stringify(fixtures));
    }
    
    return fixtures;
  } catch (error) {
    console.error('Fixture service error:', error);
    // Nếu có lỗi với Redis, vẫn trả về dữ liệu từ database
    const query = status ? { 'result.status': status } : {};
    return await Fixture.find(query).sort({ date: 1 });
  }
};

exports.getResults = async () => {
  try {
    if (redisClient.isReady) {
      const cacheKey = 'results';
      const cached = await redisClient.get(cacheKey);
      if (cached) return JSON.parse(cached);
    }

    const results = await Fixture.find({ 'result.status': 'completed' }).sort({ date: -1 });
    
    if (redisClient.isReady) {
      await redisClient.setEx('results', 3600, JSON.stringify(results));
    }
    
    return results;
  } catch (error) {
    console.error('Results service error:', error);
    return await Fixture.find({ 'result.status': 'completed' }).sort({ date: -1 });
  }
};

exports.createFixture = async (data) => {
  try {
    const fixture = new Fixture(data);
    await fixture.save();
    
    if (redisClient.isReady) {
      await redisClient.del('fixtures_all');
    }
    
    return fixture;
  } catch (error) {
    console.error('Create fixture error:', error);
    throw error;
  }
};