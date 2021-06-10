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
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    ) {
    //Titulos
  	this.title = "Tipo de cuenta";
    this.title3 = "Registrarse como Médico";
    this.title4 = "Registrarse como Paciente";
    
    
    this.patient = new Patient('','','','','','','','','','','',0,'');

    this.doctor = new Doctor('','','','','','','','','','','','','',0,'','');

   }
 
  /*Contenedor de Iniciar sesion  -   Contenedor de registrar Paciente  -  Contenedor de registrar Doctor*/
  ngOnInit() {
    this.formD = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      province: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      cp:   ['', Validators.required],
      numColegiado: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      especialidad: ['',Validators.required],
      insurance: ['',Validators.required]
      //cv: ['',Validators.required]
    });

    this.formP = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      province: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      cp:   ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      insurance: ['',Validators.required]
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

   onSubmitRegD(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formD.invalid) {
        return;
    }
    this.doctor = this.formD.value;
    
    this.doctorService.saveDoctor(this.doctor).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem('doctor',JSON.stringify(this.doctor));
        this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate([''], { relativeTo: this.route });  
        },
      error =>{
        this.alertService.error(error);
        this.loading = false;
        }
    );
    
  }
   onSubmitRegP(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formP.invalid) {
        return;
    }
    this.patient = this.formP.value;

    this.patientService.savePatient(this.patient).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token',res.token);
          this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate([''], { relativeTo: this.route });  
          },
        error =>{
          this.alertService.error(error);
          this.loading = false;
          }
      );
  }
}
