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
    protected ApiService: ApiService) {
  }

  inicializarFormulario(calendarMode: any): FormGroup {

    const defaultSelection = this.calendarBarModel.dados.calendarBar.defaultSelection.selection as any;
    calendarMode = this.labelDataService.getCalendarMode();
    console.log(this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/'));
    // const partes = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
    var partes: any;
    var dataJs;
    var dataM;
    var ano;
    if (this.labelDataService.getLabel().toString().includes('/')) {
      partes = this.labelDataService.getLabel().split(/[/\-]/);
      dataJs = new Date(+partes[2], +partes[1] - 1, +partes[0]);
      dataM = new Date(+partes[2], +partes[1] - 1);
      ano = this.labelDataService.getLabel();
    } else {
      ano = this.labelDataService.getLabel();
    }
    let partesPadrao;
    this.labelDataService.setTipoData(calendarMode);

    switch (calendarMode) {
      case 'day':
        partesPadrao = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');

        console.log(partes)
        return this.form = this.fb.group({
          data: [this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [dataM],
          year: [`${partesPadrao[2]}`],
          fiscalYear: [`${partesPadrao[2]}`]
        });
      case 'month':
        partesPadrao = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        return this.form = this.fb.group({
          data: [this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [new Date(+partes[1], +partes[0] - 1)],
          year: [`${partes[2]}`],
          fiscalYear: [`${partes[2]}`]
        });
      default:
        partesPadrao = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        dataM = new Date(+partesPadrao[2], +partesPadrao[1] - 1);
        return this.form = this.fb.group({
          data: [this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [dataM],
          year: [ano],
          fiscalYear: [`${ano}/`]
        });
    }
  }

  InicialiarFormularioIntervalor(): FormGroup {
    const partesPadrao = this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart.split('/');
    let partes
    let partesMeses;
    let partesAno;
    let dataJs!: Date;
    var dataFimInicializacao!: Array<string>;

    let dataFim: Date;

    const label = String(this.labelDataService.getLabel());

    if (label.includes('-')) {
      const partes = this.labelDataService.getLabel().split('-');
      const dataStr = partes[1].trim(); // remove espaços

      const [dia, mes, ano] = dataStr.split('/');
      dataFim = new Date(+ano, +mes - 1, +dia);
    } else {
      const [dia, mes, ano] = label.split('/');
      dataFim = new Date(+ano, +mes - 1, +dia);
    }

    var unidade = this.labelDataService.getCalendarMode();
    if (this.labelDataService.getTipoData() == 'fiscalYear') {
      unidade = 'year';
    }

    if (this.labelDataService.getLabel().toString().includes('/')) {
      partes = this.labelDataService.getLabel().split(/\/|-/);
      dataJs = new Date(+partes[2], +partes[1] - 1, +partes[0]);
    }
    switch (unidade) {
      case 'day':
        this.intervaloForm = this.fb.group({
          dataInicio: [dataJs],
          dataFim: [dataFim, [dataFimMinValidator(() => this.intervaloForm?.get('dataInicio')?.value.toString())]],
          unidade: [unidade],
          dataInicioMes: [moment({
            year: parseInt(partesPadrao[2], 10),
            month: parseInt(partesPadrao[1], 10) - 1 // lembre que o mês começa em 0 (jan)
          })],
          dataFimMes: [moment({
            year: parseInt(partesPadrao[2], 10),
            month: parseInt(partesPadrao[1], 10) - 1 // lembre que o mês começa em 0 (jan)
          })],
          anoInicio: [`${partesPadrao[2]}`],
          anoFim: ['']
        });

        break;

      case 'month':
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        partesMeses = this.labelDataService.getLabel().split('/');
        this.intervaloForm = this.fb.group({
          dataInicio: [dataJs],
          dataFim: ['', [dataFimMinValidator(() => this.intervaloForm?.get('dataInicio')?.value)]],
          unidade: [unidade],
          dataInicioMes: [moment({
            year: parseInt(partesMeses[1], 10),
            month: parseInt(partesMeses[0], 10) - 1 // lembre que o mês começa em 0 (jan)
          })],
          dataFimMes: [moment({
            year: parseInt(partesMeses[1], 10),
            month: parseInt(partesMeses[0], 10) - 1 // lembre que o mês começa em 0 (jan)
          })],
          anoInicio: [`${partesPadrao[2]}`],
          anoFim: ['']
        });

        break;

      case 'year':
        let Ano;
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        if (this.labelDataService.getLabel().toString().includes('-')) {
          partesAno = this.labelDataService.getLabel().split("-");
          Ano = partesAno[0];
        } else {
          Ano = this.labelDataService.getLabel().toString();
        }
        this.intervaloForm = this.fb.group({
          dataInicio: [dataJs],
          dataFim: ['', [dataFimMinValidator(() => this.intervaloForm?.get('dataInicio')?.value)]],
          unidade: [unidade],
          dataInicioMes: [moment({
            year: parseInt(partesPadrao[2], 10),
            month: parseInt(partesPadrao[1], 10) - 1 // lembre que o mês começa em 0 (jan)
          })],
          dataFimMes: [moment({
            year: parseInt(partesPadrao[2], 10),
            month: parseInt(partesPadrao[1], 10) - 1 // lembre que o mês começa em 0 (jan)
          })],
          anoInicio: [`${parseInt(Ano)}`],
          anoFim: ['']
        });


        break;

    }

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
        const controlInput = this.form.get(input);
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
        const controlInput = this.form.get(input);
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
          this.labelDataService.setInterval(true);
          this.labelDataService.setTipoData("Mes");
          this.labelDataService.setCalendarMode('month');
          this.labelDataService.setLabel(`${dataFormatadaInicio} - ${dataFormatadaFim}`);


          console.log("evento! enviando...");
          console.log(`${dataFormatadaInicio} - ${dataFormatadaFim}`);
        }
      });
  }

  public onDateChangeInterval(event: MatDatepickerInputEvent<Date>, inputInicio: string, inputFim: string): void {
    this.labelDataService.setInterval(true);
    this.labelDataService.setTipoData("Dia");
    this.labelDataService.setCalendarMode('day');
    this.intervaloForm.get(inputInicio)?.valueChanges
      .pipe(startWith(this.intervaloForm.get(inputInicio)?.value))
      .subscribe(dataInicio => {

        const dataFimControl = this.intervaloForm.get(inputFim);
        const dataFim = dataFimControl?.value;

        const dataInicioValor = this.intervaloForm.get(inputInicio)?.value;
        const dataFimValor = this.intervaloForm.get(inputFim)?.value;

        if (dataFim instanceof Date && dataInicio instanceof Date && dataFim > dataInicio) {

          const label = `${dataInicioValor.toLocaleDateString('pt-BR')} - ${dataFimValor.toLocaleDateString('pt-BR')}`;
          this.labelDataService.setLabel(label);

          console.log("evento! enviando...");
          console.log(label);

        }
      });
  }

  public onYearChangeInterval(event: MatSelectChange, inputInicio: string, inputFim: string): void {
    const controlInicio = this.intervaloForm.get(inputInicio);

    this.intervaloForm.get(inputFim)?.valueChanges
      .pipe(startWith(this.intervaloForm.get(inputFim)?.value))
      .subscribe(dataFim => {
        const dataInicio = controlInicio?.value;

        if (dataFim && dataFim > dataInicio) {
          this.labelDataService.setInterval(true);
          this.labelDataService.setTipoData("Ano");
          this.labelDataService.setCalendarMode('year');
          this.labelDataService
            .setLabel(`${this.intervaloForm.get(inputInicio)?.value} - ${dataFim}`);
          console.log("evento! enviando...");
          console.log(`${this.intervaloForm.get(inputInicio)?.value} - ${dataFim}`);
        }
      });
  }
}