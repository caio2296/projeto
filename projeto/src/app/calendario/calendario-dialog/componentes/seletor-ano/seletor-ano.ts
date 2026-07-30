/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LabelDataService } from '../../../ServicosCalendario/label-data-service';
import { CalendarFormService } from '../../../ServicosCalendario/calendarFormService';
import { DateHelperService } from '../../../ServicosCalendario/dateHelperService';
import { InputConfig } from '../../../ServicosCalendario/InputConfig';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-seletor-ano',
  standalone: false,
  templateUrl: './seletor-ano.html',
  styleUrl: './seletor-ano.scss'
})
export class SeletorAno implements OnInit  {

@Output()selecaoFinalizada = new EventEmitter<void>();
@Input() form!: FormGroup;
@Input() label = '';
@Input() calendarMode: 'year' | 'fiscalYear' = 'year';


constructor( protected dateHelperServices:DateHelperService, protected calendarFormServices:CalendarFormService,
  protected inputConfigs:InputConfig, protected labelDataService:LabelDataService
) {
}
  ngOnInit(): void {
        this.inputConfigs.updateInputConfig(this.labelDataService.getCalendarMode());
  }

      onYearChange(event: MatSelectChange) {

  this.calendarFormServices.onYearChange(
     event,
    'calendarMode'
  );

  this.selecaoFinalizada.emit();
}
}
