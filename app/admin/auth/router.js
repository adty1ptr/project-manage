const router = require('express').Router();
const authController = require('./controller');

router.post('/auth/login', authController.login);

module.exports = router;