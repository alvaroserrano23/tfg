import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserAuthGuard } from './user-auth.guard';
import { UserAuthenticationService } from './services/userAuthentication.service';
import { DoctorService } from './services/doctor.service';
import { MailService } from './services/mail.service';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { DetailComponent } from './components/detail/detail.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DatosComponent } from './components/datos/datos.component';
import { CitasComponent } from './components/citas/citas.component';
import { PedirCitaComponent } from './components/pedir-cita/pedir-cita.component';
import { HistorialComponent } from './components/historial/historial.component';
import { DarOpinionComponent } from './components/dar-opinion/dar-opinion.component';
import { OpinarComponent } from './components/opinar/opinar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    ErrorComponent,
    BuscadorComponent,
    DoctorsComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    DetailComponent,
    NavegacionComponent,
    PerfilComponent,
    DatosComponent,
    CitasComponent,
    PedirCitaComponent,
    HistorialComponent,
    DarOpinionComponent,
    OpinarComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders,
    UserAuthGuard,
    UserAuthenticationService,
    DoctorService,
    MailService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
