import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { CoreService } from '../core/core.service';
import { AppI } from '../model/interface';
import { loginLink } from '../model/links';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AUTH_TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly tokenHelper = new JwtHelperService();
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  public get authToken$() {
    return this.tokenSubject.asObservable();
  }

  constructor(private readonly coreService: CoreService) {
    // Need to read token from session so users stay logged in even after refresh
    this.tokenSubject.next(sessionStorage.getItem(AUTH_TOKEN_KEY));
   }

  public logout(): void {
    // Logout should nullify our token in the service and the session
    this.tokenSubject.next(null);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }

  public submitLogin(username: string, password: string): Observable<AppI.LoginResponse> {
    // Package user and pw for auth endpoint
    const body = { username, password };
    return this.coreService.post<AppI.LoginResponse>(loginLink, body).pipe(
      tap(({ access_token }) => {
        // If authed, want to save to our service and session
        // Service is for quick access (am I logged in y/n?)
        // Session for persistent login
        this.tokenSubject.next(access_token);
        sessionStorage.setItem(AUTH_TOKEN_KEY, access_token);

        // Set time to logout at token expiration, preventing users from thinking they're logged in when they aren't
        // TODO: implement a popup with 5 minutes remaining for better user experience
        const expDate = this.tokenHelper.getTokenExpirationDate(access_token);
        if (expDate) {
          // This isn't a perfect implementation, as browser tick speed may slow in the background
          // Since tokens from this API expire rather quickly, it shouldn't be an issue
          // In a prod app, would want to set a ~minutely interval to re-calculate timeout time remaining
          setTimeout(() => this.logout(), expDate.getTime() - Date.now());
        }
      }),
      catchError(error => {
        // if we fail, document in console
        // TODO: Throw error dialog when dialog component created and parameterized for entire app
        // For now, using console
        console.warn(error);
        return throwError(() => new Error('Failed to login to pizza API!'));
      }),
    );
  }
}
