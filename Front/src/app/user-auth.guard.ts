import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {UserAuthenticationService} from './services/userAuthentication.service';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
//Se usa para el front end, lo que hace es
//Si el token existe mostrara los datos privados
//Si no , nos redirige a login
export class UserAuthGuard implements CanActivate {

  constructor(
    private userAuthenticationService:UserAuthenticationService,
    private router:Router
    ){

  }
  canActivate():boolean{
    if(this.userAuthenticationService.loggedIn()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
