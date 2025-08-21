import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const preferencesRoutes = require('./routes/preferences');
// const newsRoutes = require('./routes/news');
import authRoutes from './routes/auth.js';
import preferencesRoutes from './routes/preferences.js';
import newsRoutes from './routes/news.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/preferences', preferencesRoutes);
app.use('/news', newsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'News Aggregator API is running' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;