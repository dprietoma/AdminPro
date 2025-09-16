import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    ResgisterComponent,
    MainComponent,
  ],
  exports: [
    LoginComponent,
    ResgisterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class AuthModule { }
