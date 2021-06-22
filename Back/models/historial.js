'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorialSchema = Schema({
	id_doctor:String,
    id_paciente:String,
    dni_paciente:String,
    edad_paciente:Number,
    fecha_nacimiento_paciente:String,
    patologias_paciente:String,
    alergias_paciente:String,
    vacunas_paciente:String
});

module.exports = mongoose.model('Historial', HistorialSchema);
        