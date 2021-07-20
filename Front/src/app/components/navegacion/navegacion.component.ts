import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/userAuthentication.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  title = 'find your doctor';
  public doctorLogged: Doctor;
  public patientLogged: Patient;
  public adminLogged: Admin;

  constructor(public userAuthenticationService: UserAuthenticationService) { 
    if(this.userAuthenticationService.userValueD != null){
      this.doctorLogged = this.userAuthenticationService.userValueD;
    }else if(this.userAuthenticationService.userValueP != null){
      this.patientLogged = this.userAuthenticationService.userValueP;
    }else if(this.userAuthenticationService.userValueA != null){
      this.adminLogged = this.userAuthenticationService.userValueA;
    }
    
  }

  ngOnInit(): void {
  }

}
