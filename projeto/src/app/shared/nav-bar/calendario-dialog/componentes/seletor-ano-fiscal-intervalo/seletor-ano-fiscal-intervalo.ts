/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputConfig } from '../../../../Services/InputConfig';
import { FormularioService } from '../../../../Services/formulario-service';
import { DateHelperService } from '../../../../Services/dateHelperService';
import { CalendarFormService } from '../../../../Services/calendarFormService';

@Component({
  selector: 'app-seletor-ano-fiscal-intervalo',
  standalone: false,
  templateUrl: './seletor-ano-fiscal-intervalo.html',
  styleUrl: './seletor-ano-fiscal-intervalo.scss'
})
export class SeletorAnoFiscalIntervalo implements OnInit {
   @Input() intervaloForm!: FormGroup;
   @Input() calendarMode: 'year' | 'fiscalYear' = 'year';

   constructor(protected inputConfigs:InputConfig, protected formularioService:FormularioService, protected dateHelperServices:DateHelperService,
        protected calendarFormServices: CalendarFormService) {
   
   
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

}
