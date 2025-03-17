const Fixture = require('../models/Fixture');
const redisClient = require('../config/redis');

exports.getFixtures = async (req, res, next) => {
  try {
    const { status } = req.query;
    const cacheKey = `fixtures_${status || 'all'}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const query = status ? { 'result.status': status } : {};
    const fixtures = await Fixture.find(query).sort({ date: 1 });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(fixtures));
    res.json(fixtures);
  } catch (error) {
    next(error);
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const cacheKey = 'results';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const results = await Fixture.find({ 'result.status': 'completed' }).sort({ date: -1 });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(results));
    res.json(results);
  } catch (error) {
    next(error);
  }
};

exports.createFixture = async (req, res, next) => {
  try {
    const fixture = new Fixture(req.body);
    await fixture.save();
    await redisClient.del('fixtures_all'); // Xóa cache

    const sendNotification = req.app.get('sendNotification');
    await sendNotification(
      req.user.id,
      `Fixture mới: ${fixture.teams.home} vs ${fixture.teams.away}`,
      'fixture'
    );

    res.status(201).json(fixture);
  } catch (error) {
    next(error);
  }
};