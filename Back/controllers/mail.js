'use strict'
const nodemailer = require("nodemailer");
var Mail = require('../models/Mail');
var UserAuthentication = require('../models/userAuthentication');
var contentHTML ="";
const { v4: uuidv4 } = require('uuid');

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
  }else if(mail.type =="recuperarcontraseña"){
    mail.from = "serviciocorreotfg@gmail.com";
    mail.subject = "¿Olvidaste tu contraseña?";
    contentHTML = mail.message;
  }else if(mail.type == "cambio contraseña"){
    mail.from = "serviciocorreotfg@gmail.com";
    mail.subject = "Cambio de contraseña";
    contentHTML = mail.message;
  
  }else if(mail.type == "citaP"){
    mail.from = "serviciocorreotfg@gmail.com";
    mail.subject = "Aqui esta tu cita";
    contentHTML = mail.message;
    //mail.to = "serviciocorreotfg@gmail.com"; //Para probar

  }else if(mail.type == "citaD"){
    mail.from = "serviciocorreotfg@gmail.com";
    mail.subject = "Solicitud de cita";
    contentHTML = mail.message;
    //mail.to = "serviciocorreotfg@gmail.com"; //Para probar

  }else if(mail.type == "dar opinion"){
    mail.from = "serviciocorreotfg@gmail.com";
    //mail.to = "serviciocorreotfg@gmail.com";
    mail.subject = "Opinion";
    contentHTML = mail.message;
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

    //let info = await transporter.sendMail(mailOptions);
    
    callback(mailOptions);
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
            console.log("El email se ha enviado correctamente."+mail.type);
            res.send(info);
        })
    },

    sendEmailRecuperacion: async function(req,res){
      var params = req.body;
      var user = await UserAuthentication.findOne({email : params.to});
      var userAuthentication = new UserAuthentication();
      userAuthentication = user;
      if(!user){
        return res.status(404).send({message:"Falso: Usuario existe, se envia correo"});
      }
      userAuthentication.code=uuidv4(); 
		UserAuthentication.findByIdAndUpdate(userAuthentication.id,userAuthentication, {new:true} ,(err,userAuthenticationUpdated)=>{
			if(err) return res.status(500).send({message:'Error al actualizar'});

			if(!userAuthenticationUpdated) return res.status(404).send({message:'No existe el userAuthentication para actulizar'});

		});
      var mail = new Mail();
      mail.code = userAuthentication.code;
      mail.to = req.body.to;
      mail.from = req.body.from;
      mail.subject = req.body.subject;
      mail.type = req.body.type;
      mail.message = "<h1>Recuperación de contraseña</h1><p>Introduce el siguiente código para continuar con el proceso de recuperación de contraseña<ul><li><b>Código de recuperación:</b> "+mail.code;
      
      
      
      sendMail(mail,info => {
        console.log("El email se ha enviado correctamente."+mail.type);
        res.send(info);
      })

    }
};

 

module.exports = controller;