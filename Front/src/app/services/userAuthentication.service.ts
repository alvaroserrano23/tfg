import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthentication } from '../models/userAuthentication';
import { Global } from './global'; 
import { Router } from '@angular/router';

@Injectable()
export class UserAuthenticationService{
	public url:string;

	constructor(
		private _http: HttpClient,
		private router: Router
	){
		this.url = Global.url;
	}

	testService(){
		return 'Prueba';
	}

	saveUserAuthentication(userAuthentication: UserAuthentication) :Observable<any>{
		let params = JSON.stringify(userAuthentication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post<any>(this.url+'save-userAuth',params,{headers:headers});
	}
	
	getUserAuthenticationB(user) :Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'userAuth/user/'+user,{headers: headers});
	}

	loginAuth(userAuthentication) :Observable<any>{
		return this._http.post<any>(this.url+'login-auth', userAuthentication);
	}

	loggedIn() {
		//Si el token existe me devuelve un true si no me devuelve un false
		return !!localStorage.getItem('token');
	}
	
	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['']);
	}

	getToken() {
		return localStorage.getItem('token');
	}

}