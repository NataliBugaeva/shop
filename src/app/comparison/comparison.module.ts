import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComparisonComponent} from './comparison.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ComparisonItemComponent } from './comparison-item/comparison-item.component';

@NgModule({
  declarations: [
    ComparisonComponent,
    ComparisonItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ComparisonComponent,
    ComparisonItemComponent
  ]
})
export class ComparisonModule { }
