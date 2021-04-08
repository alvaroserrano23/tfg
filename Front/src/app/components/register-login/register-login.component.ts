import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import * as $ from "jquery";

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css'],
  providers: [PatientService,DoctorService]
})
export class RegisterLoginComponent implements OnInit {

	public title:string;
	public title2:string;
  public title3:string;
  public title4:string;
  public patient:Patient;
  public doctor: Doctor;
  public doctorEnBd : Doctor;
  public patientEnBd : Patient;
  public botonDoctor:string;

  constructor(
    private _patientService: PatientService,
    private _doctorService: DoctorService
    ) {
    //Titulos
  	this.title = "Tipo de cuenta";
  	this.title2 = "Iniciar sesión";
    this.title3 = "Registrarse como Medico";
    this.title4 = "Registrarse como Paciente";
    
    
    this.patient = new Patient('','','','','','','','','');
    this.patientEnBd = new Patient('','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','');
    this.doctorEnBd = new Doctor('','','','','','','','','','');

 

   }
 
  /*Contenedor de Iniciar sesion  -   Contenedor de registrar Paciente  -  Contenedor de registrar Doctor*/
  ngOnInit() {
     $("#containerInPat").hide();
     $("#containerInDoc").hide();
     $("#containerRegPat").hide();
     $("#containerRegDoc").hide();

     //Boton Doctor
     $("#button_doc").click(function(e){
        $("#containerInDoc").show();
        $("#botonera").hide(500);
      });
     //Boton Patient
     $("#button_pat").click(function(e){
        $("#containerInPat").show();
        $("#botonera").hide(500);
      });

     $("#no_accD").click(function(e){
       $("#containerInDoc").hide(500);
       $("#containerRegDoc").show(); 
      });

     $("#no_accP").click(function(e){
       $("#containerInPat").hide(500);
       $("#containerRegPat").show(); 
      });
  
  }

  asignarValoresDeResponseDoctor(doctorResponse: any){

    this.doctorEnBd._id = doctorResponse._id;
    this.doctorEnBd._name = doctorResponse.name;
    this.doctorEnBd._surname = doctorResponse.surname;
    this.doctorEnBd._user = doctorResponse.user;
    this.doctorEnBd._password = doctorResponse.password;
    this.doctorEnBd._email = doctorResponse.email;
    this.doctorEnBd._location = doctorResponse.location;
    this.doctorEnBd._address = doctorResponse.address;
    this.doctorEnBd._curriculum = doctorResponse.curriculum;
    this.doctorEnBd._insurance = doctorResponse.insurance;
    
  
  }

  asignarValoresDeResponsePatient(patientResponse: any){

    this.patientEnBd._id = patientResponse._id;
    this.patientEnBd._name = patientResponse.name;
    this.patientEnBd._surname = patientResponse.surname;
    this.patientEnBd._user = patientResponse.user;
    this.patientEnBd._password = patientResponse.password;
    this.patientEnBd._email = patientResponse.email;
    this.patientEnBd._location = patientResponse.location;
    this.patientEnBd._address = patientResponse.address;
    this.patientEnBd._insurance = patientResponse.insurance;
    
  
  }
  onSubmitInD(form){
    this._doctorService.getDoctorByUsername(this.doctor._user).subscribe(
  		response => {
  			if(response.doctor){
          this.asignarValoresDeResponseDoctor(response.doctor);
          if(this.doctor._user == this.doctorEnBd._user 
            && this.doctor._password == this.doctorEnBd._password ){
            console.log("Iniciar Sesion");
          }
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
    
  }
   onSubmitInP(form){
    this._patientService.getPatientByUsername(this.patient._user).subscribe(
  		response => {
  			if(response.patient){
          this.asignarValoresDeResponsePatient(response.patient);
          if(this.patient._user == this.patientEnBd._user 
            && this.patient._password == this.patientEnBd._password ){
            console.log("Iniciar Sesion");
          }
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
   onSubmitRegD(form){
    console.log(this.doctor);
    this._doctorService.saveDoctor(this.doctor).subscribe(
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
    this._patientService.savePatient(this.patient).subscribe(
        response => {
          console.log(response);
          },
        error =>{
          console.log(<any>error);
          }
      );
  }
}
