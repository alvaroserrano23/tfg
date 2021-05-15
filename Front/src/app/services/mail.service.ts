import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Mail } from '../models/mail';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}

  sendEmail(mail): Observable<any>{
    return this._http.post<any>(this.url+'sendEmail', mail);

  }
}
