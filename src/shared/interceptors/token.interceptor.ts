import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('kg-token');
    console.log(token)
    const authReq = !!token ? request.clone({
      setHeaders: {
        Authorisation: `Token ${token}`
      }
    }) : request;
    return next.handle(authReq);
  }
}
