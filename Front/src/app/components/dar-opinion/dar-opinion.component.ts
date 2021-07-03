import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { CitasService } from 'src/app/services/citas.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Cita } from '../../models/cita';
import { Global } from '../../services/global';

@Component({
  selector: 'app-dar-opinion',
  templateUrl: './dar-opinion.component.html',
  styleUrls: ['./dar-opinion.component.css']
})
export class DarOpinionComponent implements OnInit {
  public doctors: Doctor[];
  public doctorsOpinar: Doctor[] = new Array();
  public idDoctores: String[] = new Array();
  public patient: Patient;
  public citasPaciente: Cita[];
  public citasPacienteF: Cita[] = new Array();
  public url: string;

  constructor(
    public doctorService: DoctorService,
    public citasService: CitasService
    ) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      var patientId = JSON.parse(localStorage.getItem('patient'));
      this.patient = patientId;
      this.patient.id = patientId._id;
    }
    this.getCitasByIdPatient(this.patient.id);
  }

  async getCitasByIdPatient(id){
  	this.citasService.getCitasByIdPatient(id).subscribe(
  		response => {
  			if(response.citas){
  				this.citasPaciente = response.citas;
          this.deleteRepetidos("id_doctor");
          for(let i=0; i<this.citasPacienteF.length;i++){
            var id_doctor = this.citasPacienteF[i].id_doctor;
            this.idDoctores.push(id_doctor);
            this.getDoctor(this.idDoctores[i]);
          }
          
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
        this.doctorsOpinar.push(response.doctor);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteRepetidos(prop){
     var lookupObject  = {};

     for(var i in this.citasPaciente) {
        lookupObject[this.citasPaciente[i][prop]] = this.citasPaciente[i];
     }

     for(i in lookupObject) {
         this.citasPacienteF.push(lookupObject[i]);
     }
  }
}
