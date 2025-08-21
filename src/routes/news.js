const express = require('express');
const {
  getNews,
  markAsRead,
  markAsFavorite,
  getReadArticles,
  getFavoriteArticles,
  searchNews
} = require('../controllers/newsController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getNews);
router.post('/:id/read', markAsRead);
router.post('/:id/favorite', markAsFavorite);
router.get('/read', getReadArticles);
router.get('/favorites', getFavoriteArticles);
router.get('/search/:keyword', searchNews);

module.exports = router;