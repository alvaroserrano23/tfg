import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Historial } from 'src/app/models/historial';
import { HistorialService } from 'src/app/services/historial.service';
import { AlertService } from 'src/app/services/alert.service';
import { Global } from '../../services/global';
import { FormBuilder, FormGroup, Validators ,FormControl, SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-detail-historial',
  templateUrl: './detail-historial.component.html',
  styleUrls: ['./detail-historial.component.css']
})
export class DetailHistorialComponent implements OnInit {

  form: FormGroup;
  public url: string;
  public historial: Historial;
  public historialModificado: Historial;
  loading = false;
  submitted = false;
  returnUrl: string;
  id:string;

  constructor(
    private historialService: HistorialService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.getHistorial(this.id);
    })

    this.form = new FormGroup({
      edad_paciente: new FormControl(''),
      dni_paciente: new FormControl('',Validators.pattern("^[0-9]{8,8}[A-Za-z]$")),
      fecha_nacimiento_paciente : new FormControl(''),
      patologias_paciente: new FormControl(),
      alergias_paciente: new FormControl (),
      vacunas_paciente: new FormControl (),
      tratamientos: new FormControl ()
    });

  }

  get f() { return this.form.controls; }

  getHistorial(id){
    this.historialService.getHistorial(id).subscribe(
      response =>{
        this.historial = response.historial;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.historialModificado = this.form.value;
    this.historialModificado.name = this.historial.name;
    this.historialModificado.surname = this.historial.surname;
    this.historialModificado.id = this.id;
      this.historialService.updateHistorial(this.historialModificado).subscribe(
        res => {
          console.log(res);
          this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
          },
        error =>{
          this.alertService.error(error.error.message);
          console.log(error);
          this.loading = false;
          }
      );
    
    }
}
