/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import moment from 'moment';
import { MY_FORMATS } from '../../../../shared/Models/Formats';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CalendarFormService } from '../../../ServicosCalendario/calendarFormService';
import { DateHelperService } from '../../../ServicosCalendario/dateHelperService';
import { InputConfig } from '../../../ServicosCalendario/InputConfig';
import { FormularioService } from '../../../ServicosCalendario/FormularioService/formulario-service';

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
  data = '';

  constructor(protected inputConfigs: InputConfig, protected formularioService:FormularioService,protected calendarFormService: CalendarFormService, protected dateHelperService: DateHelperService) {

  }
  ngOnInit(): void {
    if (!this.intervaloForm) {
     this.intervaloForm = this.formularioService.InicialiarFormularioIntervalor();
  }
    this.inputConfigs.updateInputConfig(this.intervaloForm.get('unidade')?.value);
    this.intervaloForm.get('unidade')?.valueChanges.subscribe(value => {
      // this.updateInputConfig(value);

      this.inputConfigs.updateInputConfig(value);
    });
  }
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>, inputControlName: string) {
    const ctrlValue = this.intervaloForm.get(inputControlName)?.value ?? moment();

    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());


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
