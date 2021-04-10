'use strict'
var Doctor = require('../models/doctor'); //Importar modelo

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

	saveDoctor: function(req,res){
		var doctor = new Doctor();
		var params = req.body;

		/*if( Doctor.find({ user: params._user })){
			return res.status(404).send({message:"El doctor " +"'"+ params._user +"'"+ " ya existe"});
		}*/
		
		doctor.name = params.name;
		doctor.surname = params.surname;
		doctor.user = params.user;
		doctor.email = params.email;
		doctor.password = params.password;
		doctor.location = params.location;
		doctor.address = params.addres;
		doctor.curriculum = params.curriculum;
		doctor.insurance = params.insurance;
		
		
			doctor.save((err,doctorGuardado) =>{
				if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

				if(!doctorGuardado) return res.status(404).send({message: 'No se ha podido guardar el doctor.'});

				return res.status(200).send({doctor:doctorGuardado});
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

	getDoctorByUsername:function(req,res){
		var doctorUsername = req.params.user;

		if(doctorUsername == null){
			return res.status(404).send({message: 'El doctor no existe.'});
		}

		Doctor.findOne({user: doctorUsername}).exec((err,doctor) => {
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