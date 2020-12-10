import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SofaComponent} from './sofa.component';
import {ItemComponent} from '../item/item.component';
import {RouterModule} from '@angular/router';
import { AboutSofaComponent } from './about-sofa/about-sofa.component';

@NgModule({
  declarations: [
    SofaComponent,
    ItemComponent,
    AboutSofaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SofaComponent,
    ItemComponent,
    AboutSofaComponent
  ],
  providers: []
})
export class SofaModule { }
