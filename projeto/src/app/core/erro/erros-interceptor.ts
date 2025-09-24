/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, take, throwError } from 'rxjs';
import { MensagemService } from '../services/mensagemService';
import { TokenService } from '../../autenticacao/Services/token-service';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

@Injectable()

export class ErrosInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MensagemService,
     private tokenService: TokenService,
      private router: Router,
       private injector: Injector,
        private translocoService: TranslocoService) {
  }

  intercept(req: HttpRequest<HttpErrorResponse>, next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // let errorMessage = "Erros.Desconhecido";
        // const body = error.error;   

        // const mensagensPorStatus: Record<number, string> = {
        //   400: 'Erros.EmailIncorreto',
        //   401: 'Erros.NaoAutorizado',
        //   404: 'Erros.RecursoNaoEncontrado',
        //   500: 'Erros.ErroServidor',
        //   409: typeof body === 'string' ? body : 'Erros.ConflitoRequisicao'
        // };

        // if (error.error instanceof ErrorEvent) {
        //   // Erro do lado do cliente
        //   errorMessage = `Erro do cliente: ${error.error.message}`;
        // } else {
        //   errorMessage = mensagensPorStatus[error.status] || errorMessage;

        //   // Regras adicionais
        //   if (error.status === 401 || error.status === 0) {
        //     this.tokenService.excluirToken();
        //     this.router.navigate(['/']);
        //   }
        // }

        // // Centralizado: sempre mostra a mensagem e loga
        // this.mensagemService.openSnackBar(errorMessage, 'erro');
        // console.error("Erro HTTP:", error);
        // console.error("Mensagem exibida:", errorMessage);
                let errorMessage = 'Mensagens.Erros.Desconhecido'; // chave de tradução padrão
        const body = error.error;

        const mensagensPorStatus: Record<number, string> = {
          400: 'Mensagens.Erros.EmailIncorreto',
          401: 'Mensagens.Erros.NaoAutorizado',
          404: 'Mensagens.Erros.RecursoNaoEncontrado',
          500: 'Mensagens.Erros.ErroServidor',
          409: typeof body === 'string' ? body : 'Mensagens.Erros.ConflitoRequisicao'
        };

        if (error.error instanceof ErrorEvent) {
          // Erro do cliente
          errorMessage = 'Mensagens.Erros.Cliente'; // chave de tradução
        } else {
          errorMessage = mensagensPorStatus[error.status] || errorMessage;

          // Regras adicionais para 401 ou falha de conexão
          if (error.status === 401 || error.status === 0) {
            this.tokenService.excluirToken();
            this.router.navigate(['/']);
          }
        }

        // Traduz a mensagem usando Transloco antes de exibir
        this.translocoService.selectTranslate(errorMessage, { error: body })
          .pipe(take(1))
          .subscribe(msgTraduzida => {
            this.mensagemService.openSnackBar(msgTraduzida, 'erro');
            console.error("Erro HTTP:", error);
            console.error("Mensagem exibida:", msgTraduzida);
          });


        return throwError(() => new Error(errorMessage));
      })
    );

  }
}