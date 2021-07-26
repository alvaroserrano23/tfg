'use strict'
var Doctor = require('../models/doctor'); //Importar modelo
var Patient = require('../models/patient');
var Admin = require('../models/admin');
var UserAuthentication = require('../models/userAuthentication');

var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
const doctor = require('../models/doctor');
const admin = require('../models/admin');

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

		//Si el user/email existe no lo damos de alta
		var userD = await Doctor.findOne({user : params.user});
		var userP = await Patient.findOne({user : params.user});
		var userA = await Admin.findOne({user: params.user});
		var emailD = await Doctor.findOne({email : params.email});
		var emailP = await Patient.findOne({email : params.email});
		var emailA = await Admin.findOne({email: params.email});

		if(userD || userP || userA || emailD || emailP || emailA){
			return res.status(404).send({message:"El usuario " +"'"+ params.user +"'"+ " ya existe"});
		}
		
		doctor.name = params.name;
		doctor.surname = params.surname;
		doctor.user = params.user;
		doctor.email = params.email;
		doctor.password = params.password;
		doctor.address = params.address;
		doctor.province = params.province;
		doctor.comunidad = params.comunidad;
		doctor.cp = params.cp
		doctor.curriculum = params.curriculum;
		doctor.insurance = params.insurance;
		doctor.numColegiado = params.numColegiado;
		doctor.especialidad = params.especialidad;
		doctor.cv = params.cv;
		doctor.numOpiniones = params.numOpiniones;
		doctor.imagen = 'perfil1.png';
		
		
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
			
			return res.status(200).json({doctorGuardado});
			
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

	updateDoctor: async function(req,res){
		var doctorId = req.params.id;
		var update = req.body;
		var doctorBd = await Doctor.findById(doctorId);

		var userA = await Doctor.findOne({user : update.user});
		var userB = await Doctor.findOne({email : update.email});

		if(userA != null && userA.id != update.id){
			return res.status(404).send({message:'Nombre de usuario ya en uso'});
		}else if(userB != null && userB.id != update.id){
			return res.status(404).send({message:'Email ya en uso'});
		} 

		if(req.body.numOpiniones > doctorBd.numOpiniones){
			delete update.password;
		}

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
	},

	uploadImage: function(req,res){
		var doctorId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			Doctor.findByIdAndUpdate(doctorId,{image:fileName},{new:true},(err,doctorUpdated)=>{
				if(err) return res.status(200).send({message: 'La imagen no se ha subido'});
				
				if(!doctorUpdated) return res.status(404).send({message:'El doctor no existe y no se ha asignado imagen'});
				return res.status(200).send({
					doctor: doctorUpdated
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

	uploadCv: function(req,res){
		var doctorId = req.params.id;
		var fileName = 'CV no subido...';

		if(req.files){
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			Doctor.findByIdAndUpdate(doctorId,{image:fileName},{new:true},(err,doctorUpdated)=>{
				if(err) return res.status(200).send({message: 'La imagen no se ha subido'});
				
				if(!doctorUpdated) return res.status(404).send({message:'El doctor no existe y no se ha asignado imagen'});
				return res.status(200).send({
					doctor: doctorUpdated
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

	updateDoctorUserAuth: async function(req,res){
		var params = req.body;
		var doctor = await Doctor.findOne({id:params.id});
		doctor.password = params.password;
		
		Doctor.findByIdAndUpdate(doctor.id,doctor, {new:true} ,(err,doctorUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!doctorUpdated) return res.status(404).send({message:'No existe el doctor para actualizar'});

			return res.status(200).send({doctor:doctorUpdated});
		});

	}

};


module.exports = controller;