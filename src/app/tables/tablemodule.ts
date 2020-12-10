import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table.component';
import {AboutTableComponent} from './about-table/about-table.component';
import {ItemTableComponent} from './item-table/item-table.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    TableComponent,
    AboutTableComponent,
    ItemTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TableComponent,
    AboutTableComponent,
    ItemTableComponent
  ]
})
export class TableModule { }
