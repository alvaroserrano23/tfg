import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { UserAuthentication } from '../../models/userAuthentication';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { UserAuthenticationService } from '../../services/userAuthentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [PatientService,DoctorService,UserAuthenticationService]
})
export class LoginComponent implements OnInit {
  public title:string;
	public title2:string;
  public title3:string;
  public title4:string;
  public patient:Patient;
  public doctor: Doctor;
  public doctorEnBd : Doctor;
  public patientEnBd : Patient;
  public userAuthentication : UserAuthentication;
  public userAuthenticationEnBd : UserAuthentication;
  public botonDoctor:string;

  constructor(private patientService: PatientService,
    private doctorService: DoctorService,
    private UserAuthenticationService: UserAuthenticationService
    
    ) { 
    //Titulos
  	this.title = "Tipo de cuenta";
  	this.title2 = "Iniciar sesión";
    this.title3 = "Registrarse como Medico";
    this.title4 = "Registrarse como Paciente";
    
    
    this.patient = new Patient('','','','','','','','','');
    this.patientEnBd = new Patient('','','','','','','','','');

    this.doctor = new Doctor('','','','','','','','','','');
    this.doctorEnBd = new Doctor('','','','','','','','','','');
    
    this.userAuthentication = new UserAuthentication('','','','');
    this.userAuthenticationEnBd = new UserAuthentication('','','','');

    }

  ngOnInit(): void {
  }
  asignarValoresDeResponseDoctor(userAuthenticationResponse: any){
    this.doctorService.getDoctorByUsername(userAuthenticationResponse.user).subscribe(
  		response => {
        this.doctorEnBd.id = response.doctor._id;
        this.doctorEnBd.name = response.doctor.name;
        this.doctorEnBd.surname = response.doctor.surname;
        this.doctorEnBd.user = response.doctor.user;
        this.doctorEnBd.password = response.doctor.password;
        this.doctorEnBd.email = response.doctor.email;
        this.doctorEnBd.location = response.doctor.location;
        this.doctorEnBd.address = response.doctor.address;
        this.doctorEnBd.curriculum = response.doctor.curriculum;
        this.doctorEnBd.insurance = response.doctor.insurance;
      },
      error => {
        console.log(<any>error);
      }
    );
  
  }

  asignarValoresDeResponsePatient(userAuthenticationResponse: any){
    this.patientService.getPatientByUsername(userAuthenticationResponse.user).subscribe(
  		response => {
        this.patientEnBd.id = response.patient._id;
        this.patientEnBd.name = response.patient.name;
        this.patientEnBd.surname = response.patient.surname;
        this.patientEnBd.user = response.patient.user;
        this.patientEnBd.password = response.patient.password;
        this.patientEnBd.email = response.patient.email;
        this.patientEnBd.location = response.patient.location;
        this.patientEnBd.address = response.patient.address;
        this.patientEnBd.insurance = response.patient.insurance;
    
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  asignarValoresDeResponseAUsuario(userAuthenticationResponse : any){
    this.userAuthenticationEnBd.id = userAuthenticationResponse._id;
    this.userAuthenticationEnBd.user = userAuthenticationResponse.user;
    this.userAuthenticationEnBd.password = userAuthenticationResponse.password;
    this.userAuthenticationEnBd.role = userAuthenticationResponse.role;
  }

  onSubmitInU(form){
    this.UserAuthenticationService.getUserAuthenticationByUsername(this.userAuthentication.user).subscribe(
  		response => {
  			if(response.userAuthentication){
          this.asignarValoresDeResponseAUsuario(response.userAuthentication);
          if(response.userAuthentication.role == "Doctor"){
            this.asignarValoresDeResponseDoctor(response.userAuthentication);
          }else if(response.userAuthentication.role == "Patient"){
            this.asignarValoresDeResponsePatient(response.userAuthentication);
          }

          if(this.userAuthentication.user == this.userAuthenticationEnBd.user 
            && this.userAuthentication.password == this.userAuthenticationEnBd.password ){
              alert("Datos correctos, sesión iniciada");
          }else{
            alert("Datos incorrectos");
          }
  			}
  		},
  		error => {
        alert("Datos incorrectos");
  		}
  	);
    
  }
}
