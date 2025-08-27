/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CalendarModel } from '../Models/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Faz com que esse service seja um singleton global
})
export class CalendarBarModelService {

  private readonly apiBaseUrl = environment["apiUrl"];
  dados!: CalendarModel;

  constructor(private http: HttpClient) {
    this.carregarDados().subscribe({
      next: (data) => {
        this.dados = data;
        console.log(this.dados);
      },
      error: (err) => {
        alert(`Erro ao carregar dados do calendário: ${err.message}`);
      },
      complete: () => {
        console.log("Requisição finalizada.");
      }
    });
    console.log(this.carregarDados());
  }

  carregarDados(): Observable<CalendarModel> {
    return this.http.get<CalendarModel>(`${this.apiBaseUrl}api/BuscarCalendar`); // ou 'api/calendarData' se for por backend;
  }

}