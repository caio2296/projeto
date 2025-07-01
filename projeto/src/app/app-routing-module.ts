import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //  {
  //   path: 'lazy',
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
    {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
