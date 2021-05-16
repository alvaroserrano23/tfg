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
import {UserAuthGuard} from './user-auth.guard';
import {UserAuthenticationService} from './services/userAuthentication.service';
import {DoctorService} from './services/doctor.service';
import {MailService} from './services/mail.service';
import { AlertComponent } from './components/alert/alert.component';

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
    AlertComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
