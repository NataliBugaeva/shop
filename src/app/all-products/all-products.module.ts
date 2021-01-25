import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductComponent } from './product/product.component';
import { AboutProductComponent } from './about-product/about-product.component';
import {AllProductsComponent} from './all-products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {AllProductsRoutingModule} from './all-products-routing.module';



@NgModule({
  declarations: [
    ProductComponent,
    AboutProductComponent,
    AllProductsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        /*AppRoutingModule,*/
        AllProductsRoutingModule,
        ReactiveFormsModule
    ],
/*  exports: [
    AllProductsComponent,
    ProductComponent,
    AboutProductComponent
  ],*/
  providers: []
})
export class AllProductsModule { }
