const express = require('express');
const { register, login } = require('../controllers/userController');
const { validateRegistration } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);

module.exports = router;