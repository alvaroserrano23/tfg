import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { MailService } from 'src/app/services/mail.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MailService]
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
	public title: string;
  public mail: Mail;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mailService : MailService,
    private alertService : AlertService
  ) {

  	this.title = "Contacta con nosotros";
    this.mail = new Mail('','','','','','','');
   }

  ngOnInit() {
    this.mail.subject
    this.form = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      subject: new FormControl('',Validators.required),
      message: new FormControl('',Validators.required)
      });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  onSubmitSendEmail(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    
    this.loading = true;
    this.mail.to = "serviciocorreotfg@gmail.com";
    this.mail.type = "contacto";
    this.mail.from = this.form.value.email;
    this.mail.subject = this.form.value.subject;
    this.mail.message = this.form.value.message;
    
    this.mailService.sendEmail(this.mail).subscribe(
      res => {
        console.log(res);
        this.alertService.success('Tu correo se ha enviado correctamente.', { keepAfterRouteChange: true });
        this.router.navigate(['/'], { relativeTo: this.route });
                    
      },
      error =>{
        window.scrollTo(0,-10000);
        this.alertService.error(error.error.message);
        this.loading = false;
        }
    );
  }
}
