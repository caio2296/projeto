/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { FiltroServiceApi } from '../../filtros/ServicesFiltro/filtro-service-api';
import { FilterCat } from '../../calendario/Models/type';
import { TabelasServiceApi } from '../../shared/tabela/TabelasServices/TabelasServicesApi';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<FilterCat[]> {

  constructor(private filtroServiceApi: FiltroServiceApi,private tabelasServiceApi:TabelasServiceApi) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
   const id = Number(route.paramMap.get('id'));
   return forkJoin({
    filtros: this.filtroServiceApi.carregarDados(id),
    tabelas: this.tabelasServiceApi.carregarDados(id)
  });
  }
}