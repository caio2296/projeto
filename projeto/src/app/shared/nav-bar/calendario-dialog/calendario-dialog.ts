/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CalendarBarModel } from '../../Models/calendarBarModel';
import { DateHelperService } from '../../Services/dateHelperService';
import { CalendarFormService } from '../../Services/calendarFormService';
import { InputConfig } from '../../Services/InputConfig';
import { LabelDataService } from '../../Services/label-data-service';
import { FormularioService } from '../../Services/formulario-service';

type Modo = 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime';

@Component({
  selector: 'app-calendario-dialog',
  standalone: false,
  templateUrl: './calendario-dialog.html',
  styleUrl: './calendario-dialog.scss'
})

export class CalendarioDialog implements OnInit, OnDestroy {
  form!: FormGroup;
  intervaloForm!: FormGroup;
  intervaloAtivo = false;
  calendarMode!: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime';

  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CalendarioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarBarModel: CalendarBarModel,
    public dateHelperServices: DateHelperService,
    public calendarFormService: CalendarFormService,
    public formularioService: FormularioService,
    public inputConfings: InputConfig,
    protected labelService: LabelDataService
  ) { }

  ngOnInit(): void {
    this.calendarMode = this.labelService.getCalendarMode() as 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime';

    if (!this.labelService.getInterval()) {
      this.setCalendarMode(this.calendarMode);
      this.intervaloAtivo = this.labelService.getInterval();

    } else {

      this.MudarTipoFormulario();

    }
    this.form = this.formularioService.inicializarFormulario(this.labelService.getCalendarMode());
    this.intervaloForm = this.formularioService.InicialiarFormularioIntervalor();

    this.dateHelperServices.populateYears();
    this.dateHelperServices.populateFiscalYears();
  }

  ngOnDestroy(): void {
    this.dateHelperServices.fiscalYearOptions =[];
    console.log(this.labelService.getCalendarMode());
    // Aqui você pode resetar estados ou fazer limpeza
    this.labelService.setInterval(this.intervaloAtivo);
  }

   fecharDialog(): void {
    this.dialogRef.close(); // fecha o dialog
  }

  onCalendarModeChange(mode: any): void {
    this.calendarMode = mode;
  }
  setCalendarMode(mode: Modo) {
    if (!this.calendarBarModel.dados.calendarBar[mode]?.visible) return;
    this.intervaloAtivo = false;
    this.calendarMode = mode;
  }

  MudarTipoFormulario(): boolean {
    return this.intervaloAtivo = true;
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
