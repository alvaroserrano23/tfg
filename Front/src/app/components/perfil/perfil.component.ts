import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { Opinion } from 'src/app/models/opinion';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { OpinionService } from 'src/app/services/opinion.service';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserAuthentication } from 'src/app/models/userAuthentication';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public url: string;
  public doctor: Doctor;
  public doctorGuardado: Doctor;
  public patient: Patient;
  public patientGuardado: Patient;
  public admin: Admin;
  public adminGuardado: Admin;
  public confirm: boolean;
  public opinions: Opinion[];
  public filesToUpload: Array<File>;
  formD: FormGroup;
  formP: FormGroup;
  formA: FormGroup;
  public id:String;
  public userAuth:UserAuthentication;
  /*public title: string;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;*/

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private opinionService: OpinionService,
    private userAuthenticacionService: UserAuthenticationService,
    private adminService: AdminService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
    
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let id = params.id;
      if(localStorage.getItem('doctor')){
        this.getDoctor(id);
      }else if(localStorage.getItem('patient')){
        this.getPatient(id);
        this.getOpinionsByIdPatient(id);
      }else if(localStorage.getItem('admin')){
        this.getAdmin(id);
        localStorage.removeItem('repetido');
        
      }
    })

    this.formD = new FormGroup({
      imagen: new FormControl('',Validators.required)
    });

    this.formP = new FormGroup({
      imagen: new FormControl('',Validators.required)
    });

    this.formA = new FormGroup({
      imagen: new FormControl('',Validators.required)
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
      error =>{
        console.log(<any>error);
      }
    )
  }

  getOpinionsByIdPatient(id){
    this.opinionService.getOpinionsByIdPatient(id).subscribe(
      response=>{
        this.opinions = response.opinions;
      },
      error=>{
        console.log(error);
      }
    )
  }
  onSubmit(){
    if(this.doctor != undefined){
      this.actualizarDoctor(this.doctor);
    }else if(this.patient != undefined){
      this.actualizarPatient(this.patient);
    }else if(this.admin != undefined){
      this.actualizarAdmin(this.admin);
    }
  }
  
  actualizarDoctor(doctor){
    // Subir la imagen
    if(this.filesToUpload){
      this.doctorService.makeFileRequestD(Global.url+"upload-imageD/"+doctor._id, [], this.filesToUpload, 'image')
      .then((result:any) => {
        this.doctor = result.patient;
        this.alertService.success("Se ha actualizado la imagen con éxito", { keepAfterRouteChange: true });
        this.userAuthenticacionService.logout();
        this.userAuth.id = this.doctor.id;
        this.userAuth.user = this.doctor.user;
        this.userAuth.password = this.doctor.password;
        this.userAuth.email = this.doctor.email;
        this.userAuthenticacionService.loginAuth(this.userAuth);
      });
    }else{
      window.scrollTo(0,-10000);
      this.alertService.error("No has seleccionado ninguna imagen", { keepAfterRouteChange: true });
    }
  }


  actualizarPatient(patient){
    // Subir la imagen
    if(this.filesToUpload){
      this.patientService.makeFileRequestP(Global.url+"upload-imageP/"+patient._id, [], this.filesToUpload, 'image')
      .then((result:any) => {
        this.patient = result.patient;
        this.alertService.success("Se ha actualizado la imagen con éxito", { keepAfterRouteChange: true });
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
      });
    }else{
      window.scrollTo(0,-10000);
      this.alertService.error("No has seleccionado ninguna imagen", { keepAfterRouteChange: true });
    }
  }
  actualizarAdmin(admin){
    // Subir la imagen
    if(this.filesToUpload){
      this.adminService.makeFileRequestA(Global.url+"upload-imageA/"+admin._id, [], this.filesToUpload, 'image')
      .then((result:any) => {
        this.admin = result.patient;
        this.alertService.success("Se ha actualizado la imagen con éxito", { keepAfterRouteChange: true });
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
      });
    }else{
      window.scrollTo(0,-10000);
      this.alertService.error("No has seleccionado ninguna imagen", { keepAfterRouteChange: true });
    }
  }
  

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
    window.scrollTo(0,-10000);
    this.alertService.success("Imagen seleccionada:"+this.filesToUpload[0].name);
	}
}