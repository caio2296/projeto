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
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const status = event.status;   // exemplo: 200, 201
                    const body = event.body;       // pode ser string, objeto, array etc.

                    if (req.url.includes('/api/CriarToken')) {

                        this.mensagemService.openSnackBar('Logado com sucesso!', 'sucesso');
                    }
                    // Aqui você decide o que mostrar
                    if (typeof body === 'string' && status >= 200 && status < 300 && !req.url.includes('/api/CriarToken')) {
                        this.mensagemService.openSnackBar(body, 'sucesso');


                    }
                    else if (status === 201) {
                        this.mensagemService.openSnackBar('Recurso criado com sucesso!', 'sucesso');
                    }
                }
            })
        );
    }
}
