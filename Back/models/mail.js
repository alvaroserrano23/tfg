'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MailSchema = Schema({
	to:String,
	from:String,
	subject:String,
	message:String
});

module.exports = mongoose.model('Mail', MailSchema);