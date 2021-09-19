import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { CitasService } from 'src/app/services/citas.service';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Mail } from 'src/app/models/mail';
import { MailService } from 'src/app/services/mail.service';

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
  public mail:Mail;

  constructor(
    public citasService: CitasService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private mailService: MailService
    ) 
    {
    this.url = Global.url;
    this.mail = new Mail('','','','','','','');
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
    var citaAceptada = new Cita('','','','','','','','','','','','','');
    citaAceptada = cita;
    citaAceptada.id = cita._id;
    citaAceptada.estado = "Aceptada";
    this.citasService.updateCita(citaAceptada).subscribe(
      response=>{
        this.mail.type = "citaA";
        this.mail.message = "<p>Tu cita ha sido <b>aceptada</b>,a continuación se muestran los datos referentes a la cita</p><h2>Datos de la cita</h2><ul><li><b>Asunto:</b> "+ citaAceptada.asunto+"</li><li><b>Dirección de la consulta:</b> "+ citaAceptada.direccion_consulta+"<li><b>Doctor:</b> "+ citaAceptada.nombre_doctor+"</li><li><b>Fecha y Hora:</b> "+ citaAceptada.fecha + " " + citaAceptada.hora+"</li></ul><p>Ya puedes asistir a la cita</p><p><p>Un saludo,gracias</p>";
        //Mensaje para el paciente
        this.mail.to = cita.email_paciente;
        this.mailService.sendEmail(this.mail).subscribe();
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  public rechazar(cita){
    var citaRechazada = new Cita('','','','','','','','','','','','','');
    citaRechazada = cita;
    citaRechazada.id = cita._id;
    citaRechazada.estado = "Rechazada";
    this.citasService.updateCita(citaRechazada).subscribe(
      response=>{
        this.mail.type = "citaR";
        this.mail.message = "<p>Tu cita ha sido <b>rechazada</b>,a continuación se muestran los datos referentes a la cita</p><h2>Datos de la cita</h2><ul><li><b>Asunto:</b> "+ citaRechazada.asunto+"</li><li><b>Dirección de la consulta:</b> "+ citaRechazada.direccion_consulta+"<li><b>Doctor:</b> "+ citaRechazada.nombre_doctor+"</li><li><b>Fecha y Hora:</b> "+ citaRechazada.fecha + " " + citaRechazada.hora+"</li></ul><p>El doctor ha rechazado la cita por lo que no podrás asistir a ella.</p><p><p>Un saludo,gracias</p>";
        //Mensaje para el paciente
        this.mail.to = cita.email_paciente;
        this.mailService.sendEmail(this.mail).subscribe();
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  public finalizar(cita){
    var citaFinalizada = new Cita('','','','','','','','','','','','','');
    citaFinalizada = cita;
    citaFinalizada.id = cita._id;
    citaFinalizada.estado = "Finalizada";
    this.citasService.updateCita(citaFinalizada).subscribe(
      response=>{
        this.mail.type = "citaF";
        this.mail.message = "<p>Tu cita ha sido <b>finalizada</b>,a continuación se muestran los datos referentes a la cita</p><h2>Datos de la cita</h2><ul><li><b>Asunto:</b> "+ citaFinalizada.asunto+"</li><li><b>Dirección de la consulta:</b> "+ citaFinalizada.direccion_consulta+"<li><b>Doctor:</b> "+ citaFinalizada.nombre_doctor+"</li><li><b>Fecha y Hora:</b> "+ citaFinalizada.fecha + " " + citaFinalizada.hora+"</li></ul><p>Ha finalizado la cita, esperamos que haya sido productiva, si deaseas dar tu opinión sobre el doctor, accede al apartado de <b>Dar opinión</b> en la web.</p><p><p>Un saludo,gracias</p>";
        //Mensaje para el paciente
        this.mail.to = cita.email_paciente;
        this.mailService.sendEmail(this.mail).subscribe();
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
