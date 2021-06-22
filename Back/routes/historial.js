'use strict'

var express = require('express');
var HistorialController = require('../controllers/historial');

var router = express.Router();

router.get('/home',HistorialController.home);
router.post('/test',HistorialController.test);
router.post('/save-historial',HistorialController.saveHistorial);
router.get('/historial/:id?',HistorialController.getHistorial); 
router.get('/historials',HistorialController.getHistorials); 
router.get('/historials-doctor/:id',HistorialController.getHistorialsByIdDoctor);
router.put('/historial/:id',HistorialController.updateHistorial); 
router.delete('/historial/:id',HistorialController.deleteHistorial); 

module.exports = router;