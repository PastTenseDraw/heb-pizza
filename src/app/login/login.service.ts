import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CoreService } from '../core/core.service';
import { AppI } from '../model/interface';
import { loginLink } from '../model/links';

export const AUTH_TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  public get authToken$() {
    return this.tokenSubject.asObservable();
  }

  constructor(private readonly coreService: CoreService) {
    console.log('setting token');
    console.log(sessionStorage.getItem(AUTH_TOKEN_KEY))
    this.tokenSubject.next(sessionStorage.getItem(AUTH_TOKEN_KEY));
   }

  public logout(): void {
    this.tokenSubject.next(null);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }

  public submitLogin(username: string, password: string): Observable<AppI.LoginResponse> {
    const body = { username, password };
    return this.coreService.post<AppI.LoginResponse>(loginLink, body).pipe(
      tap(res => console.log(res)),
      tap(({ access_token }) => {
        this.tokenSubject.next(access_token);
        sessionStorage.setItem(AUTH_TOKEN_KEY, access_token);
      }),
      catchError(error => {
        console.warn(error);
        return throwError(() => new Error('Failed to login to pizza API!'));
      }),
    );
  }
}
