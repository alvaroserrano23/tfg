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
  public userAuthRecuperacion: UserAuthentication;
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
    
    
    this.patient = new Patient('','','','','','','','','','','',0,'','','');

    this.doctor = new Doctor('','','','','','','','','','','','','',0,'','','');
    
    this.userAuthentication = new UserAuthentication('','','','','','','');

    this.userAuthRecuperacion = new UserAuthentication('','','','','','','');
      
    this.mail = new Mail('','','','','','','');
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
      email: ['', [Validators.required, Validators.email]]
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

    this.submitted = true;
    this.alertService.clear();

    if(this.formPass1.invalid){
      return;
    }

    this.alertService.success('Te hemos enviado un correo con un codigo de recuperación', { keepAfterRouteChange: true });
    this.mail.to = this.formPass1.value.email;
    this.userAuthRecuperacion.email = this.formPass1.value.email;
    this.mail.type = "recuperarcontraseña";
    

    this.mailService.sendEmailRecuperacion(this.mail).subscribe(
      res=>{
        console.log(res);
        $("#container_forgot").hide();
        $("#container_sms").show();
      },
      err=>{
        console.log(err);
      }
      )
    
  }

  onSubmitCodigoRecuperacionForm(){
    this.submitted = true;
    this.alertService.clear();

    if(this.formPass2.invalid){
      return;
    }

    this.userAuthRecuperacion.code = this.formPass2.value.code;
    this.UserAuthenticationService.validarCode(this.userAuthRecuperacion).subscribe(
      res=>{
        this.userAuthRecuperacion = res.userAuthenticationUpdated;
        console.log(res);
        $("#container_sms").hide();
        $("#container_newpass").show();
      },
      err=>{
        console.log(err);
      }
    )
    
  }
  onSubmitNuevaContrasenaForm(){
    this.submitted = true;
    this.alertService.clear();

    if(this.formPass3.invalid){
      return;
    }

    this.userAuthRecuperacion.password = this.formPass3.value.password1;
    var password2 = this.formPass3.value.password2;
    
    if(this.userAuthRecuperacion.password == password2){
      this.UserAuthenticationService.updateUserAuth(this.userAuthRecuperacion).subscribe(
        res=>{
          console.log(res);
          this.mail.type = "cambio contraseña";
          this.mail.to = this.userAuthRecuperacion.email;
          this.mail.message = "<h1>Proceso finalizado</h1><p>Enhorabuena " + this.userAuthentication.user + " , has cambiado tu contraseña correctamente!.</p>";
          this.mailService.sendEmail(this.mail);
          this.alertService.success('Has cambiado tu contraseña correctamente', { keepAfterRouteChange: true });
          this.router.navigate(['/login']);
        },
        err=>{
          console.log(err);
        }
      )
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
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });

        
        },
        err => {
          this.alertService.error(err.message);
          console.log(err);
          this.loading = false;
        }
      )
  }
}
