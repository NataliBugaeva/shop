import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AllProductsComponent} from './all-products/all-products.component';
import {AboutProductComponent} from './all-products/about-product/about-product.component';
import {BasketComponent} from './basket/basket.component';
import {ComparisonComponent} from './comparison/comparison.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'order', component: OrderComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: ':category', component: AllProductsComponent},
  {path: ':category/:id', component: AboutProductComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
