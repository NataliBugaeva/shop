import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AllProductsComponent} from './all-products/all-products.component';
import {AboutProductComponent} from './all-products/about-product/about-product.component';
import {BasketComponent} from './basket/basket.component';
import {ComparisonComponent} from './comparison/comparison.component';
import {OrderComponent} from './order/order.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {LoginComponent} from './login/login.component';
import {ThanksForOrderComponent} from './thanks-for-order/thanks-for-order.component';
import {OrdersComponent} from './user-account/orders/orders.component';
import {AboutUserComponent} from './user-account/about-user/about-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'order', component: OrderComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: 'account',
    component: UserAccountComponent,
    children: [
      {path: 'user', component: AboutUserComponent},
      {path: 'orders', component: OrdersComponent}
    ]},
  {path: 'thanks', component: ThanksForOrderComponent},
  {path: ':category', component: AllProductsComponent},
  {path: ':category/:id', component: AboutProductComponent},
  {path: '**', component: PageNotFoundComponent}
];

/*const routes: Routes = [
  {path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },
  {path: 'basket',
    loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)
  },
  {path: 'comparison',
    loadChildren: () => import('./comparison/comparison.module').then(m => m.ComparisonModule)
  },
  {path: 'account',
    loadChildren: () => import('./user-account/user-account.module').then(m => m.UserAccountModule)
  },
  {path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {path: ':category',
    loadChildren: () => import('./all-products/all-products.module').then(m => m.AllProductsModule)
  },
  /!*{path: ':category/:id', component: AboutProductComponent},*!/
  {path: '**', component: PageNotFoundComponent},
  {path: 'thanks', component: ThanksForOrderComponent}
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
