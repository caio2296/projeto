/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { afterRenderEffect, Component, computed, EventEmitter, Input, OnChanges, OnInit, Output, signal, viewChild, viewChildren } from '@angular/core';
import { FilterCat, SelectItems } from '../../../../calendario/Models/type';
import { Combobox } from '../../TypeMultiSelect/combobox.directive';
import { Listbox } from '../../TypeMultiSelect/listbox.directive';
import { Options } from '../../TypeMultiSelect/option.directive';

@Component({
  selector: 'app-filter-select',
  standalone: false,
  templateUrl: './filter-select.html',
  styleUrl: './filter-select.scss'
})
export class FilterSelect implements  OnChanges {

  // @Input() ctrl!: FilterCat;
  // // @Input() lineId?: number; // equivale ao data.IdLine

  //  valorPadrao!:string| '';

  // @Output() changed = new EventEmitter<{ id: number, name: string, value: any }>();

  // // ngOnInit(): void {

  // // const defaultItem = this.ctrl.selectItems?.find(i => i.defaultselected===true);

  // // if (defaultItem) {
  // //   console.log(this.ctrl.selectItems?.find(i => i.defaultselected===true));
  // //   this.valorPadrao = defaultItem.value;
     
  // // }

  // // console.log("AAAAH",this.valorPadrao); 

  // // }

  //   ngOnChanges(): void {
  //   if (this.ctrl?.selectItems?.length) {
  //     const defaultItem = this.ctrl.selectItems.find(i => i.defaultselected);
  //     if (defaultItem) {
  //       this.valorPadrao = defaultItem.value;
  //     }
  //   }
  // }

  // onChange(event: any) {

  //     const rawValue = event.target.value;

  //     const valueFinal = rawValue.includes(':')
  //       ? rawValue.split(':').slice(1).join(':').trim()
  //       : rawValue;
  //   this.changed.emit({
  //     id: this.ctrl.id,
  //     name: this.ctrl.name,
  //     value: valueFinal
  //   });

  // }

  // trackByIndex(i: number) {
  //   return i;
  // }

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
