/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LabelDataService } from '../../../../Services/label-data-service';
import { CalendarFormService } from '../../../../Services/calendarFormService';
import { DateHelperService } from '../../../../Services/dateHelperService';
import { InputConfig } from '../../../../Services/InputConfig';

@Component({
  selector: 'app-seletor-ano',
  standalone: false,
  templateUrl: './seletor-ano.html',
  styleUrl: './seletor-ano.scss'
})
export class SeletorAno implements OnInit  {
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
}
