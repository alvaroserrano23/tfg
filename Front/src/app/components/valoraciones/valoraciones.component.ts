import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Opinion } from 'src/app/models/opinion';
import { OpinionService } from 'src/app/services/opinion.service';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {
  public url: string;
  public opinionsDoctor: Opinion[];
  public doctor: Doctor;
  public id:String;

  constructor(
    private opinionService: OpinionService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
    ) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.getDoctor(this.id);
      this.getOpinionsByIdDoctor(this.id);
    })
  }

  getOpinionsByIdDoctor(id){
  	this.opinionService.getOpinionsByIdDoctor(id).subscribe(
  		response => {
  			if(response.opinions){
  				this.opinionsDoctor = response.opinions;
          console.log(this.opinionsDoctor);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  getDoctor(id){
    this.doctorService.getDoctor(id).subscribe(
      response =>{
        this.doctor = response.doctor;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
