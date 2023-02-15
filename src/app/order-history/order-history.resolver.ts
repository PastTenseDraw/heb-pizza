import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { OrderHistoryService } from './order-history.service';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryResolver implements Resolve<null> {

  constructor(private readonly service: OrderHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<null> {
    return this.service.fetchOrders();
  }
}
