import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ HomeComponent ],
  exports: [ HomeComponent ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
})
export class HomeModule { }
