import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from '../../core/material/material.module';
import { CalendarioDialog } from '../calendario-dialog/calendario-dialog';
import { DataIntervalo } from '../calendario-dialog/componentes/data-intervalo/data-intervalo';
import { InputData } from '../calendario-dialog/componentes/input-data/input-data';
import { InputMesAnoIntervalo } from '../calendario-dialog/componentes/input-mes-ano-intervalo/input-mes-ano-intervalo';
import { InputMes } from '../calendario-dialog/componentes/input-mes-ano/input-mes';
import { SeletorAnoFiscalIntervalo } from '../calendario-dialog/componentes/seletor-ano-fiscal-intervalo/seletor-ano-fiscal-intervalo';
import { SeletorAnoIntervalo } from '../calendario-dialog/componentes/seletor-ano-intervalo/seletor-ano-intervalo';
import { SeletorAno } from '../calendario-dialog/componentes/seletor-ano/seletor-ano';
import { LabelData } from '../label-data/label-data';
import { TranslocoModule } from '@jsverse/transloco';




@NgModule({
  declarations: [
    InputData,
    InputMesAnoIntervalo,
    InputMes,
    LabelData,
    SeletorAno,
    SeletorAnoIntervalo,
    DataIntervalo,
    CalendarioDialog,
    SeletorAnoFiscalIntervalo
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslocoModule
  ],
  exports:[
    InputData,
    InputMesAnoIntervalo,
    InputMes,
    LabelData,
    SeletorAno,
    SeletorAnoIntervalo,
    DataIntervalo,
    CalendarioDialog,
    SeletorAnoFiscalIntervalo
  ],
     providers: [
     { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
})
export class CalendarioModule { }
