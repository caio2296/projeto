/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CalendarFormService } from '../../../ServicosCalendario/calendarFormService';
import { DateHelperService } from '../../../ServicosCalendario/dateHelperService';
import { InputConfig } from '../../../ServicosCalendario/InputConfig';
import { LabelDataService } from '../../../ServicosCalendario/label-data-service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-input-data',
  standalone: false,
  templateUrl: './input-data.html',
  styleUrl: './input-data.scss'
})
export class InputData implements OnInit {
  @Output()selecaoFinalizada = new EventEmitter<void>();
  
  @Input() form!: FormGroup;

public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';

constructor(protected calendarFormService:CalendarFormService, protected dateHelperServices: DateHelperService,
  protected inputConfigs: InputConfig, protected labelDataService:LabelDataService) {
  
}
  ngOnInit(): void {
    this.inputConfigs.updateInputConfig(this.labelDataService.getCalendarMode());
  }

  onDateInput(event: MatDatepickerInputEvent<Date>) {

  this.calendarFormService.onDateChangeDataAndMonth(
    event,
    'day'
  );

  this.selecaoFinalizada.emit();
}
}
