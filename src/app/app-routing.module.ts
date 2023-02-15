import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    //loadChildren: () => import('./order-history/order-history.module').then(module => OrderHistoryModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
