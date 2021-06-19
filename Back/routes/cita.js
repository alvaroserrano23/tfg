'use strict'

var express = require('express');
var CitaController = require('../controllers/cita');

var router = express.Router();

router.get('/home',CitaController.home);
router.post('/test',CitaController.test);
router.post('/save-cita',CitaController.saveCita);
router.get('/cita/:id?',CitaController.getCita); 
router.get('/citas',CitaController.getCitas); 
router.get('/citas-paciente/:id',CitaController.getCitasByIdPatient);
router.get('/citas-doctor/:id',CitaController.getCitasByIdDoctor);
router.put('/cita/:id',CitaController.updateCita); 
router.delete('/cita/:id',CitaController.deleteCita); 

module.exports = router;