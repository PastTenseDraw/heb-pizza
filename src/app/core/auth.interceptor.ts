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
    // Want to add token to all requests so we can use the api
    // Using session storage here out of convenience, rather than using observable from login service
    const httpRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}`,
      }),
    });
    return next.handle(httpRequest);
  }
}
