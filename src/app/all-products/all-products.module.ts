import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductComponent } from './product/product.component';
import { AboutProductComponent } from './about-product/about-product.component';
import {AllProductsComponent} from './all-products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {AllProductsRoutingModule} from './all-products-routing.module';
import { SofasFilterComponent } from './filter/sofas-filter/sofas-filter.component';
import { TablesFilterComponent } from './filter/tables-filter/tables-filter.component';
import { ChairsFilterComponent } from './filter/chairs-filter/chairs-filter.component';



@NgModule({
  declarations: [
    ProductComponent,
    AboutProductComponent,
    AllProductsComponent,
    SofasFilterComponent,
    TablesFilterComponent,
    ChairsFilterComponent
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
    AboutProductComponent,
    SofasFilterComponent,
    TablesFilterComponent,
    ChairsFilterComponent
  ],*/
  providers: []
})
export class AllProductsModule { }
