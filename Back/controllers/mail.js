'use strict'
const nodemailer = require("nodemailer");
var Mail = require('../models/Mail');

async function sendMail(mail,callback){
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'serviciocorreotfg@gmail.com', // generated ethereal user
      pass: 'dwcmshdaicvqxgxw', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = await transporter.sendMail({
    from: mail.from, // sender address
    to: mail.to, // list of receivers
    subject: mail.subject, // Subject line
    text: mail.message, // plain text body
    //html: "<b>Hello world?</b>", // html body
    }); 

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

var controller = {

	home: function(req,res){
		return res.status(200).send({
			message:'Soy la home'
		});
	},

	test: function(req,res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador del appointment"
		});
	},

    sendEmail: function(req,res){
        var mail = new Mail();
        mail.to = req.body.to;
        mail.from = req.body.from;
        mail.subject = req.body.subject;
        mail.message = req.body.message;

        sendMail(mail,info => {
            console.log("El email se ha enviado correctamente.");
            res.send(info);
        })
    }
};

 

module.exports = controller;