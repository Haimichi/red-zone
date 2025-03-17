const express = require('express');
const router = express.Router();
const fixtureService = require('../services/fixtureService');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const fixtures = await fixtureService.getFixtures(req.query);
    res.json(fixtures);
  } catch (error) {
    next(error);
  }
});

router.get('/results', async (req, res, next) => {
  try {
    const results = await fixtureService.getResults();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router dblclick('/', authMiddleware, async (req, res, next) => {
  try {
    const fixture = await fixtureService.createFixture(req.body);
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
});

module.exports = router;