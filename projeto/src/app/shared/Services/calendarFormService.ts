/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { startWith } from "rxjs/operators";
import { Subscription } from "rxjs";

import { LabelDataService } from "./label-data-service";
import { ApiService } from "C:/Users/user/Desktop/Caio/projeto/projeto/src/app/Services/api-service";
import { FormularioService } from "./formulario-service";

@Injectable({ providedIn: 'root' })

export class CalendarFormService {

  private subscription?: Subscription;

  constructor(
    public labelDataService: LabelDataService,
    public formularioService: FormularioService,
    protected ApiService: ApiService) {
  }

  public onYearChange(event: MatSelectChange, inputName: string): void {
    switch (inputName) {
      case 'year': {
        this.labelDataService.setInterval(false);
        this.labelDataService.setTipoData(inputName);
        this.labelDataService.setLabel(event.value);
        this.labelDataService.setCalendarMode('year');

        console.log('Evento para o ano!');
        console.log('Ano selecionado:', event.value);
        // Lógica para quando for ano comum
        break;
      }
      case 'fiscalYear': {
        this.labelDataService.setInterval(false);
        this.labelDataService.setTipoData(inputName);
        this.labelDataService.setLabel(`${event.value}/${event.value + 1}`);
        this.labelDataService.setCalendarMode('fiscalYear');
        console.log('Ano fiscal selecionado:', event.value);
        // Lógica para quando for ano fiscal
        break;
      }
      default: {
        console.warn('Input não reconhecido:', inputName);
        break;
      }
    }
  }

  onDateChangeDataAndMonth(event: MatDatepickerInputEvent<Date>, input: string): void {
    switch (input) {
      case 'day': {
        this.labelDataService.setInterval(false);
        this.labelDataService.setTipoData(input);
        const controlInput = this.formularioService.form.get(input);
        this.labelDataService.setCalendarMode('day');

        // Cria uma nova inscrição
        this.subscription = controlInput?.valueChanges
          .pipe(startWith(controlInput.value))
          .subscribe(data => {
            this.labelDataService.setLabel(data.toLocaleDateString('pt-BR'));
            console.log("evento! enviando...");
            console.log(`${data.toLocaleDateString('pt-BR')}`);
          });
        this.subscription?.unsubscribe();

        break;
      }
      case 'month': {
        this.labelDataService.setInterval(false);
        this.labelDataService.setTipoData(input);
        const controlInput = this.formularioService.form.get(input);
        this.labelDataService.setCalendarMode('month');

        // Cria uma nova inscrição
        this.subscription = controlInput?.valueChanges
          .pipe(startWith(controlInput.value))
          .subscribe(data => {
            const date = new Date(data);

            const mes = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
            const ano = date.getFullYear();

            const dataFormatada = `${mes}/${ano}`;
            this.labelDataService.setLabel(dataFormatada);
            console.log("evento! enviando...");
            console.log(dataFormatada);
          });
        this.subscription?.unsubscribe();
        break;
      }
      default: {
        console.warn('Input não reconhecido:', input);
        break;
      }
    }

  }

