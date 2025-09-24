/* eslint-disable no-useless-escape */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import moment from "moment";
import { dataFimMinValidator } from "../Validators/dataFimMinValidator";

import { DateHelperService } from '../dateHelperService';
import { LabelDataService } from '../label-data-service';
import { FormularioDateHelper } from './formularioDateHelper';
import { CalendarBarModelService } from '../calendarBarModel';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  public form!: FormGroup;
  public intervaloForm!: FormGroup;

  constructor(private fb: FormBuilder,
    protected calendarBarModelService: CalendarBarModelService,
    protected dateHelperServices: DateHelperService,
    public labelDataService: LabelDataService,
    private formularioDateHelper: FormularioDateHelper) { }

  public inicializarFormulario(calendarMode: any): FormGroup {

    console.log(this.calendarBarModelService.dados.calendarBar.defaultSelection.dateStart.split('/'));

    var {  dataJs, dataM, partesPadrao, ano }: { partes: any; dataJs: any; dataM: any; partesPadrao: any; ano: any; } = 
          this.formularioDateHelper.ObtarDataAnoLabel(this.calendarBarModelService);

    this.labelDataService.setTipoData(calendarMode);

    switch (calendarMode) {
      case 'day':
        console.log(this.form = this.fb.group({
          data: [this.calendarBarModelService.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [dataM],
          year: [parseInt(partesPadrao[2])],
          fiscalYear: [parseInt(partesPadrao[2])]
        }));

        return this.form = this.fb.group({
          data: [this.calendarBarModelService.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [dataM],
          year: [parseInt(partesPadrao[2])],
          fiscalYear: [parseInt(partesPadrao[2])]
        });
      case 'month':
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        return this.form = this.fb.group({
          data: [this.calendarBarModelService.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [dataM],
          year: [parseInt(partesPadrao[2])],
          fiscalYear: [parseInt(partesPadrao[2])]
        });
      default:
        console.log(ano);
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        dataM = new Date(+partesPadrao[2], +partesPadrao[1] - 1);
        return this.form = this.fb.group({
          data: [this.calendarBarModelService.dados.calendarBar.defaultSelection.dateStart],
          day: [dataJs],
          month: [dataM],
          year: [parseInt(String(ano))],
          fiscalYear: [parseInt(String(ano))]
        });
    }

  }

  public InicialiarFormularioIntervalor(): FormGroup {
    var { unidade, dataJs, dataFim, partesPadrao, partesMeses, partesAno, Ano }:
      { unidade: string; dataJs: Date; dataFim: Date; partesPadrao: any; partesMeses: any; partesAno: any; Ano: any; } =
           this.formularioDateHelper.ObterDataAnoIntervaloLabel(this.calendarBarModelService);

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
          anoFim: [''],
          anoIntervaloInicio: [parseInt(partesPadrao[2])],
          anoIntervaloFim: ['']
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
          anoFim: [''],
          anoIntervaloInicio: [parseInt(partesPadrao[2])],
          anoIntervaloFim: ['']
        });

        break;

      case 'year':
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
          anoFim: [''],
          anoIntervaloInicio: [parseInt(partesPadrao[2])],
          anoIntervaloFim: ['']
        });


        break;
      case 'fiscalYear':
        dataJs = new Date(+partesPadrao[2], +partesPadrao[1] - 1, +partesPadrao[0]);
        if (this.labelDataService.getLabel().toString().includes('-') || this.labelDataService.getLabel().toString().includes('/')) {
          partesAno = this.labelDataService.getLabel().split(/[/\-]/);
          Ano = partesAno[0];
        } else {
          Ano = this.labelDataService.getLabel().toString();
        }
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
          anoInicio: [`${partesPadrao[2]}`],
          anoFim: [''],
          anoIntervaloInicio: [parseInt(String(Ano))],
          anoIntervaloFim: ['']
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
}
