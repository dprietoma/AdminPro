import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { authGuard, authLoadGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [authGuard],
    canLoad: [authLoadGuard],
    loadChildren: () => import('../pages/child-routes.module').then( m => m.ChildRoutesModule)
  },

]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
