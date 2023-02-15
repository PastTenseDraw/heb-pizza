import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CoreService } from '../core/core.service';
import { AppI } from '../model/interface';
import { loginLink } from '../model/links';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenSubject = new BehaviorSubject<string | null>(null);

  public get auth_token$() {
    return this.tokenSubject.asObservable();
  }

  constructor(private coreService: CoreService) { }

  public logout(): void {
    this.tokenSubject.next(null);
  }

  public submitLogin(username: string, password: string): Observable<AppI.LoginResponse> {
    const body = { username, password };
    return this.coreService.post<AppI.LoginResponse>(loginLink, body).pipe(
      tap(res => console.log(res)),
      tap(({ access_token }) => this.tokenSubject.next(access_token)),
      catchError(error => {
        console.warn(error);
        return throwError(() => new Error('Failed to login to pizza API!'));
      }),
    )
  }
}
