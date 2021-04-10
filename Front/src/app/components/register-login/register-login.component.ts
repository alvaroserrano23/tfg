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
    private patientService: PatientService,
    private doctorService: DoctorService
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

    this.doctorEnBd.id = doctorResponse._id;
    this.doctorEnBd.name = doctorResponse.name;
    this.doctorEnBd.surname = doctorResponse.surname;
    this.doctorEnBd.user = doctorResponse.user;
    this.doctorEnBd.password = doctorResponse.password;
    this.doctorEnBd.email = doctorResponse.email;
    this.doctorEnBd.location = doctorResponse.location;
    this.doctorEnBd.address = doctorResponse.address;
    this.doctorEnBd.curriculum = doctorResponse.curriculum;
    this.doctorEnBd.insurance = doctorResponse.insurance;
    
  
  }

  asignarValoresDeResponsePatient(patientResponse: any){

    this.patientEnBd.id = patientResponse._id;
    this.patientEnBd.name = patientResponse.name;
    this.patientEnBd.surname = patientResponse.surname;
    this.patientEnBd.user = patientResponse.user;
    this.patientEnBd.password = patientResponse.password;
    this.patientEnBd.email = patientResponse.email;
    this.patientEnBd.location = patientResponse.location;
    this.patientEnBd.address = patientResponse.address;
    this.patientEnBd.insurance = patientResponse.insurance;
    
  
  }
  onSubmitInD(form){
    this.doctorService.getDoctorByUsername(this.doctor.user).subscribe(
  		response => {
  			if(response.doctor){
          this.asignarValoresDeResponseDoctor(response.doctor);
          if(this.doctor.user == this.doctorEnBd.user 
            && this.doctor.password == this.doctorEnBd.password ){
              alert("Datos correctos, sesión iniciada");
          }else{
            alert("Datos incorrectos");
          }
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
    
  }
   onSubmitInP(form){
    this.patientService.getPatientByUsername(this.patient.user).subscribe(
  		response => {
  			if(response.patient){
          this.asignarValoresDeResponsePatient(response.patient);
          if(this.patient.user == this.patientEnBd.user 
            && this.patient.password == this.patientEnBd.password ){
              alert("Datos correctos, sesión iniciada");
          }else{
            alert("Datos incorrectos");
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
