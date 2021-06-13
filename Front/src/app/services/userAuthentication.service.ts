import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserAuthentication } from '../models/userAuthentication';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor'
import { Global } from './global'; 
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserAuthenticationService{
	public url:string;
	private userSubjectD: BehaviorSubject<Doctor>;
	public userD: Observable<Doctor>;
	private userSubjectP: BehaviorSubject<Patient>;
	public userP: Observable<Patient>;

	constructor(
		private _http: HttpClient,
		private router: Router
	){
		this.url = Global.url;
		this.userSubjectD = new BehaviorSubject<Doctor>(JSON.parse(localStorage.getItem('doctor')));
        this.userD = this.userSubjectD.asObservable();
		this.userSubjectP = new BehaviorSubject<Patient>(JSON.parse(localStorage.getItem('patient')));
        this.userP = this.userSubjectP.asObservable();
	}

	public get userValueD(): Doctor {
        return this.userSubjectD.value;
    }

	public get userValueP(): Patient {
		return this.userSubjectP.value;
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
				if(user.patient){
					localStorage.setItem('patient',JSON.stringify(user.patient));
					localStorage.setItem('token',user.patient.token);	
					this.userSubjectP.next(user.patient);
				}else if(user.doctor){
					localStorage.setItem('doctor',JSON.stringify(user.doctor));
					localStorage.setItem('token',user.doctor.token);
					this.userSubjectD.next(user.doctor);
				}
				
				return user;
			}));
	}

	loggedIn() {
		//Si el token existe me devuelve un true si no me devuelve un false
		if(localStorage.getItem('patient') && localStorage.getItem('token')){
			return "patientLogged";
		}else if(localStorage.getItem('doctor') && localStorage.getItem('token')){
			return "doctorLogged";
		}else{
			return "";
		}
		
		
	}
	
	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('doctor');
		localStorage.removeItem('patient');
		this.router.navigate(['']);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	generateCode(mail){
		return this._http.post<any>(this.url+'generate-code',mail);
	}


}