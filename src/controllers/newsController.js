const NewsService = require('../utils/newsService');
const { readArticles, favoriteArticles } = require('../models/db');

const newsService = new NewsService(process.env.NEWS_API_KEY);

const getNews = async (req, res) => {
  try {
    const userPreferences = req.user.preferences || {};
    const articles = await newsService.getTopHeadlines(userPreferences);
    
    // Mark articles as read if they've been read by the user
    const userId = req.user.id;
    const userReadArticles = readArticles[userId] || [];
    
    const articlesWithStatus = articles.map(article => ({
      ...article,
      isRead: userReadArticles.includes(article.url),
      isFavorite: (favoriteArticles[userId] || []).includes(article.url)
    }));
    
    res.json(articlesWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsRead = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!readArticles[userId]) {
      readArticles[userId] = [];
    }
    
    // In a real app, we'd use a proper ID system
    // For this demo, we'll use the URL as ID
    if (!readArticles[userId].includes(id)) {
      readArticles[userId].push(id);
    }
    
    res.json({ message: 'Article marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsFavorite = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!favoriteArticles[userId]) {
      favoriteArticles[userId] = [];
    }
    
    if (!favoriteArticles[userId].includes(id)) {
      favoriteArticles[userId].push(id);
    }
    
    res.json({ message: 'Article marked as favorite' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReadArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const userReadArticles = readArticles[userId] || [];
    
    // In a real app, we'd fetch the actual article details from a database
    // For this demo, we'll just return the URLs
    res.json({ readArticles: userReadArticles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFavoriteArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const userFavoriteArticles = favoriteArticles[userId] || [];
    
    res.json({ favoriteArticles: userFavoriteArticles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchNews = async (req, res) => {
  try {
    const { keyword } = req.params;
    const userPreferences = req.user.preferences || {};
    
    const articles = await newsService.searchNews(keyword, userPreferences);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNews,
  markAsRead,
  markAsFavorite,
  getReadArticles,
  getFavoriteArticles,
  searchNews
};