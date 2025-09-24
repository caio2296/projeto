/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Usuarios } from '../Models/type';


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

  ListarUsuario():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.apiUrl}api/ListarUsuario`);
  }

  DeletarUsuario(id:number):Observable<any>{

    return this.http.request<string>('Delete',`${this.apiUrl}api/DeleteUsuario`,
      {body:id,
         responseType: 'text' as 'json'
      }
    );

  }
}
