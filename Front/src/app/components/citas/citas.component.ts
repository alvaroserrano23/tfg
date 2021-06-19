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
  public citas: Cita[];
  public doctor: Doctor;
  public patient: Patient;
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
    this.getCitas();
    
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.getDoctor(this.id);
      this.getPatient(this.id);
    })
  }

  getCitas(){
  	this.citasService.getCitas().subscribe(
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


}
