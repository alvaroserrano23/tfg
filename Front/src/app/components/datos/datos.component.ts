import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css'],
  providers: [PatientService,DoctorService,AlertService]
})
export class DatosComponent implements OnInit {

  public url: string;
  public doctor: Doctor;
  public patient: Patient;
  public id:String;
  formD: FormGroup;
  formP: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      if(localStorage.getItem('doctor')){
        this.getDoctor(this.id);
      }else if(localStorage.getItem('patient')){
        this.getPatient(this.id);
      }
      
    })

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
  }

  get fD() { return this.formD.controls; }

  get fP() { return this.formP.controls; }

  getDoctor(id){
    this.doctorService.getDoctor(id).subscribe(
      response =>{
        this.doctor = response.doctor;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getPatient(id){
    this.patientService.getPatient(id).subscribe(
      response =>{
        this.patient = response.patient;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  onSubmitRegD(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formD.invalid) {
        return;
    }
    this.doctor = this.formD.value;
    this.doctor.id = this.id;
    this.doctorService.updateDoctor(this.doctor).subscribe(
      res => {
        console.log(res);
        /*localStorage.setItem('token',res.token);
        localStorage.setItem('doctor',JSON.stringify(this.doctor));*/
        this.alertService.success('Se ha modificado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
        },
      error =>{
        this.alertService.error(error.error.message);
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
    this.patient.id = this.id;
    this.patientService.updatePatient(this.patient).subscribe(
        res => {
          console.log(res);
          this.alertService.success('Se ha modificado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/'], { relativeTo: this.route });  
          },
        error =>{
          this.alertService.error(error.error.message);
          this.loading = false;
          }
      );
  }
}
