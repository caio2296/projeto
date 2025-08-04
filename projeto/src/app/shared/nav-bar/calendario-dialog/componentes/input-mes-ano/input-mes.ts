/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import moment from 'moment';
import { Moment } from 'moment';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../../Models/Formats';
import { LabelDataService } from '../../../../Services/label-data-service';
import { CalendarFormService } from '../../../../Services/calendarFormService';
import { DateHelperService } from '../../../../Services/dateHelperService';
import { InputConfig } from '../../../../Services/InputConfig';

@Component({
  selector: 'app-input-mes',
  standalone: false,
  templateUrl: './input-mes.html',
  styleUrl: './input-mes.scss',
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMes implements OnInit  {
  @Input() form!: FormGroup;

  public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';
  /**
   *
   */
  constructor(protected calendarFormService: CalendarFormService, protected dateHelperServices: DateHelperService,
    protected inputConfigs:InputConfig, protected labelDataService: LabelDataService
  ) {


  }
  ngOnInit(): void {
      this.inputConfigs.updateInputConfig(this.labelDataService.getCalendarMode());
  }


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, inputControlName: string) {
    const ctrlValue = moment(this.form.get(inputControlName)?.value) ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());

    this.form.get(inputControlName)?.setValue(ctrlValue); // <- Aqui é o essencial!
    //o que irá enviar para api:

    const value = this.form.get(inputControlName)?.value;
    const momentValue = moment(value);
    datepicker.close();

    this.calendarFormService.onDateChangeDataAndMonth(
      { value: momentValue.format('MM/YYYY') } as any,
      'month',
    );
  }
}
