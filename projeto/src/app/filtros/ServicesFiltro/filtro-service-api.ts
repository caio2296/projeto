/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FilterCat } from '../../calendario/Models/type';

@Injectable({
  providedIn: 'root'
})
export class FiltroServiceApi {

    private readonly apiBaseUrl = environment["apiUrl"];
    dados!: FilterCat;
  
    constructor(private http: HttpClient, private router: Router) {
    }
    get isLoginPage(): boolean {
      return this.router.url === '/login';
    }
  
    carregarDados(): Observable<FilterCat> {
     console.log(`${this.apiBaseUrl}api/BuscarFiltro/${77}`);
      return this.http.get<FilterCat>(`${this.apiBaseUrl}api/BuscarFiltro/${77}`); // ou 'api/calendarData' se for por backend;
    }
}
