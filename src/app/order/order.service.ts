import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CoreService } from '../core/core.service';
import { AppI } from '../model/interface';
import { orderIdLink, orderLink } from '../model/links';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private readonly coreService: CoreService) { }

  public cancelOrder(orderNum: number): Observable<AppI.DeleteResponse> {
    return this.coreService.delete<AppI.DeleteResponse>(orderIdLink(orderNum)).pipe(
      catchError(error => {
        console.warn(error);
        return throwError(() => new Error('Failed to delete order!'));
      }),
    );
  }

  public submitOrder(order: { crust: string, flavor: string, size: string, tableNum: number }): Observable<AppI.OrderResponse> {
    const { crust, flavor, size, tableNum} = order;
    const body = { Crust: crust, Flavor: flavor, Size: size, Table_No: tableNum };
    return this.coreService.post<AppI.OrderResponse>(orderLink, body).pipe(
      catchError(error => {
        console.warn(error);
        return throwError(() => new Error('Failed to place order!'));
      }),
    );
  }
}
