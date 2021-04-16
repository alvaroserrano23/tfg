'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//Archivos de Rutas
var patient_routes = require('./routes/patient');
var appointment_routes = require('./routes/appointment');
var doctor_routes = require('./routes/doctor');
//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// CORS


//Rutas
//Patient
app.use('/api',patient_routes);
//Appointment
app.use('/api',appointment_routes);
//Doctor
app.use('/api',doctor_routes);
//exportar
module.exports = app;