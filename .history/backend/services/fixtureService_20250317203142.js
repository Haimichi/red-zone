const Fixture = require('../models/Fixture');
const redisClient = require('../config/redis');

exports.getFixtures = async ({ status }) => {
  const cacheKey = `fixtures_${status || 'all'}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const query = status ? { 'result.status': status } : {};
  const fixtures = await Fixture.find(query).sort({ date: 1 });
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(fixtures));
  return fixtures;
};

exports.getResults = async () => {
  const cacheKey = 'results';
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const results = await Fixture.find({ 'result.status': 'completed' }).sort({ date: -1 });
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(results));
  return results;
};

exports.createFixture = async (data) => {
  const fixture = new Fixture(data);
  await fixture.save();
  await redisClient.del('fixtures_all');
  return fixture;
};