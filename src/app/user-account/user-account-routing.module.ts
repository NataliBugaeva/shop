import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAccountComponent} from './user-account.component';
import {AuthGuard} from '../guards/auth.guard';
import {AboutUserComponent} from './about-user/about-user.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: 'user', component: AboutUserComponent},
      {path: 'orders', component: OrdersComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserAccountRoutingModule {

}
