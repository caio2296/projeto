import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filtros } from '../filtros';
import { FilterImage } from '../Componentes/filter-image/filter-image';
import { TranslocoModule } from '@jsverse/transloco';



@NgModule({
  declarations: [
    Filtros,
    FilterImage
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports:[
    Filtros,
    FilterImage
  ]
})
export class FiltroModule { }
