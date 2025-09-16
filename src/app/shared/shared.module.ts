import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrombsComponent } from './breadcrombs/breadcrombs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



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
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
