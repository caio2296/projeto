/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-multi-select',
  standalone: false,
  templateUrl: './filter-multi-select.html',
  styleUrl: './filter-multi-select.scss'
})
export class FilterMultiSelect {
@Input() ctrl!: FilterCat;
@Output() changeStatus = new EventEmitter<void>();


get filteredItems(): any[] {
 return this.ctrl.selectitems.filter(i => i.value !== '-');
}


onChange() {
this.changeStatus.emit();
}
}
