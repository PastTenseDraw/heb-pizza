import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { CoreService } from '../core/core.service';
import { AppI } from '../model/interface';
import { orderLink } from '../model/links';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {

  private readonly orderListSubject = new BehaviorSubject<AppI.OrderResponse[]>([]);
  public orderList$ = this.orderListSubject.asObservable();

  constructor(private readonly coreService: CoreService) { }

  public fetchOrders(): Observable<null> {
    return this.coreService.get<AppI.OrderResponse[]>(orderLink).pipe(
      tap(orders => this.orderListSubject.next(orders)),
      map(() => null),
      catchError(error => throwError(() => 'Failed to fetch orders!' + error)),
    );
  }
}
