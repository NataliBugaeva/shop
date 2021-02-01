import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ThanksForOrderComponent} from './thanks-for-order/thanks-for-order.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
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
  {
    path: 'thanks',
    component: ThanksForOrderComponent,
    canActivate: [AuthGuard]
  },
  {path: 'products/:category',
    loadChildren: () => import('./all-products/all-products.module').then(m => m.AllProductsModule)
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
