import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table.component';
import {SofaModule} from '../sofa/sofa.module';
import {AboutTableComponent} from './about-table/about-table.component';
import {ItemChairComponent} from '../chair/item-chair/item-chair.component';
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
    RouterModule,
    SofaModule
  ],
  exports: [
    TableComponent,
    AboutTableComponent,
    ItemTableComponent
  ]
})
export class TableModule { }
