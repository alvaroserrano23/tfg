'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = Schema({
	name:String,
	surname:String,
	user:String,
	email:String,
	password:String,
	province:String,
	location:String,
	address:String,
	cp:String,
	curriculum:String,
	insurance:String,
	numColegiado:String,
	numOpiniones:Number,
	imagen:String,
	especialidad:String,
	token:String
});

module.exports = mongoose.model('Doctor', DoctorSchema);
//la base de datos guarda este esquema, cambiando la primera letra mayuscula y poniendolo en plural -> Patient => patients