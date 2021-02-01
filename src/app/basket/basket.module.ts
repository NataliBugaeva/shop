import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from './basket.component';
import {FormsModule} from '@angular/forms';
import { BasketItemComponent } from './basket-item/basket-item.component';
import {BasketRoutingModule} from './basket-routing.module';

@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BasketRoutingModule
  ],
  providers: []
})
export class BasketModule { }
