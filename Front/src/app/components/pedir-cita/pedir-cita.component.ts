import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { UserAuthentication } from '../../models/userAuthentication';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { UserAuthenticationService } from '../../services/userAuthentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/models/mail';
import { error } from 'jquery';
import { first } from 'rxjs/operators';
import { Cita } from 'src/app/models/cita';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css'],
  providers: [PatientService,DoctorService,UserAuthenticationService,AlertService,MailService]
})
export class PedirCitaComponent implements OnInit {
  
  public patient:Patient;
  public doctor: Doctor;
  public userAuthentication: UserAuthentication;
  loading = false;
  submitted = false;
  public mail:Mail;
  public userLogged;
  public cita:Cita;
  patientId: Patient;
  form: FormGroup;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private citaService: CitasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private mailService: MailService) {

    this.cita = new Cita('','','','','','','','','','','');
       
    this.patient = new Patient('','','','','','','','','','','',0,'','','');

    this.doctor = new Doctor('','','','','','','','','','','','','',0,'','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','','');
      
    this.mail = new Mail('','','','','','','');
    this.userLogged = false;
    
   }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let id = params.id;
      this.getDoctor(id);
      if(localStorage.getItem('token')){
        this.userLogged = true;
        var patientId = JSON.parse(localStorage.getItem('patient'));
        this.patient = patientId;
        this.patient.id = patientId._id;
      }
    })

    this.form = new FormGroup({
      asunto: new FormControl('',Validators.required),
      descripcion: new FormControl('',Validators.required),
      fecha: new FormControl('',Validators.required),
      hora: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.pattern("(\|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}"))
    });
    
  }

  get f() { return this.form.controls; }

  getDoctor(id){
    this.doctorService.getDoctor(id).subscribe(
      response =>{
        this.doctor = response.doctor;
        this.doctor.id = response.doctor._id;
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

  async onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.cita = this.form.value;
    this.patient.telefono = this.form.value.telefono;
    this.cita.estado = "Pendiente";
    this.cita.id_doctor = this.doctor.id;
    this.cita.id_paciente = this.patient.id;
    this.cita.nombre_doctor = this.doctor.name + " " + this.doctor.surname;
    this.cita.nombre_paciente = this.patient.name + " " + this.patient.surname; 
    this.cita.direccion_consulta = this.doctor.address+","+this.doctor.location+","+this.doctor.province;
    //telefono
    if(this.form.value.telefono != undefined){
      this.patientService.updatePatient(this.patient).subscribe();
    }
    this.citaService.saveCita(this.cita).subscribe(
      res => {
        console.log(res);
        //Enviamos el email
        this.mail.type = "citaP";
        this.mail.message = "<h1>Cita solicitada</h1><ul><li><b>Asunto:</b> "+this.cita.asunto+"</li><li><b>Dirección de la consulta:</b> "+this.cita.direccion_consulta+"<li><b>Doctor:</b> "+this.cita.nombre_doctor+"</li><li><b>Fecha y Hora:</b> "+this.cita.fecha+this.cita.hora+"</li></ul>";
        //Mensaje para el paciente
        this.mail.to = this.patient.email;
        this.mailService.sendEmail(this.mail).subscribe();
        //Mensaje para el doctor
        this.mail.to = this.doctor.email;
        this.mail.type = "citaD";
        this.mail.message = "<h1>Cita solicitada</h1><ul><li><b>Asunto:</b> "+this.cita.asunto+"</li><li><b>Paciente:</b> "+this.cita.nombre_paciente+"</li><li><b>Fecha y Hora:</b> "+this.cita.fecha + " " + this.cita.hora+"</li></ul>";
        this.mailService.sendEmail(this.mail).subscribe();

        this.alertService.success('Se ha pedido cita correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/citas-patient',this.patient.id], { relativeTo: this.route });  
        },
      error =>{
        this.alertService.error(error);
        this.loading = false;
        }
    );

    
  }
}
