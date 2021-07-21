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
  /*public title: string;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;*/

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private opinionService: OpinionService,
    private adminService: AdminService,
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
    
  }

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
      this.actualizarDoctor();
    }else if(this.patient != undefined){
      this.actualizarPatient();
    }else if(this.admin != undefined){
      this.actualizarAdmin();
    }
  }
  
  actualizarAdmin(){
    this.adminService.updateAdmin(this.admin).subscribe(
      response=>{
        if(response.adminUpdated){
				
				  // Subir la imagen
          if(this.filesToUpload){
            this.adminService.makeFileRequest(Global.url+"upload-image/"+response.adminUpdated._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.adminGuardado = result.admin;
            });
          }else{
            this.adminGuardado = response.adminUpdated;
          }
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


  actualizarDoctor(){
    this.doctorService.updateDoctor(this.doctor).subscribe(
      response => {
  			if(response.doctorUpdated){
				
				  // Subir la imagen
          if(this.filesToUpload){
            this.doctorService.makeFileRequest(Global.url+"upload-image/"+response.doctorUpdated._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.doctorGuardado = result.doctor;
            });
          }else{
            this.doctorGuardado = response.doctorUpdated;
          }
      }
  		},
  		error => {
  			console.log(<any>error);
  		}
    )
  }
  actualizarPatient(){
    this.patientService.updatePatient(this.patient).subscribe(
      response => {
  			if(response.patientUpdated){
				
				  // Subir la imagen
          if(this.filesToUpload){
            this.patientService.makeFileRequest(Global.url+"upload-image/"+response.patientUpdated._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.patientGuardado = result.doctor;
            });
          }else{
            this.patientGuardado = response.doctorUpdated;
          }
      }
  		},
  		error => {
  			console.log(<any>error);
  		}
    )
  }

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}