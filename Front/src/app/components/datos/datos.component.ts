import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';
import { UserAuthentication } from 'src/app/models/userAuthentication';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css'],
  providers: [PatientService,DoctorService]
})
export class DatosComponent implements OnInit {

  public url: string;
  public doctor: Doctor;
  public patient: Patient;
  public admin: Admin;
  public userAuth: UserAuthentication;
  public id:String;
  formD: FormGroup;
  formP: FormGroup;
  formA: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private adminService: AdminService,
    private userAuthenticationService: UserAuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { 
    this.url = Global.url;
    this.userAuth = new UserAuthentication('','','','','','','');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.userAuth.id = params.id;

      if(localStorage.getItem('doctor')){
        this.getDoctor(this.id);
      }else if(localStorage.getItem('patient')){
        this.getPatient(this.id);
      }else if(localStorage.getItem('admin')){
        this.getAdmin(this.id);
        localStorage.removeItem('repetido');
      }
      
    })

    this.formD = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      province: ['', Validators.required],
      comunidad: ['', Validators.required],
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
      comunidad: ['', Validators.required],
      address: ['', Validators.required],
      cp:   ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      insurance: ['',Validators.required]
    });

    this.formA = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get fD() { return this.formD.controls; }

  get fP() { return this.formP.controls; }

  get fA() { return this.formA.controls; }

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

  getAdmin(id){
    this.adminService.getAdmin(id).subscribe(
      response =>{
        this.admin = response.admin;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onSubmitRegA(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formA.invalid) {
        return;
    }
    this.admin = this.formA.value;
    this.admin.id = this.id;
    this.adminService.updateAdmin(this.admin).subscribe(
      res => {
        console.log(res);
        this.userAuth.user = this.admin.user;
        this.userAuth.password = this.admin.password;
        this.userAuth.email = this.admin.email;
        this.userAuth.role = "admin";
        this.userAuthenticationService.updateUser(this.userAuth).subscribe();
        this.alertService.success('Se ha modificado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
        },
      error =>{
        window.scrollTo(0,-10000);
        this.alertService.error(error.error.message);
        this.loading = false;
        }
    );
    
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
        this.userAuth.user = this.doctor.user;
        this.userAuth.password = this.doctor.password;
        this.userAuth.email = this.doctor.email;
        this.userAuth.role = "doctor";
        this.userAuthenticationService.updateUser(this.userAuth).subscribe();
        this.alertService.success('Se ha modificado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
        },
      error =>{
        window.scrollTo(0,-10000);
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
          this.userAuth.user = this.patient.user;
          this.userAuth.password = this.patient.password;
          this.userAuth.email = this.patient.email;
          this.userAuth.role = "patient";
          this.userAuthenticationService.updateUser(this.userAuth).subscribe();
          this.alertService.success('Se ha modificado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/'], { relativeTo: this.route });  
          },
        error =>{
          window.scrollTo(0,-10000);
          this.alertService.error(error.error.message);
          this.loading = false;
          }
      );
  }
}
