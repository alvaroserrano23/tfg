import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { UserAuthentication } from '../../models/userAuthentication';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { UserAuthenticationService } from '../../services/userAuthentication.service';

import * as $ from "jquery";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [PatientService,DoctorService,UserAuthenticationService]
})
export class RegisterComponent implements OnInit {

	public title:string;
	public title2:string;
  public title3:string;
  public title4:string;
  public patient:Patient;
  public doctor: Doctor;
  public doctorEnBd : Doctor;
  public patientEnBd : Patient;
  public userAuthentication : UserAuthentication;
  public userAuthenticationEnBd : UserAuthentication;
  public botonDoctor:string;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private UserAuthenticationService: UserAuthenticationService

    ) {
    //Titulos
  	this.title = "Tipo de cuenta";
    this.title3 = "Registrarse como Médico";
    this.title4 = "Registrarse como Paciente";
    
    
    this.patient = new Patient('','','','','','','','','');
    this.patientEnBd = new Patient('','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','');
    this.doctorEnBd = new Doctor('','','','','','','','','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','');
    this.userAuthenticationEnBd = new UserAuthentication('','','','','','');

   }
 
  /*Contenedor de Iniciar sesion  -   Contenedor de registrar Paciente  -  Contenedor de registrar Doctor*/
  ngOnInit() {
     $("#containerRegPat").hide();
     $("#containerRegDoc").hide();
     $("#botonera").show();

     //Boton Doctor
     $("#button_doc").click(function(e){
        $("#containerRegDoc").show();
        $("#botonera").hide(500);
      });
     //Boton Patient
     $("#button_pat").click(function(e){
        $("#containerRegPat").show();
        $("#botonera").hide(500);
      });

     $("#no_accU").click(function(e){
       $("#containerInUser").hide(500);
       $("#botonera").show(); 
      });
  
  }

   onSubmitRegD(form){
    console.log(this.doctor);
    this.doctorService.saveDoctor(this.doctor).subscribe(
        response => {
          console.log(response);
          },
        error =>{
          console.log(<any>error);
          }
      );
  }
   onSubmitRegP(form){
    console.log(this.patient);
    this.patientService.savePatient(this.patient).subscribe(
        response => {
          console.log(response);
          },
        error =>{
          console.log(<any>error);
          }
      );
  }
}