  onDateChangeMonthInterval(event: MatDatepickerInputEvent<Date>, inputInicio: string, inputFim: string): void {
    const controlInicio = this.formularioService.intervaloForm.get(inputInicio);
    const controlFim = this.formularioService.intervaloForm.get(inputFim);

    controlInicio?.valueChanges
      .pipe(startWith(controlInicio.value))
      .subscribe(dataInicio => {
        const dataFim = controlFim?.value;

        if (dataFim && dataFim > dataInicio) {

          const dateInicio = new Date(dataInicio);

          const mesInicio = String(dateInicio.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
          const anoInicio = dateInicio.getFullYear();

          const dataFormatadaInicio = `${mesInicio}/${anoInicio}`;

          const dateFim = new Date(dataFim);

          const mesFim = String(dateFim.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
          const anoFim = dateFim.getFullYear();

          const dataFormatadaFim = `${mesFim}/${anoFim}`;
          this.labelDataService.setInterval(true);
          this.labelDataService.setTipoData("Mes");
          this.labelDataService.setCalendarMode('month');
          this.labelDataService.setLabel(`${dataFormatadaInicio}-${dataFormatadaFim}`);


          console.log("evento! enviando...");
          console.log(`${dataFormatadaInicio} - ${dataFormatadaFim}`);
        }
      });
  }

  public onDateChangeInterval(event: MatDatepickerInputEvent<Date>, inputInicio: string, inputFim: string): void {

    this.formularioService.intervaloForm.get(inputInicio)?.valueChanges
      .pipe(startWith(this.formularioService.intervaloForm.get(inputInicio)?.value))
      .subscribe(dataInicio => {

        const dataFimControl = this.formularioService.intervaloForm.get(inputFim);
        const dataFim = dataFimControl?.value;

        const dataInicioValor = this.formularioService.intervaloForm.get(inputInicio)?.value;
        const dataFimValor = this.formularioService.intervaloForm.get(inputFim)?.value;

        if (dataFim instanceof Date && dataInicio instanceof Date && dataFim > dataInicio) {

          this.labelDataService.setInterval(true);
          this.labelDataService.setTipoData("Dia");
          this.labelDataService.setCalendarMode('day');
          const label = `${dataInicioValor.toLocaleDateString('pt-BR')} - ${dataFimValor.toLocaleDateString('pt-BR')}`;
          this.labelDataService.setLabel(label);

          console.log("evento! enviando...");
          console.log(label);

        }
      });
  }

  public onYearFiscalChangeInterval(event: MatSelectChange, inputInicio: string, inputFim: string): void {
    const controlInicio = this.formularioService.intervaloForm.get(inputInicio);

    this.formularioService.intervaloForm.get(inputFim)?.valueChanges
      .pipe(startWith(this.formularioService.intervaloForm.get(inputFim)?.value))
      .subscribe(dataFim => {
        const dataInicio = controlInicio?.value;

        if (dataFim && dataFim > dataInicio) {
          this.labelDataService.setInterval(true);
          this.labelDataService.setTipoData("Ano fiscal");
          this.labelDataService.setCalendarMode('fiscalYear');

          this.labelDataService
            .setLabel(`${this.formularioService.intervaloForm.get(inputInicio)?.value}/${parseInt(this.formularioService.intervaloForm.get(inputInicio)?.value) + 1}
             - ${dataFim}/${dataFim + 1}`);
          console.log("evento! enviando...");
          console.log(`${this.formularioService.intervaloForm.get(inputInicio)?.value}/${parseInt(this.formularioService.intervaloForm.get(inputInicio)?.value) + 1} - ${dataFim}/${dataFim + 1}`);
        }
      });
  }
  public onYearChangeInterval(event: MatSelectChange, inputInicio: string, inputFim: string): void {
    const controlInicio = this.formularioService.intervaloForm.get(inputInicio);

    this.formularioService.intervaloForm.get(inputFim)?.valueChanges
      .pipe(startWith(this.formularioService.intervaloForm.get(inputFim)?.value))
      .subscribe(dataFim => {
        const dataInicio = controlInicio?.value;

        if (dataFim && dataFim > dataInicio) {
          this.labelDataService.setInterval(true);
          this.labelDataService.setTipoData("Ano");
          this.labelDataService.setCalendarMode('year');
          // this.labelDataService.setTipoData("Ano fiscal");
          // this.labelDataService.setCalendarMode('fiscalYear');

          this.labelDataService
            .setLabel(`${this.formularioService.intervaloForm.get(inputInicio)?.value} - ${dataFim}`);
          console.log("evento! enviando...");
          console.log(`${this.formularioService.intervaloForm.get(inputInicio)?.value} - ${dataFim}`);
        }
      });
  }
}