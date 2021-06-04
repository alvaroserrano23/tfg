'use strict'
var Doctor = require('../models/doctor'); //Importar modelo
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
			message: "Soy el metodo o accion test del controlador del doctor"
		});
	},

	saveDoctor: async function(req,res){
		var doctor = new Doctor();
		var userAuthentication = new UserAuthentication();
		var params = req.body;

		//Si el user existe no lo damos de alta
		var user = await Doctor.findOne({user : params.user});
		if(user){
			return res.status(404).send({message:"El doctor " +"'"+ params.user +"'"+ " ya existe"});
		}
		
		doctor.name = params.name;
		doctor.surname = params.surname;
		doctor.user = params.user;
		doctor.email = params.email;
		doctor.password = params.password;
		doctor.province = params.province;
		doctor.location = params.location;
		doctor.address = params.addres;
		doctor.cp = params.cp
		doctor.curriculum = params.curriculum;
		doctor.insurance = params.insurance;
		doctor.numColegiado = params.numColegiado;
		
		
		doctor.save(async (err,doctorGuardado) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!doctorGuardado) return res.status(404).send({message: 'No se ha podido guardar el doctor.'});

			console.log({doctor:doctorGuardado});
			//Si no hay errores, rellenamos el userAuthentication con los datos del doctor
			userAuthentication._id = doctor._id;
			userAuthentication.user = doctor.user;
			userAuthentication.password = doctor.password;
			userAuthentication.email = doctor.email;
			userAuthentication.role = "doctor";
			
			await userAuthentication.save();

			const token = await jwt.sign({_id: userAuthentication._id}, 'secretkey');
			
			return res.status(200).json({token});
			
		});

	},

	getDoctor: function(req,res){
		var doctorId = req.params.id;

		if(doctorId == null){
			return res.status(404).send({message: 'El doctor no existe.'});
		}

		Doctor.findById(doctorId, (err,doctor) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!doctor) return res.status(404).send({message: 'El doctor no existe.'});

			return res.status(200).send({doctor});
		});
	},

	getDoctors: function(req,res){

		Doctor.find({}).exec((err,doctors) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!doctors) return res.status(404).send({message: 'No hay doctores que mostrar'});

			return res.status(200).send({doctors});
		})
	},

	updateDoctor: function(req,res){
		var doctorId = req.params.id;
		var update = req.body;

		Doctor.findByIdAndUpdate(doctorId,update, {new:true} ,(err,doctorUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!doctorUpdated) return res.status(404).send({message:'No existe el doctor para actulizar'});

			return res.status(200).send({doctor:doctorUpdated});
		});

	},

	deleteDoctor: function(req,res){
		var doctorId = req.params.id;

		Doctor.findByIdAndDelete(doctorId,(err,doctorRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el paciente'});
		
			if(!doctorId) return res.status(404).send({message: 'No existe el doctor'});

			return res.status(200).send({doctorRemoved});
		});
	}

};


module.exports = controller;