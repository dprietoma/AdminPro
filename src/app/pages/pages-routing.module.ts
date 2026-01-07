import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics-1/graphics-1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MainComponent } from './main/main.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'graphics1', component: Graphics1Component, data: { title: 'Graphics 1' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'account', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      { path: 'promises', component: PromesasComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } }
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
