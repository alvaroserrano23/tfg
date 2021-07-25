import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.formA = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required]
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
        this.userAuth.user = this.admin.user;
        this.userAuth.password = this.admin.password;
        this.userAuth.email = this.admin.email;
        this.userAuth.role = "admin";
        this.userAuthenticationService.saveUserAuthentication(this.userAuth).subscribe();
        this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });
        },
      error =>{
        this.alertService.error(error.error.message);
        this.loading = false;
        }
    );
    
  }
}
