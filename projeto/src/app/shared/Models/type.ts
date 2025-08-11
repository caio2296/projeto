export interface Tabela{
    id:string,
    descricao:string
}

export interface frutas{
    id:string,
    descricao:string,
    tamanho: string,
    cor: string
}

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
