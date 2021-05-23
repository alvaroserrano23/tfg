'use strict'
const nodemailer = require("nodemailer");
var Mail = require('../models/Mail');
var UserAuthentication = require('../models/userAuthentication');
var contentHTML ="";

async function sendMail(mail,callback){

  if(mail.type == "contacto"){
    contentHTML = `
        <h1>Formulario de contacto</h1>
        <ul>
            <li>De: ${mail.from}</li>
            <li>Asunto: ${mail.subject}</li>
            <li>Mensaje: ${mail.message}</li>
        </ul>
    `;
  }else if(mail.type="recuperarcontraseña"){
    mail.from = "serviciocorreotfg@gmail.com";
    contentHTML = `
    <h1>Recuperación de contraseña</h1>
    <p>Hola ${mail.to}, este es tu código de recuperación de contraseña:</p>
`;

  }else{
    contentHTML = "";
  }
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
    html: contentHTML, // html body
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
        mail.type = req.body.type;
        
        sendMail(mail,info => {
            console.log("El email se ha enviado correctamente.");
            res.send(info);
        })
    }
};

 

module.exports = controller;