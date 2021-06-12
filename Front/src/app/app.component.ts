import { Component } from '@angular/core';
import { UserAuthenticationService } from './services/userAuthentication.service';
import { UserAuthentication } from './models/userAuthentication';
import { Doctor } from './models/doctor';
import { Patient } from './models/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'find your doctor';
  public userLogged : UserAuthentication;
  public doctorLogged: Doctor;
  public patientLogged: Patient;
  public isLogged : boolean;

  constructor(public userAuthenticationService: UserAuthenticationService) {
    this.userLogged = new UserAuthentication('','','','','','','');
    this.patientLogged = new Patient('','','','','','','','','','','',0,'');
    this.doctorLogged = new Doctor('','','','','','','','','','','','','',0,'','');
    
    if(this.userAuthenticationService.userValue != null){
      this.userLogged = this.userAuthenticationService.userValue;
      
      if (this.userLogged.role == "doctor"){
        this.userAuthenticationService.getUserAuthenticationB(this.userLogged).subscribe(
          res => {
            this.doctorLogged = res;
            console.log(res);
          },

          err =>{
            console.log(err);
          }
        )
      }else if ( this.userLogged.role == "patient" ){
        this.userAuthenticationService.getUserAuthenticationB(this.userLogged).subscribe(
          res => {
            this.patientLogged = res;
            console.log(res);
          },

          err =>{
            console.log(err);
          }
        )
      }

    }
  }
  
}
