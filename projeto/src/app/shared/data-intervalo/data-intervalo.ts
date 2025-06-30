import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';
import { InputConfig } from '../Services/InputConfig';


@Component({
  selector: 'app-data-intervalo',
  standalone: false,
  templateUrl: './data-intervalo.html',
  styleUrl: './data-intervalo.scss'
})
export class DataIntervalo implements OnInit {
@Input() intervaloForm!: FormGroup;
  inputConfig = {
    type: 'data',
    min: '',
    max: ''
  };

constructor(protected calendarFormService : CalendarFormService,  protected dateHelperServices:DateHelperService, protected inputConfigs:InputConfig) {


}

  ngOnInit(): void {
    this.intervaloForm = this.calendarFormService.InicialiarFormularioIntervalor();
 // Atualiza a configuração inicial
    this.inputConfigs.updateInputConfig(this.intervaloForm.get('unidade')?.value,this.intervaloForm);

    // Observa mudança da unidade
    this.intervaloForm.get('unidade')?.valueChanges.subscribe(value => {

     this.inputConfigs.updateInputConfig(value,this.intervaloForm);
    });
}
}
