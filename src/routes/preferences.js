const express = require('express');
const { getPreferences, updatePreferences } = require('../controllers/userController');
const { validatePreferences } = require('../middleware/validation');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getPreferences);
router.put('/', validatePreferences, updatePreferences);

module.exports = router;