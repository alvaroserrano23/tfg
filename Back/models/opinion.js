'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OpinionSchema = Schema({
    id_paciente:String,
    id_doctor:String,
    descripcion:String,
    valoracion:Number
});

module.exports = mongoose.model('Opinion', OpinionSchema);