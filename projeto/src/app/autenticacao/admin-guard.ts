/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './Services/token-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const token = this.tokenService.retornarToken();

    if (token) {
      const payload = this.tokenService.decodePayloadJWT(); // método que decodifica o JWT

          console.log(payload);
      if (payload && payload.UsuarioTipo === 'adm') {
        return true;
      }
    }

    // se não for adm, redireciona
    this.router.navigate(['/nao-autorizado']); 
    return false;
  }
}
