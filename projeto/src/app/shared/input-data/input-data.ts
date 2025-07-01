/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';


@Component({
  selector: 'app-input-data',
  standalone: false,
  templateUrl: './input-data.html',
  styleUrl: './input-data.scss'
})
export class InputData {
@Input() form!: FormGroup

public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';

constructor(protected calendarFormService:CalendarFormService, protected dateHelperServices: DateHelperService) {
  
}
}
