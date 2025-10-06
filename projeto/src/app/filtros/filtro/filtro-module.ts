import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filtros } from '../filtros';



@NgModule({
  declarations: [
    Filtros
  ],
  imports: [
    CommonModule
  ],
  exports:[
    Filtros
  ]
})
export class FiltroModule { }
