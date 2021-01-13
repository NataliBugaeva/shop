import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from './basket.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { BasketItemComponent } from './basket-item/basket-item.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    BasketComponent,
    BasketItemComponent
  ]
})
export class BasketModule { }
