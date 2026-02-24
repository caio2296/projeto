/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { LoadingService } from "../Service/loading-service";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}