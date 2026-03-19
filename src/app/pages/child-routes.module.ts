import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics-1/graphics-1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'graphics1', component: Graphics1Component, data: { title: 'Graphics 1' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'account', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'promises', component: PromesasComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { title: 'Busquedas' } },
  // Mantenimientos
  { path: 'usuarios',canActivate: [adminGuard],  component: UsuariosComponent, data: { title: 'Mantenimiento dusuarios' } },
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de médicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimiento de médico' } },
]


@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
