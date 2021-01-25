import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from './basket.component';
import {FormsModule} from '@angular/forms';
import { BasketItemComponent } from './basket-item/basket-item.component';
import {AppRoutingModule} from '../app-routing.module';
import {BasketRoutingModule} from './basket-routing.module';



@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    /*AppRoutingModule,*/
    BasketRoutingModule
  ],
  /*exports: [
    BasketComponent,
    BasketItemComponent
  ]*/
  providers: []
})
export class BasketModule { }
