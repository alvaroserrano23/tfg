'use strict'

var express = require('express');
var AdminController = require('../controllers/admin');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware2 = multipart({uploadDir: './imagenes'});

router.get('/home',AdminController.home);
router.post('/test',AdminController.test);
router.post('/save-admin',AdminController.saveAdmin);
router.get('/admin/:id?',AdminController.getAdmin); 
router.get('/admins',AdminController.getAdmins);
router.put('/admin/:id',AdminController.updateAdmin); 
router.delete('/admin/:id',AdminController.deleteAdmin); 
router.put('/updateAdminUserAuth',AdminController.updateAdminUserAuth);
router.post('/upload-imageA/:id',multipartMiddleware2,AdminController.uploadImage);
router.get('/get-image/:image',AdminController.getImageFile);
module.exports = router;