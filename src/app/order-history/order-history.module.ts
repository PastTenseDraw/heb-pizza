import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history.component';



@NgModule({
  declarations: [
    OrderHistoryComponent,
  ],
  exports: [
    OrderHistoryComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class OrderHistoryModule { }
