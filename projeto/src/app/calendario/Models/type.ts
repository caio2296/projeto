/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CalendarModel {
  type: string;
  calendarBar: CalendarBar;
  shiftBar: ShiftBar;
  dateMin: string;
  dateMax: string;
  fiscalYearStart: string;
}

export interface CalendarBar {
  datetime: TimeItem;
  day: TimeItem;
  week: TimeItem;
  month: TimeItem;
  year: TimeItem;
  fiscalYear: TimeItem;
  defaultSelection: DefaultSelection;
}

export interface TimeItem {
  visible: boolean;
  range: boolean;
  rangeStart: string;
  rangeEnd: string;
}

export interface DefaultSelection {
  selection: string;
  range: boolean;
  dateStart: string;
  dateEnd: string;
}

export interface ShiftBar {
  descriptions: string[];
  visible: boolean;
  range: boolean;
  rangeStart: string | null;
  rangeEnd: string | null;
  typeCtrl: string;
}

export interface FilterCat {
  typectrl: string;
  id: number;
  css: string;
  caption: string;
  name: string;
  parentcontrolid: number | null;
  radioitems: RadioItem[] | null;
  value: string | null;
  checkstatus: boolean | null;
  action: string | null;
  imageurl: string | null;
  controlsbyrow: boolean;
  children: FilterCat[] | null;
  changeStatus: any | null;
  labelbyrow: boolean;
  tag: string | null;
  order: number;          // <-- corrigido
  id_ctrl_depend: number | null;
  disabledctrls: boolean;
  maxctrlsbygroup: number | null;
  disabled: boolean;
  filloptions: any[] | null;
  checked: boolean;       // <-- corrigido
  imageoverurl: string | null;
  selectitems: SelectItems[];
}

export interface SelectItems{
  value: string;
  displaytext: string;
  selected?: boolean;
}

export interface RadioItem {
  id_item: number;
  value: string;
  caption: string;
  statuscheck: boolean;
}

export interface FilterData {
    target: HTMLElement;            // ok no Angular
    settings: FilterCat;            // usa sua interface
    aux?: any;
    redirectTo?: string;
    IdLine?: number | string;
}

