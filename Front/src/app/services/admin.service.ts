import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

  getAdmins(){
		return this._http.get<any>(this.url+'/admins');
	}

	getAdmin(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'admin/'+id,{headers:headers});
	}

	updateAdmin(admin:Admin) :Observable<any>{
		let params = JSON.stringify(admin);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'admin/'+admin.id,params,{headers:headers});	
	}

	saveAdmin(admin: Admin) :Observable<any>{
		let params = JSON.stringify(admin);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-admin',params,{headers:headers});
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
