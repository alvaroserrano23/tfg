'use strict'

var express = require('express');
var userAuthenticationController = require('../controllers/userAuthentication');

var router = express.Router();

router.get('/home',userAuthenticationController.home);
router.post('/test',userAuthenticationController.test);
router.post('/save-userAuth',userAuthenticationController.saveUserAuthentication); 
router.get('/userAuth/:id?',userAuthenticationController.getUserAuthentication); 
router.get('/userAuth/user/:user?',userAuthenticationController.getUserAuthenticationByUsername); 
router.get('/userAuths',userAuthenticationController.getUserAuthentications);
router.put('/userAuth/:id',userAuthenticationController.updateUserAuthentication); 
router.delete('/userAuth/:id',userAuthenticationController.deleteUserAuthentication); 
module.exports = router;