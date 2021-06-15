'use strict'

var UserAuthentication = require('../models/userAuthentication'); //Importar modelo
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { update } = require('../models/doctor');

var controller = {

	home: function(req,res){
		return res.status(200).send({
			message:'Soy la home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador del userAuthentication"
		});
	},

	loginAuth: async function(req,res){
		var params = req.body;

		var user = await Doctor.findOne({user : params.user});
		if(!user || user.user == ""){ //si doctor no existe probamos con paciente
			user = await Patient.findOne({user : params.user});
			if(!user || user.user == ""){ //si no existe ni doctor ni paciente devolvemos error
				return res.status(404).send({message:"El usuario " +"'"+ params.user +"'"+ " no existe"});
			}else{
				//Paciente
				if(user.password !== params.password) return res.status(401).send({message:'La contraseña o el usuario son incorrectos'});
				var patient = new Patient();
				patient = user;
				patient.token = jwt.sign({_id:patient._id},'secret_key');
				console.log(patient);
				return res.status(200).send({patient});

			}
		}

		//Doctor
		if(user.password !== params.password) return res.status(401).send({message:'La contraseña o el usuario son incorrectos'});
		var doctor = new Doctor();
		doctor = user;
		doctor.token = jwt.sign({_id:doctor._id},'secret_key');

		console.log(doctor);
		return res.status(200).send({doctor});
		
	},

	getUserAuthentication: function(req,res){
		var userAuthenticationId = req.params.id;

		if(userAuthenticationId == null){
			return res.status(404).send({message: 'El userAuthentication no existe.'});
		}

		UserAuthentication.findById(userAuthenticationId, (err,userAuthentication) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!userAuthentication) return res.status(404).send({message: 'El userAuthentication no existe.'+userAuthentication});

			return res.status(200).send({userAuthentication});
		});
	},

	getUserAuthentications: function(req,res){

		UserAuthentication.find({}).exec((err,userAuthentications) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!userAuthentications) return res.status(404).send({message: 'No hay userAuthentications que mostrar'});

			return res.status(200).send({userAuthentications});
		})
	},

	updateUserAuthentication: function(req,res){
		var userAuthenticationId = req.params.id;
		var update = req.body;

		UserAuthentication.findByIdAndUpdate(userAuthenticationId,update, {new:true} ,(err,userAuthenticationUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!userAuthenticationUpdated) return res.status(404).send({message:'No existe el userAuthentication para actulizar'});

			return res.status(200).send({userAuthenticationUpdated});
		});

	},
	generateCode: async function(req,res){
		var params = req.body;
		var user = await UserAuthentication.findOne({email : params.to});
		var userAuthentication = new UserAuthentication();
		userAuthentication = user;
		if(!user){
			return res.status(404).send({message:"Falso: Usuario existe, se envia correo"});
		}

		userAuthentication.code=uuidv4(); 
		UserAuthentication.findByIdAndUpdate(userAuthentication.id,userAuthentication, {new:true} ,(err,userAuthenticationUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!userAuthenticationUpdated) return res.status(404).send({message:'No existe el userAuthentication para actulizar'});

			return res.status(200).send({userAuthenticationUpdated});
		});
		
		


	},

	deleteUserAuthentication: function(req,res){
		var userAuthenticationId = req.params.id;

		UserAuthentication.findByIdAndDelete(userAuthenticationId,(err,userAuthenticationRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el paciente'});
		
			if(!userAuthenticationId) return res.status(404).send({message: 'No existe el paciente'});

			return res.status(200).send({userAuthenticationRemoved});
		});
	},

};


module.exports = controller;