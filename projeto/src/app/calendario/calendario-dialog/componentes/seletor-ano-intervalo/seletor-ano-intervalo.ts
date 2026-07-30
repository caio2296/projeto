/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateHelperService } from '../../../ServicosCalendario/dateHelperService';
import { InputConfig } from '../../../ServicosCalendario/InputConfig';
import { FormularioService } from '../../../ServicosCalendario/FormularioService/formulario-service';
import { CalendarFormService } from '../../../ServicosCalendario/calendarFormService';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-seletor-ano-intervalo',
  standalone: false,
  templateUrl: './seletor-ano-intervalo.html',
  styleUrl: './seletor-ano-intervalo.scss'
})
export class SeletorAnoIntervalo implements OnInit {

 @Output()selecaoFinalizada = new EventEmitter<void>();
 @Input() intervaloForm!: FormGroup;

  public selectedValue!: string;

  constructor(protected inputConfigs:InputConfig, protected formularioService:FormularioService, protected dateHelperServices:DateHelperService,
     protected calendarFormServices: CalendarFormService) { }
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

      onYearChangeInterval(event: MatSelectChange) {

  this.calendarFormServices.onYearChangeInterval(
     event,
    'anoInicio',
    'anoFim'
  );

  this.selecaoFinalizada.emit();
}
}
