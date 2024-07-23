import { HttpInterceptorFn } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `${baseUrl}/${req.url}`
  });
  return next(clonedRequest);
};