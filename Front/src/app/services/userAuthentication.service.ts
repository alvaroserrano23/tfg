import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserAuthentication } from '../models/userAuthentication';
import { Admin } from '../models/admin';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor'
import { Global } from './global'; 
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { param } from 'jquery';

@Injectable()
export class UserAuthenticationService{
	public url:string;
	private userSubjectD: BehaviorSubject<Doctor>;
	public userD: Observable<Doctor>;
	private userSubjectP: BehaviorSubject<Patient>;
	public userP: Observable<Patient>;
	private userSubjectA: BehaviorSubject<Admin>;
	public userA: Observable<Admin>;

	constructor(
		private _http: HttpClient,
		private router: Router
	){
		this.url = Global.url;
		this.userSubjectD = new BehaviorSubject<Doctor>(JSON.parse(localStorage.getItem('doctor')));
        this.userD = this.userSubjectD.asObservable();
		this.userSubjectP = new BehaviorSubject<Patient>(JSON.parse(localStorage.getItem('patient')));
        this.userP = this.userSubjectP.asObservable();
		this.userSubjectA = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')));
        this.userA = this.userSubjectA.asObservable();
	}

	public get userValueD(): Doctor {
        return this.userSubjectD.value;
    }

	public get userValueP(): Patient {
		return this.userSubjectP.value;
	}

	public get userValueA(): Admin {
		return this.userSubjectA.value;
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
					user.patient.password = "";
					localStorage.setItem('patient',JSON.stringify(user.patient));
					localStorage.setItem('token',user.patient.token);	
					this.userSubjectP.next(user.patient);
				}else if(user.doctor){
					user.doctor.password="";
					localStorage.setItem('doctor',JSON.stringify(user.doctor));
					localStorage.setItem('token',user.doctor.token);
					this.userSubjectD.next(user.doctor);
				}else if(user.admin){
					user.admin.password = "";
					localStorage.setItem('admin',JSON.stringify(user.admin));
					localStorage.setItem('token',user.admin.token);
					this.userSubjectA.next(user.admin);
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
		}else if(localStorage.getItem('admin') && localStorage.getItem('token')){
			return "adminLogged";
		}else{
			return "";
		}
		
		
	}
	
	logout() {
		localStorage.removeItem('token');
		if(localStorage.getItem('doctor') != null){
			localStorage.removeItem('doctor');
		}else if(localStorage.getItem('patient')){
			localStorage.removeItem('patient');
		}else if(localStorage.getItem('admin')){
			localStorage.removeItem('admin');
			localStorage.removeItem('repetido');
		}
		this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
	}

	getToken() {
		return localStorage.getItem('token');
	}

	validarCode(userAuthentication:UserAuthentication):Observable<any>{
		let params = JSON.stringify(userAuthentication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'userAuth-code',params,{headers: headers});
	}

	updateUser(userAuth:UserAuthentication) :Observable<any>{
		let params = JSON.stringify(userAuth);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'userAuth/'+userAuth.id,params,{headers:headers});	
	}
	updateUserAuth(userAuthentication:UserAuthentication) :Observable<any>{
		let params = JSON.stringify(userAuthentication);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'updateUserAuth',params,{headers:headers});	
	}

	deleteUserAuth(id){
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.delete(this.url+'userAuth/'+id,{headers:headers});
	}

}