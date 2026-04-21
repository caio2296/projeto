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
  selectItems: SelectItems[];
}

export interface SelectItems{
   id_item: number;
   id_filter: number;
   order: number;
   defaultselected: boolean;
   withfilters: boolean;
   value: string;
   displaytext: string;
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

export interface Root {
  tablabis: Tablabis[];
}

export interface Tablabis {
  id_tablabis: number;
  description: string;
  enable: boolean;
  templates: Template[];
  semaphores: Semaphore[];
}

export interface Template {
  id_template: number;
  description?: string | null;
  align?: string | null;
  showindicators?: boolean | null;
  showunits?: number | null;
  showsemaphores?: boolean | null;
  scrolling?: boolean | null;

  rows?: Row[] | null;
  cols?: Col[] | null;
}

export interface Row {
  id_row_schema: number;
  text?: string | null;
  order?: number | null;
  level?: number | null;
  enabled?: boolean | null;
  tooltip?: Tooltip[] | null;
  linkbuttons?: LinkButton[] | null;
  nodes: Node[];
}

export interface Tooltip {
  tooltip: string;
}

export interface LinkButton {
  url: string;
  onclick: string;
  order: number;
}

export interface Col {
  id_col_schema: number;
  text?: string | null;
  order?: number | null;
  level?: number | null;
  collapsed?: boolean | null;
}

export interface Node {
  id_node: number;
  measure: string;
  format_text: string;

  id_rows_nodes_rel: number;
  order?: number | null;
  enable?: boolean;
  rel_format_text?: string;

  indicator: Indicator;
  variation: Variation;
  unit: Unit;
}

export interface Indicator {
  id_indicator: number;
  description: string;
}

export interface Variation {
  id_variation?: number | null;
  description?: string | null;
  description_alt?: string | null;
}

export interface Unit {
  id_unit: number;
  description: string;
}

export interface Semaphore {
  id_semaphore: number;
  description: string;
  references: SemaphoreReference[];
}

export interface SemaphoreReference {
  min_val: number;
  max_val: number;
  reference: string;
  image: string;
}

