import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title:string;
  public subtitle: string;
  public email:string;

  constructor() {
  	this.title = "Find Your Doctor";
  	this.subtitle = "Aplicación web para la búsqueda de profesionales en el ámbito sanitario";
  	this.email = "serviciocorreotfg@gmail.com"
  }

  ngOnInit() {
  }

}
