'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = Schema({
	name:String,
	surname:String,
	user:String,
	email:String,
	password:String,
	location:String,
	address:String,
	insurance:String
});

module.exports = mongoose.model('Patient', PatientSchema);
//la base de datos guarda este esquema, cambiando la primera letra mayuscula y poniendolo en plural -> Patient => patients