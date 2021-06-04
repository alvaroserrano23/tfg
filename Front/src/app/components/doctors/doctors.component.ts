import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Global } from '../../services/global';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  public doctors: Doctor[];
  public url: string;

  constructor(
    public doctorService: DoctorService) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(){
  	this.doctorService.getDoctors().subscribe(
  		response => {
  			if(response.doctors){
  				this.doctors = response.doctors;
          console.log(this.doctors);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }
}
