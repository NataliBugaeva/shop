import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChairComponent } from './chair.component';
import { AboutChairComponent } from './about-chair/about-chair.component';
import {RouterModule} from '@angular/router';
import {ItemChairComponent} from './item-chair/item-chair.component';


@NgModule({
  declarations: [
    ChairComponent,
    AboutChairComponent,
    ItemChairComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ChairComponent,
    AboutChairComponent,
    ItemChairComponent
  ]
})
export class ChairModule { }
