import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrombsComponent } from './breadcrombs/breadcrombs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from "src/app/app-routing.module";



@NgModule({
  declarations: [
    BreadcrombsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  exports: [
    BreadcrombsComponent,
    SidebarComponent,
    HeaderComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule,

]
})
export class SharedModule { }
