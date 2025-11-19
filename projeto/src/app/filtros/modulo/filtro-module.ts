import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filtros } from '../filtros';
import { FilterImage } from '../Componentes/filter-image/filter-image';



@NgModule({
  declarations: [
    Filtros,
    FilterImage
  ],
  imports: [
    CommonModule
  ],
  exports:[
    Filtros,
    FilterImage
  ]
})
export class FiltroModule { }
