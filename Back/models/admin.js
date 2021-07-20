'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
	name:String,
	surname:String,
	user:String,
	email:String,
	password:String,
	imagen:String,
	token:String
});

module.exports = mongoose.model('Admin', AdminSchema);
