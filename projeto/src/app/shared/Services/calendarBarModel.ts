/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CalendarModel } from '../Models/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Faz com que esse service seja um singleton global
})
export class CalendarBarModelService{

    private readonly apiBaseUrl= environment["apiUrl"];
    dados!: CalendarModel;

  constructor(private http:HttpClient) {
       this.carregarDados().subscribe(data => {
        this.dados = data;
        console.log(this.dados);
      });
      console.log(this.carregarDados());
  }

  carregarDados(): Observable<CalendarModel> {
    return this.http.get<CalendarModel>(`${this.apiBaseUrl}api/BuscarCalendar`); // ou 'api/calendarData' se for por backend;
  }

}