import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/userAuthentication.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';

@Component({
selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  public doctorLogged: Doctor;
  public patientLogged: Patient;
  public userLogged;

  constructor(public userAuthenticationService: UserAuthenticationService) { 
    if(this.userAuthenticationService.userValueD != null){
      this.userLogged = this.userAuthenticationService.userValueD;
    }else if(this.userAuthenticationService.userValueP != null){
      this.userLogged = this.userAuthenticationService.userValueP;
    }
    //userAuthenticationService.limpiarItems();

  }

  ngOnInit(): void {

  }

}
