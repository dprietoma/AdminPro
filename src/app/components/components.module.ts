import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GrafiDonaComponent } from './grafi-dona/grafi-dona.component';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    IncrementadorComponent,
    GrafiDonaComponent
  ],
  exports: [
    IncrementadorComponent,
    GrafiDonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
