/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MensagemService } from '../services/mensagemService';
import { TokenService } from '../../autenticacao/Services/token-service';
import { Router } from '@angular/router';

@Injectable()

export class ErrosInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MensagemService, private tokenService: TokenService, private router: Router, private injector: Injector) {
  }

  intercept(req: HttpRequest<HttpErrorResponse>, next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Ocorreu um erro desconhecido!";

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente, como uma rede interrompida
          errorMessage = `Erro do cliente: ${error.error.message}`;
        } else if (error.status === 404) {
          // Recurso não encontrado (erro 404)
          errorMessage = 'Recurso não encontrado';
        } else if (error.status === 500) {
          // Erro interno do servidor (erro 500)
          errorMessage = 'Erro interno do servidor';
        } else if (error.status === 401) {
          // Não autorizado (erro 401)
          this.tokenService.excluirToken();
          this.router.navigate(['/']);
          window.location.href = '/';
          errorMessage = 'Você não está autorizado a acessar este recurso';
        } else if(error.status === 400){
            errorMessage = 'O e-mail informado está incorreto ou não cadastrado.';
        }

        this.mensagemService.openSnackBar(errorMessage,'erro');
        console.error(error);
        console.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );

  }
}