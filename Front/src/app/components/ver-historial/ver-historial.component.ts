import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialService } from 'src/app/services/historial.service';
import { Historial } from 'src/app/models/historial';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-ver-historial',
  templateUrl: './ver-historial.component.html',
  styleUrls: ['./ver-historial.component.css']
})
export class VerHistorialComponent implements OnInit {

  public url: string;
  public historials: Historial[];
  public id:String;

  constructor(
    public historialService: HistorialService,
    public alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
    ) 
    {
    this.url = Global.url;
    }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.getHistorials(this.id);
    })

  }

  getHistorials(id){
    this.historialService.getHistorialsByIdDoctor(id).subscribe(
      response =>{
        this.historials = response.historials;
      },
      error => {
        console.log(error);
      }
    )
  }

  public deleteHistorial(id){
    this.historialService.deleteHistorial(id).subscribe(
      response=>{
        console.log(response);
        this.alertService.success("Se ha eliminado el historial correctamente.", { keepAfterRouteChange: true });
        this.router.navigate(['/ver-historial/'+this.id])
          .then(() => {
            window.location.reload();
          });
      },
      error=>{
        window.scrollTo(0,-10000);
        console.log(error);
        this.alertService.error(error.error.message);
      }
    )
  }
  
}
