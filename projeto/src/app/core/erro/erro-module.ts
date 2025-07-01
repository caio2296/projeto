import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaNaoEncontrada } from './pagina-nao-encontrada/pagina-nao-encontrada';
import { ErroRoutingModule } from './erro-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaginaNaoEncontrada
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    RouterModule
  ]
})
export class ErroModule { }
