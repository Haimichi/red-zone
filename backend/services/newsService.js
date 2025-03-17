const News = require('../models/News');

exports.getNews = async ({ page = 1, limit = 10, category }) => {
  const query = category ? { category } : {};
  const news = await News.find(query)
    .populate('author', 'username')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });
  const total = await News.countDocuments(query);
  return { news, total, totalPages: Math.ceil(total / limit), currentPage: page * 1 };
};

exports.getNewsById = async (id) => {
  const news = await News.findById(id).populate('author', 'username');
  if (!news) throw new Error('News not found');
  return news;
};

exports.createNews = async (data, authorId) => {
  const news = new News({ ...data, author: authorId });
  await news.save();
  return news;
};