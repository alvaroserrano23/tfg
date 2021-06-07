import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserAuthentication } from '../models/userAuthentication';
import { Global } from './global'; 
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserAuthenticationService{
	public url:string;
	private userSubject: BehaviorSubject<UserAuthentication>;
    public user: Observable<UserAuthentication>;

	constructor(
		private _http: HttpClient,
		private router: Router
	){
		this.url = Global.url;
		this.userSubject = new BehaviorSubject<UserAuthentication>(JSON.parse(localStorage.getItem('userAuthentication')));
        this.user = this.userSubject.asObservable();
	}

	public get userValue(): UserAuthentication {
        return this.userSubject.value;
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

	getUserAuthentication(){
		return localStorage.getItem('userAuthentication');	
	}

	loginAuth(userAuthentication) :Observable<any>{
		return this._http.post<any>(this.url+'login-auth', userAuthentication)
			.pipe(map(user=>{
				localStorage.setItem('userAuthentication',JSON.stringify(user));
				localStorage.setItem('token',userAuthentication.token);
				this.userSubject.next(user);
				return user;
			}));
	}

	loggedIn() {
		//Si el token existe me devuelve un true si no me devuelve un false
		return !!localStorage.getItem('token');
	}
	
	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('userAuthentication');
		this.router.navigate(['']);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	generateCode(mail){
		return this._http.post<any>(this.url+'generate-code',mail);
	}


}