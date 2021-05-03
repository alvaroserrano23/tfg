import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { UserAuthentication } from '../../models/userAuthentication';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { UserAuthenticationService } from '../../services/userAuthentication.service';

import * as $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PatientService,DoctorService,UserAuthenticationService]
})
export class LoginComponent implements OnInit {
  public title:string;
	public title2:string;
  public title3:string;
  public title4:string;
  public title5:string;
  public title6:string;
  public patient:Patient;
  public doctor: Doctor;
  public userAuthentication: UserAuthentication;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private UserAuthenticationService: UserAuthenticationService,
    private router: Router

    ) { 
    //Titulos
  	this.title = "Tipo de cuenta";
  	this.title2 = "Iniciar sesión";
    this.title3 = "Registrarse como Medico";
    this.title4 = "Registrarse como Paciente";
    this.title5 = "¿Olvidaste tu contraseña?";
    
    
    this.patient = new Patient('','','','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','','','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','');
    }

  ngOnInit(): void {
    
    $("#container_forgot").hide();

    $("#container_sms").hide();

    $("#container_newpass").hide();

    //Olvidaste contraseña
    $("#forgot").click(function(e){
      $("#container_forgot").show();
      $("#formInU").hide(500);
    });
  }

  onSubmitForgotPassword(form){
    //Validar que el email existe en la base de datos
    //OK
    alert("Te hemos enviado un correo con un codigo de recuperación");
    $("#container_forgot").hide();
    $("#container_sms").show();
  }

  onSubmitCodigoRecuperacionForm(form){
    //Validar que el codigo es correcto
    $("#container_sms").hide();
    $("#container_newpass").show();
    
  }
  onSubmitNuevaContrasenaForm(form){

  }
 
  onSubmitInU() {
    this.UserAuthenticationService.loginAuth(this.userAuthentication)
      .subscribe(
        res => {
          console.log(res.userAuthentication);
          alert("Se ha iniciado sesión correctamente");
          localStorage.setItem('token', res.token);
          this.router.navigate(['/sobre-nosotros']);
        },
        err => console.log(err)
      )
  }
}
