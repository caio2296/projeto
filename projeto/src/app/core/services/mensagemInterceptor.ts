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
import { Observable, tap } from 'rxjs';
import { MensagemService } from '../services/mensagemService';

@Injectable()
export class MensagemInterceptor implements HttpInterceptor {

    constructor(private mensagemService: MensagemService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Mensagens fixas por rota
        const mensagensPorRota: Record<string, string> = {
            '/api/AtualizarFruta': 'Fruta atualizada com sucesso!',
            '/api/CriarToken': 'Logado com sucesso!',
            '/api/AdicionarFrutas': 'Nova Fruta foi adicionada!'
        };

        // Mensagens padrão por status
        const mensagensPorStatus: Record<number, string> = {
            201: 'Recurso criado com sucesso!'
        };

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const status = event.status;   // exemplo: 200, 201
                    const body = event.body;       // pode ser string, objeto, array etc.

                    // Checa se a rota tem mensagem definida
                    for (const rota in mensagensPorRota) {
                        if (req.url.includes(rota)) {
                            this.mensagemService.openSnackBar(mensagensPorRota[rota], 'sucesso');
                            return;
                        }
                    }

                    // Se o body é string e sucesso (exceto rotas especiais)
                    if (typeof body === 'string' && status >= 200 && status < 300) {
                        this.mensagemService.openSnackBar(body, 'sucesso');
                        return;
                    }

                    // Mensagem padrão por status
                    if (mensagensPorStatus[status]) {
                        this.mensagemService.openSnackBar(mensagensPorStatus[status], 'sucesso');
                    }
                }
            })
        );
    }
}
