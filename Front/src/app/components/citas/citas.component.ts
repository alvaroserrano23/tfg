import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { CitasService } from 'src/app/services/citas.service';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [CitasService]
})
export class CitasComponent implements OnInit {

  public url: string;
  public citasPaciente: Cita[];
  public citasDoctor: Cita[];
  public doctor: Doctor;
  public patient: Patient;
  public doctorCita: Doctor;
  public patientCita: Patient;
  public id:String;

  constructor(
    public citasService: CitasService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
    ) 
    {
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
      
      this.getCitasByIdDoctor(this.id);
      this.getCitasByIdPatient(this.id);
    })
  }

  getCitasByIdPatient(id){
  	this.citasService.getCitasByIdPatient(id).subscribe(
  		response => {
  			if(response.citas){
  				this.citasPaciente = response.citas;
          console.log(this.citasPaciente);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getCitasByIdDoctor(id){
  	this.citasService.getCitasByIdDoctor(id).subscribe(
  		response => {
  			if(response.citas){
  				this.citasDoctor = response.citas;
          console.log(this.citasDoctor);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
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

  public aceptar(cita){
    var citaAceptada = new Cita('','','','','','','','','','','');
    citaAceptada = cita;
    citaAceptada.id = cita._id;
    citaAceptada.estado = "Aceptada";
    this.citasService.updateCita(citaAceptada).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  public rechazar(cita){
    var citaRechazada = new Cita('','','','','','','','','','','');
    citaRechazada = cita;
    citaRechazada.id = cita._id;
    citaRechazada.estado = "Rechazada";
    this.citasService.updateCita(citaRechazada).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
