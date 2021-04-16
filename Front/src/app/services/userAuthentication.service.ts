import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthentication } from '../models/userAuthentication';
import { Global } from './global'; 

@Injectable()
export class UserAuthenticationService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}

	saveUserAuthentication(userAuthentication: UserAuthentication) :Observable<any>{
		let params = JSON.stringify(userAuthentication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-userAuth',params,{headers:headers});
	}

	getUserAuthenticationByUsername(user) :Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'userAuth/user/'+user,{headers: headers});
	}
}