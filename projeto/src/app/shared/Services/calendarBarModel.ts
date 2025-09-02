/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CalendarModel } from '../Models/type';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Faz com que esse service seja um singleton global
})
export class CalendarBarModelService {

  private readonly apiBaseUrl = environment["apiUrl"];
  dados!: CalendarModel;

  constructor(private http: HttpClient, private router: Router) {

  }
  get isLoginPage(): boolean {

    return this.router.url === '/login';
  }

  carregarDados(): Observable<CalendarModel> {
    return this.http.get<CalendarModel>(`${this.apiBaseUrl}api/BuscarCalendar`); // ou 'api/calendarData' se for por backend;
  }

}