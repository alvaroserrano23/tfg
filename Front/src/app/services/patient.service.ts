import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs/Observable';
import { UserAuthentication } from '../models/userAuthentication';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

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

	getPatient(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'patient/'+id,{headers:headers});
	}

	updatePatient(patient:Patient) :Observable<any>{
		let params = JSON.stringify(patient);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'patient/'+patient.id,params,{headers:headers});	
	}

	updatePatientUserAuth(userAuthentication:UserAuthentication) : Observable<any>{
		let params = JSON.stringify(userAuthentication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'updatePatientUserAuth',params,{headers:headers});		
	}

	uploadImage(patient:Patient){
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'upload-image/'+patient.id,patient,{headers:headers});	
	}
}
