import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetailComponent } from './components/detail/detail.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DatosComponent } from './components/datos/datos.component';
import { CitasComponent } from './components/citas/citas.component';
import { PedirCitaComponent } from './components/pedir-cita/pedir-cita.component';

//Rutas
const appRoutes : Routes = [
	{path: '', component : BuscadorComponent},
	{path: 'medicos', component : DoctorsComponent},
	{path: 'sobre-nosotros', component : AboutComponent},
	{path: 'register', component : RegisterComponent},
	{path: 'login', component : LoginComponent},
	{path: 'contacto' , component : ContactComponent },
	{path: 'doctor/:id',component: DetailComponent},
	{path: 'perfil-patient/:id',component: PerfilComponent},
	{path: 'perfil-doctor/:id', component: PerfilComponent},
	{path: 'datos-patient/:id', component: DatosComponent},
	{path: 'datos-doctor/:id', component: DatosComponent},
	{path: 'citas-patient/:id', component: CitasComponent},
	{path: 'citas-doctor/:id',component: CitasComponent},
	{path: 'pedir-cita/:id',component: PedirCitaComponent},
	{path: '**' , component : ErrorComponent}

];

//Exportar la configuracion de las rutas
export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);