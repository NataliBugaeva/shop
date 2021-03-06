import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllProductsComponent} from './all-products.component';
import {AboutProductComponent} from './about-product/about-product.component';

const routes: Routes = [
  {path: '', component: AllProductsComponent},
  {path: ':id', component: AboutProductComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AllProductsRoutingModule {

}
