/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { MaterialModule } from './core/material/material.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErroModule } from './core/erro/erro-module';
import { ErrosInterceptor } from './core/erro/erros-interceptor';
import { autenticacaoInterceptor } from './autenticacao/autenticacao-interceptor';
import { AutenticacaoModule } from './autenticacao/autenticacao-module';
import { MensagemInterceptor } from './core/services/mensagemInterceptor';
import { TranslocoRootModule } from './transloco-root.module';
import { LoadingInterceptor } from './shared/Loading/Interceptor/loading-interceptor-interceptor';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    App  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,  
    FormsModule,
    MaterialModule,
    SharedModule,
    DashboardModule,
    ErroModule,
    AutenticacaoModule,
    TranslocoRootModule
  ],
  providers: [
    // ✅ novo jeito recomendado
    provideHttpClient(withInterceptorsFromDi()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: autenticacaoInterceptor,
    multi: true
  },
    // ⏳ Loading (ADICIONE AQUI)
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
    // DatePipe, { provide: LOCALE_ID, useValue: 'pt' },
    provideBrowserGlobalErrorListeners(),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrosInterceptor,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:MensagemInterceptor,
      multi:true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
