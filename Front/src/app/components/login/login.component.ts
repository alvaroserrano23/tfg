import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { UserAuthentication } from '../../models/userAuthentication';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { UserAuthenticationService } from '../../services/userAuthentication.service';

import * as $ from "jquery";

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
  public doctorEnBd : Doctor;
  public patientEnBd : Patient;
  public userAuthentication : UserAuthentication;
  public userAuthenticationEnBd : UserAuthentication;
  public botonDoctor:string;

  constructor(private patientService: PatientService,
    private doctorService: DoctorService,
    private UserAuthenticationService: UserAuthenticationService
    
    ) { 
    //Titulos
  	this.title = "Tipo de cuenta";
  	this.title2 = "Iniciar sesión";
    this.title3 = "Registrarse como Medico";
    this.title4 = "Registrarse como Paciente";
    this.title5 = "¿Olvidaste tu contraseña?";
    
    
    this.patient = new Patient('','','','','','','','','');
    this.patientEnBd = new Patient('','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','');
    this.doctorEnBd = new Doctor('','','','','','','','','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','');
    this.userAuthenticationEnBd = new UserAuthentication('','','','','','');

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
  asignarValoresDeResponseDoctor(userAuthenticationResponse: any){
    this.doctorService.getDoctorByUsername(userAuthenticationResponse.user).subscribe(
  		response => {
        this.doctorEnBd.id = response.doctor._id;
        this.doctorEnBd.name = response.doctor.name;
        this.doctorEnBd.surname = response.doctor.surname;
        this.doctorEnBd.user = response.doctor.user;
        this.doctorEnBd.password = response.doctor.password;
        this.doctorEnBd.email = response.doctor.email;
        this.doctorEnBd.location = response.doctor.location;
        this.doctorEnBd.address = response.doctor.address;
        this.doctorEnBd.curriculum = response.doctor.curriculum;
        this.doctorEnBd.insurance = response.doctor.insurance;
      },
      error => {
        console.log(<any>error);
      }
    );
  
  }

  asignarValoresDeResponsePatient(userAuthenticationResponse: any){
    this.patientService.getPatientByUsername(userAuthenticationResponse.user).subscribe(
  		response => {
        this.patientEnBd.id = response.patient._id;
        this.patientEnBd.name = response.patient.name;
        this.patientEnBd.surname = response.patient.surname;
        this.patientEnBd.user = response.patient.user;
        this.patientEnBd.password = response.patient.password;
        this.patientEnBd.email = response.patient.email;
        this.patientEnBd.location = response.patient.location;
        this.patientEnBd.address = response.patient.address;
        this.patientEnBd.insurance = response.patient.insurance;
    
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  asignarValoresDeResponseAUsuario(userAuthenticationResponse : any){
    this.userAuthenticationEnBd.id = userAuthenticationResponse._id;
    this.userAuthenticationEnBd.user = userAuthenticationResponse.user;
    this.userAuthenticationEnBd.password = userAuthenticationResponse.password;
    this.userAuthenticationEnBd.email = userAuthenticationResponse.email;
    this.userAuthenticationEnBd.code = userAuthenticationResponse.code;
    this.userAuthenticationEnBd.role = userAuthenticationResponse.role;
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
  onSubmitInU(form){
    this.UserAuthenticationService.getUserAuthenticationByUsername(this.userAuthentication.user).subscribe(
  		response => {
  			if(response.userAuthentication){
          this.asignarValoresDeResponseAUsuario(response.userAuthentication);
          if(response.userAuthentication.role == "Doctor"){
            this.asignarValoresDeResponseDoctor(response.userAuthentication);
          }else if(response.userAuthentication.role == "Patient"){
            this.asignarValoresDeResponsePatient(response.userAuthentication);
          }

          if(this.userAuthentication.user == this.userAuthenticationEnBd.user 
            && this.userAuthentication.password == this.userAuthenticationEnBd.password ){
              $("#botonera").show(); 
              alert("Datos correctos, sesión iniciada");
          }else{
            alert("Datos incorrectos");
          }
  			}
  		},
  		error => {
        alert("Datos incorrectos");
  		}
  	);
    
  }
}
