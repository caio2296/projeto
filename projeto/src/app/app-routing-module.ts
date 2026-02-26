import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './autenticacao/auth.guard';
import { DashboardResolver } from './dashboard/Resolver/Dashboard.resolver';

const routes: Routes = [
   {
    path: 'auth',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard],
     resolve: {
        filtros: DashboardResolver
     }
  },
    {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'cadastro',
    redirectTo: 'cadastro',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
