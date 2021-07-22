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
import { HistorialService } from 'src/app/services/historial.service';
import { OpinionService } from 'src/app/services/opinion.service';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/models/cita';
import { Opinion } from 'src/app/models/opinion';
import { Historial } from 'src/app/models/historial';

@Component({
  selector: 'app-admin-modificar',
  templateUrl: './admin-modificar.component.html',
  styleUrls: ['./admin-modificar.component.css']
})
export class AdminModificarComponent implements OnInit {
  public url: string;
  public doctor: Doctor;
  public patient: Patient;
  public admin: Admin;
  public userAuth: UserAuthentication;
  public cita: Cita;
  public opinion: Opinion;
  public historial: Historial;
  public id:String;
  formD: FormGroup;
  formP: FormGroup;
  formO: FormGroup;
  formC: FormGroup;
  formH: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private adminService: AdminService,
    private userAuthenticationService: UserAuthenticationService,
    private historialService: HistorialService,
    private opinionService: OpinionService,
    private citaService: CitasService,
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
      let id = params.id;
      if(localStorage.getItem('admin') && localStorage.getItem('admin-patient')){
        this.borrarToken('admin-patient');
        this.getPatient(id);
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-doctor')){
        this.borrarToken('admin-doctor');
        this.getDoctor(id);
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-cita')){
        this.borrarToken('admin-cita');
        this.getCita(id);
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-opinion')){
        this.borrarToken('admin-opinion');
        this.getOpinion(id);
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-historial')){
        this.borrarToken('admin-historial');
        this.getHistorial(id);
      }
    })
  }

  borrarToken(token){
    localStorage.removeItem(token);
  }

  getPatient(id){
    this.patientService.getPatient(id).subscribe(
      response =>{
        this.patient = response.patient;
      },
      error => {
        console.log(<any>error);
      }
    )
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

  getCita(id){
    this.citaService.getCita(id).subscribe(
      response =>{
        this.cita = response.cita;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getOpinion(id){
    this.opinionService.getOpinion(id).subscribe(
      response =>{
        this.opinion = response.opinion;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getHistorial(id){
    this.historialService.getHistorial(id).subscribe(
      response =>{
        this.historial = response.historial;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
