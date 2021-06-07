import { Component } from '@angular/core';
import { UserAuthenticationService } from './services/userAuthentication.service';
import { UserAuthentication } from './models/userAuthentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'find your doctor';
  public userLogged : UserAuthentication;
  public isLogged : boolean;

  constructor(public userAuthenticationService: UserAuthenticationService) {
    this.userLogged = this.userAuthenticationService.userValue;
  }
  
}
