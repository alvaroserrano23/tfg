import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';
import { UserAuthentication } from 'src/app/models/userAuthentication';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { HistorialService } from 'src/app/services/historial.service';
import { OpinionService } from 'src/app/services/opinion.service';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/models/cita';
import { Opinion } from 'src/app/models/opinion';
import { Historial } from 'src/app/models/historial';

@Component({
  selector: 'app-admin-modificar',
  templateUrl: './admin-modificar.component.html',
  styleUrls: ['./admin-modificar.component.css']
})
export class AdminModificarComponent implements OnInit {
  public url: string;
  public doctor: Doctor;
  public patient: Patient;
  public patientCita: Patient;
  public admin: Admin;
  public userAuth: UserAuthentication;
  public cita: Cita;
  public opinion: Opinion;
  public historial: Historial;
  public id:String;
  formP: FormGroup;
  formD: FormGroup;
  formC: FormGroup;
  formO: FormGroup;
  formH: FormGroup;
  formA: FormGroup;
  loading = false;
  submittedP = false;
  submittedD = false;
  submittedC = false;
  submittedO = false;
  submittedH = false;
  submittedA = false;
  returnUrl: String;
  public filesToUpload: Array<File>;
  
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private adminService: AdminService,
    private userAuthenticationService: UserAuthenticationService,
    private historialService: HistorialService,
    private opinionService: OpinionService,
    private citaService: CitasService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { 
    this.url = Global.url;
    this.userAuth = new UserAuthentication('','','','','','','');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
       this.id = params.id;
      if(localStorage.getItem('admin') && localStorage.getItem('admin-patient')){
        this.borrarToken('admin-patient');
        this.getPatient();
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-doctor')){
        this.borrarToken('admin-doctor');
        this.getDoctor();
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-cita')){
        this.borrarToken('admin-cita');
        this.getCita();
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-opinion')){
        this.borrarToken('admin-opinion');
        this.getOpinion();
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-historial')){
        this.borrarToken('admin-historial');
        this.getHistorial();
      }else if(localStorage.getItem('admin') && localStorage.getItem('admin-admin')){
        this.borrarToken('admin-admin');
        this.getAdmin();
      }
    })

    //Formularios
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
      //cv: new FormControl('',Validators.required)
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

    this.formC = new FormGroup({
      asunto: new FormControl('',Validators.required),
      descripcion: new FormControl('',Validators.required),
      fecha: new FormControl('',Validators.required),
      hora: new FormControl('',Validators.required),
      //telefono: new FormControl(''),
      estado: new FormControl('')
    });

    this.formO = new FormGroup({
      comentario: new FormControl('',Validators.required),
      valoracion: new FormControl('',Validators.required)
    });

    this.formH = new FormGroup({
      edad_paciente: new FormControl(''),
      dni_paciente: new FormControl('',Validators.pattern("^[0-9]{8,8}[A-Za-z]$")),
      fecha_nacimiento_paciente : new FormControl(''),
      patologias_paciente: new FormControl(),
      alergias_paciente: new FormControl (),
      vacunas_paciente: new FormControl (),
      tratamientos: new FormControl ()
    });

    this.formA = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      user: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
    });

  }
  get fP() { return this.formP.controls; }
  get fD() { return this.formD.controls; }
  get fC() { return this.formC.controls; }
  get fO() { return this.formO.controls; }
  get fH() { return this.formH.controls; }

  validarCV(doctor){
    doctor.cv_validado = true;
    doctor.id = doctor._id;
    this.doctorService.updateDoctor(doctor).subscribe(
      response=>{
        console.log(response);
        this.volver('doctors');
      },
      error=>{
        console.log(error);
      }
    )
  }

  borrarToken(token){
    localStorage.removeItem(token);
  }

  volver(rol){
    localStorage.setItem('admin-'+rol,'admin-'+rol);
    localStorage.setItem('repetido','repetido');
    this.router.navigate(['administrar']);
  }

  getPatient(){
    this.patientService.getPatient(this.id).subscribe(
      response =>{
        this.patient = response.patient;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  /*getPatientForCita(){
    this.citaService.getCita(this.id).subscribe(
      response =>{
        this.cita = response.cita;
        this.patientService.getPatient(this.cita.id_paciente).subscribe(
          response =>{
            this.patientCita = response.patientCita;
            console.log(response);
          },
          error => {
            console.log(<any>error);
          }
        );

        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }*/

  getDoctor(){
    this.doctorService.getDoctor(this.id).subscribe(
      response =>{
        this.doctor = response.doctor;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getCita(){
    this.citaService.getCita(this.id).subscribe(
      response =>{
        this.cita = response.cita;
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getOpinion(){
    this.opinionService.getOpinion(this.id).subscribe(
      response =>{
        this.opinion = response.opinion;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getHistorial(){
    this.historialService.getHistorial(this.id).subscribe(
      response =>{
        this.historial = response.historial;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getAdmin(){
    this.adminService.getAdmin(this.id).subscribe(
      response =>{
        this.admin = response.admin;
      },
      error => {
        console.log(<any>error);
      } 
    )
  }

  onSubmitD(){
    

    this.submittedD = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formD.invalid) {
        return;
    }
    this.doctor = this.formD.value;
    this.doctor.id = this.id;
    this.doctorService.updateDoctor(this.doctor).subscribe(
      res => {
        if(this.filesToUpload){
        this.doctorService.makeFileRequestD(Global.url+"upload-cv/"+res.doctorUpdated._id,[],this.filesToUpload,'cv')
              .then((result:any)=>{
                this.doctor = result.doctor;});
        }
          this.userAuth.user = this.doctor.user;
          this.userAuth.password = this.doctor.password;
          this.userAuth.email = this.doctor.email;
          this.userAuth.role = "doctor";
          this.userAuthenticationService.updateUser(this.userAuth).subscribe();
          this.alertService.success('El doctor con id ' + this.doctor.id + ' se ha modificado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error =>{
        window.scrollTo(0,-10000);
        this.alertService.error(error.error.message);
        this.loading = false;
        }
    );
    
  }

  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

  onSubmitP(){
    this.submittedP = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formP.invalid) {
        return;
    }
    this.patient = this.formP.value;
    this.patient.id = this.id;
    this.patientService.updatePatient(this.patient).subscribe(
        res => {
          console.log(res);
          this.userAuth.id = this.patient.id;
          this.userAuth.user = this.patient.user;
          this.userAuth.password = this.patient.password;
          this.userAuth.email = this.patient.email;
          this.userAuth.role = "patient";
          this.userAuthenticationService.updateUser(this.userAuth).subscribe();
          this.alertService.success('El paciente con id ' + this.patient.id + ' se ha modificado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/'], { relativeTo: this.route });  
          },
        error =>{
          //$("#id").animate({"scrollTop": $("#id").scrollTop() + 100});
          window.scrollTo(0,-10000);
          this.alertService.error(error.error.message);
          this.loading = false;
          }
      );
  }

  onSubmitC(){
    this.submittedC = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formC.invalid) {
        return;
    }
    let cita = this.formC.value;
    cita.estado = this.cita.estado;
    cita.id = this.id;
    this.citaService.updateCita(cita).subscribe(
      response=>{
        console.log(response);
        this.alertService.success('La cita con id ' + this.id + ' se ha modificado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route }); 
      },
      error=>{
        console.log(error);
      }

    )
  }

  onSubmitO(){
    this.submittedO = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formO.invalid) {
        return;
    }

    this.opinion = this.formO.value;
    this.opinion.id = this.id;
    this.opinionService.updateOpinion(this.opinion).subscribe(
      response=>{
        console.log(response);
        this.alertService.success('La opinion con id ' + this.opinion.id + ' se ha modificado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route }); 
      },
      error=>{
        console.log(error);
      }

    )
  }

  onSubmitH(){
    this.submittedH = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formH.invalid) {
        return;
    }

    this.historial = this.formH.value;
    this.historial.id = this.id;
    this.historialService.updateHistorial(this.historial).subscribe(
      response=>{
        console.log(response);
        this.alertService.success('El historial con id ' + this.historial.id + ' se ha modificado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route }); 
      },
      error=>{
        console.log(error);
      }

    )
  }

  onSubmitA(){
    this.submittedA = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formA.invalid) {
        return;
    }
    this.admin = this.formA.value;
    this.admin.id = this.id;
    this.adminService.updateAdmin(this.admin).subscribe(
        res => {
          console.log(res);
          this.userAuth.id = this.admin.id;
          this.userAuth.user = this.admin.user;
          this.userAuth.password = this.admin.password;
          this.userAuth.email = this.admin.email;
          this.userAuth.role = "admin";
          this.userAuthenticationService.updateUser(this.userAuth).subscribe();
          this.alertService.success('El admin con id ' + this.admin.id + ' se ha modificado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/'], { relativeTo: this.route });  
          },
        error =>{
          window.scrollTo(0,-10000);
          this.alertService.error(error.error.message);
          console.log(error);
          this.loading = false;
          }
      );
  }
}
