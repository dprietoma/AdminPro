
// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { ResgisterComponent } from './resgister/resgister.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';


const routes: Routes = [
   {
      path: 'auth',
      component: MainComponent,
      children: [
        { path: '', component: NopagefoundComponent },
        { path: 'register', component: ResgisterComponent },
        { path: 'login', component: LoginComponent },
      ]
    },
  
  

]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
