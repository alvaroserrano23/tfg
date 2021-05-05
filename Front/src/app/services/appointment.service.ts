import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}
}
