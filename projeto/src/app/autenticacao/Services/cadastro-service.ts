/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  RegistrarUsuario(email: string): Observable<HttpResponse<string>>{
     return this.http.post<string>(`${this.apiUrl}api/RegistrarUsuario`,
      {email},
      { observe: 'response'}
     ).pipe(
           tap((response) => {
             console.log(response.body);
           })
    );
  }
}
