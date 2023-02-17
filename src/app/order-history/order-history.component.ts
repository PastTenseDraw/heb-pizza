import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { AppI } from '../model/interface';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {

  public displayedColumns: string[] = ['orderId', 'size', 'flavor', 'crust', 'tableNum'];
  public source = new MatTableDataSource<AppI.OrderResponse>();
  public userLoggedIn$: Observable<boolean> = this.loginService.authToken$.pipe(map(token => !!token));

  constructor(private readonly service: OrderHistoryService, private readonly loginService: LoginService) {}

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.source.filter = filterValue.trim().toLowerCase();
  }

  public ngOnInit(): void {
    this.service.orderList$.subscribe(ordersList => {
      this.source.data = ordersList;
    });
  }
}
