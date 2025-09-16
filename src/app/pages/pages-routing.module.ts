import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics-1/graphics-1.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'graphi1', component: Graphics1Component },
      { path: 'progress', component: ProgressComponent }
    ]
  },

]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
