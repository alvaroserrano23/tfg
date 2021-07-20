import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { AdminService } from 'src/app/services/admin.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Admin } from '../../models/admin';
import { Global } from '../../services/global';
import { Historial } from 'src/app/models/historial';
import { Cita } from 'src/app/models/cita';
import { Opinion } from 'src/app/models/opinion';
import { CitasService } from 'src/app/services/citas.service';
import { OpinionService } from 'src/app/services/opinion.service';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  public doctors: Doctor[];
  public patients: Patient[];
  public citas: Cita[];
  public opinions: Opinion[];
  public historials: Historial[];
  public admins: Admin[];
  public url: string;

  constructor(
    public doctorService: DoctorService,
    public patientService: PatientService,
    public citaService: CitasService,
    public opinionService: OpinionService,
    public historialService: HistorialService,
    public adminService: AdminService,
    public userAuthenticationService: UserAuthenticationService
    ) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {
    this.limpiarArrays();
    if(localStorage.getItem('admin-patients')){
      this.getPatients();
      localStorage.removeItem('admin-patients');
    }else if(localStorage.getItem('admin-doctors')){
      this.getDoctors();
      localStorage.removeItem('admin-doctors');
    }else if(localStorage.getItem('admin-citas')){
      this.getCitas();
      localStorage.removeItem('admin-citas');
    }else if(localStorage.getItem('admin-opiniones')){
      this.getOpiniones();
      localStorage.removeItem('admin-opiniones');
    }else if(localStorage.getItem('admin-historiales')){
      this.getHistoriales();
      localStorage.removeItem('admin-historiales');
    }
  }

  limpiarArrays(){
    this.doctors = null;
    this.patients = null;
    this.citas = null;
    this.opinions = null;
    this.historials = null;
  }
  getPatients(){
  	this.patientService.getPatients().subscribe(
  		response => {
  			if(response.patients){
  				this.patients = response.patients;
          console.log(this.patients);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getDoctors(){
  	this.doctorService.getDoctors().subscribe(
  		response => {
  			if(response.doctors){
  				this.doctors = response.doctors;
          console.log(this.doctors);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getCitas(){
  	this.citaService.getCitas().subscribe(
  		response => {
  			if(response.citas){
  				this.citas = response.citas;
          console.log(this.citas);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getOpiniones(){
  	this.opinionService.getOpiniones().subscribe(
  		response => {
  			if(response.opiniones){
  				this.opinions = response.opiniones;
          console.log(this.opinions);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getHistoriales(){
  	this.historialService.getHistorials().subscribe(
  		response => {
  			if(response.historials){
  				this.historials = response.historials;
          console.log(this.historials);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
