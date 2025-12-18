/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-multi-select',
  standalone: false,
  templateUrl: './filter-multi-select.html',
  styleUrl: './filter-multi-select.scss'
})
export class FilterMultiSelect implements OnChanges {
@Input() ctrl!: FilterCat;
@Output() changeStatus = new EventEmitter<void>();


     // 🔥 array, não string
  valorPadrao: string[] = [];


  ngOnChanges(): void {
    if (this.ctrl?.selectItems?.length) {
       // 🔥 pega TODOS os defaultselected
      this.valorPadrao = this.ctrl.selectItems
        .filter(i => i.defaultselected)
        .map(i => i.value);
      console.log('Selecionados:', this.valorPadrao);
    }
  }

get filteredItems(): any[] {
 return this.ctrl.selectItems.filter(i => i.value !== '-');
}


onChange() {
this.changeStatus.emit();
}
}
