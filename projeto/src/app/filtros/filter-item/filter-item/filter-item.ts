/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, input, Input } from '@angular/core';
import { FilterCat, FilterData } from '../../../calendario/Models/type';

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

    executarAcao(valor: any) {
    console.log(valor);
    throw new Error(`Function ${valor} not implemented.`);
  }

}
