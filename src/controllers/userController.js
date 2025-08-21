const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { preferences, readArticles, favoriteArticles } = require('../models/db');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.create({ email, password });
    preferences[user.id] = { categories: [], languages: ['en'] };
    readArticles[user.id] = [];
    favoriteArticles[user.id] = [];
    
    const token = generateToken(user.id);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user.id);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPreferences = (req, res) => {
  try {
    const userPreferences = preferences[req.user.id] || { categories: [], languages: ['en'] };
    res.json(userPreferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePreferences = (req, res) => {
  try {
    const { categories, languages } = req.body;
    
    if (!preferences[req.user.id]) {
      preferences[req.user.id] = {};
    }
    
    if (categories) preferences[req.user.id].categories = categories;
    if (languages) preferences[req.user.id].languages = languages;
    
    res.json({ message: 'Preferences updated successfully', preferences: preferences[req.user.id] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getPreferences,
  updatePreferences
};