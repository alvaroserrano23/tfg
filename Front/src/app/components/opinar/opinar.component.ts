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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  public mail:Mail;

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
    this.doctor.numOpiniones += 1;
    
    this.opinionService.saveOpinion(this.opinion).subscribe(
      res =>{
        //Enviar mail
        this.mail.type = "dar opinion";
        this.mail.message = "";
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
