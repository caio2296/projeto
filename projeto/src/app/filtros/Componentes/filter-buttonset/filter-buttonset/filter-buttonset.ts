/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FilterCat } from '../../../../calendario/Models/type';

@Component({
  selector: 'app-filter-buttonset',
  standalone: false,
  templateUrl: './filter-buttonset.html',
  styleUrl: './filter-buttonset.scss'
})
export class FilterButtonset implements OnInit {

  @Input() ctrl!: FilterCat;

  @Output() changeSelection = new EventEmitter<any>();


  selectedValue: string | null = null;

  ngOnInit() {
    const checked = this.ctrl?.radioitems?.find(i => i.statuscheck);
    this.selectedValue = checked?.value ?? null;
  }

  // onChange(ctrlId: any, caption: any, event: any) {
  //   console.log('Radio mudou!');
  //   console.log('Novo valor:', event.value);

  //   // comportamento idêntico ao radio HTML padrão
  // }

  onChange() {
    // this.changeSelection.emit({
    //   id: id,
    //   caption: caption
    // });

    // sincroniza o array com o valor selecionado
  this.ctrl.radioitems?.forEach(item => {
    item.statuscheck = item.value === this.selectedValue;
  });

  const selected = this.ctrl.radioitems?.find(i => i.statuscheck);

  this.changeSelection.emit({
    typectrl: this.ctrl.typectrl,
    action: this.ctrl.action,
    value: this.selectedValue,
    caption: selected?.caption ?? null
  });
  }
}
