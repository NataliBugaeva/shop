import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountComponent} from './user-account.component';
import {AppRoutingModule} from '../app-routing.module';
import {UserAccountRoutingModule} from './user-account-routing.module';
import { AboutUserComponent } from './about-user/about-user.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    UserAccountComponent,
    AboutUserComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    UserAccountRoutingModule
  ],
  exports: [
    UserAccountComponent,
    AboutUserComponent,
    OrdersComponent
  ],
  providers: []
})
export class UserAccountModule { }
