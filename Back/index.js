'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //Importamos la variable app de app.js
var port = 3700; //Puerto del servidor
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/findyourdoctorbd')
		.then(()=>{
			console.log("Conexion a la base de datos establecida satisfactoriamente...");

			// Creacion del servidor 
			app.listen(port,()=>{
				console.log("Servidor corriendo correctamente en la url: localhost:3700");
			});
		})
		.catch(err => console.log(err));