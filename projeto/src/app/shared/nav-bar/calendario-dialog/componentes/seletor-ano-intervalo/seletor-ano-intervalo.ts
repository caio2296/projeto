/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateHelperService } from '../../../../Services/dateHelperService';
import { InputConfig } from '../../../../Services/InputConfig';
import { FormularioService } from '../../../../Services/formulario-service';
import { CalendarFormService } from '../../../../Services/calendarFormService';

@Component({
  selector: 'app-seletor-ano-intervalo',
  standalone: false,
  templateUrl: './seletor-ano-intervalo.html',
  styleUrl: './seletor-ano-intervalo.scss'
})
export class SeletorAnoIntervalo implements OnInit {
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
}
