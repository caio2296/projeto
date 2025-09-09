import { HttpInterceptorFn } from '@angular/common/http';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
