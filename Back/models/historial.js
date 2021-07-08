'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorialSchema = Schema({
	id_doctor:String,
    id_paciente:String,
    name:String,
    surname:String,
    imagen_paciente:String,
    dni_paciente:String,
    edad_paciente:Number,
    email_paciente:String,
    fecha_nacimiento_paciente:String,
    patologias_paciente:String,
    alergias_paciente:String,
    vacunas_paciente:String,
    tratamientos:String
});

module.exports = mongoose.model('Historial', HistorialSchema);
        