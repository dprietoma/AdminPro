import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics-1/graphics-1.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    MainComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
