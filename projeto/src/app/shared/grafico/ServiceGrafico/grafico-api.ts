/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GraficoApi {

  private readonly apiBaseUrl = environment["apiUrl"];

  constructor(private http: HttpClient,private router: Router) { }

  carregarDados(): Observable<any> {
      return this.http.get<any>(`${this.apiBaseUrl}api/`); // ou 'api/calendarData' se for por backend;
    }
}
