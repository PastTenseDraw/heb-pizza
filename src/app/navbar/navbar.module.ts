import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ NavbarComponent ],
  exports: [ NavbarComponent ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class NavbarModule { }
