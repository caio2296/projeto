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
  selectitems: any[] | null;
  radioitems: any[] | null;
  value: string | null;
  checkstatus: boolean;
  action: string | null;
  imageurl: string | null;
  controlsbyrow: boolean;
  children: FilterCat[] | null;
  changeStatus: any | null;
  labelbyrow: boolean;
  tag: string | null;
  Order: number;
  id_ctrl_depend: number;
  disabledctrls: boolean;
  maxctrlsbygroup: number;
  disabled: boolean;
  filloptions: any[] | null;
  Checked: boolean;
  imageoverurl: string | null;
}
