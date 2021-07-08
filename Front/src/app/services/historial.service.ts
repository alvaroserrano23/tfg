import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

  	getHistorials(){
		return this._http.get<any>(this.url+'/historials');
	}

	getHistorial(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'historial/'+id,{headers:headers});
	}

	getHistorialsByIdDoctor(id){
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get<any>(this.url+'historials-doctor/'+id,{headers:headers});
	}

	updateHistorial(historial:Historial) :Observable<any>{
		let params = JSON.stringify(historial);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'historial/'+historial.id,params,{headers:headers});	
	}

	saveHistorial(historial: Historial) :Observable<any>{
		let params = JSON.stringify(historial);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-historial',params,{headers:headers});
	}

	deleteHistorial(id){
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.delete(this.url+'historial/'+id,{headers:headers});
	}
}
