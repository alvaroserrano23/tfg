'use strict'

var express = require('express');
var PatientController = require('../controllers/patient');

var router = express.Router();

router.get('/home',PatientController.home);
router.post('/test',PatientController.test);
router.post('/save-patient',PatientController.savePatient); //Guardar nuevo paciente en la BD
router.get('/patient/:id?',PatientController.getPatient); //Obtener un paciente de la BD
router.get('/patients',PatientController.getPatients); //Obtener un listado de los pacientes de la BD
router.put('/patient/:id',PatientController.updatePatient); //Actualizar un paciente de la BD
router.delete('/patient/:id',PatientController.deletePatient); //Eliminar un paciente de la BD
router.get('/get-image/:image',PatientController.getImageFile);
router.put('/updatePatientUserAuth',PatientController.updatePatientUserAuth);
module.exports = router;