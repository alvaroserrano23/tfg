import { Component } from '@angular/core';
import { UserAuthenticationService } from './services/userAuthentication.service';

import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'find your doctor';
  constructor(public userAuthenticationService: UserAuthenticationService) {
    //userAuthenticationService.getUser();
  }
}
