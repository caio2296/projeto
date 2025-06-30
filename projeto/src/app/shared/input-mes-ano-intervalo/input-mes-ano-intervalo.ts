import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Moment } from 'moment';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from '../Models/Formats';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';
import { InputConfig } from '../Services/InputConfig';




@Component({
  selector: 'app-input-mes-ano-intervalo',
  standalone: false,
  templateUrl: './input-mes-ano-intervalo.html',
  styleUrl: './input-mes-ano-intervalo.scss',
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMesAnoIntervalo implements OnInit {

  // intervaloForm!:FormGroup;

  inputConfig = {
    type: 'data',
    min: '',
    max: ''
  };
  @Input() intervaloForm!: FormGroup;
  readonly date = new FormControl(moment());
  data: string = '';

  constructor(protected inputConfigs: InputConfig, protected calendarFormService: CalendarFormService, protected dateHelperService: DateHelperService) {

  }
  ngOnInit(): void {
    this.intervaloForm = this.calendarFormService.InicialiarFormularioIntervalor();

    this.inputConfigs.updateInputConfig(this.intervaloForm.get('unidade')?.value, this.intervaloForm);
    this.intervaloForm.get('unidade')?.valueChanges.subscribe(value => {
      // this.updateInputConfig(value);

      this.inputConfigs.updateInputConfig(value, this.intervaloForm);
    });
  }


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, inputControlName: string) {
    const ctrlValue = this.intervaloForm.get(inputControlName)?.value ?? moment();

    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    const date = moment().year(normalizedMonthAndYear.year()).month(normalizedMonthAndYear.month());

    this.intervaloForm.get(inputControlName)?.setValue(ctrlValue); // <- Aqui é o essencial!
    //o que irá enviar para api:

    const value = this.intervaloForm.get(inputControlName)?.value;
    const momentValue = moment(value);
    datepicker.close();
    if (inputControlName == 'dataFimMes') {

      this.calendarFormService.onDateChangeMonthInterval(
        { value: momentValue.format('MM/YYYY') } as any,
        'dataInicioMes',
        'dataFimMes'
      );
    }



  }
}
