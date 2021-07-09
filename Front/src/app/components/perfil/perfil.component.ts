import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { Opinion } from 'src/app/models/opinion';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { OpinionService } from 'src/app/services/opinion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public url: string;
  public doctor: Doctor;
  public patient: Patient;
  public confirm: boolean;
  public opinions: Opinion[];
  /*public title: string;
	public save_project;
	public status: string;
	public filesToUpload: Array<File>;*/

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private opinionService: OpinionService,
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
      this.doctorService.uploadImage(this.doctor).subscribe();
    }else if(this.patient != undefined){
      this.patientService.uploadImage(this.patient).subscribe();
    } 
  }
  /*onSubmit(){
  	this._projectService.updateProject(this.project).subscribe(
		response => {
  			if(response.project){
				
				// Subir la imagen
				if(this.filesToUpload){
					this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
					.then((result:any) => {
						this.save_project = result.project;
						this.status = 'success';
					});
				}else{
					this.save_project = response.project;
					this.status = 'success';
				}
				
			}else{
				this.status = 'failed';
			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }*/
}
