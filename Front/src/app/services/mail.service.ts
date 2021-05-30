import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Mail } from '../models/mail';
import { Observable } from 'rxjs/Observable';
import { UserAuthenticationService } from './userAuthentication.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  public url:string;
 
	constructor(
		private _http: HttpClient,
		private userAuthenticationService: UserAuthenticationService
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}

  sendEmail(mail): Observable<any>{
    return this._http.post<any>(this.url+'sendEmail', mail);
  }

  sendEmailRecuperacion(mail): Observable<any>{
	  return this._http.post<any>(this.url+'sendEmail', mail);
  }
}
