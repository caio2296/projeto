/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from "@angular/core";

import { FormBuilder, FormGroup } from "@angular/forms";
import { DateHelperService } from "./dateHelperService";
import { dataFimMinValidator } from "./Validators/dataFimMinValidator";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { startWith } from "rxjs/operators";
import moment from "moment";
import { Subscription } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { LabelDataService } from "./label-data-service";
import { ApiService } from "C:/Users/user/Desktop/Caio/projeto/projeto/src/app/Services/api-service";
import { CalendarBarModel } from "../Models/calendarBarModel";

@Injectable({ providedIn: 'root' })

export class CalendarFormService {

  form!: FormGroup;
  intervaloForm!: FormGroup;
  private subscription?: Subscription;


  constructor(private fb: FormBuilder,
    protected calendarBarModel: CalendarBarModel,
    protected dateHelperServices: DateHelperService,
    public labelDataService: LabelDataService,
    protected ApiService:ApiService) {
  }

  inicializarFormulario(calendarMode: any): FormGroup {
    const defaultSelection = this.calendarBarModel.dados.calendarBar.defaultSelection.selection as any;
    calendarMode = defaultSelection;

    const partes = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
    const dataJs = new Date(+partes[2], +partes[1] - 1, +partes[0]);
    const dataM = new Date(+partes[2], +partes[1] - 1);

    this.labelDataService.setTipoData(calendarMode);
    this.labelDataService.setLabel(this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart);
      this.ApiService.chamarApi();
    return this.form = this.fb.group({
      data: [this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart],
      day: [dataJs],
      month: [dataM],
      year: [`${partes[2]}`],
      fiscalYear: [`${partes[2]}`]
    });
  }

  InicialiarFormularioIntervalor() {
    const partes = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');

    this.intervaloForm = this.fb.group({
      dataInicio: [`${partes[0]}-${partes[1]}-${partes[2]}`],
      dataFim: ['', [dataFimMinValidator(() => this.intervaloForm?.get('dataInicio')?.value)]],
      unidade: ['dias'],
      dataInicioMes: [moment({
        year: parseInt(partes[2], 10),
        month: parseInt(partes[1], 10) - 1 // lembre que o mês começa em 0 (jan)
      })],
      dataFimMes: [moment({
        year: parseInt(partes[2], 10),
        month: parseInt(partes[1], 10) - 1 // lembre que o mês começa em 0 (jan)
      })],
      anoInicio: [`${partes[2]}`],
      anoFim: ['']
    });


    this.intervaloForm.get('dataInicio')?.valueChanges.subscribe(dataInicio => {

      const dataFimControl = this.intervaloForm.get('dataFim');
      const dataFim = dataFimControl?.value;

      // Se quiser ajustar automaticamente:
      if (dataFim && dataFim < dataInicio) {
        dataFimControl?.setValue(this.intervaloForm?.get('dataInicio')?.value);
      }

      // Sempre forçar revalidação:
      dataFimControl?.updateValueAndValidity();
    });

    return this.intervaloForm;
  }

  public onYearChange(event: MatSelectChange, inputName: string): void {
    switch (inputName) {
      case 'year': {
        this.labelDataService.setTipoData(inputName);
        this.labelDataService.setLabel(event.value);

        console.log('Evento para o ano!');
        console.log('Ano selecionado:', event.value);
        // Lógica para quando for ano comum
        break;
      }
      case 'fiscalYear': {
        this.labelDataService.setTipoData(inputName);
        this.labelDataService.setLabel(`${event.value}/${event.value + 1}`);
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
        this.labelDataService.setTipoData(input);
        const controlInput = this.form.get(input);

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
        this.labelDataService.setTipoData(input);
        const controlInput = this.form.get(input);

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
    const controlInicio = this.intervaloForm.get(inputInicio);
    const controlFim = this.intervaloForm.get(inputFim);

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
          this.labelDataService.setTipoData("Inicio - Fim");
          this.labelDataService.setLabel(`${dataFormatadaInicio} - ${dataFormatadaFim}`);

          console.log("evento! enviando...");
          console.log(`${dataFormatadaInicio} - ${dataFormatadaFim}`);
        }
      });
  }

  public onDateChangeInterval(event: MatDatepickerInputEvent<Date>, inputInicio: string, inputFim: string): void {
    this.intervaloForm.get(inputInicio)?.valueChanges
      .pipe(startWith(this.intervaloForm.get(inputInicio)?.value))
      .subscribe(dataInicio => {

        const dataFimControl = this.intervaloForm.get(inputFim);
        const dataFim = dataFimControl?.value;

        // Se quiser ajustar automaticamente:
        if (dataFim && dataFim > dataInicio) {
          this.labelDataService.setTipoData("Inicio - Fim");
          this.labelDataService
            .setLabel(`${this.intervaloForm.get(inputInicio)?.value.toLocaleDateString('pt-BR')}  -  ${this.intervaloForm.get(inputFim)?.value.toLocaleDateString('pt-BR')}`);
          console.log("evento! enviando...");
          console.log(`${this.intervaloForm.get(inputInicio)?.value.toLocaleDateString('pt-BR')}-${this.intervaloForm.get(inputFim)?.value.toLocaleDateString('pt-BR')}`);
        }
      });
  }

  public onYearChangeInterval(event: MatSelectChange, inputInicio: string, inputFim: string): void {
    const controlInicio = this.intervaloForm.get(inputInicio);


    this.subscription = this.intervaloForm.get(inputFim)?.valueChanges
      .pipe(startWith(this.intervaloForm.get(inputFim)?.value))
      .subscribe(dataFim => {
        const dataInicio = controlInicio?.value;

        if (dataFim && dataFim > dataInicio) {
          this.labelDataService.setTipoData("Inicio - Fim");
          this.labelDataService
            .setLabel(`${this.intervaloForm.get(inputInicio)?.value} - ${dataFim}`);
          console.log("evento! enviando...");
          console.log(`${this.intervaloForm.get(inputInicio)?.value} - ${dataFim}`);
        }
      });

    this.subscription?.unsubscribe();
  }
}