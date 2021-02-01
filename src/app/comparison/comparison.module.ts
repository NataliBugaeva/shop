import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparisonComponent} from './comparison.component';
import {FormsModule} from '@angular/forms';
import {ComparisonItemComponent} from './comparison-item/comparison-item.component';
import {ComparisonRoutingModule} from './comparison-routing.module';

@NgModule({
  declarations: [
    ComparisonComponent,
    ComparisonItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComparisonRoutingModule
  ],
  providers: []
})
export class ComparisonModule {
}
