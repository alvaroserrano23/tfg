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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PatientService,DoctorService,UserAuthenticationService,AlertService,MailService]
})
export class LoginComponent implements OnInit {
  public title:string;
	public title2:string;
  public title3:string;
  public title4:string;
  public title5:string;
  public title6:string;
  public patient:Patient;
  public doctor: Doctor;
  public userAuthentication: UserAuthentication;
  form: FormGroup;
  formPass1: FormGroup;
  formPass2: FormGroup;
  formPass3: FormGroup;
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
    private mailService: MailService

    ) { 
    //Titulos
  	this.title = "Tipo de cuenta";
  	this.title2 = "Iniciar sesión";
    this.title3 = "Registrarse como Medico";
    this.title4 = "Registrarse como Paciente";
    this.title5 = "¿Olvidaste tu contraseña?";
    
    
    this.patient = new Patient('','','','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','','','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','');
    }

  ngOnInit(): void {
    //Jquery
    $("#container_forgot").hide();

    $("#container_sms").hide();

    $("#container_newpass").hide();

    //Olvidaste contraseña
    $("#forgot").click(function(e){
      $("#container_forgot").show();
      $("#formInU").hide(500);
    });

    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formPass1 = this.formBuilder.group({
      email: ['', Validators.required, Validators.email]
    });
    this.formPass2 = this.formBuilder.group({
      code: ['', Validators.required]
    });
    this.formPass3 = this.formBuilder.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });

  }

  get f() { return this.form.controls; }
  get fPass1() { return this.formPass1.controls; }
  get fPass2() { return this.formPass2.controls; }
  get fPass3() { return this.formPass3.controls; }

  onSubmitForgotPassword(){

    this.submitted == true;
    this.alertService.clear();

    if(this.formPass1.invalid){
      return;
    }

    this.alertService.success('Te hemos enviado un correo con un codigo de recuperación', { keepAfterRouteChange: true });
    this.mail.to = this.form.value.email;
    this.mail.type = "recuperarcontraseña";
    this.mailService.sendEmail(this.mail).subscribe(
      res =>{
        $("#container_forgot").hide();
        $("#container_sms").show();
        console.log(res);
      },
      err => {
        this.alertService.error(err);
      }
    );
      

  }

  onSubmitCodigoRecuperacionForm(){
    this.submitted == true;
    this.alertService.clear();

    if(this.formPass2.invalid){
      return;
    }

    //Validar que el codigo es correcto
    $("#container_sms").hide();
    $("#container_newpass").show();
    
  }
  onSubmitNuevaContrasenaForm(){
    this.submitted == true;
    this.alertService.clear();

    if(this.formPass3.invalid){
      return;
    }

  }
 
  onSubmitInU() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.userAuthentication = this.form.value;
    this.loading = true;
    this.UserAuthenticationService.loginAuth(this.userAuthentication)
      .subscribe(
        res => {
          console.log(res.userAuthentication);
          this.alertService.success('Se ha iniciado sesión correctamente', { keepAfterRouteChange: true });
          localStorage.setItem('token', res.token);
          this.router.navigate(['']);
        },
        err => {
          this.alertService.error(err);
          this.loading = false;
        }
      )
  }
}
