import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Doctor } from '../models/doctor';
import { Global } from './global'; 

@Injectable()
export class DoctorService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}

	saveDoctor(doctor: Doctor) :Observable<any>{
		let params = JSON.stringify(doctor);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-doctor',params,{headers:headers});
	}

	getDoctorByUsername(user) :Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'doctor/user/'+user,{headers: headers});
	}
}