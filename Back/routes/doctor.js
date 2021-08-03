'use strict'

var express = require('express');
var DoctorController = require('../controllers/doctor');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./cvs'});
var multipartMiddleware2 = multipart({uploadDir: './imagenes'});

router.get('/home',DoctorController.home);
router.post('/test',DoctorController.test);
router.post('/save-doctor',DoctorController.saveDoctor); //Guardar nuevo doctor en la BD
router.get('/doctor/:id?',DoctorController.getDoctor); //Obtener un doctor de la BD
router.get('/doctors',DoctorController.getDoctors); //Obtener un listado de los doctores de la BD
router.get('/doctors-validados',DoctorController.getDoctorsValidados); //Obtener un listado de los doctores de la BD
router.put('/doctor/:id',DoctorController.updateDoctor); //Actualizar un doctor de la BD
router.delete('/doctor/:id',DoctorController.deleteDoctor); //Eliminar un doctor de la BD
router.post('/upload-cv/:id',multipartMiddleware,DoctorController.uploadCv);
router.post('/upload-imageD/:id',multipartMiddleware2,DoctorController.uploadImage);
router.get('/get-image/:image',DoctorController.getImageFile);
router.get('/get-cv/:cv',DoctorController.getCVFile);
router.put('/updateDoctorUserAuth',DoctorController.updateDoctorUserAuth);
module.exports = router;