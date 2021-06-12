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
  public doctorLogged: Doctor;
  public patientLogged: Patient;

  constructor(public userAuthenticationService: UserAuthenticationService) {
    
    if(this.userAuthenticationService.userValueD != null){
      this.doctorLogged = this.userAuthenticationService.userValueD;
    }else if(this.userAuthenticationService.userValueP != null){
      this.patientLogged = this.userAuthenticationService.userValueP;
    }
    //userAuthenticationService.limpiarItems();
  }
  
}
