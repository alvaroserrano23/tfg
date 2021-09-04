import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { CitasService } from 'src/app/services/citas.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Cita } from '../../models/cita';
import { Global } from '../../services/global';
import { OpinionService } from 'src/app/services/opinion.service';
import { Opinion } from 'src/app/models/opinion';

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
  public opinionsPaciente: Opinion[];

  constructor(
    public doctorService: DoctorService,
    public citasService: CitasService,
    public opinionService: OpinionService
    ) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      var patientId = JSON.parse(localStorage.getItem('patient'));
      this.patient = patientId;
      this.patient.id = patientId._id;
      this.getOpinionsByIdPatient(this.patient.id);
      this.getCitasByIdPatient(this.patient.id);
    }
    
  }

  getOpinionsByIdPatient(id){
    this.opinionService.getOpinionsByIdPatient(id).subscribe(
      response=>{
        this.opinionsPaciente = response.opinions;
      },
      error=>{
        console.log(error);
      }
    )
  }
  async getCitasByIdPatient(id){
  	this.citasService.getCitasByIdPatient(id).subscribe(
  		response => {
  			if(response.citas){
  				this.citasPaciente = response.citas;
          this.deleteRepetidos("id_doctor");
          this.obtenerDoctores();
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

  obtenerDoctores(){
    for(let i=0; i<this.citasPacienteF.length;i++){
      for(let j=0;j<this.opinionsPaciente.length;j++){
        if(this.citasPacienteF[i].estado == "Finalizada" && this.citasPacienteF[i].id_doctor == this.opinionsPaciente[j].id_doctor){
          this.removeItemFromArr(this.citasPacienteF,this.citasPacienteF[i]);
          
        }
      } 
    }
    
    for(var k in this.citasPacienteF){
      if(this.citasPacienteF[k].estado == "Finalizada"){
        this.getDoctor(this.citasPacienteF[k].id_doctor);
      }
    }
  }

   removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}
}