import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Opinion } from 'src/app/models/opinion';
import { DoctorService } from 'src/app/services/doctor.service';
import { OpinionService } from 'src/app/services/opinion.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DoctorService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public doctor: Doctor;
  public opinions: Opinion[];
  public confirm: boolean;
  public userLogged: boolean;

  constructor(
    private doctorService: DoctorService,
    private opinionService: OpinionService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.url = Global.url;
    this.confirm = false;
    this.userLogged = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let id = params.id;
      this.getDoctor(id);
      if(localStorage.getItem('token')){
        this.userLogged = true;
      }
      this.getOpinionsByIdDoctor(id);
    })
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

  getOpinionsByIdDoctor(id){
    this.opinionService.getOpinionsByIdDoctor(id).subscribe(
      response=>{
        this.opinions = response.opinions;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
