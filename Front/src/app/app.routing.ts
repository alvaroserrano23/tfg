import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { ErrorComponent } from './components/error/error.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DoctorsComponent } from './components/doctors/doctors.component';

//Rutas
const appRoutes : Routes = [
	{path: '', component : BuscadorComponent},
	{path: 'medicos', component : DoctorsComponent},
	{path: 'sobre-nosotros', component : AboutComponent},
	{path: 'register-login', component : RegisterLoginComponent},
	{path: 'contacto' , component : ContactComponent },
	{path: '**' , component : ErrorComponent}

];

//Exportar la configuracion de las rutas
export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);