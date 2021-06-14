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

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css'],
  providers: [PatientService,DoctorService,UserAuthenticationService,AlertService,MailService]
})
export class PedirCitaComponent implements OnInit {
  form: FormGroup;
  public patient:Patient;
  public doctor: Doctor;
  public userAuthentication: UserAuthentication;
  loading = false;
  submitted = false;
  public mail:Mail;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private UserAuthenticationService: UserAuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private mailService: MailService) {
       
    this.patient = new Patient('','','','','','','','','','','',0,'','');

    this.doctor = new Doctor('','','','','','','','','','','','','',0,'','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','','');
      
    this.mail = new Mail('','','','','','','');
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(){
    
  }
}
