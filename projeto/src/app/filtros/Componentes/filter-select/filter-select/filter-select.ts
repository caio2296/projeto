/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-select',
  standalone: false,
  templateUrl: './filter-select.html',
  styleUrl: './filter-select.scss'
})
export class FilterSelect implements  OnChanges {

  @Input() ctrl!: FilterCat;
  // @Input() lineId?: number; // equivale ao data.IdLine

   valorPadrao!:string| '';

  @Output() changed = new EventEmitter<{ id: number, name: string, value: any }>();

  // ngOnInit(): void {

  // const defaultItem = this.ctrl.selectItems?.find(i => i.defaultselected===true);

  // if (defaultItem) {
  //   console.log(this.ctrl.selectItems?.find(i => i.defaultselected===true));
  //   this.valorPadrao = defaultItem.value;
     
  // }

  // console.log("AAAAH",this.valorPadrao); 

  // }

    ngOnChanges(): void {
    if (this.ctrl?.selectItems?.length) {
      const defaultItem = this.ctrl.selectItems.find(i => i.defaultselected);
      if (defaultItem) {
        this.valorPadrao = defaultItem.value;
      }
    }
  }

  onChange(event: any) {

      const rawValue = event.target.value;

      const valueFinal = rawValue.includes(':')
        ? rawValue.split(':').slice(1).join(':').trim()
        : rawValue;
    this.changed.emit({
      id: this.ctrl.id,
      name: this.ctrl.name,
      value: valueFinal
    });

  }

  trackByIndex(i: number) {
    return i;
  }
}
