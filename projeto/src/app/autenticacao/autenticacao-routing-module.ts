import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { AdminGuard } from './admin-guard';

const routes: Routes = [
   {
    path: 'login',
    component: Login
  },
  {
    path:'cadastro',
    component:Cadastro,
    canActivate:[AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
