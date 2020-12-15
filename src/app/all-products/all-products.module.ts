import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { ProductComponent } from './product/product.component';
import { AboutProductComponent } from './about-product/about-product.component';
import {AllProductsComponent} from './all-products.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent,
    AboutProductComponent,
    AllProductsComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
  exports: [
    AllProductsComponent,
    ProductComponent,
    AboutProductComponent
  ],
  providers: []
})
export class AllProductsModule { }
