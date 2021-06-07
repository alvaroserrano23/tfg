import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/userAuthentication.service';

@Component({
selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor(public userAuthenticationService: UserAuthenticationService) { }

  ngOnInit(): void {
  }

}
