import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing-module';
import { Login } from './login/login';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
        RouterModule,
            SharedModule,
        
  ],
  exports:[
    Login
  ]
})
export class AutenticacaoModule { }
