import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './Paginas/dashboard/dashboard';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { Calendario } from './shared/calendario/calendario';
import { Grafico } from './shared/grafico/grafico';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localeBr, 'pt')

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker} from '@angular/material/datepicker';
import { MY_FORMATS } from './Models/Formats';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { InputMesAnoIntervalo } from './shared/input-mes-ano-intervalo/input-mes-ano-intervalo';
import { SeletorAnoIntervalo } from './shared/seletor-ano-intervalo/seletor-ano-intervalo';
import { DataIntervalo } from './shared/data-intervalo/data-intervalo';
import { InputMes } from './shared/input-mes-ano/input-mes';
import { InputData } from './shared/input-data/input-data';
import { SeletorAno } from './shared/seletor-ano/seletor-ano';
import { LabelData } from './shared/label-data/label-data';
import {MatIconModule} from '@angular/material/icon';



const moment = _rollupMoment || _moment;

@NgModule({
  declarations: [
    App,
    Dashboard,
    Calendario,
    Grafico,
    InputMesAnoIntervalo,
    SeletorAnoIntervalo,
    DataIntervalo,
    InputMes,
    InputData,
    SeletorAno,
    LabelData
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    FormsModule,
    MatIconModule,
    HttpClientModule
    // MatMomentDateModule

  ],
  providers: [
    DatePipe, { provide: LOCALE_ID, useValue: 'pt' },
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
