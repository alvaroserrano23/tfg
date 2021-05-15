import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MailService]
})
export class ContactComponent implements OnInit {

	public title: string;
  public mail: Mail;

  constructor(
    private mailService : MailService
  ) {

  	this.title = "Contacta con nosotros";
    this.mail = new Mail('','','','','');
   }

  ngOnInit() {
  }

  onSubmitSendEmail(){
    console.log(this.mail);
    this.mail.to = "serviciocorreotfg@gmail.com";
    
    this.mailService.sendEmail(this.mail).subscribe(
      res => {
        console.log(res);
        },
      error =>{
        console.log(<any>error);
        }
    );
  }
}
