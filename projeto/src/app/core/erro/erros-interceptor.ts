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
        const body = error.error;   

        const mensagensPorStatus: Record<number, string> = {
          400: 'O e-mail informado está incorreto ou não cadastrado.',
          401: 'Você não está autorizado a acessar este recurso',
          404: 'Recurso não encontrado',
          500: 'Erro interno do servidor',
          409: typeof body === 'string' ? body : 'Conflito ao processar a requisição'
        };

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Erro do cliente: ${error.error.message}`;
        } else {
          errorMessage = mensagensPorStatus[error.status] || errorMessage;

          // Regras adicionais
          if (error.status === 401 || error.status === 0) {
            this.tokenService.excluirToken();
            this.router.navigate(['/']);
          }
        }

        // Centralizado: sempre mostra a mensagem e loga
        this.mensagemService.openSnackBar(errorMessage, 'erro');
        console.error("Erro HTTP:", error);
        console.error("Mensagem exibida:", errorMessage);


        return throwError(() => new Error(errorMessage));
      })
    );

  }
}