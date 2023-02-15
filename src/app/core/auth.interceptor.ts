import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_TOKEN_KEY } from '../login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    const httpRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}`,
      }),
    });
    console.log(httpRequest);
    return next.handle(httpRequest);
  }
}
