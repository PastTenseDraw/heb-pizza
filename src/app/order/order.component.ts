import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { OrderService } from './order.service';

const HIGHEST_TABLE_NUMBER = 10;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {

  public crust = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  public flavor = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  public size = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  public tableNum = new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(HIGHEST_TABLE_NUMBER)] });
  public userLoggedIn$: Observable<boolean> = this.loginService.authToken$.pipe(map(token => !!token));

  public orderForm = this.formBuilder.group({
    crust: this.crust,
    flavor: this.flavor,
    size: this.size,
    tableNum: this.tableNum,
  });

  public orderErrorMessage: string | null = null;

  constructor(
    public dialog: MatDialog,
    private readonly loginService: LoginService,
    private readonly formBuilder: FormBuilder,
    private readonly service: OrderService,
  ) { }

  public openDialog(orderNum: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: orderNum,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public onSubmitOrder(): void {
    this.service.submitOrder(this.orderForm.getRawValue()).subscribe({
      next: completedOrder => {
        this.openDialog(completedOrder.Order_ID);
      },
      error: error => console.log(error),
    });
  }
}
