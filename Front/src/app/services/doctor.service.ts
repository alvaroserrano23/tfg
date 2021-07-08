import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs/Observable';
import { UserAuthentication } from '../models/userAuthentication';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

	getDoctors(){
		return this._http.get<any>(this.url+'/doctors');
	}

	getDoctor(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'doctor/'+id,{headers:headers});
	}

	updateDoctor(doctor:Doctor) :Observable<any>{
		let params = JSON.stringify(doctor);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'doctor/'+doctor.id,params,{headers:headers});	
	}

	updateDoctorUserAuth(userAuthentication:UserAuthentication) : Observable<any>{
		let params = JSON.stringify(userAuthentication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'updateDoctorUserAuth',params,{headers:headers});		
	}
}
