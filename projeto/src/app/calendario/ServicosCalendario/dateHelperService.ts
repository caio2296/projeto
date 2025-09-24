/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from "@angular/core";
import { CalendarBarModelService } from "./calendarBarModel";


@Injectable({ providedIn: 'root' })

export class DateHelperService {

    yearOptions: number[] = [];
    public fiscalYearOptions: number[] = [];
    anosDisponiveis: string[] = [];

constructor(private calendarBarModelService: CalendarBarModelService) { 
}
    public dateMaxISO(): Date { 
      const partes = this.calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/');
      return new Date(+partes[2], +partes[1] - 1, +partes[0]);
    }

    public dateMinISO():Date {
      const partes = this.calendarBarModelService.dados.dateMin.split('/');
      return new Date(+partes[2], +partes[1] - 1, +partes[0]);
    }

    public dateMonthMaxISO() {
      const partes = this.calendarBarModelService.dados.dateMax.split('/');
      return `${partes[2]}-${partes[1]}`;
    }

    public dateMonthMinISO() {
      const partes = this.calendarBarModelService.dados.dateMin.split('/');
      return `${partes[2]}-${partes[1]}`;
    }

    getYearMin() {
      const partes = this.calendarBarModelService.dados.dateMin.split('/');
      return parseInt(partes[2], 10);  
    }

    getYearMax() {
      const partes = this.calendarBarModelService.dados.dateMax.split('/');
      return parseInt(partes[2], 10);
    }

        populateYears() {
      const minYear = this.getYearMin();
      const maxYear = this.getYearMax();
      this.yearOptions = [];

      for (let year = minYear; year <= maxYear; year++) {
        this.yearOptions.push(year);
      }
    }

    populateFiscalYears() {
      const minDateParts = this.calendarBarModelService.dados.dateMin.split('/'); 
      const maxDateParts = this.calendarBarModelService.dados.dateMax.split('/'); 

      const minYear = parseInt(minDateParts[2], 10);
      const maxYear = parseInt(maxDateParts[2], 10);

      for (let year = minYear; year <= maxYear; year++) {
        this.fiscalYearOptions.push(year);
      }
    }

    gerarAnosDisponiveis() {
      const min = parseInt(this.getYearMin().toString());
      const max = parseInt(this.getYearMax().toString());
      this.anosDisponiveis = [];

      for (let ano = min; ano <= max; ano++) {
        this.anosDisponiveis.push(ano.toString());
      }
  }
}
