import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SofaComponent} from './sofa/sofa.component';
import {TableComponent} from './tables/table.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ChairComponent} from './chair/chair.component';
import {AboutSofaComponent} from './sofa/about-sofa/about-sofa.component';
import {AboutChairComponent} from './chair/about-chair/about-chair.component';
import {AboutTableComponent} from './tables/about-table/about-table.component';
import {AllProductsComponent} from './all-products/all-products.component';
import {AboutProductComponent} from './all-products/about-product/about-product.component';
import {BasketComponent} from './basket/basket.component';

const routes: Routes = [
  {path: '', component: HomeComponent},


  {path: 'basket', component: BasketComponent},
 /* {path: 'sofas', component: AllProductsComponent},
  {path: 'sofas/:id', component: AboutProductComponent},
  {path: 'chairs/:id', component: AboutProductComponent},
  {path: 'tables/:id', component: AboutProductComponent},
  {path: 'chairs', component: AllProductsComponent},
  {path: 'tables', component: AllProductsComponent},*/

  {path: ':category', component: AllProductsComponent},
  {path: ':category/:id', component: AboutProductComponent},


  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
