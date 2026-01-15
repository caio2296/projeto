/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Directive,
    HostBinding,
    HostListener,
    InputSignal,
    InputSignalWithTransform,
    signal,
    Signal
} from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { Listbox } from './listbox.directive';

@Directive({
    selector: '[appCombobox]',
    exportAs: 'appCombobox',
    standalone: false
})
export class Combobox<V> {
    private listbox?: Listbox<V>;

    registerListbox(listbox: Listbox<V>) {
        this.listbox = listbox;
    }



    protected textDirection?: Signal<Direction>;

    readonly element?: HTMLElement;
    readonly popup?: Signal<ComboboxPopup<V> | undefined>;

    filterMode?: InputSignal<'manual' | 'auto-select' | 'highlight'>;
    disabled?: InputSignalWithTransform<boolean, unknown>;
    readonly?: InputSignalWithTransform<boolean, unknown>;
    firstMatch?: InputSignal<V | undefined>;
    expanded = signal(false);
    alwaysExpanded?: InputSignalWithTransform<boolean, unknown>;
    inputElement?: Signal<any>;


    open(): void {
        if (this.expanded()) return;

        this.expanded.set(true);

        // 🔥 ATIVA PRIMEIRA OPÇÃO AO ABRIR
        queueMicrotask(() => {
            this.listbox?.activateFirst();
        });
    }
    //   open(): void {
    //     if (this.expanded()) return;
    //     this.expanded.set(true);
    //     console.log('abrir');
    //   }

    close(): void {
        this.expanded.set(false);
        console.log('fechar');
    }

    toggle(): void {
        this.expanded() ? this.close() : this.open();
    }

    // 🔥 clique abre
    @HostListener('click')
    onClick() {

        this.toggle();
    }

    @HostBinding('attr.tabindex')
    tabindex = -1;

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        if (this.disabled?.()) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.open();

                queueMicrotask(() => {
                    this.listbox?.activateFirst();
                });
                break;

            case 'Enter':
            case ' ':
                event.preventDefault();
                this.toggle();
                break;

            case 'Escape':
                this.close();
                break;
        }
    }
}


class ComboboxPopup<V> {
    readonly combobox!: Combobox<V> | null;
}
