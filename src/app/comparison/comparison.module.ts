import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComparisonComponent} from './comparison.component';
import {FormsModule} from '@angular/forms';
import { ComparisonItemComponent } from './comparison-item/comparison-item.component';
import {AppRoutingModule} from '../app-routing.module';
import {ComparisonRoutingModule} from './comparison-routing.module';

@NgModule({
  declarations: [
    ComparisonComponent,
    ComparisonItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
   /* AppRoutingModule,*/
    ComparisonRoutingModule
  ],
/*  exports: [
    ComparisonComponent,
    ComparisonItemComponent
  ]*/
  providers: []
})
export class ComparisonModule { }
