'use strict'
var Doctor = require('../models/doctor'); //Importar modelo
var Patient = require('../models/patient');
var Admin = require('../models/admin');
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
			message: "Soy el metodo o accion test del controlador del admin"
		});
	},
    
    saveAdmin: async function(req,res){
		var admin = new Admin();
		var params = req.body;
        var userAuthentication = new UserAuthentication();

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
		
		admin.name = params.name;
		admin.surname = params.surname;
		admin.user = params.user;
		admin.email = params.email;
		admin.password = params.password;
		admin.imagen = 'perfil1.png';
		
		
		admin.save(async (err,adminGuardado) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!adminGuardado) return res.status(404).send({message: 'No se ha podido guardar el admin.'});

			console.log({admin:adminGuardado});
			//Si no hay errores, rellenamos el userAuthentication con los datos del admin
			userAuthentication._id = admin._id;
			userAuthentication.user = admin.user;
			userAuthentication.password = admin.password;
			userAuthentication.email = admin.email;
			userAuthentication.role = "admin";
			
			await userAuthentication.save();

			const token = await jwt.sign({_id: userAuthentication._id}, 'secretkey');
			
			return res.status(200).json({adminGuardado});
			
		});

	},

    getAdmin: function(req,res){
		var adminId = req.params.id;

		if(adminId == null){
			return res.status(404).send({message: 'El admin no existe.'});
		}

		Admin.findById(adminId, (err,admin) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!admin) return res.status(404).send({message: 'El admin no existe.'});

			return res.status(200).send({admin});
		});
	},

	getAdmins: function(req,res){

		Admin.find({}).exec((err,admins) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!admins) return res.status(404).send({message: 'No hay admins que mostrar'});

			return res.status(200).send({admins});
		})
	},

	updateAdmin: async function(req,res){
		var adminId = req.params.id;
		var update = req.body;
		var adminBd = await Admin.findOne({user: update.user});
		var adminBd2 = await Admin.findOne({email: update.email});

		if(adminBd != null && adminBd.id != update.id){
			return res.status(404).send({message:'Nombre de usuario ya en uso.'});
		}else if(adminBd2 != null && adminBd2.id != update.id){
			return res.status(404).send({message:'Email ya en uso.'});
		}

		Admin.findByIdAndUpdate(adminId,update, {new:true} ,(err,adminUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!adminUpdated) return res.status(404).send({message:'No existe el admin para actulizar'});

			return res.status(200).send({admin:adminUpdated});
		});

	},

	deleteAdmin: function(req,res){
		var adminId = req.params.id;

		Admin.findByIdAndDelete(adminId,(err,adminRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el admin'});
		
			if(!adminId) return res.status(404).send({message: 'No existe el admin'});

			return res.status(200).send({adminRemoved});
		});
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

	uploadImage: function(req,res){
		var adminId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			Admin.findByIdAndUpdate(adminId,{image:fileName},{new:true},(err,adminUpdated)=>{
				if(err) return res.status(200).send({message: 'La imagen no se ha subido'});
				
				if(!adminUpdated) return res.status(404).send({message:'El admin no existe y no se ha asignado imagen'});
				return res.status(200).send({
					admin: adminUpdated
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
	}

}

module.exports = controller;