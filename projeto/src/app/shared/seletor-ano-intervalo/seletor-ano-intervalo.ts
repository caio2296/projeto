import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputConfig } from '../../Services/InputConfig';
import { CalendarFormService } from '../../Services/calendarFormService';
import { DateHelperService } from '../../Services/dateHelperService';

@Component({
  selector: 'app-seletor-ano-intervalo',
  standalone: false,
  templateUrl: './seletor-ano-intervalo.html',
  styleUrl: './seletor-ano-intervalo.scss'
})
export class SeletorAnoIntervalo implements OnInit {
 @Input() intervaloForm!: FormGroup;

  public selectedValue!: string;

  constructor(protected inputConfigs:InputConfig, protected calendarFormServices: CalendarFormService, protected dateHelperServices:DateHelperService) {


  }
  ngOnInit(): void {
   this.intervaloForm = this.calendarFormServices.InicialiarFormularioIntervalor();

    this.inputConfigs.updateInputConfig(this.intervaloForm.get('unidade')?.value, this.intervaloForm);
     this.intervaloForm.get('unidade')?.valueChanges.subscribe(value => {
      // this.updateInputConfig(value);

      this.inputConfigs.updateInputConfig(value,this.intervaloForm);
    });
  }

}
