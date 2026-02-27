/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import {
  ContentChildren,
  Directive,
  ElementRef,
  input,
  output,
  QueryList,
  signal,
  Signal
} from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { Options } from './option.directive';
import { Combobox } from './combobox.directive';

@Directive({
  selector: '[appListbox]',
  exportAs: 'appListbox',
  standalone: false
})
export class Listbox<V> {

  /** 🔥 Item ativo (foco / teclado) */
  readonly activeValue = signal<any | null>(null);
  readonly id = input<any>();
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly multi = input<boolean>(false, { alias: 'multi' });
  readonly wrap = input<boolean>(false);
  readonly softDisabled = input<boolean>(false);
  readonly focusMode = input<'roving' | 'activedescendant'>('roving');
  readonly selectionMode = input<'follow' | 'explicit'>('explicit');
  readonly typeaheadDelay = input<number>(0);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);



  @ContentChildren(Options) options!: QueryList<Options<V>>;

  /** 🔥 Estado vem de fora */
  readonly values = input.required<any[]>();

  /** 🔥 Emite mudanças */
  readonly valuesChange = output<V[]>();


  protected textDirection?: Signal<Direction>;
  protected items?: Signal<any[]>;

  constructor(public readonly element: ElementRef<HTMLElement>,
    private combobox: Combobox<any>
  ) {
    this.combobox.registerListbox(this);
  }

  scrollActiveItemIntoView(options?: ScrollIntoViewOptions): void {
    this.element.nativeElement.scrollIntoView(options);
  }

  activateFirst() {
    const opts = this.options?.toArray();
    if (!opts || !opts.length) return;

    const first = opts[0];

    this.activeValue.set(first.optionValue());
    first.element.nativeElement.focus();
  }

  toggle(value: any) {
    const current = this.values();
    console.log(value);
    let next: any[];

    if (this.multi()) {
      if (current.includes(value)) {
        value.defaultselected = false;
        next = current.filter(v => v !== value);

      } else {
        value.defaultselected = true;
        next = [...current, value];
      }
    } else {
      current.forEach(v => v.defaultSelected = false);
      value.defaultselected = true;
      next = [value];
    }

    // 🔥 EMITE para o pai
    this.valuesChange.emit(next);
  }


  isSelected(value: any): boolean {

    return this.values().includes(value);
  }

  setActive(value: any) {
    this.activeValue.set(value);
  }

  moveActive(delta: number) {
    const opts = this.options.toArray();
    if (!opts.length) return;

    const currentIndex = opts.findIndex(
      o => o.optionValue() === this.activeValue()
    );

    let nextIndex = currentIndex + delta;

    if (nextIndex < 0) nextIndex = opts.length - 1;
    if (nextIndex >= opts.length) nextIndex = 0;

    const next = opts[nextIndex];

    this.activeValue.set(next.optionValue());

    next.element.nativeElement.focus();
  }
}
