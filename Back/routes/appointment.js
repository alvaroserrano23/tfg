'use strict'

var express = require('express');
var AppointmentController = require('../controllers/appointment');

var router = express.Router();

router.get('/home',AppointmentController.home);
router.post('/test',AppointmentController.test);

module.exports = router;