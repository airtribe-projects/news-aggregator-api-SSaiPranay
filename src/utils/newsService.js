const axios = require('axios');

class NewsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://newsapi.org/v2';
    this.cache = new Map();
    this.cacheExpiration = 5 * 60 * 1000; // 5 minutes
  }

  async getTopHeadlines(preferences = {}) {
    const { categories = [], languages = ['en'], countries = ['us'] } = preferences;
    
    // Try to get from cache first
    const cacheKey = JSON.stringify(preferences);
    const cachedData = this.cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiration) {
      return cachedData.data;
    }
    
    try {
      // If no specific categories, get general headlines
      if (categories.length === 0) {
        const response = await axios.get(`${this.baseURL}/top-headlines`, {
          params: {
            country: countries[0],
            apiKey: this.apiKey
          }
        });
        
        const data = response.data.articles;
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      }
      
      // Get headlines for each category
      const allArticles = [];
      
      for (const category of categories) {
        const response = await axios.get(`${this.baseURL}/top-headlines`, {
          params: {
            category,
            country: countries[0],
            apiKey: this.apiKey
          }
        });
        
        if (response.data.articles) {
          allArticles.push(...response.data.articles);
        }
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Remove duplicates
      const uniqueArticles = allArticles.filter((article, index, self) =>
        index === self.findIndex(a => a.url === article.url)
      );
      
      this.cache.set(cacheKey, { data: uniqueArticles, timestamp: Date.now() });
      return uniqueArticles;
    } catch (error) {
      console.error('Error fetching news:', error.message);
      throw new Error('Failed to fetch news');
    }
  }

  async searchNews(keyword, preferences = {}) {
    const { languages = ['en'] } = preferences;
    
    try {
      const response = await axios.get(`${this.baseURL}/everything`, {
        params: {
          q: keyword,
          language: languages[0],
          sortBy: 'publishedAt',
          apiKey: this.apiKey
        }
      });
      
      return response.data.articles || [];
    } catch (error) {
      console.error('Error searching news:', error.message);
      throw new Error('Failed to search news');
    }
  }
}

module.exports = NewsService;