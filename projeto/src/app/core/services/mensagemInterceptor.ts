/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { MensagemService } from '../services/mensagemService';
import { TranslocoService } from '@jsverse/transloco';

@Injectable()
export class MensagemInterceptor implements HttpInterceptor {

    constructor(private mensagemService: MensagemService,   private translocoService: TranslocoService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Mensagens fixas por rota
        const mensagensPorRota: Record<string, string> = {
            '/api/AtualizarFruta': 'Mensagens.FrutaAtualizada',
            '/api/CriarToken': 'Mensagens.LogadoComSucesso',
            '/api/AdicionarFrutas': 'Mensagens.NovaFrutaAdicionada',
            '/api/ExcluirFruta':'Mensagens.FrutaDeletada',
            '/api/DeleteUsuario':'Mensagens.UsuarioDeletado',
            '/api/RegistrarUsuario':'Mensagens.UsuarioCriado'
        };

        // Mensagens padrão por status
        const mensagensPorStatus: Record<number, string> = {
            201: 'Mensagens.RecursoCriado'
        };

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const status = event.status;   // exemplo: 200, 201
                    // const body = event.body;       // pode ser string, objeto, array etc.
                    for (const rota in mensagensPorRota) {
                        if (req.url.includes(rota)) {
                            this.translocoService.selectTranslate(mensagensPorRota[rota])
                                .pipe(take(1))
                                .subscribe(msgTraduzida => {
                                    this.mensagemService.openSnackBar(msgTraduzida, 'sucesso');
                                });
                            return;
                        }
                    }
                    // Prioridade 2: body string
                    if (typeof event.body === 'string' && status >= 200 && status < 300) {
                        this.translocoService.selectTranslate(event.body)
                            .pipe(take(1))
                            .subscribe(msgTraduzida => {
                                this.mensagemService.openSnackBar(msgTraduzida, 'sucesso');
                            });
                        return;
                    }

                    // Prioridade 3: mensagem por status
                    if (mensagensPorStatus[status]) {
                        this.translocoService.selectTranslate(mensagensPorStatus[status])
                            .pipe(take(1))
                            .subscribe(msgTraduzida => {
                                this.mensagemService.openSnackBar(msgTraduzida, 'sucesso');
                            });
                    }
                }
            })
        );
    }
}
