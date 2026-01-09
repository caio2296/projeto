// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Direction } from "@angular/cdk/bidi";
// import { Input, InputSignal, InputSignalWithTransform, ModelSignal, Signal } from "@angular/core";

// export class Listbox<V> {
//   readonly id: InputSignal<any> | undefined;
//   readonly element: HTMLElement | undefined;
//   protected textDirection: Signal<Direction> | undefined;
//   protected items: Signal<any[]> | undefined;
//   orientation: InputSignal<"vertical" | "horizontal"> | undefined;
//   multi: InputSignalWithTransform<boolean, unknown> | undefined;
//   wrap: InputSignalWithTransform<boolean, unknown> | undefined;
//   softDisabled: InputSignalWithTransform<boolean, unknown> | undefined;
//   focusMode: InputSignal<"roving" | "activedescendant"> | undefined;
//   selectionMode: InputSignal<"follow" | "explicit"> | undefined;
//   typeaheadDelay: InputSignal<number> | undefined;
//   disabled: InputSignalWithTransform<boolean, unknown> | undefined;
//   readonly: InputSignalWithTransform<boolean, unknown> | undefined;
//   values: ModelSignal<V[]> | undefined;
//   scrollActiveItemIntoView?(options?: ScrollIntoViewOptions): void;
//   gotoFirst?(): void;
// }

// export class Options<V> {
//   readonly element: HTMLElement | undefined;
//   active: Signal<any> | undefined;
//   @Input() id: InputSignal<any> | undefined;
//   protected searchTerm: Signal<string> | undefined;
//   @Input() value: InputSignal<V> | undefined;
//   @Input() disabled: InputSignalWithTransform<boolean, unknown> | undefined;
//   @Input() label: InputSignal<string | undefined> | undefined;
//   readonly selected: Signal<any> | undefined;
// }

// export class Combobox<V> {
//   protected textDirection: Signal<Direction> | undefined;
//   readonly element: HTMLElement | undefined;
//   readonly popup: Signal<ComboboxPopup<V> | undefined> | undefined;
//   filterMode: InputSignal<"manual" | "auto-select" | "highlight"> | undefined;
//   readonly disabled: InputSignalWithTransform<boolean, unknown> | undefined;
//   readonly readonly: InputSignalWithTransform<boolean, unknown> | undefined;
//   readonly firstMatch: InputSignal<V | undefined> | undefined;
//   readonly expanded: Signal<any> | undefined;
//   readonly alwaysExpanded: InputSignalWithTransform<boolean, unknown> | undefined;
//   readonly inputElement: Signal<any> | undefined;
//   open?(): void;
//   close?(): void;
// }

// class ComboboxPopup<V> {
//   readonly combobox!: Combobox<V> | null;
// }