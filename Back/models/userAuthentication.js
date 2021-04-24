'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserAuthenticationSchema = Schema({
	user:String,
	password:String,
	email:String,
	code:String,
    role:String
});

module.exports = mongoose.model('UserAuthentication', UserAuthenticationSchema);