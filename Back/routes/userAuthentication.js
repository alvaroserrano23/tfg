'use strict'

var express = require('express');
var userAuthenticationController = require('../controllers/userAuthentication');

var router = express.Router();

router.get('/home',userAuthenticationController.home);
router.post('/test',userAuthenticationController.test);
router.post('/login-auth',userAuthenticationController.loginAuth);
router.get('/userAuth/:id?',userAuthenticationController.getUserAuthentication); 
router.get('/userAuths',userAuthenticationController.getUserAuthentications);
router.put('/userAuth/:id',userAuthenticationController.updateUserAuthentication); 
router.delete('/userAuth/:id',userAuthenticationController.deleteUserAuthentication); 
router.post('/generate-code',userAuthenticationController.generateCode);
router.get('/getUserByToken/:token',userAuthenticationController.getUserByToken);
module.exports = router;