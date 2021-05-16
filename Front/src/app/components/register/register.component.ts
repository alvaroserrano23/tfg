import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [PatientService,DoctorService,AlertService]
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
  public botonDoctor:string;

  formD: FormGroup;
  formP: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    ) {
    //Titulos
  	this.title = "Tipo de cuenta";
    this.title3 = "Registrarse como Médico";
    this.title4 = "Registrarse como Paciente";
    
    
    this.patient = new Patient('','','','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','','','','');

   }
 
  /*Contenedor de Iniciar sesion  -   Contenedor de registrar Paciente  -  Contenedor de registrar Doctor*/
  ngOnInit() {
    this.formD = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formP = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    

    //JQUERY
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

  get fD() { return this.formD.controls; }

  get fP() { return this.formP.controls; }

  inicializarDoctor(){
    this.doctor = this.formD.value;

  }
   onSubmitRegD(){
    console.log(this.doctor);

    this.inicializarDoctor();

    this.doctorService.saveDoctor(this.doctor).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('token', response.token);
          //this.router.navigate(['/private']);
        alert("Se ha registrado" + this.doctor.user);
        },
      error =>{
        console.log(<any>error);
        }
    );
    
  }
   onSubmitRegP(){
    console.log(this.patient);

    this.patientService.savePatient(this.patient).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token',res.token);
          //this.router.navigate(['/private']);
          alert("Se ha registrado" + this.patient.user);
          },
        error =>{
          console.log(<any>error);
          }
      );
  }
}
