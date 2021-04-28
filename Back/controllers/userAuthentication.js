'use strict'

var UserAuthentication = require('../models/userAuthentication'); //Importar modelo

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


	saveUserAuthentication: async function(req,res){
		var userAuthentication = new UserAuthentication();

		var params = req.body;

		//Si el user existe no lo damos de alta
		var user = await UserAuthentication.findOne({user : params.user});
		if(user){
			return res.status(404).send({message:"El usuario " +"'"+ params.user +"'"+ " ya existe"});
		}
		userAuthentication.user = params.user;
		userAuthentication.password = params.password;
		userAuthentication.email = params.email;
		userAuthentication.code = params.code;
        userAuthentication.role = params.role;

		userAuthentication.save((err,userAuthenticationStored) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!userAuthenticationStored) return res.status(404).send({message: 'No se ha podido guardar el userAuthentication.'});

			return res.status(200).send({userAuthentication:userAuthenticationStored});
		});
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

	getUserAuthenticationByUsername:function(req,res){
		var userAuthenticationUsername = req.params.user;

		if(userAuthenticationUsername == null){
			return res.status(404).send({message: 'El userAuthentication no existe.'});
		}

		UserAuthentication.findOne({user: userAuthenticationUsername}).exec((err,userAuthentication) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!userAuthentication) return res.status(404).send({message: 'El UserAuthentication no existe.'});

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

	deleteUserAuthentication: function(req,res){
		var userAuthenticationId = req.params.id;

		UserAuthentication.findByIdAndDelete(userAuthenticationId,(err,userAuthenticationRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el paciente'});
		
			if(!userAuthenticationId) return res.status(404).send({message: 'No existe el paciente'});

			return res.status(200).send({userAuthenticationRemoved});
		});
	}

};


module.exports = controller;