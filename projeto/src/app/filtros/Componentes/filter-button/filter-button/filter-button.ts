/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterCat, FilterData } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-button',
  standalone: false,
  templateUrl: './filter-button.html',
  styleUrl: './filter-button.scss'
})
export class FilterButton {
  @Input() ctrl!: FilterCat;
  // @Input() data!: FilterData;

  // Para acionar ação para o componente pai
  @Output() buttonAction = new EventEmitter<any>();

  onClick() {
    // CASO 1: ctrl.value é null ou "-"
    if (this.ctrl.value == null || this.ctrl.value === '-') {
      // Apenas executa a action como string
      this.buttonAction.emit(this.ctrl.action);
    }

    // CASO 2: ctrl.value existe e não é "-"
    else {
      // Emite um objeto com os dados para o pai tratar
      this.buttonAction.emit({
        type: 'changeStatusBtn',
        action: this.ctrl.action,
        // redirectTo: this.data.redirectTo,
        // aux: this.data.aux
      });
    }
  }
}
