'use strict'

var Patient = require('../models/patient'); //Importar modelo
var UserAuthentication = require('../models/userAuthentication');

var jwt = require('jsonwebtoken');

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


	savePatient: async function(req,res){
		var patient = new Patient();
		var userAuthentication = new UserAuthentication();
		var params = req.body;

		//Si el user existe no lo damos de alta
		var user = await Patient.findOne({user : params.user});
		if(user){
			return res.status(404).send({message:"El paciente " +"'"+ params.user +"'"+ " ya existe"});
		}
		patient.name = params.name;
		patient.surname = params.surname;
		patient.user = params.user;
		patient.email = params.email;
		patient.password = params.password;
		patient.province = params.province;
		patient.location = params.location;
		patient.address = params.address;
		patient.cp = params.cp;
		patient.insurance = params.insurance;
		patient.imagen = params.imagen;

		patient.save(async (err,patientGuardado) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!patientGuardado) return res.status(404).send({message: 'No se ha podido guardar el paciente.'});

			console.log({patient: patientGuardado});
			//Si no hay errores, rellenamos el userAuthentication con los datos del paciente
			userAuthentication._id = patient._id;
			userAuthentication.user = patient.user;
			userAuthentication.password = patient.password;
			userAuthentication.email = patient.email;
			userAuthentication.role = "patient";
			
			await userAuthentication.save();

			const token = await jwt.sign({_id: userAuthentication._id}, 'secretkey');
			
			return res.status(200).json({token});
			
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