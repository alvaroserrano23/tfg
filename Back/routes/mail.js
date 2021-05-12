'use strict'

var express = require('express');
var MailController = require('../controllers/mail');

var router = express.Router();

router.get('/home',MailController.home);
router.post('/test',MailController.test);
router.post('/sendEmail',MailController.sendEmail);
module.exports = router;