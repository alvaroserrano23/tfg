import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { AdminService } from 'src/app/services/admin.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Admin } from '../../models/admin';
import { Global } from '../../services/global';
import { Historial } from 'src/app/models/historial';
import { Cita } from 'src/app/models/cita';
import { Opinion } from 'src/app/models/opinion';
import { CitasService } from 'src/app/services/citas.service';
import { OpinionService } from 'src/app/services/opinion.service';
import { HistorialService } from 'src/app/services/historial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  public doctors: Doctor[];
  public patients: Patient[];
  public citas: Cita[];
  public opinions: Opinion[];
  public historials: Historial[];
  public admins: Admin[];
  public url: string;

  constructor(
    public doctorService: DoctorService,
    public patientService: PatientService,
    public citaService: CitasService,
    public opinionService: OpinionService,
    public historialService: HistorialService,
    public adminService: AdminService,
    public userAuthenticationService: UserAuthenticationService,
    public alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
    ) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {
    this.limpiarArrays();
    if(localStorage.getItem('admin-patients')){
      this.getPatients();
      localStorage.removeItem('admin-patients');
    }else if(localStorage.getItem('admin-doctors')){
      this.getDoctors();
      localStorage.removeItem('admin-doctors');
    }else if(localStorage.getItem('admin-citas')){
      this.getCitas();
      localStorage.removeItem('admin-citas');
    }else if(localStorage.getItem('admin-opiniones')){
      this.getOpiniones();
      localStorage.removeItem('admin-opiniones');
    }else if(localStorage.getItem('admin-historiales')){
      this.getHistoriales();
      localStorage.removeItem('admin-historiales');
    }else if(localStorage.getItem('admin-admins')){
      this.getAdmins();
      localStorage.removeItem('admin-admins');
    }
  }

  modificarPatient(patient){
    localStorage.removeItem('repetido');
    localStorage.setItem('admin-patient','admin-patient');
    this.router.navigate(['admin-modificar-patient/'+patient._id]);
  }

  modificarDoctor(doctor){
    localStorage.removeItem('repetido');
    localStorage.setItem('admin-doctor','admin-doctor');
    this.router.navigate(['admin-modificar-doctor/'+doctor._id]);
  }

  modificarCita(cita){
    localStorage.removeItem('repetido');
    localStorage.setItem('admin-cita','admin-cita');
    this.router.navigate(['admin-modificar-cita/'+cita._id]);
  }

  modificarOpinion(opinion){
    localStorage.removeItem('repetido');
    localStorage.setItem('admin-opinion','admin-opinion');
    this.router.navigate(['admin-modificar-opinion/'+opinion._id]);
  }

  modificarHistorial(historial){
    localStorage.removeItem('repetido');
    localStorage.setItem('admin-historial','admin-historial');
    this.router.navigate(['admin-modificar-historial/'+historial._id]);
  }
  
  modificarAdmin(admin){
    localStorage.removeItem('repetido');
    localStorage.setItem('admin-admin','admin-admin');
    this.router.navigate(['admin-modificar-admin/'+admin._id]); 
  }

  addAdmin(){
    localStorage.removeItem('repetido');
    localStorage.setItem('nuevo-admin','nuevo-admin');
    this.router.navigate(['crear-admin/']);
  }

  eliminarPatient(patient){
    localStorage.removeItem('repetido');
    this.patientService.deletePatient(patient._id).subscribe(
      response=>{
        console.log(response);
        this.userAuthenticationService.deleteUserAuth(patient._id).subscribe;
        this.alertService.success('El paciente se ha borrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error=>{
        console.log(error);
        this.alertService.error(error.error.message);
      }
    )
  }

  eliminarDoctor(doctor){
    localStorage.removeItem('repetido');
    this.doctorService.deleteDoctor(doctor._id).subscribe(
      response=>{
        console.log(response);
        this.userAuthenticationService.deleteUserAuth(doctor._id).subscribe;
        this.alertService.success('El doctor se ha borrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarCita(cita){
    localStorage.removeItem('repetido');
    this.citaService.deletCita(cita._id).subscribe(
      response=>{
        console.log(response);
        this.alertService.success('La cita se ha borrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarOpinion(opinion){
    localStorage.removeItem('repetido');
    this.opinionService.deleteOpinion(opinion._id).subscribe(
      response=>{
        console.log(response);
        this.alertService.success('La opinion se ha borrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarHistorial(historial){
    localStorage.removeItem('repetido');
    this.historialService.deleteHistorial(historial._id).subscribe(
      response=>{
        console.log(response);
        this.alertService.success('El historil se ha borrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarAdmin(admin){
    localStorage.removeItem('repetido');
    this.adminService.deleteAdmin(admin._id).subscribe(
      response=>{
        console.log(response);
        this.userAuthenticationService.deleteUserAuth(admin._id).subscribe;
        this.alertService.success('El admin se ha borrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });  
      },
      error=>{
        console.log(error);
      }
    )
  }

  volver(){
    localStorage.removeItem('repetido');
    this.router.navigate(['/']);
  }

  limpiarArrays(){
    this.doctors = null;
    this.patients = null;
    this.citas = null;
    this.opinions = null;
    this.historials = null;
  }
  getPatients(){
  	this.patientService.getPatients().subscribe(
  		response => {
  			if(response.patients){
  				this.patients = response.patients;
          console.log(this.patients);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getDoctors(){
  	this.doctorService.getDoctors().subscribe(
  		response => {
  			if(response.doctors){
  				this.doctors = response.doctors;
          console.log(this.doctors);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getCitas(){
  	this.citaService.getCitas().subscribe(
  		response => {
  			if(response.citas){
  				this.citas = response.citas;
          console.log(this.citas);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getOpiniones(){
  	this.opinionService.getOpiniones().subscribe(
  		response => {
  			if(response.opiniones){
  				this.opinions = response.opiniones;
          console.log(this.opinions);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getHistoriales(){
  	this.historialService.getHistorials().subscribe(
  		response => {
  			if(response.historials){
  				this.historials = response.historials;
          console.log(this.historials);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getAdmins(){
    this.adminService.getAdmins().subscribe(
  		response => {
  			if(response.admins){
  				this.admins = response.admins;
          console.log(this.admins);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

}
