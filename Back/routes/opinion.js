'use strict'

var express = require('express');
var OpinionController = require('../controllers/opinion');

var router = express.Router();

router.get('/home',OpinionController.home);
router.post('/test',OpinionController.test);
router.post('/save-opinion',OpinionController.saveOpinion);
router.get('/opinion/:id?',OpinionController.getOpinion); 
router.get('/opiniones',OpinionController.getOpiniones); 
router.get('/opiniones-paciente/:id',OpinionController.getOpinionesByIdPatient);
router.get('/opiniones-doctor/:id',OpinionController.getOpinionesByIdDoctor);
router.put('/opinion/:id',OpinionController.updateOpinion); 
router.delete('/opinion/:id',OpinionController.deleteOpinion); 

module.exports = router;