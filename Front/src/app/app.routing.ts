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
import { HistorialComponent } from './components/historial/historial.component';
import { DarOpinionComponent } from './components/dar-opinion/dar-opinion.component';
import { OpinarComponent } from './components/opinar/opinar.component';
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';
import { VerHistorialComponent } from './components/ver-historial/ver-historial.component';
import { DetailHistorialComponent } from './components/detail-historial/detail-historial.component';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { AdminModificarComponent } from './components/admin-modificar/admin-modificar.component';
import { CrearAdminComponent } from './components/crear-admin/crear-admin.component';

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
	{path: 'perfil-admin/:id', component: PerfilComponent},
	{path: 'datos-patient/:id', component: DatosComponent},
	{path: 'datos-doctor/:id', component: DatosComponent},
	{path: 'datos-admin/:id' , component: DatosComponent},
	{path: 'citas-patient/:id', component: CitasComponent},
	{path: 'citas-doctor/:id',component: CitasComponent},
	{path: 'pedir-cita/:id',component: PedirCitaComponent},
	{path: 'historials-doctor/:id',component: HistorialComponent},
	{path: 'dar-opinion',component: DarOpinionComponent},
	{path: 'opinar/:id',component: OpinarComponent},
	{path: 'valoraciones/:id',component:ValoracionesComponent},
	{path: 'ver-historial/:id',component:VerHistorialComponent},
	{path: 'detail-historial/:id',component:DetailHistorialComponent},
	{path: 'administrar',component:AdministrarComponent},
	{path: 'admin-modificar-patient/:id',component:AdminModificarComponent},
	{path: 'admin-modificar-doctor/:id',component:AdminModificarComponent},
	{path: 'admin-modificar-cita/:id',component:AdminModificarComponent},
	{path: 'admin-modificar-opinion/:id',component:AdminModificarComponent},
	{path: 'admin-modificar-historial/:id',component:AdminModificarComponent},
	{path: 'admin-modificar-admin/:id',component:AdminModificarComponent},
	{path: 'crear-admin',component:CrearAdminComponent},
	{path: '**' , component : ErrorComponent}

];

//Exportar la configuracion de las rutas
export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);