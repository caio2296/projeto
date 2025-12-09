/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-check',
  standalone: false,
  templateUrl: './filter-check.html',
  styleUrl: './filter-check.scss'
})
export class FilterCheck {
@Input() ctrl!: FilterCat;
@Output() changeSelection = new EventEmitter<void>();
@Output() actionEvent = new EventEmitter<void>();


handleChange() {
if (this.ctrl.checkstatus) {
this.changeSelection.emit();
}
}


handleClick(event: Event) {
if (!this.ctrl.checkstatus && this.ctrl.action) {
this.actionEvent.emit();
}
}
}
