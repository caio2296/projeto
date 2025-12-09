/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-buttonset',
  standalone: false,
  templateUrl: './filter-buttonset.html',
  styleUrl: './filter-buttonset.scss'
})
export class FilterButtonset {

   @Input() ctrl: any;

  @Output() changeSelection = new EventEmitter<{ id: number, caption: string }>();

  onChange(id: number, caption: string) {
    this.changeSelection.emit({
      id: id,
      caption: caption
    });
  }
}
