/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, Input } from '@angular/core';
import { FilterCat, FilterData, RadioItem, SelectItems } from '../../../calendario/Models/type';

@Component({
  selector: 'app-filter-item',
  standalone: false,
  templateUrl: './filter-item.html',
  styleUrl: './filter-item.scss'
})
export class FilterItem {

  @Input() ctrl: FilterCat | null = null;
  @Input() ctrls: FilterCat | null = null;
  @Input() ctrlsId!: number;
  @Input() data!: FilterData;
  @Input() i!: number;
  @Input() controlsbyrow!:any;
  quatFilhos = 0;

  indAux = this.setIndAux() | 0;


  setIndAux(): number {

    if (this.indAux < 10) {
      this.indAux = this.indAux + 1;
    }
    return this.indAux;
  }

  //   executarAcao(valor: any) {
  //     console.log(typeof(valor));
  //   console.log(valor);
  //   throw new Error(`Function ${valor} not implemented.`);
  // }


  executarAcao(valor: unknown) {
  if (isFilterCat(valor)) {
    // aqui o TS SABE que é FilterCat
    console.log('FilterCat:', valor.id);
    return;
  }

   if (isSelectItemArray(valor)) {
    console.log('Evento de SelectItem[]');
    valor.forEach(item => {
      console.log(item.id_item, item.defaultselected);
    });
    return;
  }

  if (isRadioItems(valor)) {
    console.log('Evento de RadioItems:');
    valor.forEach(item=>{
      console.log(item.value,item.statuscheck);
    });
    return;
  }
 throw new Error(`Function ${valor} not implemented.`);
  console.warn('Tipo de evento desconhecido', valor);
}
}
function isFilterCat(v: unknown): v is FilterCat {
  return (
    typeof v === 'object' &&
    v !== null &&
    'id' in v &&
    'typectrl' in v
  );
}

function isSelectItemArray(v: unknown): v is SelectItems[] {
  return (
    Array.isArray(v) &&
    v.length > 0 &&
    typeof v[0] === 'object' &&
    v[0] !== null &&
    'id_item' in v[0] &&
    'id_filter' in v[0]
  );
}

function isRadioItems(v: unknown): v is RadioItem[] {
  return (
    Array.isArray(v) &&
    v.length > 0 &&
    typeof v[0] === 'object' &&
    v !== null &&
    'caption' in v &&
    'value' in v &&
    'statuscheck' in v
  );
}

