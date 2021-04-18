import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title:string;
  public email:string;

  constructor() {
  	this.title = "Find Your Doctor";
  	this.email = "serviciocorreotfg@gmail.com"
  }

  ngOnInit() {
  }

}
