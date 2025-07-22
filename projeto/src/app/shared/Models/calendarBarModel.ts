/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as calendarData from './calendar-data.json';

@Injectable({
  providedIn: 'root' // Faz com que esse service seja um singleton global
})
export class CalendarBarModel{

   dados: any;

  constructor() {
    this.dados = (calendarData as any).default || calendarData;
    console.log(this.dados); // Agora pode logar corretamente
  }

  //em caso de usar um serviço para pegar um json :

  //  constructor(private http: HttpClient) {
  //   this.carregarDados();
  // }

  // carregarDados(): void {
  //   this.http.get('assets/calendar-data.json') // ou 'api/calendarData' se for por backend
  //     .subscribe(data => {
  //       this.dados = data;
  //       console.log(this.dados);
  //     });
  // }

}