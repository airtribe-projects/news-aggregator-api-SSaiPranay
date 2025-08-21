const validateRegistration = (req, res, next) => {
  const { email, password } = req.body;
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  // Password validation
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  next();
};

const validatePreferences = (req, res, next) => {
  const { categories, languages } = req.body;
  
  if (categories && !Array.isArray(categories)) {
    return res.status(400).json({ error: 'Categories must be an array' });
  }
  
  if (languages && !Array.isArray(languages)) {
    return res.status(400).json({ error: 'Languages must be an array' });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validatePreferences
};