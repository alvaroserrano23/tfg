import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

  	getCitas(){
		return this._http.get<any>(this.url+'/citas');
	}

	getCitasByIdPatient(id){
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get<any>(this.url+'citas-paciente/'+id,{headers:headers});
	}

	getCitasByIdDoctor(id){
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get<any>(this.url+'citas-doctor/'+id,{headers:headers});
	}

	getCita(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'cita/'+id,{headers:headers});
	}

	updateDoctor(cita:Cita) :Observable<any>{
		let params = JSON.stringify(cita);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'doctor/'+cita.id,params,{headers:headers});	
	}

	saveCita(cita: Cita) :Observable<any>{
		let params = JSON.stringify(cita);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-cita',params,{headers:headers});
	}

	updateCita(cita:Cita): Observable<any>{
		let params = JSON.stringify(cita);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'cita/'+cita.id,params,{headers:headers});		
	}
}
