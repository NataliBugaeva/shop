import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { OrderComponent } from './order.component';
import {AppRoutingModule} from '../app-routing.module';
import {OrderRoutingModule} from './order-routing.module';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /*AppRoutingModule,*/
    OrderRoutingModule
  ],
  /*exports: [
    OrderComponent
  ]*/
  providers: []
})
export class OrderModule { }
