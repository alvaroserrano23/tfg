'use strict'

var UserAuthentication = require('../models/userAuthentication'); //Importar modelo
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var Utils = require('../Utils');

var jwt = require('jsonwebtoken');

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
		var userAuthentication = new UserAuthentication();

		if(!user || user.user == ""){
			return res.status(404).send({message:"El usuario " +"'"+ params.user +"'"+ " no existe"});
		}

		if(user.password !== params.password) return res.status(401).send({message:'La contraseña o el usuario son incorrectos'});
		userAuthentication.user = params.user;
		userAuthentication.password = params.password;
		userAuthentication.email = params.password;
		if(params.user.numColegiado){
			userAuthentication.role = "doctor";
		}else{
			userAuthentication.role= "patient";
		}

		userAuthentication.token = jwt.sign({_id:userAuthentication._id},'secret_key');

		console.log(params.user);
		return res.status(200).send({userAuthentication});
		
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

			return res.status(200).send({patient:userAuthenticationUpdated});
		});

	},
	generateCode: async function(req,res){
		var params = req.body;
		var user = await Doctor.findOne({email : params.email});
		var userAuthentication = new UserAuthentication();

		if(!user){
			return res.status(404).send({message:"Falso: Usuario existe, se envia correo"});
		}
		const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		userAuthentication.code= Math.random().toString(36).substring(0,6);
		UserAuthentication.updateOne(userAuthentication.user,userAuthentication.code);

		return userAuthentication.code;


	},

	deleteUserAuthentication: function(req,res){
		var userAuthenticationId = req.params.id;

		UserAuthentication.findByIdAndDelete(userAuthenticationId,(err,userAuthenticationRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el paciente'});
		
			if(!userAuthenticationId) return res.status(404).send({message: 'No existe el paciente'});

			return res.status(200).send({userAuthenticationRemoved});
		});
	},

	getUserByToken: function(req,res){
		if (req.headers && req.headers.authorization) {
			var authorization = req.headers.authorization.split(' ')[1],
				decoded;
			try {
				decoded = jwt.verify(authorization, secret.secretToken);
			} catch (e) {
				return res.status(401).send('unauthorized');
			}
			var userId = decoded.id;
			// Fetch the user by id 
			UserAuthentication.findOne({_id: userId}).then(function(user){
				// Do something with the user
				return res.status(200).send(user);
			});
		}
		return res.send(500);
	}

};


module.exports = controller;