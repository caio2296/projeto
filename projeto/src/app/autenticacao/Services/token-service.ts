/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token:string){
       return localStorage.setItem(KEY, token);
  }

  excluirToken(){
    localStorage.removeItem(KEY);
  }

  retornarToken(){
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken(){
    return !!this.retornarToken();
  }

  decodePayloadJWT(): any {
    try {
      const token = this.retornarToken();
      if (!token) return null;
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

    isAdmin(): boolean {
    const payload = this.decodePayloadJWT();
    return payload && payload.UsuarioTipo === 'adm';
  }

}
