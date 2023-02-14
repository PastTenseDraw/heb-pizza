import { Injectable } from '@angular/core';
import { AppI } from '../model/interface';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

const RETRY_COUNT = 3;

@Injectable({
  providedIn: 'root',
})
export class CoreService {


  constructor(private readonly http: HttpClient) { }

  public get<T>(link: string, params: AppI.KeyValuePairs): Observable<T> {
    return this.http.get<T>(link, { params: { ...params }}).pipe(
      retry(RETRY_COUNT),
    );
  }

  public post<T>(link: string, body: unknown): Observable<T> {
    return this.http.post<T>(link, body).pipe(
      retry(RETRY_COUNT),
    );
  }

  public put<T>(link: string, body: unknown): Observable<T> {
    return this.http.put<T>(link, body).pipe(
      retry(RETRY_COUNT),
    );
  }
}
