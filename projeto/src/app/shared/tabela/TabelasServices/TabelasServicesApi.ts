/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Root } from '../../../calendario/Models/type';

@Injectable({
  providedIn: 'root'
})
export class TabelasServiceApi {

    private readonly apiBaseUrl = environment["apiUrl"];
    dados!: Root;
  
    constructor(private http: HttpClient, private router: Router) {
    }
    get isLoginPage(): boolean {
      return this.router.url === '/login';
    }
  
    carregarDados(id:number=0): Observable<Root[]> {
     console.log(`${this.apiBaseUrl}api/BuscarTabela/${id}`);
      return this.http.get<Root[]>(`${this.apiBaseUrl}api/BuscarTabela/${id}`); // ou 'api/calendarData' se for por backend;
    }
}
