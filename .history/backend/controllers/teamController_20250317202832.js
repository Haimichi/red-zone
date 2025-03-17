const Player = require('../models/Player');
const Staff = require('../models/Staff');
const redisClient = require('../config/redis');

exports.getPlayers = async (req, res, next) => {
  try {
    const cacheKey = 'players';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const players = await Player.find().sort({ name: 1 });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(players)); // Cache 1 giờ
    res.json(players);
  } catch (error) {
    next(error);
  }
};

exports.getPlayerById = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    next(error);
  }
};

exports.getStaff = async (req, res, next) => {
  try {
    const cacheKey = 'staff';
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const staff = await Staff.find().sort({ role: 1 });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(staff));
    res.json(staff);
  } catch (error) {
    next(error);
  }
};