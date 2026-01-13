/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterRenderEffect, Component, computed, EventEmitter, Input, OnChanges, Output, signal, viewChild, viewChildren } from '@angular/core';
import { FilterCat, SelectItems } from '../../../../calendario/Models/type';
import { Combobox } from './TypeMultiSelect/combobox.directive';
import { Listbox } from './TypeMultiSelect/listbox.directive';
import { Options } from './TypeMultiSelect/option.directive';



@Component({
  selector: 'app-filter-multi-select',
  standalone: false,
  templateUrl: './filter-multi-select.html',
  styleUrl: './filter-multi-select.scss'
})
export class FilterMultiSelect implements OnChanges {

  @Input() ctrl!: FilterCat;
//  @Output() changeStatus = new EventEmitter<void>();

   @Output() changeSelection = new EventEmitter<SelectItems[]>();

  valorPadrao: SelectItems[] = [];

  listbox = viewChild<Listbox<string>>(Listbox);
  options = viewChildren<Options<string>>(Options);
  combobox = viewChild<Combobox<string>>(Combobox);

   selectedValues = signal<SelectItems[]>([]);

  ngOnChanges(): void {
    if (this.ctrl?.selectItems?.length) {
      const defaults = this.ctrl.selectItems
        .filter(i => i.defaultselected);

      this.valorPadrao = defaults;

      queueMicrotask(() => {
       this.selectedValues.set(defaults);
      });
    }
  }




onValuesChange(values: SelectItems[]) {
  this.selectedValues.set(values);

  // 🔥 notifica o pai
  this.changeSelection.emit(values);
}


  get filteredItems(): any[] {
   
 return this.ctrl.selectItems.filter(i => i.value !== '-');
}

  displayIcon = computed(() => {
    const values = this.listbox()?.values() || [];
    return this.labels.find(l => l.value === values[0])?.icon ?? '';
  });

  displayValue = computed(() => {
    console.log( this.listbox()?.values());
    const values =  this.selectedValues() || [];
    if (values.length === 0) return 'Select a label';
    if (values.length === 1) return values[0].displaytext;
    return `${values[0].displaytext} + ${values.length - 1} more`;
  });

  labels = [
    {value: 'Important', icon: 'label'},
    {value: 'Starred', icon: 'star'},
    {value: 'Work', icon: 'work'},
    {value: 'Personal', icon: 'person'},
    {value: 'To Do', icon: 'checklist'},
    {value: 'Later', icon: 'schedule'},
    {value: 'Read', icon: 'menu_book'},
    {value: 'Travel', icon: 'flight'},
  ];

  constructor() {
    afterRenderEffect(() => {
      const option = this.options()?.find(opt => opt.active?.());
      option?.element.nativeElement.scrollIntoView({ block: 'nearest' });
    });

    afterRenderEffect(() => {

       console.log('Selecionados:', this.selectedValues());
      if (!this.combobox()?.expanded?.()) {
        this.listbox()?.element.nativeElement.scrollTo(0, 0);
      }
    });
  }
}