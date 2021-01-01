var express = require('express');
var router = express.Router();
const { socialLoginController } = require('../controllers');

router.post('/google/callback', socialLoginController.googleLoginRedirect)

module.exports = router;