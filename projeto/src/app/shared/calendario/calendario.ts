/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalendarBarModel } from '../Models/calendarBarModel';

import { BreakpointObserver } from '@angular/cdk/layout';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';
import { InputConfig } from '../Services/InputConfig';

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss'
})

export class Calendario implements OnInit {

  form!: FormGroup;
  resultadoIntervalo: number | null = null;
  public intervaloForm!: FormGroup
  intervaloAtivo = false;

  inputConfig = {
    type: 'data',
    min: '',
    max: ''
  };

  isMenuOpen = false;

  public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,
    protected calendarBarModel: CalendarBarModel,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.form = this.calendarFormService.inicializarFormulario(this.calendarMode);
    this.dateHelperServices.populateYears();
    this.dateHelperServices.populateFiscalYears();
    this.intervaloForm = this.calendarFormService.InicialiarFormularioIntervalor();
    this.breakpointObserver.observe(['(max-width: 932px)'])
      .subscribe(result => {
        if (result.matches) {
          this.isMenuOpen = false; // Escondido no mobile
        } else {
          this.isMenuOpen = true; // Aberto no desktop
        }
      });
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
