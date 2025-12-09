import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filtros } from '../filtros';
import { FilterImage } from '../Componentes/filter-image/filter-image';
import { TranslocoModule } from '@jsverse/transloco';
import { FilterButtonset } from '../Componentes/filter-buttonset/filter-buttonset/filter-buttonset';
import { FilterSelect } from '../Componentes/filter-select/filter-select/filter-select';
import { FilterMultiSelect } from '../Componentes/filter-multiSelect/filter-multi-select/filter-multi-select';
import { FilterCheck } from '../Componentes/filter-check/filter-check/filter-check';
import { FilterButton } from '../Componentes/filter-button/filter-button/filter-button';
import { FilterSeparator } from '../Componentes/filter-separator/filter-separator/filter-separator';



@NgModule({
  declarations: [
    Filtros,
    FilterImage,
    FilterButtonset,
    FilterSelect,
    FilterMultiSelect,
    FilterCheck,
    FilterButton,
    FilterSeparator
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports:[
    Filtros,
    FilterImage,
    FilterButtonset,
    FilterSelect,
    FilterMultiSelect,
    FilterCheck,
    FilterButton,
    FilterSeparator
  ]
})
export class FiltroModule { }
