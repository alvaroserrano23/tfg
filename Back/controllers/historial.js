'use strict'
var Historial = require('../models/historial');
const Patient = require('../models/patient');

var controller = {

	home: function(req,res){
		return res.status(200).send({
			message:'Soy la home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de historial"
		});
	},

	saveHistorial: async function(req,res){
        var historial = new Historial();
		var params = req.body;
        var historial_bd = await Historial.findOne({id_doctor :params.id_doctor, id_paciente: params.id_paciente});
		var patient_bd = await Patient.findOne({name: params.name,surname:params.surname});

		if(!patient_bd){
			return res.status(404).send({message:"El paciente no existe"});
		}
		if(historial_bd){
			return res.status(404).send({message:"Ya existe un historial con ese medico y ese paciente"});
		}
        
        //historial = req.body;
        historial.id_doctor = params.id_doctor;
        historial.id_paciente = patient_bd.id;
		historial.name = params.name;
		historial.surname = params.surname;
		historial.imagen_paciente = patient_bd.imagen;
		historial.email_paciente = patient_bd.email;
        historial.dni_paciente = params.dni_paciente;
        historial.edad_paciente = params.edad_paciente;
        historial.fecha_nacimiento_paciente = params.fecha_nacimiento_paciente;
        historial.patologias_paciente = params.patologias_paciente;
        historial.alergias_paciente = params.alergias_paciente;
        historial.vacunas_paciente = params.vacunas_paciente;
		historial.tratamientos = params.tratamientos;
		
		
		historial.save(async (err,historialGuardado) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!historialGuardado) return res.status(404).send({message: 'No se ha podido guardar el historial.'});

			console.log({historial:historialGuardado});

			return res.status(200).json({historialGuardado});
			
		});

	},

	getHistorial: function(req,res){
		var historialId = req.params.id;

		if(historialId == null){
			return res.status(404).send({message: 'El historial no existe.'});
		}

		Historial.findById(historialId, (err,historial) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!historial) return res.status(404).send({message: 'El historial no existe.'});

			return res.status(200).send({historial});
		});
	},

	getHistorials: function(req,res){

		Historial.find({}).exec((err,historials) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!historials) return res.status(404).send({message: 'No hay historials que mostrar'});

			return res.status(200).send({historials});
		})
	},

	getHistorialsByIdDoctor: function(req,res){
		var id = req.params.id;

		Historial.find({id_doctor:id}).exec((err,historials) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!historials) return res.status(404).send({message: 'No hay historials que mostrar'});

			return res.status(200).send({historials});
		})
	},

	updateHistorial: async function(req,res){
		var historialId = req.params.id;
		var update = req.body;
		Historial.findByIdAndUpdate(historialId,update, {new:true} ,(err,historialUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!historialUpdated) return res.status(404).send({message:'No existe historial para actulizar'});

			return res.status(200).send({historial:historialUpdated});
		});

	},

	deleteHistorial: function(req,res){
		var historialId = req.params.id;
		
		Historial.findByIdAndDelete(historialId,(err,historialRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar el historial'});
		
			if(!historialId) return res.status(404).send({message: 'No existe el historial'});

			return res.status(200).send({historialRemoved});
		});
	},

};


module.exports = controller;