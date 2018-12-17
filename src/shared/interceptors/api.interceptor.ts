import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const api = localStorage.getItem('ngx_hostname');
    if (req.url.includes('assets/i18n')) {
      return next.handle(req);
    }
    if (req.url.includes('.svg')) {
      return next.handle(req);
    }
    const apiReq = req.clone({ url: `${api}/${req.url}` });
    return next.handle(apiReq);
  }
}
