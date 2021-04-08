import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Appointment } from '../models/appointment';
import { Global } from './global'; 

@Injectable()
export class AppointmentService{
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