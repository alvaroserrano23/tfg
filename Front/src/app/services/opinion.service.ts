import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Opinion } from '../models/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

  	saveOpinion(opinion: Opinion) :Observable<any>{
		let params = JSON.stringify(opinion);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-opinion',params,{headers:headers});
	}

	getOpinionsByIdDoctor(id){
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get<any>(this.url+'opinions-doctor/'+id,{headers:headers});
	}
}
