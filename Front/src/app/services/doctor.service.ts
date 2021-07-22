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

	deleteDoctor(id){
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.delete(this.url+'doctor/'+id,{headers:headers});
	}

	uploadImage(doctor:Doctor){
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'upload-image/'+doctor.id,doctor,{headers:headers});	
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
			xhr.send(formData);
		});
	}
}
