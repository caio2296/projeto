import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localeBr, 'pt')

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { MaterialModule } from './core/material/material.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';



const moment = _rollupMoment || _moment;

@NgModule({
  declarations: [
    App,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,

    DatePipe,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    DashboardModule

  ],
  providers: [
    DatePipe, { provide: LOCALE_ID, useValue: 'pt' },
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
