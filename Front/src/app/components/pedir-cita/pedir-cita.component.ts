import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { UserAuthentication } from '../../models/userAuthentication';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { UserAuthenticationService } from '../../services/userAuthentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  patientString: String;
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

    this.cita = new Cita('','','','','','','','','');
       
    this.patient = new Patient('','','','','','','','','','','',0,'','');

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
        //this.patientString = localStorage.getItem('patient._id');
      }
    })

    this.form = this.formBuilder.group({
      asunto: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['',Validators.required],
      direccion_consutal: ['', Validators.required],
      telefono: ['', Validators.minLength(9)]
    });
    
  }

  get f() { return this.form.controls; }

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

  /*getPatient(id){
    this.patientService.getPatient(id).subscribe(
      response =>{
        this.patient = response.patient;
      },
      error =>{
        console.log(<any>error);
      }
    )

  }*/

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.cita = this.form.value;
    this.cita.estado = "pendiente";
    this.cita.id_doctor = this.doctor.id;
    this.cita.id_paciente = "";
    //telefono
    this.citaService.saveCita(this.cita).subscribe(
      res => {
        console.log(res);
        this.alertService.success('Se ha pedido cita correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
        },
      error =>{
        this.alertService.error(error);
        this.loading = false;
        }
    );

    
  }
}
