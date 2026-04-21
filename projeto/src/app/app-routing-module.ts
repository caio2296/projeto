import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './autenticacao/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },

  // 👇 AQUI ESTÁ O AJUSTE
  {
    path: '',
    loadChildren: () => import('../app/autenticacao/autenticacao-module').then(m => m.AutenticacaoModule)
  },

  {
    path: '**',
     loadChildren:() => import('../app/core/erro/erro-module').then(m => m.ErroModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
