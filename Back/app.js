'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//Archivos de Rutas
var historial_routes = require('./routes/historial');
var opinion_routes = require('./routes/opinion');
var patient_routes = require('./routes/patient');
var cita_routes = require('./routes/cita');
var doctor_routes = require('./routes/doctor');
var userAuthentication_routes = require('./routes/userAuthentication');
var mail_routes = require('./routes/mail');
//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Rutas
//UserAuthentication
app.use('/api',userAuthentication_routes);
//Patient
app.use('/api',patient_routes);
//Appointment
app.use('/api',cita_routes);
//Doctor
app.use('/api',doctor_routes);
//Mail
app.use('/api',mail_routes);
//Historial
app.use('/api',historial_routes);
//Opinion
app.use('/api',opinion_routes);
//exportar
module.exports = app;