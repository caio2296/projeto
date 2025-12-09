/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-select',
  standalone: false,
  templateUrl: './filter-select.html',
  styleUrl: './filter-select.scss'
})
export class FilterSelect {
  @Input() ctrl!: FilterCat;
  // @Input() lineId?: number; // equivale ao data.IdLine

  @Output() changed = new EventEmitter<{ id: number, name: string, value: any }>();

  onChange(event: any) {
    this.changed.emit({
      id: this.ctrl.id,
      name: this.ctrl.name,
      value: event.target.value
    });
  }

  trackByIndex(i: number) {
    return i;
  }
}
