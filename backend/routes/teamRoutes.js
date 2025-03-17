const express = require('express');
const router = express.Router();
const teamService = require('../services/teamService');

router.get('/players', async (req, res, next) => {
  try {
    const players = await teamService.getPlayers();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

router.get('/players/:id', async (req, res, next) => {
  try {
    const player = await teamService.getPlayerById(req.params.id);
    res.json(player);
  } catch (error) {
    next(error);
  }
});

router.get('/staff', async (req, res, next) => {
  try {
    const staff = await teamService.getStaff();
    res.json(staff);
  } catch (error) {
    next(error);
  }
});

module.exports = router;