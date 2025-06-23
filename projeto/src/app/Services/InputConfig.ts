import { FormGroup } from "@angular/forms";
import { CalendarBarModel } from "../Models/calendarBarModel";
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
     protected calendarBarModel: CalendarBarModel) {

  }

   updateInputConfig(unidade: string, intervaloForm:FormGroup):FormGroup {
    switch (unidade) {
      case 'dias':
        this.inputConfig = {
          type: 'data',
          min: this.dateHelperServices.dateMinISO().toString(),
          max: this.dateHelperServices.dateMaxISO().toString()
        };
       let parte = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
        setTimeout(()=>{
          intervaloForm.patchValue({
          dataInicio: new Date( `${parte[1]}-${parte[0]}-${parte[2]}`),
          dataFim:  new Date( `${parte[1]}-${parte[0]}-${parte[2]}`)
          });
        })
        break;
      case 'meses':
         const partes = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
        this.inputConfig = {
          type: 'month',
          min: this.dateHelperServices.dateMonthMinISO(),
          max: this.dateHelperServices.dateMonthMaxISO()
        };

        console.log(this.dateHelperServices.dateMonthMinISO());
        setTimeout(() => {
          intervaloForm.patchValue({
          dataInicio:`${partes[0]}-${partes[1]}-${partes[2]}`,
          dataFim: `${partes[2]}-${partes[1]}`
          });
        });
        break;
      case 'anos':
        this.inputConfig = {
          type: 'number',
          min: this.dateHelperServices.getYearMin().toString(),
          max: this.dateHelperServices.getYearMax().toString()
        };
           this.dateHelperServices.gerarAnosDisponiveis();

          // Seleciona o primeiro ano disponível como padrão
          const anoPadrao = this.dateHelperServices.anosDisponiveis[0];
          setTimeout(()=>{
           intervaloForm.patchValue({
              dataInicio: anoPadrao,
              dataFim: anoPadrao
            });
          });
        break;
    }

     return intervaloForm;
  }
}