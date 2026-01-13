/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import {
  computed,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { Listbox } from './listbox.directive';
import { FilterCat } from '../../../../../calendario/Models/type';

@Directive({
  selector: '[appOption]',
  exportAs: 'appOption',
  standalone: false
})
export class Options<V> {

  readonly id = input<any>();
  readonly optionValue = input.required<FilterCat>();
  readonly optionLabel = input<string>();
  readonly disabled = input<boolean>(false);
  private listbox = inject<Listbox<V>>(Listbox);

  /** 🔥 Estado real */
  selected = computed(() => {
    const value = this.optionValue();
    const isSelected = this.listbox.isSelected(value);

    console.log('[Option]', value, 'selected:', isSelected);

    return isSelected;
  });

  readonly active = computed(() => {
    const value = this.optionValue();

    const isActive = this.listbox.activeValue() === value;

    console.log('[Option]', value, 'active:', isActive);

    return isActive;
  });

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation(); // 🔥 evita fechar o combobox
    if (this.disabled()) return;

    this.listbox.setActive(this.optionValue()); // 🔥 AQUI
    this.listbox.toggle(this.optionValue());
  }

  @HostBinding('attr.aria-selected')
  get ariaSelected() {
    return this.selected() ? 'true' : null;
  }
  @HostBinding('attr.data-active')
  get dataActive() {
    return this.active() ? 'true' : null;
  }



  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.disabled()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.listbox.moveActive(1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.listbox.moveActive(-1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();

        this.listbox.toggle(this.optionValue());
        break;

      case 'Escape':
        event.preventDefault();

        break;
    }
  }

  @HostBinding('attr.tabindex')
  get tabindex() {
    return this.active() ? 0 : -1;
  }

  constructor(public readonly element: ElementRef<HTMLElement>) { }
}
