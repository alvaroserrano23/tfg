import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/userAuthentication.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { Admin } from 'src/app/models/admin';

@Component({
selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  public doctorLogged: Doctor;
  public patientLogged: Patient;
  public userLogged;
  public adminLogged: Admin;

  constructor(public userAuthenticationService: UserAuthenticationService) { 
    if(this.userAuthenticationService.userValueD != null){
      this.userLogged = this.userAuthenticationService.userValueD;
    }else if(this.userAuthenticationService.userValueP != null){
      this.userLogged = this.userAuthenticationService.userValueP;
    }else if(this.userAuthenticationService.userValueA != null){
      this.adminLogged = this.userAuthenticationService.userValueA;
    }
    

  }

  ngOnInit(): void {

    /*$("#button_buscar").click(function(e){
      $("#myCarousel").hide(500);
      $("#buscador").hide(500);
      $("#buscadores").show();
    });*/
  }
}
