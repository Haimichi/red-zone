const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateNews } = require('../middleware/validator');

// Get all news
router.get('/', newsController.getNews);

// Get news by id
router.get('/:id', newsController.getNewsById);

// Create news (yêu cầu xác thực và phân quyền)
router.post('/',
  authMiddleware,
  roleCheck(['admin', 'editor']),
  validateNews,
  newsController.createNews
);

module.exports = router;