'use strict'
var Cita = require('../models/cita');

var controller = {

	home: function(req,res){
		return res.status(200).send({
			message:'Soy la home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de cita"
		});
	},

	saveCita: async function(req,res){
        var cita = new Cita();
		var params = req.body;
        var cita_bd = await Cita.findOne({fecha : params.fecha , hora : params.hora});

		if(cita_bd){
			return res.status(404).send({message:"Ya existe una cita con esa fecha y esa hora"});
		}
        
	
        cita.asunto = params.asunto;
        cita.descripcion = params.descripcion;
        cita.id_paciente = params.id_paciente;
        cita.id_doctor = params.id_doctor;
        cita.fecha = params.fecha;
        cita.hora = params.hora;
        cita.direccion_consulta = params.direccion_consulta;
        cita.estado = params.estado;
		
		
		cita.save(async (err,citaGuardada) =>{
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!citaGuardada) return res.status(404).send({message: 'No se ha podido guardar la cita.'});

			console.log({cita:citaGuardada});

			return res.status(200).json({citaGuardada});
			
		});

	},

	getCita: function(req,res){
		var citaId = req.params.id;

		if(citaId == null){
			return res.status(404).send({message: 'La cita no existe.'});
		}

		Cita.findById(citaId, (err,cita) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!cita) return res.status(404).send({message: 'La cita no existe.'});

			return res.status(200).send({cita});
		});
	},

	getCitas: function(req,res){

		Cita.find({}).exec((err,citas) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!citas) return res.status(404).send({message: 'No hay citas que mostrar'});

			return res.status(200).send({citas});
		})
	},

	updateCita: function(req,res){
		var citaId = req.params.id;
		var update = req.body;

		Cita.findByIdAndUpdate(citaId,update, {new:true} ,(err,citaUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!citaUpdated) return res.status(404).send({message:'No existe la cita para actulizar'});

			return res.status(200).send({cita:citaUpdated});
		});

	},

	deleteCita: function(req,res){
		var citaId = req.params.id;

		Cita.findByIdAndDelete(citaId,(err,citaRemoved)=>{
			if(err) return res.status(500).send({message: 'No se ha podido borrar la cita'});
		
			if(!citaId) return res.status(404).send({message: 'No existe la cita'});

			return res.status(200).send({citaRemoved});
		});
	},

};


module.exports = controller;