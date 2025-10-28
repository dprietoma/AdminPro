import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AuthMainComponent } from './main/auth-main.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    ResgisterComponent,
    AuthMainComponent,
  ],
  exports: [
    LoginComponent,
    ResgisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
