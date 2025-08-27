/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuarioService';

import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  tokenJWT: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UsuarioService
  ) {}

   autenticar(email: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}api/CriarToken`,
      { email },
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        const authToken = response.body?.tokenJWT || '';
        console.log(response.body);
        this.userService.salvarToken(authToken);
      })
    );
  }
}
