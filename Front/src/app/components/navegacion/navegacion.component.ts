import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/userAuthentication.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';

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

  constructor(public userAuthenticationService: UserAuthenticationService,private router: Router) { 
    
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

  comprobarRepetido(){
    if(localStorage.getItem('repetido')){
      this.router.navigate(['administrar']).then(() => {
        window.location.reload();
      });
    }else{
      this.router.navigate(['administrar']);
      localStorage.setItem('repetido','repetido');
    }
  }
  pacientes(){
    localStorage.setItem('admin-patients','admin-patients');
    this.comprobarRepetido();
    
  }

  doctors(){
    localStorage.setItem('admin-doctors','admin-doctors');
    this.comprobarRepetido();
  }

  citas(){
    localStorage.setItem('admin-citas','admin-citas');
    this.comprobarRepetido();
  }

  opiniones(){
    localStorage.setItem('admin-opiniones','admin-opiniones');
    this.comprobarRepetido();
  }

  historiales(){
    localStorage.setItem('admin-historiales','admin-historiales');
    this.comprobarRepetido();
  }

}
