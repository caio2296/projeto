/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltroServiceApi } from '../../filtros/ServicesFiltro/filtro-service-api';
import { FilterCat } from '../../calendario/Models/type';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<FilterCat[]> {

  constructor(private filtroServiceApi: FiltroServiceApi) {}

  resolve(): Observable<FilterCat[]> {
    const ctrlsId = 1;

    return this.filtroServiceApi.carregarDados(ctrlsId);
  }
}