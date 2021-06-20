'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitaSchema = Schema({
	asunto:String,
	descripcion:String,
	id_paciente:String,
	id_doctor:String,
	nombre_doctor:String,
	nombre_paciente:String,
	fecha:String,
	hora:String,
	direccion_consulta:String,
	estado:String
});

module.exports = mongoose.model('Cita', CitaSchema);
//la base de datos guarda este esquema, cambiando la primera letra mayuscula y poniendolo en plural -> Patient => patients