import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing-module';
import { Login } from './login/login';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Cadastro } from './cadastro/cadastro';
import { TranslocoModule } from '@jsverse/transloco';


@NgModule({
  declarations: [
    Login,
    Cadastro
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
        RouterModule,
            SharedModule,
            TranslocoModule
        
  ],
  exports:[
    Login
  ]
})
export class AutenticacaoModule { }
