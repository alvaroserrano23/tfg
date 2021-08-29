import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { FormBuilder, FormGroup, Validators ,FormControl, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Historial } from 'src/app/models/historial';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  form: FormGroup;
  public patient:Patient;
  public doctor: Doctor;
  public historial: Historial;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private alertService: AlertService,
    private historialService: HistorialService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.patient = new Patient('','','','','','','','','','','',0,'','');
    }

  ngOnInit(): void {
    var doctorId = JSON.parse(localStorage.getItem('doctor'));
    this.doctor = doctorId;
    this.doctor.id = doctorId._id;
     
      
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      edad_paciente: new FormControl('',Validators.required),
      dni_paciente: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{8,8}[A-Za-z]$")]),
      fecha_nacimiento_paciente : new FormControl('',Validators.required),
      patologias_paciente: new FormControl(),
      alergias_paciente: new FormControl (),
      vacunas_paciente: new FormControl (),
      tratamientos: new FormControl (),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });

    //JQUERY
    $("#nuevo_historial").hide();
    $("#botonera").show();

    //Boton Añadir Historial
    $("#add_historial").click(function(e){
      $("#nuevo_historial").show();
      $("#botonera").hide(500);
    });

  }
  get f() { return this.form.controls; }

  async onSubmitReg(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.historial = this.form.value;
    this.patient.name = this.form.value.name;
    this.patient.surname = this.form.value.surname;
      this.historial.email_paciente = this.form.value.email;
      this.historial.id_doctor = this.doctor.id;
      this.historialService.saveHistorial(this.historial).subscribe(
        res => {
          console.log(res);
          this.alertService.success('Se ha registrado correctamente.', { keepAfterRouteChange: true });
          this.router.navigate(['/ver-historial/'+this.doctor.id]);
          },
        error =>{
          window.scrollTo(0,-10000);
          this.alertService.error(error.error.message);
          console.log(error);
          this.loading = false;
          }
      );
    
  }

}
