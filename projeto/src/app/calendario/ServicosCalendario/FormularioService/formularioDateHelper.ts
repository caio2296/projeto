/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { LabelDataService } from '../../../calendario/ServicosCalendario/label-data-service';
import { LocaleService } from '../LocaleService';

@Injectable({
  providedIn: 'root'
})
export class FormularioDateHelper {

  constructor(
    private labelDataService: LabelDataService,
    private localeService: LocaleService
  ) {}

  public ObtarDataAnoLabel(calendarBarModelService: any) {
    let partes: any;
    let dataJs;
    let dataM;
    let ano;
    const partesPadrao = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/');

    if (this.localeService.getLocale() != "en-US"||this.labelDataService.getTipoInicioLabel()) {
            console.log("aaa",this.localeService.getLocale() != "en-US",this.labelDataService.getTipoInicioLabel());

      if(this.localeService.getLocale() == "en-US" || !this.labelDataService.getTipoInicioLabel()){
              if (calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.includes('/')) {
        partes = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split(/[/\\-]/);

        dataJs = new Date(+partes[2], +partes[1] - 1, +partes[0]);
        dataM = new Date(+partes[2], +partes[1] - 1);
        ano = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[2];
        if (calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[2] == undefined || calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[2] == null) {
          ano = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[1];
        }
      } else if (calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.toString().includes('-')) {
        ano = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('-')[0];
      } else {
        ano = this.labelDataService.getLabel();
      }
      }else{
        const troca = this.TrocarOrdemDiaMes(partes, dataJs, dataM, ano,calendarBarModelService);
      partes = troca.partes;
      dataJs = troca.dataJs;
      dataM = troca.dataM;
      ano = troca.ano;
      }

    } else {
      //fazer a versão americana da data
       const troca = this.TrocarOrdemDiaMes(partes, dataJs, dataM, ano,calendarBarModelService);
      partes = troca.partes;
      dataJs = troca.dataJs;
      dataM = troca.dataM;
      ano = troca.ano;
    }

    return { partes, dataJs, dataM, partesPadrao, ano };

    
  }
   public TrocarOrdemDiaMes(partes:any, dataJs:any,dataM:any,ano:any,calendarBarModelService:any) {
    
      if (calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.includes('/')) {
        partes = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split(/[/\\-]/);
        const [dia, mes, anopadrao] = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/');

  
        dataJs = new Date(+anopadrao, +mes - 1, +dia);
        dataM = new Date(+anopadrao, +mes - 1);
        ano = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[2];
        if (calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[2] == undefined || calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[2] == null) {
          ano = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/')[1];
        }
      } else if (this.labelDataService.getLabel().toString().includes('-')) {
        ano = this.labelDataService.getLabel().split('-')[0];
      } else {
        ano = this.labelDataService.getLabel();
      }
      return { partes, dataJs, dataM, ano };
    }

  public ObterDataAnoIntervaloLabel(calendarBarModelService:any) {
    const partesPadrao = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/');
    let partes;
    let partesMeses;
    let partesAno;
    let dataJs!: Date;
    let Ano;
    let unidade;

    let dataFim!: Date;

    const label = String(calendarBarModelService.dados.calendarBar.defaultSelection.dateStart);
    if (this.localeService.getLocale() != "en-US" ||this.labelDataService.getTipoInicioLabel()) {

      if(this.localeService.getLocale() == "en-US" || !this.labelDataService.getTipoInicioLabel()){
      if (label.includes('-')) {
        const partes = this.labelDataService.getLabel().split('-');
        const dataStr = partes[1].trim(); // remove espaços

        const [dia, mes, ano] = dataStr.split('/');
        dataFim = new Date(+ano, +mes - 1, +dia);
      } else {
        const [dia, mes, ano] = label.split('/');
        dataFim = new Date(+ano, +mes - 1, +dia);
      }

      unidade = this.labelDataService.getCalendarMode();

      if (label.includes('/')) {
        partes = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split(/\/|-/);
        dataJs = new Date(+partes[2], +partes[1] - 1, +partes[0]);
      }
    } else{
      ({ dataFim, unidade, partes, dataJs } = this.TrocarOrdemDiaMesIntervalo(label, dataFim, unidade, partes, dataJs,calendarBarModelService));
    }
    } else {
      //versão americana
      ({ dataFim, unidade, partes, dataJs } = this.TrocarOrdemDiaMesIntervalo(label, dataFim, unidade, partes, dataJs,calendarBarModelService));
    }
    return { unidade, dataJs, dataFim, partesPadrao, partesMeses, partesAno, Ano };
  }

  private TrocarOrdemDiaMesIntervalo(label: string, dataFim: Date, unidade: any, partes: any, dataJs: Date,calendarBarModelService:any) {
    if (label.includes('-')) {
      const partes =calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('-');

      dataFim = new Date(+partes[2], +partes[0] - 1, +partes[1]); 
    } else {
      const [dia, mes, ano] = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/');
      dataFim = new Date(+ano, +mes - 1, +dia);
    }

    unidade = this.labelDataService.getCalendarMode();

    if (calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.includes('/')) {
const [dia, mes, ano] = calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/');

console.log(partes);
      dataJs = new Date(+ano, +mes - 1, +dia);// <-- aqui invertido para MM/DD/YYYY
    }
    return { dataFim, unidade, partes, dataJs };
  }

}