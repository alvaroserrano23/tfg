import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Global } from '../../services/global';
import { MailService } from 'src/app/services/mail.service';
import { Mail } from 'src/app/models/mail';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [PatientService,DoctorService,AlertService]
})
export class RegisterComponent implements OnInit {

	public title:string;
	public title2:string;
  public title3:string;
  public title4:string;
  public patient:Patient;
  public doctor: Doctor;
  public doctorEnBd : Doctor;
  public patientEnBd : Patient;
  public botonDoctor:string;
  public status: string;
	public filesToUpload: Array<File>;
  public url:string;
  public mail:Mail;
  formD: FormGroup;
  formP: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private alertService: AlertService,
    private mailService: MailService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    ) {
    this.url = Global.url;
    //Titulos
  	this.title = "Tipo de cuenta";
    this.title3 = "Registrarse como Médico";
    this.title4 = "Registrarse como Paciente";
    
    
    this.patient = new Patient('','','','','','','','','','','',0,'','','');

    this.doctor = new Doctor('','','','','','','','','','','','','',0,'','','',0,false);

   }
 
  /*Contenedor de Iniciar sesion  -   Contenedor de registrar Paciente  -  Contenedor de registrar Doctor*/
  ngOnInit() {
    this.formD = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      province: new FormControl('',Validators.required),
      comunidad: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      cp: new FormControl('',[Validators.required,Validators.pattern("0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}")]),
      numColegiado: new FormControl('',[Validators.required,Validators.minLength(9)]),
      user: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      especialidad: new FormControl('',Validators.required),
      insurance: new FormControl('',Validators.required),
      cv: new FormControl('',Validators.required)
    });

    this.formP = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      province: new FormControl('',Validators.required),
      comunidad: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      cp: new FormControl('',[Validators.required,Validators.pattern("0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}")]),
      user: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      insurance: new FormControl('',Validators.required)
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    

    //JQUERY
     $("#containerRegPat").hide();
     $("#containerRegDoc").hide();
     $("#botonera").show();

     //Boton Doctor
     $("#button_doc").click(function(e){
        $("#containerRegDoc").show();
        $("#botonera").hide(500);
      });
     //Boton Patient
     $("#button_pat").click(function(e){
        $("#containerRegPat").show();
        $("#botonera").hide(500);
      });

     $("#no_accU").click(function(e){
       $("#containerInUser").hide(500);
       $("#botonera").show(); 
      });
  
  }

  get fD() { return this.formD.controls; }

  get fP() { return this.formP.controls; }

   onSubmitRegD(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formD.invalid) {
        return;
    }
    this.doctor = this.formD.value;
    this.doctor.numOpiniones = 0;
    this.doctorService.saveDoctor(this.doctor).subscribe(
      response => {
        if(response){
          //this.doctorService.makeFileRequest(Global.url+"upload-image/"+response.doctorGuardado._id, [], this.filesToUpload, 'image')
          //.then((result:any) => {
            this.mail.to = this.doctor.email;
            this.mail.type = "registroD";
            this.mail.message = "<h1>Hola <b>" + this.doctor.name + this.doctor.surname +"</b> te has registrado correctamente en FindYourDoctor!</h1><p>Ya puedes disfrutar de todos nuestros servicios:</p><ul><li>Búsquedas parametrizables</li><li>Gestión de citas online</li><li>Sistema de opiniones</li><li>Y mucho más</li></ul>";
            this.mailService.sendEmail(this.mail).subscribe();
            this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
            this.router.navigate(['/login'], { relativeTo: this.route }); 
          //});
        }
        /*localStorage.setItem('token',res.token);
        localStorage.setItem('doctor',JSON.stringify(this.doctor));*/
         
        },
      error =>{
        this.alertService.error(error.error.message);
        this.loading = false;
        }
    );
    
  }
   onSubmitRegP(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formP.invalid) {
        return;
    }
    this.patient = this.formP.value;
    this.patient.numOpiniones = 0;
    this.patientService.savePatient(this.patient).subscribe(
        res => {
          console.log(res);
          this.mail.to = this.patient.email;
          this.mail.type = "registroP";
          this.mail.message = "<h1>Hola <b>" + this.patient.name + this.patient.surname +"</b> te has registrado correctamente en FindYourDoctor!</h1><p>Ya puedes disfrutar de todos nuestros servicios:</p><ul><li>Búsquedas parametrizables</li><li>Gestión de citas online</li><li>Sistema de opiniones</li><li>Y mucho más</li></ul>";
          this.mailService.sendEmail(this.mail).subscribe();
          this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/login'], { relativeTo: this.route });  
          },
        error =>{
          this.alertService.error(error.error.message);
          this.loading = false;
          }
      );
  }

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}
