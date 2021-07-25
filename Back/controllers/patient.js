'use strict'

var Patient = require('../models/patient'); //Importar modelo
var Doctor = require('../models/doctor'); //Importar modelo
var Admin = require('../models/admin');
var UserAuthentication = require('../models/userAuthentication');
var fs = require('fs');
var path = require('path');
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
		var userD = await Doctor.findOne({user : params.user});
		var userP = await Patient.findOne({user : params.user});
		var userA = await Admin.findOne({user: params.user});
		var emailD = await Doctor.findOne({email : params.email});
		var emailP = await Patient.findOne({email : params.email});
		var emailA = await Admin.findOne({email: params.email});

		if(userD || userP || userA || emailD || emailP || emailA){
			return res.status(404).send({message:"El usuario " +"'"+ params.user +"'"+ " ya existe"});
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
		patient.imagen = 'perfil1.png';
		patient.telefono = params.telefono;

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

	updatePatient: async function(req,res){
		var patientId = req.params.id;
		var update = req.body;
		var userA = await Patient.findOne({user : update.user});
		var userB = await Patient.findOne({email : update.email});

		if(userA != null && userA.id != update.id){
			return res.status(404).send({message:'Nombre de usuario ya en uso'});
		}else if(userB != null && userB.id != update.id){
			return res.status(404).send({message:'Email ya en uso'});
		} 
		if(req.body.telefono != undefined){
			delete update.password;
		}
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
	},

	uploadImage: function(req,res){
		var patientId = req.body._id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			Patient.findByIdAndUpdate(patientId,{image:fileName},{new:true},(err,patientUpdated)=>{
				if(err) return res.status(200).send({message: 'La imagen no se ha subido'});
				
				if(!patientUpdated) return res.status(404).send({message:'El paciente no existe y no se ha asignado imagen'});
				return res.status(200).send({
					patient: patientUpdated
				});
			});
			}else{
				fs.unlink(filePath,(err)=>{
					return res.status(200).send({message: 'La extension no es valida'});
				});
			} 

		}else{
			return res.status(200).send({
				message: fileName
			})
		}
	},

	getImageFile: function(req,res){
		var file = req.params.image;
		var path_file = './imagenes/'+file;

		fs.exists(path_file,(exists)=>{
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				})
			}
		});
	},

	updatePatientUserAuth: async function(req,res){
		var params = req.body;
		var patient = await Patient.findOne({id:params.id});
		patient.password = params.password;
		
		Patient.findByIdAndUpdate(patient.id,patient, {new:true} ,(err,patientUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!patientUpdated) return res.status(404).send({message:'No existe el paciente para actualizar'});

			return res.status(200).send({patient:patientUpdated});
		});

	}

};


module.exports = controller;