/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioDialog } from './calendario-dialog/calendario-dialog';
import { CalendarBarModel } from '../Models/calendarBarModel';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';
import { InputConfig } from '../Services/InputConfig';
import { TemaService } from './Services/tema-service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {

  form!: FormGroup;
  resultadoIntervalo: number | null = null;
  intervaloAtivo = false;


  isMenuOpen = false;

  public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';



  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,
    protected calendarBarModel: CalendarBarModel,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    private dialog: MatDialog,
    protected temaService: TemaService
    ) {

    }

  toggleTheme(): void {
    this.temaService.toggleTheme();
  }

  abrirDialogCalendario(): void {
    this.dialog.open(CalendarioDialog, {
      width: '100%',
      maxWidth: '500px',
      data: {} // pode passar dados se quiser
    });
  }

  public setCalendarMode(mode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime') {
    if (!this.calendarBarModel.dados.calendarBar[mode]?.visible) {
      return;
    }
    this.intervaloAtivo = false;
    this.calendarMode = mode;
  }

  public MudarTipoFormulario(): boolean {
    return this.intervaloAtivo = true;
  }




}
