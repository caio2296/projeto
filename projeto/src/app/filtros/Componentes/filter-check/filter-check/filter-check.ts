/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';
import { FilterSelect } from '../../filter-select/filter-select/filter-select';

@Component({
  selector: 'app-filter-check',
  standalone: false,
  templateUrl: './filter-check.html',
  styleUrl: './filter-check.scss'
})
export class FilterCheck {
  @Input() ctrl!: FilterCat;
  @Output() changeSelection = new EventEmitter<any>();
  @Output() actionEvent = new EventEmitter<void>();


  handleChange() {
    if (this.ctrl.checkstatus) {

      this.changeSelection.emit({
        type: this.ctrl.typectrl,
        action: this.ctrl.action,
        // redirectTo: this.data.redirectTo,
        // aux: this.data.aux
      });
    }
  }


  handleClick(event: Event) {
    if (!this.ctrl.checkstatus && this.ctrl.action) {
      this.actionEvent.emit();
    }
  }
}
