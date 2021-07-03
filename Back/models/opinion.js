'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OpinionSchema = Schema({
    id_patient:String,
    id_doctor:String,
    nombre_doctor:String,
    nombre_patient:String,
    comentario:String,
    valoracion:Number
});

module.exports = mongoose.model('Opinion', OpinionSchema);