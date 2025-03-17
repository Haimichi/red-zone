const News = require('../models/News');

exports.getNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = category ? { category } : {};
    const news = await News.find(query)
      .populate('author', 'username')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await News.countDocuments(query);

    res.json({
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page * 1,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'username');
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    next(error);
  }
};

exports.createNews = async (req, res, next) => {
  try {
    const news = new News({ ...req.body, author: req.user.id });
    await news.save();

    // Gửi thông báo qua WebSocket
    const sendNotification = req.app.get('sendNotification');
    await sendNotification(req.user.id, `Tin tức mới: ${news.title}`, 'news');

    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};