/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateHelperService } from '../../../ServicosCalendario/dateHelperService';
import { InputConfig } from '../../../ServicosCalendario/InputConfig';
import { FormularioService } from '../../../ServicosCalendario/FormularioService/formulario-service';
import { CalendarFormService } from '../../../ServicosCalendario/calendarFormService';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-data-intervalo',
  standalone: false,
  templateUrl: './data-intervalo.html',
  styleUrl: './data-intervalo.scss'
})
export class DataIntervalo implements OnInit {

@Output()selecaoFinalizada = new EventEmitter<void>();

@Input() intervaloForm!: FormGroup;
  inputConfig = {
    type: 'data',
    min: '',
    max: ''
  };

constructor(
  protected formularioService:FormularioService,  protected dateHelperServices:DateHelperService, protected inputConfigs:InputConfig, 
  protected calendarFormServices: CalendarFormService) {
}

  ngOnInit(): void {
  if (!this.intervaloForm) {
     this.intervaloForm = this.formularioService.InicialiarFormularioIntervalor();
  }

  console.log(this.intervaloForm.get('dataInicio')?.value);
 // Atualiza a configuração inicial
    this.inputConfigs.updateInputConfig(this.intervaloForm.get('unidade')?.value);

    // Observa mudança da unidade
    this.intervaloForm.get('unidade')?.valueChanges.subscribe(value => {

     this.inputConfigs.updateInputConfig(value);
    });
}

onDateInput(event: MatDatepickerInputEvent<Date>) {

  this.calendarFormServices.onDateChangeInterval(
    event,
    'dataInicio',
    'dataFim'
  );

  this.selecaoFinalizada.emit();
}

}
