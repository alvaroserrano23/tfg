import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models/patient';
import { Global } from './global'; 

@Injectable()
export class PatientService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}

	savePatient(patient: Patient): Observable<any>{
		let params = JSON.stringify(patient);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-patient',params,{headers:headers});
	}

	getPatientByUsername(user) :Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'patient/user/'+user,{headers: headers});
	}
}