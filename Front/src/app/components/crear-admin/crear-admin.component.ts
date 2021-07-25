import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';
import { UserAuthentication } from 'src/app/models/userAuthentication';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.css']
})
export class CrearAdminComponent implements OnInit {

  public url: string;
  public admin: Admin;
  public userAuth: UserAuthentication;
  formA: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;
  

  constructor(
    private adminService: AdminService,
    private userAuthenticationService: UserAuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {

    localStorage.removeItem('nuevo-admin');
    this.formA = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      user: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
      
  }

  get fA() { return this.formA.controls; }

  volver(rol){
    localStorage.setItem('admin-'+rol,'admin-'+rol);
    localStorage.setItem('repetido','repetido');
    this.router.navigate(['administrar']);
  }

  onSubmitA(){
    

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formA.invalid) {
        return;
    }
    this.admin = this.formA.value;
    this.adminService.saveAdmin(this.admin).subscribe(
      res => {
        console.log(res);
        this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['']);
        },
      error =>{
        this.alertService.error(error.error.message);
        this.loading = false;
        }
    );
    
  }
}
