'use strict'

var Patient = require('../models/patient'); //Importar modelo

var controller = {

	home: function(req,res){
		return res.status(200).send({
			message:'Soy la home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador del patient"
		});
	},


	savePatient: function(req,res){
		var patient = new Patient();

		var params = req.body;
		/*if(Patient.findOne(params._user)){
			return res.status(404).send({message: 'El paciente ya existe'});
		}*/
		patient.name = params._name;
		patient.surname = params._surname;
		patient.user = params._user;
		patient.email = params._email;
		patient.password = params._password;
		patient.location = params._location;
		patient.address = params._address;
		patient.insurance = params._insurance;

		patient.save((err,patientStored) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!patientStored) return res.status(404).send({message: 'No se ha podido guardar el paciente.'});

			return res.status(200).send({patient:patientStored});
		});
	},

	getPatient: function(req,res){
		var patientId = req.params.id;

		if(patientId == null){
			return res.status(404).send({message: 'El paciente no existe.'});
		}

		Patient.findById(patientId, (err,patient) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!patient) return res.status(404).send({message: 'El paciente no existe.'});

			return res.status(200).send({patient});
		});
	},

	getPatientByUsername:function(req,res){
		var patientUsername = req.params.user;

		if(patientUsername == null){
			return res.status(404).send({message: 'El paciente no existe.'});
		}

		Patient.findOne({user: patientUsername}).exec((err,patient) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!patient) return res.status(404).send({message: 'El paciente no existe.'});

			return res.status(200).send({patient});
		});
	},

	getPatients: function(req,res){

		Patient.find({}).exec((err,patients) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!patients) return res.status(404).send({message: 'No hay pacientes que mostrar'});

			return res.status(200).send({patients});
		})
	},

	updatePatient: function(req,res){
		var patientId = req.params.id;
		var update = req.body;

		Patient.findByIdAndUpdate(patientId,update, {new:true} ,(err,patientUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!patientUpdated) return res.status(404).send({message:'No existe el paciente para actulizar'});

			return res.status(200).send({patient:patientUpdated});
		});

	},

	deletePatient: function(req,res){
		var patientId = req.params.id;

		Patient.findByIdAndDelete(patientId,(err,patientRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el paciente'});
		
			if(!patientId) return res.status(404).send({message: 'No existe el paciente'});

			return res.status(200).send({patientRemoved});
		});
	}

};


module.exports = controller;