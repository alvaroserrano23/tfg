import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OpinionService } from 'src/app/services/opinion.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AlertService } from 'src/app/services/alert.service';
import { Doctor } from '../../models/doctor';
import { Opinion } from 'src/app/models/opinion';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/models/mail';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-opinar',
  templateUrl: './opinar.component.html',
  styleUrls: ['./opinar.component.css']
})
export class OpinarComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  public doctor: Doctor;
  public opinion: Opinion;
  public patient: Patient;
  public mail:Mail;
  currentRate = 0;

  constructor(
    private doctorService: DoctorService,
    private opinionService: OpinionService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private mailService: MailService
    ) { 
      this.mail = new Mail('','','','','','','');
    }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let id = params.id;
      this.getDoctor(id);
      if(localStorage.getItem('token')){
        var patientId = JSON.parse(localStorage.getItem('patient'));
        this.patient = patientId;
        this.patient.id = patientId._id;
      }
    })
    this.form = new FormGroup({
      comentario: new FormControl('',Validators.required),
      valoracion: new FormControl('',Validators.required)
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

  async onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.opinion = this.form.value;
    this.opinion.id_doctor = this.doctor.id;
    this.opinion.id_patient = this.patient.id;
    this.opinion.nombre_patient = this.patient.name+ " " + this.patient.surname;
    this.opinion.nombre_doctor = this.doctor.name + " " + this.doctor.surname;
    this.doctor.numOpiniones += 1;
    
    this.opinionService.saveOpinion(this.opinion).subscribe(
      res =>{
        //Enviar mail
        //Paciente
        this.mail.type = "dar opinion";
        this.mail.message = "<h1>Opinion sobre el doctor "+ this.opinion.nombre_doctor +"</h1><p>Hola " + this.opinion.nombre_patient + " ,tu opinion ha sido registrada correctamente.</p><ul><li><b>Comentario:</b> "+this.opinion.comentario+"</li><li><b>Valoración:</b> "+this.opinion.valoracion+"</li>";
        this.mail.to = this.patient.email;
        this.mailService.sendEmail(this.mail).subscribe();
        //Doctor
        this.mail.message = "<p>Hola " + this.opinion.nombre_doctor + " el paciente "+this.opinion.nombre_patient+ " ,ha dado su opinión sobre ti.</p><ul><li><b>Comentario:</b> "+this.opinion.comentario+"</li><li><b>Valoración:</b> "+this.opinion.valoracion+"</li>";
        this.mail.to = this.doctor.email;
        this.mailService.sendEmail(this.mail).subscribe();
        //Update al doctor
        this.doctorService.updateDoctor(this.doctor).subscribe();
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );

  }
}
