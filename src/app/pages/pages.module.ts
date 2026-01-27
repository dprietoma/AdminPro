import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics-1/graphics-1.component';
import { MainComponent } from './main/main.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PromesasComponent } from './promesas/promesas.component';
import { HttpClientModule } from '@angular/common/http';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    MainComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    MainComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgChartsModule,
    PagesRoutingModule,
    HttpClientModule
  ]
})
export class PagesModule { }
