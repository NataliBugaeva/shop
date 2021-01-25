import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
/*import {FormsModule} from '@angular/forms';*/
import {ReactiveFormsModule} from '@angular/forms';
import { OrderComponent } from './order.component';


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule { }
