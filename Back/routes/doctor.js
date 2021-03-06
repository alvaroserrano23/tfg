'use strict'

var express = require('express');
var DoctorController = require('../controllers/doctor');

var router = express.Router();

router.get('/home',DoctorController.home);
router.post('/test',DoctorController.test);
router.post('/save-doctor',DoctorController.saveDoctor); //Guardar nuevo doctor en la BD
router.get('/doctor/:id?',DoctorController.getDoctor); //Obtener un doctor de la BD
router.get('/doctor/user/:user?',DoctorController.getDoctorByUsername); 
router.get('/doctors',DoctorController.getDoctors); //Obtener un listado de los doctores de la BD
router.put('/doctor/:id',DoctorController.updateDoctor); //Actualizar un doctor de la BD
router.delete('/doctor/:id',DoctorController.deleteDoctor); //Eliminar un doctor de la BD

module.exports = router;