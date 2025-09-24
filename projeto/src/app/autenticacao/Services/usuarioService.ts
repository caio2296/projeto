/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { TokenService } from './token-service';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from '../Models/type';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userSubject = new BehaviorSubject<Usuarios|null>(null);

  /**
   *
   */
  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
         this.decodificarJwt();
    }
  }

  private decodificarJwt(){
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as Usuarios;
    this.userSubject.next(user);
  }

  retornarUser(){
    return this.userSubject.asObservable();
  }

  salvarToken(token: string){
      this.tokenService.salvarToken(token);
      this.decodificarJwt();
  }

  logout(){
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }
}
