const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const result = await newsService.getNews(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const news = await newsService.getNewsById(req.params.id);
    res.json(news);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const news = await newsService.createNews(req.body, req.user.id);
    const sendNotification = req.app.get('sendNotification');
    await sendNotification(req.user.id, `Tin tức mới: ${news.title}`, 'news');
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
});

module.exports = router;