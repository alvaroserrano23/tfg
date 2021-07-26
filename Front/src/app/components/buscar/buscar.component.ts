import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Global } from '../../services/global';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(public doctorService: DoctorService) { }
  filterPost = '';
  filterDoctor = '';
  doctors = [];
  posts = [
    {
      "id": 1,
      "title": "Post One",
      "date": "02/04/2019"
    },
    {
      "id": 2,
      "title": "Post Two",
      "date": "11/04/2019"
    },
    {
      "id": 3,
      "title": "Post Three",
      "date": "30/01/2019"
    },
    {
      "id": 4,
      "title": "Post Four",
      "date": "30/05/2019"
    },
    {
      "id": 5,
      "title": "Post Five",
      "date": "30/04/2019"
    }
  ];
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
