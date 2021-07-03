'use strict'
var Opinion = require('../models/opinion');

var controller = {

	home: function(req,res){
		return res.status(200).send({
			message:'Soy la home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de opinion"
		});
	},

	saveOpinion: async function(req,res){
        var opinion = new Opinion();
		var params = req.body;
        var opinion_bd = await Opinion.findOne({id_doctor :params.id_doctor, id_patient: params.id_patient});

		if(opinion_bd){
			return res.status(404).send({message:"Ya existe una opinion con ese doctor y paciente"});
		}
        
        opinion.id_doctor = params.id_doctor;
        opinion.id_patient = params.id_patient;
        opinion.comentario = params.comentario;
        opinion.valoracion = params.valoracion;
		
		
		opinion.save(async (err,opinionGuardada) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!opinionGuardada) return res.status(404).send({message: 'No se ha podido guardar la opinion.'});

			console.log({opinion:opinionGuardada});

			return res.status(200).json({opinionGuardada});
			
		});

	},

	getOpinion: function(req,res){
		var opinionId = req.params.id;

		if(opinionId == null){
			return res.status(404).send({message: 'La opinion no existe.'});
		}

		Opinion.findById(opinionId, (err,opinion) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!opinion) return res.status(404).send({message: 'La opinion no existe.'});

			return res.status(200).send({opinion});
		});
	},

	getOpiniones: function(req,res){

		Opinion.find({}).exec((err,opiniones) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!opiniones) return res.status(404).send({message: 'No hay opiniones que mostrar'});

			return res.status(200).send({opiniones});
		})
	},

	getOpinionesByIdPatient: function(req,res){
		var id = req.params.id;

		Opinion.find({id_paciente:id}).exec((err,opiniones) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!opiniones) return res.status(404).send({message: 'No hay opiniones que mostrar'});

			return res.status(200).send({opiniones});
		})
	},

	getOpinionesByIdDoctor: function(req,res){
		var id = req.params.id;

		Opinion.find({id_doctor:id}).exec((err,opiniones) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!opiniones) return res.status(404).send({message: 'No hay opiniones que mostrar'});

			return res.status(200).send({opiniones});
		})
	},

	updateOpinion: function(req,res){
		var opinionId = req.params.id;
		var update = req.body;

		Opinion.findByIdAndUpdate(opinionId,update, {new:true} ,(err,opinionUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!opinionUpdated) return res.status(404).send({message:'No existe la opinion para actulizar'});

			return res.status(200).send({opinion:opinionUpdated});
		});

	},

	deleteOpinion: function(req,res){
		var opinionId = req.params.id;

		Opinion.findByIdAndDelete(opinionId,(err,opinionRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar la opinion'});
		
			if(!opinionId) return res.status(404).send({message: 'No existe la opinion'});

			return res.status(200).send({opinionRemoved});
		});
	},

};


module.exports = controller;