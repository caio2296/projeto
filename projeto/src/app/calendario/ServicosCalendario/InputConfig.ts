/* eslint-disable @angular-eslint/prefer-inject */

import { CalendarBarModelService } from "./calendarBarModel";
import { DateHelperService } from "./dateHelperService";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root' // Isso já registra automaticamente como provider global
})

export class InputConfig{

    inputConfig = {
    type: 'data',
    min: '',
    max: ''
  };
  constructor(protected dateHelperServices: DateHelperService,
     protected calendarBarModelService: CalendarBarModelService) { }
   updateInputConfig(unidade: string) {
    switch (unidade) {
      case 'day':{
        this.inputConfig = {
          type: 'data',
          min: this.dateHelperServices.dateMinISO().toString(),
          max: this.dateHelperServices.dateMaxISO().toString()
        };
        break;
      }
      case 'month':{
        this.inputConfig = {
          type: 'month',
          min: this.dateHelperServices.dateMonthMinISO(),
          max: this.dateHelperServices.dateMonthMaxISO()
        };

        console.log(this.dateHelperServices.dateMonthMinISO());
        break;
      }

      case 'year':
        {
        this.inputConfig = {
          type: 'number',
          min: this.dateHelperServices.getYearMin().toString(),
          max: this.dateHelperServices.getYearMax().toString()
        };
           this.dateHelperServices.gerarAnosDisponiveis();
        break;
        }
    }
  }
}